"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionNpcRideInVehiclePerformType =
    exports.unionToUnionNpcRideInVehiclePerformType =
    exports.UnionNpcRideInVehiclePerformType =
      void 0);
const npc_ride_in_auto_gongduola_perform_js_1 = require("../fb-component/npc-ride-in-auto-gongduola-perform.js"),
  npc_ride_in_gongduola_perform_js_1 = require("../fb-component/npc-ride-in-gongduola-perform.js");
var UnionNpcRideInVehiclePerformType;
function unionToUnionNpcRideInVehiclePerformType(e, n) {
  switch (UnionNpcRideInVehiclePerformType[e]) {
    case "NONE":
      return;
    case "NpcRideInAutoGongduolaPerform":
      return n(
        new npc_ride_in_auto_gongduola_perform_js_1.NpcRideInAutoGongduolaPerform(),
      );
    case "NpcRideInGongduolaPerform":
      return n(
        new npc_ride_in_gongduola_perform_js_1.NpcRideInGongduolaPerform(),
      );
    default:
      return;
  }
}
function unionListToUnionNpcRideInVehiclePerformType(e, n, o) {
  switch (UnionNpcRideInVehiclePerformType[e]) {
    case "NONE":
      return;
    case "NpcRideInAutoGongduolaPerform":
      return n(
        o,
        new npc_ride_in_auto_gongduola_perform_js_1.NpcRideInAutoGongduolaPerform(),
      );
    case "NpcRideInGongduolaPerform":
      return n(
        o,
        new npc_ride_in_gongduola_perform_js_1.NpcRideInGongduolaPerform(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.NpcRideInAutoGongduolaPerform = 1)] =
      "NpcRideInAutoGongduolaPerform"),
    (e[(e.NpcRideInGongduolaPerform = 2)] = "NpcRideInGongduolaPerform");
})(
  (UnionNpcRideInVehiclePerformType =
    exports.UnionNpcRideInVehiclePerformType ||
    (exports.UnionNpcRideInVehiclePerformType = {})),
),
  (exports.unionToUnionNpcRideInVehiclePerformType =
    unionToUnionNpcRideInVehiclePerformType),
  (exports.unionListToUnionNpcRideInVehiclePerformType =
    unionListToUnionNpcRideInVehiclePerformType);
//# sourceMappingURL=union-npc-ride-in-vehicle-perform-type.js.map
