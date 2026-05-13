const chalk = require('chalk')

const { promptAsync, defaultBoardSign } = require('./utils')

const newline = '\n'

function welcome() {
  const data = {
    head: {
      key: chalk.white('         Rodrigo Nascimento | hello@rodrigo.is-a.dev'),
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
      value: chalk.white('https://rodrigo.is-a.dev/'),
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
    1: 'Afya - Software Engineer (abr/2023 - atual)\n\nAtuação estratégica com forte foco em Developer Experience (DX), qualidade de\nsoftware e evolução de sistemas críticos para o negócio, utilizando TypeScript.\n\nDeveloper Experience (DX) e Tooling: Engenharia e desenvolvimento de ferramentas\ninternas para otimizar o fluxo de trabalho dos times, incluindo sql-sage e glab-afya-cli.\n\nInovação e Produtividade com IA: Utilização diária de ferramentas e assistentes\nbasados em Inteligência Artificial para acelerar o desenvolvimento e otimizar refatorações.\n\nSistemas Críticos e Legados: Revitalização de arquiteturas legadas e\ndesenvolvimento de integrações financeiras críticas para a operação.\n\nLiderança Técnica e Mentoria: Mentorias para devs menos experientes e\nseminários internos sobre qualidade de código e padronização com ESLint.\n\nStack: Node.js, TypeScript, CI/CD, Docker, PostgreSQL, AWS',
    2: 'Visual Nuts - Software Engineer (abr/2022 - out/2022)\n\nAtuação alocada no cliente Transporeon (Bélgica), desenvolvendo soluções de\nlogística em colaboração com um time global (Antuérpia, Croácia, Índia e Rússia).\n\nAlgoritmos de Roteirização: Desenvolvimento e otimização de algoritmos de\ncálculo de rotas, garantindo alta eficiência e redução de custos operacionais.\n\nSistemas de Rastreamento: Engenharia de sistemas de tracking de cargas,\ngerenciando desde fretes simples até logística de materiais químicos perigosos.\n\nCompliance: Implementação de lógicas baseadas em legislações europeias de\nfaturamento e diretrizes globais de transporte.\n\nStack: Node.js, PostgreSQL, Docker, AWS',
    3: 'Zenklub - Backend Developer (mai/2021 - mar/2022)\n\nAtuação direta no core de engenharia de um dos maiores portais de Saúde Mental\ndo Brasil, desenvolvendo soluções de backend focadas em alta disponibilidade.\n\nMódulos de Análise de Perfil: Features complexas para análise e mapeamento\nde perfil de usuários, otimizando a jornada no app.\n\nArquitetura: Aplicação rigorosa de Clean Architecture com NestJS e TypeScript,\ngarantindo código desacoplado, testável e escalável.\n\nPerformance: Modelagem e otimização de rotinas em PostgreSQL, garantindo\nintegridade e velocidade no processamento das informações.\n\nStack: Node.js, TypeScript, NestJS, MongoDB, PostgreSQL, Docker, CI/CD',
    4: 'StarPay - Engineering Manager (jun/2019 - mai/2020)\n\nEmpresa de meios de pagamentos focada em prestadores de serviços e varejo.\n\nGestão de toda a plataforma do negócio, implementando monitoração e alarmes\nna API de transações com Cloudwatch, geração de arquivos para processamento\ndas adquirentes e pagamento dos clientes.\n\nEngenharia de sistemas para pagamentos utilizando POS s920 e mPOS D180,\nintegração com ambientes seguros de administradoras e processadoras de transações.\n\nLiderança técnica e coordenação de times de desenvolvimento.\n\nStack: AWS, Java, Go, MySQL, MongoDB, Oracle, NodeJS, Processamento de arquivos em lote',
    5: 'BLU365 - Full Stack Engineer / Head Of Support (out/2017 - mai/2019)\n\nPlataforma de negociação de dívidas as a Service.\n\nFull Stack Engineer: Desenvolvimento com ReactJS, NodeJS, Docker, MySQL e\nAWS (S3, Elastic Search).\n\nHead Of Support: Gestão, planejamento e desenvolvimento da plataforma com\nWordpress, PHP e MySQL. Planejamento de integrações com credores parceiros\njunto com time multidisciplinar (Big Data, Backend e Frontend).\n\nEstruturação de time operacional, criação de processos e ferramentas\npara controle e acompanhamento da operação.\n\nStack: ReactJS, NodeJS, PHP, MySQL, Docker, AWS',
    6: 'Polícia Científica do Estado de São Paulo\n\nDesenvolvimento de uma plataforma de Intranet com recursos de gestão\nusados pela instituição como frotas de veículos, controle de impressão,\nusando sistema de LDAP e gestão eletrônica de documentos com assinatura\ndigital de acordo com a hierarquia do usuário.',
  }

  let userInput

  if (!workPlaceIdx) {
    userInput = await promptAsync(
      defaultBoardSign(
        '⭐ Experiência ⭐ \
      \n #1 Afya \
      \n #2 Visual Nuts \
      \n #3 Zenklub \
      \n #4 StarPay \
      \n #5 BLU365\
      \n #6 Polícia Científica do Estado de São Paulo\n\n Selecione um número (1..6)'
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
    defaultBoardSign('Selecione um número (1..6) ou Enter para sair', {
      padding: 1,
    })
  )

  if (retryOrExit) {
    work(retryOrExit)
  } else {
    console.log(
      defaultBoardSign(
        'Se quiser saber mais acesse http://rodrigo.is-a.dev/ \nObrigado :)',
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
