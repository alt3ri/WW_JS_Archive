"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewTurntable = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityTurntableComponent_1 = require("./ActivityTurntableComponent");
const ActivityTurntableController_1 = require("./ActivityTurntableController");
const ActivityTurntableItem_1 = require("./ActivityTurntableItem");
const titleIdNameList = [
  [1, 2, 3],
  [2, 1, 3],
  [3, 1, 2],
];
class ActivitySubViewTurntable extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityTurntableData = void 0),
      (this.LNe = void 0),
      (this.SDn = void 0),
      (this.BIn = void 0),
      (this.bIn = void 0),
      (this.yBn = void 0),
      (this.qIn = void 0),
      (this.GIn = -1),
      (this.PNe = !1),
      (this.xNe = 0),
      (this.wNe = (t) => {
        t === this.ActivityTurntableData.Id && this.xbn();
      }),
      (this.NIn = () => {
        const t =
          new ActivityTurntableItem_1.ActivityTurntableToggleGroupItem();
        return (t.ToggleCallBack = this.pqe), t;
      }),
      (this.pqe = (t, i) => {
        i &&
          (this.GIn >= 0 &&
            this.GIn !== t &&
            this.qIn.GetLayoutItemByIndex(this.GIn).SetToggleState(!1),
          this.OIn(t, this.GIn),
          this.EDn());
      }),
      (this.kIn = () => {
        this.ActivityTurntableData.GetActivityCurrencyCount() >=
          this.ActivityTurntableData.TurntableCostCount &&
          ActivityTurntableController_1.ActivityTurntableController.RequestTurntableRun(
            this.ActivityTurntableData.Id,
          );
      }),
      (this.IBn = []),
      (this.TBn = []),
      (this.FIn = (t) => {
        const i = this.ActivityTurntableData.GetCurrentRoundId();
        const e = this.GIn;
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SetActivityViewState,
          !1,
          1,
          !0,
        ),
          this.bIn.RunTurntableByRewardId(t, () => {
            ActivityTurntableController_1.ActivityTurntableController.ShowTurntableItemObtain(
              this.ActivityTurntableData.GetRunResult(),
              () => {
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.SetActivityViewState,
                  !0,
                  1,
                  !0,
                ),
                  i !== e &&
                    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                      "TurntableActivity_Tips01",
                    );
              },
            ),
              this.VIn();
          });
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIHorizontalLayout],
      [6, UE.UIItem],
      [5, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UISprite],
      [10, UE.UISprite],
      [11, UE.UISprite],
      [12, UE.UISprite],
      [13, UE.UISprite],
    ];
  }
  OnSetData() {
    this.ActivityTurntableData = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(1);
    var t =
      ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
      await this.LNe.CreateThenShowByActorAsync(t.GetOwner()),
      this.GetItem(3));
    var t =
      ((this.BIn = new ActivityTurntableItem_1.ActivityTurntableQuestItem()),
      await this.BIn.CreateThenShowByActorAsync(t.GetOwner()),
      this.GetItem(5));
    var t =
      ((this.bIn =
        new ActivityTurntableComponent_1.ActivityTurntableComponent()),
      await this.bIn.CreateThenShowByActorAsync(t.GetOwner()),
      this.GetItem(8));
    var t =
      ((this.yBn =
        new ActivityTurntableComponent_1.ActivityTurntableComponent()),
      await this.yBn.CreateThenShowByActorAsync(t.GetOwner()),
      this.GetItem(7));
    (this.SDn = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
      await this.SDn.CreateThenShowByActorAsync(t.GetOwner()),
      (this.qIn = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(4),
        this.NIn,
      ));
  }
  OnStart() {
    this.ActivityBaseData.LocalConfig &&
      (this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      this.SDn.FunctionButton.BindCallback(this.kIn),
      this.SDn.SetFunctionRedDotVisible(!0),
      this.yBn.SetActive(!1),
      (this.yBn.Activate = !1),
      this.LBn());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TurntableStartRun,
      this.FIn,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.wNe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TurntableStartRun,
      this.FIn,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.wNe,
      );
  }
  OnRefreshView() {
    this.HIn(),
      this.VIn(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetActivityViewCurrency,
        [this.ActivityTurntableData.TurntableCostConfigId],
      );
  }
  OnBeforeDestroy() {
    (this.IBn.length = 0), (this.TBn.length = 0);
  }
  OnTimer(t) {
    this.FNe();
  }
  xbn() {
    const t = this.ActivityTurntableData.IsHasNewQuestRedDot();
    this.BIn.SetRedDot(t);
  }
  HIn() {
    this.PNe = !1;
    var i = this.ActivityTurntableData.GetCurrentQuestProgress();
    var e = this.ActivityTurntableData.QuestList.length;
    if ((this.GetItem(2).SetUIActive(i < e), i !== e)) {
      this.BIn.SetTitle(
        "TurntableActivity_Progress",
        i.toString(),
        e.toString(),
      );
      const s = this.ActivityTurntableData.GetCurrentQuestIndex();
      var i = this.ActivityTurntableData.QuestList[s];
      var e = this.ActivityTurntableData.QuestStateMap.get(i);
      const n = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(i);
      let r = n?.RewardId;
      if (r !== 0) {
        r = this.ActivityTurntableData.GetPreviewReward(r);
        if (!(r.length < 1)) {
          let t = !1;
          switch (e.QuestState) {
            case 1:
            case 2:
              var h = n?.TidName;
              var h = h ? PublicUtil_1.PublicUtil.GetConfigTextByKey(h) : "";
              this.BIn.SetTxt(h);
              break;
            case 3:
              (t = !0), (this.PNe = !0);
              (h = this.ActivityTurntableData.QuestList[s + 1]),
                (h = this.ActivityTurntableData.QuestStateMap.get(h));
              (this.xNe = h.QuestUnlockStamp), this.FNe();
          }
          this.BIn.Refresh(t, r[0], i, this.ActivityTurntableData.Id),
            this.xbn();
        }
      }
    }
  }
  FNe() {
    const [t, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(t),
      t && this.LNe.SetTimeTextByText(i),
      this.PNe &&
        this.BIn.SetTxtById("TurntableActivity_TaskDesc", this.jIn(this.xNe));
  }
  jIn(t) {
    var i = TimeUtil_1.TimeUtil.GetServerTime();
    var t = Math.max(t - i, 1);
    var i = this.jNe(t);
    return (
      TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, i[0], i[1])
        .CountDownText ?? ""
    );
  }
  jNe(t) {
    return t > CommonDefine_1.SECOND_PER_DAY
      ? [3, 2]
      : t > CommonDefine_1.SECOND_PER_HOUR
        ? [2, 1]
        : t > CommonDefine_1.SECOND_PER_MINUTE
          ? [1, 0]
          : [0, 0];
  }
  EDn() {
    const t = this.ActivityTurntableData.GetCurrentRoundId() === this.GIn;
    const i = this.ActivityTurntableData.IsRoundUnFinished(this.GIn);
    const e = this.ActivityTurntableData.IsHasRewardRedDot();
    i
      ? t
        ? e
          ? this.yDn()
          : this.IDn("TurntableActivity_ForbidTips01")
        : this.IDn("TurntableActivity_ForbidTips02")
      : this.TDn();
  }
  TDn() {
    this.SDn.FunctionButton.SetActive(!1),
      this.SDn.SetPanelConditionVisible(!1),
      this.SDn.SetActivatePanelConditionVisible(!0);
  }
  IDn(t) {
    this.SDn.FunctionButton.SetActive(!1),
      this.SDn.SetPanelConditionVisible(!0),
      this.SDn.SetLockTextByTextId(t),
      this.SDn.SetActivatePanelConditionVisible(!1);
  }
  yDn() {
    this.SDn.FunctionButton.SetActive(!0),
      this.SDn.SetPanelConditionVisible(!1),
      this.SDn.SetActivatePanelConditionVisible(!1);
  }
  VIn() {
    this.qIn.RefreshByData(this.ActivityTurntableData.RoundIdList, () => {
      const i = this.ActivityTurntableData.GetCurrentRoundId();
      const e = this.qIn.GetLayoutItemList();
      for (let t = 0; t < this.ActivityTurntableData.RoundIdList.length; t++) {
        const s = this.ActivityTurntableData.RoundIdList[t];
        var n = this.ActivityTurntableData.IsRoundUnFinished(s);
        var n = (e[t].SetToggleDisable(!n), s === i);
        e[t].SetToggleState(n, !1);
      }
      this.OIn(i, this.GIn, !1), this.EDn();
    });
  }
  LBn() {
    for (const s of titleIdNameList) {
      const t = [];
      for (const n of s) {
        var i = "SP_TurntableTitleRound" + n;
        var i =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
        t.push(i);
      }
      this.TBn.push(t);
    }
    for (const r of [
      [9, 0, !0],
      [10, 0, !1],
      [11, 1, !0],
      [12, 2, !0],
      [13, 0, !0],
    ]) {
      const e = { Sprite: this.GetSprite(r[0]), Index: r[1], IsCurrent: r[2] };
      this.IBn.push(e);
    }
  }
  async mGe(t, i) {
    let e = 0;
    const s = new CustomPromise_1.CustomPromise();
    const n = () => {
      ++e === this.IBn.length && s.SetResult();
    };
    for (const h of this.IBn) {
      var r = h.IsCurrent ? t : i;
      var r = this.TBn[r][h.Index];
      this.SetSpriteByPath(r, h.Sprite, !1, void 0, n);
    }
    await s.Promise;
  }
  async OIn(t, i, e = !0) {
    this.GIn = t;
    var e = e && i >= 0;
    const s =
      (e &&
        (await this.DBn(i, this.yBn),
        this.yBn.SetUiActive(!0),
        this.bIn.SetUiActive(!1)),
      [this.DBn(t, this.bIn), this.mGe(t, i >= 0 ? i : t)]);
    await Promise.all(s),
      e &&
        (await this.LevelSequencePlayer.PlaySequenceAsync(
          i < t ? "PageDown" : "PageUp",
          new CustomPromise_1.CustomPromise(),
          !0,
        ));
  }
  async DBn(t, i) {
    const e = [];
    for (const n of this.ActivityTurntableData.RoundRewardIdMap.get(t)) {
      const s = this.ActivityTurntableData.AllRewardInfo.get(n);
      e.push(s);
    }
    await i.Refresh(e);
  }
  OnCommonViewStateChange(t) {
    this.LevelSequencePlayer.PlayLevelSequenceByName(
      t ? "TurnTableOut" : "TurnTableIn",
      !0,
    );
  }
}
exports.ActivitySubViewTurntable = ActivitySubViewTurntable;
// # sourceMappingURL=ActivitySubViewTurntable.js.map
