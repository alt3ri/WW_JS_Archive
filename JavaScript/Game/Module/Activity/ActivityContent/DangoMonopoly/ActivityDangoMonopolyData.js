"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityDangoMonopolyData = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Macro_1 = require("../../../../../Core/Preprocessor/Macro"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager"),
  ItemRewardController_1 = require("../../../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../../../ItemReward/RewardData/RewardItemData"),
  NormalLoadingViewGlobalData_1 = require("../../../Loading/Data/NormalLoadingViewGlobalData"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityManager_1 = require("../../ActivityManager"),
  DangoMonopolyBoardData_1 = require("./DangoMonopolyBoardData"),
  DangoMonopolyDefine_1 = require("./DangoMonopolyDefine"),
  DangoMonopolyGridInfoPanel_1 = require("./DangoMonopolyGridInfoPanel"),
  DangoMonopolyTaskData_1 = require("./DangoMonopolyTaskData"),
  RollDice_1 = require("./RollDice");
class ActivityDangoMonopolyData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.DiceItemId =
        ConfigManager_1.ConfigManager.CommonConfig.GetDiceItemId()),
      (this.DangoMonopolyRangeSpeed =
        ConfigManager_1.ConfigManager.CommonConfig.GetDangoMonopolyRangeSpeed()),
      (this.BoardList = []),
      (this.BoardMap = new Map()),
      (this.CurrentBoardData = void 0),
      (this.CurrentGridData = void 0),
      (this.RunningGridData = void 0),
      (this.TargetGridData = void 0),
      (this.RewardedGridId = 0),
      (this.TaskTypeMap = new Map()),
      (this.TaskIdMap = new Map()),
      (this.TaskLookedSet = new Set()),
      (this.Dango = void 0),
      (this.DangoMonopolyInstanceId = 0),
      (this.GridToEntityIdMap = new Map()),
      (this.Speed = 1),
      (this.LastEnterBoardId = 0),
      (this.MainRoleDangoEntityId = 0),
      (this.IsBoardEntityInit = !1),
      (this.BoardInitPromise = void 0),
      (this.IsCanApplySpeed = !1),
      (this.BoardGridUiInfoMap = new Map()),
      (this.BoardGridUiInfoPromise = void 0),
      (this.ChessPointParamsMap = new Map()),
      (this.Gs1 = 90),
      (this.DangoTipsList = []),
      (this.DangoTipsPromise = void 0),
      (this.DangoWelcomePromise = void 0),
      (this.MoveCameraPromise = void 0),
      (this.IsDangoMoveProcess = !1),
      (this.KismetSettingOutline = void 0),
      (this.Fs1 = void 0);
  }
  get RollDice() {
    return (
      this.Fs1 ||
        (this.Fs1 = RollDice_1.RollDice.Create({
          DicePoints: [],
          AniNum: 0,
          CameraMode: 1,
          BpDiceCase: "DiceBp",
        })),
      this.Fs1
    );
  }
  GetExDataRedPointShowState() {
    return (
      !!this.IsRedDotDiceTask() ||
      !!this.IsRoundReward() ||
      !!this.IsCanUseDice()
    );
  }
  OnInit(e) {
    this.v4c(), this.y4c(), this.S4c(), this.InitLocalData();
  }
  v4c() {
    var e = this.GetDangoMonopolyInfo();
    e && (this.DangoMonopolyInstanceId = e.InstId);
  }
  y4c() {
    this.GetDangoMonopolyBoardList().forEach((e, t) => {
      t = DangoMonopolyBoardData_1.DangoMonopolyBoardData.Create(e, t);
      t.SetActivityData(this),
        this.BoardList.push(t),
        this.BoardMap.set(e.BoardId, t);
    });
  }
  S4c() {
    var e = this.GetDangoMonopolyInfo();
    e &&
      ((e =
        0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()
          ? e.FeMaleDangoId
          : e.MaleDangoId),
      (this.Dango = DangoManager_1.DangoManager.GetDangoData(e)));
  }
  GetDangoId() {
    return this.Dango?.Id ?? 0;
  }
  GetMoveDangoId() {
    var e,
      t = this.GetDangoId();
    return this.CurrentBoardData &&
      this.RunningGridData &&
      ((e = this.RunningGridData.GetPosition()),
      (e = this.CurrentBoardData.GridList.slice(0, e)
        .reverse()
        .find((e) => e.IsExistDango())))
      ? e.Id
      : t;
  }
  PhraseEx(e) {
    e = e.LAc;
    if (e) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("DangoMonopoly", 69, "Data PhraseEx", ["", e]),
        this.UpdateRewardGridId(e.jVc),
        this.UpdateCurrentBoard(e.cS_),
        this.CurrentBoardData?.UpdateUnlockTime(e.A_1),
        this.IsDangoMoveProcess || this.UpdateCurrentGrid(e.wAc),
        this.AllUpdateTask(e.CJ_),
        this.UpdateTaskEndTime(e.zDc),
        this.UpdateBoardReward(e.RAc);
      for (var [t, i] of Object.entries(e.eg1 ?? [])) {
        var o,
          a,
          r = this.BoardMap.get(Number(t));
        r?.UpdateRollDiceTimes(Number(i.L_1)), r?.ClearRecordTriggerBuff();
        for ([o, a] of Object.entries(i.w_1 ?? []))
          r?.UpdateRecordTriggerBuff(Number(o), Number(a));
        r?.ClearOwnedBuffIdList(), r?.OwnedBuffIdList.push(...(i.ZNc ?? []));
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotUpdateDangoMonopolyNum,
      ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotUpdateDangoMonopolyRound,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask,
        );
    }
  }
  IsRedDotDiceTask() {
    return !(
      this.IsFinishAllRound() ||
      (!this.IsDiceTaskReward() && !this.IsDiceTaskNewTask())
    );
  }
  IsDiceTaskReward() {
    for (var [, e] of this.TaskIdMap)
      if (e.TaskState === Protocol_1.Aki.Protocol.DAc.Proto_Completed)
        return !0;
    return !1;
  }
  IsDiceTaskNewTask() {
    return this.TaskIdMap.size > this.TaskLookedSet.size;
  }
  IsCanUseDice() {
    return (
      !this.IsRunningBoardLock() && !this.IsFinishAllRound() && this.IsDiceNum()
    );
  }
  IsDiceNum() {
    return 0 < this.GetDiceNum();
  }
  IsRunningBoardLock() {
    return !!this.CurrentBoardData?.IsLock();
  }
  GetBoardUnlockRemainTime() {
    return this.CurrentBoardData?.GetUnlockRemainTime() ?? 0;
  }
  IsRoundReward() {
    return this.BoardList.some((e) => e.IsCanReceiveReward());
  }
  IsAllGetRoundReward() {
    return this.BoardList.every((e) => e.IsRewarded);
  }
  IsExistGridReward() {
    return this.RewardedGridId < this.GetCurrentGridId();
  }
  UpdateRewardGridId(e) {
    this.RewardedGridId = e;
  }
  GetDiceNum() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      this.DiceItemId,
    );
  }
  GetDangoMonopolyInfo() {
    return ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.GetInfo(
      this.Id,
    );
  }
  GetDangoMonopolyBoardList() {
    var e = this.GetDangoMonopolyInfo()?.BoardGroupId;
    return e
      ? ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetBoardList(
          e,
        )
      : [];
  }
  UpdateCurrentBoard(e) {
    this.CurrentBoardData = this.BoardMap.get(e);
  }
  UpdateCurrentGrid(e) {
    (this.CurrentGridData = this.CurrentBoardData?.GridMap.get(e)),
      this.UpdateRunningGrid(e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "DangoMonopoly",
          69,
          "更新当前格子",
          ["id", e],
          ["position", this.CurrentGridData?.GetPosition()],
        );
  }
  UpdateRunningGrid(e) {
    (this.RunningGridData = this.CurrentBoardData?.GridMap.get(e)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "DangoMonopoly",
          69,
          "更新进行中格子",
          ["id", e],
          ["position", this.RunningGridData?.GetPosition()],
        );
  }
  UpdateTargetGrid(e) {
    (this.TargetGridData = this.CurrentBoardData?.GridMap.get(e)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "DangoMonopoly",
          69,
          "更新目标格子",
          ["id", e],
          ["position", this.TargetGridData?.GetPosition()],
        );
  }
  async MoveDangoEnd() {
    this.UpdateCurrentGrid(this.TargetGridData?.Id ?? 0),
      await this.RequestReceiveGrid(),
      (this.IsCanApplySpeed = !1),
      this.SetIsDangoMoveProcess(!1),
      ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.SetPushHintState(
        !1,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyMoveEnd,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyMoveStepStartOrEnd,
        !1,
      );
  }
  GetTotalRoundNum() {
    return this.BoardList.length;
  }
  GetFinishedRoundNum() {
    return this.BoardList.filter((e) => e.IsFinish()).length;
  }
  IsFinishAllRound() {
    return this.GetFinishedRoundNum() >= this.GetTotalRoundNum();
  }
  GetCurrentBoardPosition() {
    return this.CurrentBoardData?.GetPosition() ?? 0;
  }
  GetCurrentGridPosition() {
    return this.CurrentGridData?.GetPosition() ?? 0;
  }
  GetCurrentGridId() {
    return this.CurrentGridData?.Id ?? 0;
  }
  GetRunningGridId() {
    return this.RunningGridData?.Id ?? 0;
  }
  UU_() {
    return ActivityManager_1.ActivityManager.GetActivityController(this.Type);
  }
  AllUpdateTask(e) {
    this.TaskIdMap.forEach((e) => {
      e.Recycle();
    }),
      this.TaskIdMap.clear(),
      this.TaskTypeMap.clear(),
      e.forEach((e) => {
        var t =
          ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.GetTask(
            e.gps,
          );
        t &&
          ((t = DangoMonopolyTaskData_1.DangoMonopolyTaskData.Create(t)),
          this.TaskTypeMap.has(t.TaskType)
            ? this.TaskTypeMap.get(t.TaskType).push(t)
            : this.TaskTypeMap.set(t.TaskType, [t]),
          this.TaskIdMap.set(t.Id, t),
          t.ProtoUpdateData(e));
      }),
      this.SortTaskList();
  }
  SortTaskList() {
    this.TaskTypeMap.forEach((e) => {
      e.sort((e, t) => e.GetSortResult(t));
    });
  }
  UpdateTask(e) {
    e.forEach((e) => {
      this.TaskIdMap.get(e.gps)?.ProtoUpdateData(e);
    }),
      this.SortTaskList();
  }
  UpdateTaskEndTime(e) {
    for (var [t, i] of Object.entries(e)) {
      t = this.TaskTypeMap.get(Number(t));
      const o = MathUtils_1.MathUtils.LongToNumber(i);
      t &&
        t.forEach((e) => {
          e.SetEndTime(o);
        });
    }
  }
  UpdateBoardReward(e) {
    e.forEach((e) => {
      this.BoardMap.get(e)?.SetRewarded(!0);
    });
  }
  ProtoDiceResponse(e) {
    (this.IsCanApplySpeed = !0), this.ApplySpeed();
    var t,
      i = e.LOc?.wOc ?? 0,
      [o, a, r] = this.GetMoveStepByData(e.LOc, e.bOc),
      a = this.CurrentBoardData?.InitStartMoveDango(a) ?? 0;
    this.BuffIsWhenMoveFire(i) &&
      this.CurrentGridData &&
      ((t = this.CurrentGridData.Index + r),
      (t = this.CurrentBoardData?.GridList[t])) &&
      t.UpdateMoveFinishBuffId(i),
      this.CurrentBoardData?.AddRecordTriggerBuff(i),
      this.CurrentBoardData?.AddRollDiceTimes(),
      UiManager_1.UiManager.OpenView("DangoMonopolyRollDiceView", {
        BoardId: this.CurrentBoardData.Id,
        DiceResult: r,
        TriggerBuffId: i,
        TriggerBuffResult: o,
      }),
      a !== e.P_1 &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "DangoMonopoly",
          69,
          "掷骰子结果不一致",
          ["client", a],
          ["server", e.P_1],
          ["response", e],
        );
  }
  GetMoveStepByData(e, t = 0) {
    var i = e?.LOc;
    if (!i?.length) return [0, t, t];
    var e = e.wOc,
      o =
        ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.GetProperty(
          e,
        );
    if (!o) return [0, t, t];
    var o = o.PropertyInfo[0],
      a = i[0] ?? 0;
    switch (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "DangoMonopoly",
          69,
          "投掷结果特性",
          ["Id", e],
          ["Type", o],
        ),
      o)
    ) {
      case 4:
        return [a, a, t];
      case 6:
        return [t * Math.max(0, a - 1), t * a, t];
      case 5:
      case 7:
        return [0, a, a];
      default:
        return [a, t + a, t];
    }
  }
  ProtoTaskUpdateNotify(e) {
    this.UpdateTask(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask,
      ),
      this.UU_().RefreshActivityRedDot(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyTaskUpdate,
        0,
      );
  }
  ProtoTaskAddNotify(e) {
    this.UpdateTask(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask,
      ),
      this.UU_().RefreshActivityRedDot(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyTaskUpdate,
        1,
      );
  }
  ProtoTaskRemoveNotify(e) {
    e.forEach((e) => {
      this.TaskIdMap.delete(e), this.TaskLookedSet.delete(e);
    }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask,
      ),
      this.UU_().RefreshActivityRedDot(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyTaskUpdate,
        2,
      );
  }
  ProtoSceneGridInfoNotify(e) {
    this.GridToEntityIdMap.clear(),
      (this.MainRoleDangoEntityId = MathUtils_1.MathUtils.LongToNumber(e.$Vc));
    var t,
      i,
      e = e.DUc;
    for ([t, i] of Object.entries(e)) {
      var o = Number(t),
        a = MathUtils_1.MathUtils.LongToNumber(i);
      this.GridToEntityIdMap.set(o, a);
    }
    this.InitBoardEntity();
  }
  async InitBoardEntity() {
    (this.IsBoardEntityInit = !1),
      await this.BoardInitPromise?.Promise,
      (this.BoardInitPromise = new CustomPromise_1.CustomPromise());
    const e = new CustomPromise_1.CustomPromise();
    var t =
        ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetBattleConfigPath(),
      t =
        (ControllerHolder_1.ControllerHolder.DangoGlobalController.InitGlobalConfig(
          t,
          () => {
            e.SetResult();
          },
        ),
        await e.Promise,
        this.GetBoardDangoChessList());
    const i = [];
    this.ChessPointParamsMap.clear(),
      ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetGridPoint(
        this.Id,
      ).forEach((e) => {
        var t = this.GetChessBoardPointParams(e);
        i.push(t), this.ChessPointParamsMap.set(e.Id, t);
      }),
      await ControllerHolder_1.ControllerHolder.ChessController.InitChessGameAsync(
        i,
        t,
        this.CurrentBoardData.GetEndGridId(),
      ),
      await NormalLoadingViewGlobalData_1.NormalLoadingViewGlobalData
        .FinishPromise?.Promise,
      await this.InitBoardGridUiInfoMap(),
      this.BoardInitPromise?.SetResult(),
      (this.BoardInitPromise = void 0),
      (this.IsBoardEntityInit = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyEnterNextRound,
      );
  }
  async DelayUpdateCameraMove() {
    await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME),
      this.IsShowRoundWelcome(!1) || this.LookAtDango();
  }
  GetBoardDangoChessList() {
    const t = [];
    this.CurrentBoardData?.GridList.filter((e) => e.IsExistDango())
      ?.reverse()
      ?.forEach((e) => {
        e = {
          Id: e.Id,
          CreatureDataId: this.GridToEntityIdMap.get(e.Id) ?? 0,
          InitPointId: e.GetDangoRunningGridId(),
        };
        t.push(e);
      });
    var e = this.GetDangoId(),
      i = this.MainRoleDangoEntityId;
    return (
      t.push({
        Id: e,
        CreatureDataId: i,
        InitPointId: this.GetRunningGridId(),
      }),
      t
    );
  }
  GetChessBoardPointParams(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
        e.EntityId,
      )?.Transform,
      i = t?.Pos.X ?? 0,
      o = t?.Pos.Y ?? 0,
      a = t?.Pos.Z ?? 0,
      r = t?.Rot?.Y ?? 0,
      n = t?.Rot?.Z ?? 0,
      t = t?.Rot?.X ?? 0;
    return {
      Id: e.Id,
      Location: Vector_1.Vector.Create(i, o, a),
      Rotation: Rotator_1.Rotator.Create(r, n, t),
      SortIndex: e.SortId,
    };
  }
  async InitBoardGridUiInfoMap() {
    await this.BoardGridUiInfoPromise, this.ClearBoardGridUiInfoMap();
    var e = this.CurrentBoardData?.GridList;
    if (e) {
      e = e.filter((e) => e.IsExistItem());
      const i = [];
      e.forEach((e) => {
        var t = new DangoMonopolyGridInfoPanel_1.DangoMonopolyGridInfoPanel();
        i.push(t.Init(e, this)), this.BoardGridUiInfoMap.set(e.Id, t);
      }),
        (this.BoardGridUiInfoPromise = Promise.all(i)),
        (await this.BoardGridUiInfoPromise).forEach((e) => {
          e.UpdateHeight();
        }),
        (this.BoardGridUiInfoPromise = void 0);
    }
  }
  async UpdateBoardGridUiInfoShow(t) {
    await this.BoardGridUiInfoPromise,
      this.BoardGridUiInfoMap.forEach((e) => {
        e.SetActive(t);
      });
  }
  GetGridEntityInfoAddHeight(e, t) {
    return this.GetRunningGridId() === e &&
      0 < (e = this.GetMainRoleDangoHeight())
      ? e
      : this.Gs1 + t;
  }
  GetMainRoleDangoHeight() {
    var e,
      t = this.MainRoleDangoEntityId,
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    return t?.Valid && t.IsInit && t.Entity
      ? ((e =
          (t = t.Entity.GetComponent(1)?.SkeletalMesh?.Bounds)?.BoxExtent.Z ??
          0),
        (t?.Origin.Z ?? 0) + 2 * e)
      : 0;
  }
  ClearBoardGridUiInfoMap() {
    this.BoardGridUiInfoMap.forEach((e) => {
      e.Destroy();
    }),
      this.BoardGridUiInfoMap.clear();
  }
  LookAtDango(e, t = 0) {
    var i,
      o = ModelManager_1.ModelManager.DangoGlobalModel.Config;
    o &&
      5 === ModelManager_1.ModelManager.CameraModel.CameraMode &&
      ((e = e ?? this.GetMoveDangoId()),
      (e = this.GridToEntityIdMap.get(e) ?? this.MainRoleDangoEntityId),
      (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e))?.Valid) &&
      e.IsInit &&
      e.Entity &&
      (e = e.Entity.GetComponent(2)?.ActorLocationProxy) &&
      (i =
        ControllerHolder_1.ControllerHolder.CameraController.FreeCamera
          .DisplayComponent.CameraActor)?.IsValid() &&
      (Vector_1.Vector.Create().FromUeVector(i.D_K2_GetActorLocation()),
      (i = o.BeforeMoveCameraArmLength),
      ControllerHolder_1.ControllerHolder.CameraController.FreeCamera.LogicComponent.ApplyCameraBlend(
        e,
        void 0,
        i,
        t,
        o.BeforeMoveCameraCurve,
        o.BeforeMoveCameraFov,
        void 0,
      ));
  }
  SetIsDangoMoveProcess(e) {
    this.IsDangoMoveProcess = e;
  }
  RequestUseDice() {
    return (
      !!this.IsCanUseDice() &&
      (this.SetIsDangoMoveProcess(!0),
      ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.SetPushHintState(
        !0,
      ),
      this.UU_().RequestDice(),
      !0)
    );
  }
  RequestReceiveTask(e, t = !1) {
    var i = this.TaskIdMap.get(e);
    if (i?.IsCanReceive()) {
      const o = [];
      t
        ? this.TaskTypeMap.get(i.TaskType)
            ?.filter((e) => e.IsCanReceive())
            .forEach((e) => o.push(e.Id))
        : o.push(e),
        this.UU_().RequestReceiveTaskReward(o);
    }
  }
  RequestReceiveBoard(e, t = !1) {
    const i = [];
    t
      ? this.BoardList.filter((e) => e.IsCanReceiveReward()).forEach((e) =>
          i.push(e.Id),
        )
      : i.push(e),
      this.UU_().RequestReceiveBoardReward(i);
  }
  ProtoReceiveBoardRewardResponse(e) {
    this.UpdateBoardReward(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyBoardRewardUpdate,
      );
  }
  async RequestReceiveGrid() {
    await this.UU_().RequestReceiveGridReward();
  }
  ProtoReceiveGridRewardResponse() {
    this.UpdateRewardGridId(this.GetCurrentGridId()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyGridRewardUpdate,
      );
  }
  RequestEnterDangoMonopoly() {
    var e = Protocol_1.Aki.Protocol.JDc.create(),
      e =
        ((e.w6n = this.Id),
        (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.JDc =
          e),
        this.DangoMonopolyInstanceId),
      t = ModelManager_1.ModelManager.RoleModel.GetRoleSystemRoleList().slice(
        0,
        3,
      );
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(
      e,
      t,
      0,
      0,
    );
  }
  async CheckEnterNextRound() {
    return (
      !!this.CurrentBoardData?.IsFinish() &&
      !this.IsFinishAllRound() &&
      (await this.RequestEnterNextRound(), !0)
    );
  }
  async RequestEnterNextRound() {
    ModelManager_1.ModelManager.ChessModel.ClearAll(),
      await this.UU_().RequestEnterNextBoard();
  }
  ProtoEnterNextBoardResponse(e) {
    this.UpdateCurrentBoard(e.cS_),
      this.CurrentBoardData?.UpdateUnlockTime(e.A_1);
    e = this.CurrentBoardData?.GetStartGridId() ?? 0;
    this.UpdateCurrentGrid(e),
      this.UpdateRewardGridId(0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotUpdateDangoMonopolyNum,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotUpdateDangoMonopolyRound,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask,
      );
  }
  OpenViewDiceTask() {
    UiManager_1.UiManager.OpenView("DangoMonopolyTaskView", {
      TaskList: this.M4c(),
    });
  }
  OpenViewDangoMonopolyMain() {
    UiManager_1.UiManager.OpenView("DangoMonopolyMainView");
  }
  OpenViewDangoMonopolyTransition(e) {
    UiManager_1.UiManager.OpenView("DangoMonopolyTransitionView", {
      TransitionCallback: e,
    });
  }
  OpenViewDangoTips(e, t = 0) {
    var i =
        ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.GetProperty(
          e,
        ),
      o = i?.Title ?? e.toString(),
      o = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(o, o),
      a = DangoMonopolyDefine_1.dangoMonopolyTextKey.DangoMonopolyBuffTips,
      a = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(a, o),
      o =
        (this.BoardMap.get(t) ?? this.CurrentBoardData)?.GetDangoIdByBuffId(
          e,
        ) ?? 0,
      o = DangoManager_1.DangoManager.GetDangoData(o)?.IconAttack;
    this.CheckOpenDangoTips({ Text: a, Icon: o }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "DangoMonopoly",
          69,
          "添加展示特性",
          ["Id", e],
          ["Type", i?.PropertyInfo[0]],
          ["BoardId", t],
        );
  }
  async CheckOpenDangoTips(e) {
    this.DangoTipsList.push(e),
      await this.DangoTipsPromise?.Promise,
      UiManager_1.UiManager.IsViewOpen("DangoMonopolyTipsView") ||
        ((this.DangoTipsPromise = new CustomPromise_1.CustomPromise()),
        UiManager_1.UiManager.OpenView(
          "DangoMonopolyTipsView",
          {
            TipsTextList: this.DangoTipsList,
            ShowTime: DangoMonopolyDefine_1.DANGO_MONOPOLY_TIPS_SHOW_TIME,
          },
          () => {
            this.DangoTipsPromise?.SetResult();
          },
        ),
        await this.DangoTipsPromise?.Promise,
        (this.DangoTipsPromise = void 0));
  }
  E4c(e) {
    switch (e) {
      case 0:
        return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
          DangoMonopolyDefine_1.dangoMonopolyTextKey.DailyTask,
          DangoMonopolyDefine_1.dangoMonopolyTextKey.DailyTask,
        );
      case 1:
        return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
          DangoMonopolyDefine_1.dangoMonopolyTextKey.WeeklyTask,
          DangoMonopolyDefine_1.dangoMonopolyTextKey.WeeklyTask,
        );
      default:
        return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
          DangoMonopolyDefine_1.dangoMonopolyTextKey.OnceTask,
          DangoMonopolyDefine_1.dangoMonopolyTextKey.OnceTask,
        );
    }
  }
  M4c() {
    var e,
      t,
      i = [];
    for ([e, t] of this.TaskTypeMap)
      i.push({
        TaskType: e,
        TaskList: t,
        TaskTypeName: this.E4c(e),
        EndTime: t[0]?.EndTime ?? 0,
      });
    return i;
  }
  fo1(e) {
    UE.GameplayStatics.SetGlobalTimeDilation(
      GlobalData_1.GlobalData.World,
      e ?? this.Speed,
    );
  }
  ResetSpeed() {
    this.fo1(1);
  }
  ApplySpeed() {
    return !!this.IsCanApplySpeed && (this.fo1(), !0);
  }
  SetActivitySpeed(e) {
    e = e ? this.I4c(e) : this.T4c();
    (this.Speed = e), this.ApplySpeed();
  }
  SaveSpeedToLocal(e) {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolySpeed,
      e ?? this.Speed,
    );
  }
  SaveLastEnterBoardIdToLocal(e) {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolyLastEnterBoard,
      e ?? this.LastEnterBoardId,
    );
  }
  ReadLocalSpeed() {
    return (
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolySpeed,
      ) ?? 1
    );
  }
  ReadLocalLastEnterBoardId() {
    return (
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolyLastEnterBoard,
      ) ?? 0
    );
  }
  InitLocalData() {
    LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolyActivityId,
    ) !== this.Id
      ? (LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolyActivityId,
          this.Id,
        ),
        (this.Speed = 1),
        (this.LastEnterBoardId = 0),
        this.SaveSpeedToLocal(this.Speed),
        this.SaveLastEnterBoardIdToLocal(this.LastEnterBoardId),
        this.SaveNewTaskToLocal())
      : ((this.Speed = this.ReadLocalSpeed()),
        (this.LastEnterBoardId = this.ReadLocalLastEnterBoardId()),
        this.ReadNewTaskFromLocal());
  }
  SaveLocalData() {
    this.SaveSpeedToLocal(), this.SaveLastEnterBoardIdToLocal();
  }
  SaveNewTaskToLocal() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolyNewTask,
      this.TaskLookedSet,
    );
  }
  ReadNewTaskFromLocal() {
    this.TaskLookedSet =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.DangoMonopolyNewTask,
      ) ?? new Set();
  }
  AddNewTaskIdList(e) {
    e = e.filter((e) => !this.TaskLookedSet.has(e));
    if (e.length <= 0) return !1;
    for (const t of e) this.TaskLookedSet.add(t);
    return (
      this.SaveNewTaskToLocal(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask,
      ),
      this.UU_().RefreshActivityRedDot(),
      !0
    );
  }
  I4c(t) {
    return this.DangoMonopolyRangeSpeed.find((e) => e === t) ?? 1;
  }
  T4c() {
    var e = this.DangoMonopolyRangeSpeed.findIndex((e) => e === this.Speed);
    return -1 === e
      ? 1
      : e + 1 >= this.DangoMonopolyRangeSpeed.length
        ? this.DangoMonopolyRangeSpeed[0]
        : this.DangoMonopolyRangeSpeed[e + 1];
  }
  GetSumGridProgress() {
    const t = { Finish: 0, Total: 0 };
    return (
      this.BoardList.forEach((e) => {
        (t.Finish += e.GetFinishGridNum()), (t.Total += e.GridList.length);
      }),
      t.Finish / t.Total
    );
  }
  GetSpeedStr() {
    return "X" + this.Speed.toFixed(1);
  }
  async CheckShowRoundWelcomeProcess() {
    return (
      !!this.IsShowRoundWelcome() && (await this.ShowRoundWelcomeProcess(), !0)
    );
  }
  async ShowRoundWelcomeProcess() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.DangoMonopolyStartShowProcess,
    ),
      ControllerHolder_1.ControllerHolder.CameraController.FreeCamera?.LogicComponent?.ResetToInit(),
      await this.ShowRoundWelcome(),
      AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_spl_rsnt_weapon_cam_in"),
      await this.MoveCameraToMainDango(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DangoMonopolyEndShowProcess,
      );
  }
  IsShowRoundWelcome(e = !0) {
    return !(
      1 < this.GetCurrentGridPosition() ||
      this.LastEnterBoardId === this.CurrentBoardData.Id ||
      (e && (this.LastEnterBoardId = this.CurrentBoardData.Id), 0)
    );
  }
  async ShowRoundWelcome() {
    await this.DangoWelcomePromise?.Promise;
    var e = this.CurrentBoardData.Id,
      t = DangoMonopolyDefine_1.dangoMonopolyTextKey.DangoMonopolyRoundSum,
      i = this.GetCurrentBoardPosition(),
      t = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
        t,
        i.toString(),
      );
    (this.DangoWelcomePromise = new CustomPromise_1.CustomPromise()),
      UiManager_1.UiManager.OpenView("DangoMonopolyRoundShowView", {
        BoardId: e,
        TipsText: t,
        ShowTime: 5e3,
        Promise: this.DangoWelcomePromise,
      }),
      await this.DangoWelcomePromise?.Promise;
  }
  async MoveCameraToMainDango() {
    await this.MoveCameraPromise?.Promise;
    var e = this.GetMoveDangoId(),
      e = this.GridToEntityIdMap.get(e) ?? this.MainRoleDangoEntityId,
      e =
        ModelManager_1.ModelManager.CreatureModel?.GetEntity(
          e,
        )?.Entity?.GetComponent(1)?.ActorLocationProxy;
    e &&
      (UiLayer_1.UiLayer.SetShowMaskLayer("DangoMonopolyMainView", !0),
      (this.MoveCameraPromise = new CustomPromise_1.CustomPromise()),
      ControllerHolder_1.ControllerHolder.DangoGlobalController.ApplyDangoBeforeMoveCamera(
        e,
        () => {
          this.MoveCameraPromise?.SetResult();
        },
      ),
      await this.MoveCameraPromise?.Promise,
      (this.MoveCameraPromise = void 0),
      UiLayer_1.UiLayer.SetShowMaskLayer("DangoMonopolyMainView", !1));
  }
  async MoveCameraToOverview() {
    var e,
      t = ModelManager_1.ModelManager.DangoGlobalModel.Config;
    t &&
      (await this.MoveCameraPromise?.Promise,
      (this.MoveCameraPromise = new CustomPromise_1.CustomPromise()),
      (e = t.BeforeMoveCameraBlendTimeFar),
      (t = t.BeforeMoveCameraCurve),
      UiLayer_1.UiLayer.SetShowMaskLayer("DangoMonopolyMainView", !0),
      ControllerHolder_1.ControllerHolder.CameraController.FreeCamera?.LogicComponent?.ResetToInit(
        e,
        t,
        () => {
          this.MoveCameraPromise?.SetResult();
        },
      ),
      await this.MoveCameraPromise.Promise,
      (this.MoveCameraPromise = void 0),
      UiLayer_1.UiLayer.SetShowMaskLayer("DangoMonopolyMainView", !1));
  }
  GetBuffShowType(e) {
    if (e <= 0) return 0;
    var t =
        ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig?.GetProperty(
          e,
        ),
      e = t?.PropertyInfo[0];
    if (!e) return 0;
    switch (e) {
      case 3:
        return t?.PropertyInfo[4] ?? 1;
      case 7:
      case 5:
        return 0;
      case 2:
        return 2;
    }
    return 1;
  }
  BuffIsWhenMoveFire(e) {
    return 2 === this.GetBuffShowType(e);
  }
  BuffIsAfterRollDiceFire(e) {
    return 1 === this.GetBuffShowType(e);
  }
  BuffIsImplicit(e) {
    return 0 === this.GetBuffShowType(e);
  }
  GetItemShowList(e) {
    var t = [];
    const i = new Map(),
      o = new Map();
    return (
      e.forEach((e) => {
        e.IsDouble &&
          (i.has(e.Id)
            ? (i.get(e.Id).Count += e.Num)
            : i.set(
                e.Id,
                new RewardItemData_1.RewardItemData(e.Id, e.Num, e.UniqueId, 2),
              )),
          o.has(e.Id)
            ? (o.get(e.Id).Count += e.Num)
            : o.set(
                e.Id,
                new RewardItemData_1.RewardItemData(e.Id, e.Num, e.UniqueId),
              );
      }),
      t.push(...i.values(), ...o.values()),
      t.sort((e, t) => {
        var i = e.GetDropItemType(),
          o = t.GetDropItemType();
        return i !== o ? o - i : e.ConfigId - t.ConfigId;
      }),
      t
    );
  }
  ProtoRewardNotify(e) {
    var t = e.x9n;
    ControllerHolder_1.ControllerHolder.ItemRewardController.GetRewardViewReasonArray().includes(
      t,
    ) &&
      ((e = e.Gf1.map((e) => ({
        Id: e.L8n,
        Num: e.UVn,
        IsDouble: 1 < e.qf1,
        UniqueId: 0,
      }))),
      (e = this.GetItemShowList(e)),
      (t =
        ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(
          t,
        )?.RewardViewId ?? 0),
      ItemRewardController_1.ItemRewardController.OpenCommonRewardView(t, e));
  }
  IsInTheDungeon() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return (
      35 ===
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
        ?.InstSubType
    );
  }
  GetBoardRemainTimeStr() {
    var e =
        DangoMonopolyDefine_1.dangoMonopolyTextKey.DangoMonopolyBoardLockTips,
      t = this.GetBoardUnlockRemainTime(),
      t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(t);
    return ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
      e,
      t.CountDownText,
    );
  }
  RecordKismetSetting() {
    (this.KismetSettingOutline =
      UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.NGX.DLSS.Enable")),
      0 !== this.KismetSettingOutline &&
        UE.KuroSequencePerformanceManager.SimpleExecuteCommand(
          "r.NGX.DLSS.Enable 0",
        );
  }
  ResetKismetSetting() {
    this.KismetSettingOutline &&
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand(
        "r.NGX.DLSS.Enable " + this.KismetSettingOutline,
      );
  }
  GameplayExit() {
    this.ResetSpeed(),
      this.ClearBoardGridUiInfoMap(),
      this.SaveLocalData(),
      this.ResetKismetSetting(),
      this.BoardInitPromise?.SetResult(),
      this.DangoTipsPromise?.SetResult(),
      this.DangoWelcomePromise?.SetResult(),
      this.MoveCameraPromise?.SetResult(),
      (this.IsCanApplySpeed = !1),
      this.IsDangoMoveProcess &&
        (this.SetIsDangoMoveProcess(!1),
        this.UpdateCurrentGrid(this.TargetGridData?.Id ?? 0));
  }
}
exports.ActivityDangoMonopolyData = ActivityDangoMonopolyData;
//# sourceMappingURL=ActivityDangoMonopolyData.js.map
