"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSummonEntityType =
    exports.unionToUnionSummonEntityType =
    exports.UnionSummonEntityType =
      void 0);
const summon_vehicle_js_1 = require("../fb-action/summon-vehicle.js");
var UnionSummonEntityType;
function unionToUnionSummonEntityType(n, e) {
  switch (UnionSummonEntityType[n]) {
    case "NONE":
      return;
    case "SummonVehicle":
      return e(new summon_vehicle_js_1.SummonVehicle());
    default:
      return;
  }
}
function unionListToUnionSummonEntityType(n, e, o) {
  switch (UnionSummonEntityType[n]) {
    case "NONE":
      return;
    case "SummonVehicle":
      return e(o, new summon_vehicle_js_1.SummonVehicle());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"), (n[(n.SummonVehicle = 1)] = "SummonVehicle");
})(
  (UnionSummonEntityType =
    exports.UnionSummonEntityType || (exports.UnionSummonEntityType = {})),
),
  (exports.unionToUnionSummonEntityType = unionToUnionSummonEntityType),
  (exports.unionListToUnionSummonEntityType = unionListToUnionSummonEntityType);
//# sourceMappingURL=union-summon-entity-type.js.map
