"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionAnd = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionAnd extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments), (this.Conditions = void 0);
  }
  OnInit(i) {
    var e = i.CondAnd.Conditions.length;
    if (0 < e) {
      this.Conditions = [];
      for (let t = 0; t < e; t++) {
        var n = i.CondAnd.Conditions[t],
          o = this.Transition.ConditionDatas[n],
          o =
            ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateCondition(
              this.Transition,
              o,
              n,
            );
        (this.HasTaskFinishCondition ||= o.HasTaskFinishCondition),
          this.Conditions.push(o);
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
    this.ResultSelf = !0;
    for (const t of this.Conditions) t.Tick(), (this.ResultSelf &&= t.Result);
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
      i.Append(`与
`);
    var n = this.Conditions.length;
    for (let t = 0; t < n; t++) this.Conditions[t].ToString(i, e + 1);
  }
}
exports.AiStateMachineConditionAnd = AiStateMachineConditionAnd;
//# sourceMappingURL=AiStateMachineConditionAnd.js.map
