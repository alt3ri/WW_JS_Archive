"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiPlan =
    exports.LevelAiPlanLevel =
    exports.LevelAiPlanStep =
    exports.SubNodesInfo =
    exports.LevelAiPlanStepId =
      void 0);
const Log_1 = require("../../../Core/Common/Log");
class LevelAiPlanStepId {
  constructor(t = -1, e = -1) {
    (this.LevelIndex = t), (this.StepIndex = e);
  }
  Reset() {
    (this.LevelIndex = -1), (this.StepIndex = -1);
  }
  CopyFrom(t) {
    (this.LevelIndex = t.LevelIndex), (this.StepIndex = t.StepIndex);
  }
  Equal(t) {
    return this.LevelIndex === t.LevelIndex && this.StepIndex === t.StepIndex;
  }
  static Equal(t, e) {
    return t.LevelIndex === e.LevelIndex && t.StepIndex === e.StepIndex;
  }
}
(exports.LevelAiPlanStepId = LevelAiPlanStepId).None = new LevelAiPlanStepId(
  -1,
  -1,
);
class SubNodesInfo {
  constructor() {
    (this.SubDecorators = new Array()),
      (this.LastFrameSubNodesTicked = -1),
      (this.SubNodesExecuting = !1);
  }
}
exports.SubNodesInfo = SubNodesInfo;
class LevelAiPlanStep {
  constructor(t, e, s = 0, i = -1) {
    (this.Node = t),
      (this.WorldState = e),
      (this.SubNodesInfo = new SubNodesInfo()),
      (this.SubLevelIndex = i),
      (this.Cost = Math.max(0, s));
  }
}
exports.LevelAiPlanStep = LevelAiPlanStep;
class LevelAiPlanLevel {
  constructor(t, e = LevelAiPlanStepId.None) {
    (this.Steps = new Array()),
      (this.WorldStateAtLevelStart = t),
      (this.RootSubNodesInfo = new SubNodesInfo()),
      (this.ParentStepId = new LevelAiPlanStepId()),
      this.ParentStepId.CopyFrom(e),
      (this.Cost = 0);
  }
  MakeCopy() {
    var e = new LevelAiPlanLevel(
      this.WorldStateAtLevelStart,
      this.ParentStepId,
    );
    e.Steps.length = this.Steps.length;
    for (let t = 0; t < this.Steps.length; ++t) e.Steps[t] = this.Steps[t];
    return (e.Cost = this.Cost), e;
  }
}
exports.LevelAiPlanLevel = LevelAiPlanLevel;
class LevelAiPlan {
  constructor(t, e) {
    (this.Levels = new Array()),
      (this.yIe = t),
      e && this.Levels.push(new LevelAiPlanLevel(e)),
      (this.Cost = 0);
  }
  HasLevel(t) {
    return t < this.Levels.length && void 0 !== this.Levels[t];
  }
  HasStep(t, e = 0) {
    var s;
    return (
      !(!this.HasLevel(t.LevelIndex) || !this.HasLevel(e)) &&
      (t.LevelIndex === e
        ? ((s = this.Levels[e]),
          t.StepIndex < s.Steps.length && void 0 !== s.Steps[t.StepIndex])
        : 0 !== t.LevelIndex &&
          this.HasStep(this.Levels[t.LevelIndex].ParentStepId, e))
    );
  }
  GetStep(t) {
    if (t) {
      var e = this.Levels[t.LevelIndex];
      if (e) return e.Steps[t.StepIndex];
    }
  }
  IsComplete() {
    for (let t = 0; t < this.Levels.length; ++t)
      if (!this.IsLevelComplete(t)) return !1;
    return !0;
  }
  IsLevelComplete(t) {
    var e;
    return !(
      !this.HasLevel(t) ||
      0 === (t = this.Levels[t]).Steps.length ||
      ((e = t.Steps.length - 1),
      (e = -1 !== (t = t.Steps[e]).SubLevelIndex) ||
      (void 0 !== t.Node && !t.Node.PlanNextNodesAfterThis)
        ? e && !this.IsLevelComplete(t.SubLevelIndex)
        : 0 !== t.Node.NextNodes.length)
    );
  }
  FindStepToAddAfter(e) {
    for (let t = this.Levels.length - 1; 0 <= t; --t) {
      var s;
      if (!this.IsLevelComplete(t))
        return (
          (s = this.Levels[t]),
          (e.LevelIndex = t),
          (e.StepIndex = s.Steps.length ? s.Steps.length - 1 : -1),
          !0
        );
    }
    return e.Reset(), !1;
  }
  GetNextNodes(t) {
    var e,
      s = this.Levels[t.LevelIndex];
    return -1 === t.StepIndex
      ? s.ParentStepId.Equal(LevelAiPlanStepId.None)
        ? this.yIe.StartNodes.values()
        : (e = this.GetStep(s.ParentStepId))
          ? e.Node.NextNodes.values()
          : void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error("LevelAi", 30, "子层的父节点未定义")
            )
      : s.Steps[t.StepIndex].Node.NextNodes.values();
  }
  GetWorldState(t) {
    var e = this.Levels[t.LevelIndex];
    return -1 === t.StepIndex
      ? e.WorldStateAtLevelStart
      : e.Steps[t.StepIndex].WorldState;
  }
  MakeCopy() {
    var e = new LevelAiPlan(this.yIe, void 0);
    e.Levels.length = this.Levels.length;
    for (let t = 0; t < this.Levels.length; ++t)
      e.Levels[t] = this.Levels[t].MakeCopy();
    return (e.Cost = this.Cost), e;
  }
  GetSubNodesAtPlanStep(e, s) {
    if (this.HasStep(e)) {
      let t = e;
      for (;;) {
        var i = this.Levels[t.LevelIndex],
          r = i.Steps[t.StepIndex];
        if (
          (s.push(r.SubNodesInfo),
          s.push(i.RootSubNodesInfo),
          !(0 < t.LevelIndex))
        )
          break;
        t = i.ParentStepId;
      }
    }
  }
}
exports.LevelAiPlan = LevelAiPlan;
//# sourceMappingURL=LevelAiPlan.js.map
