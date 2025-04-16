"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Global_1 = require("../../../../../Global"),
  LevelGamePlayUtils_1 = require("../../../../../LevelGamePlay/LevelGamePlayUtils"),
  LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine"),
  ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsAiBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static GetQuestState(e, t) {
    t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
    return t ? t.Status : 4;
  }
  static GetDistanceByPlayer(e) {
    var t = Global_1.Global.BaseCharacter;
    return t && (e = EntitySystem_1.EntitySystem.GetComponent(e, 3))?.Valid
      ? ((e = e.ActorLocationProxy),
        (t = t.CharacterActorComponent.ActorLocationProxy),
        Vector_1.Vector.Dist(e, t))
      : Number.MAX_VALUE;
  }
  static CheckPlayerGameplayTag(e, t) {
    var a = Global_1.Global.BaseCharacter;
    return (
      !!a &&
      !!(a = a.CharacterActorComponent.Entity.GetComponent(203)) &&
      a.HasTag(t?.TagId)
    );
  }
  static RestartBehaviorTree(e) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 46);
    e && e.RestartBehaviorTree();
  }
  static SetAiEnabled(e, t, a) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 46);
    e && ((a = "EcologicalBridge_" + a), t ? e.EnableAi(a) : e.DisableAi(a));
  }
  static NeedCheckPlayerImpact(e) {
    var e = EntitySystem_1.EntitySystem.GetComponent(e, 46);
    return (
      !!e &&
      !!(e = e.TsAiController.AiController.NpcDecision) &&
      e.CheckPlayerImpact
    );
  }
  static NeedCheckPlayerAttack(e) {
    return TsAiBlueprintFunctionLibrary.NeedCheckPlayerAttackNoBlueprint(e);
  }
  static NeedCheckPlayerAttackNoBlueprint(e) {
    var e = EntitySystem_1.EntitySystem.GetComponent(e, 46);
    return (
      !!e &&
      !!(e = e.TsAiController.AiController.NpcDecision) &&
      e.CheckPlayerAttack
    );
  }
  static UpdateInteractionComponent(e) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 116);
    e && e.ForceUpdate();
  }
  static OnPlayerAttack(e) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 184);
    e && e.OnPlayerAttack();
  }
  static OnPlayerImpact(e) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 184);
    e && e.OnPlayerImpact();
  }
  static OnPlayerAttackBegin(e) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 184);
    e && e.OnPlayerAttackBegin();
  }
  static OnPlayerImpactBegin(e) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 184);
    e && e.OnPlayerImpactBegin();
  }
  static OnPlayerAttackEnd(e) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 184);
    e && e.OnPlayerAttackEnd();
  }
  static OnPlayerImpactEnd(e) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 184);
    e && e.OnPlayerImpactEnd();
  }
  static UpdateNpcPerformData(e, t, a, r, i) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 184);
    e &&
      ((0, puerts_1.$set)(t, e.IsBeingAttacked),
      (0, puerts_1.$set)(a, e.IsBeingImpacted),
      (0, puerts_1.$set)(r, e.CollisionDirection),
      (0, puerts_1.$set)(i, e.CollisionStrength));
  }
  static IsAiDriver(e) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 46);
    return !!e && e.IsAiDriver;
  }
  static GetRoleActor(e) {
    return EntitySystem_1.EntitySystem.GetComponent(e, 55)?.GetRoleActor();
  }
  static SetFollowData(e, t, a) {}
  static GetFollowActor(e) {
    return EntitySystem_1.EntitySystem.GetComponent(e, 55)?.GetFollowActor();
  }
  static Reset(e, t) {
    EntitySystem_1.EntitySystem.GetComponent(e, 55)?.Reset(t);
  }
  static GetToRoleDistance(e) {
    return EntitySystem_1.EntitySystem.GetComponent(e, 55)?.GetToRoleDistance();
  }
  static GetSummonType(e) {
    return 0;
  }
  static TsLogInfo(e) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, e);
  }
  static GetLevelBoolVar(e) {
    var t = LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
      e = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(e);
    return (
      (e.Type = "Boolean"),
      LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(e, t)
    );
  }
  static GetLevelIntVar(e) {
    var t = LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
      e = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(e);
    return (
      (e.Type = "Int"),
      LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(e, t)
    );
  }
  static GetLevelStringVar(e) {
    var t = LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
      e = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(e);
    return (
      (e.Type = "String"),
      LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(e, t)
    );
  }
  static GetLevelFloatVar(e) {
    var t = LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
      e = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(e);
    return (
      (e.Type = "Float"),
      LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(e, t)
    );
  }
  static GetLevelPosVar(e) {
    var t = LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
      e = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(e),
      e =
        ((e.Type = "Transform"),
        LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(e, t));
    return new UE.Vector(e.X ?? 0, e.Y ?? 0, e.Z ?? 0);
  }
}
exports.default = TsAiBlueprintFunctionLibrary;
//# sourceMappingURL=TsAiBlueprintFunctionLibrary.js.map
