"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskSetVar = void 0);
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskSetVar extends LevelAiTask_1.LevelAiTask {
  CreatePlanSteps(e, t) {
    const s = this.Params;
    s.VarLeft.Type !== s.VarRight.Type ||
    s.VarLeft.Source !== "Self" ||
    s.VarRight.Source !== "Constant"
      ? this.PrintDescription("配置错误")
      : this.CIe(t, s.VarLeft.Name, s.VarRight)
        ? e.SubmitCandidatePlanStep(this, t, 0)
        : this.PrintDescription("配置类型错误");
  }
  ExecuteTask() {
    const e = this.Params;
    return e.VarLeft.Type === e.VarRight.Type &&
      e.VarLeft.Source === "Self" &&
      e.VarRight.Source === "Constant" &&
      this.CIe(
        this.CharacterPlanComponent.WorldState,
        e.VarLeft.Name,
        e.VarRight,
      )
      ? 0
      : 1;
  }
  CIe(e, t, s) {
    switch (s.Type) {
      case "Int":
        return e.SetIntWorldState(t, s.Value), !0;
      case "Boolean":
        return e.SetBooleanWorldState(t, s.Value), !0;
      default:
        return !1;
    }
  }
}
exports.LevelAiTaskSetVar = LevelAiTaskSetVar;
// # sourceMappingURL=LevelAiTaskSetVar.js.map
