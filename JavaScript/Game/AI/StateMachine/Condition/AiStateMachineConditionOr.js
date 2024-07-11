"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionOr = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionOr extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments), (this.Conditions = void 0);
  }
  OnInit(i) {
    var e = i.CondOr.Conditions.length;
    if (0 < e) {
      this.Conditions = [];
      for (let t = 0; t < e; t++) {
        var o = i.CondOr.Conditions[t],
          n = this.Transition.ConditionDatas[o],
          n =
            ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateCondition(
              this.Transition,
              n,
              o,
            );
        (this.HasTaskFinishCondition ||= n.HasTaskFinishCondition),
          this.Conditions.push(n);
      }
    }
    return !0;
  }
  OnEnter() {
    for (const t of this.Conditions) t.Enter();
  }
  OnExit() {
    for (const t of this.Conditions) t.Exit();
  }
  OnTick() {
    this.ResultSelf = !1;
    for (const t of this.Conditions) t.Tick(), (this.ResultSelf ||= t.Result);
  }
  OnClear() {
    for (const t of this.Conditions) t.Clear();
    this.Conditions.length = 0;
  }
  HandleServerDebugInfo(i) {
    this.ResultServer = i[this.Index];
    var e = this.Conditions.length;
    for (let t = 0; t < e; t++) this.Conditions[t].HandleServerDebugInfo(i);
  }
  ToString(i, e = 0) {
    super.ToString(i, e),
      i.Append(`或
`);
    var o = this.Conditions.length;
    for (let t = 0; t < o; t++) this.Conditions[t].ToString(i, e + 1);
  }
}
exports.AiStateMachineConditionOr = AiStateMachineConditionOr;
//# sourceMappingURL=AiStateMachineConditionOr.js.map
