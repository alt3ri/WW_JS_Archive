"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionModifyActorMaterialType =
    exports.unionToUnionModifyActorMaterialType =
    exports.UnionModifyActorMaterialType =
      void 0);
const change_actor_mpc_js_1 = require("../fb-action/change-actor-mpc.js"),
  change_actor_material_data_js_1 = require("../fb-action/change-actor-material-data.js");
var UnionModifyActorMaterialType;
function unionToUnionModifyActorMaterialType(a, t) {
  switch (UnionModifyActorMaterialType[a]) {
    case "NONE":
      return;
    case "ChangeActorMaterialData":
      return t(new change_actor_material_data_js_1.ChangeActorMaterialData());
    case "ChangeActorMPC":
      return t(new change_actor_mpc_js_1.ChangeActorMPC());
    default:
      return;
  }
}
function unionListToUnionModifyActorMaterialType(a, t, e) {
  switch (UnionModifyActorMaterialType[a]) {
    case "NONE":
      return;
    case "ChangeActorMaterialData":
      return t(
        e,
        new change_actor_material_data_js_1.ChangeActorMaterialData(),
      );
    case "ChangeActorMPC":
      return t(e, new change_actor_mpc_js_1.ChangeActorMPC());
    default:
      return;
  }
}
!(function (a) {
  (a[(a.NONE = 0)] = "NONE"),
    (a[(a.ChangeActorMaterialData = 1)] = "ChangeActorMaterialData"),
    (a[(a.ChangeActorMPC = 2)] = "ChangeActorMPC");
})(
  (UnionModifyActorMaterialType =
    exports.UnionModifyActorMaterialType ||
    (exports.UnionModifyActorMaterialType = {})),
),
  (exports.unionToUnionModifyActorMaterialType =
    unionToUnionModifyActorMaterialType),
  (exports.unionListToUnionModifyActorMaterialType =
    unionListToUnionModifyActorMaterialType);
//# sourceMappingURL=union-modify-actor-material-type.js.map
