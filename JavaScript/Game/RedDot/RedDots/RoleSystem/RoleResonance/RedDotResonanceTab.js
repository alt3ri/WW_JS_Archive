"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotResonanceTab = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotResonanceTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return !0;
  }
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.RedDotRefreshItemData,
      EventDefine_1.EEventName.UpdateRoleResonanceDetailView,
    ];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.RoleModel.RedDotResonanceTabCondition(e);
  }
}
exports.RedDotResonanceTab = RedDotResonanceTab;
//# sourceMappingURL=RedDotResonanceTab.js.map
