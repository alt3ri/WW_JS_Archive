"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionPartLife = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionPartLife extends AiStateMachineCondition_1.AiStateMachineCondition {
  OnInit(t) {
    return !0;
  }
  ToString(t, i = 0) {
    super.ToString(t, i), t.Append("[部位血量]");
  }
}
exports.AiStateMachineConditionPartLife = AiStateMachineConditionPartLife;
// # sourceMappingURL=AiStateMachineConditionPartLife.js.map
