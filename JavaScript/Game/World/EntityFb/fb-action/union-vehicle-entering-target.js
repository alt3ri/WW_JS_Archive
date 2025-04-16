"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionVehicleEnteringTarget =
    exports.unionToUnionVehicleEnteringTarget =
    exports.UnionVehicleEnteringTarget =
      void 0);
const vehicle_entering_npc_target_js_1 = require("../fb-action/vehicle-entering-npc-target.js"),
  vehicle_entering_player_target_js_1 = require("../fb-action/vehicle-entering-player-target.js");
var UnionVehicleEnteringTarget;
function unionToUnionVehicleEnteringTarget(e, n) {
  switch (UnionVehicleEnteringTarget[e]) {
    case "NONE":
      return;
    case "VehicleEnteringNpcTarget":
      return n(new vehicle_entering_npc_target_js_1.VehicleEnteringNpcTarget());
    case "VehicleEnteringPlayerTarget":
      return n(
        new vehicle_entering_player_target_js_1.VehicleEnteringPlayerTarget(),
      );
    default:
      return;
  }
}
function unionListToUnionVehicleEnteringTarget(e, n, t) {
  switch (UnionVehicleEnteringTarget[e]) {
    case "NONE":
      return;
    case "VehicleEnteringNpcTarget":
      return n(
        t,
        new vehicle_entering_npc_target_js_1.VehicleEnteringNpcTarget(),
      );
    case "VehicleEnteringPlayerTarget":
      return n(
        t,
        new vehicle_entering_player_target_js_1.VehicleEnteringPlayerTarget(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.VehicleEnteringNpcTarget = 1)] = "VehicleEnteringNpcTarget"),
    (e[(e.VehicleEnteringPlayerTarget = 2)] = "VehicleEnteringPlayerTarget");
})(
  (UnionVehicleEnteringTarget =
    exports.UnionVehicleEnteringTarget ||
    (exports.UnionVehicleEnteringTarget = {})),
),
  (exports.unionToUnionVehicleEnteringTarget =
    unionToUnionVehicleEnteringTarget),
  (exports.unionListToUnionVehicleEnteringTarget =
    unionListToUnionVehicleEnteringTarget);
//# sourceMappingURL=union-vehicle-entering-target.js.map
