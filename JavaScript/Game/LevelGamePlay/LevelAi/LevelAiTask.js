"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTask = void 0);
const LevelAiStandaloneNode_1 = require("./LevelAiStandaloneNode");
class LevelAiTask extends LevelAiStandaloneNode_1.LevelAiStandaloneNode {
  constructor() {
    super(...arguments),
      (this.NotifyTick = !1),
      (this.NotifyTaskFinished = !1),
      (this.Params = void 0);
  }
  Serialize(e, s, t, i) {
    super.Serialize(e, s, t), (this.Params = i);
  }
  MakePlanExpansions(e, s) {
    this.PrintDescription(
      "Task Make Plan Expansions",
      ["LevelIndex", e.CurrentLevelIndex],
      ["StepIndex", e.CurrentStepIndex],
    ),
      this.CreatePlanSteps(e, s.MakeCopy());
  }
  WrappedExecuteTask() {
    return this.PrintDescription("Execute Task"), this.ExecuteTask();
  }
  WrappedAbortTask() {
    return this.PrintDescription("Abort Task"), this.AbortTask();
  }
  WrappedTickTask(e) {
    this.NotifyTick && this.TickTask(e);
  }
  WrappedOnTaskFinished(e) {
    this.NotifyTaskFinished &&
      (this.PrintDescription("Task Finished", ["Result", e]),
      this.OnTaskFinished(e));
  }
  CreatePlanSteps(e, s) {
    e.SubmitCandidatePlanStep(this, s, 0);
  }
  FinishLatentTask(e) {
    var s = this.CharacterPlanComponent.FindActiveTaskInfo(this);
    s && s.PlanInstance.OnTaskFinished(this, s.PlanStepId, e);
  }
  ExecuteTask() {
    return 0;
  }
  AbortTask() {
    return 2;
  }
  TickTask(e) {}
  OnTaskFinished(e) {}
}
exports.LevelAiTask = LevelAiTask;
//# sourceMappingURL=LevelAiTask.js.map
