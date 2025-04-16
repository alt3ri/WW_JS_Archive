"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotDangoFormationRole = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoFormationRole extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotDangoFormation";
  }
  IsMultiple() {
    return !0;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshAbyssDangoRedDot];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.DangoAbyssModel.GetDangoFormationNewRoleRedDot(
      e,
    );
  }
}
exports.RedDotDangoFormationRole = RedDotDangoFormationRole;
//# sourceMappingURL=RedDotDangoFormationRole.js.map
