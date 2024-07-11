"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallTaskSubView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  ExploreProgressController_1 = require("../../../../ExploreProgress/ExploreProgressController"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  DynScrollView_1 = require("../../../../Util/ScrollView/DynScrollView"),
  ActivityRecallDefine_1 = require("../ActivityRecallDefine"),
  ActivityRecallTaskDynamicItem_1 = require("./ActivityRecallTaskDynamicItem"),
  ActivityRecallTaskDynamicScrollItem_1 = require("./ActivityRecallTaskDynamicScrollItem"),
  ActivityRecallTaskHorItemPanel_1 = require("./ActivityRecallTaskHorItemPanel");
class ActivityRecallTaskSubView extends ActivityRecallDefine_1.ActivityMainSubViewBase {
  constructor() {
    super(...arguments),
      (this.VZt = void 0),
      (this.W_a = void 0),
      (this.Q_a = void 0),
      (this.B_a = void 0),
      (this.K_a = void 0),
      (this.$_a = (e, i, t) => {
        var r =
          new ActivityRecallTaskDynamicScrollItem_1.ActivityRecallTaskDynamicScrollItem();
        return this.W_a.push(r), r;
      }),
      (this.X_a = () => {
        return new ActivityRecallTaskHorItemPanel_1.ActivityRecallTaskHorItemPanel();
      }),
      (this.kOe = () => {
        this.mGe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIDynScrollViewComponent],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.W_a = []),
      (this.VZt = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(0),
        this.GetItem(3),
        new ActivityRecallTaskDynamicItem_1.ActivityRecallTaskDynamicItem(),
        this.$_a,
      )),
      await ExploreProgressController_1.ExploreProgressController.AllExploreProgressAsyncRequest(),
      await this.VZt.Init(),
      (this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(
        this.GetRootItem(),
      ));
  }
  OnBeforeShow() {
    super.OnBeforeShow(),
      (this.B_a = TimerSystem_1.RealTimeTimerSystem.Forever(
        this.kOe,
        TimeUtil_1.TimeUtil.InverseMillisecond,
      ));
  }
  OnAfterHide() {
    super.OnAfterHide(), this.jm();
  }
  OnBeforeDestroy() {
    this.VZt && (this.VZt.ClearChildren(), (this.VZt = void 0)),
      (this.W_a = void 0);
  }
  jm() {
    TimerSystem_1.RealTimeTimerSystem.Has(this.B_a) &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.B_a), (this.B_a = void 0));
  }
  OnStart() {
    this.K_a = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(2),
      this.X_a,
    );
  }
  Y_a() {
    var e = this.GetText(4),
      i = this.ActivityRecallData.GetRecallTaskScore();
    e.SetText(i.toString()),
      (this.Q_a = this.Q_a ?? []),
      ConfigManager_1.ConfigManager.ActivityRecallConfig.GetAllRecallScoreRewardConfigList().forEach(
        (e, i) => {
          i >= this.Q_a.length &&
            this.Q_a.push(
              new ActivityRecallDefine_1.ActivityRecallTaskScoreRewardGridData(),
            );
          i = this.Q_a[i];
          (i.Config = e),
            (i.RewardState =
              this.ActivityRecallData.GetRecallTaskScoreRewardState(e));
        },
      ),
      this.K_a.RefreshByData(this.Q_a);
  }
  J_a() {
    var e = this.z_a();
    this.VZt.RefreshByData(e);
  }
  mGe() {
    var e = this.GetText(1),
      [i, t] =
        ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(
          this.ActivityRecallData,
        );
    (e.text = t), e.SetUIActive(i);
  }
  z_a() {
    var e = [],
      i = this.ActivityRecallData.GetRecallTaskConfigMap();
    for (const s in ActivityRecallDefine_1.EActivityRecallTaskType) {
      var t = Number(s),
        r = i.get(t);
      void 0 !== r && 0 < r.length && this.Z_a(e, t, r);
    }
    return e;
  }
  Z_a(t, r, e) {
    var i = new ActivityRecallDefine_1.ActivityRecallTaskDynamicData(),
      i = ((i.ItemType = 0), (i.TaskType = r), t.push(i), [...e]);
    i.sort((e, i) => {
      return (
        this.ActivityRecallData.GetTaskRewardShowPriority(e.Id) -
        this.ActivityRecallData.GetTaskRewardShowPriority(i.Id)
      );
    }),
      i.forEach((e) => {
        var i = new ActivityRecallDefine_1.ActivityRecallTaskDynamicData();
        (i.ItemType = 1), (i.TaskType = r), (i.Config = e), t.push(i);
      });
  }
  OnRefreshByData(e) {
    this.Og();
  }
  Og() {
    this.Y_a(), this.J_a(), this.mGe();
  }
}
exports.ActivityRecallTaskSubView = ActivityRecallTaskSubView;
//# sourceMappingURL=ActivityRecallTaskSubView.js.map
