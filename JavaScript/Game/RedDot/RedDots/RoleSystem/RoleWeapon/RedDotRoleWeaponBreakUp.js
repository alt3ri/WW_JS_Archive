"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotRoleWeaponBreakUp = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotRoleWeaponBreakUp extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return !0;
  }
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.WeaponLevelUp,
      EventDefine_1.EEventName.WeaponBreakUp,
    ];
  }
  OnCheck(e) {
    return (
      !!ModelManager_1.ModelManager.WeaponModel.RedDotWeaponBreachCondition(
        e,
      ) ||
      ModelManager_1.ModelManager.WeaponSkinModel.RedDotWeaponSkinCondition(e)
    );
  }
}
exports.RedDotRoleWeaponBreakUp = RedDotRoleWeaponBreakUp;
//# sourceMappingURL=RedDotRoleWeaponBreakUp.js.map
