"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiNodeBehaviourSpline = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  GameSplineComponent_1 = require("../../Common/GameSplineComponent"),
  LevelAiDecoratorCompareVar_1 = require("../Decorators/LevelAiDecoratorCompareVar"),
  LevelAiPlan_1 = require("../LevelAiPlan"),
  LevelAiRegistry_1 = require("../LevelAiRegistry"),
  LevelAiStandaloneNode_1 = require("../LevelAiStandaloneNode"),
  LevelAiTaskMoveAlong_1 = require("../Tasks/LevelAiTaskMoveAlong"),
  LevelAiTaskSetVar_1 = require("../Tasks/LevelAiTaskSetVar"),
  LevelAiTaskSuccess_1 = require("../Tasks/LevelAiTaskSuccess"),
  MAX_DISTANCE = 200;
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
    var i, s, r;
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
      var i = this.TTe.LevelIndex,
        s = this.TTe.StepIndex;
      if ((e.IsExecutingPlan && this.TTe.Reset(), 0 <= i && 0 <= s))
        return void e.AddNextStepsAfter(
          new LevelAiPlan_1.LevelAiPlanStepId(i, s - 1),
        );
    }
    i = e.GetStep(t);
    e.AddNextStepsAfter(new LevelAiPlan_1.LevelAiPlanStepId(i.SubLevelIndex));
  }
  OnSubLevelStepFinished(e, t, i, s, r) {
    return 2 === s && this.TTe.CopyFrom(i), !0;
  }
  HC() {
    var a = new GameSplineComponent_1.GameSplineComponent(this.SplineId);
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
        var n = new LevelAiTaskSuccess_1.LevelAiTaskSuccess(),
          l =
            (n.Serialize(
              this.CharacterPlanComponent,
              this.CreatureDataComponent,
              this.Description,
            ),
            (n.Cost = this.Cost),
            this.NextNodes.push(n),
            a.GetNumberOfSplinePoints());
        let i = 0;
        var h = this.UTe(a.Option.Points, a);
        let s = !1,
          r = [];
        var v = a.Option.UsePathFinding ?? !1;
        let o = 0;
        for (let t = 0; t < l; ++t) {
          var _ = t,
            A = a.Option.Points[t];
          if (
            (r.push(A), (A.Actions && 0 !== A.Actions.length) || _ === l - 1)
          ) {
            var A = this.ATe(a, r, i, _, v),
              L = "INTERNAL_PATROL_" + o.toString(),
              p =
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
                new SelfVarCompareParam(L, !0)),
              S = new LevelAiDecoratorCompareVar_1.LevelAiDecoratorCompareVar(),
              p =
                (S.Serialize(
                  this.CharacterPlanComponent,
                  this.CreatureDataComponent,
                  "检查巡逻状态 " + L,
                  p,
                ),
                A.First.Decorators.push(S),
                new SelfVarSetParam(L, !1)),
              S = new LevelAiTaskSetVar_1.LevelAiTaskSetVar();
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
    var o = new LevelAiTaskMoveAlong_1.LevelAiTaskMoveAlong(),
      a =
        (o.Serialize(
          this.CharacterPlanComponent,
          this.CreatureDataComponent,
          this.Description + " 样条路径" + s + "到" + e,
        ),
        []);
    for (let e = 0; e < i.length; e++) {
      var n = i[e],
        l = {
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
    return r.Actions && 0 !== r.Actions.length
      ? ((r = this.PTe(r.Actions, e)),
        o.NextNodes.push(r.First),
        { First: o, Last: r.Last })
      : { First: o, Last: o };
  }
  UTe(i, s) {
    var e = this.CreatureDataComponent.Entity.GetComponent(3);
    if (!e) return 0;
    let r = 0,
      o = Number.MAX_VALUE;
    var a = e.ActorLocationProxy,
      n = Vector_1.Vector.Create();
    for (let e = 0, t = i.length; e < t; e++) {
      n.DeepCopy(s.GetWorldLocationAtSplinePoint(e)),
        this.jye.Set(n.X, n.Y, n.Z);
      var l = Vector_1.Vector.Dist(a, this.jye);
      l < o && ((o = l), (r = e));
    }
    var t = Vector_1.Vector.Create(),
      h = Vector_1.Vector.Create();
    if (0 === r) return 0;
    if (r === i.length - 1) {
      var e = i[0].Position,
        v = i[i.length - 1].Position;
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
      var _ = this.jye.Size();
      this.RTe.Set(a.X, a.Y, a.Z),
        this.RTe.Subtraction(h, this.RTe),
        0 < this.jye.DotProduct(this.RTe) ||
          (this.RTe.Set(a.X, a.Y, a.Z),
          this.RTe.Subtraction(t, this.RTe),
          this.jye.DotProduct(this.RTe) < 0) ||
          (this.jye.CrossProduct(this.RTe, this.jye),
          (_ = this.jye.Size() / _) < o && ((o = _), (r = e + 1)));
    }
    return r;
  }
  PTe(t, i) {
    let s = void 0,
      r = void 0;
    for (let e = 0; e < t.length; ++e) {
      var o = t[e],
        o = this.xTe(o, i, e);
      0 === e ? (s = o) : r.NextNodes.push(o), (r = o);
    }
    return { First: s, Last: r };
  }
  xTe(e, t, i) {
    var s = new (LevelAiRegistry_1.LevelAiRegistry.Instance().FindTaskCtor(
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
//# sourceMappingURL=LevelAiNodeBehaviourSpline.js.map
