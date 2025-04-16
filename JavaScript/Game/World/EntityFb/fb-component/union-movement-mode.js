"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionMovementMode =
    exports.unionToUnionMovementMode =
    exports.UnionMovementMode =
      void 0);
const spline_move_js_1 = require("../fb-component/spline-move.js");
var UnionMovementMode;
function unionToUnionMovementMode(e, n) {
  switch (UnionMovementMode[e]) {
    case "NONE":
      return;
    case "SplineMove":
      return n(new spline_move_js_1.SplineMove());
    default:
      return;
  }
}
function unionListToUnionMovementMode(e, n, o) {
  switch (UnionMovementMode[e]) {
    case "NONE":
      return;
    case "SplineMove":
      return n(o, new spline_move_js_1.SplineMove());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"), (e[(e.SplineMove = 1)] = "SplineMove");
})(
  (UnionMovementMode =
    exports.UnionMovementMode || (exports.UnionMovementMode = {})),
),
  (exports.unionToUnionMovementMode = unionToUnionMovementMode),
  (exports.unionListToUnionMovementMode = unionListToUnionMovementMode);
//# sourceMappingURL=union-movement-mode.js.map
