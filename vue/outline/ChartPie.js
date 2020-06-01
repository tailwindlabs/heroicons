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
      children.concat([_c('path',{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","d":"M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"}}),_c('path',{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","d":"M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"}})])
    )
  }
}