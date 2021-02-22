const fs = require("fs");
const fsPromises = require("fs").promises;
const jsBase = fs.readFileSync(__dirname + "/heroicons-js-base.js", "utf8");

const createLookupTable = (keys, values) => {
  return keys.reduce((acc, curr, index) => {
    const keyName = curr.replace(".svg", "");
    return {
      ...acc,
      [keyName]: values[index],
    };
  }, {});
};

const OUTLINE_ICONS_PATH = `./outline`;
const SOLID_ICONS_PATH = `./solid`;

const getIconCodeArray = async (path, fileNames) =>
  await Promise.all(
      fileNames.map((icon) => fsPromises.readFile(`${path}/${icon}`, "utf8"))
  );

const createLookupTables = async () => {
  const solidIconsArray = await fsPromises.readdir("./solid");
  const outlineIconsArray = await fsPromises.readdir("./outline");

  const solidIcons = await getIconCodeArray(
    SOLID_ICONS_PATH,
    solidIconsArray
  );
  const outlineIcons = await getIconCodeArray(
    OUTLINE_ICONS_PATH,
    outlineIconsArray
  );

  const solidLookupTable = createLookupTable(solidIconsArray, solidIcons);
  const outlineLookupTable = createLookupTable(
    outlineIconsArray,
    outlineIcons
  );

  return {
    solidLookupTable,
    outlineLookupTable,
  };
};

createJsFile = async () => {
  const lookupTables = await createLookupTables();
  const solid = JSON.stringify(lookupTables.solidLookupTable);
  const outline = JSON.stringify(lookupTables.outlineLookupTable);
  const filePrefix = `const solid = ${solid};\n const outline = ${outline};\n`;
  await fsPromises.writeFile(
    "./js/heroicons-loader.js",
    `${filePrefix} ${jsBase}`
  );
};

createJsFile();