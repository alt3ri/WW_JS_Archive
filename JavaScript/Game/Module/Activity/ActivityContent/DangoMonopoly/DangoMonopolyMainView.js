"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyMainView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiLayerType_1 = require("../../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
  UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  DangoMonopolyBuffStateItem_1 = require("./DangoMonopolyBuffStateItem"),
  DangoMonopolyDefine_1 = require("./DangoMonopolyDefine"),
  DangoMonopolyMainCaption_1 = require("./DangoMonopolyMainCaption"),
  DangoMonopolyPosition_1 = require("./DangoMonopolyPosition"),
  DangoMonopolyRoundRewardItem_1 = require("./DangoMonopolyRoundRewardItem"),
  DangoMonopolyViewBase_1 = require("./DangoMonopolyViewBase");
class DangoMonopolyMainView extends DangoMonopolyViewBase_1.DangoMonopolyViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.zJa = void 0),
      (this.R4c = void 0),
      (this.H3e = void 0),
      (this.A4c = void 0),
      (this.ShowBoardData = void 0),
      (this.IsCheckShow = !1),
      (this.WaitTimeActiveClose = 500),
      (this.RewardViewClosePromise = void 0),
      (this.ResultClosePromise = void 0),
      (this.ResultShowPromise = void 0),
      (this.RefreshTimerHandle = void 0),
      (this.IsBoardLock = !1),
      (this.DangoPosition = void 0),
      (this.IsOverView = !1),
      (this.OnTimerRefresh = () => {
        this.CheckBoardUnlockTime();
      }),
      (this.Usa = () => {
        var t;
        this.ActivityData?.IsDangoMoveProcess ||
          (((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
            4,
          )).IsEscViewTriggerCallBack = !1),
          t.FunctionMap.set(1, () => {
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.LeaveInstanceExternalCancel,
            );
          }),
          t.FunctionMap.set(2, () => {
            this.CloseMe();
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            t,
          ));
      }),
      (this.P4c = () => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(
          DangoMonopolyDefine_1.DANGO_MONOPOLY_HELP_ID,
        );
      }),
      (this.x4c = () => {
        this.ActivityData.SetActivitySpeed(), this.UpdateSpeed();
      }),
      (this.D4c = () => {
        this.ActivityData.OpenViewDangoMonopolyTransition(async () => {
          var t = new CustomPromise_1.CustomPromise();
          return (
            UiManager_1.UiManager.OpenView("DangoMonopolyResultView", {
              ShowType: 1,
              BoardId: this.ShowBoardData?.Id ?? 0,
              IsShowAllRound: !0,
              ShowPromise: t,
            }),
            t.Promise
          );
        });
      }),
      (this.U4c = () => {
        this.CheckActivityClose() || this.ActivityData.OpenViewDiceTask();
      }),
      (this.B4c = () => {
        this.CheckActivityClose() ||
          (this.ActivityData?.IsExistGridReward()
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "DangoMonopoly",
                69,
                "OnClickBtnUseDice - 格子奖励未领取",
              )
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("DangoMonopoly", 69, "RollDice=>点击掷骰子", [
                  "棋盘初始化状态",
                  this.ActivityData.IsBoardEntityInit,
                ]),
              this.ActivityData.RequestUseDice() ||
                (this.ActivityData.IsRunningBoardLock()
                  ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                      DangoMonopolyDefine_1.dangoMonopolyTextKey
                        .DangoMonopolyBoardLock,
                    )
                  : this.U4c())));
      }),
      (this.gDo = () => {
        return new DangoMonopolyBuffStateItem_1.DangoMonopolyBuffStateItem();
      }),
      (this.t8_ = () => {
        var t =
          new DangoMonopolyRoundRewardItem_1.DangoMonopolyRoundRewardItem();
        return (t.ClickCallBack = this.Buc), t;
      }),
      (this.Buc = (t) => {
        t.IsCanReceived
          ? this.ActivityData.RequestReceiveBoard(t.BoardId, !0)
          : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              t.ItemId,
            );
      }),
      (this.Qe1 = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("DangoMonopoly", 69, "MoveDango=>团子移动开始"),
          this.UpdateSpeed(),
          this.UpdateDiceUseState(),
          this.ResetAngleOfView(),
          this.SetMoveDangoUiState(!1),
          this.MoveDangoOneStepAsync(!0);
      }),
      (this.ir1 = () => {
        this.UpdateReward();
      }),
      (this.go1 = () => {
        this.RewardViewClosePromise?.SetResult();
      }),
      (this.x01 = () => {
        this.DangoPosition?.SetActive(!1);
      }),
      (this.D01 = () => {
        this.UpdateDangoPosition();
      }),
      (this.nS1 = () => {
        this.UpdateAngleOfView();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIVerticalLayout],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
      [10, UE.UIButtonComponent],
      [11, UE.UISprite],
      [12, UE.UIText],
      [13, UE.UIText],
      [14, UE.UILoopScrollViewComponent],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIText],
      [23, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [
        [1, this.x4c],
        [8, this.D4c],
        [9, this.U4c],
        [10, this.B4c],
        [23, this.nS1],
      ]);
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, [
        "DataParam",
        this.OpenParam,
      ]);
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      await super.OnBeforeStartAsync(),
      (this.zJa = new DangoMonopolyMainCaption_1.DangoMonopolyMainCaption()),
      await this.zJa.Init(this.GetItem(0)),
      (this.zJa.OnCloseCallback = this.Usa),
      this.zJa.SetBtnHelpVisible(!0),
      (this.zJa.OnHelpCallback = this.P4c),
      (this.R4c = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(5),
        this.gDo,
        this.GetItem(6).GetOwner(),
      ));
    var t = this.GetLoopScrollViewComponent(14),
      i = this.GetItem(15).GetOwner(),
      t =
        ((this.H3e = new LoopScrollView_1.LoopScrollView(t, i, this.t8_, !0)),
        this.GetItem(16));
    (this.A4c =
      new DangoMonopolyRoundRewardItem_1.DangoMonopolyRoundRewardItem()),
      await this.A4c.CreateThenShowByActorAsync(t.GetOwner()),
      (this.A4c.ClickCallBack = this.Buc),
      (this.DangoPosition =
        new DangoMonopolyPosition_1.DangoMonopolyPosition()),
      await this.DangoPosition.Init(this.RootItem);
  }
  OnStart() {
    this.ActivityData
      ? (this.GetItem(7)?.SetUIActive(!1),
        this.UpdateAngleOfViewBtnState(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.DangoMonopolyViewStart,
        ),
        this.CheckShowProcess())
      : this.k4c();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.DangoMonopolyMoveStart,
      this.Qe1,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DangoMonopolyBoardRewardUpdate,
        this.ir1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCloseRewardView,
        this.go1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DangoMonopolyStartShowProcess,
        this.x01,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DangoMonopolyEndShowProcess,
        this.D01,
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "DangoMonopolyTask",
        this.GetItem(19),
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "DangoMonopolyDiceNum",
        this.GetItem(20),
        this.UpdateDiceUseState.bind(this),
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DangoMonopolyMoveStart,
      this.Qe1,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DangoMonopolyBoardRewardUpdate,
        this.ir1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCloseRewardView,
        this.go1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DangoMonopolyStartShowProcess,
        this.x01,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DangoMonopolyEndShowProcess,
        this.D01,
      ),
      RedDotController_1.RedDotController.UnBindRedDot("DangoMonopolyTask"),
      RedDotController_1.RedDotController.UnBindRedDot("DangoMonopolyDiceNum");
  }
  OnBeforeShow() {
    this.UpdateActivityData()
      ? (this.zJa.SetCurrencyItemList([this.ActivityData.DiceItemId]),
        this.UpdateShowBoardData(this.ActivityData.CurrentBoardData),
        this.UpdateData(),
        (this.RefreshTimerHandle = TimerSystem_1.RealTimeTimerSystem.Forever(
          this.OnTimerRefresh,
          500,
        )))
      : this.k4c();
  }
  CheckBoardUnlockTime() {
    this.ActivityData.IsRunningBoardLock() !== this.IsBoardLock &&
      this.UpdateData(),
      this.UpdateBoardRemainTime();
  }
  CheckActivityClose() {
    return (
      !!this.ActivityData.CheckIfClose() &&
      (ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView(),
      !0)
    );
  }
  ClearTimer() {
    TimerSystem_1.RealTimeTimerSystem.Has(this.RefreshTimerHandle) &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.RefreshTimerHandle),
      (this.RefreshTimerHandle = void 0));
  }
  OnBeforeHide() {
    this.ClearTimer(), this.SetBattleFloatVisible(!1);
  }
  OnAfterShow() {
    this.SetBattleFloatVisible(!0);
  }
  async SetBattleFloatVisible(t) {
    ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetIsOpenHintShow() &&
      (await this.ActivityData?.BoardInitPromise?.Promise,
      t
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActiveBattleView,
          )
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DisActiveBattleView,
          ),
      UiLayer_1.UiLayer.GetFloatUnit(
        UiLayerType_1.ELayerType.BattleFloat,
        0,
      ).SetUIActive(t));
  }
  async CheckShowProcess() {
    UiLayer_1.UiLayer.SetShowMaskLayer("DangoMonopolyMainView", !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyViewShowProcessStartOrEnd,
        !0,
      ),
      await this.ActivityData.BoardInitPromise?.Promise,
      UiLayer_1.UiLayer.SetShowMaskLayer("DangoMonopolyMainView", !1),
      await ControllerHolder_1.ControllerHolder.GuideController.WaitForCurrentTutorialFinish(),
      await this.CheckShowInfo(),
      await this.CheckUpdateDangoPosition(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyViewShowProcessStartOrEnd,
        !1,
      );
  }
  async CheckUpdateDangoPosition() {
    await TimerSystem_1.RealTimeTimerSystem.Wait(2 * TimerSystem_1.MIN_TIME),
      await this.UpdateDangoPosition();
  }
  async CheckShowInfo() {
    this.IsCheckShow ||
      ((this.IsCheckShow = !0),
      await this.CheckWelcome(),
      await this.CheckEnterNextRound());
  }
  async CheckWelcome(t = !1) {
    await this.ActivityData.BoardInitPromise?.Promise,
      await this.ActivityData?.CheckShowRoundWelcomeProcess(),
      this.DangoPosition?.SetActive(t),
      this.ActivityData?.IsExistGridReward() &&
        (await this.ActivityData.RequestReceiveGrid(),
        await this.AwaitRewardShowClose());
  }
  k4c() {
    this.GetButton(1)?.RootUIComp.SetUIActive(!1),
      this.GetButton(8)?.RootUIComp.SetUIActive(!1),
      this.GetButton(23)?.RootUIComp.SetUIActive(!1),
      this.GetItem(17)?.SetUIActive(!1),
      this.GetItem(18)?.SetUIActive(!1);
  }
  UpdateShowBoardData(t) {
    this.ShowBoardData = t ?? this.ActivityData.BoardList[0];
  }
  OnBeforeDestroy() {
    this.ClearTimer(),
      this.A4c?.Destroy(),
      this.DangoPosition?.Destroy(),
      this.ActivityData?.GameplayExit(),
      UiLayer_1.UiLayer.SetShowMaskLayer("DangoMonopolyMainView", !1),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.LeaveInstanceExternalConfirm,
      );
  }
  UpdateBtnRoundRecord() {
    var t = 0 < this.ActivityData.GetFinishedRoundNum();
    this.GetButton(8)?.RootUIComp.SetUIActive(t);
  }
  UpdateData() {
    var t = this.ActivityData,
      i = this.ShowBoardData?.GetPosition() ?? 1,
      e = t.GetTotalRoundNum(),
      t = t.GetFinishedRoundNum(),
      e = "/" + e,
      i = "" + i,
      i =
        (this.GetText(3)?.SetText(i),
        this.GetText(12)?.SetText(t.toString()),
        this.GetText(4)?.SetText(e),
        this.GetText(13)?.SetText(e),
        this.GetBuffItemData());
    this.R4c?.RefreshByData(i, void 0, !0),
      this.UpdateReward(),
      this.UpdateProgress(),
      this.UpdateSpeed(),
      this.UpdateBtnRoundRecord(),
      this.UpdateDiceUseState(),
      this.UpdateBoardLockTips();
  }
  GetBuffItemData() {
    return this.ShowBoardData?.GetDangoBuffShowList() ?? [];
  }
  UpdateBoardLockTips() {
    this.IsBoardLock = !!this.ActivityData.IsRunningBoardLock();
    var t = this.GetItem(21),
      i = this.ActivityData.IsFinishAllRound();
    t?.SetUIActive(i),
      this.GetButton(9)?.RootUIComp.SetUIActive(!i),
      i
        ? this.GetText(22)?.ShowTextNew(
            DangoMonopolyDefine_1.dangoMonopolyTextKey
              .DangoMonopolyAllRoundFinish,
          )
        : (t?.SetUIActive(this.IsBoardLock), this.UpdateBoardRemainTime());
  }
  UpdateBoardRemainTime() {
    this.IsBoardLock &&
      this.GetText(22)?.SetText(this.ActivityData.GetBoardRemainTimeStr());
  }
  UpdateDiceUseState() {
    var t = this.GetSprite(11),
      i = !this.ActivityData.IsCanUseDice(),
      t = (t.SetUIActive(i), !this.ShowBoardData?.IsFinish());
    this.GetButton(10)?.RootUIComp.SetUIActive(t);
  }
  UpdateReward() {
    const t = this.ActivityData.BoardList.map((t) => {
      return {
        IsReceived: t.IsRewarded,
        IsCanReceived: t.IsCanReceiveReward(),
        ItemId: t.RewardItemId,
        Count: t.RewardItemCount,
        BoardId: t.Id,
        IsCurrent: t.IsRunning(),
        Position: t.GetPosition(),
      };
    });
    var i = t[t.length - 1];
    t.pop(),
      this.H3e?.RefreshByData(t, !0, () => {
        this.UpdateRewardPos(t);
      }),
      this.A4c?.Refresh(i);
  }
  UpdateRewardPos(t) {
    t = this.GetRewardPos(t);
    this.H3e?.ScrollToGridIndex(t);
  }
  GetRewardPos(t) {
    var i = t.findIndex((t) => t.IsCanReceived);
    return 0 <= i || (i = t.findIndex((t) => t.IsCurrent)), Math.max(0, i - 1);
  }
  UpdateProgress() {}
  UpdateSpeed() {
    var t = this.ActivityData.GetSpeedStr();
    this.GetText(2)?.SetText(t);
  }
  SetMoveDangoUiState(t) {
    this.GetItem(18)?.SetUIActive(t),
      this.GetButton(8)?.RootUIComp.SetUIActive(t),
      this.GetExtendToggle(23)?.RootUIComp.SetUIActive(t),
      this.zJa?.SetBtnCloseVisible(t),
      this.zJa?.SetBtnHelpVisible(t),
      this.zJa?.SetCurrencyVisible(t);
  }
  async MoveDangoOneStepAsync(t = !1) {
    if (this.ActivityData.CurrentBoardData?.IsMoveToTarget())
      await this.ActivityData.MoveDangoEnd(),
        await this.DangoMonopolyMoveEnd(),
        await this.UpdateDangoPosition();
    else {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("DangoMonopoly", 69, "MoveDango=>团子移动一步"),
        this.DangoPosition?.SetActive(!1);
      const e = this.ActivityData.GetMoveDangoId();
      var i = this.ActivityData.RunningGridData?.Id ?? 0,
        i = this.ActivityData.BoardGridUiInfoMap.get(i);
      t && (await i?.OutBeforeGridUpdate()),
        this.ActivityData.CurrentBoardData?.MoveDangoOneStep();
      const o = this.ActivityData.RunningGridData?.Id ?? 0,
        s = this.ActivityData.BoardGridUiInfoMap.get(o);
      await Promise.all([
        (async () => {
          await ControllerHolder_1.ControllerHolder.ChessController.MoveItemToPointAsync(
            e,
            o,
          ),
            this.ActivityData.CurrentBoardData?.IsMoveToTarget() &&
              (await s?.EnterEndGirdUpdate());
        })(),
        s?.EnterStartGridUpdate(),
        i?.OutStartGridUpdate(),
      ]),
        await this.CheckTriggerBuffAsync(),
        await this.ShowPromise?.Promise,
        await this.MoveDangoOneStepAsync();
    }
  }
  async CheckTriggerBuffAsync() {
    var t,
      i = this.ActivityData.RunningGridData;
    i &&
      (i.IsExistDango() &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("DangoMonopoly", 69, "MoveDango=>团子移动触发特性"),
        (t = new CustomPromise_1.CustomPromise()),
        UiManager_1.UiManager.OpenView("DangoMonopolyBuffActiveView", {
          BoardId: this.ShowBoardData?.Id ?? 0,
          GridData: i,
          Promise: t,
        }),
        await t.Promise,
        await TimerSystem_1.TimerSystem.Wait(this.WaitTimeActiveClose)),
      i.MoveFinishBuffId &&
        this.ActivityData.OpenViewDangoTips(i.MoveFinishBuffId),
      await this.CheckGridIsActiveDouble(i));
  }
  CheckBuffIsWhenMoveFire(t) {
    this.ActivityData.BuffIsWhenMoveFire(t) &&
      (this.ActivityData.OpenViewDangoTips(t),
      this.ShowBoardData?.AddRecordTriggerBuff(t));
  }
  async CheckGridIsActiveDouble(t) {
    if (t?.PropertyIsDouble()) {
      this.CheckBuffIsWhenMoveFire(t.AddPropertyId);
      const i = [];
      t.BelongBoard.GridList.slice(t.Index).forEach((t) => {
        t = this.ActivityData.BoardGridUiInfoMap.get(t.Id);
        t && i.push(t.PlayActiveSequence());
      }),
        await Promise.all(i);
    }
  }
  async DangoMonopolyMoveEnd() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, "MoveDango=>团子移动结束"),
      this.SetMoveDangoUiState(!0),
      this.ActivityData.ResetSpeed(),
      this.UpdateData(),
      await this.AwaitRewardShowClose(),
      this.ActivityData.CurrentBoardData?.IsFinish() &&
        (await this.ResultClosePromise?.Promise,
        await this.ResultShowPromise?.Promise,
        (this.ResultClosePromise = new CustomPromise_1.CustomPromise()),
        (this.ResultShowPromise = new CustomPromise_1.CustomPromise()),
        this.ActivityData.OpenViewDangoMonopolyTransition(
          async () => (
            UiManager_1.UiManager.OpenView("DangoMonopolyResultView", {
              ShowType: 0,
              BoardId: this.ShowBoardData?.Id ?? 0,
              IsShowAllRound: !1,
              ClosePromise: this.ResultClosePromise,
              ShowPromise: this.ResultShowPromise,
            }),
            this.ResultShowPromise?.Promise
          ),
        ),
        await this.ResultShowPromise.Promise,
        await this.CheckEnterNextRound());
  }
  async CheckEnterNextRound() {
    (await this.ActivityData.CheckEnterNextRound()) &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("DangoMonopoly", 69, "Board=>进入下一轮"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyViewShowProcessStartOrEnd,
        !0,
      ),
      this.UpdateShowBoardData(this.ActivityData.CurrentBoardData),
      this.UpdateData(),
      await this.ResultClosePromise?.Promise,
      await this.CheckWelcome(!0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyViewShowProcessStartOrEnd,
        !1,
      ));
  }
  async AwaitRewardShowClose() {
    UiManager_1.UiManager.GetViewByName("CommonRewardView") &&
      ((this.RewardViewClosePromise = new CustomPromise_1.CustomPromise()),
      await this.RewardViewClosePromise.Promise,
      (this.RewardViewClosePromise = void 0));
  }
  async UpdateDangoPosition(t = !0) {
    await this.ActivityData.BoardInitPromise?.Promise;
    var i = this.GetDangoCursorPosition();
    this.DangoPosition?.UpdatePosition(i, t);
  }
  GetDangoCursorPosition() {
    var t,
      i = this.ActivityData.GetRunningGridId(),
      i = this.ActivityData.BoardGridUiInfoMap.get(i);
    return i
      ? i.GetCursorPosition()
      : ((i = this.ActivityData.MainRoleDangoEntityId),
        (i = ModelManager_1.ModelManager.CreatureModel.GetEntity(i))?.Valid &&
        i.IsInit &&
        i.Entity
          ? ((t =
              2 *
              ((i = i.Entity.GetComponent(1))?.SkeletalMesh?.Bounds?.BoxExtent
                .Z ?? 0)),
            UiModelUtil_1.UiModelUtil.GetActorLguiPos(
              i.Owner,
              Vector_1.Vector.Create(0, 0, t),
            ))
          : new UE.Vector2D());
  }
  async UpdateAngleOfView() {
    await this.ActivityData.MoveCameraPromise?.Promise,
      (this.IsOverView = !this.IsOverView),
      this.DangoPosition?.SetActive(!1),
      this.IsOverView
        ? await this.ActivityData.MoveCameraToOverview()
        : (await this.ActivityData.MoveCameraToMainDango(),
          await this.UpdateDangoPosition());
  }
  UpdateAngleOfViewBtnState() {
    var t = this.IsOverView ? 1 : 0;
    this.GetExtendToggle(23)?.SetToggleStateForce(t);
  }
  ResetAngleOfView() {
    this.IsOverView &&
      ((this.IsOverView = !1), this.UpdateAngleOfViewBtnState());
  }
}
exports.DangoMonopolyMainView = DangoMonopolyMainView;
//# sourceMappingURL=DangoMonopolyMainView.js.map
