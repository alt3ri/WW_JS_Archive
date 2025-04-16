"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionMoveSceneItem =
    exports.unionToUnionMoveSceneItem =
    exports.UnionMoveSceneItem =
      void 0);
const cycle_move_to_points_js_1 = require("../fb-action/cycle-move-to-points.js"),
  move_to_point_js_1 = require("../fb-action/move-to-point.js"),
  move_to_relative_position_js_1 = require("../fb-action/move-to-relative-position.js");
var UnionMoveSceneItem;
function unionToUnionMoveSceneItem(e, o) {
  switch (UnionMoveSceneItem[e]) {
    case "NONE":
      return;
    case "CycleMoveToPoints":
      return o(new cycle_move_to_points_js_1.CycleMoveToPoints());
    case "MoveToPoint":
      return o(new move_to_point_js_1.MoveToPoint());
    case "MoveToRelativePosition":
      return o(new move_to_relative_position_js_1.MoveToRelativePosition());
    default:
      return;
  }
}
function unionListToUnionMoveSceneItem(e, o, t) {
  switch (UnionMoveSceneItem[e]) {
    case "NONE":
      return;
    case "CycleMoveToPoints":
      return o(t, new cycle_move_to_points_js_1.CycleMoveToPoints());
    case "MoveToPoint":
      return o(t, new move_to_point_js_1.MoveToPoint());
    case "MoveToRelativePosition":
      return o(t, new move_to_relative_position_js_1.MoveToRelativePosition());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CycleMoveToPoints = 1)] = "CycleMoveToPoints"),
    (e[(e.MoveToPoint = 2)] = "MoveToPoint"),
    (e[(e.MoveToRelativePosition = 3)] = "MoveToRelativePosition");
})(
  (UnionMoveSceneItem =
    exports.UnionMoveSceneItem || (exports.UnionMoveSceneItem = {})),
),
  (exports.unionToUnionMoveSceneItem = unionToUnionMoveSceneItem),
  (exports.unionListToUnionMoveSceneItem = unionListToUnionMoveSceneItem);
//# sourceMappingURL=union-move-scene-item.js.map
