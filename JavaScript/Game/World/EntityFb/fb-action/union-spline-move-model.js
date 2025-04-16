"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSplineMoveModel =
    exports.unionToUnionSplineMoveModel =
    exports.UnionSplineMoveModel =
      void 0);
const close_spline_move_js_1 = require("../fb-action/close-spline-move.js"),
  open_spline_move_js_1 = require("../fb-action/open-spline-move.js");
var UnionSplineMoveModel;
function unionToUnionSplineMoveModel(e, n) {
  switch (UnionSplineMoveModel[e]) {
    case "NONE":
      return;
    case "CloseSplineMove":
      return n(new close_spline_move_js_1.CloseSplineMove());
    case "OpenSplineMove":
      return n(new open_spline_move_js_1.OpenSplineMove());
    default:
      return;
  }
}
function unionListToUnionSplineMoveModel(e, n, o) {
  switch (UnionSplineMoveModel[e]) {
    case "NONE":
      return;
    case "CloseSplineMove":
      return n(o, new close_spline_move_js_1.CloseSplineMove());
    case "OpenSplineMove":
      return n(o, new open_spline_move_js_1.OpenSplineMove());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CloseSplineMove = 1)] = "CloseSplineMove"),
    (e[(e.OpenSplineMove = 2)] = "OpenSplineMove");
})(
  (UnionSplineMoveModel =
    exports.UnionSplineMoveModel || (exports.UnionSplineMoveModel = {})),
),
  (exports.unionToUnionSplineMoveModel = unionToUnionSplineMoveModel),
  (exports.unionListToUnionSplineMoveModel = unionListToUnionSplineMoveModel);
//# sourceMappingURL=union-spline-move-model.js.map
