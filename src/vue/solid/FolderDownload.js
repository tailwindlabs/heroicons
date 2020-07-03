import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export default function render(_ctx, _cache) {
return (_openBlock(), _createBlock("svg", {
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  _createVNode("path", { d: "M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" }),
  _createVNode("path", {
    stroke: "#fff",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M10 9v4m0 0l-2-2m2 2l2-2"
  })
]))
}