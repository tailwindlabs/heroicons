// The only reason this file exists is to appease Vite's optimizeDeps feature which requires a root-level import.

module.exports = new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === '__esModule') {
        return {}
      }

      throw new Error(
        `Importing from \`@heroicons/react\` directly is not supported. Please import from either \`@heroicons/react/16/solid\`, \`@heroicons/react/20/solid\`, \`@heroicons/react/24/solid\`, or \`@heroicons/react/24/outline\` instead.`
      )
    },
  }
)
