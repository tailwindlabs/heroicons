import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

const solid = "./src/react/solid/index.js";
const outline = "./src/react/outline/index.js";

export default [
  {
    input: outline,
    output: {
      file: "./react/outline/index.js",
      format: "cjs",
    },
    plugins: [babel({ babelHelpers: "bundled" }), resolve(), commonjs()],
  },
  {
    input: solid,
    output: {
      file: "./react/solid/index.js",
      format: "cjs",
    },
    plugins: [babel({ babelHelpers: "bundled" }), resolve(), commonjs()],
  },
];
