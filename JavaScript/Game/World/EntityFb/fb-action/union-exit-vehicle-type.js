"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionExitVehicleType =
    exports.unionToUnionExitVehicleType =
    exports.UnionExitVehicleType =
      void 0);
const exit_vehicle_launch_js_1 = require("../fb-action/exit-vehicle-launch.js"),
  exit_vehicle_stand_up_js_1 = require("../fb-action/exit-vehicle-stand-up.js"),
  exit_vehicle_teleport_js_1 = require("../fb-action/exit-vehicle-teleport.js");
var UnionExitVehicleType;
function unionToUnionExitVehicleType(e, i) {
  switch (UnionExitVehicleType[e]) {
    case "NONE":
      return;
    case "ExitVehicleLaunch":
      return i(new exit_vehicle_launch_js_1.ExitVehicleLaunch());
    case "ExitVehicleStandUp":
      return i(new exit_vehicle_stand_up_js_1.ExitVehicleStandUp());
    case "ExitVehicleTeleport":
      return i(new exit_vehicle_teleport_js_1.ExitVehicleTeleport());
    default:
      return;
  }
}
function unionListToUnionExitVehicleType(e, i, t) {
  switch (UnionExitVehicleType[e]) {
    case "NONE":
      return;
    case "ExitVehicleLaunch":
      return i(t, new exit_vehicle_launch_js_1.ExitVehicleLaunch());
    case "ExitVehicleStandUp":
      return i(t, new exit_vehicle_stand_up_js_1.ExitVehicleStandUp());
    case "ExitVehicleTeleport":
      return i(t, new exit_vehicle_teleport_js_1.ExitVehicleTeleport());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.ExitVehicleLaunch = 1)] = "ExitVehicleLaunch"),
    (e[(e.ExitVehicleStandUp = 2)] = "ExitVehicleStandUp"),
    (e[(e.ExitVehicleTeleport = 3)] = "ExitVehicleTeleport");
})(
  (UnionExitVehicleType =
    exports.UnionExitVehicleType || (exports.UnionExitVehicleType = {})),
),
  (exports.unionToUnionExitVehicleType = unionToUnionExitVehicleType),
  (exports.unionListToUnionExitVehicleType = unionListToUnionExitVehicleType);
//# sourceMappingURL=union-exit-vehicle-type.js.map
