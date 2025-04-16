"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineActionResetStatus = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionResetStatus extends AiStateMachineAction_1.AiStateMachineAction {
  DoAction() {
    this.Node.AiController &&
      (ModelManager_1.ModelManager.CombatMessageModel.AnyHateChange = !0);
  }
  ToString(e, t = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(e, t);
  }
}
exports.AiStateMachineActionResetStatus = AiStateMachineActionResetStatus;
//# sourceMappingURL=AiStateMachineActionResetStatus.js.map
