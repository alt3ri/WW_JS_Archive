"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../Camera/CameraController"),
  CameraUtility_1 = require("../../Camera/CameraUtility"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PerfSightController_1 = require("../../PerfSight/PerfSightController"),
  ScreenEffectSystem_1 = require("../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  WorldDefine_1 = require("../../World/Define/WorldDefine"),
  AsyncTask_1 = require("../../World/Task/AsyncTask"),
  TaskSystem_1 = require("../../World/Task/TaskSystem"),
  AreaController_1 = require("../Area/AreaController"),
  DeadReviveController_1 = require("../DeadRevive/DeadReviveController"),
  LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
  PlotData_1 = require("../Plot/PlotData"),
  RoleController_1 = require("../RoleUi/RoleController"),
  TeleportDefine_1 = require("../Teleport/TeleportDefine"),
  VideoLauncher_1 = require("../Video/VideoLauncher"),
  DISTANCE_THRESHOLD_1 = 3e3,
  DISTANCE_THRESHOLD_2 = MathUtils_1.MathUtils.MaxFloat,
  SKIP_FALL_INJURE_TIME = 1e3;
class TeleportController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(27457, this.AIo),
      Net_1.Net.Register(6459, this.PIo),
      !0
    );
  }
  static OnClear() {
    return Net_1.Net.UnRegister(27457), Net_1.Net.UnRegister(6459), !0;
  }
  static OnTick(e) {
    ModelManager_1.ModelManager.TeleportModel.IsTeleport ||
      (void 0 !== TeleportController.xIo && this.AIo(TeleportController.xIo));
  }
  static CheckCanTeleport() {
    return !RoleController_1.RoleController.IsInRoleTrial();
  }
  static async TeleportToPositionNoLoading(e, o, r) {
    return Global_1.Global.BaseCharacter?.IsValid()
      ? this.QueryCanTeleportNoLoading(e)
        ? this.wIo(e, o, r, void 0, 0)
        : ((ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2),
          this.BIo(e, o, r, new TeleportDefine_1.TeleportContext()))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Teleport", 30, "无加载传送:失败,找不到当前玩家", [
            "Reason",
            r,
          ]),
        !1);
  }
  static QueryCanTeleportNoLoading(e) {
    var o = Global_1.Global.BaseCharacter;
    return o?.IsValid()
      ? UE.Vector.Dist(o.CharacterActorComponent.ActorLocation, e) <
          (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
          !ModelManager_1.ModelManager.GameModeModel.UseWorldPartition
            ? DISTANCE_THRESHOLD_2
            : DISTANCE_THRESHOLD_1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Teleport",
            30,
            "查询是否可以无加载传送:失败,找不到当前玩家",
          ),
        !1);
  }
  static async TeleportToPosition(e, o, r, t) {
    Global_1.Global.BaseCharacter?.IsValid() ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Teleport",
          30,
          "传送:传送时无主角，建议调整配置，避免在切换编队过程中传送",
          ["Reason", r],
        ));
    let l = t;
    return (((l = l || new TeleportDefine_1.TeleportContext())
      .TeleportReason === Protocol_1.Aki.Protocol.u4s.Proto_Action ||
      l.TeleportReason === Protocol_1.Aki.Protocol.u4s.Vvs) &&
      ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) ||
      (l.TeleportReason === Protocol_1.Aki.Protocol.u4s.Proto_Gm &&
        ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot())
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Teleport",
            40,
            "传送:遇到不应执行传送的情况，使用伪传送替代",
            ["TeleportReason", l.TeleportReason],
            ["Reason", r],
          ),
        TeleportController.bIo(l, r))
      : TeleportController.BIo(e, o, r, l);
  }
  static SendTeleportTransferRequest(e) {
    (ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkItem = e),
      this.SendTeleportTransferRequestById(e.MarkConfigId);
  }
  static SendTeleportTransferRequestById(e) {
    (ModelManager_1.ModelManager.GameModeModel.IsTeleport = !0),
      ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
        "SendTeleportTransferRequestById",
      );
    e = Protocol_1.Aki.Protocol.aCs.create({ J4n: e });
    Net_1.Net.Call(12463, e, (e) => {
      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
        "SendTeleportTransferRequestById",
      ),
        GlobalData_1.GlobalData.World
          ? e.O4n !==
              Protocol_1.Aki.Protocol.O4n
                .Proto_ErrPlayerIsTeleportCanNotDoTeleport &&
            e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
            ((ModelManager_1.ModelManager.GameModeModel.IsTeleport = !1),
            (ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkItem =
              void 0),
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              16509,
            ))
          : ((ModelManager_1.ModelManager.GameModeModel.IsTeleport = !1),
            (ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkItem =
              void 0));
    });
  }
  static async wIo(e, o, r, t, l = 0) {
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    let _ = void 0;
    a && (_ = a.Entity.GetComponent(3));
    const n = ModelManager_1.ModelManager.TeleportModel;
    if (n.IsTeleport)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Teleport", 30, "无加载传送:重复调用,正在传送中", [
            "Reason",
            r,
          ]),
        !1
      );
    (n.CallSource = l),
      _?.Valid &&
        (n.StartPosition.DeepCopy(_.ActorLocationProxy),
        n.StartRotation.DeepCopy(_.ActorRotationProxy)),
      n.TargetPosition.DeepCopy(e),
      o
        ? (n.TargetRotation.DeepCopy(o), (n.TargetRotation.Pitch = 0))
        : ((n.TargetRotation.Pitch = 0),
          _?.Valid
            ? (n.TargetRotation.Yaw = _.ActorRotationProxy.Yaw)
            : (n.TargetRotation.Yaw = 0)),
      (n.TargetRotation.Roll = 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Teleport",
          30,
          "无加载传送:开始",
          ["开始位置", _.ActorLocationProxy],
          ["目标位置", e],
          ["开始角度", _.ActorRotationProxy.Yaw],
          ["目标角度", o],
          ["Reason", r],
        ),
      (n.IsTeleport = !0),
      (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 2),
      (ModelManager_1.ModelManager.GameModeModel.IsTeleport = !0),
      ModelManager_1.ModelManager.GameModeModel.SetBornInfo(e, o),
      ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
        "TeleportToPositionNoLoadingImpl",
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 30, "无加载传送:处理开始事件(开始)"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TeleportStart,
        !1,
      ),
      a?.Valid &&
        EventSystem_1.EventSystem.EmitWithTarget(
          a.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
        ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 30, "无加载传送:处理开始事件(完成)"),
      this.qIo(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 30, "无加载传送:设置角色状态(开始)"),
      TeleportController.GIo(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 30, "无加载传送:设置角色状态(完成)"),
      (ModelManager_1.ModelManager.GameModeModel.IsTeleport = !1),
      n.CreatePromise();
    r = new AsyncTask_1.AsyncTask(
      "TeleportToPositionNoLoadingImpl",
      async () => (
        (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
          !ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) ||
          ((ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 30, "无加载传送:检测体素流送(开始)"),
          await this.NIo(!0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 30, "无加载传送:检测体素流送(完成)"),
          (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 12),
          (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 30, "无加载传送:检测场景流送(开始)"),
          await this.NIo(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Teleport", 30, "无加载传送:检测场景流送(完成)"),
          (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14)),
        ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
          "TeleportToPositionNoLoadingImpl",
        ),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15),
        ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(
          Protocol_1.Aki.Protocol.xks.Proto_Normal,
        ),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16),
        n.ResetPromise(),
        (n.IsTeleport = !1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "无加载传送:处理完成事件(开始)"),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TeleportComplete,
          l,
        ),
        TeleportController.OIo(t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "无加载传送:处理完成事件(完成)"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "无加载传送:完成"),
        !0
      ),
    );
    return (
      TaskSystem_1.TaskSystem.AddTask(r),
      TaskSystem_1.TaskSystem.Run(),
      r.Promise
    );
  }
  static async bIo(e, o) {
    const r = ModelManager_1.ModelManager.TeleportModel;
    if (r.IsTeleport)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Teleport", 40, "伪传送:无法调用,正在传送中", [
            "Reason",
            o,
          ]),
        !1
      );
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Teleport",
        40,
        "伪传送:开始",
        ["原因", e.TeleportReason],
        ["Reason", o],
      ),
      (r.IsTeleport = !0);
    var t = new AsyncTask_1.AsyncTask(
      "FakeTeleportToPositionImpl",
      async () => (
        r.CreatePromise(),
        e.TeleportReason === Protocol_1.Aki.Protocol.u4s.Proto_Gm &&
          (await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
            7,
          )),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 40, "伪传送:通知服务器传送完成(开始)"),
        this.kIo(),
        await r.TeleportFinishRequest.Promise,
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 40, "伪传送:通知服务器传送完成(完成)"),
        r.ResetPromise(),
        (r.IsTeleport = !1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 40, "伪传送:完成", ["Reason", o]),
        !0
      ),
    );
    return (
      TaskSystem_1.TaskSystem.AddTask(t),
      TaskSystem_1.TaskSystem.Run(),
      t.Promise
    );
  }
  static async BIo(o, e, r, t) {
    var l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    let a = void 0;
    l && (a = l.Entity.GetComponent(3));
    const _ = ModelManager_1.ModelManager.TeleportModel;
    if (_.IsTeleport)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Teleport", 30, "传送:重复调用,正在传送中", [
            "Reason",
            r,
          ]),
        !1
      );
    switch (
      ((_.CallSource = t.TeleportCallSource),
      a?.Valid &&
        (_.StartPosition.DeepCopy(a.ActorLocationProxy),
        _.StartRotation.DeepCopy(a.ActorRotationProxy)),
      _.TargetPosition.DeepCopy(o),
      e
        ? (_.TargetRotation.DeepCopy(e), (_.TargetRotation.Pitch = 0))
        : ((_.TargetRotation.Pitch = 0),
          a?.Valid
            ? (_.TargetRotation.Yaw = a.ActorRotationProxy.Yaw)
            : (_.TargetRotation.Yaw = 0)),
      (_.TargetRotation.Roll = 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Teleport",
          30,
          "传送:开始",
          ["开始位置", _.StartPosition],
          ["目标位置", _.TargetPosition],
          ["开始角度", _.StartRotation.Yaw],
          ["目标角度", _.TargetRotation.Yaw],
          ["原因", t.TeleportReason],
          ["传送类型", t.CtxType],
          ["Reason", r],
        ),
      (_.IsTeleport = !0),
      ModelManager_1.ModelManager.GameModeModel.SetBornInfo(o, e),
      (ModelManager_1.ModelManager.GameModeModel.IsTeleport = !0),
      (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 2),
      ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
        "TeleportToPositionImpl",
      ),
      (ModelManager_1.ModelManager.GameModeModel.RenderAssetDone = !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 30, "传送:处理开始事件(开始)", [
          "Reason",
          r,
        ]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TeleportStart,
        !0,
      ),
      l?.Valid &&
        EventSystem_1.EventSystem.EmitWithTarget(
          l.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
        ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Teleport", 30, "传送:处理开始事件(完成)"),
      _.CreatePromise(),
      (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 3),
      t.TeleportReason)
    ) {
      case Protocol_1.Aki.Protocol.u4s.Proto_Fall:
      case Protocol_1.Aki.Protocol.u4s.Proto_Rouge:
        break;
      case Protocol_1.Aki.Protocol.u4s.Proto_Action:
      case Protocol_1.Aki.Protocol.u4s.Vvs:
        if (t.Option)
          switch (t.Option.l5n) {
            case Protocol_1.Aki.Protocol.l5n.Proto_PlayMp4:
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Teleport", 46, "TransitionType.PlayMp4开始"),
                this.FIo(t.Option.d5n);
              break;
            case Protocol_1.Aki.Protocol.l5n.Proto_CenterText:
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Teleport", 46, "TransitionType.CenterText开始"),
                this.TeleportWithCenterTextStart(t.Option.m5n);
              break;
            case Protocol_1.Aki.Protocol.l5n.Proto_PlayEffect:
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Teleport", 46, "TransitionType.PlayEffect开始"),
                "" !== t.Option.d5n &&
                  ResourceSystem_1.ResourceSystem.LoadAsync(
                    t.Option.d5n,
                    UE.EffectScreenPlayData_C,
                    (e) => {
                      ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
                        e,
                      );
                    },
                    102,
                  );
              break;
            default:
              await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
                7,
                _.TeleportMode,
              );
          }
        else
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
            7,
            _.TeleportMode,
          );
        break;
      default:
        await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
          7,
          _.TeleportMode,
        );
    }
    ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
      GlobalData_1.GlobalData.World,
      r,
    ),
      (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 4),
      (2 !== ModelManager_1.ModelManager.TeleportModel.TeleportMode &&
        1 !== ModelManager_1.ModelManager.TeleportModel.TeleportMode) ||
        ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
          !1,
        ),
      this.qIo(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.qIo,
      );
    e = new AsyncTask_1.AsyncTask("TeleportToPositionImpl", async () => {
      PerfSightController_1.PerfSightController.StartPersistentOrDungeon(!1),
        UE.PerfSightHelper.BeginExtTag("Teleport"),
        UE.PerfSightHelper.BeginExtTag("Teleport.CheckVoxelStreaming"),
        ControllerHolder_1.ControllerHolder.GameModeController.ForceDisableGamePaused(
          !0,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:时停解除(开始)", ["Reason", r]);
      var e =
        2 === ModelManager_1.ModelManager.TeleportModel.TeleportMode ||
        1 === ModelManager_1.ModelManager.TeleportModel.TeleportMode;
      switch (
        ((ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:检测体素流送(开始)"),
        e &&
          ControllerHolder_1.ControllerHolder.WorldController.ManuallyClearStreamingPool(),
        await this.HIo(!0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:检测体素流送(完成)"),
        UE.PerfSightHelper.EndExtTag("Teleport.CheckVoxelStreaming"),
        UE.PerfSightHelper.BeginExtTag("Teleport.CheckStreaming"),
        e &&
          ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
            !1,
          ),
        ControllerHolder_1.ControllerHolder.GameModeController.AddOrRemoveRenderAssetsQueryViewInfo(
          o,
          ResourceSystem_1.WAIT_RENDER_ASSET_DURATION,
        ),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 7, "传送:检测场景流送(开始)"),
        await this.HIo(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 7, "传送:检测场景流送(完成)"),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14),
        UE.PerfSightHelper.EndExtTag("Teleport.CheckStreaming"),
        UE.PerfSightHelper.BeginExtTag("Teleport.CheckRenderAssets"),
        e &&
          (ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
            !1,
          ),
          ControllerHolder_1.ControllerHolder.WorldController.ManuallyResetStreamingPool()),
        ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
          "TeleportToPositionImpl",
        ),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15),
        ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(
          Protocol_1.Aki.Protocol.xks.Proto_Normal,
        ),
        await ControllerHolder_1.ControllerHolder.GameModeController.CheckRenderAssetsStreamingCompleted(
          o,
          "传送:",
        ),
        UE.PerfSightHelper.EndExtTag("Teleport.CheckRenderAssets"),
        UE.PerfSightHelper.BeginExtTag("Teleport.LoadTeam"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:等待编队加载(开始)"),
        await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise
          ?.Promise,
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:等待编队加载(完成)"),
        UE.PerfSightHelper.EndExtTag("Teleport.LoadTeam"),
        UE.PerfSightHelper.BeginExtTag("Teleport.CloseLoading"),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnUpdateSceneTeam,
          this.qIo,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:设置角色状态(开始)"),
        TeleportController.GIo(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:设置角色状态(完成)"),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16),
        (ModelManager_1.ModelManager.GameModeModel.IsTeleport = !1),
        ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
          GlobalData_1.GlobalData.World,
          r,
        ),
        e &&
          ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
            !1,
          ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.FixBornLocation,
        ),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 19),
        t.TeleportReason)
      ) {
        case Protocol_1.Aki.Protocol.u4s.Proto_Fall:
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
            1,
          );
          break;
        case Protocol_1.Aki.Protocol.u4s.Proto_Action:
        case Protocol_1.Aki.Protocol.u4s.Vvs:
          if (t.Option)
            switch (t.Option.l5n) {
              case Protocol_1.Aki.Protocol.l5n.Proto_PlayMp4:
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Teleport", 46, "传送:CG传送完成(开始)"),
                  await _.CgTeleportCompleted?.Promise,
                  await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                    8,
                  ),
                  (ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 =
                    !1),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("Teleport", 46, "传送:CG传送完成(完成)");
                break;
              case Protocol_1.Aki.Protocol.l5n.Proto_CenterText:
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Teleport", 46, "传送:黑幕白字传送完成(开始)"),
                  await _.CgTeleportCompleted?.Promise,
                  await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                    8,
                  ),
                  (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText =
                    !1),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Teleport",
                      46,
                      "传送:黑幕白字传送完成(完成)",
                    );
                break;
              case Protocol_1.Aki.Protocol.l5n.Proto_PlayEffect:
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Teleport",
                    46,
                    "TransitionType.PlayEffect结束",
                  );
                break;
              default:
                await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                  7,
                );
            }
          else
            await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
              7,
            );
          break;
        default:
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
            7,
          );
      }
      return (
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 20),
        UE.PerfSightHelper.EndExtTag("Teleport.CloseLoading"),
        UE.PerfSightHelper.BeginExtTag("Teleport.TeleportFinishRequest"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:通知服务器传送完成(开始)"),
        this.kIo(),
        await _.TeleportFinishRequest.Promise,
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:通知服务器传送完成(完成)"),
        UE.PerfSightHelper.EndExtTag("Teleport.TeleportFinishRequest"),
        UE.PerfSightHelper.BeginExtTag("Teleport.TeleportFinish"),
        InputDistributeController_1.InputDistributeController.RefreshInputTag(),
        (_.IsTeleport = !1),
        TeleportController.OIo(t.TeleportId),
        _.ResetPromise(),
        PerfSightController_1.PerfSightController.MarkLevelLoadCompleted(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:处理完成事件(开始)"),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TeleportComplete,
          t.TeleportCallSource,
          t.TeleportReason,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:处理完成事件(完成)"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 46, "传送:更新游戏时停状态"),
        ControllerHolder_1.ControllerHolder.GameModeController.ForceDisableGamePaused(
          !1,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:时停解除(完成)", ["Reason", r]),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 30, "传送:完成", ["Reason", r]),
        (ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1),
        UE.PerfSightHelper.EndExtTag("Teleport.TeleportFinish"),
        UE.PerfSightHelper.EndExtTag("Teleport"),
        !0
      );
    });
    return (
      TaskSystem_1.TaskSystem.AddTask(e),
      TaskSystem_1.TaskSystem.Run(),
      e.Promise
    );
  }
  static CKs(e, o) {
    const r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
        GlobalData_1.GlobalData.World,
        UE.WorldPartitionSubsystem.StaticClass(),
      ),
      t =
        ((TeleportController.jIo = 3e3),
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
                    30,
                    "无加载传送:流送中",
                    ["WorldPartitionSubsystem", r ? "true" : "false"],
                    ["StreamingSource", e.GetOwner().K2_GetActorLocation()],
                  )));
        }, ResourceSystem_1.CHECK_STREAMING_INTERVAL));
    return t;
  }
  static async NIo(e = !1) {
    var o,
      r,
      t = ModelManager_1.ModelManager.TeleportModel;
    ModelManager_1.ModelManager.GameModeModel.UseWorldPartition
      ? (ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid() &&
          !e &&
          ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(
            ModelManager_1.ModelManager.GameModeModel.StreamingSource.K2_GetActorLocation(),
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
        (t.CheckStreamingCompletedTimerId = this.CKs(r, o)),
        await o.Promise,
        (t.CheckStreamingCompletedTimerId = void 0))
      : (e ? t.VoxelStreamingCompleted : t.StreamingCompleted).SetResult(!0);
  }
  static gKs(o, r, t, l = !1) {
    var e = o.TargetGrids;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Teleport",
        61,
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
    TeleportController.jIo = 3e3;
    const n = TimerSystem_1.TimerSystem.Forever(() => {
      var e = () => {
        (TeleportController.jIo += ResourceSystem_1.CHECK_STREAMING_INTERVAL),
          3e3 < TeleportController.jIo &&
            (a && !a.IsStreamingEnable() && a.SetStreamingEnable(!0),
            (TeleportController.jIo = 0),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "Teleport",
              30,
              "传送:流送中",
              ["WorldPartitionSubsystem", a ? "true" : "false"],
              ["StreamingSource", o.GetOwner().K2_GetActorLocation()],
            );
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
            Log_1.Log.Info("Teleport", 61, "传送:检测场景物理体(开始)");
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
            Log_1.Log.Info("Teleport", 61, "传送:检测场景物理体(结束)");
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
      (e
        ? ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource
        : ModelManager_1.ModelManager.GameModeModel.StreamingSource
      ).K2_SetActorLocation(t, !1, void 0, !1);
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
      (r.CheckStreamingCompletedTimerId = this.gKs(t, a, o, !e)),
        await a.Promise,
        (r.CheckStreamingCompletedTimerId = void 0);
    } else (e ? r.VoxelStreamingCompleted : r.StreamingCompleted).SetResult(!0);
  }
  static kIo() {
    var e = new Protocol_1.Aki.Protocol.cCs();
    Net_1.Net.Call(22302, e, (e) => {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Teleport",
          30,
          "传送:TeleportFinishRequestSetResult(开始)",
        ),
        ModelManager_1.ModelManager.TeleportModel.TeleportFinishRequest.SetResult(
          !0,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Teleport",
            30,
            "传送:TeleportFinishRequestSetResult(完成)",
          );
    });
  }
  static GIo() {
    var e,
      o,
      r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    r?.Valid
      ? ((e = r.Entity.GetComponent(3)),
        (o = ModelManager_1.ModelManager.TeleportModel),
        e.Actor.CharacterMovement?.SetMovementMode(
          e.Actor.CharacterMovement?.DefaultLandMovementMode,
        ),
        e.TeleportAndFindStandLocation(o.TargetPosition),
        e.SetInputRotator(o.TargetRotation),
        e.SetActorRotation(
          o.TargetRotation.ToUeRotator(),
          "TeleportController",
          !1,
        ),
        r.Entity.GetComponent(160)?.ResetCharState(),
        r.Entity.GetComponent(162)?.MainAnimInstance?.SyncAnimStates(void 0),
        (TeleportController.WIo = TimerSystem_1.TimerSystem.Delay(() => {
          (ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = !1),
            (TeleportController.WIo = void 0);
        }, SKIP_FALL_INJURE_TIME)),
        CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
          CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator(),
        ),
        CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(),
        1 === o.CallSource &&
          DeadReviveController_1.DeadReviveController.PlayerReviveEnded(),
        r.Entity.GetComponent(175)?.ResetDrowning())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Teleport", 30, "传送:失败,找不到当前实体");
  }
  static KIo(e) {
    var o;
    return ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      (Global_1.Global.BaseCharacter?.IsValid() &&
        ((o = Global_1.Global.BaseCharacter.CharacterActorComponent),
        (o = UE.Vector.Dist(o.ActorLocation, e)),
        (e = CommonParamById_1.configCommonParamById.GetIntConfig(
          "TeleportRatingRange",
        )
          ? CommonParamById_1.configCommonParamById.GetIntConfig(
              "TeleportRatingRange",
            )
          : DISTANCE_THRESHOLD_1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("LevelEvent", 46, "QueryDefaultTeleportMode", [
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
      AreaController_1.AreaController.BeginOverlap(e, !0);
  }
  static OnLeaveLevel() {
    return (
      (TeleportController.jIo = 0),
      ModelManager_1.ModelManager.TeleportModel
        .CheckStreamingCompletedTimerId &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Teleport", 30, "传送:终止,离开关卡"),
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
      ModelManager_1.ModelManager.TeleportModel.StreamingCompleted?.SetResult(
        !0,
      ),
      !0
    );
  }
  static async FIo(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Teleport", 46, "传送:CG传送开始(视频)"),
      (ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = !0),
      VideoLauncher_1.VideoLauncher.ShowVideoCg(e, () => {
        ModelManager_1.ModelManager.TeleportModel.CgTeleportCompleted?.SetResult(
          !0,
        );
      }),
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
        8,
        2,
      );
  }
  static async TeleportWithCenterTextStart(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Teleport", 46, "传送:CG传送开始(黑幕白字)"),
      (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = !0),
      e
        ? (ModelManager_1.ModelManager.PlotModel.PlayFlow =
            new PlotData_1.PlotFlow(e._5n, e.u5n, e.c5n))
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Teleport", 46, "transitionFlow为空"),
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
        8,
        0,
      ),
      ModelManager_1.ModelManager.PlotModel.ShowCenterTextForTeleport();
  }
}
(exports.TeleportController = TeleportController),
  ((_a = TeleportController).jIo = 0),
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
      e.Actor.CharacterMovement.SetMovementMode(0);
  }),
  (TeleportController.AIo = (e) => {
    var o = e.nvs,
      r = e.h5n,
      t =
        ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkItem
          ?.MarkConfigId,
      t =
        ((ModelManager_1.ModelManager.LoadingModel.TargetTeleportId = t),
        new TeleportDefine_1.TeleportContext(
          e.E9n,
          t,
          void 0,
          o ? o._vs : void 0,
          r,
        )),
      l = new UE.Vector(e.p7n, e.v7n, e.f7n),
      a = new UE.Rotator(0, e.$Ds, 0);
    let _ = "";
    try {
      _ = JSON.stringify(o);
    } catch {
      _ = "Context序列化解析失败";
    }
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "LevelEvent",
          7,
          "服务端驱动执行行为组",
          ["Context", _],
          ["PosX", e.p7n],
          ["PosY", e.v7n],
          ["PosZ", e.f7n],
          ["Reason", e.E9n],
        ),
      ModelManager_1.ModelManager.TeleportModel.IsTeleport)
    )
      (TeleportController.xIo = e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Teleport",
            30,
            "传送: 传送中，缓存TeleportNotify",
            [
              "开始位置",
              ModelManager_1.ModelManager.TeleportModel.StartPosition,
            ],
            [
              "目标位置",
              ModelManager_1.ModelManager.TeleportModel.TargetPosition,
            ],
            [
              "开始角度",
              ModelManager_1.ModelManager.TeleportModel.StartRotation.Yaw,
            ],
            [
              "目标角度",
              ModelManager_1.ModelManager.TeleportModel.TargetRotation.Yaw,
            ],
            ["原因", t.TeleportReason],
          );
    else {
      switch (((TeleportController.xIo = void 0), t.TeleportReason)) {
        case Protocol_1.Aki.Protocol.u4s.Proto_Action:
        case Protocol_1.Aki.Protocol.u4s.Vvs:
          r && r.l5n === Protocol_1.Aki.Protocol.l5n.Proto_CenterText
            ? (ModelManager_1.ModelManager.TeleportModel.TeleportMode = 0)
            : (ModelManager_1.ModelManager.TeleportModel.TeleportMode =
                _a.KIo(l));
          break;
        case Protocol_1.Aki.Protocol.u4s.Proto_BtRollbackFailed:
          r?.l5n === Protocol_1.Aki.Protocol.l5n.Proto_FadeInScreen
            ? (ModelManager_1.ModelManager.TeleportModel.TeleportMode = 3)
            : (ModelManager_1.ModelManager.TeleportModel.TeleportMode =
                _a.KIo(l));
          break;
        case Protocol_1.Aki.Protocol.u4s.Proto_Drown:
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2;
          break;
        default:
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
      }
      TeleportController.TeleportToPosition(
        l,
        a,
        "OnTeleportNotify",
        t,
      ).finally(() => {
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
      }),
        (ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkItem =
          void 0);
    }
  }),
  (TeleportController.PIo = (e) => {
    ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim = !1;
  });
//# sourceMappingURL=TeleportController.js.map
