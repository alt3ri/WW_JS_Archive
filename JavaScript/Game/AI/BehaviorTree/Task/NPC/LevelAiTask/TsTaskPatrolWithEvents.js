"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent");
const GlobalData_1 = require("../../../../../GlobalData");
const GameSplineComponent_1 = require("../../../../../LevelGamePlay/Common/GameSplineComponent");
const BehaviorTreeDefines_1 = require("../../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines");
const BlackboardController_1 = require("../../../../../World/Controller/BlackboardController");
const TsAiController_1 = require("../../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
const MAX_DISTANCE = 200;
class TsTaskPatrolWithEvents extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.UseLastMoveIndex = !1),
      (this.OpenDebugNode = !1),
      (this.SplineId = 0),
      (this.SplineComp = void 0),
      (this.SplineInited = !1),
      (this.MoveConfig = void 0),
      (this.Entity = void 0),
      (this.ActorComp = void 0),
      (this.MoveComp = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsUseLastMoveIndex = !1),
      (this.TsOpenDebugNode = !1),
      (this.SegmentsMoveConfig = void 0),
      (this.CacheVector = void 0),
      (this.CacheVector2 = void 0),
      (this.CurrentSegmentIndex = 0),
      (this.IsCircle = !1),
      (this.SplinePoints = void 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsUseLastMoveIndex = this.UseLastMoveIndex),
      (this.TsOpenDebugNode = this.OpenDebugNode),
      (this.CacheVector = Vector_1.Vector.Create()),
      (this.CacheVector2 = Vector_1.Vector.Create()));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    const e = t.AiController;
    e
      ? ((this.Entity = e.CharAiDesignComp.Entity),
        (this.MoveComp = this.Entity.GetComponent(36)),
        (this.ActorComp = e.CharActorComp),
        (this.SplineInited || this.InitSpline()) &&
        ((this.MoveConfig = this.GetPatrolMoveConfig()), this.MoveConfig)
          ? this.MoveComp.MoveAlongPath(this.MoveConfig)
          : this.FinishExecute(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  InitSpline() {
    const i = new GameSplineComponent_1.GameSplineComponent(this.SplineId);
    if (!i.Initialize())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelAi",
            43,
            "[LevelAiTaskMoveWithSpline] GameSplineComponent初始化失败",
            ["EntityId", this.ActorComp?.CreatureData.GetPbDataId()],
            ["SplineEntityId", this.SplineId],
          ),
        !1
      );
    if (i.Option.Type !== IComponent_1.ESplineType.LevelAI)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelAi",
            30,
            "[LevelAiTaskMoveWithSpline] SplineComponent配置类型不是LevelAI",
            ["EntityId", this.ActorComp?.CreatureData.GetPbDataId()],
            ["SplineEntityId", this.SplineId],
          ),
        !1
      );
    if (
      ((this.SplineComp = i),
      (this.IsCircle = !!i.Option.CycleOption?.IsCircle),
      (this.SplinePoints = i.Option.Points.slice(0)),
      this.IsCircle && this.SplinePoints.length > 2)
    )
      for (let t = i.Option.Points.length - 2; t > 0; --t)
        this.SplinePoints.push(i.Option.Points[t]);
    return this.PartitionSpline(), (this.SplineInited = !0);
  }
  OnAbort() {
    this.MoveComp?.StopMove(!0);
  }
  OnClear() {
    this.AIOwner instanceof TsAiController_1.default &&
      ((this.Entity = void 0),
      (this.ActorComp = void 0),
      (this.MoveComp = void 0));
  }
  PartitionSpline() {
    if (
      this.SplineComp &&
      this.SplineComp.Option.Type === IComponent_1.ESplineType.LevelAI
    ) {
      this.SegmentsMoveConfig = new Array();
      let i = [];
      let e = 0;
      const s = this.SplinePoints.length;
      for (let t = 0; t < s; ++t) {
        const o = this.SplinePoints[t];
        i.push(o),
          ((o.Actions && o.Actions.length !== 0) || t === s - 1) &&
            (this.CreateMoveConfig(i, e), (e += i.length), (i = []));
      }
    }
  }
  CreateMoveConfig(i, e) {
    if (i.length) {
      const s = [];
      for (let t = 0; t < i.length; t++) {
        var o = i[t];
        var o = {
          Index: t,
          Position: this.GetWorldLocationAtSplinePoint(t + e),
          Actions: new Array(),
          MoveState: o.MoveState,
          MoveSpeed: o.MoveSpeed,
        };
        s.push(o);
      }
      const r = {
        Points: s,
        Navigation: this.SplineComp.Option.UsePathFinding ?? !1,
        IsFly: !1,
        DebugMode: this.TsOpenDebugNode,
        Loop: !1,
        CircleMove: !1,
        UsePreviousIndex: this.TsUseLastMoveIndex,
        UseNearestPoint: this.TsUseLastMoveIndex,
        ReturnFalseWhenNavigationFailed: !1,
      };
      const h = i.length - 1;
      if (i[h].Actions && i[h].Actions?.length) {
        const n = this.SplineComp.GetNumberOfSplinePoints();
        let t = h + e;
        this.IsCircle && t >= n && (t = 2 * n - 2 - t);
        const a =
          BehaviorTreeDefines_1.BehaviorTreeDefines.GetPatrolActionStateName(
            this.SplineId,
            t,
          );
        r.Callback = (t) => {
          BlackboardController_1.BlackboardController.SetIntValueByEntity(
            this.Entity.Id,
            BehaviorTreeDefines_1.BehaviorTreeDefines
              .PatrolFinishSegmentIndexName,
            this.CurrentSegmentIndex,
          ),
            BlackboardController_1.BlackboardController.SetStringValueByEntity(
              this.Entity.Id,
              BehaviorTreeDefines_1.BehaviorTreeDefines.BehaviorTreeStateName,
              a,
            ),
            this.Finish(!0);
        };
      }
      r.Callback ||
        (r.Callback = (t) => {
          this.Finish(!0);
        }),
        this.SegmentsMoveConfig.push(r);
    }
  }
  GetNearestPatrolPointIndex() {
    if (!this.SplineComp || !this.SplinePoints)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelAi",
            51,
            "获取最近点失败",
            ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()],
            ["HasSplineComp", !!this.SplineComp],
            ["HasSplinePoints", !!this.SplinePoints],
          ),
        0
      );
    const e = this.SplinePoints;
    let s = 0;
    let o = Number.MAX_VALUE;
    const r = this.ActorComp.ActorLocationProxy;
    const h = Vector_1.Vector.Create();
    for (let t = 0, i = e.length; t < i; t++) {
      h.DeepCopy(this.GetWorldLocationAtSplinePoint(t)),
        this.CacheVector.Set(h.X, h.Y, h.Z);
      const n = Vector_1.Vector.Dist(r, this.CacheVector);
      n < o && ((o = n), (s = t));
    }
    const i = Vector_1.Vector.Create();
    const a = Vector_1.Vector.Create();
    if (s === 0) return 0;
    if (s === e.length - 1) {
      const t = e[0].Position;
      const l = e[e.length - 1].Position;
      if (
        (i.Set(t.X, t.Y, t.Z),
        a.Set(l.X, l.Y, l.Z),
        o < MAX_DISTANCE && Vector_1.Vector.Dist(i, a) < MAX_DISTANCE)
      )
        return 0;
    }
    for (let t = 0; t < e.length - 1; t++) {
      i.DeepCopy(this.SplineComp.GetWorldLocationAtSplinePoint(t)),
        a.DeepCopy(this.SplineComp.GetWorldLocationAtSplinePoint(t + 1)),
        this.CacheVector.Set(a.X, a.Y, a.Z),
        this.CacheVector.Subtraction(i, this.CacheVector);
      let v = this.CacheVector.Size();
      this.CacheVector2.Set(r.X, r.Y, r.Z),
        this.CacheVector2.Subtraction(a, this.CacheVector2),
        this.CacheVector.DotProduct(this.CacheVector2) > 0 ||
          (this.CacheVector2.Set(r.X, r.Y, r.Z),
          this.CacheVector2.Subtraction(i, this.CacheVector2),
          this.CacheVector.DotProduct(this.CacheVector2) < 0) ||
          (this.CacheVector.CrossProduct(this.CacheVector2, this.CacheVector),
          (v = this.CacheVector.Size() / v) < o && ((o = v), (s = t + 1)));
    }
    return s;
  }
  GetPatrolMoveConfig() {
    if (this.SegmentsMoveConfig) {
      const t = BlackboardController_1.BlackboardController.GetIntValueByEntity(
        this.Entity.Id,
        BehaviorTreeDefines_1.BehaviorTreeDefines.PatrolFinishSegmentIndexName,
      );
      if (void 0 !== t)
        return (
          (this.CurrentSegmentIndex = (t + 1) % this.SegmentsMoveConfig.length),
          this.SegmentsMoveConfig[this.CurrentSegmentIndex]
        );
      let i = 0;
      const e = this.GetNearestPatrolPointIndex();
      const s = this.SegmentsMoveConfig.length;
      for (let t = 0; t < s; ++t) {
        const o = this.SegmentsMoveConfig[t].Points.length;
        if (e >= i && e < i + o)
          return (
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelAi",
                43,
                "选择初始的移动状态",
                ["EntityId", this.ActorComp.CreatureData.GetPbDataId()],
                ["最近的点", e],
                ["初始分段下标", t],
                ["样条分段数", s],
              ),
            (this.CurrentSegmentIndex = t),
            this.SegmentsMoveConfig[t]
          );
        i += o;
      }
    }
  }
  GetWorldLocationAtSplinePoint(t) {
    if (this.SplineComp && this.SplinePoints) {
      const i = this.SplineComp.GetNumberOfSplinePoints();
      if (
        !(
          (!this.IsCircle && i <= t) ||
          (this.IsCircle && t >= this.SplinePoints.length)
        )
      )
        return this.SplineComp.GetWorldLocationAtSplinePoint(
          t < i ? t : 2 * i - 2 - t,
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelAi",
          51,
          "[PatrolWithEvents] 索引越界",
          ["EntityId", this.ActorComp?.CreatureData.GetPbDataId()],
          ["SplineId", this.SplineId],
        );
    }
  }
}
exports.default = TsTaskPatrolWithEvents;
// # sourceMappingURL=TsTaskPatrolWithEvents.js.map
