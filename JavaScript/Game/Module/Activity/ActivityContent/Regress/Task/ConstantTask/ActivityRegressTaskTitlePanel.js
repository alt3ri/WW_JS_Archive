"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressTaskTitlePanel = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class ActivityRegressTaskTitlePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.TDe = void 0),
      (this.Afa = () => {
        var e = this.GetText(1);
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          e,
          "RecallActivity_Task_Daily_Countdown",
          ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetNextRefreshTime(),
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
    this.Lfa();
  }
  RefreshByData(e) {
    var i = 0 !== e.TaskType,
      i =
        (this.GetItem(2).SetUIActive(i),
        this.GetItem(3).SetUIActive(!i),
        this.GetText(0)),
      t =
        0 === e.TaskType
          ? "RecallActivity_Task_Resident"
          : "RecallActivity_Task_Daily",
      i = (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t), this.GetText(1)),
      t = 1 === e.TaskType;
    i.SetUIActive(t),
      t &&
        (this.Lfa(),
        (this.TDe = TimerSystem_1.RealTimeTimerSystem.Forever(
          this.Afa,
          TimeUtil_1.TimeUtil.InverseMillisecond,
        )),
        this.Afa());
  }
  Lfa() {
    this.TDe &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.ActivityRegressTaskTitlePanel = ActivityRegressTaskTitlePanel;
//# sourceMappingURL=ActivityRegressTaskTitlePanel.js.map
