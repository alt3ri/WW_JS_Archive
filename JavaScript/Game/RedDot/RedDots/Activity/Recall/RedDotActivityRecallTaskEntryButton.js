"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotActivityRecallTaskEntryButton = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotActivityRecallTaskEntryButton extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.RecallActivityInfoUpdate,
      EventDefine_1.EEventName.RedDotRefreshItemData,
    ];
  }
  OnCheck(e) {
    var t = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData;
    return (
      !!t &&
      (t.CheckHaveTaskRewardCanGet() ||
        t.CheckRegressScoreRewardReached() ||
        ModelManager_1.ModelManager.ActivityRegressModel.ShouldShowDoubleDropRedDot() ||
        t.HasReachableCultivateTask())
    );
  }
}
exports.RedDotActivityRecallTaskEntryButton =
  RedDotActivityRecallTaskEntryButton;
//# sourceMappingURL=RedDotActivityRecallTaskEntryButton.js.map
