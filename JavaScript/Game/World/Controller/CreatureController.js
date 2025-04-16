"use strict";
var _a,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, r, o) {
      var a,
        l = arguments.length,
        n =
          l < 3
            ? t
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(t, r))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(e, t, r, o);
      else
        for (var i = e.length - 1; 0 <= i; i--)
          (a = e[i]) &&
            (n = (l < 3 ? a(n) : 3 < l ? a(t, r, n) : a(t, r)) || n);
      return 3 < l && n && Object.defineProperty(t, r, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreatureController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  LogProfiler_1 = require("../../../Core/Common/LogProfiler"),
  Stats_1 = require("../../../Core/Common/Stats"),
  DataLayerById_1 = require("../../../Core/Define/ConfigQuery/DataLayerById"),
  SummonCfgById_1 = require("../../../Core/Define/ConfigQuery/SummonCfgById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Entity_1 = require("../../../Core/Entity/Entity"),
  EntityHelper_1 = require("../../../Core/Entity/EntityHelper"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  LauncherLogUpload_1 = require("../../../Launcher/LogUpload/LauncherLogUpload"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  HotFixUtils_1 = require("../../HotFix/HotFixUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  FormationDataController_1 = require("../../Module/Abilities/FormationDataController"),
  BlackScreenController_1 = require("../../Module/BlackScreen/BlackScreenController"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  CombatMessageController_1 = require("../../Module/CombatMessage/CombatMessageController"),
  LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer"),
  SceneTeamData_1 = require("../../Module/SceneTeam/SceneTeamData"),
  SeamlessTravelController_1 = require("../../Module/SeamlessTravel/SeamlessTravelController"),
  SeamlessTravelDefine_1 = require("../../Module/SeamlessTravel/SeamlessTravelDefine"),
  TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController"),
  CharacterBuffController_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffController"),
  CreateEntityData_1 = require("../../NewWorld/Character/CreateEntityData"),
  EntityHandle_1 = require("../../NewWorld/Character/EntityHandle"),
  BattleSetting_1 = require("../../NewWorld/Setting/BattleSetting"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine"),
  ScenePlayerData_1 = require("../Define/ScenePlayerData"),
  WaitEntityToLoadTask_1 = require("../Define/WaitEntityToLoadTask"),
  CreatureModel_1 = require("../Model/CreatureModel"),
  TaskSystem_1 = require("../Task/TaskSystem"),
  WorldGlobal_1 = require("../WorldGlobal"),
  BattleLogicController_1 = require("./BattleLogicController"),
  LogController_1 = require("./LogController"),
  PreloadController_1 = require("./PreloadController"),
  PreloadControllerNew_1 = require("./PreloadControllerNew"),
  TimeController_1 = require("./TimeController"),
  idDefaultValue = -1n,
  increment = 2n,
  playerBit = 20n,
  unitMax = 4294967295n,
  HOLD_ENTITY_TIMEOUT = 8e3;
class CreatureController extends ControllerBase_1.ControllerBase {
  static get CurrentCreatureDensityLevelExternal() {
    return this.hYs;
  }
  static OnInit() {
    return (
      WorldGlobal_1.WorldGlobal.Initialize(),
      (this.hYs =
        GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(
          GameSettingsDefine_1.EFunction.NPCDENSITY,
          GameSettingsDefine_1.NPC_DENSITY_THRESHOLD,
        )),
      !!Global_1.Global.WorldEntityHelper.Initialize() &&
        (Net_1.Net.Register(26024, CreatureController.P0r),
        Net_1.Net.Register(23450, CreatureController.x0r),
        Net_1.Net.Register(29671, CreatureController.w0r),
        Net_1.Net.Register(22970, CreatureController.B0r),
        Net_1.Net.Register(22036, CreatureController.PushContextIdNotify),
        Net_1.Net.Register(18062, CreatureController.JoinSceneNotify),
        Net_1.Net.Register(26052, CreatureController.AfterJoinSceneNotify),
        Net_1.Net.Register(20240, CreatureController.G0r),
        Net_1.Net.Register(15371, CreatureController.N0r),
        Net_1.Net.Register(29343, CreatureController.V0r),
        Net_1.Net.Register(18717, CreatureController.j0r),
        Net_1.Net.Register(26552, this.SwitchBattleModeNotify),
        Net_1.Net.Register(26361, this.GravityUpdateNotify),
        Net_1.Net.Register(23710, this.BattleLogNotify),
        Net_1.Net.Register(17759, this.W0r),
        Net_1.Net.Register(24116, this.STn),
        Net_1.Net.Register(27082, this.K0r),
        Net_1.Net.Register(26946, this.SceneLoadingTimeOutNotify),
        Net_1.Net.Register(27896, CreatureController.Q0r),
        Net_1.Net.Register(18169, CreatureController.X0r),
        Net_1.Net.Register(23222, CreatureController.$0r),
        Net_1.Net.Register(17328, CreatureController.Y0r),
        Net_1.Net.Register(
          22633,
          TimeController_1.TimeController.TimeCheckNotify,
        ),
        Net_1.Net.Register(26543, CreatureController.J0r),
        Net_1.Net.Register(26276, CreatureController.z0r),
        Net_1.Net.Register(26003, CreatureController.Z0r),
        Net_1.Net.Register(17780, CreatureController.oZa),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CreateEntityFail,
          CreatureController.OnCreateEntityFail,
        ),
        EntitySystem_1.EntitySystem.SetEntityDestroyHandle(
          CreatureController.OnRemoveTargetEntity,
        ),
        this.IEa.OnInit(),
        !0)
    );
  }
  static CheckEnableEntityLog(t) {
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog) return !0;
    if (void 0 !== t) {
      let e = 0;
      switch (
        (e = t instanceof EntityHandle_1.EntityHandle ? t.EntityType : t)
      ) {
        case Protocol_1.Aki.Protocol.kks.Proto_Player:
        case Protocol_1.Aki.Protocol.kks.Proto_Vision:
          return !0;
      }
    }
    return !1;
  }
  static OnClear() {
    return (
      WorldGlobal_1.WorldGlobal.Clear(),
      !!Global_1.Global.WorldEntityHelper.Clear() &&
        (this.DBi(),
        Net_1.Net.UnRegister(26024),
        Net_1.Net.UnRegister(23450),
        Net_1.Net.UnRegister(29671),
        Net_1.Net.UnRegister(22970),
        Net_1.Net.UnRegister(18062),
        Net_1.Net.UnRegister(26052),
        Net_1.Net.UnRegister(15371),
        Net_1.Net.UnRegister(29343),
        Net_1.Net.UnRegister(18717),
        Net_1.Net.UnRegister(26552),
        Net_1.Net.UnRegister(17759),
        Net_1.Net.UnRegister(24116),
        Net_1.Net.UnRegister(26946),
        Net_1.Net.UnRegister(27896),
        Net_1.Net.UnRegister(27082),
        Net_1.Net.UnRegister(18169),
        Net_1.Net.UnRegister(17328),
        Net_1.Net.UnRegister(26543),
        Net_1.Net.UnRegister(26276),
        Net_1.Net.UnRegister(26003),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CreateEntityFail,
          CreatureController.OnCreateEntityFail,
        ),
        EntitySystem_1.EntitySystem.SetEntityDestroyHandle(void 0),
        this.IEa.OnClear(),
        this.aTa.clear(),
        !0)
    );
  }
  static CreateEntityFromPending(e) {
    for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      t?.Valid && this.LoadEntityAsync(t);
    this.IEa.Flush();
  }
  static RemoveStandaloneEntity(e, t) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    r?.Valid &&
      r.Entity.GetComponent(1)?.Owner &&
      ((r = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e)),
      this.RemoveEntity(r, "RemoveStandaloneEntity", t));
  }
  static NotifyAddEntity(e, t, r) {
    return (
      !t.Entity.GetComponent(0).GetRemoveState() &&
      (GlobalData_1.GlobalData.BpEventManager.增加实体.Broadcast(t.Id, r),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddEntity,
        e,
        t,
        r,
      ),
      ModelManager_1.ModelManager.CreatureModel.EntitiesSortedList.push(t),
      EntityHelper_1.EntitySystemHelper.IsSortDirty ||
        (EntityHelper_1.EntitySystemHelper.IsSortDirty = !0),
      !0)
    );
  }
  static NotifyRemoveEntity(e, t, r) {
    t?.Valid &&
      (GlobalData_1.GlobalData.BpEventManager.删除实体.Broadcast(r),
      EventSystem_1.EventSystem.EmitWithTarget(
        t,
        EventDefine_1.EEventName.RemoveEntity,
        e,
        t,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveEntity,
        e,
        t,
      ),
      EntityHelper_1.EntitySystemHelper.IsFilterDirty ||
        (EntityHelper_1.EntitySystemHelper.IsFilterDirty = !0));
  }
  static RemoveEntity(
    e,
    t,
    r = Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce,
  ) {
    this.ofr.Start();
    var o = ModelManager_1.ModelManager.CreatureModel.RemoveDensityItem(e);
    if (o) {
      if (!o.EntityHandle)
        return (
          o.DensityLevel <= this.hYs &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              6,
              "[实体生命周期:删除实体] DensityLevel和创建情况不匹配",
              ["CurrentLevel", this.hYs],
              ["SelfLevel", o.DensityLevel],
              ["CreatureDataId", o.CreatureDataId],
            ),
          this.ofr.Stop(),
          !0
        );
      o.DensityLevel > this.hYs &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          6,
          "[实体生命周期:删除实体] DensityLevel和创建情况不匹配2",
          ["CurrentLevel", this.hYs],
          ["SelfLevel", o.DensityLevel],
          ["CreatureDataId", o.CreatureDataId],
        );
    }
    this.nfr.Start();
    o = this.rfr(e, t, r);
    return this.nfr.Stop(), this.ofr.Stop(), o;
  }
  static rfr(e, t, r) {
    CreatureController.aTa.delete(e);
    var o,
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    return a
      ? ((o = a.Entity.GetComponent(1)),
        this.CheckEnableEntityLog(a) &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[实体生命周期:删除实体] 删除实体",
            ["Context", t],
            ["CreatureDataId", e],
            ["RemoveType", r],
            ["ActorLocationProxy", o?.ActorLocationProxy],
          ),
        (o = a.Entity.GetComponent(0)),
        (o = Stats_1.Stat.CreateNoFlameGraph(
          `CreatureDataId:${o.GetCreatureDataId()}, PbDataId:${o.GetPbDataId()}, EntityType:${o.GetEntityType()}}`,
        )).Start(),
        PreloadDefine_1.PreloadSetting.UseNewPreload
          ? PreloadControllerNew_1.PreloadControllerNew.RemoveEntity(e)
          : PreloadController_1.PreloadController.RemovePreloadEntity(e),
        (a = this.lYs(a, e, r, t)),
        o.Stop(),
        a)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[实体生命周期:删除实体] 删除实体失败,CreatureModel不存在该Id。",
            ["Context", t],
            ["CreatureDataId", e],
            ["RemoveType", r],
          ),
        !1);
  }
  static lYs(e, t, r, o) {
    var a = ModelManager_1.ModelManager.CreatureModel;
    if (!e.Valid)
      return a.RemoveEntity(t, "RemoveEntityInternal handle.Valid=false");
    var l = e.Entity.GetComponent(0),
      n =
        (l.SetRemoveState(!0),
        this.IEa.RemoveEntity(e),
        e.Entity.GetComponent(1)?.Owner);
    if ((CreatureController.NotifyRemoveEntity(r, e, n), !e.IsInit))
      return (
        CreatureController.DestroyEntity(
          e,
          r !== Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeResetByModeChange,
        ),
        a.RemoveEntity(t, "RemoveEntityInternal handle.IsInit=false")
      );
    if (
      l.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Custom &&
      !n?.IsValid()
    )
      return (
        CreatureController.DestroyEntity(
          e,
          r !== Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeResetByModeChange,
        ),
        a.RemoveEntity(t, "RemoveEntityInternal actor?.IsValid()=false")
      );
    if (r === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeResetByModeChange)
      return (
        CreatureController.DestroyEntity(e, !1),
        a.RemoveEntity(t, "RemoveEntityInternal RemoveTypeResetByModeChange")
      );
    let i = r === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce;
    if (
      (i =
        i ||
        (r === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeNormal &&
          l.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Npc &&
          l.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_SceneItem &&
          l.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Animal &&
          l.GetEntityType() !== Protocol_1.Aki.Protocol.kks.HI_ &&
          (i = !0),
        e.Entity.Active)
          ? i
          : !0)
    )
      return (
        CreatureController.DestroyEntity(e),
        a.RemoveEntity(t, "RemoveEntityInternal forceRemove=true")
      );
    if (
      (this.CheckEnableEntityLog(e) &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "[实体生命周期:删除实体] 延迟删除实体",
          ["Context", o],
          ["CreatureDataId", t],
          ["EntityId", e.Id],
          ["RemoveType", r],
        ),
      this.AddDelayRemoveEntity(t, e),
      l.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Npc)
    )
      (n = e.Entity.GetComponent(184))
        ? n.HandlePendingDestroy()
        : CreatureController.DelayRemoveEntityFinished(e);
    else {
      if (l.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Animal) {
        a = e.Entity.GetComponent(169);
        if (!a?.PendingDestroy)
          return CreatureController.DelayRemoveEntityFinished(e), !0;
        a.HandlePendingDestroy();
      }
      l.GetEntityType() === Protocol_1.Aki.Protocol.kks.HI_
        ? e.Entity.GetComponent(230).HandlePendingDestroy()
        : r === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeDrop
          ? (o = e.Entity.GetComponent(147)) && o.DestroyWithEffect()
          : l.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem &&
            e.Entity.GetComponent(131).HandleDestroyState();
    }
    return !0;
  }
  static SummonRequest(e, t, r, o, a, l = 0) {
    var n,
      i,
      _,
      C = SummonCfgById_1.configSummonCfgById.GetConfig(a);
    if (void 0 === C)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.SummonRequest] 召唤表中找不到对应配置。",
          ["召唤表Id", a],
        );
    else if (
      ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
        C.BlueprintType,
      )
    ) {
      if (
        ModelManager_1.ModelManager.CreatureModel.GetEntityModel(
          C.BlueprintType,
        )
      )
        return (
          (n = EntitySystem_1.EntitySystem.Get(o)
            ?.GetComponent(0)
            .GetCreatureDataId()),
          (i = CreatureController.GenUniqueId()),
          0 < l
            ? (((_ = Protocol_1.Aki.Protocol.xcs.create()).DKn = this.sfr(
                e,
                t,
                r,
                a,
                i,
              )),
              (_.AKn = MathUtils_1.MathUtils.NumberToLong(n)),
              (_.K7n = l),
              CreatureController.Summon2RequestInternal(_, i, o))
            : (((l = Protocol_1.Aki.Protocol.Ucs.create()).DKn = this.sfr(
                e,
                t,
                r,
                a,
                i,
              )),
              (l.AKn = MathUtils_1.MathUtils.NumberToLong(n)),
              CreatureController.SummonRequestInternal(l, i)),
          i
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.SummonRequest] 找不到新实体配置。",
          ["BlueprintType", C.BlueprintType],
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.SummonRequest] 不存在新实体配置。",
          ["BlueprintType", C.BlueprintType],
        );
  }
  static sfr(e, t, r, o, a) {
    var l = Protocol_1.Aki.Protocol.s4s.create(),
      e =
        ((l.r5n = e),
        (l.rVn = t),
        (l.l8n = r.GetLocation()),
        Protocol_1.Aki.Protocol.D2s.create()),
      t = r.Rotator();
    return (
      (e.Pitch = t.Pitch),
      (e.Roll = t.Roll),
      (e.Yaw = t.Yaw),
      (l._8n = e),
      (l.UKn = o),
      (l.RKn = MathUtils_1.MathUtils.NumberToLong(a)),
      l
    );
  }
  static async SummonRequestInternal(e, t) {
    e = await Net_1.Net.CallAsync(17813, e);
    return (
      e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ||
      (ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(t),
      CreatureController.RemoveEntity(t, "SummonRequestInternal"),
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Q4n,
        19425,
      ),
      !1)
    );
  }
  static async Summon2RequestInternal(e, t, r) {
    e = await Net_1.Net.CallAsync(29384, e);
    return e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? (ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(t),
        CreatureController.RemoveEntity(t, "Summon2RequestInternal"),
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          19088,
        ),
        !1)
      : (EntitySystem_1.EntitySystem.Get(r)
          .GetComponent(0)
          .SetSummonsVersion(e.K7n),
        !0);
  }
  static async RemoveSummonEntityRequest(e, t, r) {
    var o = Protocol_1.Aki.Protocol.scs.create(),
      r =
        ((o.xKn = [
          ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(r),
        ]),
        (o.PKn = Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce),
        (o.r5n = e),
        (o.YWn =
          ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(t)),
        await Net_1.Net.CallAsync(27803, o));
    return (
      r.G9n === Protocol_1.Aki.Protocol.Q4n.KRs ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        r.G9n,
        26094,
      ),
      !1)
    );
  }
  static async RemoveSummonEntityByServerIdRequest(e, t, r) {
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)
        ?.Entity?.GetComponent(0)
        .GetEntityType(),
      a = Protocol_1.Aki.Protocol.scs.create(),
      r =
        ((a.xKn = [MathUtils_1.MathUtils.NumberToLong(r)]),
        (a.PKn =
          o && o === Protocol_1.Aki.Protocol.kks.Proto_SceneItem
            ? Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeNormal
            : Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce),
        (a.r5n = e),
        (a.YWn =
          ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(t)),
        await Net_1.Net.CallAsync(27803, a));
    return (
      r.G9n === Protocol_1.Aki.Protocol.Q4n.KRs ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        r.G9n,
        26094,
      ),
      !1)
    );
  }
  static async ChangeEntityRoleRequest(e, t) {
    var r, o;
    return 0 === e
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[CreatureController.ChangeEntityRoleRequest] 实体ID无效。",
            ["EntityId", e],
          ),
        !1)
      : (r = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e))
        ? (((o = Protocol_1.Aki.Protocol.hcs.create()).s5n =
            MathUtils_1.MathUtils.NumberToLong(r)),
          (o.W5n = t),
          !(
            !(t = await Net_1.Net.CallAsync(24006, o)) ||
            (t.KRs
              ? (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r))
                ? (o.Entity.GetComponent(0).SetPlayerId(t.W5n),
                  o.IsInit &&
                    ((t =
                      ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
                      t.W5n),
                    o.Entity.GetComponent(1).SetAutonomous(t)),
                  0)
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "World",
                      3,
                      "[CreatureController.ChangeEntityRoleRequest] 不存在实体Entity。",
                      ["CreatureDataId", r],
                    ),
                  1)
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "World",
                    3,
                    "[CreatureController.ChangeEntityRoleRequest] 改变权限失败。",
                    ["EntityId", e],
                  ),
                1))
          ))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              3,
              "[CreatureController.ChangeEntityRoleRequest] 实体ID无效。",
              ["EntityId", e],
              ["CreatureDataId", r],
            ),
          !1);
  }
  static NotifySpawnBoss(e) {
    var t;
    e &&
      (t = e.Entity.GetComponent(3)) &&
      t.IsBoss &&
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SpawnBoss, e);
  }
  static async H$a(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      r = e.f5n,
      o = e.W5n;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "World",
        16,
        "[CreatureController.LeaveSceneNotify] LeaveSceneNotify",
        ["leavePlayerId", o],
        ["myPlayerId]", t],
        ["option", r],
      ),
      ModelManager_1.ModelManager.GameModeModel.Loading &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "[CreatureController.LeaveSceneNotify] 等待Loading(开始)",
          ),
        Net_1.Net.PauseAllNotifyCallback(),
        await TaskSystem_1.TaskSystem.Promise,
        Net_1.Net.ResumeAllNotifyCallback(),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "World",
          3,
          "[CreatureController.LeaveSceneNotify] 等待Loading(完成)",
        ),
      o !== t
        ? (ModelManager_1.ModelManager.CreatureModel.RemoveScenePlayerData(o),
          ModelManager_1.ModelManager.VehicleModel.RemoveOtherPlayerVehicleData(
            o,
          ),
          ModelManager_1.ModelManager.OnlineModel.RemovePlayerDisableHandles(o),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ScenePlayerLeaveScene,
            e.W5n,
          ))
        : ModelManager_1.ModelManager.GameModeModel.HasGameModeData
          ? ((ModelManager_1.ModelManager.GameModeModel.HasGameModeData = !1),
            (ModelManager_1.ModelManager.GameModeModel.JoinSceneInfo = void 0),
            o === t &&
              (ModelManager_1.ModelManager.CreatureModel.GetIsLoadingScene()
                ? Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "World",
                    16,
                    "[CreatureController.LeaveSceneNotify] 场景加载中",
                  )
                : (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.LeaveInstanceDungeon,
                    ),
                  r && CreatureController.ParseTravelConfig(e.f5n),
                  ModelManager_1.ModelManager.SeamlessTravelModel
                    .IsSeamlessTravel
                    ? (Net_1.Net.PauseAllNotifyCallback(),
                      await SeamlessTravelController_1.SeamlessTravelController.PreLeaveLevel(),
                      Net_1.Net.ResumeAllNotifyCallback())
                    : BlackScreenController_1.BlackScreenController.AddBlackScreen(
                        "None",
                        "LeaveScene",
                      ),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.DoLeaveLevel,
                  ),
                  ModelManager_1.ModelManager.SeamlessTravelModel
                    .IsSeamlessTravel &&
                    SeamlessTravelController_1.SeamlessTravelController.PostLeaveLevel())))
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "World",
                3,
                "不存在场景数据，服务器下发LeaveSceneNotify流程有问题",
              ),
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "World",
                16,
                "[CreatureController.LeaveSceneNotify] 副本Id不存在",
              ));
  }
  static async SceneLoadingFinishRequest(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("World", 5, "世界加载完成", ["SceneId", e]);
    var t = new Protocol_1.Aki.Protocol.zds(),
      e = ((t.BKn = e), await Net_1.Net.CallAsync(25859, t));
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Q4n,
        17840,
      ),
      (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1));
  }
  static DBi() {
    UE.KuroTencentCOSLibrary.ClearAllProgressCallback(),
      this.nZa &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.UploadEventCallBack),
        (this.nZa = void 0));
  }
  static IBi() {
    CreatureController.DBi(),
      (this.nZa = (0, puerts_1.toManualReleaseDelegate)(
        this.UploadEventCallBack,
      )),
      LogController_1.LogController.RequestOutputDebugInfo(),
      LauncherLogUpload_1.LauncherLogUpload.SendLog(this.nZa);
  }
  static AnimalDieRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.pes.create();
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (r.l8n = Protocol_1.Aki.Protocol.Gks.create()),
      (r.l8n.X = t.X),
      (r.l8n.Y = t.Y),
      (r.l8n.Z = t.Z),
      Net_1.Net.Call(17340, r, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrAnimalEntityNotExist &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            15843,
          );
      });
  }
  static AnimalDropItemRequest(e) {
    var t = Protocol_1.Aki.Protocol.Ies.create();
    (t.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(17397, t, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrAnimalEntityNotExist &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            26993,
          );
      });
  }
  static AnimalDestroyRequest(e) {
    var t = Protocol_1.Aki.Protocol.Ees.create();
    (t.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(27979, t, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrAnimalEntityNotExist &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            26378,
          );
      });
  }
  static LandingDamageRequest(e, t, r) {
    var o = Protocol_1.Aki.Protocol.yis.create();
    (o.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (o.wKn = t),
      (o.bKn = r),
      Net_1.Net.Call(29733, o, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            26606,
          );
      });
  }
  static AddPublicTags(e, t) {
    var r = EntitySystem_1.EntitySystem.Get(e);
    if (r) {
      var o = r.GetComponent(0);
      for (const a of t) o.AddPublicTags(a);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.AddPublicTags] 不存Entity，添加公有标签失败。",
          ["EntityId", e],
        );
  }
  static RemovePublicTags(e, t) {
    var r = EntitySystem_1.EntitySystem.Get(e);
    if (r) {
      var o = r.GetComponent(0);
      for (const a of t) o.RemovePublicTag(a);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.RemovePublicTags] 不存在Entity,删除公有标签失败。",
          ["EntityId", e],
        );
  }
  static async HardnessModeChangedRequest(e, t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
      r = Protocol_1.Aki.Protocol.Dcs.create();
    return (
      (r.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (r.$Wn = t),
      await Net_1.Net.CallAsync(27860, r),
      new Promise((e) => {
        e(!0);
      })
    );
  }
  static GenUniqueId() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      e = BigInt(e);
    return (this.xe += increment), Number((e << playerBit) | this.xe);
  }
  static ResumeId(e) {
    e
      ? 0n === (1n & e)
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("World", 3, "服务恢复实体Id有问题。", ["LastId", e])
        : (this.xe = e & unitMax)
      : (this.xe = idDefaultValue);
  }
  static async hfr(r) {
    var o = ModelManager_1.ModelManager.CreatureModel,
      a = ModelManager_1.ModelManager.GameModeModel;
    if (a.HasGameModeData)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.JoinSceneNotify] 未清理前一个场景的数据,就下发了JoinSceneNotify，服务器流程有问题",
        );
    else if (ModelManager_1.ModelManager.GameModeModel.Loading)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.JoinSceneNotify] 上一次Loading没有完成",
        );
    else {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "World",
          3,
          "[CreatureController.JoinSceneNotify] JoinSceneNotify",
        ),
        Net_1.Net.PauseAllNotifyCallback(),
        await ModelManager_1.ModelManager.LoginModel.WaitLoginPromise(),
        LevelSequencePlayer_1.LevelSequencePlayer.SetBanned(!0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ClearSceneBegin,
        ),
        await GlobalData_1.GlobalData.ClearSceneDone?.Promise,
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "[CreatureController.JoinSceneNotify] 场景清理完成",
          ),
        Net_1.Net.ResumeAllNotifyCallback(),
        CombatMessageController_1.CombatMessageController.FlushMessagePack(),
        (a.LoadingPhase = 2);
      var l = r.$Rs,
        e = (a.JoinSceneInfo = l).d5n,
        n =
          ((o.LeavingLevel = !1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "World",
              3,
              "[CreatureController.JoinSceneNotify] Begin",
              ["InstanceId", e],
            ),
          Protocol_1.Aki.Protocol.EC_.create());
      if (
        ((n.brl = l.brl),
        Net_1.Net.Call(15707, n, () => {}),
        o.SetIsLoadingScene(!0),
        ControllerHolder_1.ControllerHolder.GameModeController.SetGameModeData(
          e,
          l.E7n,
        ))
      )
        if (
          (CreatureController.ResumeId(
            MathUtils_1.MathUtils.LongToBigInt(r.HRs),
          ),
          o.SetInstanceId(e),
          (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
            e),
          o.InitEntityDataConfig(
            ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
              .MapConfigId,
          ))
        ) {
          PublicUtil_1.PublicUtil.RegisterEditorLocalConfig(),
            o.InitDynamicEntityDataConfig(),
            FormationDataController_1.FormationDataController.RefreshPlayerEntities(),
            o.SetWorldOwner(l.nIs),
            o.SetSceneId(l.BKn),
            o.SetSceneTraceId(MathUtils_1.MathUtils.LongToBigInt(l.brl));
          (n = l.RRs), (r = l.TRs);
          if (r) {
            const c = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
            var i = r.find((e) => e.W5n === c);
            i
              ? (CharacterBuffController_1.default.SetHandlePrefix(
                  i.mRs,
                  i.CRs,
                ),
                ModelManager_1.ModelManager.CombatMessageModel.SetLastPrefix(
                  i.mRs,
                ),
                ModelManager_1.ModelManager.OnlineModel.SetPlayerGravityIsNormal(
                  i.ZE_,
                ))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "World",
                  3,
                  "[CreatureController.JoinSceneNotify] 未找到自身玩家信息",
                  ["PlayerId", c],
                );
          }
          CreatureController.lfr(n.gDs),
            ModelManager_1.ModelManager.BlackboardModel.SetWorldBlackboardByProtocol(
              l.pIs,
            );
          let e = (Global_1.Global.BaseCharacter = void 0),
            t = void 0;
          if (r) {
            var _ = new Array();
            for (const y of r) {
              var C = y.W5n,
                s = new ScenePlayerData_1.ScenePlayerData(C),
                d = (s.SetTimerStart(), new Array());
              for (const M of y.ERs) {
                var u = [];
                for (const v of M.gRs) {
                  var g = new SceneTeamData_1.SceneTeamRole();
                  (g.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(
                    v.F4n,
                  )),
                    (g.RoleId = v.Q6n),
                    (g.OnStageWithoutControl = v.eT_),
                    u.push(g);
                }
                d.push({
                  GroupType: M.USs,
                  GroupRoleList: u,
                  CurrentRoleId: M.NVn,
                  LivingState:
                    ControllerHolder_1.ControllerHolder.SceneTeamController.GetLivingSate(
                      M.JEs,
                    ),
                });
              }
              _.push({ PlayerId: C, CurrentGroupType: y.USs, Groups: d }),
                o.AddScenePlayerData(y.W5n, s),
                y.W5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
                  ((e = y.P5n), (t = y.g8n));
            }
            ModelManager_1.ModelManager.SceneTeamModel.UpdateAllPlayerData(_),
              ModelManager_1.ModelManager.VehicleModel.UpdateAllPlayerVehicleData(
                r,
              );
          }
          ModelManager_1.ModelManager.OnlineModel.ResetContinuingChallengeConfirmState(),
            a.SetBornInfo(e, t),
            TimeOfDayController_1.TimeOfDayController.SyncSceneTime(
              l.ARs.rjn,
              l.ARs.ojn,
              l.ARs.FRs,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.InitArea,
              l.wRs,
            ),
            o.SetRestoreEntityId(l.xRs),
            ControllerHolder_1.ControllerHolder.GameAudioController.UpdateAudioState(
              l.wSs,
            ),
            ControllerHolder_1.ControllerHolder.GameAudioController.UpdateLoadingType(
              1,
            ),
            (ModelManager_1.ModelManager.BulletModel.SceneBulletOwnerId =
              MathUtils_1.MathUtils.LongToNumber(l.tla)),
            await ControllerHolder_1.ControllerHolder.GameModeController.Load(
              ModelManager_1.ModelManager.GameModeModel.JoinSceneInfo,
            ),
            ControllerHolder_1.ControllerHolder.GameAudioController.UpdateLoadingType(
              void 0,
            );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              3,
              "[CreatureController.JoinSceneNotify] 初始化EntityDataConfig失败。",
              ["InstanceId", e],
            );
      else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "[CreatureController.JoinSceneNotify] 设置GameModeData失败。",
            ["InstanceId", e],
          );
    }
  }
  static lfr(e) {
    for (const t of e) this.CreateEntity(t);
  }
  static CreateEntity(e, t = "Default") {
    var r,
      o,
      a = MathUtils_1.MathUtils.LongToNumber(e.s5n),
      l = e.zHn;
    if (
      l === Protocol_1.Aki.Protocol.kks.Proto_Npc &&
      ModelManager_1.ModelManager.CreatureModel.GetOrAddDensityItem(a, e)
        .DensityLevel > this.hYs
    )
      return (
        (r = e.ZHn),
        (o = e.v9n),
        void (
          this.CheckEnableEntityLog(l) &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            6,
            "[实体生命周期:创建实体] CreateEntity(Density拦截)",
            ["CreatureDataId", a],
            ["ConfigType", r],
            ["PbDataId", o],
            ["EntityType", l],
            ["Context", t],
          )
        )
      );
    return this._Ys(a, e, t);
  }
  static GetDensityItemByPbDataId(e) {
    return ModelManager_1.ModelManager.CreatureModel.GetDensityItemByPbDataId(
      e,
    );
  }
  static _Ys(t, r, o) {
    var a = ModelManager_1.ModelManager.CreatureModel,
      l = r.ZHn,
      n = r.v9n,
      i = r.LEs,
      _ = r.zHn,
      C = r.rVn;
    if (
      (this.CheckEnableEntityLog(_) &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "[实体生命周期:创建实体] CreateEntity(开始)",
          ["CreatureDataId", t],
          ["ConfigType", l],
          ["PbDataId", n],
          ["PrefabId", i],
          ["IsVisible", C],
          ["Context", o],
        ),
      SeamlessTravelController_1.SeamlessTravelController.WasRoleInSeamlessTraveling(
        t,
      ))
    ) {
      const e =
        ModelManager_1.ModelManager.SeamlessTravelModel.GetSeamlessTravelRoleEntityHandle(
          t,
        );
      o = e?.Entity?.GetComponent(0);
      return o
        ? (ModelManager_1.ModelManager.CreatureModel.RemoveEntity(
            t,
            "无缝加载复用实体",
          ),
          (e.CreatureDataId = t),
          ModelManager_1.ModelManager.CreatureModel.AddEntity(t, e),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Battle", 4, "[无缝加载:重新添加保留实体", [
              "creatureDataId",
              t,
            ]),
          ModelManager_1.ModelManager.CreatureModel.CheckSetPrefabEntity(e),
          o.SetCreatureDataId(t),
          o.SetLocation(r.l8n),
          o.SetRotation(r._8n),
          e)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("SeamlessTravel", 50, "无缝加载复用Entity失败")
          );
    }
    if (a.ExistEntity(t))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          3,
          "[实体生命周期:创建实体] 已经存在实体，创建实体失败。",
          ["CreatureDataId", t],
          ["ConfigType", l],
          ["PbDataId", n],
          ["PrefabId", i],
        );
    else if (Global_1.Global.WorldEntityHelper) {
      var s = new CreateEntityData_1.CreateEntityData();
      s.Init(r);
      let e = void 0;
      switch (_) {
        case Protocol_1.Aki.Protocol.kks.HI_:
        case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        case Protocol_1.Aki.Protocol.kks.Proto_Animal:
        case Protocol_1.Aki.Protocol.kks.Proto_Npc:
        case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
        case Protocol_1.Aki.Protocol.kks.Proto_Custom:
        case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        case Protocol_1.Aki.Protocol.kks.Proto_Player:
        case Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity:
        case Protocol_1.Aki.Protocol.kks.Proto_SceneEntity:
          e = Global_1.Global.WorldEntityHelper.CreateWorldEntity(s);
          break;
        default:
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "[实体生命周期:创建实体] 下发了不支持的实体类型, 创建实体失败。",
              ["CreatureDataId", t],
              ["ConfigType", l],
              ["PbDataId", n],
              ["PrefabId", i],
              ["EntityType", _],
            )
          );
      }
      if (e?.Valid) {
        if (
          (a.AddEntity(t, e),
          ControllerHolder_1.ControllerHolder.CharacterController.InitData(
            e,
            e.Entity,
            s,
          ))
        )
          return (
            CreatureController.SetEntityEnable(
              e.Entity,
              C,
              "CreatureController.CreateEntity",
            ),
            a.AddLoadingEntity(e),
            a.AddOwnerEntityInfo(t),
            (o = e.Entity.GetComponent(0)),
            a.CheckSetPrefabEntity(e),
            this.CheckEnableEntityLog(e) &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Entity",
                3,
                "[实体生命周期:创建实体] 实体详细数据。",
                ["CreatureDataId", t],
                ["EntityId", e.Id],
                ["ConfigType", l],
                ["EntityType", o.GetEntityType()],
                ["PbDataId", n],
                ["PrefabId", i],
                ["ModelId", o.GetModelId()],
                ["ModelBlueprintPath", o.ModelBlueprintPath],
                ["Visible", o.GetVisible()],
                ["PlayerId", o.GetPlayerId()],
                ["OwnerId", o.GetOwnerId()],
                ["Location", o.GetLocation()],
                ["Rotation", o.GetRotation()],
                ["Flag", e.Entity?.Flag],
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CreateEntity,
              o,
              e,
            ),
            e
          );
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[实体生命周期:创建实体] InitData失败，创建实体失败。",
            ["CreatureDataId", t],
            ["ConfigType", l],
            ["PbDataId", n],
            ["PrefabId", i],
          ),
          a.RemoveEntity(t, "CreateEntity执行InitData失败"),
          ControllerHolder_1.ControllerHolder.CharacterController.Destroy(e);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[实体生命周期:创建实体] entity.Valid=false，创建实体失败。",
            ["CreatureDataId", t],
            ["ConfigType", l],
            ["PbDataId", n],
            ["PrefabId", i],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          3,
          "[实体生命周期:创建实体] WorldEntityHelper不存在，创建实体失败。",
          ["CreatureDataId", t],
          ["ConfigType", l],
          ["PbDataId", n],
          ["PrefabId", i],
        );
  }
  static DestroyEntity(r, e = !0) {
    var t, o, a, l;
    !r?.Valid ||
      (e && r.PendingRemoving) ||
      ((r.PendingRemoving = !0),
      (o = (t = (l = r.Entity).GetComponent(0)).GetCreatureDataId()),
      this.aTa.delete(o),
      this.IEa.RemoveEntity(r),
      ControllerHolder_1.ControllerHolder.CreatureGroupController.RemoveFromBindGroup(
        o,
        "DestroyEntity",
      ),
      this.CheckEnableEntityLog(r) &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "[实体生命周期:删除实体] DestroyEntity开始",
          ["CreatureDataId", t.GetCreatureDataId()],
          ["EntityId", r.Id],
          ["PendingRemove", e],
        ),
      (a = l.GetComponent(1)?.Owner)?.IsValid() &&
        Global_1.Global.BaseCharacter === a &&
        Global_1.Global.CharacterController &&
        (Global_1.Global.CharacterController.UnPossess(),
        (Global_1.Global.BaseCharacter = void 0)),
      l.Disable("DestroyEntity"),
      e
        ? (r.AllowDestroy ||
            TimerSystem_1.TimerSystem.Delay(() => {
              if (r.Valid && !r.AllowDestroy) {
                for (var [e, t] of r.HoldEntityMap)
                  Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "World",
                      3,
                      "非法持有PendingRemove的Entity",
                      ["CreatureDataId", r.CreatureDataId],
                      ["EntityId", r.Id],
                      ["Reason", e],
                      ["Count", t],
                    );
                r.ClearHoldEntity();
              }
            }, HOLD_ENTITY_TIMEOUT),
          ModelManager_1.ModelManager.CreatureModel.AddPendingRemoveEntity(
            t.GetCreatureDataId(),
            r,
          ))
        : Global_1.Global.WorldEntityHelper
          ? ((l = Global_1.Global.WorldEntityHelper.Destroy(r))
              ? ModelManager_1.ModelManager.WorldModel.AddDestroyActor(
                  o,
                  r.Id,
                  a,
                )
              : ControllerHolder_1.ControllerHolder.WorldController.DestroyEntityActor(
                  o,
                  r.Id,
                  a,
                  !1,
                ),
            this.CheckEnableEntityLog(r) &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Entity",
                3,
                "[实体生命周期:删除实体] DestroyEntity结束",
                ["CreatureDataId", o],
                ["EntityId", r.Id],
                ["EntitySystem.DestroyEntity结果", l],
              ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "[实体生命周期:删除实体] WorldEntityHelper不存在，删除实体失败。",
              ["CreatureDataId", o],
              ["EntityId", r.Id],
            ));
  }
  static LoadEntityAsync(e, t) {
    ModelManager_1.ModelManager.GameModeModel.MapDone
      ? this.TEa(e, this.nja)
        ? this.IEa.QueueToInvoke(
            e,
            t,
            this.nja.Component.GetCreatureDataId(),
            this.nja.Component.GetPbDataId(),
          )
        : t?.(this.nja.Result)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[实体生命周期:创建实体] 地图未加载完成，创建实体失败。",
            ["EntityId", e?.Id],
            ["CreatureDataId", e?.CreatureDataId],
            ["PbDataId", e?.PbDataId],
          ),
        t?.(2));
  }
  static TEa(e, t) {
    var r;
    return (
      (t.Component = void 0),
      e?.Valid
        ? (r = e.Entity.GetComponent(0)).GetRemoveState()
          ? !(t.Result = 4)
          : e.IsInit
            ? !(t.Result = 3)
            : ((t.Result = 0), (t.Component = r), !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "[实体生命周期:创建实体] entity.Valid=false，创建实体失败。",
            ),
          !(t.Result = 2))
    );
  }
  static LEa(r, o) {
    if (!this.TEa(r, this.nja)) return this.nja.Result;
    const a = this.nja.Component;
    if (PreloadDefine_1.PreloadSetting.UseNewPreload && a.GetPreloadFinished())
      return 3;
    if (!a.GetLoading()) {
      a.SetLoading(!0);
      let t = void 0;
      ModelManager_1.ModelManager.PreloadModel.UseEntityProfilerInternal &&
        (t = new LogProfiler_1.LogProfiler(
          "预加载实体Profiler:" + a.GetCreatureDataId(),
        )).Start();
      const l = (e) => {
        this.CheckEnableEntityLog(r) &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Preload",
            3,
            "预加载实体:结束",
            ["EntityId", r.Id],
            ["CreatureDataId", a.GetCreatureDataId()],
            ["PbDataId", a.GetPbDataId()],
            ["是否成功", 3 === e],
            ["预加载结果", e],
          ),
          ModelManager_1.ModelManager.PreloadModel.UseEntityProfilerInternal &&
            (t.Stop(), Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info("Preload", 3, t.ToString()),
          !r?.Valid || a.GetRemoveState() ? o(4) : o(e);
      };
      this.CheckEnableEntityLog(r) &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Preload",
          3,
          "预加载实体:开始",
          ["EntityId", r.Id],
          ["CreatureDataId", a.GetCreatureDataId()],
          ["PbDataId", a.GetPbDataId()],
          ["Reason", "CreatureController.LoadEntityAsync"],
        ),
        PreloadDefine_1.PreloadSetting.UseNewPreload
          ? PreloadControllerNew_1.PreloadControllerNew.PreloadEntity(r, t, l)
          : PreloadController_1.PreloadController.PreloadEntity(r, t, (e) => {
              e = e ? 3 : 2;
              l(e);
            });
    }
    return 1;
  }
  static cfr(t, r) {
    if (t?.Valid) {
      const l = t.Entity.GetComponent(0),
        n = l.GetCreatureDataId();
      if (l.GetRemoveState())
        ControllerHolder_1.ControllerHolder.CreatureGroupController.RemoveFromBindGroup(
          n,
          "RemoveStateBeforeQueue",
        ),
          r?.(4);
      else {
        var e =
          ControllerHolder_1.ControllerHolder.CreatureGroupController.GetBindGroup(
            n,
          );
        if (e) {
          var o = Math.max(
            ...e.map(
              (e) =>
                ModelManager_1.ModelManager.CreatureModel.GetEntity(e)
                  ?.Priority ?? 0,
            ),
          );
          for (const i of e) {
            var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(i);
            a?.Valid &&
              ((a.Priority = o),
              ControllerHolder_1.ControllerHolder.CharacterController.SortItem(
                a,
              ));
          }
        }
        ControllerHolder_1.ControllerHolder.CharacterController.AddEntityToAwakeQueue(
          t,
          (e) => {
            e
              ? l.GetRemoveState()
                ? (ControllerHolder_1.ControllerHolder.CreatureGroupController.RemoveFromBindGroup(
                    n,
                    "RemoveStateAfterQueue",
                  ),
                  r?.(4))
                : (t?.Entity?.ExecutePendingEnableProcess(),
                  r && CreatureController.aTa.set(n, r),
                  ControllerHolder_1.ControllerHolder.CreatureGroupController.HasBindGroup(
                    n,
                  )
                    ? ControllerHolder_1.ControllerHolder.CreatureGroupController.RefreshBindGroup(
                        n,
                        "Entity Started",
                      )
                    : CreatureController.ActivateEntityRequest(t))
              : (ControllerHolder_1.ControllerHolder.CreatureGroupController.RemoveFromBindGroup(
                  n,
                  "initOrStartFailed",
                ),
                r?.(2));
          },
        );
      }
    } else
      ControllerHolder_1.ControllerHolder.CreatureGroupController.RemoveFromBindGroup(
        t.CreatureDataId,
        "handleInvalid",
      ),
        r?.(4);
  }
  static ActivateEntityRequest(n) {
    var e = 8 & (n.Entity?.Flag ?? 0);
    if (!e && !n.HasSendingRequest)
      if (((n.HasSendingRequest = !0), GlobalData_1.GlobalData.Networking())) {
        const i = n.Entity.GetComponent(0);
        switch (i.GetEntityType()) {
          case Protocol_1.Aki.Protocol.kks.Proto_Custom:
          case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
          case Protocol_1.Aki.Protocol.kks.Proto_Animal:
            return void CreatureController._Ta(n, !0);
        }
        e = Protocol_1.Aki.Protocol.ges.create();
        const _ = i.GetCreatureDataId();
        (e.F4n = MathUtils_1.MathUtils.NumberToLong(_)),
          this.CheckEnableEntityLog(n) &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              3,
              "[实体生命周期:创建实体] 请求Activate实体",
              ["CreatureDataId", _],
              ["PbDataId", i.GetPbDataId()],
              ["EntityId", n.Id],
            ),
          Net_1.Net.Call(24312, e, (t) => {
            var r = 8 & (n.Entity?.Flag ?? 0);
            if (!r) {
              let e = !1;
              if (t)
                if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
                  (e = !0),
                    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                      t.Q4n,
                      18860,
                      void 0,
                      !1,
                      !0,
                    );
                else {
                  CreatureController.SetEntityEnable(
                    n.Entity,
                    t.rVn,
                    "EntityActiveResponse",
                  );
                  var r = WorldGlobal_1.WorldGlobal.ToUeVector(t.l8n),
                    o = WorldGlobal_1.WorldGlobal.ToUeRotator(t._8n);
                  n.Entity.GetComponent(1)?.SetActorLocationAndRotation(
                    r,
                    o,
                    "ActivateEntityRequest",
                  );
                  for (const l of t.zEs) {
                    var a = l.C3s;
                    i.ComponentDataMap.set(a, l);
                  }
                }
              else e = !0;
              ModelManager_1.ModelManager.CreatureModel.GetEntityId(_) !== n.Id
                ? Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Entity",
                    3,
                    "[实体生命周期:创建实体] 激活实体时，实体已经销毁",
                    ["CreatureDataId", _],
                    ["EntityConfigType", i.GetEntityConfigType()],
                    ["PbDataId", i.GetPbDataId()],
                  )
                : (e &&
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "[实体生命周期:创建实体] 激活实体消息异常，创建实体失败。",
                      ["CreatureDataId", _],
                      ["EntityConfigType", i.GetEntityConfigType()],
                      ["PbDataId", i.GetPbDataId()],
                    ),
                  this.CheckEnableEntityLog(n) &&
                    Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Entity",
                      3,
                      "[实体生命周期:创建实体] 服务器返回Activate实体成功",
                      ["CreatureDataId", _],
                      ["PbDataId", i.GetPbDataId()],
                      ["EntityId", n.Id],
                    ),
                  CreatureController._Ta(n, !0));
            }
          });
      } else CreatureController._Ta(n, !0);
  }
  static dfr(e) {
    var t = e.Entity.GetComponent(0),
      r = (t.SetLoading(!1), e.Entity.GetComponent(1)?.Owner),
      o = t.GetEntityType();
    return o === Protocol_1.Aki.Protocol.kks.Proto_Custom ||
      o === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity ||
      o === Protocol_1.Aki.Protocol.kks.Proto_SceneEntity ||
      r
      ? (this.CheckEnableEntityLog(e) &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[实体生命周期:创建实体] 实体创建成功",
            ["CreatureDataId", t.GetCreatureDataId()],
            ["EntityId", e.Id],
            ["PbDataId", t.GetPbDataId()],
            ["Entity.Active", e.Entity.Active],
          ),
        CreatureController.SetEntityEnable(
          e.Entity,
          t.GetVisible(),
          "CreatureController.AfterEntityActivate",
        ),
        CreatureController.NotifyAddEntity(
          Protocol_1.Aki.Protocol.Nks.Proto_Normal,
          e,
          r,
        ) &&
          (CreatureController.NotifySpawnBoss(e),
          t.IsRole() && ModelManager_1.ModelManager.WorldModel.AddIgnore(r),
          t.IsPlayer()) &&
          ((o = t.GetPlayerId()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SpawnPlayer,
            e,
            o,
          )),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[实体生命周期:创建实体] actor无效，注意检查前面的组件的报错，创建实体失败。",
            ["CreatureDataId", t.GetCreatureDataId()],
            ["EntityId", e.Id],
            ["PbDataId", t.GetPbDataId()],
          ),
        !1);
  }
  static ChangeMeshAnim(e, t, r) {
    e.SetSkeletalMesh(t), e.SetAnimClass(r);
  }
  static OnLeaveLevel() {
    var e = ModelManager_1.ModelManager.CreatureModel,
      t = e.GetPlayerId();
    if (0 !== t) {
      (e.LeavingLevel = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "[CreatureController.OnLeaveLevel] OnLeaveLevel 开始",
          ),
        ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel ||
          CameraController_1.CameraController.FightCamera.LogicComponent.SetCharacter(
            void 0,
          ),
        ConfigManager_1.ConfigManager.WorldConfig.ClearCommonSkillData();
      try {
        var r = e.GetAllEntities(),
          o = e.DelayRemoveContainer.GetAllEntities();
        for (let e = o.length - 1; 0 <= e; e--) {
          var a = o[e];
          CreatureController.DestroyEntity(a, !1);
        }
        for (let e = r.length - 1; 0 <= e; e--) {
          var l = r[e],
            n = l.Entity.GetComponent(0);
          SeamlessTravelController_1.SeamlessTravelController.WasRoleEntityInSeamlessTraveling(
            l.Entity,
          )
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 4, "[无缝加载:保留实体]", [
                "EntityId",
                l.Id,
              ])
            : CreatureController.RemoveEntity(
                n.GetCreatureDataId(),
                "OnLeaveLevel",
              ) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "World",
                  3,
                  "[CreatureController.ClearWorldData] 销毁实体失败。",
                  ["CreatureDataId", n.GetCreatureDataId()],
                  ["实体类型", n.GetEntityType()],
                ));
        }
        ControllerHolder_1.ControllerHolder.WorldController.DoLeaveLevel(),
          ModelManager_1.ModelManager.AttachToActorModel.ClearEntityActor(
            "CreatureController.OnLeaveLevel",
          );
      } catch (e) {
        e instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "World",
              3,
              "[CreatureController.ClearWorldData] 销毁实体异常。",
              e,
              ["error", e.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              3,
              "[CreatureController.ClearWorldData] 销毁实体异常。",
              ["error", e],
            );
      }
      Info_1.Info.IsBuildDevelopmentOrDebug ||
        (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog = !1),
        (e.LeavingLevel = !1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "[CreatureController.OnLeaveLevel] OnLeaveLevel 结束",
          );
    }
    return !0;
  }
  static ChangeLockTagByCreatureGenId(e, t) {
    var r;
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      o.IsInit &&
        o.Entity.GetComponent(0).GetOwnerId() === e &&
        (r = o.Entity.GetComponent(102)) &&
        r.ChangeLockTag(t);
  }
  static ChangeLockTagByTeleportPbDataId(e, t) {
    var r;
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      o.IsInit &&
        o.Entity.GetComponent(0).GetPbDataId() === e &&
        (r = o.Entity.GetComponent(102)) &&
        r.ChangeLockTag(t);
  }
  static LoadActorByPbModelConfig(e, t) {
    var r = UE.KismetSystemLibrary.Conv_SoftClassPathToSoftClassRef(
      UE.KismetSystemLibrary.MakeSoftObjectPath(e.BluePrintClass),
    );
    if (r)
      return (
        (r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          r.ToAssetPathName(),
          UE.Class,
        )),
        (r = ActorSystem_1.ActorSystem.Get(r, t))?.IsValid() &&
          (r.SetActorHiddenInGame(!0),
          r.SetActorTickEnabled(!1),
          r.SetActorEnableCollision(!1)),
        r
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "World",
        3,
        "[CreatureController.LoadActorByModelConfig] 加载Actor失败，因为模型的蓝图没有设置。",
        ["BluePrintId", e.BluePrintId],
      );
  }
  static AddDelayRemoveEntity(e, t) {
    var r = ModelManager_1.ModelManager.CreatureModel;
    r.AddDelayRemoveEntity(e, t)
      ? r.RemoveEntity(e, "AddDelayRemoveEntity 加入延迟删除列表")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.AddPendingRemoveEntity] 实体添加到PendingRemoveEntityMap列表失败。",
          ["CreatureDataId", e],
        );
  }
  static CheckDelayRemove(e, t, r) {
    var o = ModelManager_1.ModelManager.CreatureModel;
    let a = o.GetEntityWithDelayRemoveContainer(e);
    return (
      !!(a =
        a || t !== Protocol_1.Aki.Protocol.rLs.F6n
          ? a
          : o.DelayRemoveContainer.GetEntityByPbDataId(r))?.Valid &&
      (o.RemoveDelayRemoveEntity(a.CreatureDataId),
      CreatureController.DestroyEntity(a, !1),
      !0)
    );
  }
  static CheckPendingRemove(e, t, r) {
    var o = ModelManager_1.ModelManager.CreatureModel;
    let a = o.GetPendingRemoveEntity(e);
    return (
      !!(a =
        a || t !== Protocol_1.Aki.Protocol.rLs.F6n
          ? a
          : o.GetPendingRemoveEntityByPbDataId(r))?.Valid &&
      (o.RemovePendingRemoveEntity(a.CreatureDataId),
      CreatureController.DestroyEntity(a, !1),
      !0)
    );
  }
  static DelayRemoveEntityFinished(t) {
    if (t) {
      let e = void 0;
      var r, o;
      (e =
        t instanceof Entity_1.Entity
          ? ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t)
          : t)?.Valid &&
        !e.PendingRemoving &&
        ((t = ModelManager_1.ModelManager.CreatureModel),
        (r = e.Entity.GetComponent(0)?.GetCreatureDataId())
          ? GlobalData_1.GlobalData.Networking()
            ? (o = t.DelayRemoveContainer.GetEntity(r))?.Valid &&
              (t.DelayRemoveContainer.RemoveEntity(r),
              CreatureController.DestroyEntity(o))
            : CreatureController.RemoveEntity(
                r,
                "DelayRemoveEntityFinished",
                Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce,
              )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              3,
              "[CreatureController.DelayRemoveEntityFinished] CreatureDataId无效, 延迟删除失败。",
              ["CreatureDataId", r],
            ));
    }
  }
  static EntityLogicToEntityType(e) {
    switch (e) {
      case "Item":
        return Protocol_1.Aki.Protocol.kks.Proto_SceneItem;
      case "Npc":
        return Protocol_1.Aki.Protocol.kks.Proto_Npc;
      case "Monster":
        return Protocol_1.Aki.Protocol.kks.Proto_Monster;
      case "Vision":
        return Protocol_1.Aki.Protocol.kks.Proto_Vision;
      default:
        return Protocol_1.Aki.Protocol.kks.Proto_Custom;
    }
  }
  static MonsterBoomRequest(e, t) {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    e &&
      e.Entity &&
      CombatMessage_1.CombatNet.Send(
        25416,
        e.Entity,
        Protocol_1.Aki.Protocol.be_.create({ qKn: t }),
      );
  }
  static ParseTravelConfig(t) {
    var r = new SeamlessTravelDefine_1.SeamlessTravelContext();
    switch (t.p5n) {
      case Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect:
        (r.EffectPath = t.q$_?.y5n),
          SeamlessTravelController_1.SeamlessTravelController.EnableSeamlessTravel(
            r,
          ),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SeamlessTravel",
              50,
              "无缝加载目前暂时屏蔽禁止使用",
            );
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
        let e = IAction_1.EFadeInScreenShowType.Black;
        t.q$_?.JFc?.XFc ===
        Protocol_1.Aki.Protocol.JFc.Proto_Mp4BackgroundColorWhite
          ? (ModelManager_1.ModelManager.GameModeModel.Mp4FadeInScreenColor =
              IAction_1.EMovieBackgroundType.White)
          : (ModelManager_1.ModelManager.GameModeModel.Mp4FadeInScreenColor =
              IAction_1.EMovieBackgroundType.Black),
          t.q$_?.JFc?.YFc ===
          Protocol_1.Aki.Protocol.JFc.Proto_Mp4BackgroundColorWhite
            ? (ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor =
                IAction_1.EMovieBackgroundType.White)
            : (ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor =
                IAction_1.EMovieBackgroundType.Black),
          void 0 !== t.q$_?.ZFc &&
            (e =
              t.q$_?.ZFc ===
              Protocol_1.Aki.Protocol.ZFc.Proto_AfterTeleportScreenColorWhite
                ? IAction_1.EFadeInScreenShowType.White
                : IAction_1.EFadeInScreenShowType.Black),
          t.q$_?.zFc
            ? ((ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon =
                !0),
              ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
                0,
                3,
                void 0,
                1,
                e,
              ))
            : (ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon =
                !1),
          (ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee =
            !1),
          ControllerHolder_1.ControllerHolder.GameModeController.SetTravelMp4(
            !0,
            t.q$_.y5n,
          );
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
        (ModelManager_1.ModelManager.GameModeModel.ShowCenterTextFlow = t.E5n),
          (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = !0),
          (ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee =
            !1);
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
        r.ParseConfig(t.R$s),
          SeamlessTravelController_1.SeamlessTravelController.EnableSeamlessTravel(
            r,
          ),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SeamlessTravel",
              50,
              "无缝加载目前暂时屏蔽禁止使用",
            );
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen:
        (ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen = !0),
          (ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee =
            !1),
          0 === t.EIl
            ? (ModelManager_1.ModelManager.GameModeModel.BlackScreenColor =
                IAction_1.EFadeInScreenShowType.White)
            : (ModelManager_1.ModelManager.GameModeModel.BlackScreenColor =
                IAction_1.EFadeInScreenShowType.Black);
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_WithCharacterDisplay:
        ModelManager_1.ModelManager.LoadingModel?.SetRoleLoadingConfig(
          t.va1?.ya1,
        );
    }
  }
  static SetEntityEnable(e, t, r, o = !1) {
    e?.Valid &&
      t !== !e.HasDisableKey(2) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          28,
          "CreatureController.SetEntityEnable",
          ["Enable", t],
          ["EntityId", e.Id],
          ["Reason", r],
        ),
      (r = ModelManager_1.ModelManager.CreatureModel).DisableLock.has(e.Id)
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Entity", 28, "递归设置EntityEnable")
        : (r.DisableLock.add(e.Id),
          e.GetComponent(0).SetVisible(t),
          t ? e.EnableByKey(2, !0) : e.DisableByKey(2, !0),
          r.DisableLock.delete(e.Id),
          o && CreatureController.Cfr(e, t)));
  }
  static SetActorVisible(e, t, r, o, a, l = !1) {
    var n, i;
    e?.Valid &&
      ((n = e.GetComponent(1)),
      (i = e.GetComponent(99)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          28,
          "CreatureController.SetActorVisible",
          ["Visible", t],
          ["EntityId", e.Id],
          ["Reason", a],
        ),
      n.SetActorVisible(t, a),
      n.SetCollisionEnable(r, a),
      i?.SetIsInGame(t),
      this.SetActorMovable(e, o, a),
      l) &&
      CreatureController.gfr(e, t);
  }
  static SetActorMovable(e, t, r) {
    var o,
      a = e.GetComponent(111),
      l = e.GetComponent(112);
    a &&
      l &&
      !t !=
        !!(o =
          ModelManager_1.ModelManager.CreatureModel.ActorMovableHandleMap.get(
            e.Id,
          )) &&
      (t
        ? (a.Enable(o[0], r),
          l.Enable(o[1], r),
          ModelManager_1.ModelManager.CreatureModel.ActorMovableHandleMap.delete(
            e.Id,
          ))
        : ((o = [a.Disable(r), l.Disable(r)]),
          ModelManager_1.ModelManager.CreatureModel.ActorMovableHandleMap.set(
            e.Id,
            o,
          )));
  }
  static Cfr(e, t) {
    var r = e.GetComponent(0),
      o = Protocol_1.Aki.Protocol.le_.create();
    (o.s5n = MathUtils_1.MathUtils.NumberToLong(r.GetCreatureDataId())),
      (o.rVn = t),
      CombatMessage_1.CombatNet.Send(28409, e, o);
  }
  static gfr(e, t) {
    var r, o;
    ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      ((r = e.GetComponent(0)),
      ((o = Protocol_1.Aki.Protocol.Oe_.create()).s5n =
        MathUtils_1.MathUtils.NumberToLong(r.GetCreatureDataId())),
      (o.oVn = t),
      CombatMessage_1.CombatNet.Send(23847, e, o));
  }
  static RecoverDensityEntity(e, t) {
    var r = this.GetDensityItemByPbDataId(e);
    r &&
      !(r.DensityLevel <= this.hYs) &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          26,
          "恢复人群密度屏蔽的实体",
          ["PbDataId", e],
          ["context", t],
        ),
      (e = this._Ys(r.CreatureDataId, r.EntityData, t))) &&
      ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(e);
  }
  static RefreshDensityLevel(e) {
    if (this.hYs !== e) {
      for (
        var t, r, o, a, l, n = ModelManager_1.ModelManager.CreatureModel;
        this.hYs < e;

      ) {
        ++this.hYs;
        for ([t, r] of n.GetDensityLevelGroup(this.hYs))
          2 === r.EntityData.oys
            ? (this.Hd1(t), n.RemoveDensityItem(t))
            : (o = this._Ys(t, r.EntityData, "Density")) &&
              ModelManager_1.ModelManager.GameModeModel.MapDone &&
              ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(
                o,
              );
      }
      for (; this.hYs > e; ) {
        for ([a, l] of n.GetDensityLevelGroup(this.hYs))
          2 === l.EntityData.oys
            ? (this.Hd1(a), n.RemoveDensityItem(a))
            : this.rfr(
                a,
                "DensityLevelChanged",
                Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce,
              );
        --this.hYs;
      }
    }
  }
  static Hd1(e) {
    var t = Protocol_1.Aki.Protocol.Zes.create();
    (t.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(21831, t, (e) => {
        e &&
          e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Cvs,
            15464,
          );
      });
  }
  static SetKawaiiEnable(e) {
    var t,
      r = ModelManager_1.ModelManager.CreatureModel;
    r.SetKawaiiMask(0 < e);
    for (const o of r.GetAllEntities())
      o.Valid &&
        (t = o.Entity?.GetComponent(175))?.Actor?.Mesh &&
        (0 < e
          ? (t.Actor.Mesh.KuroLodMask &= CreatureModel_1.ENABLE_KAWAII_MASK)
          : (t.Actor.Mesh.KuroLodMask |= CreatureModel_1.DISABLE_KAWAII_MASK));
  }
  static OnModifyEntityCampNotify(e, t) {
    var r, o, a;
    e?.Valid
      ? (r = e.GetComponent(3))?.Valid
        ? ((o = r.Actor.Camp),
          (a = t.nys),
          r.Actor.SetCamp(a),
          e.GetComponent(0).SetServerCamp(a),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.EntityCampModify,
            e,
            o,
            a,
          ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            20,
            "修改对象阵营时不存在CharacterActorComponent",
            ["CreatureId", t.TVn],
          )
      : ((r = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          MathUtils_1.MathUtils.LongToNumber(t.TVn),
        )),
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            20,
            "修改对象阵营时对象已经不存在",
            ["CreatureId", t.TVn],
            ["EntityId", r],
          ));
  }
  static GetCharactersLocationNearBy(e, t, r) {
    var o,
      a = new UE.SCharacterLocationsAndRadius();
    this.aRc.FromUeVector(e),
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
        this.aRc,
        t,
        62,
        this.Ioe,
      );
    for (const i of this.Ioe)
      i.Valid &&
        i.Entity?.Active &&
        (o = i.Entity.GetComponent(3))?.Active &&
        this.hRc.push(new LocationStruct(o));
    if (r < this.hRc.length) {
      var l =
        Global_1.Global.BaseCharacter?.CharacterActorComponent
          ?.ActorLocationProxy ?? Vector_1.Vector.Create(e);
      for (const _ of this.hRc)
        _.DistSquared = Vector_1.Vector.DistSquared(
          l,
          _.ActorComp.ActorLocationProxy,
        );
      this.hRc.sort((e, t) => e.DistSquared - t.DistSquared);
      for (let e = 0; e < r; ++e) {
        var n = this.hRc[e];
        a.Locations.Add(n.ActorComp.ActorLocation),
          a.Radius.Add(n.ActorComp.ScaledRadius),
          a.HalfHeight.Add(n.ActorComp.ScaledHalfHeight);
      }
    } else
      for (const C of this.hRc)
        a.Locations.Add(C.ActorComp.ActorLocation),
          a.Radius.Add(C.ActorComp.ScaledRadius),
          a.HalfHeight.Add(C.ActorComp.ScaledHalfHeight);
    return (this.hRc.length = 0), a;
  }
}
((_a = CreatureController).xe = idDefaultValue),
  (CreatureController.ofr = Stats_1.Stat.Create(
    "CreatureController.RemoveEntity",
  )),
  (CreatureController.nfr = Stats_1.Stat.Create(
    "CreatureController.RemoveEntityInternal",
  )),
  (CreatureController.hYs = 2),
  (CreatureController.nZa = void 0),
  (CreatureController.OnRemoveTargetEntity = (e) => {
    EventSystem_1.EventSystem.RemoveTargetEvents(e);
  }),
  (CreatureController.V0r = (e) => {
    BattleLogicController_1.BattleLogicController.OnEntityLivingStatusNotify(e);
  }),
  (CreatureController.j0r = (e) => {
    for (const o of e.QRs) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        MathUtils_1.MathUtils.LongToNumber(o.s5n),
      );
      if (!t?.Valid)
        return void (
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "World",
            19,
            "[CreatureController.MonsterAttributeArrayNotify] 更新Monster属性失败, Entity无效或不存在。",
            ["CreatureDataId", o.s5n],
          )
        );
      var r = t.Entity.GetComponent(171);
      if (r)
        for (const a of Object.keys(o.GSs)) r.SetBaseValue(Number(a), o.GSs[a]);
    }
  }),
  (CreatureController.x0r = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t),
      r = MathUtils_1.MathUtils.LongToNumber(e.Z5n);
    t.Entity.GetComponent(42)?.SetVisionSkillInformationList(e.CIs, r),
      (t.Entity.GetComponent(0).VisionSkillServerEntityId = r),
      EventSystem_1.EventSystem.EmitWithTarget(
        t,
        EventDefine_1.EEventName.EntityVisionSkillChanged,
      );
  }),
  (CreatureController.w0r = (e) => {
    var t,
      r = MathUtils_1.MathUtils.LongToNumber(e.s5n),
      o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
    o
      ? ((t = o.Entity.GetComponent(0)),
        e.W5n && t.SetPlayerId(e.W5n),
        e.W5n === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
          ((t = o.Entity.GetComponent(3).Actor)
            ? t.Kuro_SetRole(2)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                3,
                "ChangeEntityRoleNotify,actor无效。",
                ["CreatureDataId", r],
              )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.ChangeEntityRoleNotify] 不存在Entity。",
          ["CreatureDataId", r],
        );
  }),
  (CreatureController.P0r = (e) => {
    CreatureController.H$a(e);
  }),
  (CreatureController.J0r = (e) => {
    var t;
    e.VRs &&
      (e = e.W5n) !==
        (t = ModelManager_1.ModelManager.CreatureModel).GetPlayerId() &&
      t.GetScenePlayerData(e)?.SetRemoteSceneLoading(!0);
  }),
  (CreatureController.z0r = (e) => {
    var e = e.W5n,
      t = ModelManager_1.ModelManager.CreatureModel;
    e !== t.GetPlayerId() &&
      ((t = t.GetScenePlayerData(e))
        ? (t.SetRemoteSceneLoading(!1),
          (t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(e)
            ?.GetCurrentGroup()
            ?.GetCurrentRole()?.CreatureDataId)
            ? (t =
                ModelManager_1.ModelManager.CreatureModel.GetEntity(
                  t,
                )?.Entity) &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "World",
                  48,
                  "模拟端加载完成，显示玩家当前实体",
                  ["entity", t.Id],
                ),
              t.EnableByKey(1, !0))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                48,
                "模拟端加载完成，无法获取当前实体id",
                ["playerId", e],
              ))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("World", 48, "模拟端加载完成，无法获取玩家数据", [
            "playerId",
            e,
          ]));
  }),
  (CreatureController.Z0r = (e) => {
    e = e.P8n;
    HotFixUtils_1.HotFixUtils.EvalScript(e);
  }),
  (CreatureController.UploadEventCallBack = (e, t) => {}),
  (CreatureController.oZa = (e) => {
    CreatureController.IBi();
  }),
  (CreatureController.SceneLoadingTimeOutNotify = (e) => {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 5, "世界加载超时");
  }),
  (CreatureController.X0r = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    r
      ? ((r = r.Entity.GetComponent(203))?.AddTag(1008164187),
        e.W5n !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
          (r?.AddTag(1961456719), r?.AddTag(1800978500)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Animal",
          29,
          "[CreatureController.AnimalDieNotify] 不存Entity。",
          ["CreatureDataId", t],
        );
  }),
  (CreatureController.B0r = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    r
      ? (r.Entity.GetComponent(0).SetHardnessModeId(e.$Wn),
        (r = r.Entity.GetComponent(60)).SetHardnessModeId(e.$Wn),
        r.RefreshHardnessModeConfig())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          14,
          "[CreatureController.HardnessModeChangedNotify] entity为空。",
          ["creatureDataId", t],
        );
  }),
  (CreatureController.PushContextIdNotify = (e) => {
    ModelManager_1.ModelManager.CombatMessageModel.SetLastMessageId(
      MathUtils_1.MathUtils.LongToBigInt(e.s5n),
    );
  }),
  (CreatureController.JoinSceneNotify = (e) => {
    CreatureController.hfr(e);
  }),
  (CreatureController.AfterJoinSceneNotify = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "World",
        3,
        "[CreatureController.AfterJoinSceneAsync] AfterJoinSceneAsync",
      ),
      ModelManager_1.ModelManager.GameModeModel.HasGameModeData
        ? ModelManager_1.ModelManager.GameModeModel.AfterJoinSceneNotifyPromise.SetResult(
            !0,
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "未下发场景数据,就下发了AfterJoinSceneNotify，服务器流程有问题",
          );
  }),
  (CreatureController.G0r = (e) => {
    const t = new Array(),
      r = new Array();
    for (const l of e.WDs) {
      var o = DataLayerById_1.configDataLayerById.GetConfig(l);
      t.push(o.DataLayer);
    }
    for (const n of e.jDs) {
      var a = DataLayerById_1.configDataLayerById.GetConfig(n);
      r.push(a.DataLayer);
    }
    ControllerHolder_1.ControllerHolder.GameModeController.SwitchDataLayer(
      t,
      r,
      (e) => {
        e ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "InstanceDungeon",
              29,
              "切换DataLayer失败",
              ["unloads", t.join()],
              ["newLoads", r.join()],
            ));
      },
    );
  }),
  (CreatureController.N0r = (e) => {
    var e = e.jRs.W5n,
      t = new ScenePlayerData_1.ScenePlayerData(e);
    t.SetTimerStart(),
      t.SetRemoteSceneLoading(!0),
      ModelManager_1.ModelManager.CreatureModel.AddScenePlayerData(e, t),
      ModelManager_1.ModelManager.VehicleModel.AddOtherPlayerVehicleData(e),
      ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(
        e,
        2,
      ),
      ModelManager_1.ModelManager.OnlineModel.DeleteOtherScenePlayerDataList(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ScenePlayerChanged,
      );
  }),
  (CreatureController.IEa = new WaitEntityToLoadTask_1.WaitEntityToLoadTask(
    _a.LEa.bind(_a),
    _a.cfr.bind(_a),
  )),
  (CreatureController.nja = { Result: 0, Component: void 0 }),
  (CreatureController.aTa = new Map()),
  (CreatureController._Ta = (e, t) => {
    var r = e.Entity.GetComponent(0),
      o = r.GetCreatureDataId(),
      a = CreatureController.aTa.get(o);
    CreatureController.aTa.delete(o),
      t
        ? r.GetRemoveState()
          ? a?.(4)
          : (ControllerHolder_1.ControllerHolder.CharacterController.ActivateEntity(
              e,
            ),
            CreatureController.dfr(e)
              ? (a?.(3),
                ControllerHolder_1.ControllerHolder.CreatureGroupController.HasBindGroup(
                  o,
                )
                  ? ControllerHolder_1.ControllerHolder.CreatureGroupController.RefreshBindGroup(
                      o,
                      "Entity Activated",
                    )
                  : e.Entity &&
                    EntitySystem_1.EntitySystem.PostActive(e.Entity))
              : a?.(2))
        : a?.(2);
  }),
  (CreatureController.SwitchBattleModeNotify = (e) => {
    for (const t of e.AAs)
      BattleSetting_1.BattleSetting.ReceiveSetModuleNetworkState(t, !0);
    for (const r of e.DAs)
      BattleSetting_1.BattleSetting.ReceiveSetModuleNetworkState(r, !1);
  }),
  (CreatureController.GravityUpdateNotify = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (r) {
      r = r.Entity?.GetComponent(176) ?? r.Entity?.GetComponent(233);
      if (r) {
        var o = Vector_1.Vector.Create(e.wI_);
        if (ModelManager_1.ModelManager.TeleportModel?.IsTeleport) {
          var a =
            0 !==
            ModelManager_1.ModelManager.TeleportModel
              .TeleportEntityCreatureDataId
              ? ModelManager_1.ModelManager.TeleportModel
                  .TeleportEntityCreatureDataId
              : ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity
                  ?.CreatureDataId;
          if (a && a === t) {
            if (
              ModelManager_1.ModelManager.TeleportModel.TargetGravityDirect?.Equals(
                o,
                MathCommon_1.MathCommon.KindaSmallNumber,
              )
            )
              return void (
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Movement",
                  39,
                  "[CreatureController.GravityUpdateNotify] 实体传送过程中收到更新重力方向，且重力方向与传送目标重力方向一致，忽略",
                  ["GravityDirection", e.wI_],
                )
              );
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Movement",
                39,
                "[CreatureController.GravityUpdateNotify] 实体传送过程中收到更新重力方向，且重力方向与传送目标重力方向不一致，可能造成问题，请关注",
                ["GravityDirection", e.wI_],
                [
                  "TeleportTargetGravityDirection",
                  ModelManager_1.ModelManager.TeleportModel.TargetGravityDirect,
                ],
              );
          }
        }
        r.SetGravityDirect(Vector_1.Vector.Create(e.wI_)),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Movement",
              4,
              "[CreatureController.GravityUpdateNotify] 更新重力方向",
              ["GravityDirection", e.wI_],
            );
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Animal",
          29,
          "[CreatureController.GravityUpdateNotify] 不存Entity。",
          ["CreatureDataId", t],
        );
  }),
  (CreatureController.BattleLogNotify = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Battle", 19, "Server Log", ["log", e.PAs]);
  }),
  (CreatureController.W0r = (e) => {
    ControllerHolder_1.ControllerHolder.GameModeController.Change(e).catch(
      () => {},
    );
  }),
  (CreatureController.STn = (e) => {
    ModelManager_1.ModelManager.GameModeModel.ChangeSceneModeEndNotifyPromise.SetResult(
      !0,
    );
  }),
  (CreatureController.Q0r = (e) => {
    ModelManager_1.ModelManager.CreatureModel.SetRestoreEntityId(e.xRs);
  }),
  (CreatureController.K0r = (e) => {
    var t = e.vTs,
      r = ModelManager_1.ModelManager.CreatureModel;
    for (const l of Object.keys(t)) {
      var o = Number(l),
        a = t[l];
      r.RecordEntitySilenceState(o, a);
    }
  }),
  (CreatureController.$0r = (e) => {
    ModelManager_1.ModelManager.WorldModel.UpdateWorldState(e.KBs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnReceivePlayerVar,
      );
  }),
  (CreatureController.Y0r = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.YWn);
    ModelManager_1.ModelManager.CreatureModel.GetEntity(t).Entity.GetComponent(
      0,
    ).SummonEntityIds = e.zRs.map((e) => MathUtils_1.MathUtils.LongToNumber(e));
  }),
  (CreatureController.OnCreateEntityFail = (e) => {
    ModelManager_1.ModelManager.CreatureModel.RemoveEntity(
      e,
      "OnCreateEntityFail",
    );
  }),
  (CreatureController.aRc = Vector_1.Vector.Create()),
  (CreatureController.Ioe = []),
  (CreatureController.hRc = new Array()),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("Wul", !1)],
    CreatureController,
    "OnModifyEntityCampNotify",
    null,
  ),
  (exports.CreatureController = CreatureController);
class LocationStruct {
  constructor(e) {
    (this.ActorComp = e), (this.DistSquared = 0);
  }
}
//# sourceMappingURL=CreatureController.js.map
