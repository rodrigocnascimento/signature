const { promptAsync, defaultBoardSign } = require('./utils')

module.exports = async function game(weaponIdx) {
  const weapon = {
    1: {
      name: 'PEDRA',
      shape: `
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
`,
    },
    2: {
      name: 'PAPEL',
      shape: `
    ________
---'    ____)____
           ______)
          _______)
         _______)
---.__________)
`,
    },
    3: {
      name: 'TESOURA',
      shape: `
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
`,
    },
  }

  let result

  let userInput

  if (!weaponIdx) {
    userInput = await promptAsync(
      defaultBoardSign(
        'SELECIONE SUA ARMA\n #1 PEDRA \n #2 PAPEL \n #3 TESOURA'
      )
    )
  }

  const userWeapon = parseInt(userInput || weaponIdx)
  const pcWeapon = Math.floor(Math.random() * 3) + 1 // wow such random

  const pcChoice = weapon[pcWeapon]
  const userChoice = weapon[userWeapon]

  if (!pcChoice || !userChoice) {
    console.log(
      defaultBoardSign(`Opção não encontrada`, {
        margin: 0,
        padding: 0,
      })
    )
    return game()
  }

  if (userWeapon == 1 && pcWeapon == 3) {
    result = '😊 VOCÊ GANHOU 😊'
  } else if (pcWeapon == 1 && userWeapon == 3) {
    result = '😡 VOCÊ PERDEU 😡'
  } else if (pcWeapon > userWeapon) {
    result = '😡 VOCÊ PERDEU 😡'
  } else if (userWeapon > pcWeapon) {
    result = '😊 VOCÊ GANHOU 😊'
  } else if (userWeapon === pcWeapon) {
    result = 'EMPATE'
  }

  console.log(
    defaultBoardSign(
      `⭐ JO KEN PO ⭐ \n USER: ${userChoice.name} ${userChoice.shape}\nPC: ${pcChoice.name} ${pcChoice.shape} \n  ${result}`,
      {
        margin: 0,
      }
    )
  )

  const retryOrExit = await promptAsync(
    defaultBoardSign('Escolha sua arma (1..3) ou Enter para sair', {
      padding: 1,
      margin: 0,
    })
  )

  if (retryOrExit) {
    return game(retryOrExit)
  } else {
    console.log(
      defaultBoardSign(
        'Se quiser saber mais acesse http://rodrigo.world/ \nObrigado :)',
        {
          padding: 1,
          borderStyle: 'single',
        }
      )
    )
  }
}
