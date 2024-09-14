"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotVisionRecovery = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotVisionRecovery extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FunctionCalabash";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnVisionRecoveryStorage];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRecoveryBatchRedDot();
  }
}
exports.RedDotVisionRecovery = RedDotVisionRecovery;
//# sourceMappingURL=RedDotVisionRecovery.js.map
