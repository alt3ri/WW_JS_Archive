"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineActionEnterFight = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionEnterFight extends AiStateMachineAction_1.AiStateMachineAction {
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineActionEnterFight = AiStateMachineActionEnterFight;
//# sourceMappingURL=AiStateMachineActionEnterFight.js.map
