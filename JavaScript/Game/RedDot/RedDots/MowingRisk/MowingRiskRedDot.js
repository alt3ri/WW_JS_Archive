"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotMowingRiskBuffAll = exports.RedDotMowingRiskReward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotMowingRiskReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot];
  }
  OnCheck(e = 0) {
    return ModelManager_1.ModelManager.MowingRiskModel.HasAnyReward;
  }
}
exports.RedDotMowingRiskReward = RedDotMowingRiskReward;
class RedDotMowingRiskBuffAll extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.MowingRiskOnRefreshBuffAllRedDot];
  }
  OnCheck(e = 0) {
    return !1;
  }
}
exports.RedDotMowingRiskBuffAll = RedDotMowingRiskBuffAll;
//# sourceMappingURL=MowingRiskRedDot.js.map
