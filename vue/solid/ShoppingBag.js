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
      children.concat([_c('path',{attrs:{"stroke":"#374151","stroke-linejoin":"round","stroke-width":"2","d":"M5 8h10l1 9H4l1-9z"}}),_c('path',{attrs:{"stroke":"#374151","stroke-width":"2","d":"M7 6a3 3 0 013-3v0a3 3 0 013 3v3a3 3 0 01-3 3v0a3 3 0 01-3-3V6z"}}),_c('rect',{attrs:{"width":"2","height":"2","x":"6","y":"9","rx":"1"}}),_c('rect',{attrs:{"width":"2","height":"2","x":"12","y":"9","rx":"1"}})])
    )
  }
}