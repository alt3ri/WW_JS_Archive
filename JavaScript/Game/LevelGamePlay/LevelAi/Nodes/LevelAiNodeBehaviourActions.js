"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiNodeBehaviourActions = void 0);
const LevelAiPlan_1 = require("../LevelAiPlan"),
  LevelAiRegistry_1 = require("../LevelAiRegistry"),
  LevelAiStandaloneNode_1 = require("../LevelAiStandaloneNode"),
  LevelAiTaskSuccess_1 = require("../Tasks/LevelAiTaskSuccess");
class LevelAiNodeBehaviourActions extends LevelAiStandaloneNode_1.LevelAiStandaloneNode {
  constructor() {
    super(...arguments),
      (this.Actions = void 0),
      (this.CanRecordPlanProgress = !1),
      (this.Cost = 0),
      (this.ITe = !1),
      (this.TTe = new LevelAiPlan_1.LevelAiPlanStepId());
  }
  MakePlanExpansions(e, i) {
    var s, t, n;
    void 0 !== this.Actions &&
      (this.PrintDescription(
        "Behaviour Actions Make Plan Expansions",
        ["LevelIndex", e.CurrentLevelIndex],
        ["StepIndex", e.CurrentStepIndex],
      ),
      this.ITe || this.LTe(),
      this.CanRecordPlanProgress || this.TTe.Reset(),
      (s = (n = e.MakePlanCopyWithAddedStep()).PlanCopy),
      (t = n.OutAddedStep),
      (n = n.OutAddedStepId),
      (t.SubLevelIndex = e.AddLevel(s, n)),
      e.SubmitCandidatePlan(s));
  }
  GetNextSteps(e, i) {
    if (!this.TTe.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)) {
      var s = this.TTe.LevelIndex,
        t = this.TTe.StepIndex;
      if ((e.IsExecutingPlan && this.TTe.Reset(), 0 <= s && 0 <= t))
        return void e.AddNextStepsAfter(
          new LevelAiPlan_1.LevelAiPlanStepId(s, t - 1),
        );
    }
    s = e.GetStep(i);
    e.AddNextStepsAfter(new LevelAiPlan_1.LevelAiPlanStepId(s.SubLevelIndex));
  }
  OnSubLevelStepFinished(e, i, s, t, n) {
    return 2 === t && this.TTe.CopyFrom(s), !0;
  }
  LTe() {
    var e = new LevelAiTaskSuccess_1.LevelAiTaskSuccess(),
      i =
        (e.Serialize(
          this.CharacterPlanComponent,
          this.CreatureDataComponent,
          this.Description,
        ),
        (e.Cost = this.Cost),
        this.NextNodes.push(e),
        LevelAiRegistry_1.LevelAiRegistry.Instance());
    let s = e;
    for (let e = 0; e < this.Actions.length; ++e) {
      var t = this.Actions[e],
        n = new (i.FindTaskCtor(t.Name))();
      n.Serialize(
        this.CharacterPlanComponent,
        this.CreatureDataComponent,
        this.Description + " 任务" + e,
        t.Params,
      ),
        s.NextNodes.push(n),
        (s = n);
    }
    this.ITe = !0;
  }
}
exports.LevelAiNodeBehaviourActions = LevelAiNodeBehaviourActions;
//# sourceMappingURL=LevelAiNodeBehaviourActions.js.map
