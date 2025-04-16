"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotFunctionRole = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionRole extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "BattleViewResonanceButton";
  }
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.RedDotRefreshItemData,
      EventDefine_1.EEventName.OnRoleChangeEnd,
      EventDefine_1.EEventName.UpdateRoleResonanceDetailView,
      EventDefine_1.EEventName.MainViewRoleButtonRefreshByRoleSkin,
    ];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.RoleModel.RedDotCondition();
  }
}
exports.RedDotFunctionRole = RedDotFunctionRole;
//# sourceMappingURL=RedDotFunctionRole.js.map
