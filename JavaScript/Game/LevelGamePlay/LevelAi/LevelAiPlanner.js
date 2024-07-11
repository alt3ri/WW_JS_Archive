"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiPlanner = exports.PlanningContext = void 0);
const Log_1 = require("../../../Core/Common/Log");
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue");
const LevelAiPlan_1 = require("./LevelAiPlan");
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
    const t = this.hTe.MakeCopy();
    var i = t.Levels[this.lTe.LevelIndex];
    const e = new LevelAiPlan_1.LevelAiPlanStep(this.aTe, this._Te);
    var i =
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
    const s = this.hTe.MakeCopy();
    var t = new LevelAiPlan_1.LevelAiPlanStep(t, i, e);
    var i = s.Levels[this.lTe.LevelIndex];
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
    let t;
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
    this.dTe ||
      ((this.uTe = this.fTe()),
      void 0 === this.uTe
        ? this.pTe()
        : this.uTe.IsComplete()
          ? ((this.mTe = this.uTe), this.pTe())
          : this.vTe());
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
      let t;
      const i = this.uTe.GetNextNodes(this.lTe);
      const e = this.uTe.GetWorldState(this.lTe);
      for (const s of i)
        (this.RIe.WorldStateProxy = e),
          LevelAiPlanner.STe(s) &&
            ((t = new PlanningContext(this, s, this.uTe, this.lTe, e)),
            s.MakePlanExpansions(t, e));
      this.MTe();
    }
  }
  static STe(t) {
    return !!((t) => {
      let i = 1;
      for (const s of t)
        if (s) {
          const e = s.WrappedCheckCondition(0);
          if ((i = Math.min(i, e)) !== 1) return !1;
        }
      return !0;
    })(t.Decorators);
  }
  SubmitCandidatePlan(t) {
    this.CTe.Push(t);
  }
}
exports.LevelAiPlanner = LevelAiPlanner;
// # sourceMappingURL=LevelAiPlanner.js.map
