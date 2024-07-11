"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldFunctionLibrary = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  TemplateConfigAll_1 = require("../../../Core/Define/ConfigQuery/TemplateConfigAll"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Net_1 = require("../../../Core/Net/Net"),
  CollisionUtils_1 = require("../../../Core/Utils/CollisionUtils"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
  TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  GlobalData_1 = require("../../GlobalData"),
  GameSplineUtils_1 = require("../../LevelGamePlay/Common/GameSplineUtils"),
  LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralNetworks_1 = require("../../LevelGamePlay/LevelGeneralNetworks"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil"),
  RoleDefine_1 = require("../../Module/RoleUi/RoleDefine"),
  UiCameraAnimationManager_1 = require("../../Module/UiCameraAnimation/UiCameraAnimationManager"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils"),
  BattleSetting_1 = require("../../NewWorld/Setting/BattleSetting"),
  RenderModuleController_1 = require("../../Render/Manager/RenderModuleController"),
  ActorUtils_1 = require("../../Utils/ActorUtils"),
  CombatDebugController_1 = require("../../Utils/CombatDebugController"),
  BlackboardController_1 = require("../Controller/BlackboardController"),
  TsEntityDebugInfoManager_1 = require("../Debug/TsEntityDebugInfoManager"),
  WorldModel_1 = require("../Model/WorldModel"),
  WorldGlobal_1 = require("../WorldGlobal"),
  zero = 0n;
class WorldFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static SetChangeFootStep(t) {
    WorldFunctionLibrary.IsChangeFootStep = t;
  }
  static GetChangeFootStep() {
    return WorldFunctionLibrary.IsChangeFootStep;
  }
  static SetChangeFootStepMaterialId(t) {
    WorldFunctionLibrary.ChangeFootStepMaterialId = t;
  }
  static GetChangeFootStepMaterialId() {
    return WorldFunctionLibrary.ChangeFootStepMaterialId;
  }
  static CheckConfigIdByActor(t, e) {
    t = ActorUtils_1.ActorUtils.GetEntityByActor(t).Entity.GetComponent(0);
    return !!t && t.GetPbDataId() === e;
  }
  static ActorHasSceneItemTag(t, e) {
    return ActorUtils_1.ActorUtils.GetEntityByActor(t)
      .Entity.GetComponent(180)
      .HasTag(e);
  }
  static GetControlVisionEntityId(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (e) {
      e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        e,
        Protocol_1.Aki.Protocol.Summon.L3s
          .Proto_ESummonTypeConcomitantPhantomRole,
      );
      if (e) return e.Id;
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 29, "无法找到拥有者实体", [
          "ownerEntityId",
          t,
        ]);
    return 0;
  }
  static GetVisionEntityId(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (e) {
      e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        e,
        Protocol_1.Aki.Protocol.Summon.L3s.Proto_ESummonTypeConcomitantVision,
      );
      if (e) return e.Id;
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "无法找到幻象拥有者实体", [
          "ownerEntityId",
          t,
        ]);
    return 0;
  }
  static SetVisionEnable(t, e) {
    var r = EntitySystem_1.EntitySystem.Get(t);
    r
      ? PhantomUtil_1.PhantomUtil.SetVisionEnable(r, e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "无法找到幻象拥有者实体", [
          "ownerEntityId",
          t,
        ]);
  }
  static GetCustomEntityId(t, e) {
    return ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
      t,
      e,
    );
  }
  static SetCustomEntityEnable(t, e, r, a, o) {
    var l, n;
    a?.IsValid()
      ? ((a = `[蓝图:${a.GetName()}] ` + o),
        (l = EntitySystem_1.EntitySystem.Get(t))
          ? e > (l = l.GetComponent(0).CustomServerEntityIds).length || 0 === e
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                4,
                "pos不合法！",
                ["pos", e],
                ["serverEntityIds", l],
                ["Reason", a],
              )
            : (n = ModelManager_1.ModelManager.CreatureModel.GetEntity(
                  l[e - 1],
                ))
              ? (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                  n.Entity,
                  r,
                  "WorldFunctionLibrary.SetCustomEntityEnable",
                  !0,
                ),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    4,
                    "设置伴生物状态",
                    ["ownerEntityId", t],
                    ["customServerEntityIds", l],
                    ["customEntity", n.Id],
                    ["enable", r],
                    ["Reason", a],
                  ))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Battle",
                  4,
                  "无法找到伴生物实体",
                  ["ownerEntityId", t],
                  ["pos", e],
                  ["customServerEntityIds", l],
                )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 4, "无法找到幻象拥有者实体", [
              "ownerEntityId",
              t,
            ]))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 3, "callObject为空，请传递callObject", [
          "Reason",
          o,
        ]);
  }
  static GetSummonerEntityId(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    return e?.Valid
      ? ((e = e.GetComponent(0)),
        ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          e.GetSummonerId(),
        ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 29, "幻象实体已销毁！", [
            "visionEntityId",
            t,
          ]),
        0);
  }
  static GetVisionId(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    return e?.Valid
      ? e.GetComponent(0).GetVisionComponent()?.VisionId ?? 0
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 29, "幻象实体已销毁！", [
            "visionEntityId",
            t,
          ]),
        0);
  }
  static GetSummonEntityIds(t) {
    var e,
      r = EntitySystem_1.EntitySystem.Get(t);
    return r
      ? ((r = r.GetComponent(0)),
        (e = UE.NewArray(UE.BuiltinInt)),
        WorldGlobal_1.WorldGlobal.ToUeInt32Array(
          r.SummonEntityIds.map((t) =>
            ModelManager_1.ModelManager.CreatureModel.GetEntityId(t),
          ),
          e,
        ),
        e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 29, "无法找到拥有者实体", [
            "ownerEntityId",
            t,
          ]),
        UE.NewArray(UE.BuiltinInt));
  }
  static SummonRequest(t, e, r, a, o) {
    t = ControllerHolder_1.ControllerHolder.CreatureController.SummonRequest(
      t,
      e,
      r,
      a,
      o,
    );
    return t ? BigInt(t) : 0n;
  }
  static GetServerIdByEntityId(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    return t
      ? ((t = t.GetComponent(0)?.GetCreatureDataId()), BigInt(t ?? 0))
      : 0n;
  }
  static RemoveSummonEntityRequest(t, e, r) {
    ControllerHolder_1.ControllerHolder.CreatureController.RemoveSummonEntityRequest(
      t,
      e,
      r,
    );
  }
  static EntityIsInit(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return !!t && t.IsInit;
  }
  static GetEntityEnable(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return !!t && t.Active;
  }
  static IsNeedPostEffect(t) {
    if (t && t instanceof TsBaseCharacter_1.default) {
      var t = EntitySystem_1.EntitySystem.Get(t.GetEntityIdNoBlueprint()),
        e = t?.GetComponent(0);
      if (e) {
        if (
          e.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player &&
          !t.GetComponent(3).IsAutonomousProxy
        )
          return !1;
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          e.GetSummonerId(),
        )),
          (e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(0));
        if (
          e &&
          e.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player &&
          !t.GetComponent(3).IsAutonomousProxy
        )
          return !1;
      }
    }
    return !0;
  }
  static GetEntityTypeByEntity(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    return (t = t && t.GetComponent(0)) ? t.GetEntityType().valueOf() : -1;
  }
  static GetEntityTypeByActor(t) {
    return t?.IsValid() &&
      UE.KuroStaticLibrary.IsImplementInterface(
        t.GetClass(),
        UE.BPI_CreatureInterface_C.StaticClass(),
      ) &&
      ((t = t),
      (t = EntitySystem_1.EntitySystem.Get(t.GetEntityId()))?.Valid) &&
      (t = t.GetComponent(0))?.Valid
      ? t.GetEntityType().valueOf()
      : -1;
  }
  static GetMonsterType(t) {
    return t?.IsValid() &&
      UE.KuroStaticLibrary.IsImplementInterface(
        t.GetClass(),
        UE.BPI_CreatureInterface_C.StaticClass(),
      ) &&
      ((t = t),
      (t = EntitySystem_1.EntitySystem.Get(t.GetEntityId()))?.Valid) &&
      (t = t.GetComponent(0))?.Valid &&
      (t = t.GetBaseInfo())
      ? t.Category.MonsterMatchType
      : -1;
  }
  static GetConfigIdByActor(t) {
    return t?.IsValid() &&
      UE.KuroStaticLibrary.IsImplementInterface(
        t.GetClass(),
        UE.BPI_CreatureInterface_C.StaticClass(),
      ) &&
      ((t = t),
      (t = EntitySystem_1.EntitySystem.Get(t.GetEntityId()))?.Valid) &&
      (t = t.GetComponent(0))?.Valid
      ? t.GetPbDataId()
      : -1;
  }
  static GetEntityActorByChildActor(t) {
    return ModelManager_1.ModelManager.CreatureModel?.GetEntityActorByChildActor(
      t,
    );
  }
  static GetEntityDestructible(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    return e
      ? void 0 !== e.GetComponent(92)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 40, "无法找到实体", ["entityId", t]),
        !1);
  }
  static AddPrivateTags(t, e) {
    var e = (0, puerts_1.$unref)(e),
      r = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray(e, r),
      ControllerHolder_1.ControllerHolder.CreatureController.AddPublicTags(
        t,
        r,
      );
  }
  static RemovePrivateTags(t, e) {
    var e = (0, puerts_1.$unref)(e),
      r = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray(e, r),
      ControllerHolder_1.ControllerHolder.CreatureController.RemovePublicTags(
        t,
        r,
      );
  }
  static AddPublicTags(t, e) {
    var e = (0, puerts_1.$unref)(e),
      r = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray(e, r),
      ControllerHolder_1.ControllerHolder.CreatureController.AddPublicTags(
        t,
        r,
      );
  }
  static RemovePublicTags(t, e) {
    var e = (0, puerts_1.$unref)(e),
      r = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray(e, r),
      ControllerHolder_1.ControllerHolder.CreatureController.RemovePublicTags(
        t,
        r,
      );
  }
  static GetIntValueByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetIntValueByEntity(t, e);
    return t || 0;
  }
  static GetIntValueByEntityWithCharacter(t, e) {
    return (
      (t &&
        BlackboardController_1.BlackboardController.GetIntValueByEntity(
          t.GetEntityIdNoBlueprint(),
          e,
        )) ||
      0
    );
  }
  static SetIntValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetIntValueByEntity(t, e, r);
  }
  static SetIntValueByEntityWithCharacter(t, e, r) {
    t &&
      BlackboardController_1.BlackboardController.SetIntValueByEntity(
        t.GetEntityIdNoBlueprint(),
        e,
        r,
      );
  }
  static GetIntValuesByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetIntValuesByEntity(t, e);
    return t
      ? ((e = UE.NewArray(UE.BuiltinInt)),
        WorldGlobal_1.WorldGlobal.ToUeInt32Array(t, e),
        e)
      : UE.NewArray(UE.BuiltinInt);
  }
  static SetIntValuesByEntity(t, e, r) {
    var a = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), a),
      BlackboardController_1.BlackboardController.SetIntValuesByEntity(t, e, a);
  }
  static GetLongValueByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetLongValueByEntity(t, e);
    return t || 0n;
  }
  static SetLongValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetLongValueByEntity(t, e, r);
  }
  static GetLongValuesByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetLongValuesByEntity(t, e);
    return t
      ? ((e = UE.NewArray(UE.BuiltinInt64)),
        WorldGlobal_1.WorldGlobal.ToUeInt64Array(t, e),
        e)
      : UE.NewArray(UE.BuiltinInt64);
  }
  static SetLongValuesByEntity(t, e, r) {
    var a = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), a),
      BlackboardController_1.BlackboardController.SetLongValuesByEntity(
        t,
        e,
        a,
      );
  }
  static GetBooleanValueByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetBooleanValueByEntity(
      t,
      e,
    );
    return t || !1;
  }
  static SetBooleanValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
      t,
      e,
      r,
    );
  }
  static GetFloatValueByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetFloatValueByEntity(t, e);
    return t || 0;
  }
  static SetFloatValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetFloatValueByEntity(t, e, r);
  }
  static GetFloatValuesByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetFloatValuesByEntity(
      t,
      e,
    );
    return t
      ? ((e = UE.NewArray(UE.BuiltinFloat)),
        WorldGlobal_1.WorldGlobal.ToUeFloatArray(t, e),
        e)
      : UE.NewArray(UE.BuiltinFloat);
  }
  static SetFloatValuesByEntity(t, e, r) {
    var a = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), a),
      BlackboardController_1.BlackboardController.SetFloatValuesByEntity(
        t,
        e,
        a,
      );
  }
  static GetStringValueByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetStringValueByEntity(
      t,
      e,
    );
    return t || "";
  }
  static SetStringValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetStringValueByEntity(t, e, r);
  }
  static GetStringValuesByEntity(t, e) {
    (t = BlackboardController_1.BlackboardController.GetStringValuesByEntity(
      t,
      e,
    )),
      t || UE.NewArray(UE.BuiltinString),
      (e = UE.NewArray(UE.BuiltinString));
    return WorldGlobal_1.WorldGlobal.ToUeStringArray(t, e), e;
  }
  static SetStringValuesByEntity(t, e, r) {
    var a = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), a),
      BlackboardController_1.BlackboardController.SetStringValuesByEntity(
        t,
        e,
        a,
      );
  }
  static RemoveValueByEntity(t, e) {
    BlackboardController_1.BlackboardController.RemoveValueByEntity(t, e);
  }
  static HasValueByEntity(t, e) {
    return BlackboardController_1.BlackboardController.HasValueByEntity(t, e);
  }
  static GetVectorValueByEntity(t, e) {
    var r = new UE.Vector(),
      t = BlackboardController_1.BlackboardController.GetVectorValueByEntity(
        t,
        e,
      );
    return t && ((r.X = t.X), (r.Y = t.Y), (r.Z = t.Z)), r;
  }
  static SetVectorValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetVectorValueByEntity(
      t,
      e,
      r.X,
      r.Y,
      r.Z,
    );
  }
  static GetVectorValuesByEntity(t, e) {
    var r = UE.NewArray(UE.Vector),
      t = BlackboardController_1.BlackboardController.GetVectorValuesByEntity(
        t,
        e,
      );
    if (t)
      for (const o of t) {
        var a = WorldGlobal_1.WorldGlobal.ToUeVector(o);
        r.Add(a);
      }
    return r;
  }
  static SetVectorValuesByEntity(t, e, r) {
    var a = new Array(),
      o = (0, puerts_1.$unref)(r);
    for (let t = 0; t < o.Num(); ++t) {
      var l = o.Get(t),
        l = WorldGlobal_1.WorldGlobal.ToTsVector(l);
      a.push(l);
    }
    BlackboardController_1.BlackboardController.SetVectorValuesByEntity(
      t,
      e,
      a,
    );
  }
  static GetRotatorValueByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetRotatorValueByEntity(
      t,
      e,
    );
    return t ? WorldGlobal_1.WorldGlobal.ToUeRotator(t) : new UE.Rotator();
  }
  static SetRotatorValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetRotatorValueByEntity(
      t,
      e,
      r.Pitch,
      r.Roll,
      r.Yaw,
    );
  }
  static GetRotatorValuesByEntity(t, e) {
    var r = UE.NewArray(UE.Rotator),
      t = BlackboardController_1.BlackboardController.GetRotatorValuesByEntity(
        t,
        e,
      );
    if (t)
      for (const o of t) {
        var a = WorldGlobal_1.WorldGlobal.ToUeRotator(o);
        r.Add(a);
      }
    return r;
  }
  static SetRotatorValuesByEntity(t, e, r) {
    var a = new Array(),
      o = (0, puerts_1.$unref)(r);
    for (let t = 0; t < o.Num(); ++t) {
      var l = o.Get(t),
        l = WorldGlobal_1.WorldGlobal.ToTsRotator(l);
      a.push(l);
    }
    BlackboardController_1.BlackboardController.SetRotatorValuesByEntity(
      t,
      e,
      a,
    );
  }
  static GetEntityIdByEntity(t, e) {
    return BlackboardController_1.BlackboardController.GetEntityIdByEntity(
      t,
      e,
    );
  }
  static SetEntityIdByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetEntityIdByEntity(t, e, r);
  }
  static GetEntityIdsByEntity(t, e) {
    (t = BlackboardController_1.BlackboardController.GetEntityIdsByEntity(
      t,
      e,
    )),
      (e = UE.NewArray(UE.BuiltinInt));
    return WorldGlobal_1.WorldGlobal.ToUeInt32Array(t, e), e;
  }
  static SetEntityIdsByEntity(t, e, r) {
    var a = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), a),
      BlackboardController_1.BlackboardController.SetEntityIdsByEntity(t, e, a);
  }
  static GetBlackboardInfosByEntity(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return t ? t.GetComponent(0).GetBlackboard().ToString() : "";
  }
  static RemoveStandaloneEntity(t, e) {
    ControllerHolder_1.ControllerHolder.CreatureController.RemoveStandaloneEntity(
      t,
      e,
    );
  }
  static GetDynamicEntity(t) {
    t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t);
    if (t?.Valid) return CharacterController_1.CharacterController.GetActor(t);
  }
  static GetWorldOwner() {
    return ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
  }
  static GenUniqueId() {
    return BigInt(
      ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
    );
  }
  static GetEntityIdByCreature(t) {
    return (
      ModelManager_1.ModelManager.CreatureModel.GetEntity(Number(t))?.Id ?? 0
    );
  }
  static GetCreatureDataIdByEntity(t) {
    t = ModelManager_1.ModelManager.CreatureModel?.GetCreatureDataId(t);
    return t ? BigInt(t) : 0n;
  }
  static GetPlayerIdByEntity(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return t.Valid ? t.GetComponent(0).GetPlayerId() : 0;
  }
  static GetRoleElementId(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    return t?.Valid && (t = t.GetComponent(0).GetRoleConfig())
      ? t.ElementId
      : 0;
  }
  static GetRoleId(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    return t?.Valid && (t = t.GetComponent(0)).Valid ? t.GetRoleId() : 0;
  }
  static GetRoleIdIgnoreTrial(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    return t?.Valid && (t = t.GetComponent(0))?.Valid
      ? (t = t.GetRoleId()) > RoleDefine_1.ROBOT_DATA_MIN_ID
        ? ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t)
            .ParentId
        : t
      : 0;
  }
  static GetOwnerIdByEntity(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    return t?.Valid && (t = t.GetComponent(0)).GetOwnerId()
      ? t.GetOwnerId()
      : zero;
  }
  static JumpToMarkLevelSequence(t, e) {
    UE.KismetSystemLibrary.IsValid(t) &&
      UE.KismetSystemLibrary.IsValid(t.Player) &&
      t.Player.JumpToMarkedFrame(e);
  }
  static GetWuYinQuDebugInfo() {
    return RenderModuleController_1.RenderModuleController.GetWuYinQuBattleDebugInfo();
  }
  static ChangeBattleState(t, e, r) {
    UE.KismetSystemLibrary.IsValid(t) &&
      UE.KismetSystemLibrary.IsValid(t.Player) &&
      RenderModuleController_1.RenderModuleController.SetBattleState(e, r);
  }
  static SetNewUiSceneDebugOpen(t) {
    RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow = t;
  }
  static AiChangeBattleState(t, e) {
    RenderModuleController_1.RenderModuleController.SetBattleState(t, e);
  }
  static PlayWuYinLevelSequence(t, e, r) {
    0 ===
      ModelManager_1.ModelManager.WuYinAreaModel.GetWuYinLevelSequenceState(
        r,
      ) &&
      ((r = new UE.FrameNumber(t)),
      (t = new UE.FrameTime(r, 0)),
      (r = new UE.MovieSceneSequencePlaybackParams(t, 0, "", 0, 0)),
      e.Player.SetPlaybackPosition(r));
  }
  static PlayWuYinSequence(t) {
    ModelManager_1.ModelManager.WuYinAreaModel.PlayWuYinSequence(t, "Play");
  }
  static StartStandalone() {
    WorldModel_1.WorldModel.IsStandalone = !0;
  }
  static IsOpenWorld() {
    return (
      ModelManager_1.ModelManager.GameModeModel.InstanceType ===
      Protocol_1.Aki.Protocol.XFs.Proto_BigWorldInstance
    );
  }
  static GetBattleMode() {
    var t = Protocol_1.Aki.Protocol.D4s.zDs;
    return BattleSetting_1.BattleSetting.IsModuleClientControl(t);
  }
  static SwitchBattleMode() {
    var t = Protocol_1.Aki.Protocol.D4s.zDs;
    BattleSetting_1.BattleSetting.RequestSetModuleNetworkState(
      t,
      !BattleSetting_1.BattleSetting.IsModuleClientControl(t),
    );
  }
  static GetBuffSyncMode() {
    var t = Protocol_1.Aki.Protocol.D4s.Proto_GameplayEffect;
    return BattleSetting_1.BattleSetting.IsModuleClientControl(t);
  }
  static SwitchBuffSyncMode() {
    var t = Protocol_1.Aki.Protocol.D4s.Proto_GameplayEffect;
    BattleSetting_1.BattleSetting.RequestSetModuleNetworkState(
      t,
      !BattleSetting_1.BattleSetting.IsModuleClientControl(t),
    );
  }
  static GetServerLogMode() {
    var t = Protocol_1.Aki.Protocol.D4s.yAs;
    return BattleSetting_1.BattleSetting.IsModuleClientControl(t);
  }
  static SwitchServerLogMode() {
    var t = Protocol_1.Aki.Protocol.D4s.yAs;
    BattleSetting_1.BattleSetting.RequestSetModuleNetworkState(
      t,
      !BattleSetting_1.BattleSetting.IsModuleClientControl(t),
    );
  }
  static GetCurrentDayState() {
    return ModelManager_1.ModelManager.TimeOfDayModel.GameTime.DayState;
  }
  static GetCurrentWeatherState() {
    return 0;
  }
  static ChangeEntityState(t, e, r, a) {
    t = { EntityId: t, State: e };
    LevelGeneralNetworks_1.LevelGeneralNetworks.RequestChangeEntityState(
      t,
      LevelGeneralContextDefine_1.EntityContext.Create(a),
    );
  }
  static TestSpawnTemplateEntityPush(t, e, r, a, o) {
    var l = Protocol_1.Aki.Protocol.tes.create();
    (l.J4n = MathUtils_1.MathUtils.NumberToLong(Number(t))),
      (l.P6n = r),
      (l._9n = e),
      (l.e8n = WorldGlobal_1.WorldGlobal.ToTsVector(a.GetLocation())),
      (l.t8n = WorldGlobal_1.WorldGlobal.ToTsRotator(
        a.GetRotation().Rotator(),
      )),
      (l.oKn = o),
      Net_1.Net.Send(6135, l);
  }
  static GetTestSpawnTemplateEntityString() {
    var t = UE.NewArray(UE.BuiltinString);
    let e = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfig.TemplateConfigPath,
      ),
      r =
        (PublicUtil_1.PublicUtil.IsUseTempData() ||
          (e = (0, PublicUtil_1.getConfigPath)(
            IGlobal_1.globalConfigTemp.TemplateConfigPath,
          )),
        (0, PublicUtil_1.getConfigPath)(
          IGlobal_1.globalConfig.BlueprintConfigPath,
        ));
    if (
      (PublicUtil_1.PublicUtil.IsUseTempData() ||
        (r = (0, PublicUtil_1.getConfigPath)(
          IGlobal_1.globalConfigTemp.BlueprintConfigPath,
        )),
      UE.BlueprintPathsLibrary.FileExists(e) &&
        UE.BlueprintPathsLibrary.FileExists(r))
    ) {
      var a = new Map(),
        o = (0, puerts_1.$ref)(""),
        o =
          (UE.KuroStaticLibrary.LoadFileToString(o, e),
          (o = (0, puerts_1.$unref)(o)),
          JSON.parse(o));
      for (const i of o.Templates) a.set(i.BlueprintType, i.Id);
      var l,
        n,
        o = (0, puerts_1.$ref)(""),
        o =
          (UE.KuroStaticLibrary.LoadFileToString(o, r),
          (o = (0, puerts_1.$unref)(o)),
          JSON.parse(o));
      for ([l, n] of Object.entries(o.BlueprintConfig))
        t.Add(n.Name + "|" + a.get(l));
    } else
      for (const s of TemplateConfigAll_1.configTemplateConfigAll.GetConfigList())
        t.Add(s.Name + "|" + s.Id);
    return t;
  }
  static GetEntityDebugInfoManager() {
    return TsEntityDebugInfoManager_1.default.GetInstance();
  }
  static ChangeSubLevel(t, e, r, a, o) {
    var t = (0, puerts_1.$unref)(t),
      e = (0, puerts_1.$unref)(e),
      l = new Array(),
      n = new Array(),
      t =
        (WorldGlobal_1.WorldGlobal.ToTsArray(t, l),
        WorldGlobal_1.WorldGlobal.ToTsArray(e, n),
        Vector_1.Vector.Create(a));
    ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
      l,
      n,
      r,
      t,
      o,
    );
  }
  static GetActorByCreatureDataId(t) {
    t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(Number(t));
    if (t?.IsInit) return t.Entity.GetComponent(1)?.Owner;
  }
  static SetEntityLocation(t, e, r = !0, a = !1) {
    t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(1);
    t &&
      (a
        ? t.SetActorLocation(e, "SetEntityLocation", r)
        : ((a = Vector_1.Vector.Create(e)).SubtractionEqual(
            t.ActorLocationProxy,
          ),
          t.AddActorWorldOffset(a.ToUeVector(), "SetEntityLocation", r)));
  }
  static SetEntityRotation(t, e, r = !0) {
    t = EntitySystem_1.EntitySystem.Get(t);
    t && t.GetComponent(1)?.SetActorRotation(e, "SetEntityRotation", r);
  }
  static SetEntityLocationAndRotation(t, e, r, a = !1) {
    t = EntitySystem_1.EntitySystem.Get(t);
    t &&
      t
        .GetComponent(1)
        ?.SetActorLocationAndRotation(e, r, "SetEntityLocationAndRotation", a);
  }
  static GetActorByPbDataId(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
    if (t?.IsInit) return t.Entity.GetComponent(1)?.Owner;
  }
  static GetActorByEntityId(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.IsInit) return t.GetComponent(1)?.Owner;
  }
  static GetActorsByPbDataIdArray(t) {
    var e,
      r = (0, puerts_1.$unref)(t),
      a = UE.NewArray(UE.Actor);
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      o?.IsInit &&
        (e = o.Entity.GetComponent(0).GetPbDataId()) &&
        r.Contains(e) &&
        (e = o.Entity.GetComponent(1)) &&
        a.Add(e.Owner);
    return a;
  }
  static MonsterBoomRequest(t, e) {
    ControllerHolder_1.ControllerHolder.CreatureController.MonsterBoomRequest(
      Number(t),
      e,
    );
  }
  static EvalScript(t) {
    return CombatDebugController_1.CombatDebugController.EvalScript(t);
  }
  static GetInitPositionByEntity(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return t
      ? WorldGlobal_1.WorldGlobal.ToUeVector(
          t.GetComponent(0).GetInitLocation(),
        )
      : new UE.Vector();
  }
  static DisableCreatureActor(t, e, r) {
    var a;
    return e?.IsValid()
      ? ((a = `[蓝图:${e.GetName()}] ` + r),
        t?.IsValid()
          ? UE.KuroStaticLibrary.IsImplementInterface(
              t.GetClass(),
              UE.BPI_CreatureInterface_C.StaticClass(),
            )
            ? ((t = t),
              EntitySystem_1.EntitySystem.Get(t.GetEntityId())
                .GetComponent(1)
                .DisableActor(a))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "Actor未实现接口CreatureInterface",
                  ["Reason", a],
                ),
              -1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "actor无效, DisableCreatureActor失败。",
                ["CallObject", e?.GetName()],
                ["Reason", a],
              ),
            -1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "callObject无效, DisableCreatureActor失败。",
            ["Reason", r],
          ),
        -1);
  }
  static EnableCreatureActor(t, e, r) {
    return e?.IsValid()
      ? t?.IsValid()
        ? UE.KuroStaticLibrary.IsImplementInterface(
            t.GetClass(),
            UE.BPI_CreatureInterface_C.StaticClass(),
          )
          ? ((t = t),
            EntitySystem_1.EntitySystem.Get(t.GetEntityId())
              .GetComponent(1)
              .EnableActor(r))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Entity", 3, "Actor未实现接口CreatureInterface"),
            !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "actor无效, EnableCreatureActor失败。",
              ["CallObject", e?.GetName()],
              ["handle", r],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "callObject无效, EnableCreatureActor失败。",
            ["Handle", r],
          ),
        !1);
  }
  static DisableCreatureCollision(t, e, r) {
    var a;
    return e?.IsValid()
      ? ((a = `[蓝图:${e.GetName()}] ` + r),
        t?.IsValid()
          ? UE.KuroStaticLibrary.IsImplementInterface(
              t.GetClass(),
              UE.BPI_CreatureInterface_C.StaticClass(),
            )
            ? ((t = t),
              EntitySystem_1.EntitySystem.Get(t.GetEntityId())
                .GetComponent(1)
                .DisableCollision(a))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "Actor未实现接口CreatureInterface",
                  ["Reason", a],
                ),
              -1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "actor无效, DisableCreatureCollision失败。",
                ["CallObject", e?.GetName()],
                ["Reason", a],
              ),
            -1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "callObject无效, DisableCreatureCollision失败。",
            ["Reason", r],
          ),
        -1);
  }
  static EnableCreatureCollision(t, e, r) {
    return e?.IsValid()
      ? t?.IsValid()
        ? UE.KuroStaticLibrary.IsImplementInterface(
            t.GetClass(),
            UE.BPI_CreatureInterface_C.StaticClass(),
          )
          ? ((t = t),
            EntitySystem_1.EntitySystem.Get(t.GetEntityId())
              .GetComponent(1)
              .EnableCollision(r))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Entity", 3, "Actor未实现接口CreatureInterface"),
            !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "actor无效, EnableCreatureCollision失败。",
              ["CallObject", e?.GetName()],
              ["handle", r],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "callObject无效, EnableCreatureCollision失败。",
            ["Handle", r],
          ),
        !1);
  }
  static SetCameraShakeModify(t) {
    ModelManager_1.ModelManager.CameraModel.SetCameraShakeModify(t);
  }
  static GetFormationAllEntityId() {
    var t = UE.NewMap(UE.BuiltinInt, UE.BuiltinBool);
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      var e = r.EntityHandle;
      e?.Valid && t.Add(e.Id, r.IsMyRole());
    }
    return t;
  }
  static GetFormationControlledRoles() {
    var t,
      e = UE.NewArray(UE.Actor);
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
      r.IsControl() &&
        (t = r.EntityHandle)?.Valid &&
        (t = CharacterController_1.CharacterController.GetActor(t)) &&
        e.Add(t);
    return e;
  }
  static IsGameRunning() {
    return Info_1.Info.IsGameRunning();
  }
  static SetCollisionResponseToPawn(t, e, r) {
    CollisionUtils_1.CollisionUtils.SetCollisionResponseToPawn(
      t.CapsuleComponent,
      e,
      r,
    );
  }
  static ShowCharacterCollision(t, e) {
    e = EntitySystem_1.EntitySystem.Get(e);
    e && (e.GetComponent(20).EnableCollisionDebugDraw = t);
  }
  static GetEnableCollisionDebug(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return !!t && t.GetComponent(20).EnableCollisionDebugDraw;
  }
  static ChangeRole(t) {}
  static ChangeRoleInExitSkill(t, e) {}
  static InitGameSplineBySplineEntity(t, e) {
    return GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(t, e);
  }
  static UiCameraAnimationDisablePlayerActor() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.DisablePlayerActor();
  }
  static UiCameraAnimationEnablePlayerActor() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.EnablePlayerActor();
  }
  static UiCameraAnimationDisableCustomCreatureActor(t) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.DisableCustomCreatureActor(
      t,
    );
  }
  static UiCameraAnimationEnableCustomCreatureActor() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.EnableCustomCreatureActor();
  }
  static UiCameraAnimationBroadSequenceEvent(t) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.BroadUiCameraSequenceEvent(
      t,
    );
  }
  static SetTimeDilation(t) {
    UE.GameplayStatics.SetGlobalTimeDilation(
      GlobalData_1.GlobalData.GameInstance,
      t,
    );
    var e = Protocol_1.Aki.Protocol.PCs.create();
    (e.nKn = t), Net_1.Net.Send(25430, e);
  }
  static GetTimeDilation() {
    return GlobalData_1.GlobalData.GameInstance
      ? UE.GameplayStatics.GetGlobalTimeDilation(
          GlobalData_1.GlobalData.GameInstance,
        )
      : 1;
  }
  static GetEntitiesInRange(t, e) {
    var r = [],
      a = [];
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(t, 2, r);
    for (const l of r) {
      var o = l.Entity.GetComponent(0).GetEntityCamp();
      CampUtils_1.CampUtils.GetCampRelationship(o, 0) === e &&
        a.push(l.Entity.Id);
    }
    t = UE.NewArray(UE.BuiltinInt);
    return WorldGlobal_1.WorldGlobal.ToUeInt32Array(a, t), t;
  }
  static AttachToActor(t, e, r, a, o, l, n, i, s, c, _) {
    return t?.IsValid()
      ? ((t = `[蓝图:${t.GetName()}] ` + o),
        ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
          e,
          r,
          a,
          t,
          l,
          n,
          i,
          s,
          c,
          _,
        ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 3, "callObject无效, AttachToActor失败。", [
            "Reason",
            o,
          ]),
        !1);
  }
  static AttachToComponent(t, e, r, a, o, l, n, i, s, c, _) {
    return t?.IsValid()
      ? ((t = `[蓝图:${t.GetName()}] ` + o),
        ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToComponent(
          e,
          r,
          a,
          t,
          l,
          n,
          i,
          s,
          c,
          _,
        ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 3, "callObject无效, AttachToActor失败。", [
            "Reason",
            o,
          ]),
        !1);
  }
  static DetachActor(t, e, r, a, o, l, n) {
    return t?.IsValid()
      ? ((t = `[蓝图:${t.GetName()}] ` + a),
        ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(
          e,
          r,
          t,
          o,
          l,
          n,
        ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 3, "callObject无效, DetachActor失败。", [
            "Reason",
            a,
          ]),
        !1);
  }
  static GetPlayerFollower() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      t =
        ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
          t,
        )
          ?.GetComponent(204)
          ?.GetFollower()?.Id;
    return t || 0;
  }
  static IsPlayerFollowerEnable() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    return (
      ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
        t,
      )
        ?.GetComponent(204)
        ?.IsFollowerEnable() ?? !1
    );
  }
  static SetPlayerFollowerEnable(t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
      e,
    )
      ?.GetComponent(204)
      ?.SetFollowerEnable(t);
  }
  static IsPlayerFollowerNeedInput(t, e) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    return (
      ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
        r,
      )
        ?.GetComponent(204)
        ?.IsFollowerNeedInput(t, e) ?? !1
    );
  }
  static RegisterToBpActorController(t, e) {
    ControllerHolder_1.ControllerHolder.BpActorController.RegisterBpActor(t, e);
  }
  static UnregisterToBpActorController(t, e) {
    ControllerHolder_1.ControllerHolder.BpActorController.UnregisterBpActor(
      t,
      e,
    );
  }
}
((exports.WorldFunctionLibrary = WorldFunctionLibrary).IsChangeFootStep = !1),
  (WorldFunctionLibrary.ChangeFootStepMaterialId = 0),
  (exports.default = WorldFunctionLibrary);
//# sourceMappingURL=WorldFunctionLibrary.js.map
