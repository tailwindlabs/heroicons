module.exports = {
  functional: true,
  render(_h, _vm) {
    const { _c, _v, data, children = [] } = _vm;

    const {
      class: classNames,
      staticClass,
      style,
      staticStyle,
      attrs = {},
      ...rest
    } = data;

    return _c(
      'svg',
      {
        class: [classNames,staticClass],
        style: [style,staticStyle],
        attrs: Object.assign({"viewBox":"0 0 20 20","fill":"currentColor"}, attrs),
        ...rest,
      },
      children.concat([_c('path',{attrs:{"fill-rule":"evenodd","d":"M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zm-2 7a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zm8-12a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z","clip-rule":"evenodd"}}),_c('path',{attrs:{"d":"M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zm-1 3a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zm6 2a1 1 0 100 2 1 1 0 000-2zm-7 4a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zm-2-2a1 1 0 100-2H4a1 1 0 100 2h3zm10 2a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zm-1 4a1 1 0 100-2h-3a1 1 0 100 2h3z"}})])
    )
  }
}