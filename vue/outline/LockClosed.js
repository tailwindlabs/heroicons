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
        attrs: Object.assign({"fill":"none","viewBox":"0 0 24 24","stroke":"currentColor"}, attrs),
        ...rest,
      },
      children.concat([_c('path',{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","d":"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"}})])
    )
  }
}