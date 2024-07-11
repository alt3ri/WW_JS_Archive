"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineActionRemoveBuff = void 0);
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionRemoveBuff extends AiStateMachineAction_1.AiStateMachineAction {
  constructor() {
    super(...arguments), (this.BuffId = void 0);
  }
  OnInit(t) {
    return (this.BuffId = BigInt(t.ActionRemoveBuff.BuffId)), !0;
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineActionRemoveBuff = AiStateMachineActionRemoveBuff;
// # sourceMappingURL=AiStateMachineActionRemoveBuff.js.map
