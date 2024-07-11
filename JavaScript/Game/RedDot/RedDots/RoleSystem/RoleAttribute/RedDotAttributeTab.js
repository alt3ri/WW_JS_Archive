"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotAttributeTab = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotAttributeTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return !0;
  }
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.RoleLevelUp,
      EventDefine_1.EEventName.RedDotRefreshItemData,
      EventDefine_1.EEventName.RoleBreakUp,
      EventDefine_1.EEventName.CurWorldLevelChange,
      EventDefine_1.EEventName.ActiveRole,
    ];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.RoleModel.RedDotAttributeTabBreakUpCondition(
      e,
    );
  }
}
exports.RedDotAttributeTab = RedDotAttributeTab;
// # sourceMappingURL=RedDotAttributeTab.js.map
