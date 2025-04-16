"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTargetEntity =
    exports.unionToUnionTargetEntity =
    exports.UnionTargetEntity =
      void 0);
const player_entity_js_1 = require("../fb-action/player-entity.js"),
  self_entity_js_1 = require("../fb-action/self-entity.js"),
  target_entity_js_1 = require("../fb-action/target-entity.js"),
  triggered_entity_js_1 = require("../fb-action/triggered-entity.js"),
  vehicle_entity_js_1 = require("../fb-action/vehicle-entity.js");
var UnionTargetEntity;
function unionToUnionTargetEntity(t, e) {
  switch (UnionTargetEntity[t]) {
    case "NONE":
      return;
    case "PlayerEntity":
      return e(new player_entity_js_1.PlayerEntity());
    case "SelfEntity":
      return e(new self_entity_js_1.SelfEntity());
    case "TargetEntity":
      return e(new target_entity_js_1.TargetEntity());
    case "TriggeredEntity":
      return e(new triggered_entity_js_1.TriggeredEntity());
    case "VehicleEntity":
      return e(new vehicle_entity_js_1.VehicleEntity());
    default:
      return;
  }
}
function unionListToUnionTargetEntity(t, e, n) {
  switch (UnionTargetEntity[t]) {
    case "NONE":
      return;
    case "PlayerEntity":
      return e(n, new player_entity_js_1.PlayerEntity());
    case "SelfEntity":
      return e(n, new self_entity_js_1.SelfEntity());
    case "TargetEntity":
      return e(n, new target_entity_js_1.TargetEntity());
    case "TriggeredEntity":
      return e(n, new triggered_entity_js_1.TriggeredEntity());
    case "VehicleEntity":
      return e(n, new vehicle_entity_js_1.VehicleEntity());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.PlayerEntity = 1)] = "PlayerEntity"),
    (t[(t.SelfEntity = 2)] = "SelfEntity"),
    (t[(t.TargetEntity = 3)] = "TargetEntity"),
    (t[(t.TriggeredEntity = 4)] = "TriggeredEntity"),
    (t[(t.VehicleEntity = 5)] = "VehicleEntity");
})(
  (UnionTargetEntity =
    exports.UnionTargetEntity || (exports.UnionTargetEntity = {})),
),
  (exports.unionToUnionTargetEntity = unionToUnionTargetEntity),
  (exports.unionListToUnionTargetEntity = unionListToUnionTargetEntity);
//# sourceMappingURL=union-target-entity.js.map
