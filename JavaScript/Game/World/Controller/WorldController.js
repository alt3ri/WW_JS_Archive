"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldController = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  EntityVoxelInfoByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/EntityVoxelInfoByMapIdAndEntityId"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  Net_1 = require("../../../Core/Net/Net"),
  PerformanceController_1 = require("../../../Core/Performance/PerformanceController"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil"),
  ActorUtils_1 = require("../../Utils/ActorUtils"),
  VoxelUtils_1 = require("../../Utils/VoxelUtils"),
  WorldModel_1 = require("../Model/WorldModel"),
  AttachToActorController_1 = require("./AttachToActorController"),
  PerfSight_1 = require("../../../Core/PerfSight/PerfSight"),
  DELTA_TIME_LIMIT_LOW = 20,
  DELTA_TIME_LIMIT_HIGH = 25,
  MIN_DELTA = 0,
  MAX_DELTA = 0,
  SCHEDULER_MINUS_FRAME_COUNT = 5,
  DEFAULT_ENVIRONMENTTYPE = 255,
  WP_WORLD_ID = 8,
  IOS_STREAMING_POOL_SIZE = 250,
  IOS_STREAMING_POOL_SIZE_FOR_MESHES = 250,
  IOS_STREAMING_POOL_SIZE_IN_LOADING = 90,
  IOS_STREAMING_POOL_SIZE_FOR_MESHES_IN_LOADING = 90;
class WorldController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    var e;
    return (
      (ModelManager_1.ModelManager.WorldModel.CurrentSchedulerDelta =
        MAX_DELTA),
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen &&
        ((e = GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
          .GetCurrentQualityInfo()
          .GetFrameRate()),
        GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetMaximumFrameRate(
          e,
        )),
      (PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity =
        !Info_1.Info.IsBuildShipping),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SettingFrameRateChanged,
        this.zfi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.Bpr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        this.Mze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangePerformanceLimitMode,
        this.Zfi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportStart,
        this.bpr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      ),
      Net_1.Net.Register(29690, WorldController.IBn),
      TickSystem_1.TickSystem.Add(this.k1r.bind(this), "WorldController", 2),
      (this.qpr = TimerSystem_1.TimerSystem.Forever(
        this.Gpr,
        18e5,
        1,
        void 0,
        "WorldController.OnInit.MemoryGcCheck",
        !1,
      )),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SettingFrameRateChanged,
        this.zfi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.Bpr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        this.Mze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangePerformanceLimitMode,
        this.Zfi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportStart,
        this.bpr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      ),
      Net_1.Net.UnRegister(29690),
      !(ModelManager_1.ModelManager.WorldModel.ControlPlayerLastLocation =
        void 0)
    );
  }
  static ForceGarbageCollection(e) {
    var t = cpp_1.KuroTime.GetMilliseconds64(),
      e =
        (UE.KuroStaticLibrary.ForceGarbageCollection(e),
        cpp_1.KuroTime.GetMilliseconds64() - t);
    PerfSight_1.PerfSight.IsEnable &&
      PerfSight_1.PerfSight.PostValueF1(
        "CustomPerformance",
        "ForceGarbageCollection",
        e,
        Time_1.Time.Frame,
      );
  }
  static ManuallyGarbageCollection(e) {
    var t;
    0 === this.fzs &&
      ((this.fzs = 1), "Android" === UE.GameplayStatics.GetPlatformName()) &&
      (t = UE.KuroStaticLibrary.GetDeviceCPU()).includes("SDM660") &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("World", 31, "Disable ManuallyGarbageCollection", [
          "cpu",
          t,
        ]),
      (this.fzs = 2)),
      1 === this.fzs &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("World", 25, "ManuallyGarbageCollection", [
            "Reason: ",
            e,
          ]),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TestManuallyGarbageCollection,
        ),
        (t = cpp_1.KuroTime.GetMilliseconds64()),
        global.memoryPressureNotification(),
        (e = cpp_1.KuroTime.GetMilliseconds64() - t),
        PerfSight_1.PerfSight.IsEnable) &&
        PerfSight_1.PerfSight.PostValueF1(
          "CustomPerformance",
          "ManuallyGarbageCollection",
          e,
          Time_1.Time.Frame,
        );
  }
  static ManuallyClearStreamingPool() {
    1 === Info_1.Info.PlatformType &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("World", 37, "ManuallyClearStreamingPool In IOS"),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Streaming.PoolSize " + IOS_STREAMING_POOL_SIZE_IN_LOADING,
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Streaming.PoolSizeForMeshes " +
          IOS_STREAMING_POOL_SIZE_FOR_MESHES_IN_LOADING,
      ));
  }
  static ManuallyResetStreamingPool() {
    1 === Info_1.Info.PlatformType &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("World", 37, "ManuallyResetStreamingPool In IOS"),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Streaming.PoolSize " + IOS_STREAMING_POOL_SIZE,
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Streaming.PoolSizeForMeshes " + IOS_STREAMING_POOL_SIZE_FOR_MESHES,
      ));
  }
  static k1r() {
    if (!GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
      var e = ModelManager_1.ModelManager.WorldModel;
      if (
        Time_1.Time.DeltaTime <= DELTA_TIME_LIMIT_HIGH &&
        Time_1.Time.DeltaTime >= DELTA_TIME_LIMIT_LOW
      )
        e.ChangeSchedulerLastType = 0;
      else if (
        Time_1.Time.DeltaTime > DELTA_TIME_LIMIT_HIGH &&
        e.CurrentSchedulerDelta > MIN_DELTA
      ) {
        if (1 !== e.ChangeSchedulerLastType)
          (e.ChangeSchedulerLastType = 1),
            (e.ChangeSchedulerDeltaFrameCount = 0);
        else if (
          ++e.ChangeSchedulerDeltaFrameCount >= SCHEDULER_MINUS_FRAME_COUNT
        ) {
          --e.CurrentSchedulerDelta, (e.ChangeSchedulerDeltaFrameCount = 0);
          for (const t of ModelManager_1.ModelManager.WorldModel
            .TickIntervalSchedulers)
            t.SetCountDelta(e.CurrentSchedulerDelta);
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("World", 6, "Decrease max tick count", [
              "Delta",
              e.CurrentSchedulerDelta,
            ]);
        }
      } else if (
        Time_1.Time.DeltaTime < DELTA_TIME_LIMIT_LOW &&
        e.CurrentSchedulerDelta < MAX_DELTA
      )
        if (2 !== e.ChangeSchedulerLastType)
          (e.ChangeSchedulerLastType = 2),
            (e.ChangeSchedulerDeltaFrameCount = 0);
        else if (10 <= ++e.ChangeSchedulerDeltaFrameCount) {
          ++e.CurrentSchedulerDelta, (e.ChangeSchedulerDeltaFrameCount = 0);
          for (const r of ModelManager_1.ModelManager.WorldModel
            .TickIntervalSchedulers)
            r.SetCountDelta(e.CurrentSchedulerDelta);
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("World", 6, "Increase max tick count", [
              "Delta",
              e.CurrentSchedulerDelta,
            ]);
        }
      for (const o of ModelManager_1.ModelManager.WorldModel
        .TickIntervalSchedulers)
        o.Schedule();
    }
    this.Npr(), this.Opr();
  }
  static Npr() {
    var e = ModelManager_1.ModelManager.CreatureModel;
    e.PendingRemoveEntitySize() && this.kpr(e.PopPendingRemoveEntity());
  }
  static kpr(e) {
    var t, r, o, l, a;
    e
      ? Global_1.Global.WorldEntityHelper
        ? ((t =
            AttachToActorController_1.AttachToActorController.DetachActorsBeforeDestroyEntity(
              e,
            )),
          (r = e.Entity.GetComponent(1)?.Owner),
          (o = e.Entity.GetComponent(0).GetCreatureDataId()),
          (l = Global_1.Global.WorldEntityHelper.Destroy(e)),
          (a =
            AttachToActorController_1.AttachToActorController.DetachActorsAfterDestroyEntity(
              e.Id,
            )),
          l
            ? ModelManager_1.ModelManager.WorldModel.AddDestroyActor(o, e.Id, r)
            : this.DestroyEntityActor(o, e.Id, r, !1),
          ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              3,
              "[实体生命周期:删除实体] DestroyEntity结束",
              ["CreatureDataId", o],
              ["EntityId", e.Id],
              ["EntitySystem.DestroyEntity结果", l],
              ["BeforDetachActors", t],
              ["AfterDetachActors", a],
            ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[WorldController.DestroyEntity] WorldEntityHelper无效",
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          3,
          "[WorldController.DestroyEntity] handle参数无效",
        );
  }
  static Opr() {
    var e = ModelManager_1.ModelManager.WorldModel;
    0 !== e.DestroyActorQueue.Size &&
      ((e = e.PopDestroyActor()), GlobalData_1.GlobalData.World?.IsValid()) &&
      (ModelManager_1.ModelManager.WorldModel.RemoveIgnore(e[2]),
      this.DestroyEntityActor(e[0], e[1], e[2]));
  }
  static DoLeaveLevel() {
    if (GlobalData_1.GlobalData.World?.IsValid()) {
      for (
        var e = ModelManager_1.ModelManager.CreatureModel;
        e.PendingRemoveEntitySize();

      )
        this.kpr(e.PopPendingRemoveEntity());
      for (
        var t = ModelManager_1.ModelManager.WorldModel;
        t.DestroyActorQueue.Size;

      ) {
        var r = t.PopDestroyActor();
        this.DestroyEntityActor(r[0], r[1], r[2]);
      }
      t.ClearIgnore();
    }
  }
  static SetActorDataByCreature(e, t) {
    this.Fpr(e), this.SetActorLocationAndRotation(e, t), this.Vpr(e, t);
  }
  static Fpr(e) {
    var t = e.Entity,
      r = e.GetEntityType();
    r !== Protocol_1.Aki.Protocol.wks.Proto_Monster &&
      ((r =
        (e =
          e.GetPlayerId() ===
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) ||
        r === Protocol_1.Aki.Protocol.wks.Proto_Npc),
      t.GetComponent(1).SetAutonomous(e, r));
  }
  static SetActorLocationAndRotation(e, t) {
    var r, o;
    t &&
      ((r = e.GetLocation()),
      (e = e.GetRotation()),
      (o = (0, puerts_1.$ref)(new UE.HitResult())),
      t.K2_SetActorLocationAndRotation(r, e, !1, o, !0),
      ActorUtils_1.ActorUtils.GetEntityByActor(t)?.Entity?.GetComponent(163)
        ?.CharacterMovement) &&
      ActorUtils_1.ActorUtils.GetEntityByActor(t)
        .Entity.GetComponent(163)
        .CharacterMovement.AddReplayData(
          (0, puerts_1.$ref)(r),
          (0, puerts_1.$ref)(e),
          (0, puerts_1.$ref)(Vector_1.Vector.ZeroVector),
          (0, puerts_1.$ref)(Vector_1.Vector.ZeroVector),
          0,
          0,
        );
  }
  static Vpr(e, t) {
    if (t) {
      e = e.GetPublicTags();
      if (void 0 !== e)
        for (const o of e) {
          var r = FNameUtil_1.FNameUtil.GetDynamicFName(o);
          t.Tags.Add(r);
        }
    }
  }
  static DestroyEntityActor(e, t, r, o = !0) {
    r = this.DestroyActor(r, o);
    return (
      ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
        ((o =
          AttachToActorController_1.AttachToActorController.CheckAttachError(
            t,
          )),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Entity",
          3,
          "[实体生命周期:删除实体] 删除实体Actor",
          ["CreatureDataId", e],
          ["Result", r],
          ["AttachSuccess", o],
        ),
      r
    );
  }
  static DestroyActor(e, t = !0) {
    if (!e?.IsValid()) return !1;
    if (!e.GetWorld()?.IsValid()) return !1;
    let r = void 0;
    e.IsA(UE.Pawn.StaticClass()) && (r = e.Controller);
    let o = !1,
      l = 0;
    for (
      UE.KuroStaticLibrary.IsImplementInterface(
        e.GetClass(),
        UE.BPI_CreatureInterface_C.StaticClass(),
      ) && ((o = !0), (l = e.GetEntityId())),
        this.Hpr.length = 0,
        this.jpr(e, this.Hpr, !0);
      this.Hpr.length;

    ) {
      var a = this.Hpr.pop();
      a?.IsValid() &&
        a.GetWorld()?.IsValid() &&
        a !== r &&
        !ModelManager_1.ModelManager.AttachToActorModel.GetEntityIdByActor(a) &&
        (a.K2_DetachFromActor(1, 1, 1),
        a.IsA(UE.TsEffectActor_C.StaticClass())
          ? a.StopEffect(
              "[WorldController.DestroyActor] 销毁entity的actor前先停止所有附加的特效",
              !0,
            )
          : a.IsA(UE.KuroEntityActor.StaticClass()) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                3,
                "存在未Detach的Actor",
                ["是否是实体Actor", o],
                ["EntityId", l],
                ["父Actor", e.GetName()],
                ["子Actor", a.GetName()],
              )));
    }
    return t ? ActorSystem_1.ActorSystem.Put(e) : e.K2_DestroyActor(), !0;
  }
  static jpr(e, t, r) {
    if (e?.IsValid()) {
      r || t.push(e);
      var r = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
        o = (e.GetAttachedActors(r, !0), (0, puerts_1.$unref)(r));
      for (let e = 0; e < o.Num(); ++e) this.jpr(o.Get(e), t, !1);
    }
  }
  static EnvironmentInfoUpdate(e, t, r = !1) {
    if (
      ModelManager_1.ModelManager.WorldModel.IsEnableEnvironmentDetecting &&
      t &&
      ModelManager_1.ModelManager.GameModeModel.UseWorldPartition
    ) {
      var o = GlobalData_1.GlobalData.World;
      if (o?.IsValid()) {
        var l = VoxelUtils_1.VoxelUtils.GetVoxelInfo(o, e),
          t = ModelManager_1.ModelManager.WorldModel.HandleEnvironmentUpdate(l);
        if (0 !== t) {
          var a = FNameUtil_1.FNameUtil.GetDynamicFName(
              ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo
                .DataLayerType,
            ),
            _ = FNameUtil_1.FNameUtil.GetDynamicFName(
              ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo
                .SubDataLayerType,
            );
          switch (
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnEncloseSpaceTypeChange,
              t,
            ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                61,
                "[WorldController]Streaming:体素参数",
                ["LoadAdjustValue", l.LoadAdjustValue],
                ["StreamingType", l.StreamingType],
                ["DataLayer", a],
                ["SubDatalayer", _],
              ),
            t)
          ) {
            case 5:
              return (
                UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginEnterCaveOrRoom(
                  o,
                  a,
                  _,
                ),
                UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginAdjustLoadRange(
                  o,
                  l.LoadAdjustValue,
                  l.StreamingType,
                ),
                UE.KuroRenderingRuntimeBPPluginBPLibrary.SetIsUsingInCaveOrIndoorShadow(
                  o,
                  !0,
                  WorldModel_1.MOBILE_CSM_DISTANCE_INCAVE,
                  WorldModel_1.MOBILE_CSM_DISTANCE_OUTCAVE,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnOverlapEncloseSpace,
                  !0,
                ),
                cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(2),
                r
                  ? Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "LevelEvent",
                      7,
                      "[WorldController]Streaming:进入封闭空间[传送]",
                    )
                  : (Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "LevelEvent",
                        7,
                        "[WorldController]Streaming:非传送下,无过渡区域进入封闭空间",
                        ["Location", e],
                      ),
                    this.Wpr()),
                a
              );
            case 1:
              return (
                UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginEnterCaveOrRoom(
                  o,
                  a,
                  _,
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "LevelEvent",
                    7,
                    "[WorldController]Streaming:进入封闭空间",
                  ),
                cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(3),
                a
              );
            case 6:
              UE.KuroRenderingRuntimeBPPluginBPLibrary.WpCancelAdjustLoadRange(
                o,
              ),
                UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginLeaveCaveOrRoom(
                  o,
                  a,
                  _,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnOverlapEncloseSpace,
                  !1,
                ),
                cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(1),
                r
                  ? Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "LevelEvent",
                      7,
                      "[WorldController]Streaming:退出封闭空间[传送]",
                    )
                  : (Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "LevelEvent",
                        7,
                        "[WorldController]Streaming:非传送下,无过渡区域退出封闭空间",
                        ["Location", e],
                      ),
                    this.Wpr()),
                UE.KuroRenderingRuntimeBPPluginBPLibrary.SetIsUsingInCaveOrIndoorShadow(
                  o,
                  !1,
                  WorldModel_1.MOBILE_CSM_DISTANCE_INCAVE,
                  WorldModel_1.MOBILE_CSM_DISTANCE_OUTCAVE,
                );
              break;
            case 2:
              UE.KuroRenderingRuntimeBPPluginBPLibrary.WpCancelAdjustLoadRange(
                o,
              ),
                UE.KuroRenderingRuntimeBPPluginBPLibrary.SetIsUsingInCaveOrIndoorShadow(
                  o,
                  !1,
                  WorldModel_1.MOBILE_CSM_DISTANCE_INCAVE,
                  WorldModel_1.MOBILE_CSM_DISTANCE_OUTCAVE,
                ),
                cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(3),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnOverlapEncloseSpace,
                  !1,
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "LevelEvent",
                    7,
                    "[WorldController]Streaming:退出封闭空间",
                  );
              break;
            case 4:
              cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(1),
                UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginLeaveCaveOrRoom(
                  o,
                  a,
                  _,
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "LevelEvent",
                    7,
                    "[WorldController]Streaming:完成退出封闭空间",
                  );
              break;
            case 3:
              UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginAdjustLoadRange(
                o,
                l.LoadAdjustValue,
                l.StreamingType,
              ),
                UE.KuroRenderingRuntimeBPPluginBPLibrary.SetIsUsingInCaveOrIndoorShadow(
                  o,
                  !0,
                  WorldModel_1.MOBILE_CSM_DISTANCE_INCAVE,
                  WorldModel_1.MOBILE_CSM_DISTANCE_OUTCAVE,
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "LevelEvent",
                    7,
                    "[WorldController]Streaming:完成进入封闭空间",
                  ),
                cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(2),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnOverlapEncloseSpace,
                  !0,
                );
          }
        }
      }
    }
  }
  static IsEncloseSpace(e, t, r, o) {
    if (!ModelManager_1.ModelManager.GameModeModel.UseWorldPartition || !e)
      return !1;
    var l = GlobalData_1.GlobalData.World;
    if (!l?.IsValid()) return !1;
    if (ModelManager_1.ModelManager.GameModeModel.MapId !== WP_WORLD_ID)
      return !1;
    if (
      r === Protocol_1.Aki.Protocol.wks.Proto_Player ||
      r === Protocol_1.Aki.Protocol.wks.Proto_Vision
    )
      return !1;
    let a = void 0;
    if (
      !(a =
        o === Protocol_1.Aki.Protocol.YTs.P6n
          ? EntityVoxelInfoByMapIdAndEntityId_1.configEntityVoxelInfoByMapIdAndEntityId.GetConfig(
              ModelManager_1.ModelManager.GameModeModel.MapId,
              e,
            )
          : a)
    )
      switch (VoxelUtils_1.VoxelUtils.GetVoxelInfo(l, t).EnvType) {
        case 0:
        case 1:
          return !0;
        default:
          DEFAULT_ENVIRONMENTTYPE;
          return !1;
      }
    switch (a.EnvType) {
      case 0:
      case 1:
        return !0;
      default:
        DEFAULT_ENVIRONMENTTYPE;
        return !1;
    }
  }
  static Wpr() {
    Net_1.Net.Call(10826, Protocol_1.Aki.Protocol.CCs.create(), (e) => {
      e.O4n !==
        Protocol_1.Aki.Protocol.O4n.Proto_ErrPlayerIsTeleportCanNotDoTeleport &&
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          11301,
        );
    });
  }
  static GetEntitiesInRangeWithLocation(e, t, r, o, l) {
    var a = [];
    l && (o instanceof Set ? o.clear() : (o.length = 0)),
      cpp_1.FKuroGameBudgetAllocatorInterface.GetEntitiesInRangeWithLocation(
        e,
        t,
        r,
        a,
      );
    for (const n of a) {
      var _ = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(n);
      _ && (o instanceof Set ? o.add(_) : o.push(_));
    }
  }
  static GetCustomEntityId(e, t) {
    var r = EntitySystem_1.EntitySystem.Get(e);
    if (r) {
      r = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        r,
        Protocol_1.Aki.Protocol.Summon.L3s.Proto_ESummonTypeConcomitantCustom,
        t - 1,
      );
      if (r) return r.Id;
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "无法找到伴生物拥有者实体", [
          "ownerEntityId",
          e,
        ]);
    return 0;
  }
}
(exports.WorldController = WorldController),
  ((_a = WorldController).Kpr = !1),
  (WorldController.qpr = void 0),
  (WorldController.Qpr = !1),
  (WorldController.fzs = 0),
  (WorldController.AK = !1),
  (WorldController.IBn = (e) => {
    cpp_1.FuncOpenLibrary.TryOpen(e.NEs);
  }),
  (WorldController.Gpr = () => {
    _a.Kpr
      ? (TimerSystem_1.TimerSystem.Pause(_a.qpr), (_a.Qpr = !0))
      : (_a.ManuallyGarbageCollection(1), (_a.Qpr = !1));
  }),
  (WorldController.bpr = () => {
    _a.AK && _a.Zfi(!0, !0);
  }),
  (WorldController.Ilt = () => {
    _a.AK && _a.Zfi(!0, !1);
  }),
  (WorldController.Zfi = (e, t) => {
    (_a.AK = e),
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetPerformanceLimitMode(
        e && !t,
      );
    var r = UE.KuroTrailSystem.GetKuroTrailSystem(
        GlobalData_1.GlobalData.World.GetWorld(),
      ),
      o = UE.KuroGISystem.GetKuroGISystem(
        GlobalData_1.GlobalData.World.GetWorld(),
      ).GetKuroGlobalGIActor();
    e && !t
      ? ((r.bTickEnabled = !1), (o.EnableImposterUpdate = !1))
      : ((r.bTickEnabled = !0), (o.EnableImposterUpdate = !0));
  }),
  (WorldController.Zpe = (e) => {
    _a.Kpr = e;
    var t =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    e
      ? t.TryReduceCsmUpdateFrequency("Battle")
      : t.TryRestoreCsmUpdateFrequency("Battle"),
      !e &&
        _a.Qpr &&
        (_a.ManuallyGarbageCollection(2),
        (_a.Qpr = !1),
        TimerSystem_1.TimerSystem.Resume(_a.qpr)),
      UE.KuroStaticLibrary.SetGameThreadAffinity(e);
  }),
  (WorldController.zfi = (e) => {
    if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen)
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetMaximumFrameRate(
        e,
      );
    else if (ModelManager_1.ModelManager.WorldModel?.TickIntervalSchedulers)
      for (const t of ModelManager_1.ModelManager.WorldModel
        .TickIntervalSchedulers)
        t.ChangeTickFramePeriodByFrameRate(e);
  }),
  (WorldController.Hpr = new Array()),
  (WorldController.Mze = () => {
    cpp_1.FKuroGameBudgetAllocatorInterface.ClearAssistantActors();
  }),
  (WorldController.Bpr = () => {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      cpp_1.FKuroGameBudgetAllocatorInterface.ClearAssistantActors();
      for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
        var e;
        t.IsMyRole() ||
          ((e = t.EntityHandle?.Entity?.GetComponent(3)?.Actor) &&
            cpp_1.FKuroGameBudgetAllocatorInterface.AddAssistantActor(e));
      }
    }
  });
//# sourceMappingURL=WorldController.js.map
