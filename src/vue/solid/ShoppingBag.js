import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export default function render(_ctx, _cache) {
return (_openBlock(), _createBlock("svg", {
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  _createVNode("path", {
    stroke: "#374151",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M5 8h10l1 9H4l1-9z"
  }),
  _createVNode("path", {
    stroke: "#374151",
    "stroke-width": "2",
    d: "M7 6a3 3 0 013-3v0a3 3 0 013 3v3a3 3 0 01-3 3v0a3 3 0 01-3-3V6z"
  }),
  _createVNode("rect", {
    width: "2",
    height: "2",
    x: "6",
    y: "9",
    rx: "1"
  }),
  _createVNode("rect", {
    width: "2",
    height: "2",
    x: "12",
    y: "9",
    rx: "1"
  })
]))
}