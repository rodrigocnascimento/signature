const { defaultBoardSign, promptAsync } = require('./utils')

const GAME_WIDTH = 40
const GAME_HEIGHT = 18
const PLAYER_Y = GAME_HEIGHT - 1

// Formas dos inimigos (matrizes de strings)
const ENEMY_SHAPES = [
  // Inimigo tipo 1: Nave
  [' ▼ ', '▼▼▼'],
  // Inimigo tipo 2: Nave com asas
  [' ▲▼', '▼▼▼'],
  // Inimigo tipo 3: Forma diferente
  [' ◊ ', '▼▼▼'],
]

function getEnemyShape(enemy) {
  return ENEMY_SHAPES[enemy.type % ENEMY_SHAPES.length]
}

function getEnemyBounds(enemy) {
  const shape = getEnemyShape(enemy)
  const height = shape.length
  const width = shape[0].length
  return {
    x1: enemy.x - Math.floor(width / 2),
    y1: enemy.y,
    x2: enemy.x + Math.floor(width / 2),
    y2: enemy.y + height - 1,
    width,
    height,
  }
}

function drawGame(playerX, bullets, enemies, score, lives, frame) {
  process.stdout.write('\x1Bc')

  // Cria uma grade vazia
  const grid = Array(GAME_HEIGHT)
    .fill(null)
    .map(() => Array(GAME_WIDTH).fill(' '))

  // Desenha tiros
  for (const bullet of bullets) {
    if (
      bullet.y >= 0 &&
      bullet.y < GAME_HEIGHT &&
      bullet.x >= 0 &&
      bullet.x < GAME_WIDTH
    ) {
      grid[bullet.y][bullet.x] = '↑'
    }
  }

  // Desenha inimigos
  for (const enemy of enemies) {
    const shape = getEnemyShape(enemy)
    const bounds = getEnemyBounds(enemy)
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        const gx = Math.floor(bounds.x1 + col)
        const gy = Math.floor(bounds.y1 + row)
        if (gx >= 0 && gx < GAME_WIDTH && gy >= 0 && gy < GAME_HEIGHT) {
          const char = shape[row][col]
          if (char !== ' ') {
            grid[gy][gx] = char
          }
        }
      }
    }
  }

  // Desenha jogador
  if (playerX >= 0 && playerX < GAME_WIDTH) {
    grid[PLAYER_Y][playerX] = '▲'
  }
  if (playerX - 1 >= 0) {
    grid[PLAYER_Y][playerX - 1] = '◄'
  }
  if (playerX + 1 < GAME_WIDTH) {
    grid[PLAYER_Y][playerX + 1] = '►'
  }

  // Monta a tela
  let screen = ''
  screen += '  ╔' + '═'.repeat(GAME_WIDTH) + '╗\n'
  for (let y = 0; y < GAME_HEIGHT; y++) {
    screen += '  ║' + grid[y].join('') + '║\n'
  }
  screen += '  ╚' + '═'.repeat(GAME_WIDTH) + '╝\n'
  screen += `   SCORE: ${String(score).padStart(
    4,
    '0'
  )}  |  LIVES: ${'♥'.repeat(lives)}${'♡'.repeat(3 - lives)}  |  WAVE: ${
    Math.floor(frame / 200) + 1
  }\n`
  screen += '   [A/◄] Esquerda  [D/►] Direita  [W/SPACE] Atirar  [Q] Sair\n'

  process.stdout.write(screen)
}

function showGameOver(score) {
  process.stdout.write('\x1Bc')
  console.log(
    defaultBoardSign(
      `💥 GAME OVER 💥\n\nPontuação Final: ${score}\n\nVocê foi atingido!\n\nObrigado por jogar :)`,
      { padding: 2, margin: 1, borderStyle: 'double' }
    )
  )
}

function showVictory(score) {
  process.stdout.write('\x1Bc')
  console.log(
    defaultBoardSign(
      `🏆 PARABÉNS! 🏆\n\nPontuação Final: ${score}\n\nVocê é um verdadeiro As da Aviação!\n\nObrigado por jogar :)`,
      { padding: 2, margin: 1, borderStyle: 'double', borderColor: '#00bc9e' }
    )
  )
}

function isBulletHitEnemy(bullet, enemy) {
  const bounds = getEnemyBounds(enemy)
  const shape = getEnemyShape(enemy)

  if (
    bullet.x >= bounds.x1 &&
    bullet.x <= bounds.x2 &&
    bullet.y >= bounds.y1 &&
    bullet.y <= bounds.y2
  ) {
    const row = Math.floor(bullet.y - bounds.y1)
    const col = Math.floor(bullet.x - bounds.x1)
    if (row >= 0 && row < shape.length && col >= 0 && col < shape[row].length) {
      return shape[row][col] !== ' '
    }
  }
  return false
}

function isEnemyHitPlayer(enemy, playerX) {
  const bounds = getEnemyBounds(enemy)
  const shape = getEnemyShape(enemy)

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === ' ') continue

      const gx = Math.floor(bounds.x1 + col)
      const gy = Math.floor(bounds.y1 + row)

      if (
        gy === PLAYER_Y &&
        (gx === playerX || gx === playerX - 1 || gx === playerX + 1)
      ) {
        return true
      }
    }
  }
  return false
}

async function planeGame() {
  let playerX = Math.floor(GAME_WIDTH / 2)
  let bullets = []
  let enemies = []
  let score = 0
  let lives = 3
  let isGameOver = false
  let frame = 0
  let enemySpeed = 0.3
  let spawnRate = 60 // frames entre spawns

  // Configura input raw
  const stdin = process.stdin
  const originalRawMode = stdin.isRaw
  stdin.setRawMode(true)
  stdin.resume()
  stdin.setEncoding('utf8')

  const keyHandler = (key) => {
    if (key === '\u0003') {
      // Ctrl+C
      stdin.setRawMode(originalRawMode)
      stdin.pause()
      process.exit()
    }
    if (key === 'q' || key === 'Q') {
      isGameOver = true
      return
    }
    if ((key === 'a' || key === 'A' || key === '\u001b[D') && playerX > 1) {
      playerX = Math.max(playerX - 2, 1)
    }
    if (
      (key === 'd' || key === 'D' || key === '\u001b[C') &&
      playerX < GAME_WIDTH - 2
    ) {
      playerX = Math.min(playerX + 2, GAME_WIDTH - 2)
    }
    if (key === 'w' || key === 'W' || key === ' ' || key === '\u001b[A') {
      const lastBullet = bullets[bullets.length - 1]
      if (!lastBullet || frame - lastBullet.frame > 5) {
        bullets.push({ x: playerX, y: PLAYER_Y - 1, frame })
      }
    }
  }

  stdin.on('data', keyHandler)

  // Limpa a tela inicial
  process.stdout.write('\x1Bc')

  // Game loop
  return new Promise((resolve) => {
    const gameLoop = setInterval(() => {
      if (isGameOver) {
        clearInterval(gameLoop)
        stdin.setRawMode(originalRawMode)
        stdin.pause()
        stdin.removeListener('data', keyHandler)
        showGameOver(score)
        resolve('')
        return
      }

      frame++

      // Aumenta dificuldade
      if (frame % 200 === 0) {
        enemySpeed = Math.min(enemySpeed + 0.1, 1.5)
        spawnRate = Math.max(spawnRate - 5, 20)
      }

      // Spawn inimigos (garante que caiba na tela)
      if (frame % Math.floor(spawnRate) === 0) {
        const type = Math.floor(Math.random() * ENEMY_SHAPES.length)
        const shapeWidth = ENEMY_SHAPES[type][0].length
        const minX = Math.floor(shapeWidth / 2) + 1
        const maxX = GAME_WIDTH - Math.floor(shapeWidth / 2) - 1
        enemies.push({
          x: Math.floor(Math.random() * (maxX - minX + 1)) + minX,
          y: 0,
          type: type,
        })
      }

      // Move tiros para cima
      bullets = bullets
        .map((b) => ({ ...b, y: b.y - 1, frame: b.frame }))
        .filter((b) => b.y >= 0)

      // Move inimigos para baixo
      enemies = enemies.map((e) => ({ ...e, y: e.y + enemySpeed }))

      // Verifica colisão tiro-inimigo
      for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
          const b = bullets[i]
          const e = enemies[j]
          if (b && e && isBulletHitEnemy(b, e)) {
            bullets.splice(i, 1)
            enemies.splice(j, 1)
            score += 10
            break
          }
        }
      }

      // Verifica colisão inimigo-jogador ou inimigo passou do jogador
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i]
        const bounds = getEnemyBounds(e)

        if (Math.floor(bounds.y2) >= PLAYER_Y) {
          if (isEnemyHitPlayer(e, playerX)) {
            lives--
            enemies.splice(i, 1)
            if (lives <= 0) {
              isGameOver = true
            }
          } else if (Math.floor(bounds.y1) >= GAME_HEIGHT) {
            enemies.splice(i, 1)
            score = Math.max(0, score - 5)
          }
        }
      }

      // Vitória secreta: 1000 pontos
      if (score >= 1000) {
        isGameOver = true
        clearInterval(gameLoop)
        stdin.setRawMode(originalRawMode)
        stdin.pause()
        stdin.removeListener('data', keyHandler)
        showVictory(score)
        resolve('')
        return
      }

      // Desenha
      drawGame(playerX, bullets, enemies, score, lives, frame)
    }, 80) // ~12.5 FPS
  })
}

module.exports = planeGame
