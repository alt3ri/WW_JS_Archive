"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionTaskFinish = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionTaskFinish extends AiStateMachineCondition_1.AiStateMachineCondition {
  OnInit(i) {
    return (this.HasTaskFinishCondition = !0);
  }
  OnEnter() {
    this.ResultSelf = this.Node.CurrentLeafNode.TaskFinish;
  }
  OnTick() {
    this.ResultSelf = this.Node.CurrentLeafNode.TaskFinish;
  }
  ToString(i, t = 0) {
    super.ToString(i, t),
      i.Append(`节点任务完成
`);
  }
}
exports.AiStateMachineConditionTaskFinish = AiStateMachineConditionTaskFinish;
//# sourceMappingURL=AiStateMachineConditionTaskFinish.js.map
