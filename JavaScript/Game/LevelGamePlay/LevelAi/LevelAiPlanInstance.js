"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiPlanInstance = exports.GetNextStepsContext = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const LevelAiDefines_1 = require("./LevelAiDefines");
const LevelAiPlan_1 = require("./LevelAiPlan");
const LevelAiPlanner_1 = require("./LevelAiPlanner");
class GetNextStepsContext {
  constructor(t, i, e) {
    (this.IIe = t), (this.IsExecutingPlan = i), (this.TIe = e), (this.LIe = 0);
  }
  SubmitPlanStep(t) {
    this.TIe.push(t), ++this.LIe;
  }
  AddNextStepsAfter(i) {
    if (!this.IIe.HasLevel(i.LevelIndex)) return 0;
    const e = this.LIe;
    const s = this.IIe.Levels[i.LevelIndex];
    for (let t = i.StepIndex + 1; t < s.Steps.length; ++t) {
      const r = s.Steps[t];
      const h = new LevelAiPlan_1.LevelAiPlanStepId(i.LevelIndex, t);
      if ((r.Node.GetNextSteps(this, h), this.LIe - e > 0)) return this.LIe - e;
    }
    return s.ParentStepId.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)
      ? this.LIe - e
      : this.AddNextStepsAfter(s.ParentStepId);
  }
  GetNumSubmittedSteps() {
    return this.LIe;
  }
  GetStep(t) {
    return this.IIe.GetStep(t);
  }
}
exports.GetNextStepsContext = GetNextStepsContext;
class LevelAiPlanInstance {
  constructor() {
    (this.DIe = 0),
      (this.RIe = void 0),
      (this.UIe = new Array()),
      (this.AIe = new Array()),
      (this.PIe = new Array()),
      (this.xIe = void 0),
      (this.wIe = void 0),
      (this.BIe = !1),
      (this.kC = !0),
      (this.bIe = void 0),
      (this.qIe = (t, i) => {
        let e;
        this.RIe &&
          t === this.wIe &&
          ((e = t.WasCanceled),
          t.Clear(),
          (this.wIe = void 0),
          e
            ? this.Stop()
            : this.DIe === 1 &&
              (i
                ? this.GIe(i) ||
                  (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "LevelAi",
                      30,
                      "[OnPlanningTaskFinished] 执行规划失败",
                    ),
                  this.Stop())
                : (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "LevelAi",
                      30,
                      "[OnPlanningTaskFinished] 没有有效的规划",
                    ),
                  this.Stop())));
      });
  }
  Initialize(t) {
    this.RIe = t;
  }
  IsPlanning() {
    return void 0 !== this.wIe;
  }
  HasPlan() {
    return void 0 !== this.xIe && this.BIe;
  }
  HasActiveTasks() {
    return this.UIe.length > 0 || this.AIe.length > 0 || this.PIe.length > 0;
  }
  HasActivePlan() {
    return this.HasPlan() && this.HasActiveTasks();
  }
  CanLoop() {
    return this.kC && !this.RIe.Paused;
  }
  Start() {
    this.DIe === 1
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("LevelAi", 30, "[Start] 执行中，忽略开始调用")
      : ((this.DIe = 1),
        (this.bIe = void 0),
        this.NIe(),
        this.CancelActivePlanning(),
        this.OIe());
  }
  Tick(t) {
    this.DIe !== 1 || this.HasActivePlan() || this.IsPlanning() || this.OIe(),
      this.DIe === 1 &&
        !this.HasActivePlan() &&
        this.IsPlanning() &&
        this.wIe.DoPlanning(),
      this.HasActivePlan() && this.kIe(t);
  }
  Stop() {
    this.DIe !== 1
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("LevelAi", 30, "[Stop] 未执行，忽略停止调用")
      : (this.CancelActivePlanning(), this.AbortCurrentPlan());
  }
  Pause() {
    this.DIe !== 1
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("LevelAi", 30, "[Pause] 未执行，忽略Pause调用")
      : (!this.IsPlanning() && this.HasActiveTasks() && (this.bIe = this.xIe),
        this.CancelActivePlanning(),
        this.AbortCurrentPlan());
  }
  Resume() {
    this.DIe === 1
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("LevelAi", 30, "[Resume] 执行中，忽略Resume调用")
      : ((this.DIe = 1),
        this.NIe(),
        this.CancelActivePlanning(),
        this.FIe() ? this.GIe(this.bIe) : this.OIe(),
        (this.bIe = void 0));
  }
  RecheckCurrentPlan() {
    let t = void 0;
    for (
      this.BIe
        ? (t = this.UIe.concat())
        : ((t = new Array()),
          this.VIe(t, new LevelAiPlan_1.LevelAiPlanStepId(0), !1));
      t.length > 0;

    ) {
      const i = t.pop();
      if (!this.HIe(i, !1, !0)) return !1;
    }
    return !0;
  }
  RePlan() {
    this.DIe !== 1
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("LevelAi", 30, "[RePlan] 未执行，忽略RePlan调用")
      : (this.AbortCurrentPlan(), this.IsPlanning() || this.OIe());
  }
  AbortCurrentPlan() {
    if (this.HasPlan()) {
      for (let t = this.AIe.length - 1; t >= 0; --t) {
        const i = this.AIe[t];
        this.AIe.splice(t, 1), this.jIe(i, 2);
      }
      if (this.UIe.length > 0)
        for (let t = this.UIe.length - 1; t >= 0; --t) this.WIe(this.UIe[t]);
      else this.KIe();
    }
  }
  CancelActivePlanning() {
    this.IsPlanning() &&
      (this.wIe.CancelPlanning(), this.wIe) &&
      (this.wIe.Clear(), (this.wIe = void 0));
  }
  OIe() {
    this.IsPlanning()
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelAi", 30, "[StartPlanning] 规划中，重复调用")
      : this.RIe &&
        this.RIe.GetCurrentLevelAiAsset() &&
        ((this.wIe = new LevelAiPlanner_1.LevelAiPlanner()),
        this.wIe.SetUp(this.RIe.GetCurrentLevelAiAsset(), this.RIe),
        (this.wIe.OnPlanningFinished = this.qIe),
        this.wIe.StartPlanning());
  }
  GIe(t) {
    return (
      !!t &&
      !(
        !this.RIe ||
        !this.RIe.GetCurrentLevelAiAsset() ||
        (LevelAiDefines_1.LEVEL_AI_DEBUG_MODE &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("LevelAi", 30, "Start Execute Plan"),
        this.QIe(t),
        this.RecheckCurrentPlan()
          ? ((t =
              this.VIe(this.AIe, new LevelAiPlan_1.LevelAiPlanStepId(0)) > 0),
            (this.BIe = !0),
            t ? this.XIe() : this.$Ie(),
            0)
          : (this.NIe(), 1))
      )
    );
  }
  XIe() {
    const t = this.AIe[0];
    void 0 !== t && (this.AIe.splice(0, 1), this.YIe(t));
  }
  YIe(i) {
    if (!this.HasPlan())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelAi", 30, "[StartExecuteTask] 当前没有规划"),
        1
      );
    const t = this.xIe.GetStep(i).Node;
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelAi", 30, "[StartExecuteTask] 执行了非Task节点"),
        1
      );
    LevelAiDefines_1.LEVEL_AI_DEBUG_MODE &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("LevelAi", 30, "Start Execute Task");
    const e = new Array();
    this.JIe(e, i);
    for (let t = e.length - 1; t >= 0; --t) {
      const s = e[t];
      if (!this.zIe(s, 2)) return this.jIe(i, 2), this.AbortCurrentPlan(), 1;
      this.ZIe(s);
    }
    this.UIe.push(i);
    const r = t.WrappedExecuteTask();
    return r !== 3 && this.OnTaskFinished(t, i, r), r;
  }
  kIe(i) {
    this.XIe();
    const t = (t) => {
      return this.HIe(t, !0, !1)
        ? (this.eTe(t).WrappedTickTask(i), !0)
        : (this.AbortCurrentPlan(), !1);
    };
    for (const e of this.UIe.concat())
      if (this.UIe.includes(e) && !t(e)) return;
  }
  HIe(t, i, e) {
    const s = i || e;
    const r = new Array();
    this.tTe(r, t);
    for (let t = r.length - 1; t >= 0; --t) {
      const h = r[t];
      if (s) if (!this.zIe(h, e ? 1 : 2)) return !1;
    }
    return !0;
  }
  WIe(t) {
    const i = this.eTe(t);
    var e = this.UIe.indexOf(t);
    var e = (this.UIe.splice(e, 1), this.UIe.push(t), i.WrappedAbortTask());
    e !== 2
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelAi", 30, "[AbortExecutingPlanStep] 失败")
      : e === 2 && this.OnTaskFinished(i, t, e);
  }
  OnTaskFinished(t, i, e) {
    t
      ? this.HasPlan()
        ? (t.WrappedOnTaskFinished(e),
          this.iTe(i, e),
          e === 0 && this.VIe(this.AIe, i),
          this.jIe(i, e),
          (t = this.UIe.indexOf(i)),
          this.UIe.splice(t, 1),
          e === 0
            ? this.HasActiveTasks() || this.$Ie()
            : e === 2
              ? ((t = this.UIe.indexOf(i)),
                this.PIe.splice(t, 1),
                this.HasActiveTasks() || this.KIe())
              : this.AbortCurrentPlan())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelAi", 30, "[OnTaskFinished] Plan无效")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelAi", 30, "[OnTaskFinished] Task无效");
  }
  NotifyEventBasedDecoratorCondition(t, i) {
    return (
      !!this.HasActivePlan() &&
      !i &&
      (t.PrintDescription(
        "[NotifyEventBasedDecoratorCondition] Decorator通知RePlan",
      ),
      this.RePlan(),
      !0)
    );
  }
  iTe(t, i) {
    let e, s, r;
    this.UIe.length === 0 ||
      ((e = (s = this.xIe.Levels[t.LevelIndex]).ParentStepId),
      (s = i === 0 && t.StepIndex === s.Steps.length - 1),
      e.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)) ||
      ((r = this.xIe.GetStep(e)).Node &&
        r.Node.OnSubLevelStepFinished(this, e, t, i, s) &&
        this.iTe(e, i));
  }
  KIe() {
    this.CanLoop() ? (this.DIe = 1) : (this.DIe = 3), this.NIe();
  }
  $Ie() {
    this.CanLoop() ? (this.DIe = 1) : (this.DIe = 2), this.NIe();
  }
  QIe(t) {
    if (this.xIe)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelAi",
          30,
          "[OnPlanningTaskFinished] 初始化规划失败，当前规划正在运行",
        );
    else {
      this.xIe = t;
      for (const i of this.xIe.Levels)
        for (const e of i.Steps) {
          e.SubNodesInfo.SubDecorators.length = 0;
          for (const s of e.Node.Decorators)
            e.SubNodesInfo.SubDecorators.push(s);
        }
    }
  }
  NIe() {
    if (this.xIe) {
      for (const t of this.xIe.Levels)
        for (const i of t.Steps) i.SubNodesInfo.SubDecorators.length = 0;
      this.xIe = void 0;
    }
    (this.UIe.length = 0),
      (this.AIe.length = 0),
      (this.PIe.length = 0),
      (this.BIe = !1);
  }
  eTe(t) {
    return this.xIe.GetStep(t).Node;
  }
  VIe(t, i, e = !0) {
    e = new GetNextStepsContext(this.xIe, e, t);
    return e.AddNextStepsAfter(i), e.GetNumSubmittedSteps();
  }
  JIe(i, e) {
    if (this.xIe && this.xIe.HasStep(e)) {
      let t = e;
      for (;;) {
        const s = this.xIe.Levels[t.LevelIndex];
        const r = s.Steps[t.StepIndex];
        if (
          r.SubNodesInfo.SubNodesExecuting ||
          (i.push(r.SubNodesInfo), !(t.LevelIndex > 0))
        )
          break;
        t = s.ParentStepId;
      }
    }
  }
  tTe(i, e) {
    if (this.xIe && this.xIe.HasStep(e)) {
      let t = e;
      for (;;) {
        const s = this.xIe.Levels[t.LevelIndex];
        const r = s.Steps[t.StepIndex];
        if (
          !(
            r.SubNodesInfo.LastFrameSubNodesTicked !== Time_1.Time.Frame &&
            (i.push(r.SubNodesInfo), t.LevelIndex > 0)
          )
        )
          break;
        t = s.ParentStepId;
      }
    }
  }
  oTe(e, t) {
    if (this.xIe && this.xIe.HasStep(t)) {
      let i = t;
      for (;;) {
        const s = this.xIe.Levels[i.LevelIndex];
        const r = s.Steps[i.StepIndex];
        if (r.SubNodesInfo.SubNodesExecuting) {
          e.push(r.SubNodesInfo);
          let t = !0;
          for (const h of this.AIe)
            (h.LevelIndex === i.LevelIndex && h.StepIndex <= i.StepIndex) ||
              (this.xIe.HasStep(h, i.LevelIndex) && (t = !1));
          if (t && i.LevelIndex > 0) {
            i = s.ParentStepId;
            continue;
          }
        }
        break;
      }
    }
  }
  rTe(i, e) {
    if (this.xIe && this.xIe.HasStep(e)) {
      let t = e;
      for (;;) {
        const s = this.xIe.Levels[t.LevelIndex];
        const r = s.Steps[t.StepIndex];
        if (
          !(
            r.SubNodesInfo.SubNodesExecuting &&
            (i.push(r.SubNodesInfo), t.LevelIndex > 0)
          )
        )
          break;
        t = s.ParentStepId;
      }
    }
  }
  zIe(t, i) {
    if (!this.xIe) return !1;
    for (const e of t.SubDecorators)
      if (e.WrappedCheckCondition(i) === 0) return !1;
    return !0;
  }
  ZIe(t) {
    let i;
    if (t.SubNodesExecuting)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelAi",
          30,
          "[StartSubNodesInSubNodeGroup] 错误的调用，子节点执行中",
        );
    else {
      t.SubNodesExecuting = !0;
      for (const e of t.SubDecorators) (i = e) && i.WrappedExecutionStart();
    }
  }
  jIe(t, i) {
    const e = new Array();
    switch (i) {
      case 0:
        this.oTe(e, t);
        break;
      case 1:
      case 2:
        this.rTe(e, t);
        break;
      case 3:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelAi",
            30,
            "[FinishSubNodesAtPlanStep] 错误的调用，结束时节点状态为InProgress",
          );
    }
    for (const s of e) this.nTe(s, i);
  }
  nTe(t, i) {
    if (t.SubNodesExecuting) {
      t.SubNodesExecuting = !1;
      let e;
      const s = t.SubDecorators;
      for (let t = s.length - 1; t >= 0; --t)
        (e = s[t]) && e.WrappedExecutionFinish(i);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelAi",
          30,
          "[FinishSubNodesInSubNodeGroup] 错误的调用，子节点非执行中",
        );
  }
  FindActiveTaskInfo(i) {
    let t;
    if (this.HasActivePlan())
      return (
        (t = void 0),
        (t =
          (t = this.UIe.find((t) => i === this.eTe(t))) ||
          this.PIe.find((t) => i === this.eTe(t)))
          ? { PlanInstance: this, PlanStepId: t }
          : void 0
      );
  }
  FindActiveDecoratorInfo(s) {
    if (this.HasActivePlan()) {
      const r = new Array();
      let t;
      const i = (t) => {
        (r.length = 0), this.xIe.GetSubNodesAtPlanStep(t, r);
        for (const i of r) for (const e of i.SubDecorators) return e === s;
        return !1;
      };
      return (t = this.UIe.find(i))
        ? { PlanInstance: this, PlanStepId: t }
        : (t = this.PIe.find(i))
          ? { PlanInstance: this, PlanStepId: t }
          : void 0;
    }
  }
  FIe() {
    return void 0 !== this.bIe;
  }
}
exports.LevelAiPlanInstance = LevelAiPlanInstance;
// # sourceMappingURL=LevelAiPlanInstance.js.map
