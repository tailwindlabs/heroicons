export default {
  plugins: [
    'preset-default',
    'removeDimensions',
    'sortAttrs',
    'cleanupListOfValues',
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
          {
            'stroke-width': '1.0',
            stroke: 'currentColor',
            'aria-hidden': 'true',
            'data-slot': 'icon',
          },
        ],
      },
    },
  ],
}
