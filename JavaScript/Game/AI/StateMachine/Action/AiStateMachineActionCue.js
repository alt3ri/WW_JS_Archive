"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineActionCue = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionCue extends AiStateMachineAction_1.AiStateMachineAction {
  constructor() {
    super(...arguments), (this.Vre = void 0);
  }
  OnInit(t) {
    this.Vre = [];
    for (const i of t.ActionCue.CueIds) this.Vre.push(BigInt(i));
    return !0;
  }
  DoAction() {
    this.Node.BuffComponent.AddGameplayCue(this.Vre, 0, "状态机");
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineActionCue = AiStateMachineActionCue;
//# sourceMappingURL=AiStateMachineActionCue.js.map
