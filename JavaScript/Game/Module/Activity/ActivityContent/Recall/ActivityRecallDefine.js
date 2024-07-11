"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallMainViewRewardGridData =
    exports.ActivityRecallTabSwitchItemCommonData =
    exports.ActivityRecallTaskScoreRewardGridData =
    exports.ActivityRecallTaskDynamicData =
    exports.ActivityMainSubViewBase =
    exports.EActivityRecallTaskType =
    exports.ERecallStartCondition =
    exports.activityRecallMainViewComponentsInfo =
      void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
var ERecallStartCondition, EActivityRecallTaskType;
(exports.activityRecallMainViewComponentsInfo = [
  [0, UE.UIHorizontalLayout],
  [1, UE.UIItem],
  [2, UE.UIButtonComponent],
  [3, UE.UIItem],
  [4, UE.UIItem],
  [5, UE.UIItem],
  [6, UE.UIItem],
  [7, UE.UIItem],
]),
  (function (t) {
    (t[(t.WorldDone = 0)] = "WorldDone"),
      (t[(t.RecallReady = 1)] = "RecallReady"),
      (t[(t.FirstShow = 2)] = "FirstShow"),
      (t[(t.ActivateBattle = 3)] = "ActivateBattle"),
      (t[(t.UnForbidStart = 4)] = "UnForbidStart"),
      (t[(t.IsOpen = 5)] = "IsOpen");
  })(
    (ERecallStartCondition =
      exports.ERecallStartCondition || (exports.ERecallStartCondition = {})),
  ),
  (function (t) {
    (t[(t.Constant = 0)] = "Constant"),
      (t[(t.DailyA = 1)] = "DailyA"),
      (t[(t.DailyB = 2)] = "DailyB");
  })(
    (EActivityRecallTaskType =
      exports.EActivityRecallTaskType ||
      (exports.EActivityRecallTaskType = {})),
  );
class ActivityMainSubViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ActivityRecallData = void 0),
      (this.PassRecallBaseCallBack = void 0),
      (this.SequencePlayer = void 0),
      (this.E5e = (t) => {
        "ContentStart" === t && this.SequencePlayer.PlaySequence("Start");
      });
  }
  OnStart() {
    var t = this.GetRootItem();
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(t);
  }
  OnBeforeShow() {
    this.SequencePlayer.PlaySequence("Start"),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlaySequenceEventByStringParam,
        this.E5e,
      );
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlaySequenceEventByStringParam,
      this.E5e,
    ),
      this.SequencePlayer.PlaySequence("Close");
  }
  BindPassRecallBaseCallBack(t) {
    this.PassRecallBaseCallBack = t;
  }
  UnBindPassRecallBaseCallBack() {
    this.PassRecallBaseCallBack = void 0;
  }
  InvokePassRecallBaseCallBack(t, e) {
    this.PassRecallBaseCallBack?.(t, e);
  }
  RefreshByData(t, e = 0) {
    (this.ActivityRecallData = t), this.OnRefreshByData(t, e);
  }
  OnRefreshByData(t, e) {}
}
exports.ActivityMainSubViewBase = ActivityMainSubViewBase;
class ActivityRecallTaskDynamicData {
  constructor() {
    (this.ItemType = 1),
      (this.TaskType = EActivityRecallTaskType.Constant),
      (this.Config = void 0);
  }
}
exports.ActivityRecallTaskDynamicData = ActivityRecallTaskDynamicData;
class ActivityRecallTaskScoreRewardGridData {
  constructor() {
    (this.Config = void 0), (this.RewardState = 0);
  }
}
exports.ActivityRecallTaskScoreRewardGridData =
  ActivityRecallTaskScoreRewardGridData;
class ActivityRecallTabSwitchItemCommonData {
  constructor() {
    (this.RecallEntryType = void 0), (this.Config = void 0), (this.Title = "");
  }
}
exports.ActivityRecallTabSwitchItemCommonData =
  ActivityRecallTabSwitchItemCommonData;
class ActivityRecallMainViewRewardGridData {}
exports.ActivityRecallMainViewRewardGridData =
  ActivityRecallMainViewRewardGridData;
//# sourceMappingURL=ActivityRecallDefine.js.map
