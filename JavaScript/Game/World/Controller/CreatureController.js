"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreatureController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  LogProfiler_1 = require("../../../Core/Common/LogProfiler"),
  Stats_1 = require("../../../Core/Common/Stats"),
  DisjointSet_1 = require("../../../Core/Container/DisjointSet"),
  DataLayerById_1 = require("../../../Core/Define/ConfigQuery/DataLayerById"),
  SummonCfgById_1 = require("../../../Core/Define/ConfigQuery/SummonCfgById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityHelper_1 = require("../../../Core/Entity/EntityHelper"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  HotFixUtils_1 = require("../../HotFix/HotFixUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../Module/Abilities/FormationAttributeController"),
  FormationDataController_1 = require("../../Module/Abilities/FormationDataController"),
  BlackScreenController_1 = require("../../Module/BlackScreen/BlackScreenController"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer"),
  LogUpload_1 = require("../../Module/LogUpload/LogUpload"),
  SceneTeamData_1 = require("../../Module/SceneTeam/SceneTeamData"),
  SeamlessTravelController_1 = require("../../Module/SeamlessTravel/SeamlessTravelController"),
  TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  CharacterBuffController_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffController"),
  CreateEntityData_1 = require("../../NewWorld/Character/CreateEntityData"),
  BattleSetting_1 = require("../../NewWorld/Setting/BattleSetting"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine"),
  ScenePlayerData_1 = require("../Define/ScenePlayerData"),
  WaitEntityTask_1 = require("../Define/WaitEntityTask"),
  WaitEntityToLoadTask_1 = require("../Define/WaitEntityToLoadTask"),
  AsyncTask_1 = require("../Task/AsyncTask"),
  TaskSystem_1 = require("../Task/TaskSystem"),
  WorldGlobal_1 = require("../WorldGlobal"),
  AoiController_1 = require("./AoiController"),
  BattleLogicController_1 = require("./BattleLogicController"),
  LogController_1 = require("./LogController"),
  PreloadController_1 = require("./PreloadController"),
  PreloadControllerNew_1 = require("./PreloadControllerNew"),
  idDefaultValue = -1n,
  increment = 2n,
  playerBit = 20n,
  unitMax = 4294967295n,
  HOLD_ENTITY_TIMEOUT = 8e3;
class CreatureController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      WorldGlobal_1.WorldGlobal.Initialize(),
      (this.hYs =
        GameSettingsManager_1.GameSettingsManager.GetCurrentValue(79)),
      !!Global_1.Global.WorldEntityHelper.Initialize() &&
        (Net_1.Net.Register(22258, CreatureController.P0r),
        Net_1.Net.Register(17484, CreatureController.x0r),
        Net_1.Net.Register(29856, CreatureController.w0r),
        Net_1.Net.Register(21298, CreatureController.EntityOnLandedNotify),
        Net_1.Net.Register(19693, CreatureController.B0r),
        Net_1.Net.Register(18146, CreatureController.PushContextIdNotify),
        Net_1.Net.Register(24102, CreatureController.JoinSceneNotify),
        Net_1.Net.Register(15703, CreatureController.AfterJoinSceneNotify),
        Net_1.Net.Register(20405, CreatureController.b0r),
        Net_1.Net.Register(29812, CreatureController.q0r),
        Net_1.Net.Register(19162, CreatureController.G0r),
        Net_1.Net.Register(23028, CreatureController.N0r),
        Net_1.Net.Register(18682, CreatureController.O0r),
        Net_1.Net.Register(21730, CreatureController.k0r),
        Net_1.Net.Register(23036, CreatureController.F0r),
        Net_1.Net.Register(29879, CreatureController.V0r),
        Net_1.Net.Register(17250, CreatureController.H0r),
        Net_1.Net.Register(25682, CreatureController.j0r),
        Net_1.Net.Register(20871, this.SwitchBattleModeNotify),
        Net_1.Net.Register(18947, this.BattleLogNotify),
        Net_1.Net.Register(25077, this.W0r),
        Net_1.Net.Register(26032, this.STn),
        Net_1.Net.Register(20167, this.K0r),
        Net_1.Net.Register(29127, this.SceneLoadingTimeOutNotify),
        Net_1.Net.Register(21313, CreatureController.Q0r),
        Net_1.Net.Register(28774, CreatureController.X0r),
        Net_1.Net.Register(26704, CreatureController.$0r),
        Net_1.Net.Register(15747, CreatureController.Y0r),
        Net_1.Net.Register(
          21794,
          FormationAttributeController_1.FormationAttributeController
            .FormationAttrNotify,
        ),
        Net_1.Net.Register(
          24114,
          FormationAttributeController_1.FormationAttributeController
            .TimeCheckNotify,
        ),
        Net_1.Net.Register(17460, CreatureController.J0r),
        Net_1.Net.Register(18406, CreatureController.z0r),
        Net_1.Net.Register(25076, CreatureController.Z0r),
        Net_1.Net.Register(22703, CreatureController.FXa),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.EntityOnLandedPush,
          CreatureController.EntityOnLandedPush,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.DelayRemoveEntityFinished,
          CreatureController.efr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.TeleportComplete,
          CreatureController.tfr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CreateEntityFail,
          CreatureController.OnCreateEntityFail,
        ),
        this.EEa.OnInit(),
        !0)
    );
  }
  static OnClear() {
    return (
      WorldGlobal_1.WorldGlobal.Clear(),
      !!Global_1.Global.WorldEntityHelper.Clear() &&
        (this.DBi(),
        Net_1.Net.UnRegister(22258),
        Net_1.Net.UnRegister(17484),
        Net_1.Net.UnRegister(29856),
        Net_1.Net.UnRegister(21298),
        Net_1.Net.UnRegister(19693),
        Net_1.Net.UnRegister(24102),
        Net_1.Net.UnRegister(15703),
        Net_1.Net.UnRegister(23028),
        Net_1.Net.UnRegister(20405),
        Net_1.Net.UnRegister(29812),
        Net_1.Net.UnRegister(18682),
        Net_1.Net.UnRegister(21730),
        Net_1.Net.UnRegister(23036),
        Net_1.Net.UnRegister(29879),
        Net_1.Net.UnRegister(17250),
        Net_1.Net.UnRegister(25682),
        Net_1.Net.UnRegister(20871),
        Net_1.Net.UnRegister(25077),
        Net_1.Net.UnRegister(26032),
        Net_1.Net.UnRegister(29127),
        Net_1.Net.UnRegister(21313),
        Net_1.Net.UnRegister(20167),
        Net_1.Net.UnRegister(28774),
        Net_1.Net.UnRegister(15747),
        Net_1.Net.UnRegister(21794),
        Net_1.Net.UnRegister(17460),
        Net_1.Net.UnRegister(18406),
        Net_1.Net.UnRegister(25076),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.EntityOnLandedPush,
          CreatureController.EntityOnLandedPush,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.TeleportComplete,
          CreatureController.tfr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CreateEntityFail,
          CreatureController.OnCreateEntityFail,
        ),
        this.EEa.OnClear(),
        this.oTa.Clear(),
        this.nTa.clear(),
        !0)
    );
  }
  static CreateEntityFromPending(e) {
    for (const r of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      r?.Valid && this.LoadEntityAsync(r);
    this.EEa.Flush();
  }
  static ifr(r) {
    var e = MathUtils_1.MathUtils.LongToNumber(r.F4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (t?.Valid)
      if (t.IsInit) {
        var o = t.Entity.GetComponent(160);
        if (o)
          for (const a of r.nDs)
            o.AddBuffWithServerId(
              MathUtils_1.MathUtils.LongToBigInt(a.b6n),
              a.F6n,
              a.Bjn,
              a.wjn,
              "服务端通知添加系统buff, serverId=" + a.wjn,
            );
        else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              20,
              "[CreatureController.AddSysBuffNotify] 添加Buff失败, Entity没有BuffComponent。",
              ["CreatureDataId", r.F4n],
              [
                "buff列表",
                r.nDs?.map((e) => MathUtils_1.MathUtils.LongToBigInt(e.b6n)),
              ],
            );
      } else {
        t = t.Entity.GetComponent(0);
        WaitEntityTask_1.WaitEntityTask.Create(t.GetCreatureDataId(), (e) => {
          e ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("World", 20, "WaitEntityTask 失败", [
                "CreatureDataId",
                r.F4n,
              ]));
        });
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          20,
          "[CreatureController.AddSysBuffNotify] 添加Buff失败, Entity不存在或无效。",
          ["CreatureDataId", e],
          [
            "buff列表",
            r.nDs.map((e) => MathUtils_1.MathUtils.LongToBigInt(e.b6n)).join(),
          ],
        );
  }
  static RemoveStandaloneEntity(e, r) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    t?.Valid &&
      t.Entity.GetComponent(1)?.Owner &&
      ((t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e)),
      this.RemoveEntity(t, "RemoveStandaloneEntity", r));
  }
  static NotifyAddEntity(e, r, t) {
    return (
      !r.Entity.GetComponent(0).GetRemoveState() &&
      (GlobalData_1.GlobalData.BpEventManager.增加实体.Broadcast(r.Id, t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddEntity,
        e,
        r,
        t,
      ),
      ModelManager_1.ModelManager.CreatureModel.EntitiesSortedList.push(r),
      EntityHelper_1.EntitySystemHelper.IsSortDirty ||
        (EntityHelper_1.EntitySystemHelper.IsSortDirty = !0),
      !0)
    );
  }
  static NotifyRemoveEntity(e, r, t) {
    r?.Valid &&
      (GlobalData_1.GlobalData.BpEventManager.删除实体.Broadcast(t),
      EventSystem_1.EventSystem.EmitWithTarget(
        r,
        EventDefine_1.EEventName.RemoveEntity,
        e,
        r,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveEntity,
        e,
        r,
      ),
      EntityHelper_1.EntitySystemHelper.IsFilterDirty ||
        (EntityHelper_1.EntitySystemHelper.IsFilterDirty = !0));
  }
  static RemoveEntity(
    e,
    r,
    t = Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce,
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
    o = this.rfr(e, r, t);
    return this.nfr.Stop(), this.ofr.Stop(), o;
  }
  static rfr(e, r, t) {
    CreatureController.nTa.delete(e);
    var o,
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    return a
      ? ((o = a.Entity.GetComponent(1)),
        ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[实体生命周期:删除实体] 删除实体",
            ["Context", r],
            ["CreatureDataId", e],
            ["RemoveType", t],
            ["ActorLocationProxy", o?.ActorLocationProxy],
          ),
        (o = a.Entity.GetComponent(0)),
        (o = Stats_1.Stat.Create(
          `CreatureDataId:${o.GetCreatureDataId()}, PbDataId:${o.GetPbDataId()}, EntityType:${o.GetEntityType()}}`,
        )).Start(),
        PreloadDefine_1.PreloadSetting.UseNewPreload
          ? PreloadControllerNew_1.PreloadControllerNew.RemoveEntity(e)
          : PreloadController_1.PreloadController.RemovePreloadEntity(e),
        (a = this.lYs(a, e, t, r)),
        o.Stop(),
        a)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[实体生命周期:删除实体] 删除实体失败,CreatureModel不存在该Id。",
            ["Context", r],
            ["CreatureDataId", e],
            ["RemoveType", t],
          ),
        !1);
  }
  static lYs(e, r, t, o) {
    var a = ModelManager_1.ModelManager.CreatureModel;
    if (!e.Valid)
      return a.RemoveEntity(r, "RemoveEntityInternal handle.Valid=false");
    var l = e.Entity.GetComponent(0),
      n =
        (l.SetRemoveState(!0),
        this.EEa.RemoveEntity(e),
        e.Entity.GetComponent(1)?.Owner);
    if ((CreatureController.NotifyRemoveEntity(t, e, n), !e.IsInit))
      return (
        CreatureController.DestroyEntity(
          e,
          t !== Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeResetByModeChange,
        ),
        a.RemoveEntity(r, "RemoveEntityInternal handle.IsInit=false")
      );
    if (
      l.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Custom &&
      !n?.IsValid()
    )
      return (
        CreatureController.DestroyEntity(
          e,
          t !== Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeResetByModeChange,
        ),
        a.RemoveEntity(r, "RemoveEntityInternal actor?.IsValid()=false")
      );
    let i = t === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce;
    if (
      (i =
        i ||
        (t === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeNormal &&
          l.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Npc &&
          l.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_SceneItem &&
          l.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Animal &&
          (i = !0),
        e.Entity.Active)
          ? i
          : !0)
    )
      return (
        CreatureController.DestroyEntity(e),
        a.RemoveEntity(r, "RemoveEntityInternal forceRemove=true")
      );
    if (t === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeResetByModeChange)
      return (
        CreatureController.DestroyEntity(e, !1),
        a.RemoveEntity(r, "RemoveEntityInternal RemoveTypeResetByModeChange")
      );
    if (
      (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "[实体生命周期:删除实体] 延迟删除实体",
          ["Context", o],
          ["CreatureDataId", r],
          ["EntityId", e.Id],
          ["RemoveType", t],
        ),
      this.AddDelayRemoveEntity(r, e),
      l.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Npc)
    )
      e.Entity.GetComponent(171).HandlePendingDestroy();
    else {
      if (l.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Animal) {
        n = e.Entity.GetComponent(157);
        if (!n?.PendingDestroy)
          return (
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.DelayRemoveEntityFinished,
              e.Entity,
            ),
            !0
          );
        n.HandlePendingDestroy();
      }
      t === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeDrop
        ? (a = e.Entity.GetComponent(136)) && a.DestroyWithEffect()
        : l.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem &&
          e.Entity.GetComponent(120).HandleDestroyState();
    }
    return !0;
  }
  static SummonRequest(e, r, t, o, a, l = 0) {
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
                r,
                t,
                a,
                i,
              )),
              (_.AKn = MathUtils_1.MathUtils.NumberToLong(n)),
              (_.K7n = l),
              CreatureController.Summon2RequestInternal(_, i, o))
            : (((l = Protocol_1.Aki.Protocol.Ucs.create()).DKn = this.sfr(
                e,
                r,
                t,
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
  static sfr(e, r, t, o, a) {
    var l = Protocol_1.Aki.Protocol.s4s.create(),
      e =
        ((l.r5n = e),
        (l.rVn = r),
        (l.l8n = t.GetLocation()),
        Protocol_1.Aki.Protocol.D2s.create()),
      r = t.Rotator();
    return (
      (e.Pitch = r.Pitch),
      (e.Roll = r.Roll),
      (e.Yaw = r.Yaw),
      (l._8n = e),
      (l.UKn = o),
      (l.RKn = MathUtils_1.MathUtils.NumberToLong(a)),
      l
    );
  }
  static async SummonRequestInternal(e, r) {
    e = await Net_1.Net.CallAsync(20553, e);
    return (
      e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ||
      (ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(r),
      CreatureController.RemoveEntity(r, "SummonRequestInternal"),
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Q4n,
        28569,
      ),
      !1)
    );
  }
  static async Summon2RequestInternal(e, r, t) {
    e = await Net_1.Net.CallAsync(15151, e);
    return e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? (ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(r),
        CreatureController.RemoveEntity(r, "Summon2RequestInternal"),
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          19298,
        ),
        !1)
      : (EntitySystem_1.EntitySystem.Get(t)
          .GetComponent(0)
          .SetSummonsVersion(e.K7n),
        !0);
  }
  static async RemoveSummonEntityRequest(e, r, t) {
    var o = Protocol_1.Aki.Protocol.scs.create(),
      t =
        ((o.xKn = [
          ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(t),
        ]),
        (o.PKn = Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce),
        (o.r5n = e),
        (o.YWn =
          ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(r)),
        await Net_1.Net.CallAsync(19297, o));
    return (
      t.G9n === Protocol_1.Aki.Protocol.Q4n.KRs ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        t.G9n,
        27745,
      ),
      !1)
    );
  }
  static async RemoveSummonEntityByServerIdRequest(e, r, t) {
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)
        ?.Entity?.GetComponent(0)
        .GetEntityType(),
      a = Protocol_1.Aki.Protocol.scs.create(),
      t =
        ((a.xKn = [MathUtils_1.MathUtils.NumberToLong(t)]),
        (a.PKn =
          o && o === Protocol_1.Aki.Protocol.kks.Proto_SceneItem
            ? Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeNormal
            : Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce),
        (a.r5n = e),
        (a.YWn =
          ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(r)),
        await Net_1.Net.CallAsync(19297, a));
    return (
      t.G9n === Protocol_1.Aki.Protocol.Q4n.KRs ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        t.G9n,
        27745,
      ),
      !1)
    );
  }
  static async ChangeEntityRoleRequest(e, r) {
    var t, o;
    return 0 === e
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[CreatureController.ChangeEntityRoleRequest] 实体ID无效。",
            ["EntityId", e],
          ),
        !1)
      : (t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e))
        ? (((o = Protocol_1.Aki.Protocol.hcs.create()).s5n =
            MathUtils_1.MathUtils.NumberToLong(t)),
          (o.W5n = r),
          !(
            !(r = await Net_1.Net.CallAsync(27750, o)) ||
            (r.KRs
              ? (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))
                ? (o.Entity.GetComponent(0).SetPlayerId(r.W5n),
                  o.IsInit &&
                    ((r =
                      ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
                      r.W5n),
                    o.Entity.GetComponent(1).SetAutonomous(r)),
                  0)
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "World",
                      3,
                      "[CreatureController.ChangeEntityRoleRequest] 不存在实体Entity。",
                      ["CreatureDataId", t],
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
              ["CreatureDataId", t],
            ),
          !1);
  }
  static NotifySpawnBoss(e) {
    var r;
    e &&
      (r = e.Entity.GetComponent(3)) &&
      r.IsBoss &&
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SpawnBoss, e);
  }
  static afr(e) {
    var r = Protocol_1.Aki.Protocol._cs.create();
    (r.s5n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(28238, r, () => {});
  }
  static async TWa(e) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      t = e.f5n,
      o = e.W5n;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "World",
        17,
        "[CreatureController.LeaveSceneNotify] LeaveSceneNotify",
        ["leavePlayerId", o],
        ["myPlayerId]", r],
        ["option", t],
      ),
      o !== r
        ? (ModelManager_1.ModelManager.CreatureModel.RemoveScenePlayerData(o),
          CreatureController.NotifyScenePlayerChanged(),
          ModelManager_1.ModelManager.OnlineModel.RemovePlayerDisableHandles(o),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ScenePlayerLeaveScene,
            e.W5n,
          ))
        : ModelManager_1.ModelManager.GameModeModel.HasGameModeData
          ? ((ModelManager_1.ModelManager.GameModeModel.HasGameModeData = !1),
            (ModelManager_1.ModelManager.GameModeModel.JoinSceneInfo = void 0),
            o === r &&
              (ModelManager_1.ModelManager.CreatureModel.GetIsLoadingScene()
                ? Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "World",
                    17,
                    "[CreatureController.LeaveSceneNotify] 场景加载中",
                  )
                : (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.LeaveInstanceDungeon,
                    ),
                  t && CreatureController.ParseTravelConfig(e.f5n),
                  ModelManager_1.ModelManager.SeamlessTravelModel
                    .IsSeamlessTravel
                    ? (Net_1.Net.PauseAllCallback(),
                      await SeamlessTravelController_1.SeamlessTravelController.PreLeaveLevel(),
                      Net_1.Net.ResumeAllCallback())
                    : ModelManager_1.ModelManager.GameModeModel
                        .UseShowCenterText ||
                      BlackScreenController_1.BlackScreenController.AddBlackScreen(
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
                17,
                "[CreatureController.LeaveSceneNotify] 副本Id不存在",
              ));
  }
  static async SceneLoadingFinishRequest(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("World", 5, "世界加载完成", ["SceneId", e]);
    var r = new Protocol_1.Aki.Protocol.zds(),
      e = ((r.BKn = e), await Net_1.Net.CallAsync(21549, r));
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Q4n,
        21003,
      ),
      (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1));
  }
  static DBi() {
    UE.KuroTencentCOSLibrary.ClearAllProgressCallback(),
      this.VXa &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.UploadEventCallBack),
        (this.VXa = void 0));
  }
  static IBi() {
    CreatureController.DBi(),
      (this.VXa = (0, puerts_1.toManualReleaseDelegate)(
        this.UploadEventCallBack,
      )),
      LogController_1.LogController.RequestOutputDebugInfo(),
      LogUpload_1.LogUpload.SendLog(this.VXa);
  }
  static AnimalDieRequest(e, r) {
    var t = Protocol_1.Aki.Protocol.pes.create();
    (t.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (t.l8n = Protocol_1.Aki.Protocol.Gks.create()),
      (t.l8n.X = r.X),
      (t.l8n.Y = r.Y),
      (t.l8n.Z = r.Z),
      Net_1.Net.Call(20436, t, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrAnimalEntityNotExist &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            20702,
          );
      });
  }
  static AnimalDropItemRequest(e) {
    var r = Protocol_1.Aki.Protocol.Ies.create();
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(21522, r, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrAnimalEntityNotExist &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            18951,
          );
      });
  }
  static AnimalDestroyRequest(e) {
    var r = Protocol_1.Aki.Protocol.Ees.create();
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(19578, r, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrAnimalEntityNotExist &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            24955,
          );
      });
  }
  static LandingDamageRequest(e, r, t) {
    var o = Protocol_1.Aki.Protocol.yis.create();
    (o.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (o.wKn = r),
      (o.bKn = t),
      Net_1.Net.Call(22367, o, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            15155,
          );
      });
  }
  static AddPublicTags(e, r) {
    var t = EntitySystem_1.EntitySystem.Get(e);
    if (t) {
      var o = t.GetComponent(0);
      for (const a of r) o.AddPublicTags(a);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.AddPublicTags] 不存Entity，添加公有标签失败。",
          ["EntityId", e],
        );
  }
  static RemovePublicTags(e, r) {
    var t = EntitySystem_1.EntitySystem.Get(e);
    if (t) {
      var o = t.GetComponent(0);
      for (const a of r) o.RemovePublicTag(a);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.RemovePublicTags] 不存在Entity,删除公有标签失败。",
          ["EntityId", e],
        );
  }
  static async HardnessModeChangedRequest(e, r) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
      t = Protocol_1.Aki.Protocol.Dcs.create();
    return (
      (t.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      (t.$Wn = r),
      await Net_1.Net.CallAsync(20924, t),
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
  static async hfr(t) {
    var o = ModelManager_1.ModelManager.CreatureModel,
      a = ModelManager_1.ModelManager.GameModeModel;
    if (a.HasGameModeData)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "未清理前一个场景的数据,就下发了JoinSceneNotify，服务器流程有问题",
        );
    else {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "World",
          3,
          "[CreatureController.JoinSceneNotify] JoinSceneNotify",
        ),
        Net_1.Net.PauseAllCallback(),
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
        Net_1.Net.ResumeAllCallback(),
        (a.LoadingPhase = 2);
      var l = t.$Rs,
        e = (a.JoinSceneInfo = l).d5n;
      if (
        ((o.LeavingLevel = !1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "[CreatureController.JoinSceneNotify] Begin",
            ["InstanceId", e],
          ),
        o.SetIsLoadingScene(!0),
        ControllerHolder_1.ControllerHolder.GameModeController.SetGameModeData(
          e,
          l.E7n,
        ))
      )
        if (
          (CreatureController.ResumeId(
            MathUtils_1.MathUtils.LongToBigInt(t.HRs),
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
            o.SetSceneId(l.BKn);
          var t = l.RRs,
            n = l.TRs;
          if (n) {
            const y = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
            var i = n.find((e) => e.W5n === y);
            i
              ? (CharacterBuffController_1.default.SetHandlePrefix(
                  i.mRs,
                  i.CRs,
                ),
                ModelManager_1.ModelManager.CombatMessageModel.SetLastPrefix(
                  i.mRs,
                ))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("World", 3, "未找到自身玩家信息", [
                  "PlayerId",
                  y,
                ]);
          }
          CreatureController.lfr(t.gDs),
            ModelManager_1.ModelManager.BlackboardModel.SetWorldBlackboardByProtocol(
              l.pIs,
            );
          let e = (Global_1.Global.BaseCharacter = void 0),
            r = void 0;
          if (n) {
            var _ = new Array();
            for (const c of n) {
              var C = c.W5n,
                s = new ScenePlayerData_1.ScenePlayerData(C),
                d = (s.SetTimerStart(), new Array());
              for (const M of c.ERs) {
                var u = [];
                for (const f of M.gRs) {
                  var g = new SceneTeamData_1.SceneTeamRole();
                  (g.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(
                    f.F4n,
                  )),
                    (g.RoleId = f.Q6n),
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
                  IsRetain: M.MRs,
                });
              }
              _.push({ PlayerId: C, CurrentGroupType: c.USs, Groups: d }),
                o.AddScenePlayerData(c.W5n, s),
                c.W5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
                  ((e = c.P5n), (r = c.g8n));
            }
            ModelManager_1.ModelManager.SceneTeamModel.UpdateAllPlayerData(_);
          }
          ModelManager_1.ModelManager.OnlineModel.ResetContinuingChallengeConfirmState(),
            a.SetBornInfo(e, r),
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
            (ModelManager_1.ModelManager.BulletModel.SceneBulletOwnerId =
              MathUtils_1.MathUtils.LongToNumber(l.tla)),
            await ControllerHolder_1.ControllerHolder.GameModeController.Load(
              ModelManager_1.ModelManager.GameModeModel.JoinSceneInfo,
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
  static LoadOrUnloadSubLevel(e) {
    if (e?.length) {
      var r = ModelManager_1.ModelManager.GameModeModel.SubLevelMap;
      const a = new Array(),
        l = new Array();
      var t,
        o = new Set();
      if (e) for (const n of e) o.add(n), r.has(n) || l.push(n);
      for ([t] of r) o.has(t) || a.push(t);
      (a.length || l.length) &&
        (ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
          "LoadOrUnloadSubLevel",
        ),
        (e = new AsyncTask_1.AsyncTask("LoadOrUnloadSubLevel", async () => {
          const r = new CustomPromise_1.CustomPromise();
          return (
            ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
              a,
              l,
              0,
              void 0,
              void 0,
              (e) => {
                e ||
                  (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "InstanceDungeon",
                      3,
                      "加载或者卸载子关卡失败",
                      ["unloads", a],
                      ["newLoads", l],
                    )),
                  ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
                    "LoadOrUnloadSubLevel",
                  ),
                  e &&
                    ModelManager_1.ModelManager.GameModeModel.MapDone &&
                    CreatureController.CreateEntityFromPending(
                      Protocol_1.Aki.Protocol.Nks.Proto_Normal,
                    ),
                  r.SetResult(e);
              },
            ),
            r.Promise
          );
        })),
        TaskSystem_1.TaskSystem.AddTask(e),
        TaskSystem_1.TaskSystem.Run());
    }
  }
  static lfr(e) {
    for (const r of e) this.CreateEntity(r);
  }
  static NotifyScenePlayerChanged() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.ScenePlayerChanged,
      e,
    );
  }
  static CreateEntity(e, r = "Default") {
    var t,
      o,
      a = MathUtils_1.MathUtils.LongToNumber(e.s5n),
      l = e.zHn;
    if (
      l === Protocol_1.Aki.Protocol.kks.Proto_Npc &&
      ModelManager_1.ModelManager.CreatureModel.GetOrAddDensityItem(a, e)
        .DensityLevel > this.hYs
    )
      return (
        (t = e.ZHn),
        (o = e.v9n),
        void (
          ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            6,
            "[实体生命周期:创建实体] CreateEntity(Density拦截)",
            ["CreatureDataId", a],
            ["ConfigType", t],
            ["PbDataId", o],
            ["EntityType", l],
            ["Context", r],
          )
        )
      );
    return this._Ys(a, e, r);
  }
  static GetDensityItemByPbDataId(e) {
    return ModelManager_1.ModelManager.CreatureModel.GetDensityItemByPbDataId(
      e,
    );
  }
  static _Ys(r, t, o) {
    var a = ModelManager_1.ModelManager.CreatureModel,
      l = t.ZHn,
      n = t.v9n,
      i = t.LEs,
      _ = t.zHn,
      C = t.rVn;
    if (
      (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "[实体生命周期:创建实体] CreateEntity(开始)",
          ["CreatureDataId", r],
          ["ConfigType", l],
          ["PbDataId", n],
          ["PrefabId", i],
          ["IsVisible", C],
          ["Context", o],
        ),
      SeamlessTravelController_1.SeamlessTravelController.WasRoleInSeamlessTraveling(
        t.v9n,
      ))
    ) {
      o = t.v9n;
      const e =
        ModelManager_1.ModelManager.SeamlessTravelModel.GetSeamlessTravelRoleEntityHandle(
          o,
        );
      o = e?.Entity?.GetComponent(0);
      return o
        ? (ModelManager_1.ModelManager.CreatureModel.RemoveEntity(
            r,
            "无缝加载复用实体",
          ),
          (e.CreatureDataId = r),
          ModelManager_1.ModelManager.CreatureModel.AddEntity(r, e),
          ModelManager_1.ModelManager.CreatureModel.CheckSetPrefabEntity(e),
          o.SetCreatureDataId(r),
          o.SetLocation(t.l8n),
          o.SetRotation(t._8n),
          e)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("SeamlessTravel", 51, "无缝加载复用Entity失败")
          );
    }
    if (a.ExistEntity(r))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          3,
          "[实体生命周期:创建实体] 已经存在实体，创建实体失败。",
          ["CreatureDataId", r],
          ["ConfigType", l],
          ["PbDataId", n],
          ["PrefabId", i],
        );
    else if (Global_1.Global.WorldEntityHelper) {
      var s = new CreateEntityData_1.CreateEntityData();
      s.Init(t);
      let e = void 0;
      switch (_) {
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
              ["CreatureDataId", r],
              ["ConfigType", l],
              ["PbDataId", n],
              ["PrefabId", i],
              ["EntityType", _],
            )
          );
      }
      if (e?.Valid) {
        if (
          (a.AddEntity(r, e),
          CharacterController_1.CharacterController.InitData(e, e.Entity, s))
        )
          return (
            CreatureController.SetEntityEnable(
              e.Entity,
              C,
              "CreatureController.CreateEntity",
            ),
            a.AddLoadingEntity(e),
            a.AddOwnerEntityInfo(r),
            (o = e.Entity.GetComponent(0)),
            a.CheckSetPrefabEntity(e),
            ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Entity",
                3,
                "[实体生命周期:创建实体] 实体详细数据。",
                ["CreatureDataId", r],
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
            ["CreatureDataId", r],
            ["ConfigType", l],
            ["PbDataId", n],
            ["PrefabId", i],
          ),
          a.RemoveEntity(r, "CreateEntity执行InitData失败"),
          CharacterController_1.CharacterController.Destroy(e);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[实体生命周期:创建实体] entity.Valid=false，创建实体失败。",
            ["CreatureDataId", r],
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
          ["CreatureDataId", r],
          ["ConfigType", l],
          ["PbDataId", n],
          ["PrefabId", i],
        );
  }
  static DestroyEntity(t, e = !0) {
    var r, o, a, l;
    t?.Valid &&
      ((o = (r = (l = t.Entity).GetComponent(0)).GetCreatureDataId()),
      this.nTa.delete(o),
      this.EEa.RemoveEntity(t),
      CreatureController.sTa(o, !0),
      ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "[实体生命周期:删除实体] DestroyEntity开始",
          ["CreatureDataId", r.GetCreatureDataId()],
          ["EntityId", t.Id],
          ["PendingRemove", e],
        ),
      (a = l.GetComponent(1)?.Owner)?.IsValid() &&
        Global_1.Global.BaseCharacter === a &&
        Global_1.Global.CharacterController &&
        (Global_1.Global.CharacterController.UnPossess(),
        (Global_1.Global.BaseCharacter = void 0)),
      l
        .GetComponent(99)
        ?.DisableTickWithLog("[CreatureController.DestroyEntity]"),
      l.Disable("DestroyEntity"),
      e
        ? (t.AllowDestroy ||
            TimerSystem_1.TimerSystem.Delay(() => {
              if (t.Valid && !t.AllowDestroy) {
                for (var [e, r] of t.HoldEntityMap)
                  Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "World",
                      3,
                      "非法持有PendingRemove的Entity",
                      ["CreatureDataId", t.CreatureDataId],
                      ["EntityId", t.Id],
                      ["Reason", e],
                      ["Count", r],
                    );
                t.ClearHoldEntity();
              }
            }, HOLD_ENTITY_TIMEOUT),
          ModelManager_1.ModelManager.CreatureModel.AddPendingRemoveEntity(
            r.GetCreatureDataId(),
            t,
          ))
        : Global_1.Global.WorldEntityHelper
          ? ((l = Global_1.Global.WorldEntityHelper.Destroy(t))
              ? ModelManager_1.ModelManager.WorldModel.AddDestroyActor(
                  o,
                  t.Id,
                  a,
                )
              : ControllerHolder_1.ControllerHolder.WorldController.DestroyEntityActor(
                  o,
                  t.Id,
                  a,
                  !1,
                ),
            ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Entity",
                3,
                "[实体生命周期:删除实体] DestroyEntity结束",
                ["CreatureDataId", o],
                ["EntityId", t.Id],
                ["EntitySystem.DestroyEntity结果", l],
              ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "[实体生命周期:删除实体] WorldEntityHelper不存在，删除实体失败。",
              ["CreatureDataId", o],
              ["EntityId", t.Id],
            ));
  }
  static LoadEntityAsync(e, r) {
    ModelManager_1.ModelManager.GameModeModel.MapDone
      ? this.yEa(e, this.n9a)
        ? this.EEa.QueueToInvoke(
            e,
            r,
            this.n9a.Component.GetCreatureDataId(),
            this.n9a.Component.GetPbDataId(),
          )
        : r?.(this.n9a.Result)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[实体生命周期:创建实体] 地图未加载完成，创建实体失败。",
            ["EntityId", e?.Id],
            ["CreatureDataId", e?.CreatureDataId],
            ["PbDataId", e?.PbDataId],
          ),
        r?.(2));
  }
  static yEa(e, r) {
    var t;
    return (
      (r.Component = void 0),
      e?.Valid
        ? (t = e.Entity.GetComponent(0)).GetRemoveState()
          ? !(r.Result = 4)
          : e.IsInit
            ? !(r.Result = 3)
            : ((r.Result = 0), (r.Component = t), !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "[实体生命周期:创建实体] entity.Valid=false，创建实体失败。",
            ),
          !(r.Result = 2))
    );
  }
  static IEa(t, o) {
    if (!this.yEa(t, this.n9a)) return this.n9a.Result;
    const a = this.n9a.Component;
    if (PreloadDefine_1.PreloadSetting.UseNewPreload && a.GetPreloadFinished())
      return 3;
    if (!a.GetLoading()) {
      a.SetLoading(!0);
      let r = void 0;
      ModelManager_1.ModelManager.PreloadModel.UseEntityProfilerInternal &&
        (r = new LogProfiler_1.LogProfiler(
          "预加载实体Profiler:" + a.GetCreatureDataId(),
        )).Start();
      const l = (e) => {
        ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Preload",
            3,
            "预加载实体:结束",
            ["EntityId", t.Id],
            ["CreatureDataId", a.GetCreatureDataId()],
            ["PbDataId", a.GetPbDataId()],
            ["是否成功", 3 === e],
            ["预加载结果", e],
          ),
          ModelManager_1.ModelManager.PreloadModel.UseEntityProfilerInternal &&
            (r.Stop(), Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info("Preload", 3, r.ToString()),
          !t?.Valid || a.GetRemoveState() ? o(4) : o(e);
      };
      ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Preload",
          3,
          "预加载实体:开始",
          ["EntityId", t.Id],
          ["CreatureDataId", a.GetCreatureDataId()],
          ["PbDataId", a.GetPbDataId()],
          ["Reason", "CreatureController.LoadEntityAsync"],
        ),
        PreloadDefine_1.PreloadSetting.UseNewPreload
          ? PreloadControllerNew_1.PreloadControllerNew.PreloadEntity(t, r, l)
          : PreloadController_1.PreloadController.PreloadEntity(t, r, (e) => {
              e = e ? 3 : 2;
              l(e);
            });
    }
    return 1;
  }
  static AddBindEntity(e, r) {
    this.oTa.Union(e, r),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          20,
          "[实体生命周期:创建实体] 建立实体绑定",
          ["CreatureDataIdA", e],
          ["CreatureDataIdB", r],
        );
  }
  static GetBindGroup(e) {
    return this.oTa.GetSet(e);
  }
  static aTa(e) {
    var r = this.GetBindGroup(e);
    if (r)
      for (const a of r)
        if (a !== e) {
          var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(a),
            o = 4 & (t?.Entity?.Flag ?? 0);
          if (!t?.Valid || !o) return !1;
          o = t.Entity?.GetComponent(0);
          o && o.GetRemoveState();
        }
    return !0;
  }
  static sTa(r, t) {
    var o = CreatureController.GetBindGroup(r);
    if (o) {
      let e = r;
      if (t) {
        for (const l of o)
          if (l !== r) {
            e = l;
            break;
          }
        CreatureController.oTa.Delete(r);
      }
      if (CreatureController.aTa(e)) {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            20,
            "[实体生命周期:创建实体] 同组实体全部创建完成，激活Activate流程",
            ["BindGroup", o],
          );
        for (const n of o) {
          var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
          a?.Valid && CreatureController.mfr(a);
        }
        CreatureController.oTa.DeleteSet(r);
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            20,
            "[实体生命周期:创建实体] 同组实体未全部创建完成，阻塞Activate流程",
            ["CreatureDataId", r],
            ["BindGroup", o],
          );
    } else
      t ||
        ((o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r))?.Valid
          ? CreatureController.mfr(o)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              20,
              "[实体生命周期:创建实体] 未找到实体",
              ["CreatureDataId", r],
            ));
  }
  static cfr(e, r) {
    if (e?.Valid) {
      const l = e.Entity.GetComponent(0),
        n = l.GetCreatureDataId();
      if (l.GetRemoveState()) CreatureController.sTa(n, !0), r?.(4);
      else {
        var t = CreatureController.GetBindGroup(n);
        if (t) {
          var o = Math.max(
            ...t.map(
              (e) =>
                ModelManager_1.ModelManager.CreatureModel.GetEntity(e)
                  ?.Priority ?? 0,
            ),
          );
          for (const i of t) {
            var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(i);
            a?.Valid &&
              ((a.Priority = o),
              CharacterController_1.CharacterController.SortItem(a));
          }
        }
        CharacterController_1.CharacterController.AddEntityToAwakeQueue(
          e,
          (e) => {
            e
              ? l.GetRemoveState()
                ? (CreatureController.sTa(n, !0), r?.(4))
                : (r && CreatureController.nTa.set(n, r),
                  CreatureController.sTa(n, !1))
              : (CreatureController.sTa(n, !0), r?.(2));
          },
        );
      }
    } else CreatureController.sTa(e.CreatureDataId, !0), r?.(4);
  }
  static mfr(n) {
    var e = 8 & (n.Entity?.Flag ?? 0);
    if (!e)
      if (GlobalData_1.GlobalData.Networking()) {
        const i = n.Entity.GetComponent(0);
        switch (i.GetEntityType()) {
          case Protocol_1.Aki.Protocol.kks.Proto_Custom:
          case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
          case Protocol_1.Aki.Protocol.kks.Proto_Animal:
            return void CreatureController.hTa(n, !0);
        }
        e = Protocol_1.Aki.Protocol.ges.create();
        const _ = i.GetCreatureDataId();
        (e.F4n = MathUtils_1.MathUtils.NumberToLong(_)),
          ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              3,
              "[实体生命周期:创建实体] 请求Activate实体",
              ["CreatureDataId", _],
              ["PbDataId", i.GetPbDataId()],
              ["EntityId", n.Id],
            ),
          Net_1.Net.Call(26610, e, (r) => {
            var t = 8 & (n.Entity?.Flag ?? 0);
            if (!t) {
              let e = !1;
              if (r)
                if (r.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
                  (e = !0),
                    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                      r.Q4n,
                      28403,
                      void 0,
                      !1,
                      !0,
                    );
                else {
                  CreatureController.SetEntityEnable(
                    n.Entity,
                    r.rVn,
                    "EntityActiveResponse",
                  );
                  var t = WorldGlobal_1.WorldGlobal.ToUeVector(r.l8n),
                    o = WorldGlobal_1.WorldGlobal.ToUeRotator(r._8n);
                  n.Entity.GetComponent(1)?.SetActorLocationAndRotation(
                    t,
                    o,
                    "ActivateEntityRequest",
                  );
                  for (const l of r.zEs) {
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
                  ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
                    Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Entity",
                      3,
                      "[实体生命周期:创建实体] 服务器返回Activate实体成功",
                      ["CreatureDataId", _],
                      ["PbDataId", i.GetPbDataId()],
                      ["EntityId", n.Id],
                    ),
                  CreatureController.hTa(n, !0));
            }
          });
      } else CreatureController.hTa(n, !0);
  }
  static dfr(e) {
    var r = e.Entity.GetComponent(0),
      t = (r.SetLoading(!1), e.Entity.GetComponent(1)?.Owner),
      o = r.GetEntityType();
    return o === Protocol_1.Aki.Protocol.kks.Proto_Custom ||
      o === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity ||
      o === Protocol_1.Aki.Protocol.kks.Proto_SceneEntity ||
      t
      ? (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[实体生命周期:创建实体] 实体创建成功",
            ["CreatureDataId", r.GetCreatureDataId()],
            ["EntityId", e.Id],
            ["PbDataId", r.GetPbDataId()],
            ["Entity.Active", e.Entity.Active],
          ),
        CreatureController.SetEntityEnable(
          e.Entity,
          r.GetVisible(),
          "CreatureController.AfterEntityActivate",
        ),
        CreatureController.NotifyAddEntity(
          Protocol_1.Aki.Protocol.Nks.Proto_Normal,
          e,
          t,
        ) &&
          (CreatureController.NotifySpawnBoss(e),
          r.IsRole() && ModelManager_1.ModelManager.WorldModel.AddIgnore(t),
          r.IsPlayer()) &&
          ((o = r.GetPlayerId()),
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
            ["CreatureDataId", r.GetCreatureDataId()],
            ["EntityId", e.Id],
            ["PbDataId", r.GetPbDataId()],
          ),
        !1);
  }
  static LoadActorByModelConfig(e, r) {
    var t = e.蓝图?.ToAssetPathName();
    if (t && t.length && "None" !== t) {
      var t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        e.蓝图.ToAssetPathName(),
        UE.Class,
      );
      if (t?.IsValid())
        return (
          (t = ActorSystem_1.ActorSystem.Get(t, r))?.IsValid() &&
            (t.SetActorHiddenInGame(!0),
            t.SetActorTickEnabled(!1),
            t.SetActorEnableCollision(!1)),
          t
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.LoadActorByModelConfig] 加载Actor失败，因为模型的蓝图没有设置。",
          ["ModelId", e.ID],
        );
  }
  static LoadAndChangeMeshAnim(e, r, t) {
    var r = r.ToAssetPathName(),
      r =
        (r?.length &&
          "None" !== r &&
          (r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            r,
            UE.SkeletalMesh,
          )) &&
          e.SkeletalMesh !== r &&
          e.SetSkeletalMesh(r),
        t.ToAssetPathName());
    r?.length &&
      "None" !== r &&
      (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(r, UE.Class)) &&
      e.AnimClass !== t &&
      e.SetAnimClass(t);
  }
  static ChangeMeshAnim(e, r, t) {
    e.SetSkeletalMesh(r), e.SetAnimClass(t);
  }
  static OnLeaveLevel() {
    var e = ModelManager_1.ModelManager.CreatureModel,
      r = e.GetPlayerId();
    if (0 !== r) {
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
        var t = e.GetAllEntities();
        for (const l of e.DelayRemoveContainer.GetAllEntities())
          CreatureController.DestroyEntity(l, !1);
        for (let e = t.length - 1; 0 <= e; e--) {
          var o = t[e],
            a = o.Entity.GetComponent(0);
          SeamlessTravelController_1.SeamlessTravelController.WasRoleEntityInSeamlessTraveling(
            o.Entity,
          ) ||
            CreatureController.RemoveEntity(
              a.GetCreatureDataId(),
              "OnLeaveLevel",
            ) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                3,
                "[CreatureController.ClearWorldData] 销毁实体失败。",
                ["CreatureDataId", a.GetCreatureDataId()],
                ["实体类型", a.GetEntityType()],
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
  static ChangeLockTagByCreatureGenId(e, r) {
    var t;
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      o.IsInit &&
        o.Entity.GetComponent(0).GetOwnerId() === e &&
        (t = o.Entity.GetComponent(95)) &&
        t.ChangeLockTag(r);
  }
  static ChangeLockTagByTeleportPbDataId(e, r) {
    var t;
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      o.IsInit &&
        o.Entity.GetComponent(0).GetPbDataId() === e &&
        (t = o.Entity.GetComponent(95)) &&
        t.ChangeLockTag(r);
  }
  static LoadActorByPbModelConfig(e, r) {
    var t = UE.KismetSystemLibrary.Conv_SoftClassPathToSoftClassRef(
      UE.KismetSystemLibrary.MakeSoftObjectPath(e.BluePrintClass),
    );
    if (t)
      return (
        (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          t.ToAssetPathName(),
          UE.Class,
        )),
        (t = ActorSystem_1.ActorSystem.Get(t, r))?.IsValid() &&
          (t.SetActorHiddenInGame(!0),
          t.SetActorTickEnabled(!1),
          t.SetActorEnableCollision(!1)),
        t
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "World",
        3,
        "[CreatureController.LoadActorByModelConfig] 加载Actor失败，因为模型的蓝图没有设置。",
        ["BluePrintId", e.BluePrintId],
      );
  }
  static AddDelayRemoveEntity(e, r) {
    var t = ModelManager_1.ModelManager.CreatureModel;
    t.AddDelayRemoveEntity(e, r)
      ? t.RemoveEntity(e, "AddDelayRemoveEntity 加入延迟删除列表")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.AddPendingRemoveEntity] 实体添加到PendingRemoveEntityMap列表失败。",
          ["CreatureDataId", e],
        );
  }
  static CheckDelayRemove(e, r, t) {
    var o = ModelManager_1.ModelManager.CreatureModel;
    let a = o.GetEntityWithDelayRemoveContainer(e);
    return (
      !!(a =
        a || r !== Protocol_1.Aki.Protocol.rLs.F6n
          ? a
          : o.DelayRemoveContainer.GetEntityByPbDataId(t))?.Valid &&
      (o.RemoveDelayRemoveEntity(a.CreatureDataId),
      CreatureController.DestroyEntity(a, !1),
      !0)
    );
  }
  static CheckPendingRemove(e, r, t) {
    var o = ModelManager_1.ModelManager.CreatureModel;
    let a = o.GetPendingRemoveEntity(e);
    return (
      !!(a =
        a || r !== Protocol_1.Aki.Protocol.rLs.F6n
          ? a
          : o.GetPendingRemoveEntityByPbDataId(t))?.Valid &&
      (o.RemovePendingRemoveEntity(a.CreatureDataId),
      CreatureController.DestroyEntity(a, !1),
      !0)
    );
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
  static async SwitchBigWorldRequest(e, r) {
    var t = Protocol_1.Aki.Protocol.Hds.create(),
      e = ((t.r6n = e), (t.g5n = r), await Net_1.Net.CallAsync(23999, t));
    return !!e;
  }
  static MonsterBoomRequest(e, r) {
    CombatMessage_1.CombatNet.Call(
      16481,
      e,
      Protocol_1.Aki.Protocol.n4n.create({ qKn: r }),
    );
  }
  static ParseTravelConfig(e) {
    switch (e.p5n) {
      case Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("SeamlessTravel", 51, "无缝加载目前暂时屏蔽禁止使用");
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
        ControllerHolder_1.ControllerHolder.GameModeController.SetTravelMp4(
          !0,
          e.y5n,
        );
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
        (ModelManager_1.ModelManager.GameModeModel.ShowCenterTextFlow = e.E5n),
          (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = !0);
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("SeamlessTravel", 51, "无缝加载目前暂时屏蔽禁止使用");
    }
  }
  static SetEntityEnable(e, r, t, o = !1) {
    e?.Valid &&
      r !== !e.HasDisableKey(2) &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          29,
          "CreatureController.SetEntityEnable",
          ["Enable", r],
          ["EntityId", e.Id],
          ["Reason", t],
        ),
      ModelManager_1.ModelManager.CreatureModel.DisableLock.has(e.Id)
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Entity", 29, "递归设置EntityEnable")
        : (ModelManager_1.ModelManager.CreatureModel.DisableLock.add(e.Id),
          e.GetComponent(0).SetVisible(r),
          r ? e.EnableByKey(2, !0) : e.DisableByKey(2, !0),
          ModelManager_1.ModelManager.CreatureModel.DisableLock.delete(e.Id),
          o && CreatureController.Cfr(e, r)));
  }
  static SetActorVisible(e, r, t, o, a, l = !1) {
    var n, i;
    e?.Valid &&
      ((n = e.GetComponent(1)),
      (i = e.GetComponent(92)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          29,
          "CreatureController.SetActorVisible",
          ["Visible", r],
          ["EntityId", e.Id],
          ["Reason", a],
        ),
      n.SetActorVisible(r, a),
      n.SetCollisionEnable(t, a),
      i?.SetIsInGame(r),
      this.SetActorMovable(e, o, a),
      l) &&
      CreatureController.gfr(e, r);
  }
  static SetActorMovable(e, r, t) {
    var o,
      a = e.GetComponent(101),
      l = e.GetComponent(102);
    a &&
      l &&
      !r !=
        !!(o =
          ModelManager_1.ModelManager.CreatureModel.ActorMovableHandleMap.get(
            e.Id,
          )) &&
      (r
        ? (a.Enable(o[0], t),
          l.Enable(o[1], t),
          ModelManager_1.ModelManager.CreatureModel.ActorMovableHandleMap.delete(
            e.Id,
          ))
        : ((o = [a.Disable(t), l.Disable(t)]),
          ModelManager_1.ModelManager.CreatureModel.ActorMovableHandleMap.set(
            e.Id,
            o,
          )));
  }
  static Cfr(e, r) {
    var t = e.GetComponent(0),
      o = Protocol_1.Aki.Protocol.N3n.create();
    (o.s5n = MathUtils_1.MathUtils.NumberToLong(t.GetCreatureDataId())),
      (o.rVn = r),
      CombatMessage_1.CombatNet.Call(18228, e, o, () => {});
  }
  static gfr(e, r) {
    var t, o;
    ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      ((t = e.GetComponent(0)),
      ((o = Protocol_1.Aki.Protocol.y4n.create()).s5n =
        MathUtils_1.MathUtils.NumberToLong(t.GetCreatureDataId())),
      (o.oVn = r),
      CombatMessage_1.CombatNet.Call(18880, e, o, () => {}));
  }
  static RecoverDensityEntity(e, r) {
    var t = this.GetDensityItemByPbDataId(e);
    t &&
      !(t.DensityLevel <= this.hYs) &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          27,
          "恢复人群密度屏蔽的实体",
          ["PbDataId", e],
          ["context", r],
        ),
      (e = this._Ys(t.CreatureDataId, t.EntityData, r))) &&
      (ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(
        e,
      ),
      AoiController_1.AoiController.AddMonsterSizeTag(e));
  }
  static RefreshDensityLevel(e) {
    if (this.hYs !== e) {
      for (
        var r, t, o, a = ModelManager_1.ModelManager.CreatureModel;
        this.hYs < e;

      ) {
        ++this.hYs;
        for ([r, t] of a.GetDensityLevelGroup(this.hYs)) {
          var l = this._Ys(r, t.EntityData, "Density");
          l &&
            (ModelManager_1.ModelManager.GameModeModel.MapDone &&
              ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(
                l,
              ),
            AoiController_1.AoiController.AddMonsterSizeTag(l));
        }
      }
      for (; this.hYs > e; ) {
        for ([o] of a.GetDensityLevelGroup(this.hYs))
          this.rfr(
            o,
            "DensityLevelChanged",
            Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce,
          );
        --this.hYs;
      }
    }
  }
}
(exports.CreatureController = CreatureController),
  ((_a = CreatureController).xe = idDefaultValue),
  (CreatureController.ofr = Stats_1.Stat.Create(
    "CreatureController.RemoveEntity",
  )),
  (CreatureController.nfr = Stats_1.Stat.Create(
    "CreatureController.RemoveEntityInternal",
  )),
  (CreatureController.hYs = 2),
  (CreatureController.VXa = void 0),
  (CreatureController.ffr = []),
  (CreatureController.O0r = (e) => {
    ModelManager_1.ModelManager.GameModeModel.IsTeleport
      ? CreatureController.ffr.push(e)
      : CreatureController.ifr(e);
  }),
  (CreatureController.tfr = () => {
    for (const e of CreatureController.ffr) CreatureController.ifr(e);
    CreatureController.ffr = [];
  }),
  (CreatureController.k0r = (e) => {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(e.F4n),
    );
    if (r?.Valid) {
      var t = r.Entity.GetComponent(160);
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            20,
            "[CreatureController.UpdateSysBuffNotify] 更新Buff失败, Entity没有AbilityComponent。",
            ["CreatureDataId", e.F4n],
          ));
      for (const l of e.nDs) {
        var o = MathUtils_1.MathUtils.LongToBigInt(l.b6n),
          a = l.wjn;
        t?.RemoveBuffByServerIdLocal(a, "刷新系统buff, serverId=" + a),
          t?.AddBuffWithServerId(
            o,
            l.F6n,
            l.Bjn,
            a,
            "刷新系统buff, serverId=" + a,
          );
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          20,
          "[CreatureController.UpdateSysBuffNotify] 更新Buff失败, Entity无效或不存在。",
          ["CreatureDataId", e.F4n],
        );
  }),
  (CreatureController.F0r = (e) => {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(e.F4n),
    );
    if (r?.Valid) {
      var t = r.Entity.GetComponent(160);
      if (
        (t ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              20,
              "[CreatureController.RemoveSysBuffNotify] 移除Buff失败, Entity没有AbilityComponent。",
              ["CreatureDataId", e.F4n],
            )),
        r.IsInit)
      )
        for (const o of e.BVn)
          t?.RemoveBuffByServerIdLocal(o, "服务端移除系统buff, serverId=" + o);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          20,
          "[CreatureController.RemoveSysBuffNotify] 移除Buff失败, Entity无效或不存在。",
          ["CreatureDataId", e.F4n],
        );
  }),
  (CreatureController.V0r = (e) => {
    BattleLogicController_1.BattleLogicController.ExecuteEntityLivingStatusNotify(
      e,
    );
  }),
  (CreatureController.j0r = (e) => {
    for (const o of e.QRs) {
      var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        MathUtils_1.MathUtils.LongToNumber(o.s5n),
      );
      if (!r?.Valid)
        return void (
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "World",
            20,
            "[CreatureController.MonsterAttributeArrayNotify] 更新Monster属性失败, Entity无效或不存在。",
            ["CreatureDataId", o.s5n],
          )
        );
      var t = r.Entity.GetComponent(159);
      if (t)
        for (const a of Object.keys(o.GSs)) t.SetBaseValue(Number(a), o.GSs[a]);
    }
  }),
  (CreatureController.x0r = (e) => {
    var r = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r),
      t = MathUtils_1.MathUtils.LongToNumber(e.Z5n);
    r.Entity.GetComponent(36)?.SetVisionSkillInformationList(e.CIs, t),
      (r.Entity.GetComponent(0).VisionSkillServerEntityId = t),
      EventSystem_1.EventSystem.EmitWithTarget(
        r,
        EventDefine_1.EEventName.EntityVisionSkillChanged,
      );
  }),
  (CreatureController.w0r = (e) => {
    var r,
      t = MathUtils_1.MathUtils.LongToNumber(e.s5n),
      o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    o
      ? ((r = o.Entity.GetComponent(0)),
        e.W5n && r.SetPlayerId(e.W5n),
        e.W5n === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
          ((r = o.Entity.GetComponent(3).Actor)
            ? r.Kuro_SetRole(2)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                3,
                "ChangeEntityRoleNotify,actor无效。",
                ["CreatureDataId", t],
              )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.ChangeEntityRoleNotify] 不存在Entity。",
          ["CreatureDataId", t],
        );
  }),
  (CreatureController.EntityOnLandedPush = (e) => {
    e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e.Id);
    CreatureController.afr(e);
  }),
  (CreatureController.EntityOnLandedNotify = (e) => {
    var r,
      e = MathUtils_1.MathUtils.LongToNumber(e.s5n);
    ModelManager_1.ModelManager.CreatureModel.ExistEntity(e)
      ? (r = ModelManager_1.ModelManager.CreatureModel.GetEntity(e))?.Valid &&
        EventSystem_1.EventSystem.EmitWithTarget(
          r,
          EventDefine_1.EEventName.CharOnLand,
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.EntityOnLandedNotify] 不存在动态实体。",
          ["CreatureDataId", e],
        );
  }),
  (CreatureController.P0r = (e) => {
    CreatureController.TWa(e);
  }),
  (CreatureController.J0r = (e) => {
    var r;
    e.VRs &&
      (e = e.W5n) !==
        (r = ModelManager_1.ModelManager.CreatureModel).GetPlayerId() &&
      r.GetScenePlayerData(e)?.SetRemoteSceneLoading(!0);
  }),
  (CreatureController.z0r = (e) => {
    const r = e.W5n;
    e = ModelManager_1.ModelManager.CreatureModel;
    if (r !== e.GetPlayerId()) {
      e = e.GetScenePlayerData(r);
      if (e) {
        e.SetRemoteSceneLoading(!1);
        const t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(
          r,
        )
          ?.GetCurrentGroup()
          ?.GetCurrentRole()?.CreatureDataId;
        t
          ? WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
              e
                ? (e =
                    ModelManager_1.ModelManager.CreatureModel.GetEntity(
                      t,
                    )?.Entity) && e.EnableByKey(1, !0)
                : Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "World",
                    49,
                    "模拟端加载完成，等待玩家当前实体加载失败",
                    ["playerId", r],
                    ["currentEntityId", t],
                  );
            })
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("World", 49, "模拟端加载完成，无法获取当前实体id", [
              "playerId",
              r,
            ]);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("World", 49, "模拟端加载完成，无法获取玩家数据", [
            "playerId",
            r,
          ]);
    }
  }),
  (CreatureController.Z0r = (e) => {
    e = e.P8n;
    HotFixUtils_1.HotFixUtils.EvalScript(e);
  }),
  (CreatureController.UploadEventCallBack = (e, r) => {}),
  (CreatureController.FXa = (e) => {
    CreatureController.IBi();
  }),
  (CreatureController.SceneLoadingTimeOutNotify = (e) => {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 5, "世界加载超时");
  }),
  (CreatureController.X0r = (e) => {
    var r = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
    t
      ? ((t = t.Entity.GetComponent(190))?.AddTag(1008164187),
        e.W5n !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
          (t?.AddTag(1961456719), t?.AddTag(1800978500)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Animal",
          30,
          "[CreatureController.AnimalDieNotify] 不存Entity。",
          ["CreatureDataId", r],
        );
  }),
  (CreatureController.B0r = (e) => {
    var r = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
    t
      ? (t.Entity.GetComponent(0).SetHardnessModeId(e.$Wn),
        (t = t.Entity.GetComponent(53)).SetHardnessModeId(e.$Wn),
        t.RefreshHardnessModeConfig())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          15,
          "[CreatureController.HardnessModeChangedNotify] entity为空。",
          ["creatureDataId", r],
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
  (CreatureController.b0r = (e) => {
    let r = void 0,
      t = void 0;
    var o = ModelManager_1.ModelManager.AutoRunModel;
    if (e.$Ds && -1 !== e.$Ds) {
      var a = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.$Ds);
      if (a) {
        var l = a.Transform.Pos,
          l =
            (l && (r = Vector_1.Vector.Create(l.X ?? 0, l.Y ?? 0, l.Z ?? 0)),
            a.Transform.Rot);
        l && (t = Rotator_1.Rotator.Create(l.Y ?? 0, l.Z ?? 0, l.X ?? 0));
      } else if (
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[CreatureController.SceneSubLevelsChangedNotify] 要传送的TeleportEntityId不存在。",
            ["TeleportEntityId", e.$Ds],
          ),
        !o?.IsInAfterRunningState())
      )
        return;
    }
    o?.IsInAfterRunningState() &&
      (o.ShouldTpAfterSkip
        ? (a = o.GetOverrideTpInfo() ?? o.GetGuaranteeTpInfo()) &&
          ((r = a.Location), (t = a.Rotator))
        : ((r = void 0), (t = void 0)));
    const n = new Array();
    var i = new Array();
    const _ = new Array();
    if (ModelManager_1.ModelManager.GameModeModel.SubLevelMap)
      for (var [C] of ModelManager_1.ModelManager.GameModeModel.SubLevelMap)
        (e.FDs.includes(C) ? i : n).push(C);
    for (const s of e.FDs) i.includes(s) || _.push(s);
    ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
      n,
      _,
      0,
      r,
      t,
      (e) => {
        e ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "InstanceDungeon",
              40,
              "加载子关卡失败",
              ["unloads", n],
              ["newLoads", _],
            )),
          ModelManager_1.ModelManager.AutoRunModel?.IsInAfterRunningState() &&
            ModelManager_1.ModelManager.AutoRunModel.StopAutoRunAndClearInfo();
      },
    );
  }),
  (CreatureController.q0r = (e) => {
    CreatureController.LoadOrUnloadSubLevel(e.HDs);
  }),
  (CreatureController.G0r = (e) => {
    let r = void 0,
      t = void 0;
    if (e.F4n && -1 !== e.F4n) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.F4n);
      if (!o)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            30,
            "[CreatureController.SceneChangeDataLayerNotify] 要传送的EntityId不存在。",
            ["TeleportEntityId", e.F4n],
          )
        );
      var a = o.Transform.Pos,
        a =
          (a && (r = Vector_1.Vector.Create(a.X ?? 0, a.Y ?? 0, a.Z ?? 0)),
          o.Transform.Rot);
      a && (t = Rotator_1.Rotator.Create(a.Y ?? 0, a.Z ?? 0, a.X ?? 0));
    }
    const l = new Array(),
      n = new Array();
    for (const C of e.WDs) {
      var i = DataLayerById_1.configDataLayerById.GetConfig(C);
      l.push(i.DataLayer);
    }
    for (const s of e.jDs) {
      var _ = DataLayerById_1.configDataLayerById.GetConfig(s);
      n.push(_.DataLayer);
    }
    ControllerHolder_1.ControllerHolder.GameModeController.SwitchDataLayer(
      l,
      n,
      r?.ToUeVector(),
      t?.ToUeRotator(),
      (e) => {
        e ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "InstanceDungeon",
              30,
              "切换DataLayer失败",
              ["unloads", l.join()],
              ["newLoads", n.join()],
            ));
      },
    );
  }),
  (CreatureController.N0r = (e) => {
    var e = e.jRs.W5n,
      r = new ScenePlayerData_1.ScenePlayerData(e);
    r.SetTimerStart(),
      r.SetRemoteSceneLoading(!0),
      ModelManager_1.ModelManager.CreatureModel.AddScenePlayerData(e, r),
      CreatureController.NotifyScenePlayerChanged(),
      ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(
        e,
        2,
      );
  }),
  (CreatureController.EEa = new WaitEntityToLoadTask_1.WaitEntityToLoadTask(
    _a.IEa.bind(_a),
    _a.cfr.bind(_a),
  )),
  (CreatureController.n9a = { Result: 0, Component: void 0 }),
  (CreatureController.oTa = new DisjointSet_1.DisjointSet()),
  (CreatureController.nTa = new Map()),
  (CreatureController.hTa = (e, r) => {
    var t = e.Entity.GetComponent(0),
      o = t.GetCreatureDataId(),
      a = CreatureController.nTa.get(o);
    CreatureController.nTa.delete(o),
      r
        ? t.GetRemoveState()
          ? a?.(4)
          : (CharacterController_1.CharacterController.ActivateEntity(e),
            CreatureController.dfr(e) ? a?.(3) : a?.(2))
        : a?.(2);
  }),
  (CreatureController.H0r = (e) => {
    e = MathUtils_1.MathUtils.LongToNumber(e.s5n);
    ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Valid ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.MonsterLevelNotify] 更新怪物等级失败，找不到对应的Entity。",
          ["CreatureDataId", e],
        ));
  }),
  (CreatureController.SwitchBattleModeNotify = (e) => {
    for (const r of e.AAs)
      BattleSetting_1.BattleSetting.ReceiveSetModuleNetworkState(r, !0);
    for (const t of e.DAs)
      BattleSetting_1.BattleSetting.ReceiveSetModuleNetworkState(t, !1);
  }),
  (CreatureController.BattleLogNotify = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Battle", 20, "Server Log", ["log", e.PAs]);
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
  (CreatureController.efr = (e) => {
    var r, t;
    GlobalData_1.GlobalData.World?.IsValid() &&
      e?.Valid &&
      ((r = ModelManager_1.ModelManager.CreatureModel),
      (e = e.GetComponent(0)?.GetCreatureDataId())
        ? GlobalData_1.GlobalData.Networking()
          ? (t = r.DelayRemoveContainer.GetEntity(e))?.Valid &&
            (r.DelayRemoveContainer.RemoveEntity(e),
            CreatureController.DestroyEntity(t))
          : CreatureController.RemoveEntity(
              e,
              "DoDelayRemoveEntityFinished",
              Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce,
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[CreatureController.DoDelayRemoveEntityFinished] CreatureDataId无效, 延迟删除失败。",
            ["CreatureDataId", e],
          ));
  }),
  (CreatureController.Q0r = (e) => {
    ModelManager_1.ModelManager.CreatureModel.SetRestoreEntityId(e.xRs);
  }),
  (CreatureController.K0r = (e) => {
    var r = e.vTs,
      t = ModelManager_1.ModelManager.CreatureModel;
    for (const l of Object.keys(r)) {
      var o = Number(l),
        a = r[l];
      t.RecordEntitySilenceState(o, a);
    }
  }),
  (CreatureController.$0r = (e) => {
    ModelManager_1.ModelManager.WorldModel.UpdateWorldState(e.KBs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnReceivePlayerVar,
      );
  }),
  (CreatureController.Y0r = (e) => {
    var r = MathUtils_1.MathUtils.LongToNumber(e.YWn);
    ModelManager_1.ModelManager.CreatureModel.GetEntity(r).Entity.GetComponent(
      0,
    ).SummonEntityIds = e.zRs.map((e) => MathUtils_1.MathUtils.LongToNumber(e));
  }),
  (CreatureController.OnCreateEntityFail = (e) => {
    ModelManager_1.ModelManager.CreatureModel.RemoveEntity(
      e,
      "OnCreateEntityFail",
    );
  });
//# sourceMappingURL=CreatureController.js.map
