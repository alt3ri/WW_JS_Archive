"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyResultView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Macro_1 = require("../../../../../Core/Preprocessor/Macro"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager"),
  RewardSmallItemGrid_1 = require("../../../ItemReward/View/RewardSmallItemGrid"),
  LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise"),
  UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  DangoMonopolyDefine_1 = require("./DangoMonopolyDefine"),
  DangoMonopolyResultRoundItem_1 = require("./DangoMonopolyResultRoundItem"),
  DangoMonopolyViewBase_1 = require("./DangoMonopolyViewBase");
class DangoMonopolyResultView extends DangoMonopolyViewBase_1.DangoMonopolyViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.RoundScrollView = void 0),
      (this.RewardScrollView = void 0),
      (this.ShowBoardData = void 0),
      (this.LastBoardData = void 0),
      (this.ShowDangoActorList = []),
      (this.LastDangoActorList = []),
      (this.DangoActorListMap = new Map()),
      (this.DangoActorPromise = void 0),
      (this.ShowDangoIdList = void 0),
      (this.MoveDangoPromise = void 0),
      (this.MoveInTime =
        ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetDangoMoveInTime()),
      (this.MoveOutTime =
        ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetDangoMoveOutTime()),
      (this.MoveOutDelayTime =
        ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetDangoMoveOutDelayTime()),
      (this.MoveChangeCheckTime =
        ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetDangoChangeCheckTime()),
      (this.MoveInCurve = void 0),
      (this.MoveOutCurve = void 0),
      (this.TempVec = new UE.VectorDouble(0)),
      (this.ShowVec = new UE.VectorDouble(0)),
      (this.ShowCase = "DangoMonopolyCase"),
      (this.IsMovingIn = !1),
      (this.IsMovingOut = !1),
      (this.IsMoveChangeCheck = !1),
      (this.MoveInDelta = 0),
      (this.MoveOutDelta = 0),
      (this.MoveOutDelayDelta = 0),
      (this.MoveChangeCheckDelta = 0),
      (this.MoveInPromise = void 0),
      (this.MoveOutPromise = void 0),
      (this.ShowLog = !1),
      (this.LastChangeId = 0),
      (this.ShowChangeId = 0),
      (this.IsMovingChange = !1),
      (this.XI1 = () => {
        this.ActivityData.UpdateBoardGridUiInfoShow(!1);
      }),
      (this.I5t = () => {
        this.ActivityData.IsShowRoundWelcome(!1)
          ? this.CloseMe()
          : this.ActivityData.OpenViewDangoMonopolyTransition(
              async () => (
                this.CloseMe(), this.OpenParam?.ClosePromise?.Promise
              ),
            );
      }),
      (this.hnl = () => {
        var t =
          new DangoMonopolyResultRoundItem_1.DangoMonopolyResultRoundItem();
        return (t.ClickCallBack = this.O4c), t;
      }),
      (this.O4c = (t) => {
        (this.LastBoardData = this.ShowBoardData), (this.ShowBoardData = t);
        var i,
          s,
          e = this.ShowBoardData.IsFinish(),
          h = e ? this.ShowBoardData.GetAllGridRewardItemList() : [];
        this.RewardScrollView?.RefreshByData(h),
          this.GetItem(10)?.SetUIActive(!e),
          this.GetItem(3)?.SetUIActive(e),
          e
            ? ((h = this.GetText(4)),
              (e = this.ShowBoardData.FinishTitle),
              LguiUtil_1.LguiUtil.SetLocalTextNew(h, e, t.GetPosition()),
              (h = this.GetText(5)),
              (e = this.ShowBoardData.FinishDesc),
              (t = this.ShowBoardData.GetDangoBuffShowList()
                .map((t) => t.DangoName)
                .map((t) =>
                  ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
                    t,
                    t,
                  ),
                )),
              (i = this.ShowBoardData.RecordRollDiceTimes.toString()),
              (s =
                this.ShowBoardData.GetRecordTriggerBuffTotalTimes().toString()),
              LguiUtil_1.LguiUtil.SetLocalTextNew(h, e, ...t, i, s))
            : this.GetText(11)?.ShowTextNew(this.Ye1()),
          this.LastBoardData === this.ShowBoardData
            ? this.LoadDangoActorList()
            : ((this.IsMoveChangeCheck = !0), (this.MoveChangeCheckDelta = 0)),
          this.IsShow && this.PlaySequence("Switch");
      }),
      (this.rOe = () => {
        var t = new RewardSmallItemGrid_1.RewardSmallItemGrid();
        return (
          t.BindOnCanExecuteChange(() => !1),
          t.BindOnExtendToggleClicked(this.wYt),
          t
        );
      }),
      (this.wYt = (t) => {
        t = t.Data?.ConfigId ?? 0;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          t,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIGridLayout],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.I5t]]);
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, [
        "DataParam",
        this.OpenParam,
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.DangoMonopolyEnterNextRound,
      this.XI1,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DangoMonopolyEnterNextRound,
      this.XI1,
    );
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      await super.OnBeforeStartAsync(),
      (this.RoundScrollView = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(2).GetOwner(),
        this.hnl,
        !0,
      )),
      (this.RewardScrollView = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(6),
        this.rOe,
        this.GetItem(7).GetOwner(),
      ));
  }
  OnStart() {
    this.UpdateMoveParam(),
      this.ActivityData.UpdateBoardGridUiInfoShow(!1),
      this.InitCurve(),
      this.UpdateData();
  }
  OnBeforeShow() {
    this.OpenParam?.ShowPromise?.IsPending() &&
      this.OpenParam.ShowPromise.SetResult();
  }
  OnAfterShow() {}
  OnBeforeDestroy() {
    this.ActivityData.UpdateBoardGridUiInfoShow(!0),
      this.DestroyDangoActor(),
      this.OpenParam?.ClosePromise?.SetResult();
  }
  Ye1() {
    return this.ShowBoardData?.IsRunning()
      ? this.ShowBoardData?.IsLock()
        ? DangoMonopolyDefine_1.dangoMonopolyTextKey.DangoMonopolyBoardLock
        : DangoMonopolyDefine_1.dangoMonopolyTextKey.ResultTipsBoardRunning
      : DangoMonopolyDefine_1.dangoMonopolyTextKey.ResultTipsBoardUnOpen;
  }
  UpdateData() {
    var t = this.OpenParam?.BoardId ?? 1,
      t = this.ActivityData.BoardMap.get(t),
      t =
        ((this.ShowBoardData = t),
        this.RoundScrollView?.RefreshByData(
          this.ActivityData.BoardList ?? [],
          void 0,
          () => {
            this.RoundScrollView?.DeselectCurrentGridProxy();
            var t = this.ShowBoardData?.Index ?? 0;
            this.RoundScrollView?.ScrollToGridIndex(t),
              this.RoundScrollView?.SelectGridProxy(t);
          },
        ),
        1 === this.OpenParam?.ShowType);
    this.GetLoopScrollViewComponent(1)?.RootUIComp.SetUIActive(t);
  }
  async LoadDangoActorList() {
    this.MoveDangoPromise?.IsPending()
      ? ((this.IsMovingChange = !0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "DangoMonopoly",
            69,
            "移动过程中变更,先记录,等结束后触发",
          ))
      : (await this.MoveDangoActorList(),
        this.MoveDangoPromise?.SetResult(),
        this.LogMovingProcessState("MoveProcessEnd"));
  }
  async MoveDangoActorList() {
    return (
      (this.LastChangeId = this.ShowChangeId),
      (this.ShowChangeId = this.ShowBoardData?.Id ?? 0),
      (this.MoveDangoPromise = new CustomPromise_1.CustomPromise()),
      this.UpdateShowDangoIdList(),
      await this.GetShowDangoActorList(),
      await Promise.all([
        this.MoveOutLastDangoList(),
        this.MoveInShowDangoList(),
      ]),
      this.IsMovingChange &&
        ((this.IsMovingChange = !1),
        this.LogMovingProcessState("移动结束,触发移动过程中的变更"),
        await this.MoveDangoActorList()),
      !0
    );
  }
  async GetShowDangoActorList() {
    await this.DangoActorPromise,
      (this.LastDangoActorList = this.ShowDangoActorList);
    var t,
      i = this.ShowChangeId;
    return (
      this.DangoActorListMap.has(i)
        ? (this.ShowDangoActorList = this.DangoActorListMap.get(i))
        : ((t = this.ShowDangoIdList.map((t) => {
            return {
              UiModelUseWay: 13,
              DangoId: t,
              Odds: 0,
              DangoPointCase: this.ShowCase,
              DangoCamera: StringUtils_1.EMPTY_STRING,
              DangoOffset: 0,
            };
          })),
          (this.DangoActorPromise =
            UiSceneManager_1.UiSceneManager.LoadDangoActorList(t, (t) => {
              t.SetActorHiddenInGame(!0);
            })),
          (this.ShowDangoActorList = await this.DangoActorPromise),
          this.DangoActorListMap.set(i, this.ShowDangoActorList),
          this.UpdateDangoAttach()),
      this.ShowDangoActorList
    );
  }
  UpdateShowDangoIdList() {
    var t = this.ActivityData.GetDangoId(),
      i =
        this.ShowBoardData?.GetDangoBuffShowList()
          .map((t) => t.DangoId)
          .reverse() ?? [];
    i.push(t), (this.ShowDangoIdList = i);
  }
  UpdateDangoFadeIn(t) {
    for (const i of t ?? this.ShowDangoActorList)
      UiModelUtil_1.UiModelUtil.DangoFadeOut(i);
  }
  UpdateDangoFadeOut(t) {
    for (const i of t ?? this.LastDangoActorList)
      UiModelUtil_1.UiModelUtil.DangoFadeIn(i);
  }
  async MoveOutLastDangoList() {
    this.LastChangeId &&
      this.LastChangeId !== this.ShowChangeId &&
      (this.ReturnStand(this.LastDangoActorList, "MoveOutStart"),
      await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME),
      this.MoveOutStart(),
      await this.MoveOutPromise?.Promise);
  }
  async MoveInShowDangoList() {
    this.ShowChangeId !== this.LastChangeId &&
      (await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME),
      this.MoveInStart(),
      await this.MoveInPromise?.Promise);
  }
  UpdateDangoAttach() {
    this.TempVec.Set(0, 0, 0);
    for (let t = 1; t < this.ShowDangoActorList.length; t++) {
      var i,
        s = this.ShowDangoActorList[t],
        e =
          this.ShowDangoActorList[t - 1].Model?.CheckGetComponent(
            1,
          )?.MainMeshComponent;
      e &&
        ((this.TempVec.Z = DangoManager_1.DangoManager.GetDangoData(
          this.ShowDangoIdList[t - 1],
        ).ModelHeight),
        (i = new UE.FName("Root")),
        s.K2_AttachToComponent(e, i, 2, 2, 2, !1),
        s.D_K2_AddActorLocalOffset(this.TempVec, !0, void 0, !1),
        s.SetActorHiddenInGame(!1));
    }
    var t = this.ShowDangoActorList[0];
    t &&
      (this.TempVec.Set(1e3, 1e3, 1e3),
      t.D_K2_AddActorLocalOffset(this.TempVec, !0, void 0, !1),
      t.SetActorHiddenInGame(!1));
  }
  async DestroyDangoActor() {
    await this.DangoActorPromise,
      this.DangoActorListMap.forEach((t) => {
        for (const i of t) UiSceneManager_1.UiSceneManager.DestroyDangoActor(i);
      }),
      (this.ShowDangoActorList = []),
      (this.LastDangoActorList = []),
      this.DangoActorListMap.clear();
  }
  UpdateMoveParam() {
    var t = UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName(this.ShowCase),
      1,
    );
    t &&
      ((t = t.D_GetTransform().GetLocation()), this.ShowVec.Set(t.X, t.Y, t.Z));
  }
  async InitCurve() {
    (this.MoveInCurve = await this.LoadCurveFloat("MonopolyDangoInCurve")),
      (this.MoveOutCurve = await this.LoadCurveFloat("MonopolyDangoOutCurve"));
  }
  async LoadCurveFloat(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    return new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat).Promise;
  }
  GetTotalDistance(t) {
    var i;
    return t
      ? ((i = t.FloatCurve.Keys.Num()), t.FloatCurve.Keys.Get(i - 1)?.Time ?? 0)
      : 0;
  }
  GetTotalHeight(t) {
    return t ? (t.FloatCurve.Keys.Get(1)?.Value ?? 0) : 0;
  }
  LE1(t, i, s, e) {
    (t = MathUtils_1.MathUtils.Clamp(Number(t), 0, 1)),
      (t = i ? 1 - t : t),
      (t = this.GetTotalDistance(s) * t),
      (s = s.GetFloatValue(t)),
      (e = e[0]);
    this.TempVec.Set(
      this.ShowVec.X,
      (i ? t : -t) + this.ShowVec.Y,
      s + this.ShowVec.Z,
    ),
      e?.D_K2_SetActorLocation(this.TempVec, !0, void 0, !1),
      this.ShowLog;
  }
  SetDangoMoveInProgress(t) {
    this.LE1(t, !0, this.MoveInCurve, this.ShowDangoActorList);
  }
  SetDangoMoveOutProgress(t) {
    this.LE1(t, !1, this.MoveOutCurve, this.LastDangoActorList);
  }
  OnBeforeShowImplementImplement() {
    UiManager_1.UiManager.AddTickView(this);
  }
  OnAfterHideImplementImplement() {
    UiManager_1.UiManager.RemoveTickView(this),
      this.MoveInEnd(),
      this.MoveOutEnd();
  }
  Tick(t) {
    this.UpdateMoveInTick(t),
      this.UpdateMoveOutTick(t),
      this.UpdateMoveChangeCheckTick(t);
  }
  AfterTick() {}
  MoveInStart() {
    return (
      !this.IsMovingIn &&
      ((this.IsMovingIn = !0),
      (this.MoveInDelta = 0),
      (this.MoveInPromise = new CustomPromise_1.CustomPromise()),
      this.SetActorListHidden(!1, this.ShowDangoActorList),
      this.PlayJumpAni(this.ShowDangoActorList, this.MoveInCurve),
      !0)
    );
  }
  MoveOutStart() {
    return (
      !this.IsMovingOut &&
      ((this.IsMovingOut = !0),
      (this.MoveOutDelta = 0),
      (this.MoveOutDelayDelta = 0),
      (this.MoveOutPromise = new CustomPromise_1.CustomPromise()),
      this.SetDangoMoveOutProgress(0),
      this.SetActorListHidden(!1, this.LastDangoActorList),
      this.PlayJumpAni(this.LastDangoActorList, this.MoveOutCurve),
      !0)
    );
  }
  MoveInEnd() {
    return !!this.IsMovingIn && (this.ResetMoveInRecord(), !0);
  }
  MoveOutEnd() {
    return (
      !!this.IsMovingOut &&
      (this.ReturnStand(this.LastDangoActorList, "MoveOutEnd"),
      this.SetActorListHidden(!0, this.LastDangoActorList),
      this.ResetMoveOutRecord(),
      !0)
    );
  }
  UpdateMoveInTick(t) {
    return (
      !!this.IsMovingIn &&
      (this.MoveInDelta >= this.MoveInTime
        ? this.MoveInEnd()
        : ((this.MoveInDelta += t),
          (t = this.MoveInDelta / this.MoveInTime),
          this.SetDangoMoveInProgress(t)),
      !0)
    );
  }
  UpdateMoveOutTick(t) {
    return (
      !!this.IsMovingOut &&
      (this.UpdateMoveOutDelayTick(t) ||
        (this.MoveOutDelta >= this.MoveOutTime
          ? this.MoveOutEnd()
          : ((this.MoveOutDelta += t),
            (t = this.MoveOutDelta / this.MoveOutTime),
            this.SetDangoMoveOutProgress(t))),
      !0)
    );
  }
  UpdateMoveOutDelayTick(t) {
    return (
      !!this.IsMovingOut &&
      !(
        this.MoveOutDelayDelta >= this.MoveOutDelayTime ||
        ((this.MoveOutDelayDelta += t), 0)
      )
    );
  }
  ResetMoveInRecord() {
    (this.IsMovingIn = !1),
      (this.MoveInDelta = 0),
      this.MoveInPromise?.SetResult();
  }
  ResetMoveOutRecord() {
    (this.IsMovingOut = !1),
      (this.MoveOutDelta = 0),
      (this.MoveOutDelayDelta = 0),
      this.MoveOutPromise?.SetResult();
  }
  SetActorListHidden(i, t) {
    t.forEach((t) => {
      t.SetActorHiddenInGame(i);
    });
  }
  UpdateMoveChangeCheckTick(t) {
    return (
      !!this.IsMoveChangeCheck &&
      (this.MoveChangeCheckDelta >= this.MoveChangeCheckTime
        ? ((this.IsMoveChangeCheck = !1),
          (this.MoveChangeCheckDelta = 0),
          this.LoadDangoActorList())
        : (this.MoveChangeCheckDelta += t),
      !0)
    );
  }
  PlayJumpAni(t, i) {
    var s = this.GetTotalDistance(i),
      i = this.GetTotalHeight(i);
    this.PlayJumpAniParam(t, s, i);
  }
  PlayJumpAniParam(t, i = 0, s = 0) {
    t.forEach((t) => {
      t.SetState(2, i, s);
    });
  }
  ReturnStand(t, i = 0) {
    t.forEach((t) => {
      t.GetStateMachine()?.GetDangoBp()?.ReturnStand();
    });
  }
  LogInfo() {
    this.LogMovingProcessState("Sum");
  }
  LogMovingProcessState(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "DangoMonopoly",
        69,
        t,
        ["IsMovingChange", this.IsMovingChange],
        ["MoveDangoPromise-IsPending", !!this.MoveDangoPromise?.IsPending()],
      );
  }
}
exports.DangoMonopolyResultView = DangoMonopolyResultView;
//# sourceMappingURL=DangoMonopolyResultView.js.map
