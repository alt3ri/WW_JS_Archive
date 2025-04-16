"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotActivityRegressConstantTask = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotActivityRegressConstantTask extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RecallActivityInfoUpdate];
  }
  OnCheck(e) {
    return (
      ModelManager_1.ModelManager.ActivityRegressModel.ActivityData?.HasReachableConstantTask() ||
      ModelManager_1.ModelManager.ActivityRegressModel.ActivityData?.CheckRegressScoreRewardReached()
    );
  }
}
exports.RedDotActivityRegressConstantTask = RedDotActivityRegressConstantTask;
//# sourceMappingURL=RedDotActivityRegressConstantTask.js.map
