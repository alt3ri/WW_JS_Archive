"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewTurntable = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityTurntableComponent_1 = require("./ActivityTurntableComponent"),
  ActivityTurntableController_1 = require("./ActivityTurntableController"),
  ActivityTurntableItem_1 = require("./ActivityTurntableItem"),
  titleIdNameList = [
    [1, 2, 3],
    [2, 1, 3],
    [3, 1, 2],
  ];
class ActivitySubViewTurntable extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityTurntableData = void 0),
      (this.LNe = void 0),
      (this.vUn = void 0),
      (this.ZTn = void 0),
      (this.eLn = void 0),
      (this.Qqn = void 0),
      (this.tLn = void 0),
      (this.iLn = -1),
      (this.PNe = !1),
      (this.xNe = 0),
      (this.wNe = (t) => {
        t === this.ActivityTurntableData.Id && this.e2n();
      }),
      (this.oLn = () => {
        var t = new ActivityTurntableItem_1.ActivityTurntableToggleGroupItem();
        return (t.ToggleCallBack = this.pqe), t;
      }),
      (this.pqe = (t, i) => {
        i &&
          (0 <= this.iLn &&
            this.iLn !== t &&
            this.tLn.GetLayoutItemByIndex(this.iLn).SetToggleState(!1),
          this.rLn(t, this.iLn),
          this.MUn());
      }),
      (this.nLn = () => {
        this.ActivityTurntableData.GetActivityCurrencyCount() >=
          this.ActivityTurntableData.TurntableCostCount &&
          ActivityTurntableController_1.ActivityTurntableController.RequestTurntableRun(
            this.ActivityTurntableData.Id,
          );
      }),
      (this.Xqn = []),
      (this.$qn = []),
      (this.sLn = (t) => {
        const i = this.ActivityTurntableData.GetCurrentRoundId(),
          e = this.iLn;
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SetActivityViewState,
          !1,
          1,
          !0,
        ),
          this.eLn.RunTurntableByRewardId(t, () => {
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
              this.aLn();
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
    var t = this.GetItem(1),
      t =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        await this.LNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.GetItem(3)),
      t =
        ((this.ZTn = new ActivityTurntableItem_1.ActivityTurntableQuestItem()),
        await this.ZTn.CreateThenShowByActorAsync(t.GetOwner()),
        this.GetItem(5)),
      t =
        ((this.eLn =
          new ActivityTurntableComponent_1.ActivityTurntableComponent()),
        await this.eLn.CreateThenShowByActorAsync(t.GetOwner()),
        this.GetItem(8)),
      t =
        ((this.Qqn =
          new ActivityTurntableComponent_1.ActivityTurntableComponent()),
        await this.Qqn.CreateThenShowByActorAsync(t.GetOwner()),
        this.GetItem(7));
    (this.vUn = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
      this.ActivityBaseData,
    )),
      await this.vUn.CreateThenShowByActorAsync(t.GetOwner()),
      (this.tLn = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(4),
        this.oLn,
      ));
  }
  OnStart() {
    this.ActivityBaseData.LocalConfig &&
      (this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      this.vUn.FunctionButton.SetFunction(this.nLn),
      this.vUn.SetFunctionRedDotVisible(!0),
      this.Qqn.SetActive(!1),
      (this.Qqn.Activate = !1),
      this.Yqn());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TurntableStartRun,
      this.sLn,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.wNe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TurntableStartRun,
      this.sLn,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.wNe,
      );
  }
  OnRefreshView() {
    this.hLn(),
      this.aLn(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetActivityViewCurrency,
        [this.ActivityTurntableData.TurntableCostConfigId],
      );
  }
  OnBeforeDestroy() {
    (this.Xqn.length = 0), (this.$qn.length = 0);
  }
  OnTimer(t) {
    this.FNe();
  }
  e2n() {
    var t = this.ActivityTurntableData.IsHasNewQuestRedDot();
    this.ZTn.SetRedDot(t);
  }
  hLn() {
    this.PNe = !1;
    var i = this.ActivityTurntableData.GetCurrentQuestProgress(),
      e = this.ActivityTurntableData.QuestList.length;
    if ((this.GetItem(2).SetUIActive(i < e), i !== e)) {
      this.ZTn.SetTitle(
        "TurntableActivity_Progress",
        i.toString(),
        e.toString(),
      );
      var s = this.ActivityTurntableData.GetCurrentQuestIndex(),
        i = this.ActivityTurntableData.QuestList[s],
        e = this.ActivityTurntableData.QuestStateMap.get(i),
        n = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(i),
        r = n?.RewardId;
      if (0 !== r) {
        r = this.ActivityTurntableData.GetPreviewReward(r);
        if (!(r.length < 1)) {
          let t = !1;
          switch (e.QuestState) {
            case 1:
            case 2:
              var h = n?.TidName,
                h = h ? PublicUtil_1.PublicUtil.GetConfigTextByKey(h) : "";
              this.ZTn.SetTxt(h);
              break;
            case 3:
              (t = !0), (this.PNe = !0);
              (h = this.ActivityTurntableData.QuestList[s + 1]),
                (h = this.ActivityTurntableData.QuestStateMap.get(h));
              (this.xNe = h.QuestUnlockStamp), this.FNe();
          }
          this.ZTn.Refresh(t, r[0], i, this.ActivityTurntableData.Id),
            this.e2n();
        }
      }
    }
  }
  FNe() {
    var [t, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(t),
      t && this.LNe.SetTimeTextByText(i),
      this.PNe &&
        this.ZTn.SetTxtById("TurntableActivity_TaskDesc", this.lLn(this.xNe));
  }
  lLn(t) {
    var i = TimeUtil_1.TimeUtil.GetServerTime(),
      t = Math.max(t - i, 1),
      i = this.jNe(t);
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
  MUn() {
    var t = this.ActivityTurntableData.GetCurrentRoundId() === this.iLn,
      i = this.ActivityTurntableData.IsRoundUnFinished(this.iLn),
      e = this.ActivityTurntableData.IsHasRewardRedDot();
    i
      ? t
        ? e
          ? this.EUn()
          : this.SUn("TurntableActivity_ForbidTips01")
        : this.SUn("TurntableActivity_ForbidTips02")
      : this.yUn();
  }
  yUn() {
    this.vUn.FunctionButton.SetActive(!1),
      this.vUn.SetPanelConditionVisible(!1),
      this.vUn.SetActivatePanelConditionVisible(!0);
  }
  SUn(t) {
    this.vUn.FunctionButton.SetActive(!1),
      this.vUn.SetPanelConditionVisible(!0),
      this.vUn.SetLockTextByTextId(t),
      this.vUn.SetActivatePanelConditionVisible(!1);
  }
  EUn() {
    this.vUn.FunctionButton.SetActive(!0),
      this.vUn.SetPanelConditionVisible(!1),
      this.vUn.SetActivatePanelConditionVisible(!1);
  }
  aLn() {
    this.tLn.RefreshByData(this.ActivityTurntableData.RoundIdList, () => {
      var i = this.ActivityTurntableData.GetCurrentRoundId(),
        e = this.tLn.GetLayoutItemList();
      for (let t = 0; t < this.ActivityTurntableData.RoundIdList.length; t++) {
        var s = this.ActivityTurntableData.RoundIdList[t],
          n = this.ActivityTurntableData.IsRoundUnFinished(s),
          n = (e[t].SetToggleDisable(!n), s === i);
        e[t].SetToggleState(n, !1);
      }
      this.rLn(i, this.iLn, !1), this.MUn();
    });
  }
  Yqn() {
    for (const s of titleIdNameList) {
      var t = [];
      for (const n of s) {
        var i = "SP_TurntableTitleRound" + n,
          i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
        t.push(i);
      }
      this.$qn.push(t);
    }
    for (const r of [
      [9, 0, !0],
      [10, 0, !1],
      [11, 1, !0],
      [12, 2, !0],
      [13, 0, !0],
    ]) {
      var e = { Sprite: this.GetSprite(r[0]), Index: r[1], IsCurrent: r[2] };
      this.Xqn.push(e);
    }
  }
  async mGe(t, i) {
    let e = 0;
    const s = new CustomPromise_1.CustomPromise();
    var n = () => {
      ++e === this.Xqn.length && s.SetResult();
    };
    for (const h of this.Xqn) {
      var r = h.IsCurrent ? t : i,
        r = this.$qn[r][h.Index];
      this.SetSpriteByPath(r, h.Sprite, !1, void 0, n);
    }
    await s.Promise;
  }
  async rLn(t, i, e = !0) {
    this.iLn = t;
    var e = e && 0 <= i,
      s =
        (e &&
          (await this.Jqn(i, this.Qqn),
          this.Qqn.SetUiActive(!0),
          this.eLn.SetUiActive(!1)),
        [this.Jqn(t, this.eLn), this.mGe(t, 0 <= i ? i : t)]);
    await Promise.all(s),
      e &&
        (await this.LevelSequencePlayer.PlaySequenceAsync(
          i < t ? "PageDown" : "PageUp",
          new CustomPromise_1.CustomPromise(),
          !0,
        ));
  }
  async Jqn(t, i) {
    var e = [];
    for (const n of this.ActivityTurntableData.RoundRewardIdMap.get(t)) {
      var s = this.ActivityTurntableData.AllRewardInfo.get(n);
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
//# sourceMappingURL=ActivitySubViewTurntable.js.map
