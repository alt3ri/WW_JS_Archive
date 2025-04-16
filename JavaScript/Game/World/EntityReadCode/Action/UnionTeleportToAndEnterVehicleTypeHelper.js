"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTeleportToAndEnterVehicleTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbTeleportToAndEnterFishingBoat_1 = require("./FbTeleportToAndEnterFishingBoat");
class UnionTeleportToAndEnterVehicleTypeHelper {
  static GetUnionTeleportToAndEnterVehicleTypeObject(e) {
    if (
      e ===
      fb_action_1.UnionTeleportToAndEnterVehicleType
        .TeleportToAndEnterFishingBoat
    )
      return new fb_action_1.TeleportToAndEnterFishingBoat();
  }
  static ReadUnionTeleportToAndEnterVehicleType(e, t) {
    return void 0 !== t &&
      e ===
        fb_action_1.UnionTeleportToAndEnterVehicleType
          .TeleportToAndEnterFishingBoat
      ? FbTeleportToAndEnterFishingBoat_1.FbTeleportToAndEnterFishingBoat.Create(
          t,
        )
      : void 0;
  }
}
exports.UnionTeleportToAndEnterVehicleTypeHelper =
  UnionTeleportToAndEnterVehicleTypeHelper;
//# sourceMappingURL=UnionTeleportToAndEnterVehicleTypeHelper.js.map
