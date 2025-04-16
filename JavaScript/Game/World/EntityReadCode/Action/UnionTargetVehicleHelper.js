"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTargetVehicleHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbAppointedVehicle_1 = require("./FbAppointedVehicle"),
  FbCurrentVehicle_1 = require("./FbCurrentVehicle"),
  FbFishingBoatVehicle_1 = require("./FbFishingBoatVehicle");
class UnionTargetVehicleHelper {
  static GetUnionTargetVehicleObject(e) {
    switch (e) {
      case fb_action_1.UnionTargetVehicle.AppointedVehicle:
        return new fb_action_1.AppointedVehicle();
      case fb_action_1.UnionTargetVehicle.CurrentVehicle:
        return new fb_action_1.CurrentVehicle();
      case fb_action_1.UnionTargetVehicle.FishingBoatVehicle:
        return new fb_action_1.FishingBoatVehicle();
      default:
        return;
    }
  }
  static ReadUnionTargetVehicle(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionTargetVehicle.AppointedVehicle:
          return FbAppointedVehicle_1.FbAppointedVehicle.Create(t);
        case fb_action_1.UnionTargetVehicle.CurrentVehicle:
          return FbCurrentVehicle_1.FbCurrentVehicle.Create(t);
        case fb_action_1.UnionTargetVehicle.FishingBoatVehicle:
          return FbFishingBoatVehicle_1.FbFishingBoatVehicle.Create(t);
        default:
          return;
      }
  }
}
exports.UnionTargetVehicleHelper = UnionTargetVehicleHelper;
//# sourceMappingURL=UnionTargetVehicleHelper.js.map
