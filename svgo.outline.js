module.exports = {
  js2svg: {
    indent: 2, // string with spaces or number of spaces. 4 by default
    pretty: true, // boolean, false by default
  },
  plugins: [
    'removeDimensions',
    { name: 'removeXMLNS', active: false },
    'sortAttrs',
    {
      name: 'removeAttrs',
      params: {
        attrs: ['stroke', 'path:stroke-width'],
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          { 'stroke-width': '2' },
          { stroke: 'currentColor' },
          { 'aria-hidden': 'true' },
        ],
      },
    },
  ],
}
