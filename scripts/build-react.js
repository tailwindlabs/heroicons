const fs = require("fs").promises;
const dedent = require("dedent");
const camelcase = require("camelcase");
const { promisify } = require("util");
const rimraf = promisify(require("rimraf"));
const svgr = require("@svgr/core").default;

console.log(svgr);

function svgToReact(svg, componentName) {
  return svgr(svg, {}, { componentName });
}

console.log("Building React components...");

rimraf("./src/react/outline/*")
  .then(() => {
    return rimraf("./src/react/solid/*");
  })
  .then(() => {
    return Promise.all([
      fs.readdir("./solid").then((files) => {
        return Promise.all(
          files.map((file) => {
            const componentName = `${camelcase(file.replace(/\.svg$/, ""), {
              pascalCase: true,
            })}`;
            return fs
              .readFile(`./solid/${file}`, "utf8")
              .then((content) => {
                return svgToReact(content, `${componentName}Icon`);
              })
              .then((component) => {
                const fileName = `${componentName}.jsx`;
                const content = component;
                return fs
                  .writeFile(`./src/react/solid/${fileName}`, content)
                  .then(() => fileName);
              });
          })
        ).then((fileNames) => {
          const exportStatements = fileNames
            .map((fileName) => {
              const componentName = `${camelcase(
                fileName.replace(/\.jsx$/, ""),
                {
                  pascalCase: true,
                }
              )}`;
              return `export { default as ${componentName} } from './${fileName}'`;
            })
            .join("\n");

          return fs.writeFile("./src/react/solid/index.js", exportStatements);
        });
      }),

      fs.readdir("./outline").then((files) => {
        return Promise.all(
          files.map((file) => {
            const componentName = `${camelcase(file.replace(/\.svg$/, ""), {
              pascalCase: true,
            })}`;
            return fs
              .readFile(`./outline/${file}`, "utf8")
              .then((content) => {
                return svgToReact(content, `${componentName}Icon`);
              })
              .then((component) => {
                const fileName = `${componentName}.jsx`;
                const content = component;
                return fs
                  .writeFile(`./src/react/outline/${fileName}`, content)
                  .then(() => fileName);
              });
          })
        ).then((fileNames) => {
          const exportStatements = fileNames
            .map((fileName) => {
              const componentName = `${camelcase(
                fileName.replace(/\.jsx$/, ""),
                {
                  pascalCase: true,
                }
              )}`;
              return `export { default as ${componentName} } from './${fileName}'`;
            })
            .join("\n");

          return fs.writeFile("./src/react/outline/index.js", exportStatements);
        });
      }),
    ]);
  })
  .then(() => console.log("Finished building React components."));
