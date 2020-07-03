import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export default function render(_ctx, _cache) {
return (_openBlock(), _createBlock("svg", {
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  _createVNode("g", { "clip-path": "url(#clip0)" }, [
    _createVNode("path", {
      stroke: "#374151",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M14.243 15.243a6 6 0 01-8.486-8.486C5.757 9 6 11 9 12c0-2 1-8 2.5-9 1 2 1.571 2.586 2.742 3.757A5.981 5.981 0 0116 11a5.982 5.982 0 01-1.757 4.243z"
    }),
    _createVNode("path", { d: "M7.879 15.121a3 3 0 104.242-4.242C11.536 10.293 11.25 10 10.75 9c-.75.5-1.25 3.5-1.25 4.5C7.879 13.5 7 13 7 13c0 .768.293 1.536.879 2.121z" })
  ]),
  _createVNode("defs", null, [
    _createVNode("clipPath", { id: "clip0" }, [
      _createVNode("path", { d: "M0 0h20v20H0z" })
    ])
  ])
]))
}