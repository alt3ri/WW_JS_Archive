"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  AiAlertById_1 = require("../../../Core/Define/ConfigQuery/AiAlertById"),
  AiBaseById_1 = require("../../../Core/Define/ConfigQuery/AiBaseById"),
  AiBaseSkillById_1 = require("../../../Core/Define/ConfigQuery/AiBaseSkillById"),
  AiBattleWanderById_1 = require("../../../Core/Define/ConfigQuery/AiBattleWanderById"),
  AiBattleWanderGroupById_1 = require("../../../Core/Define/ConfigQuery/AiBattleWanderGroupById"),
  AiFleeById_1 = require("../../../Core/Define/ConfigQuery/AiFleeById"),
  AiHateById_1 = require("../../../Core/Define/ConfigQuery/AiHateById"),
  AiPatrolById_1 = require("../../../Core/Define/ConfigQuery/AiPatrolById"),
  AiSenseById_1 = require("../../../Core/Define/ConfigQuery/AiSenseById"),
  AiSenseGroupById_1 = require("../../../Core/Define/ConfigQuery/AiSenseGroupById"),
  AiSkillInfosById_1 = require("../../../Core/Define/ConfigQuery/AiSkillInfosById"),
  AiSkillPreconditionById_1 = require("../../../Core/Define/ConfigQuery/AiSkillPreconditionById"),
  AiStateMachineConfigById_1 = require("../../../Core/Define/ConfigQuery/AiStateMachineConfigById"),
  AiTeamAreaNewById_1 = require("../../../Core/Define/ConfigQuery/AiTeamAreaNewById"),
  AiTeamAttackById_1 = require("../../../Core/Define/ConfigQuery/AiTeamAttackById"),
  AiTeamLevelNewById_1 = require("../../../Core/Define/ConfigQuery/AiTeamLevelNewById"),
  AiWanderById_1 = require("../../../Core/Define/ConfigQuery/AiWanderById"),
  AiWanderRadiusConfigById_1 = require("../../../Core/Define/ConfigQuery/AiWanderRadiusConfigById"),
  BlackboardWhiteListAll_1 = require("../../../Core/Define/ConfigQuery/BlackboardWhiteListAll"),
  SpecialHateAndSenseById_1 = require("../../../Core/Define/ConfigQuery/SpecialHateAndSenseById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  AiPerception_1 = require("../Controller/AiPerception"),
  AiSkill_1 = require("../Controller/AiSkill"),
  AiWanderInfos_1 = require("../Controller/AiWanderInfos"),
  AsyncAiPerception_1 = require("../Controller/AsyncAiPerception"),
  commonStateMachine = "SM_Common";
class AiConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.CommonStateMachineJsonObject = void 0),
      (this.Ete = new Set());
  }
  OnInit() {
    var e =
      AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
        commonStateMachine,
      );
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            30,
            "AiConfig Init fail, no commonStateMachine config",
          ),
        !1
      );
    this.CommonStateMachineJsonObject = JSON.parse(e.StateMachineJson);
    for (const r of BlackboardWhiteListAll_1.configBlackboardWhiteListAll.GetConfigList())
      this.Ete.add(r.Key);
    return !0;
  }
  OnClear() {
    return this.Ete.clear(), !0;
  }
  CheckBlackboardWhiteList(e) {
    return this.Ete.has(e);
  }
  LoadAiConfig(e, r, i = !1) {
    var o = e.CharActorComp;
    (e.AiBase = AiBaseById_1.configAiBaseById.GetConfig(r)),
      e.AiBase
        ? (e.AiBase.SubBehaviorConfigs && this.Ste(e, i),
          e.AiBase.StateMachine &&
            (e.StateMachineConfig =
              AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
                e.AiBase.StateMachine,
              )))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            6,
            "缺少AiBase配置",
            ["Id", r],
            ["Target", o.Actor.GetName()],
            ["CreatureId", o.CreatureData.GetOwnerId()],
          );
  }
  yte(e) {
    var r = e.CharActorComp,
      i = r.CreatureData?.GetPbEntityInitData();
    i &&
      (i = (0, IComponent_1.getComponent)(i.ComponentsData, "AiComponent"))
        ?.InitState &&
      1 === i.InitState.Type &&
      i.InitState.Wander &&
      !e.AiWanderRadiusConfig &&
      ((e.AiWanderRadiusConfig =
        AiWanderRadiusConfigById_1.configAiWanderRadiusConfigById.GetConfig(
          i.InitState.Wander,
        )),
      !e.AiWanderRadiusConfig) &&
      Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "BehaviorTree",
        57,
        "缺少AiWander的范围配置",
        ["Id", i.InitState.Wander],
        ["Target", r.Actor.GetName()],
        ["CreatureId", r.CreatureData.GetOwnerId()],
      );
  }
  Ste(e, r = !1) {
    var i = e.CharActorComp,
      o = this.LoadSpecialHateAndSenseConfig(e);
    this.yte(e);
    let n = e.AiBase.SubBehaviorConfigs.get("AiWander");
    if (
      (n &&
        (e.AiWanderInfos ||
          (e.AiWanderInfos = new AiWanderInfos_1.AiWanderInfos()),
        (e.AiWanderInfos.AiWander = AiWanderById_1.configAiWanderById.GetConfig(
          Number(n),
        )),
        e.AiWanderInfos.AiWander ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              6,
              "缺少AiWander配置",
              ["Id", n],
              ["Target", i.Actor.GetName()],
              ["CreatureId", i.CreatureData.GetOwnerId()],
            ))),
      (n = e.AiBase.SubBehaviorConfigs.get("AiBattleWander")))
    ) {
      e.AiWanderInfos ||
        (e.AiWanderInfos = new AiWanderInfos_1.AiWanderInfos());
      var a = AiBattleWanderById_1.configAiBattleWanderById.GetConfig(
        Number(n),
      );
      if (a)
        if (0 === a.GroupIds.length)
          e.AiWanderInfos.AiBattleWanderGroups = new Array();
        else {
          var t = new Array();
          for (const _ of a.GroupIds) {
            var A =
              AiBattleWanderGroupById_1.configAiBattleWanderGroupById.GetConfig(
                _,
              );
            t.push(A);
          }
          var d = new Map();
          for (const l of t) d.set(l.Id, l);
          t.length = 0;
          for (const I of a.GroupIds) t.push(d.get(I));
          e.AiWanderInfos.AiBattleWanderGroups = t;
        }
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            6,
            "缺少AiBattleWander配置",
            ["Id", n],
            ["Target", i.Actor.GetName()],
            ["CreatureId", i.CreatureData.GetOwnerId()],
          );
    }
    (n = e.AiBase.SubBehaviorConfigs.get("AiBaseSkill")) &&
      ((e.AiSkill = new AiSkill_1.AiSkill(e)),
      (e.AiSkill.BaseSkill = AiBaseSkillById_1.configAiBaseSkillById.GetConfig(
        Number(n),
      )),
      e.AiSkill.BaseSkill
        ? this.Ite(e.AiSkill)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            6,
            "缺少AiBaseSkill配置",
            ["Id", n],
            ["Target", i.Actor.GetName()],
            ["CreatureId", i.CreatureData.GetOwnerId()],
          )),
      (e.AiHateList.AiHate = this.LoadAiHateByController(e, o)),
      (e.AiAlert.AiAlertConfig = this.LoadAiAlert(
        e.AiBase.SubBehaviorConfigs.get("AiAlert"),
      )),
      (r && !e.AiAlert.AiAlertConfig) ||
        (e.AiPerception = this.Tte(
          e,
          e.AiBase.SubBehaviorConfigs.get("AiSense"),
          o,
        )),
      (n = e.AiBase.SubBehaviorConfigs.get("AiPatrol"));
    var a = i.CreatureData.GetOwnerIncId();
    let f = !1;
    (f =
      0 < a &&
      i.CreatureData.GetEntityConfigType() ===
        Protocol_1.Aki.Protocol.rLs.F6n &&
      (r = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(
        ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId,
        i.CreatureData.GetPbDataId(),
      )) &&
      "Entity" === r.Type &&
      (o = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
        r.EntityId,
      )) &&
      (0, IComponent_1.getComponent)(o.ComponentsData, "GroupAiComponent")
        ?.Option.Type === IComponent_1.EGroupAiMode.Patrol
        ? !0
        : f) &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "AI",
        42,
        "AI处于群组巡逻管理，忽略单体巡逻配置",
        ["Target", i.Actor.GetName()],
        ["Entity.Id", i.Entity.Id],
        ["GetPbDataId", i.CreatureData.GetPbDataId()],
      ),
      n &&
        !f &&
        ((a = n.split("|")),
        (r = AiPatrolById_1.configAiPatrolById.GetConfig(Number(a[0]))),
        e.AiPatrol.ResetConfig(r),
        r ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              6,
              "缺少AiPatrol配置",
              ["Id", n],
              ["Target", i.Actor.GetName()],
              ["CreatureId", i.CreatureData.GetOwnerId()],
            ))),
      (n = e.AiBase.SubBehaviorConfigs.get("AiFlee")) &&
        ((e.AiFlee = AiFleeById_1.configAiFleeById.GetConfig(Number(n))),
        e.AiFlee ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              6,
              "缺少AiFlee配置",
              ["Id", n],
              ["Target", i.Actor.GetName()],
              ["CreatureId", i.CreatureData.GetOwnerId()],
            )));
  }
  Ite(e) {
    0 < e.BaseSkill.RandomSkills.length && e.ActiveSkillGroup.add(0);
    var r,
      i = new Set(),
      o = new Array();
    for (const t of e.BaseSkill.RandomSkills)
      for (const A of t.ArrayInt)
        i.has(A) ||
          (i.add(A),
          (r = AiSkillInfosById_1.configAiSkillInfosById.GetConfig(A)),
          o.push(r));
    i.clear();
    var n,
      a = new Array();
    for (const d of o)
      e.SkillInfos.set(d.Id, d),
        i.has(d.SkillPreconditionId) ||
          (i.add(d.SkillPreconditionId),
          (n =
            AiSkillPreconditionById_1.configAiSkillPreconditionById.GetConfig(
              d.SkillPreconditionId,
            )),
          a.push(n));
    for (const f of a) e.SkillPreconditionMap.set(f.Id, f);
    e.InitTagMap();
  }
  LoadAiTeamConfigNew(e, r) {
    if (
      ((e.AiTeamLevel =
        AiTeamLevelNewById_1.configAiTeamLevelNewById.GetConfig(r)),
      e.AiTeamLevel)
    ) {
      e.AiTeamAreas = [];
      for (const a of e.AiTeamLevel.PositionId) {
        var i = AiTeamAreaNewById_1.configAiTeamAreaNewById.GetConfig(a);
        e.AiTeamAreas.push(i);
      }
      e.AiTeamAttacks = new Array();
      var o = new Map();
      for (const t of e.AiTeamAreas) {
        var n = o.get(t.AttackWeightId);
        n
          ? e.AiTeamAttacks.push(n)
          : (n = AiTeamAttackById_1.configAiTeamAttackById.GetConfig(
                t.AttackWeightId,
              ))
            ? (o.set(t.AttackWeightId, n), e.AiTeamAttacks.push(n))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "BehaviorTree",
                6,
                "没有配置AiTeamAttack",
                ["AttackWeightId", t.AttackWeightId],
                ["LocationId", t.Id],
              );
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("AI", 6, "没有配置AiTeamLevel", ["Id", r]);
  }
  LoadAiPatrolConfig(e, r) {
    if (e && e.SubBehaviorConfigs) {
      e = e.SubBehaviorConfigs.get("AiPatrol");
      if (e) {
        e = e.split("|");
        if (!(e.length <= r)) {
          var i = AiPatrolById_1.configAiPatrolById.GetConfig(Number(e[r]));
          if (i) return i;
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "缺少AiPatrol配置", [
              "Id",
              e[r],
            ]);
        }
      }
    }
  }
  LoadAiPatrolConfigById(e) {
    var r = AiPatrolById_1.configAiPatrolById.GetConfig(e);
    if (r) return r;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("BehaviorTree", 6, "缺少AiPatrol配置", ["Id", e]);
  }
  Tte(e, r, i) {
    if (r) {
      var o = AiSenseGroupById_1.configAiSenseGroupById.GetConfig(Number(r));
      if (o) {
        if (0 === o.AiSenseIds.length)
          return new (
            AiConfig.AsyncAiPerception
              ? AsyncAiPerception_1.AsyncAiPerception
              : AiPerception_1.AiPerception
          )(e, o, new Array());
        let r = 0;
        var n = [],
          a = new Array();
        for (const d of o.AiSenseIds) {
          let e = -1;
          0 === r && i
            ? ((e = i.FirstAiSenseId), n.push(i.FirstAiSenseId))
            : ((e = d), n.push(d));
          var t = AiSenseById_1.configAiSenseById.GetConfig(e);
          a.push(t), ++r;
        }
        var A = new Map();
        for (const f of a) A.set(f.Id, f);
        a.length = 0;
        for (const _ of n) a.push(A.get(_));
        return new (
          AiConfig.AsyncAiPerception
            ? AsyncAiPerception_1.AsyncAiPerception
            : AiPerception_1.AiPerception
        )(e, o, a);
      }
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "BehaviorTree",
          6,
          "缺少AiSenseGroup配置",
          ["Id", r],
          ["Actor", e.CharActorComp.Actor.GetName()],
        );
    }
  }
  LoadAiSense(e) {
    var r = AiSenseById_1.configAiSenseById.GetConfig(Number(e));
    if (r) return r;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("BehaviorTree", 6, "缺少AiSense配置", ["AiSenseId", e]);
  }
  LoadSpecialHateAndSenseConfig(e) {
    e = e.CharActorComp.Entity.GetComponent(0).GetMonsterComponent();
    let r = void 0;
    return (
      e?.SpecialHateAndSenseConfig &&
        !(r = SpecialHateAndSenseById_1.configSpecialHateAndSenseById.GetConfig(
          e.SpecialHateAndSenseConfig,
        )) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "缺少SpecialHateAndSense配置", [
          "Id",
          e.SpecialHateAndSenseConfig,
        ]),
      r
    );
  }
  LoadAiHate(e) {
    var r;
    if (e)
      return (
        (r = AiHateById_1.configAiHateById.GetConfig(Number(e))) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "缺少AiHate配置", ["Id", e])),
        r
      );
  }
  LoadAiHateByController(e, r) {
    let i = r;
    r = (i = i || this.LoadSpecialHateAndSenseConfig(e))
      ? i.AiHateId.toString()
      : e.AiBase.SubBehaviorConfigs.get("AiHate");
    return this.LoadAiHate(Number(r));
  }
  LoadAiAlert(e) {
    var r;
    if (e)
      return (
        (r = AiAlertById_1.configAiAlertById.GetConfig(Number(e))) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "缺少AiAlert配置", ["Id", e])),
        r
      );
  }
}
((exports.AiConfig = AiConfig).AsyncAiPerception = !1),
  (AiConfig.CppAsyncAiPerception = !1);
//# sourceMappingURL=AiConfig.js.map
