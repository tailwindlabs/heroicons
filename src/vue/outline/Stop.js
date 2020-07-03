import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export default function render(_ctx, _cache) {
return (_openBlock(), _createBlock("svg", {
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, [
  _createVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }),
  _createVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
  })
]))
}