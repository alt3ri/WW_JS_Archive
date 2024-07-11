"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallSignPanel = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityRecallHelper_1 = require("../Misc/ActivityRecallHelper"),
  ActivityRecallSignInRewardItem_1 = require("./ActivityRecallSignInRewardItem");
class ActivityRecallSignPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.P_a = []),
      (this.G1a = void 0),
      (this.w_a = void 0),
      (this.B_a = void 0),
      (this.$pt = void 0),
      (this.kOe = (e) => {
        this.G1a.IsActivityOpen() && this.mGe();
      }),
      (this.u6e = (e) => {
        e = this.G1a.GetSignRewardEntityId(e + 1);
        ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallController.RequestClaimSignReward(
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
          new ActivityRecallSignInRewardItem_1.ActivityRecallSignInRewardItem();
        i.RegisterItemClickCallBack(this.u6e),
          await i.CreateThenShowByActorAsync(e.GetOwner()),
          this.P_a.push(i);
      }),
    ]),
      (this.B_a = TimerSystem_1.RealTimeTimerSystem.Forever(
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
    this.jm();
  }
  RefreshByData(e) {
    (this.G1a = e),
      (this.w_a =
        ConfigManager_1.ConfigManager.ActivityRecallConfig.GetSignRewardIds(
          e.Id,
        )),
      this.mGe(),
      this.b_a();
  }
  mGe() {
    this.LNe.SetTitleByTextId("RecallActivity_Sign_Title");
    var [e, i] =
      ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(
        this.G1a,
      );
    this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(i);
  }
  b_a() {
    this.P_a.forEach((e, i) => {
      var t = this.w_a[i];
      e.RefreshByData(this.G1a, i, t);
    });
  }
  jm() {
    TimerSystem_1.RealTimeTimerSystem.Has(this.B_a) &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.B_a), (this.B_a = void 0));
  }
}
exports.ActivityRecallSignPanel = ActivityRecallSignPanel;
//# sourceMappingURL=ActivityRecallSignPanel.js.map
