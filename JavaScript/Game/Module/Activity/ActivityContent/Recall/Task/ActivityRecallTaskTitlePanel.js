"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallTaskTitlePanel = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityRecallDefine_1 = require("../ActivityRecallDefine"),
  ActivityRecallHelper_1 = require("../Misc/ActivityRecallHelper");
class ActivityRecallTaskTitlePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.TDe = void 0),
      (this.xfa = () => {
        var e = ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData,
          i = this.GetText(1);
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          i,
          "RecallActivity_Task_Daily_Countdown",
          e.GetNextRefreshTime(),
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnBeforeDestroy() {
    this.Ufa();
  }
  RefreshByData(e) {
    var i =
        e.TaskType !== ActivityRecallDefine_1.EActivityRecallTaskType.Constant,
      i =
        (this.GetItem(2).SetUIActive(i),
        this.GetItem(3).SetUIActive(!i),
        this.GetText(0)),
      t =
        e.TaskType === ActivityRecallDefine_1.EActivityRecallTaskType.Constant
          ? "RecallActivity_Task_Resident"
          : "RecallActivity_Task_Daily",
      i = (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t), this.GetText(1)),
      t =
        e.TaskType === ActivityRecallDefine_1.EActivityRecallTaskType.DailyA ||
        e.TaskType === ActivityRecallDefine_1.EActivityRecallTaskType.DailyB;
    i.SetUIActive(t),
      t &&
        (this.Ufa(),
        (this.TDe = TimerSystem_1.RealTimeTimerSystem.Forever(
          this.xfa,
          TimeUtil_1.TimeUtil.InverseMillisecond,
        )),
        this.xfa());
  }
  Ufa() {
    this.TDe &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.ActivityRecallTaskTitlePanel = ActivityRecallTaskTitlePanel;
//# sourceMappingURL=ActivityRecallTaskTitlePanel.js.map
