import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export default function render(_ctx, _cache) {
return (_openBlock(), _createBlock("svg", {
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  _createVNode("path", { d: "M10 12a2 2 0 100-4 2 2 0 000 4z" }),
  _createVNode("path", {
    "fill-rule": "evenodd",
    d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
    "clip-rule": "evenodd"
  })
]))
}