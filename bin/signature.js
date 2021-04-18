#!/usr/bin/env node

const chalk = require('chalk')
const boxen = require('boxen')
const yargs = require('yargs')

const newline = '\n'

function signatureOutput() {
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
    'Tive uma banda no ensino médio. Se chamava: "No Control"',
    "Já atuei em uma piloto para uma série de TV, que, ainda bem nunca foi ao ar ><'",
    'Eu gostava de pescar, mas hoje sinto pena dos peixinhos. Vou aprender a mergulhar',
    'Tenho um sonho de pular de paraquedas.',
    'Já fui escoteiro',
    'Já fui da equipe de pentatlo do Colégio',
    'Sempre quis ser canhoto.',
    'Tenho mais de 10 tatuagens',
  ]

  const randomFact = Math.floor(Math.random() * randomFacts.length)

  return `Random Fact #${randomFact}: ${randomFacts[randomFact]}`
}

function main(args) {
  const chalkOptions = {
    padding: 3,
    margin: 3,
    borderStyle: 'double',
    float: 'center',
    borderColor: '#005792',
    backgroundColor: 'black',
  }
  console.log(args, args.n, typeof args.v)

  let signature = signatureOutput()

  if (args.a || args.about) {
    signature = about()
  }

  if (args.r || args.random) {
    signature = random()
  }
  /**
   * Os dois casos abaixo é para sobrescrever o comportamento
   * default que exibe apenas o helper e a versão é do pacote npm
   */
  if (typeof args.v !== 'undefined' || typeof args.version !== 'undefined') {
    signature = version()
  }

  if (typeof args.h !== 'undefined' || typeof args.help !== 'undefined') {
    yargs.showHelp()
    return
  }

  console.log(chalk.green(boxen(signature, chalkOptions)))
}

yargs.updateStrings({
  'Show help': 'Exibe as opções de do cli',
  'Show version number': 'Exibe a versão do cli',
})

const args = yargs.options({
  h: {
    alias: 'help',
    type: 'string',
  },
  v: {
    alias: 'version',
    type: 'string',
  },
  a: {
    alias: 'about',
    describe: 'Um pouco sobre o Rodrigo',
  },
  r: {
    alias: 'random',
    describe: 'Coisas aleatórias sobre o Rodrigo',
  },
}).argv

main(args)
