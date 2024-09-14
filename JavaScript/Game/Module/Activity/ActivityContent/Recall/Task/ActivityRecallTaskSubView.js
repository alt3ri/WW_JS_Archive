"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallTaskSubView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
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
      (this.ima = void 0),
      (this.rma = void 0),
      (this.jda = void 0),
      (this.oma = void 0),
      (this.nma = (e, i, t) => {
        var r =
          new ActivityRecallTaskDynamicScrollItem_1.ActivityRecallTaskDynamicScrollItem();
        return this.ima.push(r), r;
      }),
      (this.sma = () => {
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
    (this.ima = []),
      (this.VZt = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(0),
        this.GetItem(3),
        new ActivityRecallTaskDynamicItem_1.ActivityRecallTaskDynamicItem(),
        this.nma,
      )),
      await ExploreProgressController_1.ExploreProgressController.AllExploreProgressAsyncRequest(),
      await this.VZt.Init();
  }
  OnBeforeShow() {
    super.OnBeforeShow(),
      (this.jda = TimerSystem_1.RealTimeTimerSystem.Forever(
        this.kOe,
        TimeUtil_1.TimeUtil.InverseMillisecond,
      ));
  }
  OnAfterHide() {
    super.OnAfterHide(), this.jm();
  }
  OnBeforeDestroy() {
    this.VZt && (this.VZt.ClearChildren(), (this.VZt = void 0)),
      (this.ima = void 0);
  }
  jm() {
    TimerSystem_1.RealTimeTimerSystem.Has(this.jda) &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.jda), (this.jda = void 0));
  }
  OnStart() {
    super.OnStart(),
      (this.oma = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(2),
        this.sma,
      ));
  }
  ama() {
    var e = this.GetText(4),
      i = this.ActivityRecallData.GetRecallTaskScore();
    e.SetText("x" + i),
      (this.rma = this.rma ?? []),
      ConfigManager_1.ConfigManager.ActivityRecallConfig.GetAllRecallScoreRewardConfigList().forEach(
        (e, i) => {
          i >= this.rma.length &&
            this.rma.push(
              new ActivityRecallDefine_1.ActivityRecallTaskScoreRewardGridData(),
            );
          i = this.rma[i];
          (i.Config = e),
            (i.RewardState =
              this.ActivityRecallData.GetRecallTaskScoreRewardState(e));
        },
      ),
      this.oma.RefreshByData(this.rma);
  }
  hma() {
    var e = this.lma();
    this.VZt.RefreshByData(e);
  }
  mGe() {
    var e = this.GetText(1),
      [i, t] =
        ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(
          this.ActivityRecallData,
        );
    e.SetText(t), e.SetUIActive(i);
  }
  lma() {
    var e = [],
      i = this.ActivityRecallData.GetRecallTaskConfigMap();
    for (const s in ActivityRecallDefine_1.EActivityRecallTaskType) {
      var t = Number(s),
        r = i.get(t);
      void 0 !== r && 0 < r.length && this._ma(e, t, r);
    }
    return e;
  }
  _ma(t, r, e) {
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
    this.ama(), this.hma(), this.mGe();
  }
}
exports.ActivityRecallTaskSubView = ActivityRecallTaskSubView;
//# sourceMappingURL=ActivityRecallTaskSubView.js.map
