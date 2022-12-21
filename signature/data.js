const chalk = require('chalk')

const { promptAsync, defaultBoardSign } = require('./utils')

const newline = '\n'

function welcome() {
  const data = {
    head: {
      key: chalk.white('         Rodrigo Nascimento | hello@rodrigo.world'),
      value: chalk.rgb(0, 172, 238).bold(''),
    },
    work: {
      key: chalk.rgb(0, 188, 158).bold('      Work:'),
      value: chalk.white(
        'Experienced Software Engineer looking for new opportunities'
      ),
    },
    web: {
      key: chalk.rgb(0, 87, 146).bold('       Web:'),
      value: chalk.white('https://rodrigo.world/'),
    },
    twitter: {
      key: chalk.rgb(0, 172, 238).bold('   Twitter:'),
      value: chalk.white('https://twitter.com/@_whiletruedo'),
    },
    github: {
      key: chalk.rgb(250, 251, 252).bold('    GitHub:'),
      value: chalk.white('https://github.com/rodrigocnascimento'),
    },
    linkedin: {
      key: chalk.rgb(14, 118, 168).bold('  LinkedIn:'),
      value: chalk.white('https://www.linkedin.com/in/rodrigocesarnascimento'),
    },
    signature: {
      key: chalk.rgb(205, 59, 41).bold('      Signature:'),
      value: chalk.white('npx rodrigocnascimento'),
    },
    help: {
      key: chalk.rgb(205, 59, 41).bold('     '),
      value: chalk.white('npx rodrigocnascimento --help'),
    },
  }
  return [
    `${data.head.key} ${data.head.value}`,
    newline,
    newline,
    `${data.work.key} ${data.work.value}`,
    newline,
    newline,
    `${data.web.key} ${data.web.value}`,
    newline,
    `${data.github.key} ${data.github.value}`,
    newline,
    `${data.twitter.key} ${data.twitter.value}`,
    newline,
    `${data.linkedin.key} ${data.linkedin.value}`,
    newline,
    newline,
    `${data.signature.key} ${data.signature.value}`,
    newline,
    newline,
    `${data.help.key} ${data.help.value}`,
  ].join('')
}

function about() {
  return (
    'Amo tecnologia e pessoas. Gosto de pensar que a tecnologia só é possível porque alguém uma vez ' +
    newline +
    'sonhou com uma sociedade melhor onde pudéssemos ajudar uns aos outros por meio da tecnologia. ' +
    newline +
    'Eu sei que é um caminho difícil e longo, mas é viável.' +
    newline +
    newline +
    'Desde criança adoro computadores. Meu primeiro computador foi um MSX onde na verdade eu apenas jogava para me divertir, ' +
    newline +
    'mas um dia meus pais compraram um intel 486 e eu comecei a estudar Turbo Pascal porque encontrei ' +
    newline +
    'um livro na biblioteca da minha escola e para ser honesto, naquela época, não sabia o que fazer com isso, mas amei.' +
    newline +
    newline +
    'Algum tempo depois, naquele ano, minha escola criou um projeto onde os alunos aprendiam ' +
    newline +
    'HTML e Javascript (CSS não era tão famoso) para apresentar um projeto de ano letivo. Adorei, ' +
    newline +
    'mas não pensei nisso como uma profissão.' +
    newline +
    newline +
    'Quando comecei a trabalhar, embora naquela época eu não estivesse trabalhando com programação, tudo o que ' +
    newline +
    'fazia estava relacionado. Fiz alguns consertos no PC, trabalhei com publicidade criando logotipos e flyers com o CorelDraw' +
    newline +
    'e outros pequenos trabalhos relacionados ao PC. ' +
    newline +
    newline +
    'Meu primeiro curso de graduação foi em administração, mas não gostei e meu irmão ' +
    newline +
    'falou que eu tinha que fazer Análise de Sistemas e no primeiro dia soube que era o que eu queria fazer. ' +
    newline +
    newline +
    'Foi em 2004 e desde então adoro estudar linguagens de programação e computadores.'
  )
}

function version() {
  const date = new Date()

  return `Rodrigo Nascimento™ is a trademark since 1985 v${
    date.getFullYear() - 1986
  }.${date.getMonth() + 1}.${date.getDate()}`
}

function random() {
  const randomFacts = [
    'Eu quebrei o braço uma vez, uma fratura exposta. Não senti dor nenhuma.',
    'Aprendi a tocar violão, baixo e guitarra sozinho.',
    'Toquei em uma banda no ensino médio. Se chamava: "No Control"',
    "Já atuei em uma piloto para uma série de TV, que, ainda bem nunca foi ao ar ><'",
    'Eu gostava de pescar, mas hoje sinto pena dos peixinhos. Vou aprender a mergulhar!',
    'Tenho um sonho de pular de paraquedas.',
    'Já fui escoteiro.',
    'Já fui da equipe de pentatlo do Colégio Militar.',
    'Sempre quis ser canhoto.',
    'Tenho mais de 10 tatuagens.',
  ]

  const randomFact = Math.floor(Math.random() * randomFacts.length)

  return `Random Fact #${randomFact}: ${randomFacts[randomFact]}`
}

async function work(workPlaceIdx) {
  const workPlace = {
    1: 'Uma experiência muito interessante, onde tive a oportunidade de trabalhar\nno meu primeiro projeto internacional.\nEm um TMS que monitorava em tempo real milhares de entregas pela Europa e todo o\nmundo, além de várias ferramentas para o segmento de logística.\n\nStack: AWS, Docker, SQS, Coffescript (@.@) + NodeJS, PostgreSQL, Kubernetes',
    2: 'Uma plataforma de terapia online, que se tornou referência no Brasil todo no segmento.\nTrabalhei em uma plataforma de gestão de saúde mental para empresas. \n\nStack: NodeJS Typescript, NestJS, MongoDB, PostgreSQL, Scrum e processos ágeis.',
    3: 'Atuei como Gerente de Engenharia, na gestão de toda a plataforma do negócio.\nImplementando recursos de monitoração e alarmes na API de transaçoẽs com Cloudwatch,\ngeração de arquivos para o processamento das adquirentes e pagamento dos clientes,\nsuporte das máquinas de cartão POS s920 e mPOS D180, implementando novas features e melhorias.\n\nStack: AWS, Java, Go, MySQL, MongoDb, Oracle, NodeJS e Processamento de arquivos em lote.',
    4: 'Inicialmente entrei como desenvolvedor Fullstack, mas com o tempo fui absorvendo\noutras atividades e passei a atuar na gestão estratégica do negócio.\nEra responsável por trazer a visão aos times de desenvolvimento as integrações\ncom parceiros, discutindo desde de negócio com stakeholdes, a arquitetura com os desenvolvedores.',
    5: 'Trabalhei no desenvolvimento de uma plataforma de Intranet para a Polícia Científica no Estado São Paulo.\nUma plataforma com recursos de gestão usados pela instituição como frotas de veículos,\ncontrole de impressão, usando sistema de LDAP já existente e um sistema de\ngestão eletrônica de documentos, permitindo com que os mesmos fossem assinados\nde acordo com a hierarquia do usuário na instituição.',
  }

  let userInput

  if (!workPlaceIdx) {
    userInput = await promptAsync(
      defaultBoardSign(
        '⭐ Experiência ⭐ \
      \n #1 Supply Stack \
      \n #2 Zenklub \
      \n #3 StarPay \
      \n #4 BLU365\
      \n #5 Polícia Científica do Estado de São Paulo\n\n Selecione um número (1..5)'
      )
    )
  }

  console.log(
    defaultBoardSign(
      workPlace[userInput || workPlaceIdx] || 'Option not found',
      {
        margin: 0,
      }
    )
  )

  const retryOrExit = await promptAsync(
    defaultBoardSign('Selecione um número (1..5) ou Enter para sair', {
      padding: 1,
    })
  )

  if (retryOrExit) {
    work(retryOrExit)
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

module.exports = {
  welcome,
  about,
  version,
  random,
  work,
}
