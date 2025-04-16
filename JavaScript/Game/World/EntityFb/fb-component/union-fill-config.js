"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionFillConfig =
    exports.unionToUnionFillConfig =
    exports.UnionFillConfig =
      void 0);
const direction_fill_js_1 = require("../fb-component/direction-fill.js"),
  fixed_fill_js_1 = require("../fb-component/fixed-fill.js");
var UnionFillConfig;
function unionToUnionFillConfig(i, n) {
  switch (UnionFillConfig[i]) {
    case "NONE":
      return;
    case "DirectionFill":
      return n(new direction_fill_js_1.DirectionFill());
    case "FixedFill":
      return n(new fixed_fill_js_1.FixedFill());
    default:
      return;
  }
}
function unionListToUnionFillConfig(i, n, e) {
  switch (UnionFillConfig[i]) {
    case "NONE":
      return;
    case "DirectionFill":
      return n(e, new direction_fill_js_1.DirectionFill());
    case "FixedFill":
      return n(e, new fixed_fill_js_1.FixedFill());
    default:
      return;
  }
}
!(function (i) {
  (i[(i.NONE = 0)] = "NONE"),
    (i[(i.DirectionFill = 1)] = "DirectionFill"),
    (i[(i.FixedFill = 2)] = "FixedFill");
})(
  (UnionFillConfig = exports.UnionFillConfig || (exports.UnionFillConfig = {})),
),
  (exports.unionToUnionFillConfig = unionToUnionFillConfig),
  (exports.unionListToUnionFillConfig = unionListToUnionFillConfig);
//# sourceMappingURL=union-fill-config.js.map
