const fs = require('fs').promises;
const fse = require('fs-extra');
const svgr = require('@svgr/core').default;
const capitalize = require('capitalize');

const getIconsNames = async ({
  areSolid,
}) => await fs.readdir(`./src/${areSolid ? 'solid' : 'outline'}/`);

const renameIconName = async ({
  iconName,
  isSolid,
}) => await fs.rename(`./src/${isSolid ? 'solid' : 'outline'}/${iconName}`, `./src/${isSolid ? 'solid' : 'outline'}/${iconName.replace('svg', 'txt')}`);

const undoRenameIconName = async ({
  iconName,
  isSolid,
}) => await fs.rename(`./src/${isSolid ? 'solid' : 'outline'}/${iconName}`, `./src/${isSolid ? 'solid' : 'outline'}/${iconName.replace('txt', 'svg')}`);

const getTextFromIcon = async ({
  iconName,
  isSolid,
}) => await fs.readFile(`./src/${isSolid ? 'solid' : 'outline'}/${iconName}`, 'utf-8');

const transformIconToReactIcon = async ({
  iconCode,
  componentName,
}) => await svgr(iconCode, {
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  icon: true,
}, { componentName });

const createReactIcon = async ({
  componentName,
  isSolid,
  reactIcon,
  tsx,
}) => await fse.outputFile(`./react-icons/${isSolid ? 'solid' : 'outline'}/${componentName}.${tsx ? 'tsx' : 'js'}`, reactIcon, 'utf-8');

async function buildReactIcons({
  isSolid,
  tsx = process.argv[2],
}) {
  const iconsNames = await getIconsNames({
    areSolid: false,
  });

  iconsNames.forEach(async (iconName) => {
    // There's a weird file which isn't svg.
    if (iconName === '.DS_Store') return;

    if (iconName.endsWith('.svg')) {
      await renameIconName({
        iconName,
        isSolid,
      });
    }

    // Now it ends in '*.txt'.
    iconName = iconName.replace('svg', 'txt');
    // The text is actually the code.
    const iconCode = await getTextFromIcon({
      iconName,
      isSolid,
    });

    // The componentName is actually the reactIcon's name.
    const componentName = capitalize.words(iconName.replace('.txt', '').replace(/-/g, ' ')).replace(/ /g, '');
    // The reactIcon is the component's code.
    const reactIcon = await transformIconToReactIcon({
      iconCode,
      componentName,
    });

    await createReactIcon({
      componentName,
      isSolid,
      reactIcon,
      tsx,
    });

    // I'll make them '*.svg'.
    await undoRenameIconName({
      iconName,
      isSolid,
    });
  });
}

console.log('Building React icons...');

buildReactIcons({
  isSolid: true,
});

buildReactIcons({
  isSolid: false,
});