"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionNewSplineMoveTarget =
    exports.unionToUnionNewSplineMoveTarget =
    exports.UnionNewSplineMoveTarget =
      void 0);
const npc_new_spline_move_target_js_1 = require("../fb-action/npc-new-spline-move-target.js"),
  player_new_spline_move_target_js_1 = require("../fb-action/player-new-spline-move-target.js"),
  scene_item_new_spline_move_target_js_1 = require("../fb-action/scene-item-new-spline-move-target.js"),
  vehicle_new_spline_move_target_js_1 = require("../fb-action/vehicle-new-spline-move-target.js");
var UnionNewSplineMoveTarget;
function unionToUnionNewSplineMoveTarget(e, n) {
  switch (UnionNewSplineMoveTarget[e]) {
    case "NONE":
      return;
    case "NpcNewSplineMoveTarget":
      return n(new npc_new_spline_move_target_js_1.NpcNewSplineMoveTarget());
    case "PlayerNewSplineMoveTarget":
      return n(
        new player_new_spline_move_target_js_1.PlayerNewSplineMoveTarget(),
      );
    case "SceneItemNewSplineMoveTarget":
      return n(
        new scene_item_new_spline_move_target_js_1.SceneItemNewSplineMoveTarget(),
      );
    case "VehicleNewSplineMoveTarget":
      return n(
        new vehicle_new_spline_move_target_js_1.VehicleNewSplineMoveTarget(),
      );
    default:
      return;
  }
}
function unionListToUnionNewSplineMoveTarget(e, n, t) {
  switch (UnionNewSplineMoveTarget[e]) {
    case "NONE":
      return;
    case "NpcNewSplineMoveTarget":
      return n(t, new npc_new_spline_move_target_js_1.NpcNewSplineMoveTarget());
    case "PlayerNewSplineMoveTarget":
      return n(
        t,
        new player_new_spline_move_target_js_1.PlayerNewSplineMoveTarget(),
      );
    case "SceneItemNewSplineMoveTarget":
      return n(
        t,
        new scene_item_new_spline_move_target_js_1.SceneItemNewSplineMoveTarget(),
      );
    case "VehicleNewSplineMoveTarget":
      return n(
        t,
        new vehicle_new_spline_move_target_js_1.VehicleNewSplineMoveTarget(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.NpcNewSplineMoveTarget = 1)] = "NpcNewSplineMoveTarget"),
    (e[(e.PlayerNewSplineMoveTarget = 2)] = "PlayerNewSplineMoveTarget"),
    (e[(e.SceneItemNewSplineMoveTarget = 3)] = "SceneItemNewSplineMoveTarget"),
    (e[(e.VehicleNewSplineMoveTarget = 4)] = "VehicleNewSplineMoveTarget");
})(
  (UnionNewSplineMoveTarget =
    exports.UnionNewSplineMoveTarget ||
    (exports.UnionNewSplineMoveTarget = {})),
),
  (exports.unionToUnionNewSplineMoveTarget = unionToUnionNewSplineMoveTarget),
  (exports.unionListToUnionNewSplineMoveTarget =
    unionListToUnionNewSplineMoveTarget);
//# sourceMappingURL=union-new-spline-move-target.js.map
