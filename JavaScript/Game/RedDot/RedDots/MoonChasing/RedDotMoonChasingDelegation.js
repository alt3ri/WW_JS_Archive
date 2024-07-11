"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotMoonChasingDelegation = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotMoonChasingDelegation extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.MoonChasingRefreshDelegationRedDot];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.MoonChasingModel.CheckDelegationRedDotState();
  }
}
exports.RedDotMoonChasingDelegation = RedDotMoonChasingDelegation;
//# sourceMappingURL=RedDotMoonChasingDelegation.js.map
