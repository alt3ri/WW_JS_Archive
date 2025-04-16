"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotDangoRole = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoRole extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotDangoDevelop";
  }
  IsMultiple() {
    return !0;
  }
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.OnAbyssAddRole,
      EventDefine_1.EEventName.OnAbyssDangoLevelUp,
      EventDefine_1.EEventName.OnAbyssRoleInfoUpdate,
      EventDefine_1.EEventName.OnCommonItemCountAnyChange,
      EventDefine_1.EEventName.RefreshAbyssDevelopRedDot,
    ];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.DangoAbyssModel.GetDangoRoleRedDot(e);
  }
}
exports.RedDotDangoRole = RedDotDangoRole;
//# sourceMappingURL=RedDotDangoRole.js.map
