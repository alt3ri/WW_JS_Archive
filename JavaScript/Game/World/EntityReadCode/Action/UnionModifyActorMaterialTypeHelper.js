"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionModifyActorMaterialTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbChangeActorMaterialData_1 = require("./FbChangeActorMaterialData"),
  FbChangeActorMPC_1 = require("./FbChangeActorMPC");
class UnionModifyActorMaterialTypeHelper {
  static GetUnionModifyActorMaterialTypeObject(e) {
    switch (e) {
      case fb_action_1.UnionModifyActorMaterialType.ChangeActorMaterialData:
        return new fb_action_1.ChangeActorMaterialData();
      case fb_action_1.UnionModifyActorMaterialType.ChangeActorMPC:
        return new fb_action_1.ChangeActorMPC();
      default:
        return;
    }
  }
  static ReadUnionModifyActorMaterialType(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionModifyActorMaterialType.ChangeActorMaterialData:
          return FbChangeActorMaterialData_1.FbChangeActorMaterialData.Create(
            t,
          );
        case fb_action_1.UnionModifyActorMaterialType.ChangeActorMPC:
          return FbChangeActorMPC_1.FbChangeActorMPC.Create(t);
        default:
          return;
      }
  }
}
exports.UnionModifyActorMaterialTypeHelper = UnionModifyActorMaterialTypeHelper;
//# sourceMappingURL=UnionModifyActorMaterialTypeHelper.js.map
