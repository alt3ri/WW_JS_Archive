"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionVehicleFeature =
    exports.unionToUnionVehicleFeature =
    exports.UnionVehicleFeature =
      void 0);
const audio_vehicle_feature_js_1 = require("../fb-component/audio-vehicle-feature.js"),
  battle_vehicle_feature_js_1 = require("../fb-component/battle-vehicle-feature.js"),
  movement_vehicle_feature_js_1 = require("../fb-component/movement-vehicle-feature.js");
var UnionVehicleFeature;
function unionToUnionVehicleFeature(e, t) {
  switch (UnionVehicleFeature[e]) {
    case "NONE":
      return;
    case "AudioVehicleFeature":
      return t(new audio_vehicle_feature_js_1.AudioVehicleFeature());
    case "BattleVehicleFeature":
      return t(new battle_vehicle_feature_js_1.BattleVehicleFeature());
    case "MovementVehicleFeature":
      return t(new movement_vehicle_feature_js_1.MovementVehicleFeature());
    default:
      return;
  }
}
function unionListToUnionVehicleFeature(e, t, r) {
  switch (UnionVehicleFeature[e]) {
    case "NONE":
      return;
    case "AudioVehicleFeature":
      return t(r, new audio_vehicle_feature_js_1.AudioVehicleFeature());
    case "BattleVehicleFeature":
      return t(r, new battle_vehicle_feature_js_1.BattleVehicleFeature());
    case "MovementVehicleFeature":
      return t(r, new movement_vehicle_feature_js_1.MovementVehicleFeature());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.AudioVehicleFeature = 1)] = "AudioVehicleFeature"),
    (e[(e.BattleVehicleFeature = 2)] = "BattleVehicleFeature"),
    (e[(e.MovementVehicleFeature = 3)] = "MovementVehicleFeature");
})(
  (UnionVehicleFeature =
    exports.UnionVehicleFeature || (exports.UnionVehicleFeature = {})),
),
  (exports.unionToUnionVehicleFeature = unionToUnionVehicleFeature),
  (exports.unionListToUnionVehicleFeature = unionListToUnionVehicleFeature);
//# sourceMappingURL=union-vehicle-feature.js.map
