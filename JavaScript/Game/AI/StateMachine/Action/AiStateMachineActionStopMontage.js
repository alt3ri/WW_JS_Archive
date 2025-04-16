"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineActionStopMontage = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionStopMontage extends AiStateMachineAction_1.AiStateMachineAction {
  constructor() {
    super(...arguments), (this.rxr = 0);
  }
  OnInit(t) {
    return (this.rxr = t.ActionStopMontage.BlendOutTime / 1e3), !0;
  }
  DoAction() {
    this.Node.SkillComponent?.CurrentSkill ||
      this.Node.Owner.CheckAnyMontageTaskRunning(this.Node.RootNode) ||
      this.Node.TagComponent?.HasTag(191377386) ||
      this.Node.TagComponent?.HasTag(1008164187) ||
      this.Node.TagComponent?.HasTag(-648310348) ||
      this.Node.AnimationComponent.MainAnimInstance?.Montage_Stop(this.rxr);
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineActionStopMontage = AiStateMachineActionStopMontage;
//# sourceMappingURL=AiStateMachineActionStopMontage.js.map
