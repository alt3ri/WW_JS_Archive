"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionVehicleEnteringTargetHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbVehicleEnteringNpcTarget_1 = require("./FbVehicleEnteringNpcTarget"),
  FbVehicleEnteringPlayerTarget_1 = require("./FbVehicleEnteringPlayerTarget");
class UnionVehicleEnteringTargetHelper {
  static GetUnionVehicleEnteringTargetObject(e) {
    switch (e) {
      case fb_action_1.UnionVehicleEnteringTarget.VehicleEnteringNpcTarget:
        return new fb_action_1.VehicleEnteringNpcTarget();
      case fb_action_1.UnionVehicleEnteringTarget.VehicleEnteringPlayerTarget:
        return new fb_action_1.VehicleEnteringPlayerTarget();
      default:
        return;
    }
  }
  static ReadUnionVehicleEnteringTarget(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionVehicleEnteringTarget.VehicleEnteringNpcTarget:
          return FbVehicleEnteringNpcTarget_1.FbVehicleEnteringNpcTarget.Create(
            t,
          );
        case fb_action_1.UnionVehicleEnteringTarget.VehicleEnteringPlayerTarget:
          return FbVehicleEnteringPlayerTarget_1.FbVehicleEnteringPlayerTarget.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionVehicleEnteringTargetHelper = UnionVehicleEnteringTargetHelper;
//# sourceMappingURL=UnionVehicleEnteringTargetHelper.js.map
