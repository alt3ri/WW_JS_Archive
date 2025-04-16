"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTargetVehicle =
    exports.unionToUnionTargetVehicle =
    exports.UnionTargetVehicle =
      void 0);
const appointed_vehicle_js_1 = require("../fb-action/appointed-vehicle.js"),
  current_vehicle_js_1 = require("../fb-action/current-vehicle.js"),
  fishing_boat_vehicle_js_1 = require("../fb-action/fishing-boat-vehicle.js");
var UnionTargetVehicle;
function unionToUnionTargetVehicle(e, i) {
  switch (UnionTargetVehicle[e]) {
    case "NONE":
      return;
    case "AppointedVehicle":
      return i(new appointed_vehicle_js_1.AppointedVehicle());
    case "CurrentVehicle":
      return i(new current_vehicle_js_1.CurrentVehicle());
    case "FishingBoatVehicle":
      return i(new fishing_boat_vehicle_js_1.FishingBoatVehicle());
    default:
      return;
  }
}
function unionListToUnionTargetVehicle(e, i, n) {
  switch (UnionTargetVehicle[e]) {
    case "NONE":
      return;
    case "AppointedVehicle":
      return i(n, new appointed_vehicle_js_1.AppointedVehicle());
    case "CurrentVehicle":
      return i(n, new current_vehicle_js_1.CurrentVehicle());
    case "FishingBoatVehicle":
      return i(n, new fishing_boat_vehicle_js_1.FishingBoatVehicle());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.AppointedVehicle = 1)] = "AppointedVehicle"),
    (e[(e.CurrentVehicle = 2)] = "CurrentVehicle"),
    (e[(e.FishingBoatVehicle = 3)] = "FishingBoatVehicle");
})(
  (UnionTargetVehicle =
    exports.UnionTargetVehicle || (exports.UnionTargetVehicle = {})),
),
  (exports.unionToUnionTargetVehicle = unionToUnionTargetVehicle),
  (exports.unionListToUnionTargetVehicle = unionListToUnionTargetVehicle);
//# sourceMappingURL=union-target-vehicle.js.map
