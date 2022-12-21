#!/usr/bin/env node

const yargs = require('yargs')

const { defaultBoardSign } = require('./signature/utils')
const signature = require('./signature')

async function main(args) {
  if (typeof args.h !== 'undefined' || typeof args.help !== 'undefined') {
    yargs.showHelp()
    return
  }

  console.log(defaultBoardSign(await signature(args)))
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
  w: {
    alias: 'work',
    describe: 'Trabalhos e projetos',
  },
  g: {
    alias: 'game',
    describe: 'Fun & Games',
  },
}).argv

main(args)
