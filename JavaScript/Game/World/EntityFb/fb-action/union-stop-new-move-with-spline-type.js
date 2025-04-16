"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionStopNewMoveWithSplineType =
    exports.unionToUnionStopNewMoveWithSplineType =
    exports.UnionStopNewMoveWithSplineType =
      void 0);
const stop_new_move_with_spline_at_current_pos_js_1 = require("../fb-action/stop-new-move-with-spline-at-current-pos.js"),
  stop_new_move_with_spline_at_end_point_js_1 = require("../fb-action/stop-new-move-with-spline-at-end-point.js"),
  stop_new_move_with_spline_at_start_point_js_1 = require("../fb-action/stop-new-move-with-spline-at-start-point.js"),
  stop_new_move_with_spline_at_target_point_js_1 = require("../fb-action/stop-new-move-with-spline-at-target-point.js");
var UnionStopNewMoveWithSplineType;
function unionToUnionStopNewMoveWithSplineType(t, e) {
  switch (UnionStopNewMoveWithSplineType[t]) {
    case "NONE":
      return;
    case "StopNewMoveWithSplineAtCurrentPos":
      return e(
        new stop_new_move_with_spline_at_current_pos_js_1.StopNewMoveWithSplineAtCurrentPos(),
      );
    case "StopNewMoveWithSplineAtEndPoint":
      return e(
        new stop_new_move_with_spline_at_end_point_js_1.StopNewMoveWithSplineAtEndPoint(),
      );
    case "StopNewMoveWithSplineAtStartPoint":
      return e(
        new stop_new_move_with_spline_at_start_point_js_1.StopNewMoveWithSplineAtStartPoint(),
      );
    case "StopNewMoveWithSplineAtTargetPoint":
      return e(
        new stop_new_move_with_spline_at_target_point_js_1.StopNewMoveWithSplineAtTargetPoint(),
      );
    default:
      return;
  }
}
function unionListToUnionStopNewMoveWithSplineType(t, e, n) {
  switch (UnionStopNewMoveWithSplineType[t]) {
    case "NONE":
      return;
    case "StopNewMoveWithSplineAtCurrentPos":
      return e(
        n,
        new stop_new_move_with_spline_at_current_pos_js_1.StopNewMoveWithSplineAtCurrentPos(),
      );
    case "StopNewMoveWithSplineAtEndPoint":
      return e(
        n,
        new stop_new_move_with_spline_at_end_point_js_1.StopNewMoveWithSplineAtEndPoint(),
      );
    case "StopNewMoveWithSplineAtStartPoint":
      return e(
        n,
        new stop_new_move_with_spline_at_start_point_js_1.StopNewMoveWithSplineAtStartPoint(),
      );
    case "StopNewMoveWithSplineAtTargetPoint":
      return e(
        n,
        new stop_new_move_with_spline_at_target_point_js_1.StopNewMoveWithSplineAtTargetPoint(),
      );
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.StopNewMoveWithSplineAtCurrentPos = 1)] =
      "StopNewMoveWithSplineAtCurrentPos"),
    (t[(t.StopNewMoveWithSplineAtEndPoint = 2)] =
      "StopNewMoveWithSplineAtEndPoint"),
    (t[(t.StopNewMoveWithSplineAtStartPoint = 3)] =
      "StopNewMoveWithSplineAtStartPoint"),
    (t[(t.StopNewMoveWithSplineAtTargetPoint = 4)] =
      "StopNewMoveWithSplineAtTargetPoint");
})(
  (UnionStopNewMoveWithSplineType =
    exports.UnionStopNewMoveWithSplineType ||
    (exports.UnionStopNewMoveWithSplineType = {})),
),
  (exports.unionToUnionStopNewMoveWithSplineType =
    unionToUnionStopNewMoveWithSplineType),
  (exports.unionListToUnionStopNewMoveWithSplineType =
    unionListToUnionStopNewMoveWithSplineType);
//# sourceMappingURL=union-stop-new-move-with-spline-type.js.map
