"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionTimer = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionTimer extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments), (this.pne = -0), (this.vne = -0);
  }
  OnInit(t) {
    return (
      (this.pne = t.CondTimer.MinTime), (this.vne = t.CondTimer.MaxTime), !0
    );
  }
  ToString(t, i = 0) {
    super.ToString(t, i),
      t.Append(`延迟 [时间:${(this.pne / 1e3).toFixed(1)}-${(this.vne / 1e3).toFixed(1)}]
`);
  }
}
exports.AiStateMachineConditionTimer = AiStateMachineConditionTimer;
// # sourceMappingURL=AiStateMachineConditionTimer.js.map
