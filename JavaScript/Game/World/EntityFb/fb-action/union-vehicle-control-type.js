"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionVehicleControlType =
    exports.unionToUnionVehicleControlType =
    exports.UnionVehicleControlType =
      void 0);
const vehicle_enter_path_move_js_1 = require("../fb-action/vehicle-enter-path-move.js"),
  vehicle_exit_path_move_js_1 = require("../fb-action/vehicle-exit-path-move.js");
var UnionVehicleControlType;
function unionToUnionVehicleControlType(e, t) {
  switch (UnionVehicleControlType[e]) {
    case "NONE":
      return;
    case "VehicleEnterPathMove":
      return t(new vehicle_enter_path_move_js_1.VehicleEnterPathMove());
    case "VehicleExitPathMove":
      return t(new vehicle_exit_path_move_js_1.VehicleExitPathMove());
    default:
      return;
  }
}
function unionListToUnionVehicleControlType(e, t, o) {
  switch (UnionVehicleControlType[e]) {
    case "NONE":
      return;
    case "VehicleEnterPathMove":
      return t(o, new vehicle_enter_path_move_js_1.VehicleEnterPathMove());
    case "VehicleExitPathMove":
      return t(o, new vehicle_exit_path_move_js_1.VehicleExitPathMove());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.VehicleEnterPathMove = 1)] = "VehicleEnterPathMove"),
    (e[(e.VehicleExitPathMove = 2)] = "VehicleExitPathMove");
})(
  (UnionVehicleControlType =
    exports.UnionVehicleControlType || (exports.UnionVehicleControlType = {})),
),
  (exports.unionToUnionVehicleControlType = unionToUnionVehicleControlType),
  (exports.unionListToUnionVehicleControlType =
    unionListToUnionVehicleControlType);
//# sourceMappingURL=union-vehicle-control-type.js.map
