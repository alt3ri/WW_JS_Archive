"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotDangoLimitReward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoLimitReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshAbyssRewardRedDot];
  }
  OnCheck(e) {
    return (
      !!e &&
      !!(e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) &&
      e.GetRewardTypeIfHaveCanTakeReward(1)
    );
  }
}
exports.RedDotDangoLimitReward = RedDotDangoLimitReward;
//# sourceMappingURL=RedDotDangoLimitReward.js.map
