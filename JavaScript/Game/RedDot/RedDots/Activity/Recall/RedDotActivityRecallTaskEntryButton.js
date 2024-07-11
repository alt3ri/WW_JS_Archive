"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotActivityRecallTaskEntryButton = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  ActivityRecallHelper_1 = require("../../../../Module/Activity/ActivityContent/Recall/Misc/ActivityRecallHelper"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotActivityRecallTaskEntryButton extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.OnActivityUpdate,
      EventDefine_1.EEventName.RedDotRefreshItemData,
    ];
  }
  OnCheck(e) {
    return (
      ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData?.CheckHaveTaskRewardCanGet() ||
      ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData?.CheckHaveScoreRewardCanGet()
    );
  }
}
exports.RedDotActivityRecallTaskEntryButton =
  RedDotActivityRecallTaskEntryButton;
//# sourceMappingURL=RedDotActivityRecallTaskEntryButton.js.map
