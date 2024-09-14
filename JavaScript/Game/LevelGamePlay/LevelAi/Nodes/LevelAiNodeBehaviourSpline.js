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
    var o = new GameSplineComponent_1.GameSplineComponent(this.SplineId);
    if (o.Initialize())
      if (o.Option.Type !== IComponent_1.ESplineType.LevelAI)
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
            o.GetNumberOfSplinePoints());
        let i = 0;
        var h = this.UTe(o.Option.Points, o);
        let r = !1,
          s = [];
        var v = o.Option.UsePathFinding ?? !1,
          _ = o.Option.IsPassEveryKeyPoint ?? !1;
        let a = 0;
        for (let t = 0; t < l; ++t) {
          var p = t,
            S = o.Option.Points[t];
          if (
            (s.push(S), (S.Actions && 0 !== S.Actions.length) || p === l - 1)
          ) {
            var S = this.ATe(o, s, i, p, v, _),
              A = "INTERNAL_PATROL_" + a.toString(),
              L =
                (h >= i &&
                  h <= p &&
                  !r &&
                  (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "LevelAi",
                      43,
                      "选择初始的移动状态",
                      ["EntityId", this.CreatureDataComponent.GetPbDataId()],
                      ["最近的点", h],
                      ["当前状态名称", A],
                    ),
                  (r = !0),
                  this.CharacterPlanComponent.WorldState.SetBooleanWorldState(
                    A,
                    !0,
                  )),
                new SelfVarCompareParam(A, !0)),
              c = new LevelAiDecoratorCompareVar_1.LevelAiDecoratorCompareVar(),
              L =
                (c.Serialize(
                  this.CharacterPlanComponent,
                  this.CreatureDataComponent,
                  "检查巡逻状态 " + A,
                  L,
                ),
                S.First.Decorators.push(c),
                new SelfVarSetParam(A, !1)),
              c = new LevelAiTaskSetVar_1.LevelAiTaskSetVar();
            c.Serialize(
              this.CharacterPlanComponent,
              this.CreatureDataComponent,
              "设置当前巡逻状态 " + A,
              L,
            ),
              S.Last.NextNodes.push(c);
            let e = "INTERNAL_PATROL_" + (++a).toString();
            p === l - 1 && (e = "INTERNAL_PATROL_0");
            (A = new SelfVarSetParam(e, !0)),
              (L = new LevelAiTaskSetVar_1.LevelAiTaskSetVar());
            L.Serialize(
              this.CharacterPlanComponent,
              this.CreatureDataComponent,
              "设置下个巡逻状态 " + e,
              A,
            ),
              c.NextNodes.push(L),
              n.NextNodes.push(S.First),
              (s = []),
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
  ATe(t, i, r, e, s, a) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelAi",
        43,
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
      var l = i[e],
        h = {
          Index: e,
          Position: Vector_1.Vector.Create(),
          MoveSpeed: l.MoveSpeed,
          MoveState: l.MoveState,
          PosState: l.CharPositionState
            ? this.Yia(l.CharPositionState)
            : void 0,
        };
      l.MoveState === IComponent_1.EPatrolMoveState.Sprint &&
        (h.MoveState = IComponent_1.EPatrolMoveState.Run),
        h.Position.DeepCopy(t.GetWorldLocationAtSplinePoint(r + e)),
        n.push(h);
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
      var l = Vector_1.Vector.Dist(o, this.jye);
      l < a && ((a = l), (s = e));
    }
    var t = Vector_1.Vector.Create(),
      h = Vector_1.Vector.Create();
    if (0 === s) return 0;
    if (s === i.length - 1) {
      var e = i[0].Position,
        v = i[i.length - 1].Position;
      if (
        (t.Set(e.X, e.Y, e.Z),
        h.Set(v.X, v.Y, v.Z),
        a < MAX_DISTANCE && Vector_1.Vector.Dist(t, h) < MAX_DISTANCE)
      )
        return 0;
    }
    for (let e = 0; e < i.length - 1; e++) {
      t.DeepCopy(r.GetWorldLocationAtSplinePoint(e)),
        h.DeepCopy(r.GetWorldLocationAtSplinePoint(e + 1)),
        this.jye.Set(h.X, h.Y, h.Z),
        this.jye.Subtraction(t, this.jye);
      var _ = this.jye.Size();
      this.RTe.Set(o.X, o.Y, o.Z),
        this.RTe.Subtraction(h, this.RTe),
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
