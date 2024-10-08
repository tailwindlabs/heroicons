// The only reason this file exists is to appease Vite's optimizeDeps feature which requires a root-level import.

export default new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === '__esModule') {
        return {}
      }

      throw new Error(
        `Importing from \`@jokula-heroicons/react\` directly is not supported. Please import from either \`@jokula-heroicons/react/16/jk\`, \`@jokula-heroicons/react/20/jk\`, \`@jokula-heroicons/react/24/jk\`, \`@jokula-heroicons/react/16/solid\`, \`@jokula-heroicons/react/20/solid\`, \`@jokula-heroicons/react/24/solid\`, or \`@jokula-heroicons/react/24/outline\` instead.`
      )
    },
  }
)
