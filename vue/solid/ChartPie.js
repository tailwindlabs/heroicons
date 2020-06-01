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
      children.concat([_c('path',{attrs:{"d":"M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"}}),_c('path',{attrs:{"d":"M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"}})])
    )
  }
}