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
      children.concat([_c('path',{attrs:{"d":"M11 6a3 3 0 11-6 0 3 3 0 016 0zm3 11a6 6 0 00-12 0h12zm-1-9a1 1 0 100 2h4a1 1 0 100-2h-4z"}})])
    )
  }
}