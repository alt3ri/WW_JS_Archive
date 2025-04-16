"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiNodeBehaviourSpline = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
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
    (this.Var1 = { Type: "Int", Source: "Self", Name: "DEFAULT_STATE" }),
      (this.Compare = "Eq"),
      (this.Var2 = { Type: "Int", Source: "Constant", Value: -1 }),
      (this.Type = "CompareVar"),
      (this.Var1.Name = e),
      (this.Var2.Value = t);
  }
}
class SelfVarSetParam {
  constructor(e, t) {
    (this.VarLeft = { Type: "Int", Source: "Self", Name: "DEFAULT_STATE" }),
      (this.VarRight = { Type: "Int", Source: "Constant", Value: -1 }),
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
    var i, r, s;
    void 0 !== this.SplineId &&
      (this.PrintDescription(
        "Behaviour Spline Make Plan Expansions",
        ["LevelIndex", e.CurrentLevelIndex],
        ["StepIndex", e.CurrentStepIndex],
      ),
      this.DTe || this.HC(),
      this.CanRecordPlanProgress || this.TTe.Reset(),
      (i = (s = e.MakePlanCopyWithAddedStep()).PlanCopy),
      (r = s.OutAddedStep),
      (s = s.OutAddedStepId),
      (r.SubLevelIndex = e.AddLevel(i, s)),
      e.SubmitCandidatePlan(i));
  }
  GetNextSteps(e, t) {
    if (!this.TTe.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)) {
      var i = this.TTe.LevelIndex,
        r = this.TTe.StepIndex;
      if ((e.IsExecutingPlan && this.TTe.Reset(), 0 <= i && 0 <= r))
        return void e.AddNextStepsAfter(
          new LevelAiPlan_1.LevelAiPlanStepId(i, r - 1),
        );
    }
    i = e.GetStep(t);
    e.AddNextStepsAfter(new LevelAiPlan_1.LevelAiPlanStepId(i.SubLevelIndex));
  }
  OnSubLevelStepFinished(e, t, i, r, s) {
    return 2 === r && this.TTe.CopyFrom(i), !0;
  }
  HC() {
    var a = new GameSplineComponent_1.GameSplineComponent(this.SplineId);
    if (a.Initialize())
      if (a.Option.Type !== IComponent_1.ESplineType.LevelAI)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelAi",
            29,
            "[LevelAiTaskMoveWithSpline] SplineComponent配置类型不是LevelAI",
            ["EntityId", this.CreatureDataComponent.GetPbDataId()],
            ["SplineEntityId", this.SplineId],
          );
      else {
        var o = new LevelAiTaskSuccess_1.LevelAiTaskSuccess(),
          n =
            (o.Serialize(
              this.CharacterPlanComponent,
              this.CreatureDataComponent,
              this.Description,
            ),
            (o.Cost = this.Cost),
            this.NextNodes.push(o),
            a.GetNumberOfSplinePoints());
        let t = 0;
        var h = this.UTe(a.Option.Points, a);
        let i = !1,
          r = [];
        var l = "INTERNAL_PATROL_STATE",
          v = a.Option.UsePathFinding ?? !1,
          _ = a.Option.IsPassEveryKeyPoint ?? !1;
        let s = 0;
        for (let e = 0; e < n; ++e) {
          var p,
            S,
            A = e,
            L = a.Option.Points[e];
          r.push(L),
            ((L.Actions && 0 !== L.Actions.length) || A === n - 1) &&
              ((L = this.ATe(a, r, t, A, v, _)),
              h >= t &&
                h <= A &&
                !i &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "LevelAi",
                    42,
                    "选择初始的移动状态",
                    ["EntityId", this.CreatureDataComponent.GetPbDataId()],
                    ["最近的点", h],
                    ["当前状态", s],
                  ),
                (i = !0),
                this.CharacterPlanComponent.WorldState.SetIntWorldState(l, s),
                this.CharacterPlanComponent.WorldStateProxy.SetIntWorldState(
                  l,
                  s,
                )),
              (p = new SelfVarCompareParam(l, s)),
              (S =
                new LevelAiDecoratorCompareVar_1.LevelAiDecoratorCompareVar()).Serialize(
                this.CharacterPlanComponent,
                this.CreatureDataComponent,
                "检查巡逻状态 " + s.toString(),
                p,
              ),
              L.First.Decorators.push(S),
              s++,
              (p = A === n - 1 ? 0 : s),
              (S = new SelfVarSetParam(l, p)),
              (A = new LevelAiTaskSetVar_1.LevelAiTaskSetVar()).Serialize(
                this.CharacterPlanComponent,
                this.CreatureDataComponent,
                "设置下个巡逻状态 " + p.toString(),
                S,
              ),
              L.Last.NextNodes.push(A),
              o.NextNodes.push(L.First),
              (r = []),
              (t = e + 1));
        }
        this.DTe = !0;
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelAi",
          42,
          "[LevelAiTaskMoveWithSpline] GameSplineComponent初始化失败",
          ["EntityId", this.CreatureDataComponent.GetPbDataId()],
          ["SplineEntityId", this.SplineId],
        );
  }
  ATe(t, i, r, e, s, a) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelAi",
        42,
        "生成MoveAlongStep",
        ["EntityId", this.CreatureDataComponent.GetPbDataId()],
        ["startIndex", r],
        ["endIndex", e],
      );
    var o = new LevelAiTaskMoveAlong_1.LevelAiTaskMoveAlong(),
      n =
        (o.Serialize(
          this.CharacterPlanComponent,
          this.CreatureDataComponent,
          this.Description + " 样条路径" + r + "到" + e,
        ),
        []);
    for (let e = 0; e < i.length; e++) {
      var h = i[e],
        l = {
          Index: e,
          Position: Vector_1.Vector.Create(),
          MoveSpeed: h.MoveSpeed,
          MoveState: h.MoveState,
          PosState: h.CharPositionState
            ? this.Yia(h.CharPositionState)
            : void 0,
        };
      h.MoveState === IComponent_1.EPatrolMoveState.Sprint &&
        (l.MoveState = IComponent_1.EPatrolMoveState.Run),
        l.Position.DeepCopy(t.GetWorldLocationAtSplinePoint(r + e)),
        n.push(l);
    }
    (o.PathPoint = n), (o.Navigation = s), (o.ResetAllPoints = a);
    s = i[i.length - 1];
    return s.Actions && 0 !== s.Actions.length
      ? ((a = this.PTe(s.Actions, e)),
        o.NextNodes.push(a.First),
        { First: o, Last: a.Last })
      : { First: o, Last: o };
  }
  Yia(e) {
    switch (e) {
      case 0:
        return CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
      case 2:
        return CharacterUnifiedStateTypes_1.ECharPositionState.Air;
    }
    return CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
  }
  UTe(i, r) {
    var e = this.CreatureDataComponent.Entity.GetComponent(3);
    if (!e) return 0;
    let s = 0,
      a = Number.MAX_VALUE;
    var o = e.ActorLocationProxy,
      n = Vector_1.Vector.Create();
    for (let e = 0, t = i.length; e < t; e++) {
      n.DeepCopy(r.GetWorldLocationAtSplinePoint(e)),
        this.jye.Set(n.X, n.Y, n.Z);
      var h = Vector_1.Vector.Dist(o, this.jye);
      h < a && ((a = h), (s = e));
    }
    var t = Vector_1.Vector.Create(),
      l = Vector_1.Vector.Create();
    if (0 === s) return 0;
    if (s === i.length - 1) {
      var e = i[0].Position,
        v = i[i.length - 1].Position;
      if (
        (t.Set(e.X, e.Y, e.Z),
        l.Set(v.X, v.Y, v.Z),
        a < MAX_DISTANCE && Vector_1.Vector.Dist(t, l) < MAX_DISTANCE)
      )
        return 0;
    }
    for (let e = 0; e < i.length - 1; e++) {
      t.DeepCopy(r.GetWorldLocationAtSplinePoint(e)),
        l.DeepCopy(r.GetWorldLocationAtSplinePoint(e + 1)),
        this.jye.Set(l.X, l.Y, l.Z),
        this.jye.Subtraction(t, this.jye);
      var _ = this.jye.Size();
      this.RTe.Set(o.X, o.Y, o.Z),
        this.RTe.Subtraction(l, this.RTe),
        0 < this.jye.DotProduct(this.RTe) ||
          (this.RTe.Set(o.X, o.Y, o.Z),
          this.RTe.Subtraction(t, this.RTe),
          this.jye.DotProduct(this.RTe) < 0) ||
          (this.jye.CrossProduct(this.RTe, this.jye),
          (_ = this.jye.Size() / _) < a && ((a = _), (s = e + 1)));
    }
    return s;
  }
  PTe(t, i) {
    let r = void 0,
      s = void 0;
    for (let e = 0; e < t.length; ++e) {
      var a = t[e],
        a = this.xTe(a, i, e);
      0 === e ? (r = a) : s.NextNodes.push(a), (s = a);
    }
    return { First: r, Last: s };
  }
  xTe(e, t, i) {
    var r = new (LevelAiRegistry_1.LevelAiRegistry.Instance().FindTaskCtor(
      e.Name,
    ))();
    return (
      r.Serialize(
        this.CharacterPlanComponent,
        this.CreatureDataComponent,
        this.Description + " 样条点" + t + " 行为" + i,
        e.Params,
      ),
      r
    );
  }
}
exports.LevelAiNodeBehaviourSpline = LevelAiNodeBehaviourSpline;
//# sourceMappingURL=LevelAiNodeBehaviourSpline.js.map
