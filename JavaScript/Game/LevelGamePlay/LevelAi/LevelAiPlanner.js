"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiPlanner = exports.PlanningContext = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  PriorityQueue_1 = require("../../../Core/Container/PriorityQueue"),
  LevelAiPlan_1 = require("./LevelAiPlan");
class PlanningContext {
  constructor(t, i, e, s, n) {
    (this.sTe = void 0),
      (this.aTe = void 0),
      (this.hTe = void 0),
      (this.lTe = void 0),
      (this._Te = void 0),
      (this.sTe = t),
      (this.aTe = i),
      (this.hTe = e),
      (this.lTe = s),
      (this._Te = n);
  }
  get CurrentLevelIndex() {
    return this.lTe.LevelIndex;
  }
  get CurrentStepIndex() {
    return this.lTe.StepIndex;
  }
  MakePlanCopyWithAddedStep() {
    var t = this.hTe.MakeCopy(),
      i = t.Levels[this.lTe.LevelIndex],
      e = new LevelAiPlan_1.LevelAiPlanStep(this.aTe, this._Te),
      i =
        (i.Steps.push(e),
        new LevelAiPlan_1.LevelAiPlanStepId(
          this.lTe.LevelIndex,
          i.Steps.length - 1,
        ));
    return { PlanCopy: t, OutAddedStep: e, OutAddedStepId: i };
  }
  AddLevel(t, i = LevelAiPlan_1.LevelAiPlanStepId.None) {
    return t.Levels.push(new LevelAiPlan_1.LevelAiPlanLevel(this._Te, i)) - 1;
  }
  SubmitCandidatePlanStep(t, i, e) {
    var s = this.hTe.MakeCopy(),
      t = new LevelAiPlan_1.LevelAiPlanStep(t, i, e),
      i = s.Levels[this.lTe.LevelIndex];
    i.Steps.push(t), (i.Cost += e), (s.Cost += e), this.SubmitCandidatePlan(s);
  }
  SubmitCandidatePlan(t) {
    this.sTe.SubmitCandidatePlan(t);
  }
}
exports.PlanningContext = PlanningContext;
class LevelAiPlanner {
  constructor() {
    (this.RIe = void 0),
      (this.uTe = void 0),
      (this.lTe = new LevelAiPlan_1.LevelAiPlanStepId()),
      (this.cTe = void 0),
      (this.mTe = void 0),
      (this.dTe = !1),
      (this.CTe = new PriorityQueue_1.PriorityQueue((t, i) => t.Cost - i.Cost)),
      (this.gTe = !1),
      (this.OnPlanningFinished = void 0);
  }
  get WasCanceled() {
    return this.dTe;
  }
  SetUp(t, i) {
    (this.RIe = i),
      (this.cTe = new LevelAiPlan_1.LevelAiPlan(
        t,
        this.RIe.WorldState.MakeCopy(),
      ));
  }
  StartPlanning() {
    var t;
    this.gTe ||
      ((t = this.cTe),
      this.Clear(),
      this.CTe.Push(t),
      (this.gTe = !0),
      this.DoPlanning());
  }
  CancelPlanning() {
    (this.dTe = !0), (this.mTe = void 0), (this.gTe = !1);
  }
  DoPlanning() {
    if (!this.dTe)
      for (;;) {
        if (((this.uTe = this.fTe()), void 0 === this.uTe))
          return void this.pTe();
        if (this.uTe.IsComplete())
          return (this.mTe = this.uTe), void this.pTe();
        this.vTe();
      }
  }
  pTe() {
    this.MTe(),
      this.CTe.Clear(),
      this.OnPlanningFinished(this, this.mTe),
      (this.gTe = !1);
  }
  Clear() {
    this.MTe(), (this.cTe = void 0), this.CTe.Clear(), (this.mTe = void 0);
  }
  MTe() {
    (this.uTe = void 0), this.lTe.Reset();
  }
  fTe() {
    if (!this.CTe.Empty) return this.CTe.Pop();
  }
  vTe() {
    if (
      !this.uTe.FindStepToAddAfter(this.lTe) ||
      this.lTe.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)
    )
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelAi", 30, "没有未完成的任务层", [
          "Owner",
          this.RIe.GetCreatureDataComponent().GetPbDataId(),
        ]);
    else {
      var t,
        i = this.uTe.GetNextNodes(this.lTe),
        e = this.uTe.GetWorldState(this.lTe);
      for (const s of i)
        (this.RIe.WorldStateProxy = e),
          LevelAiPlanner.ETe(s) &&
            ((t = new PlanningContext(this, s, this.uTe, this.lTe, e)),
            s.MakePlanExpansions(t, e));
      this.MTe();
    }
  }
  static ETe(t) {
    return !!((t) => {
      let i = 1;
      for (const s of t)
        if (s) {
          var e = s.WrappedCheckCondition(0);
          if (1 !== (i = Math.min(i, e))) return !1;
        }
      return !0;
    })(t.Decorators);
  }
  SubmitCandidatePlan(t) {
    this.CTe.Push(t);
  }
}
exports.LevelAiPlanner = LevelAiPlanner;
//# sourceMappingURL=LevelAiPlanner.js.map
