"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionVehicleCondition =
    exports.unionToUnionVehicleCondition =
    exports.UnionVehicleCondition =
      void 0);
const check_is_player_using_vehicle_js_1 = require("../fb-condition/check-is-player-using-vehicle.js"),
  check_is_using_vehicle_js_1 = require("../fb-condition/check-is-using-vehicle.js");
var UnionVehicleCondition;
function unionToUnionVehicleCondition(e, i) {
  switch (UnionVehicleCondition[e]) {
    case "NONE":
      return;
    case "CheckIsPlayerUsingVehicle":
      return i(
        new check_is_player_using_vehicle_js_1.CheckIsPlayerUsingVehicle(),
      );
    case "CheckIsUsingVehicle":
      return i(new check_is_using_vehicle_js_1.CheckIsUsingVehicle());
    default:
      return;
  }
}
function unionListToUnionVehicleCondition(e, i, n) {
  switch (UnionVehicleCondition[e]) {
    case "NONE":
      return;
    case "CheckIsPlayerUsingVehicle":
      return i(
        n,
        new check_is_player_using_vehicle_js_1.CheckIsPlayerUsingVehicle(),
      );
    case "CheckIsUsingVehicle":
      return i(n, new check_is_using_vehicle_js_1.CheckIsUsingVehicle());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CheckIsPlayerUsingVehicle = 1)] = "CheckIsPlayerUsingVehicle"),
    (e[(e.CheckIsUsingVehicle = 2)] = "CheckIsUsingVehicle");
})(
  (UnionVehicleCondition =
    exports.UnionVehicleCondition || (exports.UnionVehicleCondition = {})),
),
  (exports.unionToUnionVehicleCondition = unionToUnionVehicleCondition),
  (exports.unionListToUnionVehicleCondition = unionListToUnionVehicleCondition);
//# sourceMappingURL=union-vehicle-condition.js.map
