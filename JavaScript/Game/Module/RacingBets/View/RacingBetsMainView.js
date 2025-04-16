"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsMainView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem"),
  ConfirmBoxController_1 = require("../../ConfirmBox/ConfirmBoxController"),
  DangoManager_1 = require("../../Dango/DangoLogic/DangoManager"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiCameraAnimationController_1 = require("../../UiCameraAnimation/UiCameraAnimationController"),
  UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsDefine_1 = require("../RacingBetsDefine"),
  RacingBetsButtonItem_1 = require("./Item/RacingBetsButtonItem"),
  RacingBetsChampionRewardItem_1 = require("./Item/RacingBetsChampionRewardItem"),
  RacingBetsCostItem_1 = require("./Item/RacingBetsCostItem"),
  RacingBetsDangoBroadcastItem_1 = require("./Item/RacingBetsDangoBroadcastItem"),
  RacingBetsLegMatchResultItem_1 = require("./Item/RacingBetsLegMatchResultItem"),
  RacingBetsLegMatchTabItem_1 = require("./Item/RacingBetsLegMatchTabItem");
class RacingBetsMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.vxc = StringUtils_1.EMPTY_STRING),
      (this.yxc = 2),
      (this.qe1 = 0),
      (this.yvc = void 0),
      (this.Tvc = void 0),
      (this.tr1 = void 0),
      (this.bvc = void 0),
      (this.Lvc = void 0),
      (this.A3o = void 0),
      (this.ixc = void 0),
      (this.I01 = void 0),
      (this.q_1 = void 0),
      (this.eC1 = void 0),
      (this.wvc = void 0),
      (this.Ge1 = []),
      (this.QI1 = []),
      (this.Fe1 = []),
      (this.Mu1 = void 0),
      (this.As1 = void 0),
      (this.Ps1 = void 0),
      (this.xs1 = void 0),
      (this.Ds1 = void 0),
      (this.Bs1 = void 0),
      (this.Us1 = void 0),
      (this.Rvc = () =>
        new RacingBetsLegMatchResultItem_1.RacingBetsLegMatchResultItem()),
      (this.T01 = void 0),
      (this.Ne1 = () => {
        this.Mxc(this.Ge1, this.Tvc);
      }),
      (this.HS1 = () => {
        UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
          this.vxc,
          !0,
          !0,
          "1001",
        );
      }),
      (this.Eu1 = () => {
        this.ewa();
      }),
      (this.Ve1 = (t, i) => {
        this.je1(t, i);
      }),
      (this.Avc = () => {
        var t =
          LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(
            0,
          );
        t &&
          (t = UiSceneManager_1.UiSceneManager.RayTraceDangoActor(t)) &&
          ((t = {
            SelectDangoId: (t.Model?.CheckGetComponent(23)).DangoId,
            LegMatchData: this.Tvc,
            DangoActorList: this.Ge1,
          }),
          UiManager_1.UiManager.OpenView("RacingBetsBettingView", t));
      }),
      (this.lyt = () => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
      }),
      (this.Pvc = () => {
        var t = this.yvc?.GetGroupRewardData(1),
          i = this.yvc?.GetGroupRewardData(3);
        UiManager_1.UiManager.OpenView("RacingBetsActivityRewardView", [t, i]);
      }),
      (this.xvc = () => {
        var t = this.yvc?.GetGroupRewardData(2);
        UiManager_1.UiManager.OpenView("RacingBetsRewardView", [t]);
      }),
      (this.Uvc = () => {
        UiManager_1.UiManager.OpenView("RacingBetsHistoryView");
      }),
      (this.Dvc = () => {
        RacingBetsController_1.RacingBetsController.RacingBetsRankRequest(
          this.yvc.Id,
        ),
          ModelManager_1.ModelManager.RacingBetsModel.SetViewRedDotState(
            LocalStorageDefine_1.ELocalStoragePlayerKey
              .RacingBetsRankViewRecord,
          );
      }),
      (this.Bvc = () => {
        ModelManager_1.ModelManager.RacingBetsModel.SetViewRedDotState(
          LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsMatchViewRecord,
        ),
          UiManager_1.UiManager.OpenView("RacingBetsMatchView");
      }),
      (this.kvc = () => {
        RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(
          this.yvc.Id,
          this.Tvc.Id,
        ),
          LocalStorage_1.LocalStorage.SetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey
              .RacingBetsReplayGameRecord,
            this.Tvc.Id,
          );
      }),
      (this.G_1 = () => {
        RacingBetsController_1.RacingBetsController.RacingBetsMatchInfoRequest(
          this.yvc.Id,
          this.Tvc.Id,
        );
      }),
      (this.Ovc = () => {
        var t;
        0 === this.qe1 || 2 === this.qe1
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Dango_MainPage_MatchNotStart",
            )
          : 1 === this.qe1
            ? ((t = {
                SelectDangoId:
                  (this.Ge1[0].Model?.CheckGetComponent(23)).DangoId,
                LegMatchData: this.Tvc,
                DangoActorList: this.Ge1,
              }),
              UiManager_1.UiManager.OpenView("RacingBetsBettingView", t))
            : (RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(
                this.yvc.Id,
                this.Tvc.Id,
              ),
              LocalStorage_1.LocalStorage.SetPlayer(
                LocalStorageDefine_1.ELocalStoragePlayerKey
                  .RacingBetsWatchGameRecord,
                this.Tvc.Id,
              ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIVerticalLayout],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIText],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIText],
      [22, UE.UITexture],
      [23, UE.UIItem],
      [24, UE.UIText],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIItem],
      [30, UE.UIItem],
      [31, UE.UIText],
      [32, UE.UIButtonComponent],
      [33, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.Avc],
        [1, this.lyt],
        [32, this.G_1],
      ]);
  }
  async OnBeforeStartAsync() {
    this.yvc =
      ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    var t = this.yvc.GetCurLegMatchDataIndex();
    (this.Tvc = this.yvc.GetLegMatchDataByIndex(t)),
      (this.tr1 = this.yvc.GetLegMatchDataByIndex(t + 1)),
      (this.qe1 = this.Tvc.GetLegMatchState()),
      (this.yxc = this.Tvc.GetRacingBetsMainViewActorShowType(this.qe1)),
      (this.vxc = this.Tvc.GetMainViewCameraHandleName(this.yxc)),
      await Promise.all([this.iqi(), this.Sxc()]),
      this.ks1();
  }
  async iqi() {
    var t = [];
    (this.bvc = new RacingBetsLegMatchTabItem_1.RacingBetsLegMatchTabItem()),
      t.push(this.bvc.CreateThenShowByActorAsync(this.GetItem(9).GetOwner())),
      (this.Lvc = new RacingBetsLegMatchTabItem_1.RacingBetsLegMatchTabItem()),
      t.push(this.Lvc.CreateThenShowByActorAsync(this.GetItem(10).GetOwner())),
      (this.wvc = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(15),
        this.Rvc,
      )),
      (this.A3o = new CommonCurrencyItem_1.CommonCurrencyItem()),
      t.push(this.A3o.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())),
      (this.ixc = new RacingBetsCostItem_1.RacingBetsCostItem()),
      t.push(this.ixc.CreateThenShowByActorAsync(this.GetItem(23).GetOwner())),
      (this.I01 = new RacingBetsCostItem_1.RacingBetsCostItem()),
      t.push(this.I01.CreateThenShowByActorAsync(this.GetItem(33).GetOwner())),
      (this.Mu1 = new RacingBetsButtonItem_1.RacingBetsButtonItem()),
      t.push(this.Mu1.CreateThenShowByActorAsync(this.GetItem(16).GetOwner())),
      (this.As1 = new RacingBetsButtonItem_1.RacingBetsButtonItem()),
      t.push(this.As1.CreateThenShowByActorAsync(this.GetItem(26).GetOwner())),
      (this.Ps1 = new RacingBetsButtonItem_1.RacingBetsButtonItem()),
      t.push(this.Ps1.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())),
      (this.xs1 = new RacingBetsButtonItem_1.RacingBetsButtonItem()),
      t.push(this.xs1.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())),
      (this.Ds1 = new RacingBetsButtonItem_1.RacingBetsButtonItem()),
      t.push(this.Ds1.CreateThenShowByActorAsync(this.GetItem(11).GetOwner())),
      (this.Bs1 = new RacingBetsButtonItem_1.RacingBetsButtonItem()),
      t.push(this.Bs1.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())),
      (this.Us1 = new RacingBetsButtonItem_1.RacingBetsButtonItem()),
      t.push(this.Us1.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())),
      (this.q_1 =
        new RacingBetsChampionRewardItem_1.RacingBetsChampionRewardItem()),
      t.push(this.q_1.CreateThenShowByActorAsync(this.GetItem(29).GetOwner())),
      (this.eC1 =
        new RacingBetsDangoBroadcastItem_1.RacingBetsDangoBroadcastItem()),
      t.push(this.eC1.CreateThenShowByActorAsync(this.GetItem(17).GetOwner())),
      await Promise.all(t);
  }
  ks1() {
    this.Bs1.BindRedDot("RedDotRacingBetsActivityInternalReward"),
      this.Us1.BindRedDot("RedDotRacingBetsActivityReward"),
      this.xs1.SetRedDotVisible(!1),
      this.Mu1.SetFunction(this.kvc),
      this.As1.SetFunction(this.Ovc),
      this.Ps1.SetFunction(this.Dvc),
      this.xs1.SetFunction(this.Uvc),
      this.Ds1.SetFunction(this.Bvc),
      this.Bs1.SetFunction(this.xvc),
      this.Us1.SetFunction(this.Pvc);
  }
  PushCameraHandle(t, i, e) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
      RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_START,
      i,
      e,
    );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.HS1,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRacingBetsDangoOddsUpdate,
        this.Ne1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRacingBetsMatchStateChange,
        this.Ve1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRacingBetsRedDotUpdate,
        this.Eu1,
      );
  }
  OnBeforeShow() {
    this.Hqe();
  }
  OnAfterShow() {
    var t;
    this.mo1(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRacingBetsViewAfterShow,
      ),
      RacingBetsController_1.RacingBetsController.TryOpenRacingBetsLegMatchResultView() ||
        ConfirmBoxController_1.ConfirmBoxController.CheckIsConfirmBoxOpen() ||
        ((t = this.Tvc.GetLegMatchState()),
        ModelManager_1.ModelManager.RacingBetsModel.GetIsFromActivityOpenDungeon() &&
          3 === t &&
          (RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(
            this.yvc.Id,
            this.Tvc.Id,
          ),
          LocalStorage_1.LocalStorage.SetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey
              .RacingBetsWatchGameRecord,
            this.Tvc.Id,
          )));
  }
  Hqe() {
    this.bvc.RefreshUi(this.Tvc),
      this.Lvc.RefreshUi(this.tr1),
      this.eC1.Init(this.Tvc),
      this.tBa(this.yvc),
      this.qvc(this.Tvc),
      this.Gvc(this.Tvc),
      this.Fvc(this.Tvc),
      this.ef1(this.Tvc),
      this.dc1(this.Tvc),
      this.ewa();
  }
  tBa(t) {
    this.A3o.RefreshTemp(
      t.GetCurrencyItemId(),
      t.GetCurrencyCount().toString(),
    ),
      this.A3o.SetButtonActive(!1);
  }
  qvc(t) {
    var i = this.qe1,
      e = ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(t.Id),
      i = 4 === i;
    this.GetItem(27).SetUIActive(!e && i),
      this.GetItem(28).SetUIActive(e && i),
      this.GetItem(30).SetUIActive(e && i),
      this.GetItem(12).SetUIActive(i),
      i && (e ? this.F_1(t) : this.N_1(t));
  }
  N_1(t) {
    var i = t.GetLegMatchResultList();
    this.GetText(14).ShowTextNew(t.Name), this.wvc.RefreshByData(i);
  }
  F_1(t) {
    this.q_1.Refresh(this.yvc.GetSeasonConfig().EndReward);
    (t = t.GetChampionDangoId()),
      (t = DangoManager_1.DangoManager.GetDangoData(t));
    this.GetText(31).ShowTextNew(t.NameKey);
  }
  Gvc(t) {
    var i = this.qe1;
    1 !== i && 2 !== i && 3 !== i
      ? this.GetItem(19).SetUIActive(!1)
      : (this.GetItem(19).SetUIActive(!0),
        t.HasBetting
          ? (this.GetItem(20).SetUIActive(!0),
            this.GetItem(25).SetUIActive(!1),
            this.GetText(24).SetText("×" + t.Odds / 100),
            (i = this.yvc.GetCurrencyItemId()),
            this.ixc.RefreshUi(i, t.BetGearCash),
            this.I01.RefreshUi(i, t.GetOddsRewardCount()))
          : (this.GetItem(20).SetUIActive(!1),
            this.GetItem(25).SetUIActive(!0)));
  }
  Fvc(t) {
    var i = t.GetLegMatchState(),
      e = this.GetText(3);
    let s = 0;
    3 !== i && (s = t.GetLegRemindTime()),
      0 === i || 1 === i
        ? e.ShowTextNew("Dango_MainPage_StatusTime_Bet")
        : 2 === i
          ? e.ShowTextNew("Dango_MainPage_StatusTime_Wait")
          : 3 === i
            ? e.ShowTextNew("Dango_MainPage_StatusTime_Race")
            : 4 === i &&
              (ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(t.Id)
                ? e.ShowTextNew("Dango_MainPage_StatusTime_FinalRaceEnd")
                : e.ShowTextNew("Dango_MainPage_StatusTime_RaceEnd")),
      0 < s
        ? ((i = this.GetText(4)).SetText(
            TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(s).CountDownText,
          ),
          i.SetUIActive(!0))
        : this.GetText(4).SetUIActive(!1);
  }
  ef1(t) {
    4 === this.qe1
      ? AudioSystem_1.AudioSystem.SetState(
          RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP,
          "race_finals",
        )
      : AudioSystem_1.AudioSystem.SetState(
          RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP,
          "none",
        );
  }
  dc1(t) {
    var i = this.qe1,
      e = 1 === i,
      t = 2 === t.Type;
    this.GetButton(0).SetSelfInteractive(e),
      this.GetButton(32).RootUIComp.SetUIActive(e && t),
      this.As1.SetActive(4 !== i);
  }
  ewa() {
    if (this.Tvc) {
      var i = this.Tvc.GetLegMatchState(),
        e = LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsMatchViewRecord,
        ),
        e =
          (this.Ds1.SetRedDotVisible(!(e?.HasViewed ?? !0)),
          LocalStorage_1.LocalStorage.GetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey
              .RacingBetsRankViewRecord,
          )),
        s = this.yvc.CheckRankOpen(),
        e =
          (this.Ps1.SetRedDotVisible(!(e?.HasViewed ?? !0) && s),
          LocalStorage_1.LocalStorage.GetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey
              .RacingBetsReplayGameRecord,
          ) ?? 0);
      this.Mu1.SetRedDotVisible(4 === i && this.Tvc.Id > e);
      let t = !1;
      s = this.Tvc.BetDangoId;
      1 === i
        ? (t = 0 === s)
        : 3 === i &&
          ((e =
            LocalStorage_1.LocalStorage.GetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey
                .RacingBetsWatchGameRecord,
            ) ?? 0),
          (t = this.Tvc.Id > e)),
        this.As1.SetRedDotVisible(t);
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.HS1,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRacingBetsDangoOddsUpdate,
        this.Ne1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRacingBetsMatchStateChange,
        this.Ve1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRacingBetsRedDotUpdate,
        this.Eu1,
      );
  }
  PopCameraHandle(t, i, e, s) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
      RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_START,
      i,
      e,
      s,
    );
  }
  OnBeforeHide() {
    0 !== this.yxc && this.Exc(this.Ge1, !1);
  }
  OnAfterHide() {
    this.T01 &&
      (UiModelUtil_1.UiModelUtil.SelectDangoActor(this.T01, !1),
      (this.T01 = void 0));
  }
  OnBeforeDestroy() {
    this._Nc();
  }
  async Sxc() {
    var t;
    0 === this.yxc
      ? ((t = this.Tvc.GetChampionDangoActorData()),
        this.He1(),
        (this.Fe1 = await UiSceneManager_1.UiSceneManager.LoadDangoActorList([
          t,
        ])))
      : ((t = this.Tvc.GetDangoActorDataList()),
        this.QI1 !== t &&
          (this.$e1(),
          (this.QI1 = t),
          (this.Ge1 = await UiSceneManager_1.UiSceneManager.LoadDangoActorList(
            this.QI1,
          ))));
  }
  mo1() {
    0 !== this.yxc && (this.Mxc(this.Ge1, this.Tvc), this.Exc(this.Ge1, !0));
  }
  Mxc(i, e) {
    var s = 2 === e.Type;
    for (let t = 0; t < i.length; t++) {
      var a = i[t],
        n = a.Model.CheckGetComponent(23),
        h = e.GetDangoActorData(n.DangoId),
        a = a.Model.CheckGetComponent(24),
        r = s ? t + 1 : 0,
        n = e.BetDangoId === n.DangoId;
      a.SetOffset(h.DangoOffset), a.Refresh(h.Odds / 100, r, n);
    }
  }
  Exc(t, i) {
    for (const e of t) e.Model.CheckGetComponent(24).SetVisible(i);
  }
  _Nc() {
    this.$e1(), this.He1();
  }
  $e1() {
    if (0 !== this.Ge1.length) {
      for (const t of this.Ge1)
        UiSceneManager_1.UiSceneManager.DestroyDangoActor(t);
      this.Ge1 = [];
    }
  }
  He1() {
    if (0 !== this.Fe1.length) {
      for (const t of this.Fe1)
        UiSceneManager_1.UiSceneManager.DestroyDangoActor(t);
      this.Fe1 = [];
    }
  }
  OnTick(t) {
    var i;
    this.Fvc(this.Tvc),
      this.eC1.OnTick(t),
      this.b01(),
      ModelManager_1.ModelManager.RacingBetsModel.UseGmState ||
        !(t = this.yvc.GetCurLegMatchData()) ||
        ((i = this.Tvc.GetLegMatchState()) === this.qe1 &&
          t.Id === this.Tvc.Id) ||
        this.je1(t.Id, i);
  }
  b01() {
    var t;
    Info_1.Info.IsInKeyBoard() &&
      ((t = this.Tvc.GetLegMatchState()),
      this.IsShowOrShowing && 1 === t
        ? (t =
            LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(
              0,
            )) &&
          (t = UiSceneManager_1.UiSceneManager.RayTraceDangoActor(t)) !==
            this.T01 &&
          (t
            ? (this.T01 &&
                UiModelUtil_1.UiModelUtil.SelectDangoActor(this.T01, !1),
              (this.T01 = t),
              UiModelUtil_1.UiModelUtil.SelectDangoActor(this.T01, !0))
            : (this.T01 &&
                UiModelUtil_1.UiModelUtil.SelectDangoActor(this.T01, !1),
              (this.T01 = void 0)))
        : this.T01 &&
          (UiModelUtil_1.UiModelUtil.SelectDangoActor(this.T01, !1),
          (this.T01 = void 0)));
  }
  async je1(t, i) {
    UiLayer_1.UiLayer.SetShowMaskLayer("RacingBetsMainView", !0),
      (this.Tvc = this.yvc.GetLegMatchData(t)),
      (this.tr1 = this.yvc.GetNextLegMatchData(t)),
      (this.qe1 = i),
      (this.yxc = this.Tvc.GetRacingBetsMainViewActorShowType(this.qe1)),
      await this.Sxc(),
      this.Hqe(),
      this.mo1(),
      (this.vxc = this.Tvc.GetMainViewCameraHandleName(this.yxc)),
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        this.vxc,
        !0,
        !0,
        "1001",
      ),
      UiLayer_1.UiLayer.SetShowMaskLayer("RacingBetsMainView", !1),
      this.ewa();
  }
}
exports.RacingBetsMainView = RacingBetsMainView;
//# sourceMappingURL=RacingBetsMainView.js.map
