"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressTaskScoreRewardGridData =
    exports.RECALL_SCORE_ITEM_ID =
    exports.ActivityRegressTabSwitchItemCommonData =
    exports.ERecallStartCondition =
    exports.activityRegressMainViewComponentsInfo =
      void 0);
const UE = require("ue");
var ERecallStartCondition;
(exports.activityRegressMainViewComponentsInfo = [
  [0, UE.UIHorizontalLayout],
  [1, UE.UIItem],
  [2, UE.UIButtonComponent],
  [3, UE.UIItem],
  [4, UE.UIItem],
  [5, UE.UIItem],
  [6, UE.UIItem],
  [7, UE.UIItem],
  [8, UE.UIItem],
]),
  (function (t) {
    (t[(t.WorldDone = 0)] = "WorldDone"),
      (t[(t.RecallReady = 1)] = "RecallReady"),
      (t[(t.FirstShow = 2)] = "FirstShow"),
      (t[(t.UnForbidStart = 3)] = "UnForbidStart"),
      (t[(t.IsOpen = 4)] = "IsOpen");
  })(
    (ERecallStartCondition =
      exports.ERecallStartCondition || (exports.ERecallStartCondition = {})),
  );
class ActivityRegressTabSwitchItemCommonData {
  constructor() {
    (this.RecallEntryType = void 0), (this.Config = void 0), (this.Title = "");
  }
}
(exports.ActivityRegressTabSwitchItemCommonData =
  ActivityRegressTabSwitchItemCommonData),
  (exports.RECALL_SCORE_ITEM_ID = 20);
class ActivityRegressTaskScoreRewardGridData {
  constructor() {
    (this.Config = void 0), (this.RewardState = 0);
  }
}
exports.ActivityRegressTaskScoreRewardGridData =
  ActivityRegressTaskScoreRewardGridData;
//# sourceMappingURL=ActivityRegressDefine.js.map
