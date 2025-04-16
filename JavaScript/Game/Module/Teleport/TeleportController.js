"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportController = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  CameraController_1 = require("../../Camera/CameraController"),
  CameraUtility_1 = require("../../Camera/CameraUtility"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RoleAudioController_1 = require("../../NewWorld/Character/Role/RoleAudioController"),
  RoleTriggerController_1 = require("../../NewWorld/Character/Role/RoleTriggerController"),
  PerfSightController_1 = require("../../PerfSight/PerfSightController"),
  ScreenEffectSystem_1 = require("../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  GameModeController_1 = require("../../World/Controller/GameModeController"),
  WorldController_1 = require("../../World/Controller/WorldController"),
  WorldDefine_1 = require("../../World/Define/WorldDefine"),
  AsyncTask_1 = require("../../World/Task/AsyncTask"),
  TaskSystem_1 = require("../../World/Task/TaskSystem"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  DeadReviveController_1 = require("../DeadRevive/DeadReviveController"),
  GenericPromptController_1 = require("../GenericPrompt/GenericPromptController"),
  LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
  PlotData_1 = require("../Plot/PlotData"),
  SeamlessTravelDefine_1 = require("../SeamlessTravel/SeamlessTravelDefine"),
  SeamlessTravelPostProcess_1 = require("../SeamlessTravel/SeamlessTravelPostProcess"),
  SeamlessTravelTreadmill_1 = require("../SeamlessTravel/SeamlessTravelTreadmill"),
  TeleportDefine_1 = require("../Teleport/TeleportDefine"),
  VideoLauncher_1 = require("../Video/VideoLauncher"),
  DISTANCE_THRESHOLD_1 = 3e3,
  DISTANCE_THRESHOLD_2 = MathUtils_1.MathUtils.MaxFloat,
  SKIP_FALL_INJURE_TIME = 1e3,
  DELAYCLOSETIME = 1500;
class TeleportController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(28722, this.AIo),
      Net_1.Net.Register(19738, this.Nkl),
      Net_1.Net.Register(19974, this.PIo),
      Net_1.Net.Register(18035, this.S3l),
      Net_1.Net.Register(15658, this.P$_),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InitArea,
        this.Hlh,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(28722),
      Net_1.Net.UnRegister(19738),
      Net_1.Net.UnRegister(19974),
      Net_1.Net.UnRegister(18035),
      Net_1.Net.UnRegister(15658),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InitArea,
        this.Hlh,
      ),
      !0
    );
  }
  static OnTick(e) {
    ModelManager_1.ModelManager.TeleportModel.Treadmill &&
      ModelManager_1.ModelManager.TeleportModel.Treadmill.Tick(e),
      ModelManager_1.ModelManager.TeleportModel.PostProcess &&
        ModelManager_1.ModelManager.TeleportModel.PostProcess.Tick(e),
      ModelManager_1.ModelManager.TeleportModel.IsTeleport ||
        (void 0 !== TeleportController.xIo && this.AIo(TeleportController.xIo));
  }
  static CheckCanTeleport() {
    return ModelManager_1.ModelManager.TeleportModel.AllowTeleport;
  }
  static SetAllowTeleport(e, o) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Teleport",
        48,
        "设置是否允许传送",
        ["AllowTeleport", e],
        ["Reason", o],
      ),
      (ModelManager_1.ModelManager.TeleportModel.AllowTeleport = e);
  }
  static async TeleportToPositionNoLoading(e, o, r, t = !0, l = !1) {
    return Global_1.Global.BaseCharacter?.IsValid()
      ? this.QueryCanTeleportNoLoading(e, l)
        ? ((l = new TeleportDefine_1.TeleportContext(void 0, void 0, 0)),
          this.wIo(e, o, void 0, r, l, t))
        : ((ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2),
          this.BIo(e, o, void 0, r, new TeleportDefine_1.TeleportContext()))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Teleport", 29, "无加载传送:失败,找不到当前玩家", [
            "Reason",
            r,
          ]),
        !1);
  }
  static async TeleportToPositionWithGravityNoLoading(
    e,
    o,
    r,
    t,
    l = !0,
    a = !1,
  ) {
    return Global_1.Global.BaseCharacter?.IsValid()
      ? this.QueryCanTeleportNoLoading(e, a)
        ? ((a = new TeleportDefine_1.TeleportContext(void 0, void 0, 0)),
          this.wIo(e, o, r, t, a, l))
        : ((ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2),
          this.BIo(e, o, r, t, new TeleportDefine_1.TeleportContext()))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Teleport", 29, "无加载传送:失败,找不到当前玩家", [
            "Reason",
            t,
          ]),
        !1);
  }
  static QueryCanTeleportNoLoading(e, o = !1) {
    var r = Global_1.Global.BaseCharacter;
    return r?.IsValid()
      ? (o
          ? UE.VectorDouble.Dist2D(r.CharacterActorComponent.ActorLocation, e)
          : UE.VectorDouble.Dist(r.CharacterActorComponent.ActorLocation, e)) <
          (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
          !ModelManager_1.ModelManager.GameModeModel.UseWorldPartition
            ? DISTANCE_THRESHOLD_2
            : DISTANCE_THRESHOLD_1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Teleport",
            29,
            "查询是否可以无加载传送:失败,找不到当前玩家",
          ),
        !1);
  }
  static async TeleportToPosition(e, o, r, t, l) {
    Global_1.Global.BaseCharacter?.IsValid() ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Teleport",
          29,
          "传送:传送时无主角，建议调整配置，避免在切换编队过程中传送",
          ["Reason", t],
        ));
    let a = l;
    return (((a = a || new TeleportDefine_1.TeleportContext())
      .TeleportReason === Protocol_1.Aki.Protocol.v4s.SL_ ||
      a.TeleportReason === Protocol_1.Aki.Protocol.v4s.Xvs ||
      a.TeleportReason === Protocol_1.Aki.Protocol.v4s.Proto_Fall) &&
      ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) ||
      (a.TeleportReason === Protocol_1.Aki.Protocol.v4s.Proto_Gm &&
        ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot())
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Teleport",
            39,
            "传送:遇到不应执行传送的情况，使用伪传送替代",
            ["TeleportReason", a.TeleportReason],
            ["Reason", t],
          ),
        TeleportController.bIo(a, t))
      : TeleportController.BIo(e, o, r, t, a);
  }
  static async TeleportToPositionNoSync(e, o, r, t, l) {
    Global_1.Global.BaseCharacter?.IsValid() ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Teleport",
          29,
          "传送:传送时无主角，建议调整配置，避免在切换编队过程中传送",
          ["Reason", t],
        ));
    let a = l;
    return (
      !!(
        (((a = a || new TeleportDefine_1.TeleportContext()).TeleportReason ===
          Protocol_1.Aki.Protocol.v4s.SL_ ||
          a.TeleportReason === Protocol_1.Aki.Protocol.v4s.Xvs) &&
          ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) ||
        (a.TeleportReason === Protocol_1.Aki.Protocol.v4s.Proto_Gm &&
          ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot())
      ) || TeleportController.BIo(e, o, r, t, a, !1)
    );
  }
  static ShowTeleportConfirmBox(e = () => {}) {
    var o =
      ModelManager_1.ModelManager.InstanceDungeonModel.GetCurrentDungeonTelExitConfirmId();
    return (
      void 0 !== o &&
      0 < o &&
      ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o)).FunctionMap.set(
        2,
        () => {
          e();
        },
      ),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        o,
      ),
      !0)
    );
  }
  static SendTeleportTransferRequest(e) {
    this.ShowTeleportConfirmBox(() => {
      ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo(),
        this.t4_(e);
    }) || this.t4_(e);
  }
  static t4_(e) {
    (ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId = e),
      (ModelManager_1.ModelManager.LoadingModel.TargetTeleportId = e),
      this.SendTeleportTransferRequestById(e);
  }
  static SendTeleportTransferRequestById(e) {
    (ModelManager_1.ModelManager.GameModeModel.IsTeleport = !0),
      ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
        "SendTeleportTransferRequestById",
      );
    e = Protocol_1.Aki.Protocol.mCs.create({ s5n: e });
    Net_1.Net.Call(27724, e, (e) => {
      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
        "SendTeleportTransferRequestById",
      ),
        GlobalData_1.GlobalData.World
          ? e.Q4n !==
              Protocol_1.Aki.Protocol.Q4n
                .Proto_ErrPlayerIsTeleportCanNotDoTeleport &&
            e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ((ModelManager_1.ModelManager.GameModeModel.IsTeleport = !1),
            (ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId =
              void 0),
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              15644,
            ))
          : ((ModelManager_1.ModelManager.GameModeModel.IsTeleport = !1),
            (ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId =
              void 0));
    });
  }
  static async wIo(e, o, r, t, l, a = !0, _ = !1, n = 0) {
    const i = ModelManager_1.ModelManager.TeleportModel;
    if (i.IsTeleport)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Teleport", 29, "无加载传送:重复调用,正在传送中", [
            "Reason",
            t,
          ]),
        !1
      );
    i.TeleportEntityCreatureDataId = n;
    let g = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity,
      s = void 0;
    (g =
      0 !== n ? ModelManager_1.ModelManager.CreatureModel.GetEntity(n) : g) &&
      (s =
        ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(
          g,
        )),
      (i.CallSource = l.TeleportCallSource),
      s?.Valid &&
        (i.StartPosition.DeepCopy(s.ActorLocationProxy),
        i.StartRotation.DeepCopy(s.ActorRotationProxy),
        i.StartGravityDirect.DeepCopy(s.ActorGravityDirectProxy)),
      i.TargetPosition.DeepCopy(e),
      r
        ? i.TargetGravityDirect.DeepCopy(r)
        : i.TargetGravityDirect.DeepCopy(
            s?.ActorGravityDirectProxy ?? Vector_1.Vector.DownVectorProxy,
          ),
      i.TargetGravityDirect.Normalize() ||
        i.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy);
    MathUtils_1.MathUtils.IsNearlyEqual(i.TargetGravityDirect.Z, -1) &&
      i.TargetGravityDirect.Inequality(Vector_1.Vector.DownVectorProxy) &&
      i.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy),
      o
        ? i.TargetRotation.DeepCopy(o)
        : s?.Valid
          ? (Quat_1.Quat.FindBetween(
              s.ActorGravityDirectProxy,
              i.TargetGravityDirect,
              MathUtils_1.MathUtils.CommonTempQuat,
            ),
            (n = Quat_1.Quat.Create()),
            MathUtils_1.MathUtils.CommonTempQuat.Multiply(
              s.ActorRotationProxy.Quaternion(),
              n,
            ),
            n.Rotator(i.TargetRotation))
          : i.TargetRotation.Reset(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Teleport",
          29,
          "无加载传送:开始",
          ["传送实体", i.TeleportEntityCreatureDataId],
          ["开始位置", s?.ActorLocationProxy],
          ["目标位置", e],
          ["开始旋转", s?.ActorRotationProxy],
          ["目标旋转", o],
          ["开始重力方向", s?.ActorGravityDirectProxy],
          ["目标重力方向", r],
          ["Reason", t],
        ),
      (i.IsTeleport = !0),
      (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 2),
      (ModelManager_1.ModelManager.GameModeModel.IsTeleport = !0),
      ModelManager_1.ModelManager.GameModeModel.SetBornInfo(e, o),
      ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
        "TeleportToPositionNoLoadingImpl",
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 29, "无加载传送:处理开始事件(开始)"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TeleportStart,
        !1,
      ),
      g?.Valid &&
        EventSystem_1.EventSystem.EmitWithTarget(
          g.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          !1,
        ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 29, "无加载传送:处理开始事件(完成)"),
      4 !== i.TeleportMode &&
        l.TeleportReason !==
          Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle &&
        this.qIo(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 29, "无加载传送:设置角色状态(开始)"),
      TeleportController.GIo(!1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 29, "无加载传送:设置角色状态(完成)"),
      (ModelManager_1.ModelManager.GameModeModel.IsTeleport = !1),
      i.CreatePromise();
    n = new AsyncTask_1.AsyncTask(
      "TeleportToPositionNoLoadingImpl",
      async () => (
        (ModelManager_1.ModelManager.TeleportModel.NeedRestoreCamera = a),
        (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
          !ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) ||
          ((ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 29, "无加载传送:检测体素流送(开始)"),
          await this.NIo(!0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 29, "无加载传送:检测体素流送(完成)"),
          (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 12),
          (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 29, "无加载传送:检测场景流送(开始)"),
          await this.NIo(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 29, "无加载传送:检测场景流送(完成)"),
          (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14)),
        ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
          "TeleportToPositionNoLoadingImpl",
        ),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15),
        ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(
          Protocol_1.Aki.Protocol.Nks.Proto_Normal,
        ),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16),
        _ &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Teleport",
              48,
              "无加载传送:通知服务器传送完成(开始)",
            ),
          this.kIo(),
          await i.TeleportFinishRequest.Promise,
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Teleport", 48, "无加载传送:通知服务器传送完成(完成)"),
        i.ResetPromise(),
        (i.TeleportEntityCreatureDataId = 0),
        (i.IsTeleport = !1),
        RoleAudioController_1.RoleAudioController.SetUpdateAudioDynamicTrace(
          !0,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "无加载传送:处理完成事件(开始)"),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TeleportComplete,
          l.TeleportCallSource,
        ),
        (ModelManager_1.ModelManager.TeleportModel.NeedRestoreCamera = !0),
        TeleportController.OIo(l.TeleportId),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "无加载传送:处理完成事件(完成)"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "无加载传送:完成"),
        (ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1),
        !0
      ),
    );
    return (
      TaskSystem_1.TaskSystem.AddTask(n),
      TaskSystem_1.TaskSystem.Run(),
      n.Promise
    );
  }
  static async bIo(e, o) {
    const r = ModelManager_1.ModelManager.TeleportModel;
    if (r.IsTeleport)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Teleport", 39, "伪传送:无法调用,正在传送中", [
            "Reason",
            o,
          ]),
        !1
      );
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Teleport",
        39,
        "伪传送:开始",
        ["原因", e.TeleportReason],
        ["Reason", o],
      ),
      (r.IsTeleport = !0);
    var t = new AsyncTask_1.AsyncTask(
      "FakeTeleportToPositionImpl",
      async () => (
        r.CreatePromise(),
        e.TeleportReason === Protocol_1.Aki.Protocol.v4s.Proto_Gm &&
          (await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
            6,
          )),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 39, "伪传送:通知服务器传送完成(开始)"),
        this.kIo(),
        await r.TeleportFinishRequest.Promise,
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PlotTeleportToPositionFinished,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 39, "伪传送:通知服务器传送完成(完成)"),
        r.ResetPromise(),
        (r.IsTeleport = !1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 39, "伪传送:完成", ["Reason", o]),
        (ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1),
        !0
      ),
    );
    return (
      TaskSystem_1.TaskSystem.AddTask(t),
      TaskSystem_1.TaskSystem.Run(),
      t.Promise
    );
  }
  static async BIo(e, o, r, t, l, a = !0, _ = 0) {
    const n = ModelManager_1.ModelManager.TeleportModel;
    if (n.IsTeleport)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Teleport", 29, "传送:重复调用,正在传送中", [
            "Reason",
            t,
          ]),
        !1
      );
    n.TeleportEntityCreatureDataId = _;
    let i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity,
      g = void 0;
    (i =
      0 !== _
        ? ModelManager_1.ModelManager.CreatureModel.GetEntity(
            n.TeleportEntityCreatureDataId,
          )
        : i) &&
      (g =
        ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(
          i,
        )),
      (n.CallSource = l.TeleportCallSource),
      g?.Valid &&
        (n.StartPosition.DeepCopy(g.ActorLocationProxy),
        n.StartRotation.DeepCopy(g.ActorRotationProxy),
        n.StartGravityDirect.DeepCopy(g.ActorGravityDirectProxy)),
      n.TargetPosition.DeepCopy(e),
      r
        ? n.TargetGravityDirect.DeepCopy(r)
        : n.TargetGravityDirect.DeepCopy(
            g?.ActorGravityDirectProxy ?? Vector_1.Vector.DownVectorProxy,
          ),
      n.TargetGravityDirect.Normalize() ||
        n.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy);
    MathUtils_1.MathUtils.IsNearlyEqual(n.TargetGravityDirect.Z, -1) &&
      n.TargetGravityDirect.Inequality(Vector_1.Vector.DownVectorProxy) &&
      n.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy),
      o
        ? n.TargetRotation.DeepCopy(o)
        : g?.Valid
          ? (Quat_1.Quat.FindBetween(
              g.ActorGravityDirectProxy,
              n.TargetGravityDirect,
              MathUtils_1.MathUtils.CommonTempQuat,
            ),
            (_ = Quat_1.Quat.Create()),
            MathUtils_1.MathUtils.CommonTempQuat.Multiply(
              g.ActorRotationProxy.Quaternion(),
              _,
            ),
            _.Rotator(n.TargetRotation))
          : n.TargetRotation.Reset();
    r = n.TargetGravityDirect.Multiply(-1, Vector_1.Vector.Create());
    switch (
      (n.TargetRotation.Quaternion().GetForwardVector(
        MathUtils_1.MathUtils.CommonTempVector,
      ),
      MathUtils_1.MathUtils.LookRotationUpFirst(
        MathUtils_1.MathUtils.CommonTempVector,
        r,
        n.TargetRotation,
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Teleport",
          29,
          "传送:开始",
          ["传送实体", n.TeleportEntityCreatureDataId],
          ["开始位置", n.StartPosition],
          ["目标位置", n.TargetPosition],
          ["开始旋转", n.StartRotation],
          ["目标旋转", n.TargetRotation],
          ["开始重力方向", n.StartGravityDirect],
          ["目标重力方向", n.TargetGravityDirect],
          ["原因", l.TeleportReason],
          ["传送类型", l.CtxType],
          ["Reason", t],
        ),
      (n.IsTeleport = !0),
      ModelManager_1.ModelManager.GameModeModel.SetBornInfo(e, o),
      (ModelManager_1.ModelManager.GameModeModel.IsTeleport = !0),
      (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 2),
      ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
        "TeleportToPositionImpl",
      ),
      (ModelManager_1.ModelManager.GameModeModel.RenderAssetDone = !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 29, "传送:处理开始事件(开始)", [
          "Reason",
          t,
        ]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TeleportStart,
        !0,
      ),
      g?.Valid &&
        EventSystem_1.EventSystem.EmitWithTarget(
          i.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          !0,
        ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 29, "传送:处理开始事件(完成)"),
      n.CreatePromise(),
      (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 3),
      l.TeleportReason)
    ) {
      case Protocol_1.Aki.Protocol.v4s.Proto_Fall:
        await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
          0,
          n.TeleportMode,
        );
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_Rouge:
        break;
      case Protocol_1.Aki.Protocol.v4s.SL_:
      case Protocol_1.Aki.Protocol.v4s.Xvs:
      case Protocol_1.Aki.Protocol.v4s.Proto_Transfer:
        if (l.Option)
          switch (l.Option.p5n) {
            case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Teleport", 45, "TransitionType.PlayMp4开始"),
                (ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee =
                  !1),
                l.Option.q$_.zFc
                  ? ((ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor =
                      l.Option.q$_.JFc?.YFc ===
                      Protocol_1.Aki.Protocol.JFc.Proto_Mp4BackgroundColorWhite
                        ? IAction_1.EMovieBackgroundType.White
                        : IAction_1.EMovieBackgroundType.Black),
                    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
                      0,
                      3,
                      1,
                      l.Option.q$_.JFc?.XFc ===
                        Protocol_1.Aki.Protocol.JFc
                          .Proto_Mp4BackgroundColorWhite
                        ? IAction_1.EFadeInScreenShowType.White
                        : IAction_1.EFadeInScreenShowType.Black,
                      !1,
                      !1,
                      void 0,
                      !0,
                    ),
                    (ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon =
                      !0))
                  : (ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon =
                      !1),
                this.FIo(
                  l.Option.q$_.y5n,
                  () => {
                    var e = Protocol_1.Aki.Protocol.D$_.create();
                    (e.x$_ = l.Option.q$_.y5n),
                      Net_1.Net.Call(18061, e, (e) => {
                        (e && e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) ||
                          (Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "Teleport",
                              45,
                              "播放CG完成请求失败",
                              ["ErrorCode", e.Cvs],
                            )),
                          ModelManager_1.ModelManager.TeleportModel.CgTeleportCompleted?.SetResult(
                            !0,
                          );
                      });
                  },
                  l.TeleportReason === Protocol_1.Aki.Protocol.v4s.Xvs,
                );
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Teleport", 45, "TransitionType.CenterText开始"),
                (ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee =
                  !1),
                this.TeleportWithCenterTextStart(l.Option.E5n);
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect:
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Teleport", 45, "TransitionType.PlayEffect开始"),
                "" !== l.Option.q$_.y5n &&
                  ResourceSystem_1.ResourceSystem.LoadAsync(
                    l.Option.q$_.y5n,
                    UE.EffectScreenPlayData_C,
                    (e) => {
                      ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
                        e,
                      );
                    },
                    102,
                  );
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Teleport", 50, "TransitionType.Seamless开始"),
                this.SeamlessTeleportStart();
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen:
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Teleport",
                  45,
                  "TransitionType.FadeInScreen开始",
                ),
                (ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen =
                  !0),
                (ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee =
                  !1),
                0 === l.Option.EIl
                  ? (ModelManager_1.ModelManager.GameModeModel.BlackScreenColor =
                      IAction_1.EFadeInScreenShowType.White)
                  : (ModelManager_1.ModelManager.GameModeModel.BlackScreenColor =
                      IAction_1.EFadeInScreenShowType.Black),
                await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
                  7,
                  3,
                  1,
                  ModelManager_1.ModelManager.GameModeModel.BlackScreenColor,
                  !1,
                  !1,
                  void 0,
                  !0,
                );
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_WithCharacterDisplay:
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Teleport", 7, "TransitionType.RoleLoading开始"),
                ModelManager_1.ModelManager.LoadingModel?.SetRoleLoadingConfig(
                  l.Option.va1?.ya1,
                ),
                await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
                  6,
                  n.TeleportMode,
                );
              break;
            default:
              (ModelManager_1.ModelManager.TeleportModel.DisableAutoFade &&
                3 === ModelManager_1.ModelManager.TeleportModel.TeleportMode) ||
                (await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
                  6,
                  n.TeleportMode,
                ));
          }
        else {
          if (
            ModelManager_1.ModelManager.TeleportModel.DisableAutoFade &&
            3 === ModelManager_1.ModelManager.TeleportModel.TeleportMode
          )
            break;
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
            6,
            n.TeleportMode,
          );
        }
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle:
        l.Option &&
        l.Option.p5n === Protocol_1.Aki.Protocol.p5n.Proto_CenterText
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Teleport", 48, "TransitionType.CenterText开始"),
            await this.TeleportWithCenterTextStart(l.Option.E5n))
          : await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
              6,
              n.TeleportMode,
            );
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_GravityFlip:
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 31, "传送:重力翻转传送开始");
        break;
      default:
        (ModelManager_1.ModelManager.TeleportModel.DisableAutoFade &&
          3 === ModelManager_1.ModelManager.TeleportModel.TeleportMode) ||
          (await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
            6,
            n.TeleportMode,
          ));
    }
    ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
      GlobalData_1.GlobalData.World,
      t,
    ),
      (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 4),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 29, "传送:处理打开loading结束事件(开始)", [
          "Reason",
          t,
        ]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TeleportOpenLoadingEnd,
      ),
      g?.Valid &&
        EventSystem_1.EventSystem.EmitWithTarget(
          i.Entity,
          EventDefine_1.EEventName.TeleportOpenLoadingEnd,
        ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 29, "传送:处理打开loading结束事件(完成)");
    const s =
      2 === ModelManager_1.ModelManager.TeleportModel.TeleportMode ||
      1 === ModelManager_1.ModelManager.TeleportModel.TeleportMode;
    s &&
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
        !1,
      ),
      4 !== n.TeleportMode &&
        l.TeleportReason !==
          Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle &&
        (this.qIo(),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnUpdateSceneTeam,
          this.qIo,
        ));
    _ = new AsyncTask_1.AsyncTask("TeleportToPositionImpl", async () => {
      switch (
        (PerfSightController_1.PerfSightController.StartPersistentOrDungeon(),
        cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport"),
        cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckVoxelStreaming"),
        ControllerHolder_1.ControllerHolder.GameModeController.ForceDisableGamePaused(
          !0,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:时停解除(开始)", ["Reason", t]),
        4 === n.TeleportMode &&
          (InputDistributeController_1.InputDistributeController.RefreshInputTag(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 50, "传送:等待特效铺满屏幕(开始)"),
          await n.EffectFillScreen.Promise,
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 50, "传送:等待特效铺满屏幕(完成)"),
          n.SeamlessConfig?.TransitionWeatherDaPath &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Teleport", 39, "传送:等待后处理混入(开始)"),
            await n.PostProcessBlendedIn.Promise,
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info("Teleport", 39, "传送:等待后处理混入(完成)"),
          n.SeamlessConfig?.LeastTime) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 50, "传送:等待地板资产加载完成(开始)"),
          await n.TreadmillLoaded.Promise,
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 50, "传送:等待地板资产加载完成(完成)"),
          TimerSystem_1.TimerSystem.Next(() => {
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Teleport", 50, "传送:地板显形(开始)"),
              n.Treadmill.AppearEffect(() => {
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Teleport", 50, "传送:地板显形(完成)"),
                  TimerSystem_1.TimerSystem.Delay(() => {
                    n.TreadmillLeastTimeFinished?.SetResult(!0);
                  }, n.SeamlessConfig.LeastTime * MathUtils_1.MathUtils.SecondToMillisecond);
              });
            var e =
                ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
                  3,
                ),
              o =
                (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
                  175,
                )?.StopModelBuffer(),
                Vector_1.Vector.Create());
            n.Treadmill.GetLockOnLocation(o),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Teleport",
                  39,
                  "无缝传送:计算中间场景信息",
                  ["角色中间位置", o],
                  ["角色当前旋转", e.ActorRotationProxy],
                  [
                    "相机当前旋转",
                    CameraController_1.CameraController.FightCamera
                      .LogicComponent.CameraRotation,
                  ],
                ),
              e.TeleportAndFindStandLocation(o),
              CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(
                !1,
                !0,
              );
          })),
        ModelManager_1.ModelManager.GameModeModel.StartIndependentStreaming(
          n.TargetPosition.ToUeVector(),
        ),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:检测体素流送(开始)"),
        s &&
          ControllerHolder_1.ControllerHolder.WorldController.ManuallyClearStreamingPool(),
        await this.HIo(!0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:检测体素流送(完成)"),
        cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckVoxelStreaming"),
        cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckStreaming"),
        s &&
          ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
            !1,
          ),
        ControllerHolder_1.ControllerHolder.GameModeController.AddOrRemoveRenderAssetsQueryViewInfo(
          e,
          ResourceSystem_1.WAIT_RENDER_ASSET_DURATION,
        ),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 7, "传送:检测场景流送(开始)"),
        await this.HIo(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 7, "传送:检测场景流送(完成)"),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14),
        cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckStreaming"),
        cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckRenderAssets"),
        s &&
          (ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
            !1,
          ),
          ControllerHolder_1.ControllerHolder.WorldController.ManuallyResetStreamingPool()),
        ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
          "TeleportToPositionImpl",
        ),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15),
        ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(
          Protocol_1.Aki.Protocol.Nks.Proto_Normal,
        ),
        await ControllerHolder_1.ControllerHolder.GameModeController.CheckRenderAssetsStreamingCompleted(
          e,
          "传送:",
        ),
        cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckRenderAssets"),
        4 === n.TeleportMode &&
          n.SeamlessConfig?.LeastTime &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 50, "传送:等待过渡最小停留时长(开始)"),
          await n.TreadmillLeastTimeFinished.Promise,
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 50, "传送:等待过渡最小停留时长(完成)"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 50, "传送:地板隐形(开始)"),
          n.Treadmill.DisappearEffect(() => {
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Teleport", 50, "传送:地板隐形(完成)"),
              n.TreadmillDisappeared.SetResult(!0);
          }),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 50, "传送:等待地板隐形(开始)"),
          await n.TreadmillDisappeared.Promise,
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Teleport", 50, "传送:等待地板隐形(完成)"),
        cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.LoadTeam"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:等待编队加载(开始)"),
        await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise
          ?.Promise,
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:等待编队加载(完成)"),
        cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.LoadTeam"),
        cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CloseLoading"),
        4 !== n.TeleportMode &&
          l.TeleportReason !==
            Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnUpdateSceneTeam,
            this.qIo,
          ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:设置角色状态(开始)"),
        TeleportController.GIo(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:设置角色状态(完成)"),
        ModelManager_1.ModelManager.GameModeModel?.StopIndependentStreaming(
          ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined(),
        ),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16),
        (ModelManager_1.ModelManager.GameModeModel.IsTeleport = !1),
        RoleAudioController_1.RoleAudioController.SetUpdateAudioDynamicTrace(
          !0,
        ),
        ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
          GlobalData_1.GlobalData.World,
          t,
        ),
        s &&
          ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
            !1,
          ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.FixBornLocation,
        ),
        l.TeleportReason !==
          Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 48, "传送:更新载具状态(开始)"),
          await ControllerHolder_1.ControllerHolder.VehicleController.UpdatePlayerVehiclePerform(),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Teleport", 48, "传送:更新载具状态(完成)"),
        l?.TeleportReason === Protocol_1.Aki.Protocol.v4s.Proto_BtRollbackFailed
          ? TimerSystem_1.TimerSystem.Delay(() => {
              ModelManager_1.ModelManager.TeleportModel.TeleportWaitRequest?.SetResult(
                !0,
              );
            }, DELAYCLOSETIME)
          : ModelManager_1.ModelManager.TeleportModel.TeleportWaitRequest?.SetResult(
              !0,
            ),
        await ModelManager_1.ModelManager.TeleportModel.TeleportWaitRequest
          ?.Promise,
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 19),
        l.TeleportReason)
      ) {
        case Protocol_1.Aki.Protocol.v4s.Proto_Fall:
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
            0,
          );
          break;
        case Protocol_1.Aki.Protocol.v4s.SL_:
        case Protocol_1.Aki.Protocol.v4s.Xvs:
        case Protocol_1.Aki.Protocol.v4s.Proto_Transfer:
          if (l.Option)
            switch (l.Option.p5n) {
              case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Teleport", 45, "传送:CG传送完成(开始)"),
                  await n.CgTeleportCompleted?.Promise,
                  await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                    7,
                  ),
                  (ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 =
                    !1),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("Teleport", 45, "传送:CG传送完成(完成)");
                break;
              case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Teleport", 45, "传送:黑幕白字传送完成(开始)"),
                  await n.CgTeleportCompleted?.Promise,
                  await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                    7,
                  ),
                  (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText =
                    !1),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Teleport",
                      45,
                      "传送:黑幕白字传送完成(完成)",
                    );
                break;
              case Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect:
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Teleport",
                    45,
                    "TransitionType.PlayEffect结束",
                  );
                break;
              case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
                this.SeamlessTeleportEnd(),
                  n.SeamlessConfig?.TransitionWeatherDaPath &&
                    (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Teleport",
                        39,
                        "传送:等待后处理混出(开始)",
                      ),
                    await n.PostProcessBlendedOut.Promise,
                    Log_1.Log.CheckInfo()) &&
                    Log_1.Log.Info("Teleport", 39, "传送:等待后处理混出(完成)");
                break;
              case Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen:
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Teleport", 45, "传送:纯黑幕传送完成(开始)"),
                  await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                    7,
                  ),
                  (ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen =
                    !1),
                  (ModelManager_1.ModelManager.GameModeModel.BlackScreenColor =
                    IAction_1.EFadeInScreenShowType.Black),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("Teleport", 45, "传送:纯黑幕传送完成(完成)");
                break;
              default:
                await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                  6,
                );
            }
          else
            await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
              6,
            );
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle:
          l.Option &&
          l.Option.p5n === Protocol_1.Aki.Protocol.p5n.Proto_CenterText
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Teleport", 48, "传送:黑幕白字传送完成(开始)"),
              await n.CgTeleportCompleted?.Promise,
              await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                7,
              ),
              (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText =
                !1),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Teleport", 48, "传送:黑幕白字传送完成(完成)"))
            : await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                6,
              );
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_GravityFlip:
          CameraUtility_1.CameraUtility.ResetFocus(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Teleport", 31, "传送:重力翻转传送完成");
          break;
        default:
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
            6,
          );
      }
      return (
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 20),
        cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CloseLoading"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:通知服务器前处理传送事件(开始)"),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BeforeTeleportComplete,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:通知服务器前处理传送事件(完成)"),
        a &&
          (cpp_1.FKuroPerfSightHelper.BeginExtTag(
            "Teleport.TeleportFinishRequest",
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 29, "传送:通知服务器传送完成(开始)"),
          this.kIo(),
          await n.TeleportFinishRequest.Promise,
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 29, "传送:通知服务器传送完成(完成)"),
          cpp_1.FKuroPerfSightHelper.EndExtTag(
            "Teleport.TeleportFinishRequest",
          )),
        cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.TeleportFinish"),
        InputDistributeController_1.InputDistributeController.RefreshInputTag(),
        (ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee =
          !0),
        (n.IsTeleport = !1),
        TeleportController.OIo(l.TeleportId),
        n.ResetPromise(),
        PerfSightController_1.PerfSightController.MarkLevelLoadCompleted(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:处理完成事件(开始)"),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PlotTeleportToPositionFinished,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TeleportComplete,
          l.TeleportCallSource,
          l.TeleportReason,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:处理完成事件(完成)"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 45, "传送:更新游戏时停状态"),
        ControllerHolder_1.ControllerHolder.GameModeController.ForceDisableGamePaused(
          !1,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:时停解除(完成)", ["Reason", t]),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 29, "传送:完成", ["Reason", t]),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1),
        (ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1),
        cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.TeleportFinish"),
        cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport"),
        !0
      );
    });
    return (
      TaskSystem_1.TaskSystem.AddTask(_),
      TaskSystem_1.TaskSystem.Run(),
      _.Promise
    );
  }
  static zQs(e, o) {
    const r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
        GlobalData_1.GlobalData.World,
        UE.WorldPartitionSubsystem.StaticClass(),
      ),
      t =
        ((TeleportController.jIo = 3e3),
        (TeleportController.$ml = 0),
        TimerSystem_1.TimerSystem.Forever(() => {
          ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid() &&
            (r &&
            e.IsStreamingCompletedForLayers(
              void 0,
              !1,
              ResourceSystem_1.STREAMING_SOURCE_RADIUS,
              !1,
              void 0,
              !1,
            )
              ? ((TeleportController.jIo = 0),
                TimerSystem_1.TimerSystem.Remove(t),
                o.SetResult(!0))
              : ((TeleportController.jIo +=
                  ResourceSystem_1.CHECK_STREAMING_INTERVAL),
                3e3 < TeleportController.jIo &&
                  ((TeleportController.jIo = 0), Log_1.Log.CheckDebug()) &&
                  Log_1.Log.Debug(
                    "Teleport",
                    29,
                    "无加载传送:流送中",
                    ["WorldPartitionSubsystem", r ? "true" : "false"],
                    ["StreamingSource", e.GetOwner().D_K2_GetActorLocation()],
                  ),
                this.Xml(e, ResourceSystem_1.CHECK_STREAMING_INTERVAL)));
        }, ResourceSystem_1.CHECK_STREAMING_INTERVAL));
    return t;
  }
  static Xml(e, o, r = !1) {
    (TeleportController.$ml += o),
      TeleportController.$ml >
        GameModeController_1.LOG_STREAMING_STUCK_INTERVAL &&
        (ControllerHolder_1.ControllerHolder.GameModeController.PrintWorldPartitionDebugInfo(
          e,
          void 0,
          !1,
          ResourceSystem_1.STREAMING_SOURCE_RADIUS,
          r,
        ),
        (TeleportController.$ml = 0));
  }
  static async NIo(e = !1) {
    var o,
      r,
      t = ModelManager_1.ModelManager.TeleportModel;
    ModelManager_1.ModelManager.GameModeModel.UseWorldPartition
      ? (ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid() &&
          !e &&
          ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(
            ModelManager_1.ModelManager.GameModeModel.StreamingSource.D_K2_GetActorLocation(),
            !0,
            !0,
          ),
        (r = e
          ? ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource
          : ModelManager_1.ModelManager.GameModeModel.StreamingSource),
        (o = e ? t.VoxelStreamingCompleted : t.StreamingCompleted),
        (r = r.GetComponentByClass(
          UE.WorldPartitionStreamingSourceComponent.StaticClass(),
        )),
        (t.CheckStreamingCompletedTimerId = this.zQs(r, o)),
        await o.Promise,
        (t.CheckStreamingCompletedTimerId = void 0))
      : (e ? t.VoxelStreamingCompleted : t.StreamingCompleted).SetResult(!0);
  }
  static ZQs(o, r, t, l = !1) {
    var e = o.TargetGrids;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Teleport",
        60,
        "传送:检测参数",
        [
          "dataLayers",
          void 0 !== t && 0 < t.Num() ? t.Get(0).toString() : void 0,
        ],
        [
          "targetGrids",
          void 0 !== e && 0 < e.Num() ? e.Get(0).toString() : void 0,
        ],
      );
    const a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
      GlobalData_1.GlobalData.World,
      UE.WorldPartitionSubsystem.StaticClass(),
    );
    let _ = !1;
    (TeleportController.jIo = 3e3), (TeleportController.$ml = 0);
    const n = TimerSystem_1.TimerSystem.Forever(() => {
      var e = () => {
        (TeleportController.jIo += ResourceSystem_1.CHECK_STREAMING_INTERVAL),
          3e3 < TeleportController.jIo &&
            (a && !a.IsStreamingEnable() && a.SetStreamingEnable(!0),
            (TeleportController.jIo = 0),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "Teleport",
              29,
              "传送:流送中",
              ["WorldPartitionSubsystem", a ? "true" : "false"],
              ["StreamingSource", o.GetOwner().D_K2_GetActorLocation()],
            ),
          this.Xml(o, ResourceSystem_1.CHECK_STREAMING_INTERVAL, _);
      };
      if (a) {
        if (!_) {
          const r = o.IsStreamingCompletedForLayers(
            t,
            !1,
            ResourceSystem_1.STREAMING_SOURCE_RADIUS,
            !1,
            void 0,
            !1,
          );
          if (!r) return void e();
          (_ = l) &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 60, "传送:检测场景物理体(开始)");
        }
        if (_) {
          const r = o.IsStreamingCompletedForLayers(
            t,
            !1,
            ResourceSystem_1.STREAMING_SOURCE_RADIUS,
            !1,
            void 0,
            !0,
          );
          if (!r) return void e();
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 60, "传送:检测场景物理体(完成)");
        }
        (TeleportController.jIo = 0),
          TimerSystem_1.TimerSystem.Remove(n),
          r.SetResult(!0);
      } else e();
    }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
    return n;
  }
  static async HIo(e = !1) {
    var r = ModelManager_1.ModelManager.TeleportModel;
    if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
      var t = r.TargetPosition.ToUeVector();
      let o = void 0;
      if (e) UE.NewSet(UE.BuiltinName).Add(WorldDefine_1.VOXEL_GRID_NAME);
      else {
        o = UE.NewArray(UE.BuiltinName);
        let e =
          ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(
            t,
            !0,
            !0,
          );
        if (e) {
          t = (0, puerts_1.$ref)(void 0);
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(
            GlobalData_1.GlobalData.World,
            e,
            t,
          ),
            o.Add((0, puerts_1.$unref)(t));
        } else
          for (const _ of WorldDefine_1.dataLayerRuntimeHLOD) {
            var l = (0, puerts_1.$ref)(void 0);
            (e = FNameUtil_1.FNameUtil.GetDynamicFName(_)),
              UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(
                GlobalData_1.GlobalData.World,
                e,
                l,
              ),
              o.Add((0, puerts_1.$unref)(l));
          }
      }
      var t = e
          ? ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource
          : ModelManager_1.ModelManager.GameModeModel.StreamingSource,
        a = e ? r.VoxelStreamingCompleted : r.StreamingCompleted,
        t = t.GetComponentByClass(
          UE.WorldPartitionStreamingSourceComponent.StaticClass(),
        );
      (r.CheckStreamingCompletedTimerId = this.ZQs(t, a, o, !e)),
        await a.Promise,
        (r.CheckStreamingCompletedTimerId = void 0);
    } else (e ? r.VoxelStreamingCompleted : r.StreamingCompleted).SetResult(!0);
  }
  static kIo() {
    var e = new Protocol_1.Aki.Protocol.pCs();
    Net_1.Net.Call(28184, e, (e) => {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Teleport",
          29,
          "传送:TeleportFinishRequestSetResult(开始)",
        ),
        ModelManager_1.ModelManager.TeleportModel.TeleportFinishRequest.SetResult(
          !0,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Teleport",
            29,
            "传送:TeleportFinishRequestSetResult(完成)",
          );
    });
  }
  static GIo(e = !0) {
    var o,
      r,
      t,
      l,
      a,
      _ = ModelManager_1.ModelManager.TeleportModel;
    _.TeleportEntityCreatureDataId
      ? this.Fkl(
          _.TeleportEntityCreatureDataId,
          _.TargetPosition,
          _.TargetRotation,
          _.TargetGravityDirect,
        )
      : (r = (o =
            ModelManager_1.ModelManager.SceneTeamModel
              .GetCurrentEntity)?.Entity.GetComponent(3))
        ? (4 !== _.TeleportMode
            ? (r.Actor.CharacterMovement &&
                r.Actor.KuroSetMovementMode({
                  Mode: r.Actor.CharacterMovement.DefaultLandMovementMode,
                  Context: "[TeleportController.SetCurrentEntityAction]",
                }),
              o.Entity.GetComponent(175)?.MainAnimInstance?.SyncAnimStates(
                void 0,
              ),
              r.SetInputRotator(_.TargetRotation),
              r.SetActorRotation(
                _.TargetRotation.ToUeRotator(),
                "TeleportController",
                !1,
              ),
              r.MoveComp?.SetGravityDirectWithoutRotate(_.TargetGravityDirect),
              o.Entity.GetComponent(173)?.ResetCharState(),
              r.TeleportAndFindStandLocation(_.TargetPosition),
              CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
                CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator(),
              ),
              CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(
                e,
              ))
            : (o?.Entity?.GetComponent(175)?.StopModelBuffer(),
              (e = Quat_1.Quat.Create()),
              r.ActorQuatProxy.Inverse(MathUtils_1.MathUtils.CommonTempQuat),
              MathUtils_1.MathUtils.CommonTempQuat.Multiply(
                CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.Quaternion(),
                e,
              ),
              (t = Quat_1.Quat.Create()),
              _.TargetRotation.Quaternion().Multiply(e, t),
              (l = Vector_1.Vector.Create()),
              r.ActorQuatProxy.Inverse(MathUtils_1.MathUtils.CommonTempQuat),
              MathUtils_1.MathUtils.CommonTempQuat.RotateVector(
                r.ActorVelocityProxy,
                l,
              ),
              (a = Vector_1.Vector.Create()),
              _.TargetRotation.Quaternion().RotateVector(l, a),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Teleport",
                  39,
                  "无缝传送:计算传送后信息",
                  ["角色当前旋转", r.ActorRotationProxy],
                  ["角色目标旋转", _.TargetRotation],
                  [
                    "相机当前旋转",
                    CameraController_1.CameraController.FightCamera
                      .LogicComponent.CameraRotation,
                  ],
                  ["相机目标旋转", t.Rotator()],
                  ["相机相对角色旋转", e.Rotator()],
                ),
              r.SetInputRotator(_.TargetRotation),
              r.SetActorRotation(
                _.TargetRotation.ToUeRotator(),
                "TeleportController",
                !1,
              ),
              r.MoveComp?.SetGravityDirectWithoutRotate(_.TargetGravityDirect),
              r.TeleportAndFindStandLocation(_.TargetPosition),
              r.MoveComp.SetForceSpeed(a),
              CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
                t.Rotator().ToUeRotator(),
              ),
              CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(
                !1,
                !0,
              )),
          EventSystem_1.EventSystem.EmitWithTarget(
            o.Entity,
            EventDefine_1.EEventName.TeleportChangeLocation,
          ),
          RoleTriggerController_1.RoleTriggerController.UpdateTransform(),
          (TeleportController.WIo = TimerSystem_1.TimerSystem.Delay(() => {
            (ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = !1),
              (TeleportController.WIo = void 0);
          }, SKIP_FALL_INJURE_TIME)),
          1 === _.CallSource &&
            DeadReviveController_1.DeadReviveController.PlayerReviveEnded(),
          o.Entity.GetComponent(189)?.ResetDrowning())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Teleport", 29, "传送:失败,找不到当前实体");
  }
  static KIo(e) {
    var o;
    return ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      (Global_1.Global.BaseCharacter?.IsValid() &&
        ((o = Global_1.Global.BaseCharacter.CharacterActorComponent),
        (o = UE.VectorDouble.Dist(o.ActorLocation, e)),
        (e = CommonParamById_1.configCommonParamById.GetIntConfig(
          "TeleportRatingRange",
        )
          ? CommonParamById_1.configCommonParamById.GetIntConfig(
              "TeleportRatingRange",
            )
          : DISTANCE_THRESHOLD_1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("LevelEvent", 45, "QueryDefaultTeleportMode", [
            "threshold",
            e,
          ]),
        o < e))
      ? 3
      : 2;
  }
  static OIo(e) {
    e &&
      (e =
        ConfigManager_1.ConfigManager.WorldMapConfig.GetTeleportEntityConfigId(
          e,
        )) &&
      (e =
        ModelManager_1.ModelManager.CreatureModel?.GetEntityData(e)?.AreaId) &&
      (ModelManager_1.ModelManager.AreaModel.GetArea(e)
        ? e === ModelManager_1.ModelManager.AreaModel.AreaInfo?.AreaId &&
          ModelManager_1.ModelManager.AreaModel.SetAreaName(e, !0)
        : ModelManager_1.ModelManager.AreaModel.AddWatchArea(e));
  }
  static OnLeaveLevel() {
    return (
      (TeleportController.jIo = 0),
      ModelManager_1.ModelManager.TeleportModel
        .CheckStreamingCompletedTimerId &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Teleport", 29, "传送:终止,离开关卡"),
        TimerSystem_1.TimerSystem.Has(
          ModelManager_1.ModelManager.TeleportModel
            .CheckStreamingCompletedTimerId,
        )) &&
        TimerSystem_1.TimerSystem.Remove(
          ModelManager_1.ModelManager.TeleportModel
            .CheckStreamingCompletedTimerId,
        ),
      (ModelManager_1.ModelManager.TeleportModel.CheckStreamingCompletedTimerId =
        void 0),
      (ModelManager_1.ModelManager.TeleportModel.CheckPhysicsCompletedTimerId =
        void 0),
      ModelManager_1.ModelManager.TeleportModel.VoxelStreamingCompleted?.SetResult(
        !0,
      ),
      ModelManager_1.ModelManager.TeleportModel.StreamingCompleted?.SetResult(
        !0,
      ),
      !0
    );
  }
  static FIo(e, o, r = !1) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Teleport", 45, "传送:CG传送开始(视频)"),
      (ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = !0),
      VideoLauncher_1.VideoLauncher.ShowVideoCg(e, o, void 0, void 0, r);
  }
  static async TeleportWithCenterTextStart(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Teleport", 45, "传送:CG传送开始(黑幕白字)"),
      (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = !0),
      e
        ? (ModelManager_1.ModelManager.PlotModel.PlayFlow =
            new PlotData_1.PlotFlow(e.v5n, e.M5n, e.S5n))
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 45, "transitionFlow为空"),
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
        7,
        0,
      ),
      ModelManager_1.ModelManager.PlotModel.ShowCenterTextForTeleport();
  }
  static SetNeedRenderKuroToonDepth() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.kuro.NeedRenderKuroToonDepth 1",
    );
  }
  static UnsetNeedRenderKuroToonDepth() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.kuro.NeedRenderKuroToonDepth 0",
    );
  }
  static SeamlessTeleportStart() {
    const r = ModelManager_1.ModelManager.TeleportModel;
    (r.IsInSeamlessTeleport = !0),
      (r.Treadmill = new SeamlessTravelTreadmill_1.SeamlessTravelTreadmill()),
      r.Treadmill.Init(r.SeamlessConfig, (e) => {
        r.TreadmillLoaded?.SetResult(e);
        e = Vector_1.Vector.Create();
        r.SeamlessConfig?.IsTeleportInPlace
          ? e.DeepCopy(r.StartPosition)
          : (e.DeepCopy(r.TargetPosition),
            (e.Z +=
              SeamlessTravelTreadmill_1.DEFAULT_SEAMLESS_TRANSITION_HEIGHT)),
          r.Treadmill.ResetLockOnLocation(e, r.StartGravityDirect);
      }),
      r.SeamlessConfig?.TransitionWeatherDaPath &&
        ((r.PostProcess =
          new SeamlessTravelPostProcess_1.SeamlessTravelPostProcess()),
        r.PostProcess.Init(r.SeamlessConfig, (e) => {
          e
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Teleport", 50, "传送:后处理混入(开始)"),
              r.PostProcess?.AppearEffect((e) => {
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Teleport", 50, "传送:后处理混入(完成)"),
                  r.PostProcessBlendedIn?.SetResult(e);
              }))
            : r.PostProcessBlendedIn?.SetResult(!1);
        })),
      r.SeamlessConfig?.EffectPath
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            r.SeamlessConfig.EffectPath,
            UE.EffectScreenPlayData_C,
            (e, o) => {
              e?.IsValid()
                ? ((ModelManager_1.ModelManager.TeleportModel.SeamlessEffectData =
                    e),
                  this.SetNeedRenderKuroToonDepth(),
                  ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
                    e,
                  ),
                  TimerSystem_1.TimerSystem.Delay(
                    () => {
                      ModelManager_1.ModelManager.TeleportModel.EffectFillScreen.SetResult(
                        !0,
                      );
                    },
                    (r.SeamlessConfig?.EffectExpandTime ?? 1) *
                      MathUtils_1.MathUtils.SecondToMillisecond,
                  ))
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Teleport", 50, "加载无缝传送特效失败", [
                      "Path",
                      o,
                    ]),
                  ModelManager_1.ModelManager.TeleportModel.EffectFillScreen.SetResult(
                    !1,
                  ));
            },
            102,
          )
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Teleport", 50, "没有配置无缝传送特效路径"),
          ModelManager_1.ModelManager.TeleportModel.EffectFillScreen.SetResult(
            !1,
          )),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
        4,
        [12, 23],
      );
  }
  static SeamlessTeleportEnd() {
    const o = ModelManager_1.ModelManager.TeleportModel;
    var e;
    o.IsInSeamlessTeleport &&
      ((e = o.SeamlessEffectData),
      ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(e),
      o.SeamlessConfig?.TransitionWeatherDaPath &&
        (o.PostProcess
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Teleport", 50, "传送:后处理混出(开始)"),
            o.PostProcess.DisappearEffect((e) => {
              o.PostProcess?.Destroy(),
                (o.PostProcess = void 0),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Teleport", 50, "传送:后处理混出(完成)"),
                o.PostProcessBlendedOut?.SetResult(e);
            }))
          : o.PostProcessBlendedOut?.SetResult(!1)),
      (o.SeamlessEndHandle = TimerSystem_1.TimerSystem.Delay(() => {
        this.FinishSeamlessTeleport(), this.UnsetNeedRenderKuroToonDepth();
      }, o.SeamlessConfig.EffectCollapseTime * MathUtils_1.MathUtils.SecondToMillisecond)));
  }
  static FinishSeamlessTeleport() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI,
    ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(4),
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    var e = ModelManager_1.ModelManager.TeleportModel;
    e.IsInSeamlessTeleport &&
      (e.Treadmill.Destroy(),
      (e.Treadmill = void 0),
      (e.SeamlessEffectData = void 0),
      (e.SeamlessEndHandle = void 0),
      (e.IsInSeamlessTeleport = !1),
      (e.SeamlessConfig = void 0));
  }
  static ParseTeleportTransitionOptionToPb(e) {
    var o,
      r = Protocol_1.Aki.Protocol.t4s.create();
    switch (e?.Type) {
      case IAction_1.ETeleportTransitionType.PlayMp4:
        (r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4),
          (r.q$_.y5n = e.Mp4Path);
        break;
      case IAction_1.ETeleportTransitionType.PlayEffect:
        (r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect),
          (r.q$_.y5n = e.EffectDaPath);
        break;
      case IAction_1.ETeleportTransitionType.CenterText:
        (r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_CenterText),
          (r.E5n = Protocol_1.Aki.Protocol.M4s.create()),
          (r.E5n.M5n = e.CenterTextFlow.FlowId),
          (r.E5n.v5n = e.CenterTextFlow.FlowListName),
          (r.E5n.S5n = e.CenterTextFlow.StateId);
        break;
      case IAction_1.ETeleportTransitionType.Seamless:
        (r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_Seamless),
          (r.R$s = Protocol_1.Aki.Protocol.w$s.create()),
          (r.R$s.$n1 = !!e.IsTeleportInPlace),
          (r.R$s.Wn1 = e.TransitionWeatherDaPath),
          (r.R$s.D$s = e.EffectDaPath),
          (r.R$s.A$s = e.LeastTime),
          (r.R$s.U$s = e.EffectExpandTime),
          (r.R$s.P$s = e.EffectCollapseTime),
          (r.R$s.cta = !!e.FloorSettings),
          e.FloorSettings &&
            (((o = Protocol_1.Aki.Protocol.Eta.create()).Cta =
              e.FloorSettings.MaterialPath),
            (o.mta = e.FloorSettings.MeshPath),
            (o.gta = e.FloorSettings.Scale.X ?? 1),
            (o.fta = e.FloorSettings.Scale.Y ?? 1),
            (o.vta = e.FloorSettings.ShowTime),
            (o.pta = e.FloorSettings.DisappearTime),
            (r.R$s.dta = o));
        break;
      case IAction_1.ETeleportTransitionType.FadeInScreen:
        (r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen),
          (r.EIl =
            e.ScreenType === IAction_1.EFadeInScreenShowType.Black ? 1 : 0);
        break;
      default:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_Empty;
    }
    return r;
  }
  static TeleportVehicle(e, o, r, t, l = !1, a = void 0, _ = void 0) {
    o
      ? ((o = new TeleportDefine_1.TeleportContext(a, void 0, 0, void 0, _)),
        l && this.QueryCanTeleportNoLoading(r)
          ? TeleportController.wIo(
              r,
              t.ToUeRotator(),
              void 0,
              "TeleportVehicle",
              o,
              !0,
              !0,
              e,
            )
          : ((ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1),
            TeleportController.BIo(
              r,
              t.ToUeRotator(),
              void 0,
              "TeleportVehicle",
              o,
              !0,
              e,
            )))
      : this.Fkl(e, r, t, Vector_1.Vector.DownVectorProxy);
  }
  static Fkl(e, o, r, t) {
    var l,
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    a?.Valid
      ? ((l =
          ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(
            a,
          )).SetActorRotation(r.ToUeRotator(), "ResetLocationForZRangeNotify"),
        l.MoveComp?.SetGravityDirectWithoutRotate(t),
        (r = Vector_1.Vector.Create(o)),
        (t = a.Entity.GetComponent(3))
          ? t.FixBornLocation("ResetLocationForZRangeNotify", !0, r, !1, !0)
          : l.SetActorLocation(
              r.ToUeVector(),
              "ResetLocationForZRangeNotify",
              !1,
            ),
        l.MoveComp?.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy),
        a.Entity.GetComponent(66)?.ClearReplaySamples(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            14,
            "传送载具：设置载具实体位置",
            ["CreatureDataId", a.CreatureDataId],
            ["PbDataId", a.PbDataId],
            ["EntityId", a.Entity.Id],
            ["Location", r.ToString()],
          ))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 48, "传送载具：实体已无效", [
          "CreatureDataId",
          e,
        ]);
  }
  static H6c(e, o, r) {
    switch (e.p5n) {
      case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 0;
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
        (ModelManager_1.ModelManager.TeleportModel.TeleportMode = 4),
          ModelManager_1.ModelManager.TeleportModel.SeamlessEndHandle &&
            (TimerSystem_1.TimerSystem.Remove(
              ModelManager_1.ModelManager.TeleportModel.SeamlessEndHandle,
            ),
            (ModelManager_1.ModelManager.TeleportModel.SeamlessEndHandle =
              void 0)),
          (ModelManager_1.ModelManager.TeleportModel.SeamlessConfig =
            new SeamlessTravelDefine_1.SeamlessTravelContext()),
          ModelManager_1.ModelManager.TeleportModel.SeamlessConfig.ParseConfig(
            o.Option.R$s,
          );
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_WithCharacterDisplay:
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
        break;
      default:
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = this.KIo(r);
    }
  }
}
(exports.TeleportController = TeleportController),
  ((_a = TeleportController).jIo = 0),
  (TeleportController.$ml = 0),
  (TeleportController.WIo = void 0),
  (TeleportController.xIo = void 0),
  (TeleportController.qIo = () => {
    TeleportController.WIo &&
      (TimerSystem_1.TimerSystem.Remove(TeleportController.WIo),
      (TeleportController.WIo = void 0)),
      (ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = !0);
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    e?.Valid &&
      (e = e.Entity.GetComponent(3))?.Valid &&
      e.Actor?.IsValid() &&
      e.Actor.CharacterMovement?.IsValid() &&
      e.Actor.KuroSetMovementMode({
        Mode: 0,
        Context: "[TeleportController.PreventEntityPreTeleportFromFalling]",
      });
  }),
  (TeleportController.AIo = (e) => {
    var o = e.cvs,
      r = e.f5n,
      t =
        ((ModelManager_1.ModelManager.TeleportModel.DisableAutoFade = e.FI_),
        ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId),
      l = new TeleportDefine_1.TeleportContext(
        e.x9n,
        t,
        void 0,
        o ? o.fvs : void 0,
        r,
      );
    const a = e.l9_
      ? Vector_1.Vector.Create(e.l9_).ToUeVector()
      : Vector_1.Vector.ZeroVectorDouble;
    var t = e.g8n
        ? Rotator_1.Rotator.Create(e.g8n.Y, e.g8n.Z, e.g8n.X).ToUeRotator()
        : Rotator_1.Rotator.ZeroRotator,
      _ = e.ZE_
        ? Vector_1.Vector.Create(e.ZE_)
        : Vector_1.Vector.DownVectorProxy;
    let n = "";
    try {
      n = JSON.stringify(o);
    } catch {
      n = "Context序列化解析失败";
    }
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "LevelEvent",
          7,
          "服务端驱动执行传送",
          ["Context", n],
          ["Pos", e.l9_],
          ["Rot", e.g8n],
          ["Gravity", e.ZE_],
          ["Reason", e.x9n],
        ),
      ModelManager_1.ModelManager.TeleportModel.IsTeleport)
    )
      (TeleportController.xIo = e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Teleport", 29, "传送: 传送中，缓存TeleportNotify", [
            "被缓存传送的传送原因",
            l.TeleportReason,
          ]);
    else {
      switch (((TeleportController.xIo = void 0), l.TeleportReason)) {
        case Protocol_1.Aki.Protocol.v4s.SL_:
        case Protocol_1.Aki.Protocol.v4s.Xvs:
          r && 0 !== r.p5n
            ? _a.H6c(r, l, a)
            : (ModelManager_1.ModelManager.TeleportModel.TeleportMode =
                _a.KIo(a));
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_Transfer:
          r && 0 !== r.p5n
            ? _a.H6c(r, l, a)
            : (ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1);
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_BtRollbackFailed:
          r?.p5n === Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen
            ? (ModelManager_1.ModelManager.TeleportModel.TeleportMode = 3)
            : (ModelManager_1.ModelManager.TeleportModel.TeleportMode =
                _a.KIo(a));
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_Drown:
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2;
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_Fall:
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 3;
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_FlowStart:
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2;
          break;
        default:
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
      }
      WorldController_1.WorldController.StartWorldOriginInLoadingMode(
        "Teleport",
      ),
        TeleportController.TeleportToPosition(
          a,
          t,
          _,
          "OnTeleportNotify",
          l,
        ).finally(() => {
          (ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1),
            WorldController_1.WorldController.EndWorldOriginInLoadingMode(
              "Teleport",
              a,
            );
        }),
        (ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId =
          void 0);
    }
  }),
  (TeleportController.Hlh = () => {
    ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId =
      void 0;
  }),
  (TeleportController.S3l = (e) => {
    ModelManager_1.ModelManager.PlayerInfoModel?.GetId() !== e.W5n &&
      GenericPromptController_1.GenericPromptController.ShowPromptByItsType(
        27,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        e.NI_,
      );
  }),
  (TeleportController.P$_ = (o) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Teleport", 45, "收到上线播放CG请求", ["Name", o.x$_]),
      (Protocol_1.Aki.Protocol.D$_.create().x$_ = o.x$_),
      LevelLoadingController_1.LevelLoadingController.OpenLoading(7, 2),
      _a.FIo(o.x$_, () => {
        var e = Protocol_1.Aki.Protocol.D$_.create();
        (e.x$_ = o.x$_),
          Net_1.Net.Call(18061, e, (e) => {
            (e && e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) ||
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Teleport", 45, "播放CG完成请求失败", [
                  "ErrorCode",
                  e.Cvs,
                ])),
              ModelManager_1.ModelManager.TeleportModel.CgTeleportCompleted?.SetResult(
                !0,
              ),
              ModelManager_1.ModelManager.GameModeModel.VideoStartPromise?.SetResult(
                !0,
              ),
              LevelLoadingController_1.LevelLoadingController.CloseLoading(7);
          });
      });
  }),
  (TeleportController.PIo = (e) => {
    ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim = !1;
  }),
  (TeleportController.Nkl = (e) => {
    var o, r, t, l;
    e.P5n
      ? ((o = MathUtils_1.MathUtils.LongToNumber(e.HI_)),
        (r = 0 < e.VI_.length),
        (t = new UE.VectorDouble(e.P5n.X, e.P5n.Y, e.P5n.Z)),
        (l = Rotator_1.Rotator.Create(
          e.g8n?.Pitch ?? 0,
          e.g8n?.Yaw ?? 0,
          e.g8n?.Roll ?? 0,
        )),
        _a.TeleportVehicle(o, r, t, l, e.$I_, e.x9n))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Teleport", 18, "传送载具：目标位置错误");
  });
//# sourceMappingURL=TeleportController.js.map
