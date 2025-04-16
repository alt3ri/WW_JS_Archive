"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTeleportToAndEnterVehicleType =
    exports.unionToUnionTeleportToAndEnterVehicleType =
    exports.UnionTeleportToAndEnterVehicleType =
      void 0);
const teleport_to_and_enter_fishing_boat_js_1 = require("../fb-action/teleport-to-and-enter-fishing-boat.js");
var UnionTeleportToAndEnterVehicleType;
function unionToUnionTeleportToAndEnterVehicleType(e, n) {
  switch (UnionTeleportToAndEnterVehicleType[e]) {
    case "NONE":
      return;
    case "TeleportToAndEnterFishingBoat":
      return n(
        new teleport_to_and_enter_fishing_boat_js_1.TeleportToAndEnterFishingBoat(),
      );
    default:
      return;
  }
}
function unionListToUnionTeleportToAndEnterVehicleType(e, n, t) {
  switch (UnionTeleportToAndEnterVehicleType[e]) {
    case "NONE":
      return;
    case "TeleportToAndEnterFishingBoat":
      return n(
        t,
        new teleport_to_and_enter_fishing_boat_js_1.TeleportToAndEnterFishingBoat(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.TeleportToAndEnterFishingBoat = 1)] =
      "TeleportToAndEnterFishingBoat");
})(
  (UnionTeleportToAndEnterVehicleType =
    exports.UnionTeleportToAndEnterVehicleType ||
    (exports.UnionTeleportToAndEnterVehicleType = {})),
),
  (exports.unionToUnionTeleportToAndEnterVehicleType =
    unionToUnionTeleportToAndEnterVehicleType),
  (exports.unionListToUnionTeleportToAndEnterVehicleType =
    unionListToUnionTeleportToAndEnterVehicleType);
//# sourceMappingURL=union-teleport-to-and-enter-vehicle-type.js.map
