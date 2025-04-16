"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionCheckPositionState = void 0);
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionCheckPositionState extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments),
      (this.ftl = CharacterUnifiedStateTypes_1.ECharPositionState.Ground);
  }
  OnInit(t) {
    return (this.ftl = t.CondCheckPositionState.PositionState), !0;
  }
  OnTick() {
    this.ResultSelf =
      this.Node.UnifiedStateComponent.PositionState === this.ftl;
  }
  ToString(t, e = 0) {
    super.ToString(t, e),
      t.Append(`有仇恨
`);
  }
}
exports.AiStateMachineConditionCheckPositionState =
  AiStateMachineConditionCheckPositionState;
//# sourceMappingURL=AiStateMachineConditionCheckPositionState.js.map
