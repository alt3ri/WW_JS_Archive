"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    var o,
      h = arguments.length,
      r =
        h < 3
          ? i
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(i, e))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, i, e, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (r = (h < 3 ? o(r) : 3 < h ? o(i, e, r) : o(i, e)) || r);
    return 3 < h && r && Object.defineProperty(i, e, r), r;
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
  BaseActorComponent_1 = require("../../../../Common/Component/BaseActorComponent");
class PatrolRecord {
  constructor() {
    (this.IsActive = !1),
      (this.PatrolState = 0),
      (this.LastPointIndex = -1),
      (this.OnArrivePointHandle = void 0),
      (this.OnTriggerActionsHandle = void 0),
      (this.OnPatrolEndHandle = void 0);
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
      (this.PauseKey = void 0),
      (this.PauseHandle = void 0),
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
                ? ((i.StartIndex = 0), this.MoveComp.MoveAlongPath(i))
                : this.OnPatrolFinished();
        }
      }),
      (this.OnPatrolFinished = () => {
        var t = this.CurrentPatrol?.OnPatrolEndHandle;
        this.StopPatrol(), t && t(1);
      }),
      (this.OnTriggerSplineActions = (t) => {
        var i = this.CurrentSplineInfo.SplineId,
          e = this.GetRawIndexInSpline(this.CurrentPatrol.LastPointIndex),
          s = this.CurrentPatrol.OnTriggerActionsHandle;
        (this.CurrentPatrol.PatrolState = 2),
          this.PausePatrol("ExecuteSplineAction"),
          s && s(t),
          this.SplineActionRunner(i, e, t);
      });
  }
  OnStart() {
    return (
      (this.CreatureData = this.Entity.GetComponent(0)),
      (this.ActorComp = this.Entity.GetComponent(1)),
      (this.MoveComp = this.Entity.GetComponent(36)),
      (this.RecordList = new Map()),
      (this.SplineInfoList = new Map()),
      (this.CacheVector = Vector_1.Vector.Create()),
      (this.CacheVector2 = Vector_1.Vector.Create()),
      (this.PauseHandle = new BaseActorComponent_1.DisableEntityHandle(
        "PausePatrolInGame",
      )),
      !0
    );
  }
  OnActivate() {}
  OnClear() {
    return !0;
  }
  StartPatrol(i, e) {
    if (!this.CurrentPatrol?.IsActive)
      if (this.RestoreSplineState(i) || this.InitSpline(i, e)) {
        var s = new PatrolRecord();
        (this.CurrentPatrol = s),
          (this.CurrentPatrol.IsActive = !0),
          (this.CurrentPatrol.PatrolState = 1),
          (this.CurrentPatrol.OnArrivePointHandle = e.OnArrivePointHandle),
          (this.CurrentPatrol.OnTriggerActionsHandle =
            e.OnTriggerActionsHandle),
          (this.CurrentPatrol.OnPatrolEndHandle = e.OnPatrolEndHandle),
          this.RecordList.set(i, s),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "AI",
              51,
              "[CharacterPatrolComp.StartPatrol] 开始巡逻",
              ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
              ["Actor", this.ActorComp?.Owner?.GetName()],
              ["SplineId", i],
              ["LastPoint", this.CurrentPatrol?.LastPointIndex],
            );
        let t = this.GetNextPointIndex();
        e.UseNearestPoint && (t = this.GetNearestPatrolPointIndex());
        (s = this.GetSegmentInfo(t)),
          (e = this.CurrentSplineInfo.SegmentsMoveConfig[s.SegmentIndex]);
        e &&
          ((e.StartIndex = s.PointIndex),
          this.MoveComp.MoveAlongPath(e),
          this.PatrolBeginRequest());
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "AI",
            51,
            "初始化样条失败，无法开始巡逻",
            ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
            ["SplineId", i],
          ),
          this.ResetState();
  }
  PausePatrol(t) {
    var i;
    this.CurrentPatrol &&
      (this.PauseKeyMap.has(t)
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            51,
            "[CharacterPlanComponent] 重复使用暂停巡逻的Key",
            ["PbDataId", this.CreatureData?.GetPbDataId()],
            ["context", this.constructor.name],
            ["Key", t],
          )
        : ((i = this.PauseHandle.Disable(t, this.constructor.name)),
          this.PauseKeyMap.set(t, i),
          void 0 === this.PauseKey &&
            ((this.PauseKey = this.Disable(
              "[CharacterPatrolComp.PausePatrol]",
            )),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "AI",
                51,
                "[CharacterPatrolComp.PausePatrol] 暂停巡逻",
                ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
                ["Actor", this.ActorComp?.Owner?.GetName()],
                ["SplineId", this.CurrentSplineInfo?.SplineId],
                ["LastPoint", this.CurrentPatrol?.LastPointIndex],
              ),
            (this.CurrentPatrol.IsActive = !1),
            this.MoveComp.StopMove(!0),
            this.PatrolEndRequest())));
  }
  ResumePatrol(t) {
    var i;
    this.CurrentPatrol &&
      ((i = this.PauseKeyMap.get(t)),
      this.PauseKeyMap.delete(t)
        ? this.PauseHandle.Enable(i, this.constructor.name) &&
          this.PauseHandle.Empty &&
          (this.Enable(this.PauseKey, "CharacterPatrolComp.ResumePatrol"),
          (this.PauseKey = void 0),
          (this.CurrentPatrol.IsActive = !0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "AI",
              51,
              "[CharacterPatrolComp.ResumePatrol] 继续巡逻",
              ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
              ["Actor", this.ActorComp?.Owner?.GetName()],
              ["SplineId", this.CurrentSplineInfo?.SplineId],
              ["LastPoint", this.CurrentPatrol?.LastPointIndex],
            ),
          this.MoveAlongPathWithRecord(),
          this.PatrolBeginRequest())
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            51,
            "[CharacterPatrolComp] 继续巡逻使用了未定义的Key",
            ["PbDataId", this.CreatureData?.GetPbDataId()],
            ["context", this.constructor.name],
            ["Key", t],
          ));
  }
  StopPatrol() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "AI",
        51,
        "[CharacterPatrolComp.StopPatrol] 停止巡逻",
        ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
        ["Actor", this.ActorComp?.Owner?.GetName()],
        ["SplineId", this.CurrentSplineInfo?.SplineId],
        ["LastPoint", this.CurrentPatrol?.LastPointIndex],
      ),
      this.MoveComp.StopMove(!0),
      this.RecordList.delete(this.CurrentSplineInfo.SplineId),
      this.ResetState(),
      this.PatrolEndRequest();
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
  SplineActionRunner(i, e, t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "AI",
        51,
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
              51,
              "同步事件执行完毕",
              ["PbDataId", this.CreatureData?.GetPbDataId()],
              ["SplineId", i],
              ["PointIndex", e],
            ),
            (this.RecordList.get(i).PatrolState = 1),
            this.ResumePatrol("ExecuteSplineAction");
        },
      );
  }
  InitSpline(t, i) {
    var e = new GameSplineComponent_1.GameSplineComponent(t);
    if (!this.TryInitSplineFromAiPatrol(e) && !e.Initialize())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelAi",
            43,
            "[CharacterPatrolComp.InitSpline] GameSplineComponent初始化失败",
            ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
            ["SplinePbDataId", t],
          ),
        !1
      );
    if (
      e.Option.Type !== IComponent_1.ESplineType.LevelAI &&
      e.Option.Type !== IComponent_1.ESplineType.Patrol
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelAi",
            51,
            "[CharacterPatrolComp.InitSpline] 非巡逻样条或关卡Ai样条，无法初始化",
            ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
            ["SplinePbDataId", t],
          ),
        !1
      );
    var s = new SplineInfo();
    switch (((s.SplineId = t), (this.CurrentSplineInfo = s), e.Option.Type)) {
      case IComponent_1.ESplineType.Patrol:
        (this.CurrentSplineInfo.IsLoop = !1),
          (this.CurrentSplineInfo.IsCircle = !1),
          e.Option.CycleOption &&
            e.Option.CycleOption.Type === IComponent_1.EPatrolCycleMode.Loop &&
            ((this.CurrentSplineInfo.IsLoop = !0),
            (this.CurrentSplineInfo.IsCircle = e.Option.CycleOption.IsCircle));
        break;
      case IComponent_1.ESplineType.LevelAI:
        (this.CurrentSplineInfo.IsLoop = !0),
          (this.CurrentSplineInfo.IsCircle = !!e.Option.CycleOption?.IsCircle);
    }
    if (
      ((this.CurrentSplineInfo.SplineComp = e),
      (this.CurrentSplineInfo.VirtualSplinePoints = e.PathPoint.slice(0)),
      this.CurrentSplineInfo.IsCircle &&
        2 < this.CurrentSplineInfo.VirtualSplinePoints.length)
    )
      for (let t = e.PathPoint.length - 2; 0 < t; --t)
        this.CurrentSplineInfo.VirtualSplinePoints.push(e.PathPoint[t]);
    return !!this.PartitionSpline(i) && (this.SplineInfoList.set(t, s), !0);
  }
  PartitionSpline(i) {
    if (!this.CurrentSplineInfo) return !1;
    if (!this.CurrentSplineInfo.VirtualSplinePoints.length) return !1;
    this.CurrentSplineInfo.SegmentsMoveConfig = new Array();
    let e = [],
      s = 0;
    var o = this.CurrentSplineInfo.VirtualSplinePoints.length;
    for (let t = 0; t < o; ++t) {
      var h = this.CurrentSplineInfo.VirtualSplinePoints[t];
      e.push(h),
        (t === o - 1 || (h.Actions && 0 !== h.Actions.length)) &&
          (this.CreateMoveConfig(e, s, i), (s += e.length), (e = []));
    }
    return !0;
  }
  CreateMoveConfig(t, i, e) {
    if (this.CurrentSplineInfo?.SplineComp && t.length)
      switch (this.CurrentSplineInfo.SplineComp.Option.Type) {
        case IComponent_1.ESplineType.LevelAI:
          this.CreateLevelAiSplineMoveConfig(t, i, e);
          break;
        case IComponent_1.ESplineType.Patrol:
          this.CreatePatrolSplineMoveConfig(t, i, e);
      }
  }
  CreatePatrolSplineMoveConfig(i, e, t) {
    var s = [];
    for (let t = 0; t < i.length; t++) {
      const r = i[t];
      var o = {
        Index: t,
        Position: r.Point,
        Actions: new Array(),
        MoveState: r.MoveState,
        MoveSpeed: r.MoveSpeed,
        Callback: () => {
          this.UpdatePatrolRecord(t + e),
            r.IsMain &&
              this.CurrentPatrol?.OnArrivePointHandle &&
              this.CurrentPatrol.OnArrivePointHandle();
        },
      };
      s.push(o);
    }
    var h = this.CurrentSplineInfo.SplineComp.Option,
      h = {
        Points: s,
        Navigation: h.IsNavigation ?? !1,
        IsFly: h.IsFloating ?? !1,
        DebugMode: t.DebugMode ?? !1,
        Loop: !1,
        CircleMove: !1,
        UsePreviousIndex: !1,
        UseNearestPoint: !1,
        ReturnFalseWhenNavigationFailed: !1,
      };
    (h.Callback = this.OnSegmentPatrolFinished),
      this.CurrentSplineInfo.SegmentsMoveConfig.push(h);
  }
  CreateLevelAiSplineMoveConfig(t, i, e) {}
  UpdatePatrolRecord(t) {
    this.CurrentPatrol?.IsActive &&
      (this.CurrentSplineInfo.IsLoop &&
        this.CurrentSplineInfo.IsCircle &&
        this.DirectionChangeRequest(t),
      (this.CurrentPatrol.LastPointIndex = t),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "AI",
        51,
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
            ]).StartIndex = i.PointIndex),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "AI",
              51,
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
  ResetState() {
    (this.CurrentPatrol = void 0), (this.CurrentSplineInfo = void 0);
    for (const t of this.PauseKeyMap.values())
      this.PauseHandle.Enable(t, this.constructor.name);
    this.PauseKeyMap.clear(),
      this.PauseKey &&
        (this.Enable(this.PauseKey, "CharacterPatrolComp.ResetState"),
        (this.PauseKey = void 0));
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
      (((t = Protocol_1.Aki.Protocol.WYn.create()).rkn =
        MathUtils_1.MathUtils.NumberToLong(
          this.CreatureData.GetCreatureDataId(),
        )),
      (t.okn =
        this.CurrentPatrol.LastPointIndex <
        this.CurrentSplineInfo.SplineComp.PathPoint.length - 1),
      Net_1.Net.Call(11810, t, () => {}));
  }
  PatrolEndRequest() {
    var t;
    this.CreatureData.IsMonster() &&
      (((t = Protocol_1.Aki.Protocol.QYn.create()).rkn =
        MathUtils_1.MathUtils.NumberToLong(
          this.CreatureData.GetCreatureDataId(),
        )),
      Net_1.Net.Call(21134, t, () => {}));
  }
  DirectionChangeRequest(t) {
    var i;
    this.CreatureData.IsMonster() &&
      (0 === t
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("AI", 51, "往返式巡逻：回到起点", [
              "PbDataID",
              this.ActorComp.CreatureData.GetPbDataId(),
            ]),
          ((i = Protocol_1.Aki.Protocol.YYn.create()).rkn =
            MathUtils_1.MathUtils.NumberToLong(
              this.CreatureData.GetCreatureDataId(),
            )),
          (i.okn = !0),
          Net_1.Net.Call(10604, i, () => {}))
        : t === this.CurrentSplineInfo.SplineComp.PathPoint.length - 1 &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("AI", 51, "往返式巡逻：走到终点", [
              "PbDataID",
              this.ActorComp.CreatureData.GetPbDataId(),
            ]),
          ((i = Protocol_1.Aki.Protocol.YYn.create()).rkn =
            MathUtils_1.MathUtils.NumberToLong(
              this.ActorComp.CreatureData.GetCreatureDataId(),
            )),
          (i.okn = !1),
          Net_1.Net.Call(10604, i, () => {})));
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
          return { SegmentIndex: t, PointIndex: e - i, IsEnd: e - i == o - 1 };
        i += o;
      }
    }
    return { SegmentIndex: -1, PointIndex: -1, IsEnd: !1 };
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
          Log_1.Log.Error("AI", 51, "获取最近点失败", [
            "PbDataId",
            this.ActorComp.CreatureData.GetPbDataId(),
          ]),
        0
      );
    var i = this.CurrentSplineInfo.VirtualSplinePoints;
    let e = 0,
      s = Number.MAX_VALUE;
    var o = this.ActorComp.ActorLocationProxy,
      h = Vector_1.Vector.Create(),
      r = Vector_1.Vector.Create();
    for (let t = 0; t < i.length - 1; t++) {
      h.DeepCopy(i[t].Point),
        r.DeepCopy(i[t + 1].Point),
        this.CacheVector.Set(r.X, r.Y, r.Z),
        this.CacheVector.Subtraction(h, this.CacheVector);
      var n = this.CacheVector.Size();
      this.CacheVector2.Set(o.X, o.Y, o.Z),
        this.CacheVector2.Subtraction(r, this.CacheVector2),
        0 < this.CacheVector.DotProduct(this.CacheVector2) ||
          (this.CacheVector2.Set(o.X, o.Y, o.Z),
          this.CacheVector2.Subtraction(h, this.CacheVector2),
          this.CacheVector.DotProduct(this.CacheVector2) < 0) ||
          this.CacheVector.DotProduct(this.ActorComp.ActorForwardProxy) < 0 ||
          (this.CacheVector.CrossProduct(this.CacheVector2, this.CacheVector),
          (n = this.CacheVector.Size() / n) < s && ((s = n), (e = t + 1)));
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
                51,
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
  TryInitSplineFromAiPatrol(i) {
    var t = this.Entity.GetComponent(38)?.AiController.AiPatrol;
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
  [(0, RegisterComponent_1.RegisterComponent)(39)],
  CharacterPatrolComponent,
)),
  (exports.CharacterPatrolComponent = CharacterPatrolComponent);
//# sourceMappingURL=CharacterPatrolComponent.js.map
