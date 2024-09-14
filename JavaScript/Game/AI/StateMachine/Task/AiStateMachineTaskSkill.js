"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineTaskSkill = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../../Utils/CombatLog"),
  AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskSkill extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments),
      (this.SkillName = ""),
      (this.SkillId = 0),
      (this.Timeout = 0),
      (this.Done = !1),
      (this.PreExecution = !1);
  }
  OnInit(t) {
    var i;
    return this.Node.SkillId
      ? (this.Node.Owner.PushErrorMessage(
          `状态节点配置错误，重复配置技能，节点[${this.Node.Name}]]`,
        ),
        !1)
      : (t.TaskSkillByName
          ? ((this.SkillName = t.TaskSkillByName.SkillName),
            (i = this.Node.Entity.GetComponent(34).GetSkillIdByName(
              this.SkillName,
            )),
            (this.SkillId = i || 0),
            (this.Node.SkillId = this.SkillId))
          : t.TaskSkill
            ? ((this.SkillId = t.TaskSkill.SkillId),
              (this.Node.SkillId = t.TaskSkill.SkillId))
            : this.Node.Owner.PushErrorMessage(
                `状态节点配置错误，技能为空，节点[${this.Node.Name}]]`,
              ),
        !0);
  }
  OnEnter(t) {
    var i;
    this.SkillId
      ? ((this.PreExecution = this.Node.RootNode.WaitSwitchState),
        (this.Done = !1),
        this.SkillId &&
          (this.Node.ActorComponent.IsAutonomousProxy || this.PreExecution) &&
          (this.Node.SkillComponent.StopAllSkills(
            "AiStateMachineTaskSkill.OnEnter",
          ),
          (i = this.Node.AiController.AiHateList.GetCurrentTarget()),
          (this.Done = this.Node.SkillComponent.BeginSkill(this.SkillId, {
            Target: i?.Entity,
            ContextId: t,
            Context: "AiStateMachineTaskSkill.OnEnter",
          }))))
      : CombatLog_1.CombatLog.Error(
          "StateMachineNew",
          this.Node.Entity,
          `状态节点执行技能失败，技能查询失败，节点[${this.Node.Name}]，技能名[${this.SkillName}]`,
        );
  }
  OnTick(t, i) {
    var s;
    this.Done ||
      (!this.Node.ActorComponent.IsAutonomousProxy && !this.PreExecution) ||
      (this.Node.ElapseTime < this.Timeout
        ? (this.Done = this.Node.SkillComponent.BeginSkill(this.SkillId, {
            ContextId: i,
            Context: "AiStateMachineTaskSkill.OnTick",
          }))
        : (CombatLog_1.CombatLog.Info(
            "StateMachineNew",
            this.Node.Entity,
            `状态机技能释放失败 节点[${this.Node.Name}]，技能名[${this.SkillName}]`,
          ),
          ((s = Protocol_1.Aki.Protocol.m4n.create()).r5n = this.SkillId),
          CombatMessage_1.CombatNet.Call(
            19436,
            this.Node.Entity,
            s,
            () => {},
            i,
          ),
          (this.Node.TaskFinish = !0),
          (this.Done = !0)));
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineTaskSkill = AiStateMachineTaskSkill;
//# sourceMappingURL=AiStateMachineTaskSkill.js.map
