"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotActivityRecallSignEntryButton = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  ActivityRecallHelper_1 = require("../../../../Module/Activity/ActivityContent/Recall/Misc/ActivityRecallHelper"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotActivityRecallSignEntryButton extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnActivityUpdate];
  }
  OnCheck(e) {
    return ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData?.CheckHaveSignRewardCanGet();
  }
}
exports.RedDotActivityRecallSignEntryButton =
  RedDotActivityRecallSignEntryButton;
//# sourceMappingURL=RedDotActivityRecallSignEntryButton.js.map
