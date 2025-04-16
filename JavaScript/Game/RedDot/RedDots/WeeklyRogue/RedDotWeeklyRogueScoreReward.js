"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotWeeklyRogueScoreReward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotWeeklyRogueScoreReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
      EventDefine_1.EEventName.WeeklyRogueRefreshScoreRedDot,
    ];
  }
  OnCheck() {
    return (
      ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.HasScoreRewardEnable() ??
      !1
    );
  }
}
exports.RedDotWeeklyRogueScoreReward = RedDotWeeklyRogueScoreReward;
//# sourceMappingURL=RedDotWeeklyRogueScoreReward.js.map
