export default {
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
      children.concat([_c('path',{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","d":"M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"}})])
    )
  }
}