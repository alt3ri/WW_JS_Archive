"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const AiAlertById_1 = require("../../../Core/Define/ConfigQuery/AiAlertById");
const AiBaseById_1 = require("../../../Core/Define/ConfigQuery/AiBaseById");
const AiBaseSkillById_1 = require("../../../Core/Define/ConfigQuery/AiBaseSkillById");
const AiBattleWanderById_1 = require("../../../Core/Define/ConfigQuery/AiBattleWanderById");
const AiBattleWanderGroupById_1 = require("../../../Core/Define/ConfigQuery/AiBattleWanderGroupById");
const AiFleeById_1 = require("../../../Core/Define/ConfigQuery/AiFleeById");
const AiHateById_1 = require("../../../Core/Define/ConfigQuery/AiHateById");
const AiPatrolById_1 = require("../../../Core/Define/ConfigQuery/AiPatrolById");
const AiSenseById_1 = require("../../../Core/Define/ConfigQuery/AiSenseById");
const AiSenseGroupById_1 = require("../../../Core/Define/ConfigQuery/AiSenseGroupById");
const AiSkillInfosById_1 = require("../../../Core/Define/ConfigQuery/AiSkillInfosById");
const AiSkillPreconditionById_1 = require("../../../Core/Define/ConfigQuery/AiSkillPreconditionById");
const AiStateMachineConfigById_1 = require("../../../Core/Define/ConfigQuery/AiStateMachineConfigById");
const AiTeamAreaNewById_1 = require("../../../Core/Define/ConfigQuery/AiTeamAreaNewById");
const AiTeamAttackById_1 = require("../../../Core/Define/ConfigQuery/AiTeamAttackById");
const AiTeamLevelNewById_1 = require("../../../Core/Define/ConfigQuery/AiTeamLevelNewById");
const AiWanderById_1 = require("../../../Core/Define/ConfigQuery/AiWanderById");
const AiWanderRadiusConfigById_1 = require("../../../Core/Define/ConfigQuery/AiWanderRadiusConfigById");
const BlackboardWhiteListAll_1 = require("../../../Core/Define/ConfigQuery/BlackboardWhiteListAll");
const SpecialHateAndSenseById_1 = require("../../../Core/Define/ConfigQuery/SpecialHateAndSenseById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const AiPerception_1 = require("../Controller/AiPerception");
const AiSkill_1 = require("../Controller/AiSkill");
const AiWanderInfos_1 = require("../Controller/AiWanderInfos");
const commonStateMachine = "SM_Common";
class AiConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.CommonStateMachineJsonObject = void 0),
      (this.Ste = new Set());
  }
  OnInit() {
    const e =
      AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
        commonStateMachine,
      );
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            31,
            "AiConfig Init fail, no commonStateMachine config",
          ),
        !1
      );
    this.CommonStateMachineJsonObject = JSON.parse(e.StateMachineJson);
    for (const r of BlackboardWhiteListAll_1.configBlackboardWhiteListAll.GetConfigList())
      this.Ste.add(r.Key);
    return !0;
  }
  OnClear() {
    return this.Ste.clear(), !0;
  }
  CheckBlackboardWhiteList(e) {
    return this.Ste.has(e);
  }
  LoadAiConfig(e, r, i = !1) {
    const o = e.CharActorComp;
    (e.AiBase = AiBaseById_1.configAiBaseById.GetConfig(r)),
      e.AiBase
        ? (e.AiBase.SubBehaviorConfigs && this.Ete(e, i),
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
    const r = e.CharActorComp;
    let i = r.CreatureData?.GetPbEntityInitData();
    i &&
      (i = (0, IComponent_1.getComponent)(i.ComponentsData, "AiComponent"))
        ?.InitState &&
      i.InitState.Type === 1 &&
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
        58,
        "缺少AiWander的范围配置",
        ["Id", i.InitState.Wander],
        ["Target", r.Actor.GetName()],
        ["CreatureId", r.CreatureData.GetOwnerId()],
      );
  }
  Ete(e, r = !1) {
    const i = e.CharActorComp;
    const o = this.LoadSpecialHateAndSenseConfig(e);
    this.yte(e);
    let a = e.AiBase.SubBehaviorConfigs.get("AiWander");
    if (
      (a &&
        (e.AiWanderInfos ||
          (e.AiWanderInfos = new AiWanderInfos_1.AiWanderInfos()),
        (e.AiWanderInfos.AiWander = AiWanderById_1.configAiWanderById.GetConfig(
          Number(a),
        )),
        e.AiWanderInfos.AiWander ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              6,
              "缺少AiWander配置",
              ["Id", a],
              ["Target", i.Actor.GetName()],
              ["CreatureId", i.CreatureData.GetOwnerId()],
            ))),
      (a = e.AiBase.SubBehaviorConfigs.get("AiBattleWander")))
    ) {
      e.AiWanderInfos ||
        (e.AiWanderInfos = new AiWanderInfos_1.AiWanderInfos());
      var n = AiBattleWanderById_1.configAiBattleWanderById.GetConfig(
        Number(a),
      );
      if (n)
        if (n.GroupIds.length === 0)
          e.AiWanderInfos.AiBattleWanderGroups = new Array();
        else {
          const t = new Array();
          for (const f of n.GroupIds) {
            const d =
              AiBattleWanderGroupById_1.configAiBattleWanderGroupById.GetConfig(
                f,
              );
            t.push(d);
          }
          const A = new Map();
          for (const B of t) A.set(B.Id, B);
          t.length = 0;
          for (const l of n.GroupIds) t.push(A.get(l));
          e.AiWanderInfos.AiBattleWanderGroups = t;
        }
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            6,
            "缺少AiBattleWander配置",
            ["Id", a],
            ["Target", i.Actor.GetName()],
            ["CreatureId", i.CreatureData.GetOwnerId()],
          );
    }
    (a = e.AiBase.SubBehaviorConfigs.get("AiBaseSkill")) &&
      ((e.AiSkill = new AiSkill_1.AiSkill(e)),
      (e.AiSkill.BaseSkill = AiBaseSkillById_1.configAiBaseSkillById.GetConfig(
        Number(a),
      )),
      e.AiSkill.BaseSkill
        ? this.Ite(e.AiSkill)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            6,
            "缺少AiBaseSkill配置",
            ["Id", a],
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
      (a = e.AiBase.SubBehaviorConfigs.get("AiPatrol")) &&
        ((n = a.split("|")),
        (r = AiPatrolById_1.configAiPatrolById.GetConfig(Number(n[0]))),
        e.AiPatrol.ResetConfig(r),
        r ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              6,
              "缺少AiPatrol配置",
              ["Id", a],
              ["Target", i.Actor.GetName()],
              ["CreatureId", i.CreatureData.GetOwnerId()],
            ))),
      (a = e.AiBase.SubBehaviorConfigs.get("AiFlee")) &&
        ((e.AiFlee = AiFleeById_1.configAiFleeById.GetConfig(Number(a))),
        e.AiFlee ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              6,
              "缺少AiFlee配置",
              ["Id", a],
              ["Target", i.Actor.GetName()],
              ["CreatureId", i.CreatureData.GetOwnerId()],
            )));
  }
  Ite(e) {
    e.BaseSkill.RandomSkills.length > 0 && e.ActiveSkillGroup.add(0);
    let r;
    const i = new Set();
    const o = new Array();
    for (const t of e.BaseSkill.RandomSkills)
      for (const d of t.ArrayInt)
        i.has(d) ||
          (i.add(d),
          (r = AiSkillInfosById_1.configAiSkillInfosById.GetConfig(d)),
          o.push(r));
    i.clear();
    let a;
    const n = new Array();
    for (const A of o)
      e.SkillInfos.set(A.Id, A),
        i.has(A.SkillPreconditionId) ||
          (i.add(A.SkillPreconditionId),
          (a =
            AiSkillPreconditionById_1.configAiSkillPreconditionById.GetConfig(
              A.SkillPreconditionId,
            )),
          n.push(a));
    for (const f of n) e.SkillPreconditionMap.set(f.Id, f);
    e.InitTagMap();
  }
  LoadAiTeamConfigNew(e, r) {
    if (
      ((e.AiTeamLevel =
        AiTeamLevelNewById_1.configAiTeamLevelNewById.GetConfig(r)),
      e.AiTeamLevel)
    ) {
      e.AiTeamAreas = [];
      for (const n of e.AiTeamLevel.PositionId) {
        const i = AiTeamAreaNewById_1.configAiTeamAreaNewById.GetConfig(n);
        e.AiTeamAreas.push(i);
      }
      e.AiTeamAttacks = new Array();
      const o = new Map();
      for (const t of e.AiTeamAreas) {
        let a = o.get(t.AttackWeightId);
        a
          ? e.AiTeamAttacks.push(a)
          : (a = AiTeamAttackById_1.configAiTeamAttackById.GetConfig(
                t.AttackWeightId,
              ))
            ? (o.set(t.AttackWeightId, a), e.AiTeamAttacks.push(a))
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
          const i = AiPatrolById_1.configAiPatrolById.GetConfig(Number(e[r]));
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
    const r = AiPatrolById_1.configAiPatrolById.GetConfig(e);
    if (r) return r;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("BehaviorTree", 6, "缺少AiPatrol配置", ["Id", e]);
  }
  Tte(e, r, i) {
    if (r) {
      const o = AiSenseGroupById_1.configAiSenseGroupById.GetConfig(Number(r));
      if (o) {
        if (o.AiSenseIds.length === 0)
          return new AiPerception_1.AiPerception(e, o, new Array());
        let r = 0;
        const a = [];
        const n = new Array();
        for (const A of o.AiSenseIds) {
          let e = -1;
          r === 0 && i
            ? ((e = i.FirstAiSenseId), a.push(i.FirstAiSenseId))
            : ((e = A), a.push(A));
          const t = AiSenseById_1.configAiSenseById.GetConfig(e);
          n.push(t), ++r;
        }
        const d = new Map();
        for (const f of n) d.set(f.Id, f);
        n.length = 0;
        for (const B of a) n.push(d.get(B));
        return new AiPerception_1.AiPerception(e, o, n);
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
    const r = AiSenseById_1.configAiSenseById.GetConfig(Number(e));
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
    let r;
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
    let r;
    if (e)
      return (
        (r = AiAlertById_1.configAiAlertById.GetConfig(Number(e))) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "缺少AiAlert配置", ["Id", e])),
        r
      );
  }
}
exports.AiConfig = AiConfig;
// # sourceMappingURL=AiConfig.js.map
