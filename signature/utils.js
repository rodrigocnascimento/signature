const chalk = require('chalk')
const boxen = require('boxen')
const readline = require('readline')

function defaultBoardSign(text, newOpts = {}) {
  if (text)
    return chalk.green(
      boxen(
        text,
        Object.assign(
          {
            padding: 3,
            margin: 3,
            borderStyle: 'double',
            float: 'center',
            borderColor: '#005792',
            backgroundColor: 'black',
          },
          newOpts
        )
      )
    )
}

function promptAsync(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) =>
    rl.question(question, (ans) => {
      rl.close()
      resolve(ans)
    })
  )
}

module.exports = { promptAsync, defaultBoardSign }
