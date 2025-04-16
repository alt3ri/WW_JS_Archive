"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSplineMoveTarget =
    exports.unionToUnionSplineMoveTarget =
    exports.UnionSplineMoveTarget =
      void 0);
const entity_spline_move_target_js_1 = require("../fb-action/entity-spline-move-target.js"),
  player_spline_move_target_js_1 = require("../fb-action/player-spline-move-target.js");
var UnionSplineMoveTarget;
function unionToUnionSplineMoveTarget(e, t) {
  switch (UnionSplineMoveTarget[e]) {
    case "NONE":
      return;
    case "EntitySplineMoveTarget":
      return t(new entity_spline_move_target_js_1.EntitySplineMoveTarget());
    case "PlayerSplineMoveTarget":
      return t(new player_spline_move_target_js_1.PlayerSplineMoveTarget());
    default:
      return;
  }
}
function unionListToUnionSplineMoveTarget(e, t, n) {
  switch (UnionSplineMoveTarget[e]) {
    case "NONE":
      return;
    case "EntitySplineMoveTarget":
      return t(n, new entity_spline_move_target_js_1.EntitySplineMoveTarget());
    case "PlayerSplineMoveTarget":
      return t(n, new player_spline_move_target_js_1.PlayerSplineMoveTarget());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.EntitySplineMoveTarget = 1)] = "EntitySplineMoveTarget"),
    (e[(e.PlayerSplineMoveTarget = 2)] = "PlayerSplineMoveTarget");
})(
  (UnionSplineMoveTarget =
    exports.UnionSplineMoveTarget || (exports.UnionSplineMoveTarget = {})),
),
  (exports.unionToUnionSplineMoveTarget = unionToUnionSplineMoveTarget),
  (exports.unionListToUnionSplineMoveTarget = unionListToUnionSplineMoveTarget);
//# sourceMappingURL=union-spline-move-target.js.map
