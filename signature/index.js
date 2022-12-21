const { welcome, about, version, random, work } = require('./data')
const game = require('./game')

async function signature(args) {
  let signature = welcome()

  if (args.a || args.about) {
    signature = about()
  }

  if (args.r || args.random) {
    signature = random()
  }

  if (args.w || args.work) {
    signature = await work()
  }

  if (args.g || args.game) {
    signature = await game()
  }

  /**
   * O caso abaixo é para sobrescrever o comportamento
   * default, pois ainda não entendi pq quando uso essa opção ele
   * traz a propriedade no objeto args, mas com valor falso
   */
  if (typeof args.v !== 'undefined' || typeof args.version !== 'undefined') {
    signature = version()
  }

  return signature
}

module.exports = signature
