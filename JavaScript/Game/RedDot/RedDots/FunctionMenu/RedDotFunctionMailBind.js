"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotFunctionMailBind = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionMailBind extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "BattleViewMenu";
  }
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.OnMailBindInfoNotify,
      EventDefine_1.EEventName.OnMailBindInfoResponse,
      EventDefine_1.EEventName.OnMailBindResponse,
      EventDefine_1.EEventName.OnMailBindRewardResponse,
      EventDefine_1.EEventName.RefreshMailBindRedDot,
    ];
  }
  OnCheck() {
    var e = ModelManager_1.ModelManager.MailBindModel;
    return e.CheckGlobalMailBindOpen() && e.CheckMailBindRedDot();
  }
}
exports.RedDotFunctionMailBind = RedDotFunctionMailBind;
//# sourceMappingURL=RedDotFunctionMailBind.js.map
