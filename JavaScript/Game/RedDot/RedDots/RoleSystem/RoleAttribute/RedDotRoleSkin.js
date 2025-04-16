"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotRoleSkin = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotRoleSkin extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return !0;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RoleSkinRedDotRefresh];
  }
  OnCheck(e) {
    return (
      ModelManager_1.ModelManager.RoleSkinModel.HasRoleSkinRedDotByRoleId(e) ||
      ModelManager_1.ModelManager.FlySkinModel.CheckFlySkinHasRedDot()
    );
  }
}
exports.RedDotRoleSkin = RedDotRoleSkin;
//# sourceMappingURL=RedDotRoleSkin.js.map
