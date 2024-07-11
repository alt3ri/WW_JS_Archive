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
      (this.GCa = () => {
        var e = ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData,
          i = this.GetText(2);
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          i,
          "RecallActivity_Task_Daily_Countdown",
          e.GetNextRefreshTime(),
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  OnBeforeDestroy() {
    this.qCa();
  }
  RefreshByData(e) {
    this.GetSprite(0).useChangeColor =
      e.TaskType !== ActivityRecallDefine_1.EActivityRecallTaskType.Constant;
    var i = this.GetText(1),
      t =
        e.TaskType === ActivityRecallDefine_1.EActivityRecallTaskType.Constant
          ? "RecallActivity_Task_Resident"
          : "RecallActivity_Task_Daily",
      i = (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t), this.GetText(2)),
      t =
        e.TaskType === ActivityRecallDefine_1.EActivityRecallTaskType.DailyA ||
        e.TaskType === ActivityRecallDefine_1.EActivityRecallTaskType.DailyB;
    i.SetUIActive(t),
      t &&
        (this.qCa(),
        (this.TDe = TimerSystem_1.RealTimeTimerSystem.Forever(
          this.GCa,
          TimeUtil_1.TimeUtil.InverseMillisecond,
        )),
        this.GCa());
  }
  qCa() {
    this.TDe &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.ActivityRecallTaskTitlePanel = ActivityRecallTaskTitlePanel;
//# sourceMappingURL=ActivityRecallTaskTitlePanel.js.map
