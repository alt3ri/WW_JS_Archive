"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionVehicleFeatureHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbAudioVehicleFeature_1 = require("./FbAudioVehicleFeature"),
  FbBattleVehicleFeature_1 = require("./FbBattleVehicleFeature"),
  FbMovementVehicleFeature_1 = require("./FbMovementVehicleFeature");
class UnionVehicleFeatureHelper {
  static GetUnionVehicleFeatureObject(e) {
    switch (e) {
      case fb_component_1.UnionVehicleFeature.AudioVehicleFeature:
        return new fb_component_1.AudioVehicleFeature();
      case fb_component_1.UnionVehicleFeature.BattleVehicleFeature:
        return new fb_component_1.BattleVehicleFeature();
      case fb_component_1.UnionVehicleFeature.MovementVehicleFeature:
        return new fb_component_1.MovementVehicleFeature();
      default:
        return;
    }
  }
  static ReadUnionVehicleFeature(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_component_1.UnionVehicleFeature.AudioVehicleFeature:
          return FbAudioVehicleFeature_1.FbAudioVehicleFeature.Create(t);
        case fb_component_1.UnionVehicleFeature.BattleVehicleFeature:
          return FbBattleVehicleFeature_1.FbBattleVehicleFeature.Create(t);
        case fb_component_1.UnionVehicleFeature.MovementVehicleFeature:
          return FbMovementVehicleFeature_1.FbMovementVehicleFeature.Create(t);
        default:
          return;
      }
  }
}
exports.UnionVehicleFeatureHelper = UnionVehicleFeatureHelper;
//# sourceMappingURL=UnionVehicleFeatureHelper.js.map
