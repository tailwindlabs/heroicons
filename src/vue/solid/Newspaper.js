import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export default function render(_ctx, _cache) {
return (_openBlock(), _createBlock("svg", {
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  _createVNode("path", {
    "fill-rule": "evenodd",
    d: "M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z",
    "clip-rule": "evenodd"
  }),
  _createVNode("path", { d: "M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" })
]))
}