"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotActivityRecallSignEntryButton = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotActivityRecallSignEntryButton extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RecallActivityInfoUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.ActivityRegressModel.HasSignRewardCanClaimed();
  }
}
exports.RedDotActivityRecallSignEntryButton =
  RedDotActivityRecallSignEntryButton;
//# sourceMappingURL=RedDotActivityRecallSignEntryButton.js.map
