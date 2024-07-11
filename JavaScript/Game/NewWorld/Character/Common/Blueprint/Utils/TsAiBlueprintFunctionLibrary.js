"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Global_1 = require("../../../../../Global"),
  ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsAiBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static GetQuestState(t, e) {
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    return e ? e.Status : 4;
  }
  static GetDistanceByPlayer(t) {
    var e = Global_1.Global.BaseCharacter;
    return e && (t = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid
      ? ((t = t.ActorLocationProxy),
        (e = e.CharacterActorComponent.ActorLocationProxy),
        Vector_1.Vector.Dist(t, e))
      : Number.MAX_VALUE;
  }
  static CheckPlayerGameplayTag(t, e) {
    var r = Global_1.Global.BaseCharacter;
    return (
      !!r &&
      !!(r = r.CharacterActorComponent.Entity.GetComponent(185)) &&
      r.HasTag(e?.TagId)
    );
  }
  static RestartBehaviorTree(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t && t.RestartBehaviorTree();
  }
  static SetAiEnabled(t, e, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t && ((r = "EcologicalBridge_" + r), e ? t.EnableAi(r) : t.DisableAi(r));
  }
  static NeedCheckPlayerImpact(t) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return (
      !!t &&
      !!(t = t.TsAiController.AiController.NpcDecision) &&
      t.CheckPlayerImpact
    );
  }
  static NeedCheckPlayerAttack(t) {
    return TsAiBlueprintFunctionLibrary.NeedCheckPlayerAttackNoBlueprint(t);
  }
  static NeedCheckPlayerAttackNoBlueprint(t) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return (
      !!t &&
      !!(t = t.TsAiController.AiController.NpcDecision) &&
      t.CheckPlayerAttack
    );
  }
  static UpdateInteractionComponent(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 103);
    t && t.ForceUpdate();
  }
  static OnPlayerAttack(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 168);
    t && t.OnPlayerAttack();
  }
  static OnPlayerImpact(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 168);
    t && t.OnPlayerImpact();
  }
  static OnPlayerAttackBegin(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 168);
    t && t.OnPlayerAttackBegin();
  }
  static OnPlayerImpactBegin(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 168);
    t && t.OnPlayerImpactBegin();
  }
  static OnPlayerAttackEnd(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 168);
    t && t.OnPlayerAttackEnd();
  }
  static OnPlayerImpactEnd(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 168);
    t && t.OnPlayerImpactEnd();
  }
  static UpdateNpcPerformData(t, e, r, a, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 168);
    t &&
      ((0, puerts_1.$set)(e, t.IsBeingAttacked),
      (0, puerts_1.$set)(r, t.IsBeingImpacted),
      (0, puerts_1.$set)(a, t.CollisionDirection),
      (0, puerts_1.$set)(i, t.CollisionStrength));
  }
  static IsAiDriver(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return !!t && t.IsAiDriver;
  }
  static GetRoleActor(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 47)?.GetRoleActor();
  }
  static SetFollowData(t, e, r) {
    EntitySystem_1.EntitySystem.GetComponent(t, 47)?.SetFollowData(e, r);
  }
  static GetFollowActor(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 47)?.GetFollowActor();
  }
  static Reset(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 47)?.Reset(e);
  }
  static GetToRoleDistance(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 47)?.GetToRoleDistance();
  }
  static GetSummonType(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 47)?.SummonType;
  }
  static TsLogInfo(t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, t);
  }
}
exports.default = TsAiBlueprintFunctionLibrary;
//# sourceMappingURL=TsAiBlueprintFunctionLibrary.js.map
