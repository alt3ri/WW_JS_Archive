"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressSignPanel = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  ActivityControllerHolder_1 = require("../../../ActivityControllerHolder"),
  ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityRegressSignInRewardItem_1 = require("./ActivityRegressSignInRewardItem");
class ActivityRegressSignPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.oma = []),
      (this.sma = void 0),
      (this.$pt = void 0),
      (this.kOe = (e) => {
        this.mGe();
      }),
      (this.u6e = (e) => {
        e =
          ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetSignRewardEntityId(
            e + 1,
          );
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestClaimSignReward(
          e,
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var e = this.GetItem(0),
      i = [
        this.GetItem(1),
        this.GetItem(2),
        this.GetItem(3),
        this.GetItem(4),
        this.GetItem(5),
        this.GetItem(6),
        this.GetItem(7),
      ];
    await Promise.all([
      this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
      i.map(async (e) => {
        var i =
          new ActivityRegressSignInRewardItem_1.ActivityRegressSignInRewardItem();
        i.RegisterItemClickCallBack(this.u6e),
          await i.CreateThenShowByActorAsync(e.GetOwner()),
          this.oma.push(i);
      }),
    ]),
      (this.sma = TimerSystem_1.RealTimeTimerSystem.Forever(
        this.kOe,
        TimeUtil_1.TimeUtil.InverseMillisecond,
      )),
      (this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.GetRootItem()));
  }
  OnBeforeShow() {
    this.$pt.PlaySequence("Start");
  }
  async OnBeforeHideAsync() {
    await this.$pt.PlaySequenceAsync(
      "Close",
      new CustomPromise_1.CustomPromise(),
    );
  }
  OnAfterHide() {
    this.jm();
  }
  OnBeforeDestroy() {
    this.jm(),
      ModelManager_1.ModelManager.ActivityRegressModel.ClearSignRewardConfig();
  }
  RefreshView() {
    ModelManager_1.ModelManager.ActivityRegressModel.SetupSignRewardConfig(),
      this.mGe(),
      this.ama();
  }
  mGe() {
    this.LNe.SetTitleByTextId("RecallActivity_Sign_Title");
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData,
      [e, i] =
        ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(
          e,
        );
    this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(i);
  }
  ama() {
    for (var [e, i] of this.oma.entries()) i.RefreshByData(e);
  }
  jm() {
    TimerSystem_1.RealTimeTimerSystem.Has(this.sma) &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.sma), (this.sma = void 0));
  }
}
exports.ActivityRegressSignPanel = ActivityRegressSignPanel;
//# sourceMappingURL=ActivityRegressSignPanel.js.map
