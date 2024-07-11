"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionCheckState = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionCheckState extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments),
      (this._ne = void 0),
      (this.une = void 0),
      (this.cne = void 0);
  }
  OnInit(t) {
    return (
      t.CondCheckState
        ? (this.une = t.CondCheckState.TargetState)
        : t.CondCheckStateByName &&
          (this._ne = t.CondCheckStateByName.TargetStateName),
      !0
    );
  }
  OnTick() {
    this.cne ||
      (void 0 !== this.une
        ? (this.cne = this.Node.Owner.GetNodeByUuid(this.une))
        : void 0 !== this._ne &&
          (this.cne = this.Node.Owner.GetNodeByName(this._ne))),
      (this.ResultSelf = this.cne?.Activated ?? !1);
  }
  ToString(t, i = 0) {
    super.ToString(t, i),
      this.cne
        ? t.Append(`检查节点状态 [${this.cne.Name}]
`)
        : t.Append(`检查节点状态 [${this._ne}] 目标节点不存在`);
  }
}
exports.AiStateMachineConditionCheckState = AiStateMachineConditionCheckState;
//# sourceMappingURL=AiStateMachineConditionCheckState.js.map
