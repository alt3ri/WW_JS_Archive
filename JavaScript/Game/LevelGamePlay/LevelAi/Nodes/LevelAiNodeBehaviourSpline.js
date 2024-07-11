"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiNodeBehaviourSpline = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const GameSplineComponent_1 = require("../../Common/GameSplineComponent");
const LevelAiDecoratorCompareVar_1 = require("../Decorators/LevelAiDecoratorCompareVar");
const LevelAiPlan_1 = require("../LevelAiPlan");
const LevelAiRegistry_1 = require("../LevelAiRegistry");
const LevelAiStandaloneNode_1 = require("../LevelAiStandaloneNode");
const LevelAiTaskMoveAlong_1 = require("../Tasks/LevelAiTaskMoveAlong");
const LevelAiTaskSetVar_1 = require("../Tasks/LevelAiTaskSetVar");
const LevelAiTaskSuccess_1 = require("../Tasks/LevelAiTaskSuccess");
const MAX_DISTANCE = 200;
class SelfVarCompareParam {
  constructor(e, t) {
    (this.Var1 = { Type: "Boolean", Source: "Self", Name: "DEFAULT_STATE" }),
      (this.Compare = "Eq"),
      (this.Var2 = { Type: "Boolean", Source: "Constant", Value: !0 }),
      (this.Type = "CompareVar"),
      (this.Var1.Name = e),
      (this.Var2.Value = t);
  }
}
class SelfVarSetParam {
  constructor(e, t) {
    (this.VarLeft = { Type: "Boolean", Source: "Self", Name: "DEFAULT_STATE" }),
      (this.VarRight = { Type: "Boolean", Source: "Constant", Value: !0 }),
      (this.VarLeft.Name = e),
      (this.VarRight.Value = t);
  }
}
class LevelAiNodeBehaviourSpline extends LevelAiStandaloneNode_1.LevelAiStandaloneNode {
  constructor() {
    super(...arguments),
      (this.SplineId = void 0),
      (this.CanRecordPlanProgress = !1),
      (this.Cost = 0),
      (this.DTe = !1),
      (this.TTe = new LevelAiPlan_1.LevelAiPlanStepId()),
      (this.jye = Vector_1.Vector.Create()),
      (this.RTe = Vector_1.Vector.Create());
  }
  MakePlanExpansions(e, t) {
    let i, s, r;
    void 0 !== this.SplineId &&
      (this.PrintDescription(
        "Behaviour Spline Make Plan Expansions",
        ["LevelIndex", e.CurrentLevelIndex],
        ["StepIndex", e.CurrentStepIndex],
      ),
      this.DTe || this.HC(),
      this.CanRecordPlanProgress || this.TTe.Reset(),
      (i = (r = e.MakePlanCopyWithAddedStep()).PlanCopy),
      (s = r.OutAddedStep),
      (r = r.OutAddedStepId),
      (s.SubLevelIndex = e.AddLevel(i, r)),
      e.SubmitCandidatePlan(i));
  }
  GetNextSteps(e, t) {
    if (!this.TTe.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)) {
      var i = this.TTe.LevelIndex;
      const s = this.TTe.StepIndex;
      if ((e.IsExecutingPlan && this.TTe.Reset(), i >= 0 && s >= 0))
        return void e.AddNextStepsAfter(
          new LevelAiPlan_1.LevelAiPlanStepId(i, s - 1),
        );
    }
    i = e.GetStep(t);
    e.AddNextStepsAfter(new LevelAiPlan_1.LevelAiPlanStepId(i.SubLevelIndex));
  }
  OnSubLevelStepFinished(e, t, i, s, r) {
    return s === 2 && this.TTe.CopyFrom(i), !0;
  }
  HC() {
    const a = new GameSplineComponent_1.GameSplineComponent(this.SplineId);
    if (a.Initialize())
      if (a.Option.Type !== IComponent_1.ESplineType.LevelAI)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelAi",
            30,
            "[LevelAiTaskMoveWithSpline] SplineComponent配置类型不是LevelAI",
            ["EntityId", this.CreatureDataComponent.GetPbDataId()],
            ["SplineEntityId", this.SplineId],
          );
      else {
        const n = new LevelAiTaskSuccess_1.LevelAiTaskSuccess();
        const l =
          (n.Serialize(
            this.CharacterPlanComponent,
            this.CreatureDataComponent,
            this.Description,
          ),
          (n.Cost = this.Cost),
          this.NextNodes.push(n),
          a.GetNumberOfSplinePoints());
        let i = 0;
        const h = this.UTe(a.Option.Points, a);
        let s = !1;
        let r = [];
        const v = a.Option.UsePathFinding ?? !1;
        let o = 0;
        for (let t = 0; t < l; ++t) {
          const _ = t;
          var A = a.Option.Points[t];
          if (
            (r.push(A), (A.Actions && A.Actions.length !== 0) || _ === l - 1)
          ) {
            var A = this.ATe(a, r, i, _, v);
            let L = "INTERNAL_PATROL_" + o.toString();
            var p =
              (h >= i &&
                h <= _ &&
                !s &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "LevelAi",
                    43,
                    "选择初始的移动状态",
                    ["EntityId", this.CreatureDataComponent.GetPbDataId()],
                    ["最近的点", h],
                    ["当前状态名称", L],
                  ),
                (s = !0),
                this.CharacterPlanComponent.WorldState.SetBooleanWorldState(
                  L,
                  !0,
                )),
              new SelfVarCompareParam(L, !0));
            var S =
              new LevelAiDecoratorCompareVar_1.LevelAiDecoratorCompareVar();
            var p =
              (S.Serialize(
                this.CharacterPlanComponent,
                this.CreatureDataComponent,
                "检查巡逻状态 " + L,
                p,
              ),
              A.First.Decorators.push(S),
              new SelfVarSetParam(L, !1));
            var S = new LevelAiTaskSetVar_1.LevelAiTaskSetVar();
            S.Serialize(
              this.CharacterPlanComponent,
              this.CreatureDataComponent,
              "设置当前巡逻状态 " + L,
              p,
            ),
              A.Last.NextNodes.push(S);
            let e = "INTERNAL_PATROL_" + (++o).toString();
            _ === l - 1 && (e = "INTERNAL_PATROL_0");
            (L = new SelfVarSetParam(e, !0)),
              (p = new LevelAiTaskSetVar_1.LevelAiTaskSetVar());
            p.Serialize(
              this.CharacterPlanComponent,
              this.CreatureDataComponent,
              "设置下个巡逻状态 " + e,
              L,
            ),
              S.NextNodes.push(p),
              n.NextNodes.push(A.First),
              (r = []),
              (i = t + 1);
          }
        }
        this.DTe = !0;
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelAi",
          43,
          "[LevelAiTaskMoveWithSpline] GameSplineComponent初始化失败",
          ["EntityId", this.CreatureDataComponent.GetPbDataId()],
          ["SplineEntityId", this.SplineId],
        );
  }
  ATe(t, i, s, e, r) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelAi",
        43,
        "生成MoveAlongStep",
        ["EntityId", this.CreatureDataComponent.GetPbDataId()],
        ["startIndex", s],
        ["endIndex", e],
      );
    const o = new LevelAiTaskMoveAlong_1.LevelAiTaskMoveAlong();
    const a =
      (o.Serialize(
        this.CharacterPlanComponent,
        this.CreatureDataComponent,
        this.Description + " 样条路径" + s + "到" + e,
      ),
      []);
    for (let e = 0; e < i.length; e++) {
      const n = i[e];
      const l = {
        Index: e,
        Position: Vector_1.Vector.Create(),
        MoveSpeed: n.MoveSpeed,
        MoveState: 1,
      };
      switch (n.MoveState) {
        case IComponent_1.EPatrolMoveState.Walk:
          l.MoveState = 1;
          break;
        case IComponent_1.EPatrolMoveState.Run:
          l.MoveState = 2;
      }
      l.Position.DeepCopy(t.GetWorldLocationAtSplinePoint(s + e)), a.push(l);
    }
    (o.PathPoint = a), (o.Navigation = r);
    var r = i[i.length - 1];
    return r.Actions && r.Actions.length !== 0
      ? ((r = this.PTe(r.Actions, e)),
        o.NextNodes.push(r.First),
        { First: o, Last: r.Last })
      : { First: o, Last: o };
  }
  UTe(i, s) {
    var e = this.CreatureDataComponent.Entity.GetComponent(3);
    if (!e) return 0;
    let r = 0;
    let o = Number.MAX_VALUE;
    const a = e.ActorLocationProxy;
    const n = Vector_1.Vector.Create();
    for (let e = 0, t = i.length; e < t; e++) {
      n.DeepCopy(s.GetWorldLocationAtSplinePoint(e)),
        this.jye.Set(n.X, n.Y, n.Z);
      const l = Vector_1.Vector.Dist(a, this.jye);
      l < o && ((o = l), (r = e));
    }
    const t = Vector_1.Vector.Create();
    const h = Vector_1.Vector.Create();
    if (r === 0) return 0;
    if (r === i.length - 1) {
      var e = i[0].Position;
      const v = i[i.length - 1].Position;
      if (
        (t.Set(e.X, e.Y, e.Z),
        h.Set(v.X, v.Y, v.Z),
        o < MAX_DISTANCE && Vector_1.Vector.Dist(t, h) < MAX_DISTANCE)
      )
        return 0;
    }
    for (let e = 0; e < i.length - 1; e++) {
      t.DeepCopy(s.GetWorldLocationAtSplinePoint(e)),
        h.DeepCopy(s.GetWorldLocationAtSplinePoint(e + 1)),
        this.jye.Set(h.X, h.Y, h.Z),
        this.jye.Subtraction(t, this.jye);
      let _ = this.jye.Size();
      this.RTe.Set(a.X, a.Y, a.Z),
        this.RTe.Subtraction(h, this.RTe),
        this.jye.DotProduct(this.RTe) > 0 ||
          (this.RTe.Set(a.X, a.Y, a.Z),
          this.RTe.Subtraction(t, this.RTe),
          this.jye.DotProduct(this.RTe) < 0) ||
          (this.jye.CrossProduct(this.RTe, this.jye),
          (_ = this.jye.Size() / _) < o && ((o = _), (r = e + 1)));
    }
    return r;
  }
  PTe(t, i) {
    let s = void 0;
    let r = void 0;
    for (let e = 0; e < t.length; ++e) {
      var o = t[e];
      var o = this.xTe(o, i, e);
      e === 0 ? (s = o) : r.NextNodes.push(o), (r = o);
    }
    return { First: s, Last: r };
  }
  xTe(e, t, i) {
    const s = new (LevelAiRegistry_1.LevelAiRegistry.Instance().FindTaskCtor(
      e.Name,
    ))();
    return (
      s.Serialize(
        this.CharacterPlanComponent,
        this.CreatureDataComponent,
        this.Description + " 样条点" + t + " 行为" + i,
        e.Params,
      ),
      s
    );
  }
}
exports.LevelAiNodeBehaviourSpline = LevelAiNodeBehaviourSpline;
// # sourceMappingURL=LevelAiNodeBehaviourSpline.js.map
