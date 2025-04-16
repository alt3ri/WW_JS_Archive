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
  Constructor() {}
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
      .Entity.GetComponent(194)
      .HasTag(e);
  }
  static GetControlVisionEntityId(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (e) {
      e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        e,
        Protocol_1.Aki.Protocol.Summon.x3s
          .Proto_ESummonTypeConcomitantPhantomRole,
      );
      if (e) return e.Id;
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 28, "无法找到拥有者实体", [
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
        Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
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
      ? PhantomUtil_1.PhantomUtil.SetVisionEnable(
          r,
          e,
          "WorldFunctionLibrary.SetVisionEnable",
        )
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
  static SetCustomEntityEnable(t, e, r, o, a) {
    var n, l;
    o?.IsValid()
      ? ((o = `[蓝图:${o.GetName()}] ` + a),
        (n = EntitySystem_1.EntitySystem.Get(t))
          ? e > (n = n.GetComponent(0).CustomServerEntityIds).length || 0 === e
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                4,
                "pos不合法！",
                ["pos", e],
                ["serverEntityIds", n],
                ["Reason", o],
              )
            : (l = ModelManager_1.ModelManager.CreatureModel.GetEntity(
                  n[e - 1],
                ))
              ? (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                  l.Entity,
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
                    ["customServerEntityIds", n],
                    ["customEntity", l.Id],
                    ["enable", r],
                    ["Reason", o],
                  ))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Battle",
                  4,
                  "无法找到伴生物实体",
                  ["ownerEntityId", t],
                  ["pos", e],
                  ["customServerEntityIds", n],
                )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 4, "无法找到幻象拥有者实体", [
              "ownerEntityId",
              t,
            ]))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 3, "callObject为空，请传递callObject", [
          "Reason",
          a,
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
          Log_1.Log.Error("Battle", 28, "幻象实体已销毁！", [
            "visionEntityId",
            t,
          ]),
        0);
  }
  static GetVisionId(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    return e?.Valid
      ? (e.GetComponent(0).GetVisionComponent()?.VisionId ?? 0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 28, "幻象实体已销毁！", [
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
          Log_1.Log.Error("Battle", 28, "无法找到拥有者实体", [
            "ownerEntityId",
            t,
          ]),
        UE.NewArray(UE.BuiltinInt));
  }
  static SummonRequest(t, e, r, o, a) {
    t = ControllerHolder_1.ControllerHolder.CreatureController.SummonRequest(
      t,
      e,
      r,
      o,
      a,
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
          e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player &&
          !t.GetComponent(3).IsAutonomousProxy
        )
          return !1;
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          e.GetSummonerId(),
        )),
          (e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(0));
        if (
          e &&
          e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player &&
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
      ? void 0 !== e.GetComponent(100)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 39, "无法找到实体", ["entityId", t]),
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
    var o = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), o),
      BlackboardController_1.BlackboardController.SetIntValuesByEntity(t, e, o);
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
    var o = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), o),
      BlackboardController_1.BlackboardController.SetLongValuesByEntity(
        t,
        e,
        o,
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
    var o = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), o),
      BlackboardController_1.BlackboardController.SetFloatValuesByEntity(
        t,
        e,
        o,
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
    var o = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), o),
      BlackboardController_1.BlackboardController.SetStringValuesByEntity(
        t,
        e,
        o,
      );
  }
  static RemoveValueByEntity(t, e) {
    BlackboardController_1.BlackboardController.RemoveValueByEntity(t, e);
  }
  static HasValueByEntity(t, e) {
    return BlackboardController_1.BlackboardController.HasValueByEntity(t, e);
  }
  static GetVectorValueByEntity(t, e) {
    var r = new UE.VectorDouble(),
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
    var r = UE.NewArray(UE.VectorDouble),
      t = BlackboardController_1.BlackboardController.GetVectorValuesByEntity(
        t,
        e,
      );
    if (t)
      for (const a of t) {
        var o = WorldGlobal_1.WorldGlobal.ToUeVector(a);
        r.Add(o);
      }
    return r;
  }
  static SetVectorValuesByEntity(t, e, r) {
    var o = new Array(),
      a = (0, puerts_1.$unref)(r);
    for (let t = 0; t < a.Num(); ++t) {
      var n = a.Get(t),
        n = WorldGlobal_1.WorldGlobal.ToTsVector(n);
      o.push(n);
    }
    BlackboardController_1.BlackboardController.SetVectorValuesByEntity(
      t,
      e,
      o,
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
      for (const a of t) {
        var o = WorldGlobal_1.WorldGlobal.ToUeRotator(a);
        r.Add(o);
      }
    return r;
  }
  static SetRotatorValuesByEntity(t, e, r) {
    var o = new Array(),
      a = (0, puerts_1.$unref)(r);
    for (let t = 0; t < a.Num(); ++t) {
      var n = a.Get(t),
        n = WorldGlobal_1.WorldGlobal.ToTsRotator(n);
      o.push(n);
    }
    BlackboardController_1.BlackboardController.SetRotatorValuesByEntity(
      t,
      e,
      o,
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
    var o = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), o),
      BlackboardController_1.BlackboardController.SetEntityIdsByEntity(t, e, o);
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
    if (t?.Valid)
      return ControllerHolder_1.ControllerHolder.CharacterController.GetActor(
        t,
      );
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
    t = EntitySystem_1.EntitySystem.Get(t);
    return (t?.Valid && t.GetComponent(0).GetOwnerId()) || zero;
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
      Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance
    );
  }
  static GetBattleMode() {
    var t = Protocol_1.Aki.Protocol.B4s.nAs;
    return BattleSetting_1.BattleSetting.IsModuleClientControl(t);
  }
  static SwitchBattleMode() {
    var t = Protocol_1.Aki.Protocol.B4s.nAs;
    BattleSetting_1.BattleSetting.RequestSetModuleNetworkState(
      t,
      !BattleSetting_1.BattleSetting.IsModuleClientControl(t),
    );
  }
  static GetBuffSyncMode() {
    return !1;
  }
  static SwitchBuffSyncMode() {}
  static GetServerLogMode() {
    var t = Protocol_1.Aki.Protocol.B4s.PAs;
    return BattleSetting_1.BattleSetting.IsModuleClientControl(t);
  }
  static SwitchServerLogMode() {
    var t = Protocol_1.Aki.Protocol.B4s.PAs;
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
  static ChangeEntityState(t, e, r, o) {
    t = { EntityId: t, State: e };
    LevelGeneralNetworks_1.LevelGeneralNetworks.RequestChangeEntityState(
      t,
      LevelGeneralContextDefine_1.EntityContext.Create(o),
    );
  }
  static TestSpawnTemplateEntityPush(t, e, r, o, a) {
    var n = Protocol_1.Aki.Protocol.hes.create();
    (n.s5n = MathUtils_1.MathUtils.NumberToLong(Number(t))),
      (n.F6n = r),
      (n.v9n = e),
      (n.l8n = WorldGlobal_1.WorldGlobal.ToTsVector(o.GetLocation())),
      (n._8n = WorldGlobal_1.WorldGlobal.ToTsRotator(
        o.GetRotation().Rotator(),
      )),
      (n.mKn = a),
      Net_1.Net.Send(23336, n);
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
      var o = new Map(),
        a = (0, puerts_1.$ref)(""),
        a =
          (UE.KuroStaticLibrary.LoadFileToString(a, e),
          (a = (0, puerts_1.$unref)(a)),
          JSON.parse(a));
      for (const i of a.Templates) o.set(i.BlueprintType, i.Id);
      var n,
        l,
        a = (0, puerts_1.$ref)(""),
        a =
          (UE.KuroStaticLibrary.LoadFileToString(a, r),
          (a = (0, puerts_1.$unref)(a)),
          JSON.parse(a));
      for ([n, l] of Object.entries(a.BlueprintConfig))
        t.Add(l.Name + "|" + o.get(n));
    } else
      for (const s of TemplateConfigAll_1.configTemplateConfigAll.GetConfigList())
        t.Add(s.Name + "|" + s.Id);
    return t;
  }
  static GetEntityDebugInfoManager() {
    return TsEntityDebugInfoManager_1.default.GetInstance();
  }
  static ChangeSubLevel(t, e, r, o, a) {
    var t = (0, puerts_1.$unref)(t),
      e = (0, puerts_1.$unref)(e),
      n = new Array(),
      l = new Array(),
      t =
        (WorldGlobal_1.WorldGlobal.ToTsArray(t, n),
        WorldGlobal_1.WorldGlobal.ToTsArray(e, l),
        Vector_1.Vector.Create(o));
    ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(
      n,
      l,
      r,
      t,
      a,
    );
  }
  static GetActorByCreatureDataId(t) {
    t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(Number(t));
    if (t?.IsInit) return t.Entity.GetComponent(1)?.Owner;
  }
  static SetEntityLocation(t, e, r = !0, o = !1) {
    t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(1);
    t &&
      (o
        ? t.SetActorLocation(e, "SetEntityLocation", r)
        : ((o = Vector_1.Vector.Create(e)).SubtractionEqual(
            t.ActorLocationProxy,
          ),
          t.AddActorWorldOffset(o.ToUeVector(), "SetEntityLocation", r)));
  }
  static SetEntityRotation(t, e, r = !0) {
    t = EntitySystem_1.EntitySystem.Get(t);
    t && t.GetComponent(1)?.SetActorRotation(e, "SetEntityRotation", r);
  }
  static SetEntityLocationAndRotation(t, e, r, o = !1) {
    t = EntitySystem_1.EntitySystem.Get(t);
    t &&
      t
        .GetComponent(1)
        ?.SetActorLocationAndRotation(e, r, "SetEntityLocationAndRotation", o);
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
      o = UE.NewArray(UE.Actor);
    for (const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      a?.IsInit &&
        (e = a.Entity.GetComponent(0).GetPbDataId()) &&
        r.Contains(e) &&
        (e = a.Entity.GetComponent(1)) &&
        o.Add(e.Owner);
    return o;
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
      : new UE.VectorDouble();
  }
  static DisableCreatureActor(t, e, r) {
    var o;
    return e?.IsValid()
      ? ((o = `[蓝图:${e.GetName()}] ` + r),
        t?.IsValid()
          ? UE.KuroStaticLibrary.IsImplementInterface(
              t.GetClass(),
              UE.BPI_CreatureInterface_C.StaticClass(),
            )
            ? ((t = t),
              EntitySystem_1.EntitySystem.Get(t.GetEntityId())
                .GetComponent(1)
                .DisableActor(o))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "Actor未实现接口CreatureInterface",
                  ["Reason", o],
                ),
              -1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "actor无效, DisableCreatureActor失败。",
                ["CallObject", e?.GetName()],
                ["Reason", o],
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
    var o;
    return e?.IsValid()
      ? ((o = `[蓝图:${e.GetName()}] ` + r),
        t?.IsValid()
          ? UE.KuroStaticLibrary.IsImplementInterface(
              t.GetClass(),
              UE.BPI_CreatureInterface_C.StaticClass(),
            )
            ? ((t = t),
              EntitySystem_1.EntitySystem.Get(t.GetEntityId())
                .GetComponent(1)
                .DisableCollision(o))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "Actor未实现接口CreatureInterface",
                  ["Reason", o],
                ),
              -1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "actor无效, DisableCreatureCollision失败。",
                ["CallObject", e?.GetName()],
                ["Reason", o],
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
        (t =
          ControllerHolder_1.ControllerHolder.CharacterController.GetActor(
            t,
          )) &&
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
    e && (e.GetComponent(22).EnableCollisionDebugDraw = t);
  }
  static GetEnableCollisionDebug(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return !!t && t.GetComponent(22).EnableCollisionDebugDraw;
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
    var e = Protocol_1.Aki.Protocol.GCs.create();
    (e.dKn = t), Net_1.Net.Send(26819, e);
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
      o = [];
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(t, 62, r);
    for (const n of r) {
      var a = n.Entity.GetComponent(0).GetEntityCamp();
      CampUtils_1.CampUtils.GetCampRelationship(a, 0) === e &&
        o.push(n.Entity.Id);
    }
    t = UE.NewArray(UE.BuiltinInt);
    return WorldGlobal_1.WorldGlobal.ToUeInt32Array(o, t), t;
  }
  static AttachToActor(t, e, r, o, a, n, l, i, s, c, _) {
    return t?.IsValid()
      ? ((t = `[蓝图:${t.GetName()}] ` + a),
        ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
          e,
          r,
          o,
          t,
          n,
          l,
          i,
          s,
          c,
          _,
        ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 3, "callObject无效, AttachToActor失败。", [
            "Reason",
            a,
          ]),
        !1);
  }
  static AttachToComponent(t, e, r, o, a, n, l, i, s, c, _) {
    return t?.IsValid()
      ? ((t = `[蓝图:${t.GetName()}] ` + a),
        ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToComponent(
          e,
          r,
          o,
          t,
          n,
          l,
          i,
          s,
          c,
          _,
        ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 3, "callObject无效, AttachToActor失败。", [
            "Reason",
            a,
          ]),
        !1);
  }
  static DetachActor(t, e, r, o, a, n, l) {
    return t?.IsValid()
      ? ((t = `[蓝图:${t.GetName()}] ` + o),
        ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(
          e,
          r,
          t,
          a,
          n,
          l,
        ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 3, "callObject无效, DetachActor失败。", [
            "Reason",
            o,
          ]),
        !1);
  }
  static GetPlayerFollower() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      t =
        ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
          t,
        )
          ?.GetComponent(221)
          ?.GetFollower()?.Id;
    return t || 0;
  }
  static IsPlayerFollowerEnable() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    return (
      ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
        t,
      )
        ?.GetComponent(221)
        ?.IsFollowerEnable() ?? !1
    );
  }
  static SetPlayerFollowerEnable(t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
      e,
    )
      ?.GetComponent(221)
      ?.SetFollowerEnable(t);
  }
  static IsPlayerFollowerNeedInput(t, e) {
    return !1;
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
