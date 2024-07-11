"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreatureController = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  LogProfiler_1 = require("../../../Core/Common/LogProfiler"),
  Stats_1 = require("../../../Core/Common/Stats"),
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
  TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
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
  SceneTeamData_1 = require("../../Module/SceneTeam/SceneTeamData"),
  SeamlessTravelController_1 = require("../../Module/SeamlessTravel/SeamlessTravelController"),
  SeamlessTravelDefine_1 = require("../../Module/SeamlessTravel/SeamlessTravelDefine"),
  TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  CharacterBuffController_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffController"),
  CreateEntityData_1 = require("../../NewWorld/Character/CreateEntityData"),
  BattleSetting_1 = require("../../NewWorld/Setting/BattleSetting"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine"),
  ScenePlayerData_1 = require("../Define/ScenePlayerData"),
  WaitEntityPreloadTask_1 = require("../Define/WaitEntityPreloadTask"),
  WaitEntityTask_1 = require("../Define/WaitEntityTask"),
  AsyncTask_1 = require("../Task/AsyncTask"),
  TaskSystem_1 = require("../Task/TaskSystem"),
  WorldGlobal_1 = require("../WorldGlobal"),
  AoiController_1 = require("./AoiController"),
  BattleLogicController_1 = require("./BattleLogicController"),
  PreloadController_1 = require("./PreloadController"),
  PreloadControllerNew_1 = require("./PreloadControllerNew"),
  idDefaultValue = -1n,
  increment = 2n,
  playerBit = 20n,
  unitMax = 4294967295n,
  ENTITY_REMOVE_DELAY = 3e3;
class CreatureController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    WorldGlobal_1.WorldGlobal.Initialize();
    var e =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    return (
      (this.wVs = e.NpcDensity),
      !!Global_1.Global.WorldEntityHelper.Initialize() &&
        (Net_1.Net.Register(13045, CreatureController.Bgr),
        Net_1.Net.Register(4012, CreatureController.bgr),
        Net_1.Net.Register(2161, CreatureController.qgr),
        Net_1.Net.Register(11583, CreatureController.EntityOnLandedNotify),
        Net_1.Net.Register(9029, CreatureController.Ggr),
        Net_1.Net.Register(21114, CreatureController.JoinSceneNotify),
        Net_1.Net.Register(7810, CreatureController.AfterJoinSceneNotify),
        Net_1.Net.Register(14829, CreatureController.Ngr),
        Net_1.Net.Register(2776, CreatureController.Ogr),
        Net_1.Net.Register(3279, CreatureController.kgr),
        Net_1.Net.Register(19150, CreatureController.Fgr),
        Net_1.Net.Register(27325, CreatureController.Vgr),
        Net_1.Net.Register(28227, CreatureController.Hgr),
        Net_1.Net.Register(14565, CreatureController.jgr),
        Net_1.Net.Register(11305, CreatureController.Wgr),
        Net_1.Net.Register(1276, CreatureController.Kgr),
        Net_1.Net.Register(3198, CreatureController.Qgr),
        Net_1.Net.Register(24297, this.SwitchBattleModeNotify),
        Net_1.Net.Register(3791, this.BattleLogNotify),
        Net_1.Net.Register(15443, this.Xgr),
        Net_1.Net.Register(16069, this.eIn),
        Net_1.Net.Register(3492, this.$gr),
        Net_1.Net.Register(6951, this.SceneLoadingTimeOutNotify),
        Net_1.Net.Register(8101, CreatureController.Ygr),
        Net_1.Net.Register(17082, CreatureController.Jgr),
        Net_1.Net.Register(28687, CreatureController.zgr),
        Net_1.Net.Register(29095, CreatureController.Zgr),
        Net_1.Net.Register(
          22153,
          FormationAttributeController_1.FormationAttributeController
            .FormationAttrNotify,
        ),
        Net_1.Net.Register(
          7876,
          FormationAttributeController_1.FormationAttributeController
            .TimeCheckNotify,
        ),
        Net_1.Net.Register(6999, CreatureController.e0r),
        Net_1.Net.Register(20353, CreatureController.t0r),
        Net_1.Net.Register(23399, CreatureController.i0r),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.EntityOnLandedPush,
          CreatureController.EntityOnLandedPush,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.DelayRemoveEntityFinished,
          CreatureController.o0r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.TeleportComplete,
          CreatureController.r0r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CreateEntityFail,
          CreatureController.OnCreateEntityFail,
        ),
        !0)
    );
  }
  static OnClear() {
    return (
      WorldGlobal_1.WorldGlobal.Clear(),
      !!Global_1.Global.WorldEntityHelper.Clear() &&
        (Net_1.Net.UnRegister(13045),
        Net_1.Net.UnRegister(4012),
        Net_1.Net.UnRegister(2161),
        Net_1.Net.UnRegister(11583),
        Net_1.Net.UnRegister(9029),
        Net_1.Net.UnRegister(21114),
        Net_1.Net.UnRegister(7810),
        Net_1.Net.UnRegister(19150),
        Net_1.Net.UnRegister(14829),
        Net_1.Net.UnRegister(2776),
        Net_1.Net.UnRegister(27325),
        Net_1.Net.UnRegister(28227),
        Net_1.Net.UnRegister(14565),
        Net_1.Net.UnRegister(11305),
        Net_1.Net.UnRegister(1276),
        Net_1.Net.UnRegister(3198),
        Net_1.Net.UnRegister(24297),
        Net_1.Net.UnRegister(15443),
        Net_1.Net.UnRegister(16069),
        Net_1.Net.UnRegister(6951),
        Net_1.Net.UnRegister(8101),
        Net_1.Net.UnRegister(3492),
        Net_1.Net.UnRegister(17082),
        Net_1.Net.UnRegister(29095),
        Net_1.Net.UnRegister(22153),
        Net_1.Net.UnRegister(6999),
        Net_1.Net.UnRegister(20353),
        Net_1.Net.UnRegister(23399),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.EntityOnLandedPush,
          CreatureController.EntityOnLandedPush,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.TeleportComplete,
          CreatureController.r0r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CreateEntityFail,
          CreatureController.OnCreateEntityFail,
        ),
        !0)
    );
  }
  static CreateEntityFromPending(e) {
    for (const r of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      r?.Valid && this.LoadEntityAsync(r);
  }
  static n0r(r) {
    var e = MathUtils_1.MathUtils.LongToNumber(r.rkn),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (t?.Valid)
      if (t.IsInit) {
        var o = t.Entity.GetComponent(157);
        if (o)
          for (const a of r.xys)
            o.AddBuffWithServerId(
              MathUtils_1.MathUtils.LongToBigInt(a.JFn),
              a.r3n,
              a.QVn,
              a.$Vn,
              "服务端通知添加系统buff, serverId=" + a.$Vn,
            );
        else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              20,
              "[CreatureController.AddSysBuffNotify] 添加Buff失败, Entity没有BuffComponent。",
              ["CreatureDataId", r.rkn],
              [
                "buff列表",
                r.xys?.map((e) => MathUtils_1.MathUtils.LongToBigInt(e.JFn)),
              ],
            );
      } else {
        t = t.Entity.GetComponent(0);
        WaitEntityTask_1.WaitEntityTask.Create(t.GetCreatureDataId(), (e) => {
          e ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("World", 20, "WaitEntityTask 失败", [
                "CreatureDataId",
                r.rkn,
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
            r.xys.map((e) => MathUtils_1.MathUtils.LongToBigInt(e.JFn)).join(),
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
    t = Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce,
  ) {
    var o = ModelManager_1.ModelManager.CreatureModel.RemoveDensityItem(e);
    if (o) {
      if (!o.EntityHandle)
        return (
          o.DensityLevel <= this.wVs &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              6,
              "[实体生命周期:删除实体] DensityLevel和创建情况不匹配",
              ["CurrentLevel", this.wVs],
              ["SelfLevel", o.DensityLevel],
              ["CreatureDataId", o.CreatureDataId],
            ),
          !0
        );
      o.DensityLevel > this.wVs &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          6,
          "[实体生命周期:删除实体] DensityLevel和创建情况不匹配2",
          ["CurrentLevel", this.wVs],
          ["SelfLevel", o.DensityLevel],
          ["CreatureDataId", o.CreatureDataId],
        );
    }
    return this.a0r(e, r, t);
  }
  static a0r(e, r, t) {
    var o,
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    return a
      ? ((o = a.Entity.GetComponent(1)),
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
        a.Entity.GetComponent(0),
        PreloadDefine_1.PreloadSetting.UseNewPreload
          ? PreloadControllerNew_1.PreloadControllerNew.RemoveEntity(e)
          : PreloadController_1.PreloadController.RemovePreloadEntity(e),
        this.bVs(a, e, t, r))
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
  static bVs(e, r, t, o) {
    var a = ModelManager_1.ModelManager.CreatureModel;
    if (!e.Valid)
      return a.RemoveEntity(r, "RemoveEntityInternal handle.Valid=false");
    var l = e.Entity.GetComponent(0),
      n = (l.SetRemoveState(!0), e.Entity.GetComponent(1)?.Owner);
    if ((CreatureController.NotifyRemoveEntity(t, e, n), !e.IsInit))
      return (
        CreatureController.DestroyEntity(
          e,
          t !== Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeResetByModeChange,
        ),
        a.RemoveEntity(r, "RemoveEntityInternal handle.IsInit=false")
      );
    if (
      l.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Custom &&
      !n?.IsValid()
    )
      return (
        CreatureController.DestroyEntity(
          e,
          t !== Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeResetByModeChange,
        ),
        a.RemoveEntity(r, "RemoveEntityInternal actor?.IsValid()=false")
      );
    let i = t === Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce;
    if (
      (i =
        i ||
        (t === Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeNormal &&
          l.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
          l.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_SceneItem &&
          l.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Animal &&
          (i = !0),
        e.Entity.Active)
          ? i
          : !0)
    )
      return (
        CreatureController.DestroyEntity(e),
        a.RemoveEntity(r, "RemoveEntityInternal forceRemove=true")
      );
    if (t === Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeResetByModeChange)
      return (
        CreatureController.DestroyEntity(e, !1),
        a.RemoveEntity(r, "RemoveEntityInternal RemoveTypeResetByModeChange")
      );
    if (
      (Log_1.Log.CheckInfo() &&
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
      l.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Npc)
    ) {
      if (!e.Entity.GetComponent(2).PendingToDestroy())
        return (
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DelayRemoveEntityFinished,
            e.Entity,
          ),
          !0
        );
      TimerSystem_1.TimerSystem.Delay(() => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.DelayRemoveEntityFinished,
          e.Entity,
        );
      }, ENTITY_REMOVE_DELAY);
    }
    if (l.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Animal) {
      n = e.Entity.GetComponent(154);
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
    return (
      t === Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeDrop
        ? (a = e.Entity.GetComponent(133)) && a.DestroyWithEffect()
        : l.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem &&
          e.Entity.GetComponent(117).HandleDestroyState(),
      !0
    );
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
            ? (((_ = Protocol_1.Aki.Protocol.wls.create()).N7n = this.l0r(
                e,
                r,
                t,
                a,
                i,
              )),
              (_.k7n = MathUtils_1.MathUtils.NumberToLong(n)),
              (_.o8n = l),
              CreatureController.Summon2RequestInternal(_, i, o))
            : (((l = Protocol_1.Aki.Protocol.Pls.create()).N7n = this.l0r(
                e,
                r,
                t,
                a,
                i,
              )),
              (l.k7n = MathUtils_1.MathUtils.NumberToLong(n)),
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
  static l0r(e, r, t, o, a) {
    var l = Protocol_1.Aki.Protocol._Os.create(),
      e =
        ((l.vkn = e),
        (l.d4n = r),
        (l.M3n = t.GetLocation()),
        Protocol_1.Aki.Protocol.iws.create()),
      r = t.Rotator();
    return (
      (e.Pitch = r.Pitch),
      (e.Roll = r.Roll),
      (e.Yaw = r.Yaw),
      (l.S3n = e),
      (l.F7n = o),
      (l.V7n = MathUtils_1.MathUtils.NumberToLong(a)),
      l
    );
  }
  static async SummonRequestInternal(e, r) {
    e = await Net_1.Net.CallAsync(26232, e);
    return (
      e.lkn === Protocol_1.Aki.Protocol.lkn.Sys ||
      (ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(r),
      CreatureController.RemoveEntity(r, "SummonRequestInternal"),
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.lkn,
        17406,
      ),
      !1)
    );
  }
  static async Summon2RequestInternal(e, r, t) {
    e = await Net_1.Net.CallAsync(23539, e);
    return e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
      ? (ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(r),
        CreatureController.RemoveEntity(r, "Summon2RequestInternal"),
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          12118,
        ),
        !1)
      : (EntitySystem_1.EntitySystem.Get(t)
          .GetComponent(0)
          .SetSummonsVersion(e.o8n),
        !0);
  }
  static async RemoveSummonEntityRequest(e, r, t) {
    var o = Protocol_1.Aki.Protocol.nls.create(),
      t =
        ((o.H7n = [
          ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(t),
        ]),
        (o.j7n = Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce),
        (o.vkn = e),
        (o._7n =
          ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(r)),
        await Net_1.Net.CallAsync(17190, o));
    return (
      t.X5n === Protocol_1.Aki.Protocol.lkn.Sys ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        t.X5n,
        1119,
      ),
      !1)
    );
  }
  static async RemoveSummonEntityByServerIdRequest(e, r, t) {
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)
        ?.Entity?.GetComponent(0)
        .GetEntityType(),
      a = Protocol_1.Aki.Protocol.nls.create(),
      t =
        ((a.H7n = [MathUtils_1.MathUtils.NumberToLong(t)]),
        (a.j7n =
          o && o === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem
            ? Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeNormal
            : Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce),
        (a.vkn = e),
        (a._7n =
          ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(r)),
        await Net_1.Net.CallAsync(17190, a));
    return (
      t.X5n === Protocol_1.Aki.Protocol.lkn.Sys ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        t.X5n,
        1119,
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
        ? (((o = Protocol_1.Aki.Protocol.als.create()).Ekn =
            MathUtils_1.MathUtils.NumberToLong(t)),
          (o.aFn = r),
          !(
            !(r = await Net_1.Net.CallAsync(25741, o)) ||
            (r.Sys
              ? (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))
                ? (o.Entity.GetComponent(0).SetPlayerId(r.aFn),
                  o.IsInit &&
                    ((r =
                      ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
                      r.aFn),
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
  static _0r(e) {
    var r = Protocol_1.Aki.Protocol.lls.create();
    (r.Ekn = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(1608, r, () => {});
  }
  static async SceneLoadingFinishRequest(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("World", 5, "世界加载完成", ["SceneId", e]);
    var r = new Protocol_1.Aki.Protocol.Y1s(),
      e = ((r.W7n = e), await Net_1.Net.CallAsync(1718, r));
    e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.lkn,
        19553,
      ),
      (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1));
  }
  static AnimalDieRequest(e, r) {
    var t = Protocol_1.Aki.Protocol.vYn.create();
    (t.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
      (t.M3n = Protocol_1.Aki.Protocol.VBs.create()),
      (t.M3n.X = r.X),
      (t.M3n.Y = r.Y),
      (t.M3n.Z = r.Z),
      Net_1.Net.Call(3579, t, (e) => {
        e &&
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Proto_ErrAnimalEntityNotExist &&
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            17948,
          );
      });
  }
  static AnimalDropItemRequest(e) {
    var r = Protocol_1.Aki.Protocol.yYn.create();
    (r.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(11033, r, (e) => {
        e &&
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Proto_ErrAnimalEntityNotExist &&
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            28456,
          );
      });
  }
  static AnimalDestroyRequest(e) {
    var r = Protocol_1.Aki.Protocol.SYn.create();
    (r.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(10012, r, (e) => {
        e &&
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Proto_ErrAnimalEntityNotExist &&
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            7352,
          );
      });
  }
  static LandingDamageRequest(e, r, t) {
    var o = Protocol_1.Aki.Protocol.Ezn.create();
    (o.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
      (o.K7n = r),
      (o.Q7n = t),
      Net_1.Net.Call(25622, o, (e) => {
        e &&
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            15532,
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
      t = Protocol_1.Aki.Protocol.Rls.create();
    return (
      (t.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
      (t.l7n = r),
      await Net_1.Net.CallAsync(6504, t),
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
  static async u0r(t) {
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
        (Net_1.Net.IsConsumeNotifyPaused = !0),
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
        (Net_1.Net.IsConsumeNotifyPaused = !1),
        (a.LoadingPhase = 2);
      var l = t.fys,
        e = (a.JoinSceneInfo = l).Rkn;
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
          l.w6n,
        ))
      )
        if (
          (CreatureController.ResumeId(
            MathUtils_1.MathUtils.LongToBigInt(t.vys),
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
            o.SetWorldOwner(l.qps),
            o.SetSceneId(l.W7n);
          (t = l.tys),
            (t =
              (CreatureController.c0r(t.Hys),
              ModelManager_1.ModelManager.BlackboardModel.SetWorldBlackboardByProtocol(
                l.Yps,
              ),
              ModelManager_1.ModelManager.CombatMessageModel.SetLastMessageId(
                MathUtils_1.MathUtils.LongToBigInt(l._ys),
              ),
              (Global_1.Global.BaseCharacter = void 0),
              l.ZEs));
          FormationDataController_1.FormationDataController.RefreshPlayerEntities(
            t,
          );
          let e = void 0,
            r = void 0;
          if (t)
            for (const u of t) {
              var n = u.aFn,
                i = new ScenePlayerData_1.ScenePlayerData(n),
                _ = (i.SetTimerStart(), []),
                C = u.afs,
                s = u.Y4n;
              for (const g of u.HEs) {
                var d = new SceneTeamData_1.SceneTeamRole();
                (d.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(g.rkn)),
                  (d.RoleId = g.l3n),
                  _.push(d),
                  d.RoleId === s && i.ControlRole(d.CreatureDataId);
              }
              o.AddScenePlayerData(u.aFn, i),
                u.aFn === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
                  (CharacterBuffController_1.default.SetHandlePrefix(
                    u.VEs,
                    u.$Es,
                  ),
                  (e = u.$kn),
                  (r = u.D3n)),
                ModelManager_1.ModelManager.SceneTeamModel.UpdateGroup({
                  PlayerId: n,
                  GroupType: C,
                  GroupRoleList: _,
                  CurrentRoleId: s,
                }),
                ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(n, C);
            }
          ModelManager_1.ModelManager.OnlineModel.ResetContinuingChallengeConfirmState(),
            a.SetBornInfo(e, r),
            TimeOfDayController_1.TimeOfDayController.SyncSceneTime(
              l.rys.fVn,
              l.rys.pVn,
              l.rys.Cys,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.InitArea,
              l.sys,
            ),
            o.SetRestoreEntityId(l.ays),
            ControllerHolder_1.ControllerHolder.GameAudioController.UpdateAudioState(
              l.hfs,
            ),
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
                      Protocol_1.Aki.Protocol.jBs.Proto_Normal,
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
  static c0r(e) {
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
      a = MathUtils_1.MathUtils.LongToNumber(e.Ekn),
      l = e.cVn;
    if (
      l === Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
      ModelManager_1.ModelManager.CreatureModel.GetOrAddDensityItem(a, e)
        .DensityLevel > this.wVs
    )
      return (
        (t = e.mVn),
        (o = e.R5n),
        void (
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
    return this.qVs(a, e, r);
  }
  static qVs(r, t, o) {
    var a = ModelManager_1.ModelManager.CreatureModel,
      l = t.mVn,
      n = t.R5n,
      i = t.ivs,
      _ = t.cVn,
      C = t.d4n;
    if (
      (Log_1.Log.CheckInfo() &&
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
      a.ExistEntity(r))
    )
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
        case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
        case Protocol_1.Aki.Protocol.HBs.Proto_Animal:
        case Protocol_1.Aki.Protocol.HBs.Proto_Npc:
        case Protocol_1.Aki.Protocol.HBs.Proto_SceneItem:
        case Protocol_1.Aki.Protocol.HBs.Proto_Custom:
        case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
        case Protocol_1.Aki.Protocol.HBs.Proto_Player:
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
  static DestroyEntity(e, r = !0) {
    var t, o;
    e?.Valid &&
      ((o = (t = e.Entity).GetComponent(0)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "[实体生命周期:删除实体] DestroyEntity开始",
          ["CreatureDataId", o.GetCreatureDataId()],
          ["EntityId", e.Id],
          ["PendingRemove", r],
        ),
      (t = t.GetComponent(1)?.Owner)?.IsValid() &&
        Global_1.Global.BaseCharacter === t &&
        Global_1.Global.CharacterController &&
        (Global_1.Global.CharacterController.UnPossess(),
        (Global_1.Global.BaseCharacter = void 0)),
      t?.IsValid() &&
        (t instanceof TsBaseCharacter_1.default && t.CharacterActorComponent
          ? (t.CharacterActorComponent.DisableCollision(
              "[CreatureController.DestroyEntity]",
            ),
            t.CharacterActorComponent.DisableTick(
              "[CreatureController.DestroyEntity]",
            ),
            t.CharacterActorComponent.DisableActor(
              "[CreatureController.DestroyEntity]",
            ))
          : (t.SetActorEnableCollision(!1),
            t.SetActorTickEnabled(!1),
            t.SetActorHiddenInGame(!0))),
      r
        ? ModelManager_1.ModelManager.CreatureModel.AddPendingRemoveEntity(
            o.GetCreatureDataId(),
            e,
          )
        : ((r = o.GetCreatureDataId()),
          Global_1.Global.WorldEntityHelper
            ? ((o = Global_1.Global.WorldEntityHelper.Destroy(e))
                ? ModelManager_1.ModelManager.WorldModel.AddDestroyActor(
                    r,
                    e.Id,
                    t,
                  )
                : ControllerHolder_1.ControllerHolder.WorldController.DestroyEntityActor(
                    r,
                    e.Id,
                    t,
                    !1,
                  ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Entity",
                  3,
                  "[实体生命周期:删除实体] DestroyEntity结束",
                  ["CreatureDataId", r],
                  ["EntityId", e.Id],
                  ["EntitySystem.DestroyEntity结果", o],
                ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "[实体生命周期:删除实体] WorldEntityHelper不存在，删除实体失败。",
                ["CreatureDataId", r],
                ["EntityId", e.Id],
              )));
  }
  static LoadEntityAsync(t, o) {
    if (t?.Valid) {
      const a = t.Entity.GetComponent(0);
      if (a.GetRemoveState()) o?.(3);
      else if (t.IsInit) o?.(2);
      else {
        let r = void 0;
        ModelManager_1.ModelManager.PreloadModel.UseEntityProfilerInternal &&
          (r = new LogProfiler_1.LogProfiler(
            "预加载实体Profiler:" + a.GetCreatureDataId(),
          )).Start();
        const l = (e) => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Preload",
              3,
              "预加载实体:结束",
              ["CreatureDataId", a.GetCreatureDataId()],
              ["PbDataId", a.GetPbDataId()],
              ["是否成功", 2 === e],
              ["预加载结果", e],
            ),
            ModelManager_1.ModelManager.PreloadModel
              .UseEntityProfilerInternal &&
              (r.Stop(), Log_1.Log.CheckInfo()) &&
              Log_1.Log.Info("Preload", 3, r.ToString()),
            !t?.Valid || a.GetRemoveState()
              ? o?.(3)
              : this.d0r(t, o) && this.C0r(t, o);
        };
        if (PreloadDefine_1.PreloadSetting.UseNewPreload) {
          if (a.GetPreloadFinished()) return void l(2);
          if (a.GetLoading())
            return void ModelManager_1.ModelManager.PreloadModelNew.GetEntityAssetElement(
              a.GetCreatureDataId(),
            )?.AddCallback(l);
        } else if (a.GetLoading()) return;
        a.SetLoading(!0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Preload",
              3,
              "预加载实体:开始",
              ["CreatureDataId", a.GetCreatureDataId()],
              ["PbDataId", a.GetPbDataId()],
              ["Reason", "CreatureController.LoadEntityAsync"],
            ),
          PreloadDefine_1.PreloadSetting.UseNewPreload
            ? PreloadControllerNew_1.PreloadControllerNew.PreloadEntity(t, r, l)
            : PreloadController_1.PreloadController.PreloadEntity(t, r, (e) => {
                e = e ? 2 : 1;
                l(e);
              });
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          3,
          "[实体生命周期:创建实体] entity.Valid=false，创建实体失败。",
        ),
        o?.(1);
  }
  static d0r(a, l) {
    const n = a.Entity.GetComponent(0).GetDependenceEntities();
    return (
      !n?.length ||
      (WaitEntityPreloadTask_1.WaitEntityPreloadTask.Create(a, (e) => {
        if (!(4 & e) && a?.Valid) {
          e = a.Entity.GetComponent(0);
          if (!e.GetRemoveState()) {
            var r,
              t,
              o = a.Priority + 1;
            for ([r, t] of n) {
              let e = void 0;
              0 === t
                ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r))
                : 1 === t
                  ? (e =
                      ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                        r,
                      ))
                  : 2 === t &&
                    (e =
                      ModelManager_1.ModelManager.CreatureModel.GetEntityById(
                        r,
                      )),
                e?.Valid &&
                  e.Priority < o &&
                  ((e.Priority = o),
                  2 & e.Entity.Flag ||
                    CharacterController_1.CharacterController.SortItem(e));
            }
            this.C0r(a, l);
          }
        }
      }),
      !1)
    );
  }
  static C0r(r, t) {
    if (r?.Valid) {
      const o = r.Entity.GetComponent(0);
      o.GetRemoveState()
        ? t?.(3)
        : CharacterController_1.CharacterController.AddEntityToAwakeQueue(
            r,
            (e) => {
              e
                ? o.GetRemoveState()
                  ? t?.(3)
                  : CreatureController.g0r(r, (e) => {
                      e
                        ? o.GetRemoveState()
                          ? t?.(3)
                          : (CharacterController_1.CharacterController.ActivateEntity(
                              r,
                            ),
                            CreatureController.f0r(r) ? t?.(2) : t?.(1))
                        : t?.(1);
                    })
                : t?.(1);
            },
          );
    } else t?.(3);
  }
  static g0r(n, i) {
    if (GlobalData_1.GlobalData.Networking()) {
      const _ = n.Entity.GetComponent(0);
      switch (_.GetEntityType()) {
        case Protocol_1.Aki.Protocol.HBs.Proto_Custom:
        case Protocol_1.Aki.Protocol.HBs.Proto_SceneItem:
        case Protocol_1.Aki.Protocol.HBs.Proto_Animal:
          return void (i && i(!0));
      }
      var e = Protocol_1.Aki.Protocol.CYn.create();
      const C = _.GetCreatureDataId();
      (e.rkn = MathUtils_1.MathUtils.NumberToLong(C)),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[实体生命周期:创建实体] 请求Activate实体",
            ["CreatureDataId", C],
            ["PbDataId", _.GetPbDataId()],
            ["EntityId", n.Id],
          ),
        Net_1.Net.Call(29051, e, (e) => {
          let r = !1;
          if (e)
            if (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
              (r = !0),
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.lkn,
                  25559,
                  void 0,
                  !1,
                  !0,
                );
            else {
              CreatureController.SetEntityEnable(
                n.Entity,
                e.d4n,
                "EntityActiveResponse",
              );
              var t = WorldGlobal_1.WorldGlobal.ToUeVector(e.M3n),
                o = WorldGlobal_1.WorldGlobal.ToUeRotator(e.S3n);
              n.Entity.GetComponent(1).SetActorLocationAndRotation(t, o);
              for (const l of e.Dvs) {
                var a = l.Mqs;
                _.ComponentDataMap.set(a, l);
              }
            }
          else r = !0;
          ModelManager_1.ModelManager.CreatureModel.GetEntityId(C) !== n.Id
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Entity",
                3,
                "[实体生命周期:创建实体] 激活实体时，实体已经销毁",
                ["CreatureDataId", C],
                ["EntityConfigType", _.GetEntityConfigType()],
                ["PbDataId", _.GetPbDataId()],
              )
            : (r &&
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "[实体生命周期:创建实体] 激活实体消息异常，创建实体失败。",
                  ["CreatureDataId", C],
                  ["EntityConfigType", _.GetEntityConfigType()],
                  ["PbDataId", _.GetPbDataId()],
                ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Entity",
                  3,
                  "[实体生命周期:创建实体] 服务器返回Activate实体成功",
                  ["CreatureDataId", C],
                  ["PbDataId", _.GetPbDataId()],
                  ["EntityId", n.Id],
                ),
              i && i(!0));
        });
    } else i && i(!0);
  }
  static f0r(e) {
    var r = e.Entity.GetComponent(0),
      t = (r.SetLoading(!1), e.Entity.GetComponent(1)?.Owner);
    return r.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Custom || t
      ? (Log_1.Log.CheckInfo() &&
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
          Protocol_1.Aki.Protocol.jBs.Proto_Normal,
          e,
          t,
        ) &&
          (CreatureController.NotifySpawnBoss(e), r.IsRole()) &&
          ModelManager_1.ModelManager.WorldModel.AddIgnore(t),
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
          ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel &&
          a.IsRole() &&
          o.Entity.GetComponent(3)?.Actor === Global_1.Global.BaseCharacter
            ? SeamlessTravelController_1.SeamlessTravelController.SetSeamlessTravelPlayerEntity(
                o,
              )
            : CreatureController.RemoveEntity(
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
        (t = o.Entity.GetComponent(92)) &&
        t.ChangeLockTag(r);
  }
  static ChangeLockTagByTeleportPbDataId(e, r) {
    var t;
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      o.IsInit &&
        o.Entity.GetComponent(0).GetPbDataId() === e &&
        (t = o.Entity.GetComponent(92)) &&
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
        a || r !== Protocol_1.Aki.Protocol.USs.r3n
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
        a || r !== Protocol_1.Aki.Protocol.USs.r3n
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
        return Protocol_1.Aki.Protocol.HBs.Proto_SceneItem;
      case "Npc":
        return Protocol_1.Aki.Protocol.HBs.Proto_Npc;
      case "Monster":
        return Protocol_1.Aki.Protocol.HBs.Proto_Monster;
      case "Vision":
        return Protocol_1.Aki.Protocol.HBs.Proto_Vision;
      default:
        return Protocol_1.Aki.Protocol.HBs.Proto_Custom;
    }
  }
  static async SwitchBigWorldRequest(e, r) {
    var t = Protocol_1.Aki.Protocol.V1s.create(),
      e = ((t.vFn = e), (t.Pkn = r), await Net_1.Net.CallAsync(7170, t));
    return !!e;
  }
  static MonsterBoomRequest(e, r) {
    CombatMessage_1.CombatNet.Call(
      29345,
      e,
      Protocol_1.Aki.Protocol.SNn.create({ $7n: r }),
    );
  }
  static ParseTravelConfig(e, r, t) {
    var o = new SeamlessTravelDefine_1.SeamlessTravelContext();
    switch (e) {
      case Protocol_1.Aki.Protocol.wkn.Proto_PlayEffect:
        (o.EffectPath = r),
          SeamlessTravelController_1.SeamlessTravelController.EnableSeamlessTravel(
            Global_1.Global.BaseCharacter,
            Global_1.Global.CharacterController,
            o,
          );
        break;
      case Protocol_1.Aki.Protocol.wkn.Proto_PlayMp4:
        ControllerHolder_1.ControllerHolder.GameModeController.SetTravelMp4(
          !0,
          r,
        );
        break;
      case Protocol_1.Aki.Protocol.wkn.Proto_CenterText:
        (ModelManager_1.ModelManager.GameModeModel.ShowCenterTextFlow = t),
          (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = !0);
    }
  }
  static SetEntityEnable(e, r, t, o = !1) {
    var a;
    e?.Valid &&
      !r !=
        !!(a =
          ModelManager_1.ModelManager.CreatureModel.EntityDisableHandleMap.get(
            e.Id,
          )) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
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
          r
            ? (e.Enable(a, "CreatureController.SetEntityEnable"),
              ModelManager_1.ModelManager.CreatureModel.EntityDisableHandleMap.delete(
                e.Id,
              ))
            : ((a = e.Disable(t)),
              ModelManager_1.ModelManager.CreatureModel.EntityDisableHandleMap.set(
                e.Id,
                a,
              )),
          ModelManager_1.ModelManager.CreatureModel.DisableLock.delete(e.Id),
          o && CreatureController.p0r(e, r)));
  }
  static SetActorVisible(e, r, t, o, a, l = !1) {
    var n, i;
    e?.Valid &&
      ((n = e.GetComponent(1)),
      (i = e.GetComponent(89)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
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
      CreatureController.v0r(e, r);
  }
  static SetActorMovable(e, r, t) {
    var o,
      a = e.GetComponent(98),
      l = e.GetComponent(99);
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
  static p0r(e, r) {
    var t = e.GetComponent(0),
      o = Protocol_1.Aki.Protocol.tNn.create();
    (o.Ekn = MathUtils_1.MathUtils.NumberToLong(t.GetCreatureDataId())),
      (o.d4n = r),
      CombatMessage_1.CombatNet.Call(18320, e, o, () => {});
  }
  static v0r(e, r) {
    var t, o;
    ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      ((t = e.GetComponent(0)),
      ((o = Protocol_1.Aki.Protocol.NNn.create()).Ekn =
        MathUtils_1.MathUtils.NumberToLong(t.GetCreatureDataId())),
      (o.C4n = r),
      CombatMessage_1.CombatNet.Call(12326, e, o, () => {}));
  }
  static RefreshDensityLevel() {
    var e =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo()
        .NpcDensity;
    if (this.wVs !== e) {
      for (
        var r, t, o, a = ModelManager_1.ModelManager.CreatureModel;
        this.wVs < e;

      ) {
        ++this.wVs;
        for ([r, t] of a.GetDensityLevelGroup(this.wVs)) {
          var l = this.qVs(r, t.EntityData, "Density");
          l &&
            (ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(
              l,
            ),
            AoiController_1.AoiController.AddMonsterSizeTag(l));
        }
      }
      for (; this.wVs > e; ) {
        for ([o] of a.GetDensityLevelGroup(this.wVs))
          this.a0r(
            o,
            "DensityLevelChanged",
            Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce,
          );
        --this.wVs;
      }
    }
  }
}
((exports.CreatureController = CreatureController).xe = idDefaultValue),
  (CreatureController.s0r = void 0),
  (CreatureController.h0r = void 0),
  (CreatureController.wVs = 2),
  (CreatureController.M0r = []),
  (CreatureController.Vgr = (e) => {
    ModelManager_1.ModelManager.GameModeModel.IsTeleport
      ? CreatureController.M0r.push(e)
      : CreatureController.n0r(e);
  }),
  (CreatureController.r0r = () => {
    for (const e of CreatureController.M0r) CreatureController.n0r(e);
    CreatureController.M0r = [];
  }),
  (CreatureController.Hgr = (e) => {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(e.rkn),
    );
    if (r?.Valid) {
      var t = r.Entity.GetComponent(157);
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            20,
            "[CreatureController.UpdateSysBuffNotify] 更新Buff失败, Entity没有AbilityComponent。",
            ["CreatureDataId", e.rkn],
          ));
      for (const l of e.xys) {
        var o = MathUtils_1.MathUtils.LongToBigInt(l.JFn),
          a = l.$Vn;
        t?.RemoveBuffByServerIdLocal(a, "刷新系统buff, serverId=" + a),
          t?.AddBuffWithServerId(
            o,
            l.r3n,
            l.QVn,
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
          ["CreatureDataId", e.rkn],
        );
  }),
  (CreatureController.jgr = (e) => {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(e.rkn),
    );
    if (r?.Valid) {
      var t = r.Entity.GetComponent(157);
      if (
        (t ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              20,
              "[CreatureController.RemoveSysBuffNotify] 移除Buff失败, Entity没有AbilityComponent。",
              ["CreatureDataId", e.rkn],
            )),
        r.IsInit)
      )
        for (const o of e.j4n)
          t?.RemoveBuffByServerIdLocal(o, "服务端移除系统buff, serverId=" + o);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          20,
          "[CreatureController.RemoveSysBuffNotify] 移除Buff失败, Entity无效或不存在。",
          ["CreatureDataId", e.rkn],
        );
  }),
  (CreatureController.Wgr = (e) => {
    BattleLogicController_1.BattleLogicController.ExecuteEntityLivingStatusNotify(
      e,
    );
  }),
  (CreatureController.Qgr = (e) => {
    for (const o of e.Eys) {
      var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        MathUtils_1.MathUtils.LongToNumber(o.Ekn),
      );
      if (!r?.Valid)
        return void (
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "World",
            20,
            "[CreatureController.MonsterAttributeArrayNotify] 更新Monster属性失败, Entity无效或不存在。",
            ["CreatureDataId", o.Ekn],
          )
        );
      var t = r.Entity.GetComponent(156);
      if (t)
        for (const a of Object.keys(o.dfs)) t.SetBaseValue(Number(a), o.dfs[a]);
    }
  }),
  (CreatureController.bgr = (e) => {
    var r = MathUtils_1.MathUtils.LongToNumber(e.rkn),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r),
      t = MathUtils_1.MathUtils.LongToNumber(e.CFn);
    r.Entity.GetComponent(34)?.SetVisionSkillInformationList(e.Wps, t),
      (r.Entity.GetComponent(0).VisionSkillServerEntityId = t),
      EventSystem_1.EventSystem.EmitWithTarget(
        r,
        EventDefine_1.EEventName.EntityVisionSkillChanged,
      );
  }),
  (CreatureController.qgr = (e) => {
    var r,
      t = MathUtils_1.MathUtils.LongToNumber(e.Ekn),
      o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    o
      ? ((r = o.Entity.GetComponent(0)),
        e.aFn && r.SetPlayerId(e.aFn),
        e.aFn === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
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
    CreatureController._0r(e);
  }),
  (CreatureController.EntityOnLandedNotify = (e) => {
    var r,
      e = MathUtils_1.MathUtils.LongToNumber(e.Ekn);
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
  (CreatureController.Bgr = (e) => {
    var r, t, o;
    ModelManager_1.ModelManager.GameModeModel.HasGameModeData
      ? ((ModelManager_1.ModelManager.GameModeModel.HasGameModeData = !1),
        (ModelManager_1.ModelManager.GameModeModel.JoinSceneInfo = void 0),
        (r = e.aFn),
        (t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
        (o = e.Bkn),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            17,
            "[CreatureController.LeaveSceneNotify] LeaveSceneNotify",
            ["leavePlayerId", r],
            ["myPlayerId]", t],
            ["option", o],
          ),
        r === t
          ? ModelManager_1.ModelManager.CreatureModel.GetIsLoadingScene()
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
              o &&
                CreatureController.ParseTravelConfig(
                  e.Bkn.wkn,
                  e.Bkn.Nkn,
                  e.Bkn.Okn,
                ),
              ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
                ? SeamlessTravelController_1.SeamlessTravelController.PreLeaveLevel()
                : ModelManager_1.ModelManager.GameModeModel.UseShowCenterText ||
                  BlackScreenController_1.BlackScreenController.AddBlackScreen(
                    "None",
                    "LeaveScene",
                  ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.DoLeaveLevel,
              ),
              ModelManager_1.ModelManager.SeamlessTravelModel
                .IsSeamlessTravel &&
                SeamlessTravelController_1.SeamlessTravelController.PostLeaveLevel())
          : (ModelManager_1.ModelManager.CreatureModel.RemoveScenePlayerData(r),
            CreatureController.NotifyScenePlayerChanged(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ScenePlayerLeaveScene,
              e.aFn,
            )))
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
  }),
  (CreatureController.e0r = (e) => {
    var r;
    e.gys &&
      (e = e.aFn) !==
        (r = ModelManager_1.ModelManager.CreatureModel).GetPlayerId() &&
      r.GetScenePlayerData(e)?.SetRemoteSceneLoading(!0);
  }),
  (CreatureController.t0r = (e) => {
    const r = e.aFn;
    e = ModelManager_1.ModelManager.CreatureModel;
    if (r !== e.GetPlayerId()) {
      e = e.GetScenePlayerData(r);
      if (e) {
        e.SetRemoteSceneLoading(!1);
        const t = e.ControlCreatureDataId;
        t
          ? WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
              e
                ? ((e =
                    ModelManager_1.ModelManager.CreatureModel.GetEntity(
                      t,
                    ).Entity),
                  CreatureController.SetEntityEnable(
                    e,
                    !0,
                    "模拟端加载完成，显示实体",
                  ))
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
  (CreatureController.i0r = (e) => {
    e = e.H3n;
    HotFixUtils_1.HotFixUtils.EvalScript(e);
  }),
  (CreatureController.SceneLoadingTimeOutNotify = (e) => {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 5, "世界加载超时");
  }),
  (CreatureController.Jgr = (e) => {
    var r = MathUtils_1.MathUtils.LongToNumber(e.rkn),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
    t
      ? ((t = t.Entity.GetComponent(185))?.AddTag(1008164187),
        e.aFn !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
          (t?.AddTag(1961456719), t?.AddTag(1800978500)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Animal",
          30,
          "[CreatureController.AnimalDieNotify] 不存Entity。",
          ["CreatureDataId", r],
        );
  }),
  (CreatureController.Ggr = (e) => {
    var r = MathUtils_1.MathUtils.LongToNumber(e.rkn),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
    t
      ? (t.Entity.GetComponent(0).SetHardnessModeId(e.l7n),
        (t = t.Entity.GetComponent(51)).SetHardnessModeId(e.l7n),
        t.RefreshHardnessModeConfig())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          15,
          "[CreatureController.HardnessModeChangedNotify] entity为空。",
          ["creatureDataId", r],
        );
  }),
  (CreatureController.JoinSceneNotify = (e) => {
    CreatureController.u0r(e);
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
  (CreatureController.Ngr = (e) => {
    let r = void 0,
      t = void 0;
    if (e.fIs && -1 !== e.fIs) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.fIs);
      if (!o)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[CreatureController.SceneSubLevelsChangedNotify] 要传送的TeleportEntityId不存在。",
            ["TeleportEntityId", e.fIs],
          )
        );
      var a = o.Transform.Pos,
        a =
          (a && (r = Vector_1.Vector.Create(a.X ?? 0, a.Y ?? 0, a.Z ?? 0)),
          o.Transform.Rot);
      a && (t = Rotator_1.Rotator.Create(a.Y ?? 0, a.Z ?? 0, a.X ?? 0));
    }
    const l = new Array();
    var n = new Array();
    const i = new Array();
    if (ModelManager_1.ModelManager.GameModeModel.SubLevelMap)
      for (var [_] of ModelManager_1.ModelManager.GameModeModel.SubLevelMap)
        (e.CIs.includes(_) ? n : l).push(_);
    for (const s of e.CIs) n.includes(s) || i.push(s);
    const C = ModelManager_1.ModelManager.AutoRunModel;
    C.IsInAfterRunningState() &&
      C.ShouldTpAfterSkip &&
      (o = C.GetOverrideTpInfo() ?? C.GetGuaranteeTpInfo()) &&
      ((r = o.Location), (t = o.Rotator)),
      ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
        l,
        i,
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
                ["unloads", l],
                ["newLoads", i],
              )),
            C.IsInAfterRunningState() && C.StopAutoRunAndClearInfo();
        },
      );
  }),
  (CreatureController.Ogr = (e) => {
    CreatureController.LoadOrUnloadSubLevel(e.vIs);
  }),
  (CreatureController.kgr = (e) => {
    let r = void 0,
      t = void 0;
    if (e.rkn && -1 !== e.rkn) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.rkn);
      if (!o)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            30,
            "[CreatureController.SceneChangeDataLayerNotify] 要传送的EntityId不存在。",
            ["TeleportEntityId", e.rkn],
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
    for (const C of e.MIs) {
      var i = DataLayerById_1.configDataLayerById.GetConfig(C);
      l.push(i.DataLayer);
    }
    for (const s of e.pIs) {
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
  (CreatureController.Fgr = (e) => {
    var e = e.pys,
      r = e.aFn,
      t = new ScenePlayerData_1.ScenePlayerData(r),
      o = (t.SetTimerStart(), t.SetRemoteSceneLoading(!0), e.Y4n);
    for (const a of e.HEs)
      a.l3n === o && t.ControlRole(MathUtils_1.MathUtils.LongToNumber(a.rkn));
    ModelManager_1.ModelManager.CreatureModel.AddScenePlayerData(r, t),
      CreatureController.NotifyScenePlayerChanged(),
      ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(
        r,
        2,
      );
  }),
  (CreatureController.Kgr = (e) => {
    e = MathUtils_1.MathUtils.LongToNumber(e.Ekn);
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
    for (const r of e.rTs)
      BattleSetting_1.BattleSetting.ReceiveSetModuleNetworkState(r, !0);
    for (const t of e.iTs)
      BattleSetting_1.BattleSetting.ReceiveSetModuleNetworkState(t, !1);
  }),
  (CreatureController.BattleLogNotify = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Battle", 20, "Server Log", ["log", e.oTs]);
  }),
  (CreatureController.Xgr = (e) => {
    ControllerHolder_1.ControllerHolder.GameModeController.Change(e).catch(
      () => {},
    );
  }),
  (CreatureController.eIn = (e) => {
    ModelManager_1.ModelManager.GameModeModel.ChangeSceneModeEndNotifyPromise.SetResult(
      !0,
    );
  }),
  (CreatureController.o0r = (e) => {
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
              Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce,
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[CreatureController.DoDelayRemoveEntityFinished] CreatureDataId无效, 延迟删除失败。",
            ["CreatureDataId", e],
          ));
  }),
  (CreatureController.Ygr = (e) => {
    ModelManager_1.ModelManager.CreatureModel.SetRestoreEntityId(e.ays);
  }),
  (CreatureController.$gr = (e) => {
    var r = e.XMs,
      t = ModelManager_1.ModelManager.CreatureModel;
    for (const l of Object.keys(r)) {
      var o = Number(l),
        a = r[l];
      t.RecordEntitySilenceState(o, a);
    }
  }),
  (CreatureController.zgr = (e) => {
    ModelManager_1.ModelManager.WorldModel.UpdateWorldState(e.SUs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnReceivePlayerVar,
      );
  }),
  (CreatureController.Zgr = (e) => {
    var r = MathUtils_1.MathUtils.LongToNumber(e._7n);
    ModelManager_1.ModelManager.CreatureModel.GetEntity(r).Entity.GetComponent(
      0,
    ).SummonEntityIds = e.Lys.map((e) => MathUtils_1.MathUtils.LongToNumber(e));
  }),
  (CreatureController.OnCreateEntityFail = (e) => {
    ModelManager_1.ModelManager.CreatureModel.RemoveEntity(
      e,
      "OnCreateEntityFail",
    );
  });
//# sourceMappingURL=CreatureController.js.map
