// The only reason this file exists is to appease Vite's optimizeDeps feature which requires a root-level import.

export default new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === '__esModule') {
        return {}
      }

      throw new Error(
        `Importing from \`@heroicons/nullstack\` directly is not supported. Please import from either \`@heroicons/nullstack/20/solid\`, \`@heroicons/nullstack/24/solid\`, or \`@heroicons/nullstack/24/outline\` instead.`
      )
    },
  }
)
