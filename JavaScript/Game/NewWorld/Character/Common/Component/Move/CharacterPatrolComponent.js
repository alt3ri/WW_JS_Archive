"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    var o,
      r = arguments.length,
      h =
        r < 3
          ? i
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(i, e))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, i, e, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (h = (r < 3 ? o(h) : 3 < r ? o(i, e, h) : o(i, e)) || h);
    return 3 < r && h && Object.defineProperty(i, e, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterPatrolComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent"),
  GameSplineComponent_1 = require("../../../../../LevelGamePlay/Common/GameSplineComponent"),
  LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
class PatrolRecord {
  constructor(t) {
    (this.IsActive = !1),
      (this.PatrolState = 0),
      (this.LastPointIndex = -1),
      (this.OnArrivePointHandle = void 0),
      (this.OnTriggerActionsHandle = void 0),
      (this.OnPatrolEndHandle = void 0),
      (this.OnArrivePointHandle = t.OnArrivePointHandle),
      (this.OnTriggerActionsHandle = t.OnTriggerActionsHandle),
      (this.OnPatrolEndHandle = t.OnPatrolEndHandle);
  }
}
class SplineInfo {
  constructor() {
    (this.SplineId = 0),
      (this.SplineComp = void 0),
      (this.VirtualSplinePoints = void 0),
      (this.SegmentsMoveConfig = void 0),
      (this.IsLoop = !1),
      (this.IsCircle = !1);
  }
}
let CharacterPatrolComponent = class CharacterPatrolComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.MoveComp = void 0),
      (this.CreatureData = void 0),
      (this.RecordList = void 0),
      (this.SplineInfoList = void 0),
      (this.CurrentPatrol = void 0),
      (this.CurrentSplineInfo = void 0),
      (this.PauseKeyMap = new Map()),
      (this.CacheVector = void 0),
      (this.CacheVector2 = void 0),
      (this.DebugMode = !1),
      (this.OnSegmentPatrolFinished = (t) => {
        switch (t) {
          case 2:
            var i = this.CurrentPatrol?.OnPatrolEndHandle;
            i && i(2);
            break;
          case 1:
            var i = this.GetPointActions(this.CurrentPatrol.LastPointIndex);
            i && i.length
              ? this.OnTriggerSplineActions(i)
              : (i = this.GetNextPointMoveConfig())
                ? ((i.StartIndex = 0),
                  (i.NavigateToStartPos = !1),
                  this.MoveComp.MoveAlongPath(i))
                : this.OnPatrolFinished();
        }
      }),
      (this.OnPatrolFinished = () => {
        var t = this.CurrentPatrol.OnPatrolEndHandle;
        this.StopPatrol(this.CurrentSplineInfo.SplineId), t && t(1);
      }),
      (this.OnTriggerSplineActions = (t) => {
        var i = this.CurrentSplineInfo.SplineId,
          e = this.GetRawIndexInSpline(this.CurrentPatrol.LastPointIndex),
          s = this.CurrentPatrol.OnTriggerActionsHandle;
        switch (this.CurrentSplineInfo.SplineComp.Option.Type) {
          case IComponent_1.ESplineType.LevelAI:
            s && s(t);
            break;
          case IComponent_1.ESplineType.Patrol:
            (this.CurrentPatrol.PatrolState = 2),
              this.PausePatrol(i, "ExecuteSplineAction"),
              s && s(t),
              this.SplineActionRunner(i, e, t);
        }
      }),
      (this.pKl = !1);
  }
  OnStart() {
    return (
      (this.CreatureData = this.Entity.GetComponent(0)),
      (this.ActorComp = this.Entity.GetComponent(1)),
      (this.MoveComp = this.Entity.GetComponent(44)),
      (this.RecordList = new Map()),
      (this.SplineInfoList = new Map()),
      (this.CacheVector = Vector_1.Vector.Create()),
      (this.CacheVector2 = Vector_1.Vector.Create()),
      !0
    );
  }
  OnActivate() {}
  OnClear() {
    return !0;
  }
  StartPatrol(t, i) {
    var e;
    this.CurrentPatrol?.IsActive ||
      ((e = this.SplineInfoList.get(t) ?? this.InitSplineInfo(t, i)) &&
      this.PartitionSplineAndCreateMoveConfig(e, i)
        ? this.Pih(e, i)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "AI",
            50,
            "初始化样条失败，无法开始巡逻",
            ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
            ["SplineId", t],
          ));
  }
  StartSplineCurvePatrol(t, i, e, s) {
    this.CurrentPatrol?.IsActive ||
      ((i =
        this.SplineInfoList.get(t) ??
        this.InitSplineInfoWithCurve(t, i, e, s, !0)) &&
      this.PartitionSplineAndCreateMoveConfig(i, s)
        ? this.Pih(i, s)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "AI",
            50,
            "初始化样条失败，无法开始巡逻",
            ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
            ["SplineId", t],
          ));
  }
  Pih(t, i) {
    var e = t.SplineId,
      s = new PatrolRecord(i);
    (s.IsActive = !0),
      (s.PatrolState = 1),
      (this.CurrentPatrol = s),
      (this.CurrentSplineInfo = t),
      this.RecordList.set(e, s),
      this.SplineInfoList.set(e, t),
      (this.pKl = i.NoRequestServer ?? !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          50,
          "[CharacterPatrolComp.StartPatrol] 开始样条巡逻",
          ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
          ["Actor", this.ActorComp?.Owner?.GetName()],
          ["SplineId", e],
          ["LastPoint", this.CurrentPatrol?.LastPointIndex],
        );
    let o = this.GetNextPointIndex();
    i.UseNearestPoint &&
      (o = i.IgnorePointDirection
        ? this.GetNearestDistancePointIndex()
        : this.GetNearestPatrolPointIndex());
    (s = this.GetSegmentInfo(o)),
      (t = this.CurrentSplineInfo.SegmentsMoveConfig[s.SegmentIndex]);
    t &&
      ((t.StartIndex = s.IndexInSegment),
      (t.NavigateToStartPos = !0),
      this.MoveComp.MoveAlongPath(t),
      this.PatrolBeginRequest());
  }
  PausePatrol(i, e) {
    var s = this.RecordList.get(i);
    if (s) {
      let t = this.PauseKeyMap.get(i);
      t || ((t = new Set()), this.PauseKeyMap.set(i, t)),
        t.has(e)
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "AI",
              50,
              "[CharacterPlanComponent] 重复使用暂停巡逻的Key",
              ["PbDataId", this.CreatureData?.GetPbDataId()],
              ["SplineId", i],
              ["context", this.constructor.name],
              ["Key", e],
            )
          : (t.add(e),
            1 === t.size &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "AI",
                  50,
                  "[CharacterPatrolComp.PausePatrol] 暂停样条巡逻",
                  ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
                  ["Actor", this.ActorComp?.Owner?.GetName()],
                  ["SplineId", this.CurrentSplineInfo?.SplineId],
                  ["LastPoint", this.CurrentPatrol?.LastPointIndex],
                ),
              (s.IsActive = !1),
              this.CurrentSplineInfo?.SplineId === i) &&
              (this.MoveComp.StopMove(!0), this.PatrolEndRequest()));
    }
  }
  ResumePatrol(t, i) {
    var e, s;
    this.CurrentPatrol?.IsActive ||
      ((e = this.RecordList.get(t)) &&
        ((s = this.PauseKeyMap.get(t))?.delete(i)
          ? s.size ||
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "AI",
                50,
                "[CharacterPatrolComp.ResumePatrol] 继续样条巡逻",
                ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
                ["Actor", this.ActorComp?.Owner?.GetName()],
                ["SplineId", this.CurrentSplineInfo?.SplineId],
                ["LastPoint", this.CurrentPatrol?.LastPointIndex],
              ),
            (e.IsActive = !0),
            this.RestoreState(t),
            this.MoveAlongPathWithRecord(),
            this.PatrolBeginRequest())
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "AI",
              50,
              "[CharacterPatrolComp] 继续巡逻使用了未定义的Key",
              ["PbDataId", this.CreatureData?.GetPbDataId()],
              ["SplineId", t],
              ["context", this.constructor.name],
              ["Key", i],
            )));
  }
  StopPatrol(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "AI",
        50,
        "[CharacterPatrolComp.StopPatrol] 停止样条巡逻",
        ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
        ["Actor", this.ActorComp?.Owner?.GetName()],
        ["SplineId", this.CurrentSplineInfo?.SplineId],
        ["LastPoint", this.CurrentPatrol?.LastPointIndex],
      ),
      t === this.CurrentSplineInfo?.SplineId &&
        (this.MoveComp.StopMove(!0), this.PatrolEndRequest()),
      this.ResetState(t);
  }
  GetLastPointRawIndex() {
    return this.CurrentPatrol
      ? this.GetRawIndexInSpline(this.CurrentPatrol.LastPointIndex)
      : -1;
  }
  GetLastPointLocation() {
    if (this.CurrentPatrol && this.CurrentSplineInfo)
      return this.CurrentSplineInfo.VirtualSplinePoints[
        this.CurrentPatrol.LastPointIndex
      ].Point;
  }
  GetCurrentPatrolSplineId() {
    return this.CurrentPatrol && this.CurrentSplineInfo
      ? this.CurrentSplineInfo.SplineId
      : 0;
  }
  HasPatrolRecord(t) {
    return t ? !!this.RecordList?.has(t) : !!this.CurrentPatrol;
  }
  GetIsPauseState(t) {
    return !!this.PauseKeyMap.get(t) && 0 < this.PauseKeyMap.get(t).size;
  }
  IsInPatrol() {
    return this.CurrentPatrol?.IsActive ?? !1;
  }
  IsPositiveDirection() {
    return (
      !(
        this.CurrentSplineInfo &&
        this.CurrentPatrol &&
        this.CurrentSplineInfo.IsLoop &&
        this.CurrentSplineInfo.IsCircle
      ) ||
      this.CurrentPatrol.LastPointIndex <
        this.CurrentSplineInfo.SplineComp.PathPoint.length - 1
    );
  }
  SplineActionRunner(i, e, t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "AI",
        50,
        "开始执行同步事件",
        ["PbDataId", this.CreatureData?.GetPbDataId()],
        ["SplineId", i],
        ["PointIndex", e],
      ),
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
        t,
        LevelGeneralContextDefine_1.EntityContext.Create(
          this.ActorComp.Entity.Id,
        ),
        (t) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "AI",
              50,
              "同步事件执行完毕",
              ["PbDataId", this.CreatureData?.GetPbDataId()],
              ["SplineId", i],
              ["PointIndex", e],
            ),
            (this.RecordList.get(i).PatrolState = 1),
            this.ResumePatrol(i, "ExecuteSplineAction");
        },
      );
  }
  InitSplineInfo(t, i) {
    var e = new GameSplineComponent_1.GameSplineComponent(t);
    if (
      this.TryInitSplineFromAiPatrol(e) ||
      e.InitializeWithSubPoints(t) ||
      e.Initialize()
    )
      return this.InitSplineInfoFromSplineComp(e, i);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "LevelAi",
        42,
        "[CharacterPatrolComp.InitSpline] GameSplineComponent初始化失败",
        ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
        ["SplinePbDataId", t],
      );
  }
  InitSplineInfoWithCurve(t, i, e, s, o) {
    t = new GameSplineComponent_1.GameSplineComponent(t);
    return (
      t.InitializeWithSplineCurve(i, e, o),
      this.InitSplineInfoFromSplineComp(t, s)
    );
  }
  InitSplineInfoFromSplineComp(i, t) {
    if (
      i.Option.Type === IComponent_1.ESplineType.LevelAI ||
      i.Option.Type === IComponent_1.ESplineType.Patrol
    ) {
      var e,
        s = i.SplineId,
        o = new SplineInfo();
      switch (((o.SplineId = s), i.Option.Type)) {
        case IComponent_1.ESplineType.Patrol:
          (o.IsLoop = !1),
            (o.IsCircle = !1),
            i.Option.CycleOption &&
              i.Option.CycleOption.Type ===
                IComponent_1.EPatrolCycleMode.Loop &&
              ((o.IsLoop = !0), (o.IsCircle = i.Option.CycleOption.IsCircle));
          break;
        case IComponent_1.ESplineType.LevelAI:
          (o.IsLoop = !1),
            (o.IsCircle = !1),
            i.Option.CycleOption &&
              i.Option.CycleOption.Type ===
                IComponent_1.ELevelAiCycleMode.Loop &&
              ((o.IsLoop = !0), (o.IsCircle = i.Option.CycleOption.IsCircle));
      }
      if (
        ((void 0 === t.StartPointIndex && void 0 === t.EndPointIndex) ||
          ((s = i.PathPoint.length),
          (e = t.StartPointIndex
            ? MathUtils_1.MathUtils.Clamp(t.StartPointIndex, 0, s - 1)
            : 0),
          (t = t.EndPointIndex
            ? MathUtils_1.MathUtils.Clamp(t.EndPointIndex, 0, s - 1)
            : s - 1),
          (i.PathPoint = i.PathPoint.slice(e, t + 1))),
        (o.SplineComp = i),
        (o.VirtualSplinePoints = i.PathPoint.slice(0)),
        o.IsCircle && 2 < o.VirtualSplinePoints.length)
      )
        for (let t = i.PathPoint.length - 2; 0 < t; --t)
          o.VirtualSplinePoints.push(i.PathPoint[t]);
      return o;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "LevelAi",
        50,
        "[CharacterPatrolComp.InitSpline] 非巡逻样条或关卡Ai样条，无法初始化",
        ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
        ["SplinePbDataId", i.SplineId],
      );
  }
  PartitionSplineAndCreateMoveConfig(s, o) {
    if (!s.VirtualSplinePoints.length) return !1;
    if (!s.SegmentsMoveConfig) {
      s.SegmentsMoveConfig = new Array();
      let i = [],
        e = 0;
      var r = s.VirtualSplinePoints.length;
      for (let t = 0; t < r; ++t) {
        var h = s.VirtualSplinePoints[t];
        i.push(h),
          (t === r - 1 || (h.Actions && 0 !== h.Actions.length)) &&
            (this.CreateMoveConfig(s, i, e, o), (e += i.length), (i = []));
      }
    }
    return !0;
  }
  CreateMoveConfig(t, i, e, s) {
    if (t.SplineComp && i.length) {
      var o = [];
      for (let t = 0; t < i.length; t++) {
        const n = i[t];
        var r = {
          Index: t,
          Position: n.Point,
          Actions: new Array(),
          MoveState: n.MoveState,
          MoveSpeed: n.MoveSpeed,
          PosState: n.CharPositionState
            ? this.GetPosStateType(n.CharPositionState)
            : void 0,
          Callback: () => {
            this.UpdatePatrolRecord(t + e),
              n.IsMain &&
                this.CurrentPatrol?.OnArrivePointHandle &&
                this.CurrentPatrol.OnArrivePointHandle();
          },
        };
        this.ActorComp?.CreatureData.IsRole() ||
          r.MoveState !== IComponent_1.EPatrolMoveState.Sprint ||
          (r.MoveState = IComponent_1.EPatrolMoveState.Run),
          o.push(r);
      }
      var h = t.SplineComp.Option,
        h = {
          Points: o,
          Navigation: h.IsNavigation ?? !1,
          IsFly: s.IsFollowStrictly ?? h.IsFloating ?? !1,
          DebugMode: s.DebugMode ?? !1,
          Loop: !1,
          CircleMove: !1,
          UsePreviousIndex: !1,
          UseNearestPoint: !1,
          ReturnFalseWhenNavigationFailed: !1,
        };
      (h.Callback = this.OnSegmentPatrolFinished), t.SegmentsMoveConfig.push(h);
    }
  }
  UpdatePatrolRecord(t) {
    this.CurrentPatrol?.IsActive &&
      (this.CurrentSplineInfo.IsLoop &&
        this.CurrentSplineInfo.IsCircle &&
        this.DirectionChangeRequest(t),
      (this.CurrentPatrol.LastPointIndex = t),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "AI",
        50,
        "到达点巡逻点",
        ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
        ["Actor", this.ActorComp?.Owner?.GetName()],
        ["SplineId", this.CurrentSplineInfo?.SplineId],
        ["PointIndex", this.CurrentPatrol.LastPointIndex],
      );
  }
  MoveAlongPathWithRecord() {
    var t, i, e;
    this.CurrentPatrol?.IsActive &&
      this.CurrentSplineInfo &&
      ((t = (e = 2 === this.CurrentPatrol.PatrolState)
        ? this.CurrentPatrol.LastPointIndex
        : this.GetNextPointIndex()),
      (i = this.GetSegmentInfo(t)),
      e || -1 !== i.SegmentIndex
        ? (((e =
            this.CurrentSplineInfo.SegmentsMoveConfig[
              i.SegmentIndex
            ]).StartIndex = i.IndexInSegment),
          (e.NavigateToStartPos = !0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "AI",
              50,
              "[CharacterPatrolComp.MoveAlongPathWithRecord] 依据历史选择下个目标点",
              ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
              ["Actor", this.ActorComp?.Owner?.GetName()],
              ["SplineId", this.CurrentSplineInfo?.SplineId],
              ["StartIndex", t],
            ),
          this.MoveComp.MoveAlongPath(e))
        : -1 !==
            (i = this.GetSegmentInfo(this.CurrentPatrol.LastPointIndex))
              .SegmentIndex &&
          i.IsEnd &&
          this.OnPatrolFinished());
  }
  ResetState(t) {
    this.RecordList?.delete(t),
      this.PauseKeyMap.delete(t),
      t === this.CurrentSplineInfo?.SplineId &&
        ((this.CurrentPatrol = void 0), (this.CurrentSplineInfo = void 0));
  }
  RestoreState(t) {
    return this.RestorePatrolState(t) && this.RestoreSplineState(t);
  }
  RestorePatrolState(t) {
    t = this.RecordList.get(t);
    return !!t && ((this.CurrentPatrol = t), !0);
  }
  RestoreSplineState(t) {
    t = this.SplineInfoList.get(t);
    return !!t && ((this.CurrentSplineInfo = t), !0);
  }
  PatrolBeginRequest() {
    var t;
    this.CreatureData.IsMonster() &&
      !this.pKl &&
      (((t = Protocol_1.Aki.Protocol.Kes.create()).F4n =
        MathUtils_1.MathUtils.NumberToLong(
          this.CreatureData.GetCreatureDataId(),
        )),
      (t.V4n =
        this.CurrentPatrol.LastPointIndex <
        this.CurrentSplineInfo.SplineComp.PathPoint.length - 1),
      Net_1.Net.Call(17943, t, () => {}));
  }
  PatrolEndRequest() {
    var t;
    this.CreatureData.IsMonster() &&
      !this.pKl &&
      (((t = Protocol_1.Aki.Protocol.Xes.create()).F4n =
        MathUtils_1.MathUtils.NumberToLong(
          this.CreatureData.GetCreatureDataId(),
        )),
      Net_1.Net.Call(22325, t, () => {}));
  }
  DirectionChangeRequest(t) {
    var i;
    this.CreatureData.IsMonster() &&
      !this.pKl &&
      (0 === t
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("AI", 50, "往返式巡逻：回到起点", [
              "PbDataID",
              this.ActorComp.CreatureData.GetPbDataId(),
            ]),
          ((i = Protocol_1.Aki.Protocol.Jes.create()).F4n =
            MathUtils_1.MathUtils.NumberToLong(
              this.CreatureData.GetCreatureDataId(),
            )),
          (i.V4n = !0),
          Net_1.Net.Call(21855, i, () => {}))
        : t === this.CurrentSplineInfo.SplineComp.PathPoint.length - 1 &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("AI", 50, "往返式巡逻：走到终点", [
              "PbDataID",
              this.ActorComp.CreatureData.GetPbDataId(),
            ]),
          ((i = Protocol_1.Aki.Protocol.Jes.create()).F4n =
            MathUtils_1.MathUtils.NumberToLong(
              this.ActorComp.CreatureData.GetCreatureDataId(),
            )),
          (i.V4n = !1),
          Net_1.Net.Call(21855, i, () => {})));
  }
  GetSegmentInfo(e) {
    if (
      !(
        !this.CurrentSplineInfo?.SegmentsMoveConfig ||
        e < 0 ||
        e >= this.CurrentSplineInfo.VirtualSplinePoints.length
      )
    ) {
      let i = 0;
      var s = this.CurrentSplineInfo.SegmentsMoveConfig.length;
      for (let t = 0; t < s; ++t) {
        var o = this.CurrentSplineInfo.SegmentsMoveConfig[t].Points.length;
        if (e >= i && e < i + o)
          return {
            SegmentIndex: t,
            IndexInSegment: e - i,
            IsEnd: e - i == o - 1,
          };
        i += o;
      }
    }
    return { SegmentIndex: -1, IndexInSegment: -1, IsEnd: !1 };
  }
  GetPointActions(t) {
    if (
      !(
        !this.CurrentSplineInfo?.VirtualSplinePoints ||
        t < 0 ||
        t >= this.CurrentSplineInfo.VirtualSplinePoints.length
      )
    )
      return this.CurrentSplineInfo.VirtualSplinePoints[t].Actions;
  }
  GetNearestPatrolPointIndex() {
    if (!this.CurrentSplineInfo?.VirtualSplinePoints?.length)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("AI", 50, "获取最近点失败", [
            "PbDataId",
            this.ActorComp.CreatureData.GetPbDataId(),
          ]),
        0
      );
    var i = this.CurrentSplineInfo.VirtualSplinePoints;
    let e = 0,
      s = Number.MAX_VALUE;
    var o = this.ActorComp.ActorLocationProxy,
      r = Vector_1.Vector.Create(),
      h = Vector_1.Vector.Create();
    for (let t = 0; t < i.length - 1; t++) {
      r.DeepCopy(i[t].Point),
        h.DeepCopy(i[t + 1].Point),
        this.CacheVector.Set(h.X, h.Y, h.Z),
        this.CacheVector.Subtraction(r, this.CacheVector);
      var n = this.CacheVector.Size();
      this.CacheVector2.Set(o.X, o.Y, o.Z),
        this.CacheVector2.Subtraction(h, this.CacheVector2),
        0 < this.CacheVector.DotProduct(this.CacheVector2) ||
          (this.CacheVector2.Set(o.X, o.Y, o.Z),
          this.CacheVector2.Subtraction(r, this.CacheVector2),
          this.CacheVector.DotProduct(this.CacheVector2) < 0) ||
          this.CacheVector.DotProduct(this.ActorComp.ActorForwardProxy) < 0 ||
          (this.CacheVector.CrossProduct(this.CacheVector2, this.CacheVector),
          (n = this.CacheVector.Size() / n) < s && ((s = n), (e = t + 1)));
    }
    return e;
  }
  GetNearestDistancePointIndex() {
    if (!this.CurrentSplineInfo?.VirtualSplinePoints?.length)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("AI", 50, "获取最近点失败", [
            "PbDataId",
            this.ActorComp.CreatureData.GetPbDataId(),
          ]),
        0
      );
    var i = this.CurrentSplineInfo.VirtualSplinePoints;
    let e = 0,
      s = Number.MAX_VALUE;
    var o = this.ActorComp.ActorLocationProxy;
    for (let t = 0; t < i.length - 1; t++) {
      var r = Vector_1.Vector.DistSquared(o, i[t].Point);
      r < s && ((e = t), (s = r));
    }
    return e;
  }
  GetRawIndexInSpline(t) {
    var i;
    return this.CurrentSplineInfo
      ? ((i = this.CurrentSplineInfo.SplineComp.PathPoint.length),
        (!this.CurrentSplineInfo.IsCircle && i <= t) ||
        (this.CurrentSplineInfo.IsCircle &&
          t >= this.CurrentSplineInfo.VirtualSplinePoints.length)
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelAi",
                50,
                "[CharacterPatrolComp.GetRawIndexInSpline] 索引越界",
                ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
                ["SplineId", this.CurrentSplineInfo?.SplineId],
              ),
            -1)
          : this.CurrentSplineInfo.SplineComp.GetLastMainPointIndex(
              t < i ? t : 2 * i - 2 - t,
            ))
      : -1;
  }
  GetNextPointIndex(t) {
    return this.CurrentPatrol &&
      this.CurrentSplineInfo &&
      ((t = t ?? this.CurrentPatrol.LastPointIndex) !==
        this.CurrentSplineInfo.VirtualSplinePoints.length - 1 ||
        this.CurrentSplineInfo.IsLoop)
      ? (t + 1) % this.CurrentSplineInfo.VirtualSplinePoints.length
      : -1;
  }
  GetNextPointMoveConfig() {
    if (this.CurrentPatrol && this.CurrentSplineInfo?.SegmentsMoveConfig) {
      var t = this.GetNextPointIndex(),
        t = this.GetSegmentInfo(t);
      if (-1 !== t.SegmentIndex)
        return this.CurrentSplineInfo.SegmentsMoveConfig[t.SegmentIndex];
    }
  }
  GetSymmetryPointIndex(t) {
    return this.CurrentSplineInfo?.IsLoop && this.CurrentSplineInfo.IsCircle
      ? 0 === t
        ? t
        : this.CurrentSplineInfo.VirtualSplinePoints.length - t
      : -1;
  }
  GetPosStateType(t) {
    switch (t) {
      case 0:
        return CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
      case 2:
        return CharacterUnifiedStateTypes_1.ECharPositionState.Air;
      default:
        return CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
    }
  }
  TryInitSplineFromAiPatrol(i) {
    var t = this.Entity.GetComponent(46)?.AiController.AiPatrol;
    if (!t?.AllPatrolPoints || !t.AllPatrolPoints.length) return !1;
    if (!i.InitializeWithSubPoints(this.CreatureData.GetPbDataId())) return !1;
    i.PathPoint.length = 0;
    for (const e of t.AllPatrolPoints) i.PathPoint.push(e);
    i.MainPointIndexArray = new Array();
    for (let t = 0; t < i.PathPoint.length; t++)
      i.PathPoint[t].IsMain && i.MainPointIndexArray.push(t);
    return !0;
  }
};
(CharacterPatrolComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(47)],
  CharacterPatrolComponent,
)),
  (exports.CharacterPatrolComponent = CharacterPatrolComponent);
//# sourceMappingURL=CharacterPatrolComponent.js.map
