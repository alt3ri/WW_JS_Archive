"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPointGroup =
    exports.unionToUnionPointGroup =
    exports.UnionPointGroup =
      void 0);
const point_group_by_layer_js_1 = require("../fb-component/point-group-by-layer.js");
var UnionPointGroup;
function unionToUnionPointGroup(o, n) {
  switch (UnionPointGroup[o]) {
    case "NONE":
      return;
    case "PointGroupByLayer":
      return n(new point_group_by_layer_js_1.PointGroupByLayer());
    default:
      return;
  }
}
function unionListToUnionPointGroup(o, n, r) {
  switch (UnionPointGroup[o]) {
    case "NONE":
      return;
    case "PointGroupByLayer":
      return n(r, new point_group_by_layer_js_1.PointGroupByLayer());
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.PointGroupByLayer = 1)] = "PointGroupByLayer");
})(
  (UnionPointGroup = exports.UnionPointGroup || (exports.UnionPointGroup = {})),
),
  (exports.unionToUnionPointGroup = unionToUnionPointGroup),
  (exports.unionListToUnionPointGroup = unionListToUnionPointGroup);
//# sourceMappingURL=union-point-group.js.map
