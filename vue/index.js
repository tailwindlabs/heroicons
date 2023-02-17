module.exports = new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === '__esModule') {
        return {}
      }

      throw new Error(
        `You\'re trying to import from \`@heroicons/vue\` directly which will not work. Please import from one of \`@heroicons/vue/20/solid\`, \`@heroicons/vue/24/solid\`, or \`@heroicons/vue/24/outline\` instead.`
      )
    },
  }
)
