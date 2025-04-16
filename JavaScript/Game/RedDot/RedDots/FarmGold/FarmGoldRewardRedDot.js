"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FarmGoldRewardRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class FarmGoldRewardRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.FarmGoldRefreshRewardRedDot];
  }
  OnCheck(e) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return !!e && e.HaveRewardCanTake();
  }
}
exports.FarmGoldRewardRedDot = FarmGoldRewardRedDot;
//# sourceMappingURL=FarmGoldRewardRedDot.js.map
