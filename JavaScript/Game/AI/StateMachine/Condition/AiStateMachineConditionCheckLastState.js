"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionCheckLastState = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionCheckLastState extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments), (this._ne = void 0), (this.cne = void 0);
  }
  OnInit(t) {
    return (this._ne = t.CondCheckLastState.TargetStateName), !0;
  }
  OnTick() {
    this.ResultSelf = this.Node.Owner.CheckLastActivatedNode(this._ne);
  }
  ToString(t, i = 0) {
    super.ToString(t, i),
      this.cne
        ? t.Append(`检查上一帧节点激活 [${this.cne.Name}]
`)
        : t.Append(`检查上一帧节点激活 [${this._ne}] 目标节点不存在`);
  }
}
exports.AiStateMachineConditionCheckLastState =
  AiStateMachineConditionCheckLastState;
//# sourceMappingURL=AiStateMachineConditionCheckLastState.js.map
