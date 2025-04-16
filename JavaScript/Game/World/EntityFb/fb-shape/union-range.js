"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionRange =
    exports.unionToUnionRange =
    exports.UnionRange =
      void 0);
const box_range_js_1 = require("../fb-shape/box-range.js"),
  circle_range_js_1 = require("../fb-shape/circle-range.js"),
  cylinder_js_1 = require("../fb-shape/cylinder.js");
var UnionRange;
function unionToUnionRange(e, n) {
  switch (UnionRange[e]) {
    case "NONE":
      return;
    case "BoxRange":
      return n(new box_range_js_1.BoxRange());
    case "CircleRange":
      return n(new circle_range_js_1.CircleRange());
    case "Cylinder":
      return n(new cylinder_js_1.Cylinder());
    default:
      return;
  }
}
function unionListToUnionRange(e, n, r) {
  switch (UnionRange[e]) {
    case "NONE":
      return;
    case "BoxRange":
      return n(r, new box_range_js_1.BoxRange());
    case "CircleRange":
      return n(r, new circle_range_js_1.CircleRange());
    case "Cylinder":
      return n(r, new cylinder_js_1.Cylinder());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.BoxRange = 1)] = "BoxRange"),
    (e[(e.CircleRange = 2)] = "CircleRange"),
    (e[(e.Cylinder = 3)] = "Cylinder");
})((UnionRange = exports.UnionRange || (exports.UnionRange = {}))),
  (exports.unionToUnionRange = unionToUnionRange),
  (exports.unionListToUnionRange = unionListToUnionRange);
//# sourceMappingURL=union-range.js.map
