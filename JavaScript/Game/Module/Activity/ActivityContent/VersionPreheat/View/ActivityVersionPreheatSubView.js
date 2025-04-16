"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityVersionPreheatSubView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList"),
  ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityVersionPreheatController_1 = require("../Controller/ActivityVersionPreheatController"),
  VersionPreheatDefine_1 = require("../VersionPreheatDefine"),
  preheatItemIndexList = [0, 1, 2, 3, 4, 5];
class ActivityVersionPreheatSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.wno = []),
      (this.B_l = void 0),
      (this.b_l = void 0);
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
    var e = [];
    for (const s of preheatItemIndexList) {
      var t = new VersionPreheatQuestItem(),
        i = this.GetItem(s);
      e.push(t.CreateThenShowByActorAsync(i.GetOwner())), this.wno.push(t);
    }
    (this.B_l = new VersionPreheatBonusItem()),
      await this.B_l.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()),
      (this.b_l = new VersionPreheatActivityItem()),
      e.push(this.b_l.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())),
      await Promise.all(e);
  }
  OnBeforeDestroy() {
    this.wno.length = 0;
  }
  OnStart() {}
  OnRefreshView() {
    this.q_l(), this.G_l(), this.e4i();
  }
  OnTimer(e) {
    var [t, i] = this.GetTimeVisibleAndRemainTime();
    this.b_l.RefreshSubTitleExternal(t, i);
  }
  q_l() {
    var e =
      ModelManager_1.ModelManager.VersionPreheatModel.BuildQuestDataList();
    if (this.wno.length !== e.length) {
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "VersionPreheat",
          64,
          "任务数据个数与任务ui个数不匹配，隐藏全部任务面板",
          ["item count", this.wno.length],
          ["data count", e.length],
        );
      for (const s of this.wno) s.SetUiActive(!1);
    } else for (var [t, i] of e.entries()) this.wno[t].RefreshExternalAsync(i);
  }
  G_l() {
    var e =
      ModelManager_1.ModelManager.VersionPreheatModel.BuildActivityInfoData();
    this.b_l.RefreshExternal(e);
  }
  e4i() {
    var e = ModelManager_1.ModelManager.VersionPreheatModel,
      t = e.IsBonusAvailable;
    this.B_l.SetUiActive(t),
      t && ((t = e.BuildBonusQuestData()), this.B_l.RefreshExternalAsync(t));
  }
}
exports.ActivityVersionPreheatSubView = ActivityVersionPreheatSubView;
class VersionPreheatQuestItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this._9a = void 0),
      (this.ujr = void 0),
      (this.p9a = () => {
        this.k_l();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.p9a]]);
  }
  async OnBeforeStartAsync() {
    return (
      (this.ujr = new UiSequencePlayer_1.UiSequencePlayer(
        this.GetRootItem().GetParentAsUIItem(),
      )),
      Promise.resolve()
    );
  }
  async RefreshExternalAsync(e) {
    var t;
    0 === (this._9a = e).State
      ? (this.GetItem(1)?.SetUIActive(!0),
        this.GetItem(2)?.SetUIActive(!1),
        this.GetItem(6)?.SetUIActive(!1))
      : 0 ===
            (t =
              ModelManager_1.ModelManager
                .VersionPreheatModel).GetQuestStateById(e.Id) ||
          t.IsQuestPlayedById(e.Id) ||
          t.IsQuestClickedById(e.Id)
        ? (this.GetItem(1)?.SetUIActive(!1), this.jCl(e))
        : (this.GetItem(1)?.SetUIActive(!0),
          this.GetItem(2)?.SetUIActive(!1),
          this.GetItem(6)?.SetUIActive(!1),
          await TimerSystem_1.TimerSystem.Wait(
            VersionPreheatDefine_1.UNLOCK_PLAY_DELAY,
          ),
          this.jCl(e),
          await this.ujr.LitePlayAsync("Unlock"),
          t.SetQuestPlayedById(e.Id));
  }
  jCl(e) {
    this.GetItem(6)?.SetUIActive(
      !ModelManager_1.ModelManager.VersionPreheatModel.IsQuestClickedById(e.Id),
    ),
      this.GetItem(2)?.SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        e.NumberTextId,
        e.NumberTextArg,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.TitleTextId),
      this.GetItem(5)?.SetUIActive(3 === e.State);
  }
  async k_l() {
    var e, t;
    0 !== this._9a.State
      ? ((t = this._9a.Id),
        (e =
          ModelManager_1.ModelManager.VersionPreheatModel).SetQuestClickedById(
          t,
        ),
        2 <= this._9a.State &&
          (await ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.RequestPreheatSignSurveyInfoRequest(
            t,
          )),
        await ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.OpenTargetViewAsyncById(
          t,
          !1,
        ),
        (e.CurrentUsingVersionPreheatId = t),
        ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.SendDetailClickLogData(
          t,
        ))
      : ((e = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
        this._9a.UnlockTimestamp > e
          ? ((t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(
              TimeUtil_1.TimeUtil.SetTimeSecond(this._9a.UnlockTimestamp - e),
            )),
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
              "Preheating_NoJoinTips02",
              t.CountDownText,
            ))
          : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
              "Preheating_NoJoinTips01",
            ));
  }
}
class VersionPreheatBonusItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ujr = void 0),
      (this.p9a = () => {
        ModelManager_1.ModelManager.VersionPreheatModel.SetBonusClicked(),
          ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.OpenTargetViewAsyncById(
            void 0,
            !1,
          ),
          ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.SendDetailClickLogData(
            void 0,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.p9a]]);
  }
  async OnBeforeStartAsync() {
    return (
      (this.ujr = new UiSequencePlayer_1.UiSequencePlayer(
        this.GetRootItem().GetParentAsUIItem(),
      )),
      Promise.resolve()
    );
  }
  async RefreshExternalAsync(e) {
    var t = ModelManager_1.ModelManager.VersionPreheatModel;
    t.IsBonusPlayed() || t.IsBonusClicked()
      ? (this.WCl(), this.GetItem(1)?.SetUIActive(!1))
      : (this.GetRootItem().SetUIActive(!1),
        await TimerSystem_1.TimerSystem.Wait(
          VersionPreheatDefine_1.UNLOCK_PLAY_DELAY,
        ),
        this.WCl(),
        await this.ujr.LitePlayAsync("Unlock"),
        t.SetBonusPlayed());
  }
  WCl() {
    this.GetRootItem().SetUIActive(!0),
      this.GetItem(2)?.SetUIActive(!0),
      this.GetText(3)?.SetUIActive(!1),
      this.GetText(4)?.SetUIActive(!1),
      this.GetItem(5)?.SetUIActive(
        ModelManager_1.ModelManager.VersionPreheatModel.IsBonusClicked(),
      ),
      this.GetItem(6)?.SetUIActive(
        !ModelManager_1.ModelManager.VersionPreheatModel.IsBonusClicked(),
      );
  }
}
class VersionPreheatActivityItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.O_l = void 0),
      (this.N_l = void 0),
      (this.uFo = void 0),
      (this.F_l = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.O_l = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
      (this.N_l = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
      (this.uFo = new ActivityRewardList_1.ActivityRewardList()),
      (this.F_l = new VersionPreheatActivityBottom()),
      await Promise.all([
        this.O_l.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
        this.N_l.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
        this.uFo.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
        this.F_l.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
      ]);
  }
  OnStart() {
    this.uFo.SetUiActive(!1), this.F_l.SetUiActive(!1);
  }
  RefreshExternal(e) {
    this.mGe(e.TitleData), this.ufo(e.DescriptionData);
  }
  RefreshSubTitleExternal(e, t) {
    this.O_l.SetTimeTextVisible(e), e && this.O_l.SetTimeTextByText(t);
  }
  mGe(e) {
    this.O_l.SetTitleByTextId(e.TitleTextId),
      this.O_l.SetSubTitleByTextId(e.SubTitleTextId),
      this.O_l.SetSubTitleVisible(!0),
      this.O_l.SetTimeTextVisible(!1);
  }
  ufo(e) {
    this.N_l.SetContentByTextId(e.ContentTextId);
  }
}
class VersionPreheatActivityBottom extends UiPanelBase_1.UiPanelBase {}
//# sourceMappingURL=ActivityVersionPreheatSubView.js.map
