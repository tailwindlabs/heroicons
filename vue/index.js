module.exports = new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === '__esModule') {
        return {}
      }

      throw new Error(
        `You\'re trying to import from \`@heroicons/react\` directly which will not work. Please import from one of \`@heroicons/react/20/solid\`, \`@heroicons/react/24/solid\`, or \`@heroicons/react/24/outline\` instead.`
      )
    },
  }
)
