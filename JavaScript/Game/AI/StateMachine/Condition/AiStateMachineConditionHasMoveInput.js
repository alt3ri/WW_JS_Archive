"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionHasMoveInput = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionHasMoveInput extends AiStateMachineCondition_1.AiStateMachineCondition {
  OnTick() {
    this.ResultSelf = this.Node.MoveComponent.HasMoveInput;
  }
  ToString(t, i = 0) {
    super.ToString(t, i),
      t.Append(`有移动输入
`);
  }
}
exports.AiStateMachineConditionHasMoveInput =
  AiStateMachineConditionHasMoveInput;
//# sourceMappingURL=AiStateMachineConditionHasMoveInput.js.map
