"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var o,
      s = arguments.length,
      h =
        s < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(e, t, i, n);
    else
      for (var r = e.length - 1; 0 <= r; r--)
        (o = e[r]) && (h = (s < 3 ? o(h) : 3 < s ? o(t, i, h) : o(t, i)) || h);
    return 3 < s && h && Object.defineProperty(t, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemMoveComponent =
    exports.SceneItemSplineMoveAtDynamicSpeedEditableParam =
    exports.SceneItemSplineMoveAtDynamicSpeedParam =
    exports.SceneItemSplineMoveAtConstantTimeParam =
    exports.MoveTarget =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../../../UniverseEditor/Interface/IAction"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  SceneItemSplineMoveTask_1 = require("../../../../LevelGamePlay/SplineMoveTask/SceneItemSplineMoveTask"),
  SplineMoveTaskUtils_1 = require("../../../../LevelGamePlay/SplineMoveTask/SplineMoveTaskUtils"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SCENEITEM_MOVE_DEBUG_KEY = "SCENEITEM_MOVE_DEBUG",
  OFFSET = 100,
  SPLINE_MOVE_SYNC_DIST_DEVIATION_TOLERANCE = 100;
class MoveTarget {
  constructor(e, t, i = 0, n = -1, o = -1) {
    (this.TargetPosData = e),
      (this.MoveTime = t),
      (this.StayTime = i),
      (this.MaxSpees = n),
      (this.Acceleration = o);
  }
}
exports.MoveTarget = MoveTarget;
class SceneItemSplineMoveBaseParam {
  constructor(e) {
    (this.Spline = e),
      (this.IsCycle = !1),
      (this.IsKeepLookAt = !1),
      (this.StartDis = -1),
      (this.EndDis = -1);
  }
}
class SceneItemSplineMoveAtConstantTimeParam extends SceneItemSplineMoveBaseParam {
  constructor() {
    super(...arguments),
      (this.IsRepeat = !1),
      (this.TimeSec = 0),
      (this.TimeDisCurve = void 0),
      (this.StartTimeOffset = 0);
  }
}
exports.SceneItemSplineMoveAtConstantTimeParam =
  SceneItemSplineMoveAtConstantTimeParam;
class SceneItemSplineMoveAtDynamicSpeedParam extends SceneItemSplineMoveBaseParam {
  constructor() {
    super(...arguments),
      (this.MaxMoveTimes = -1),
      (this.InitSpeed = 0),
      (this.TargetSpeed = 0),
      (this.Acceleration = 0);
  }
}
exports.SceneItemSplineMoveAtDynamicSpeedParam =
  SceneItemSplineMoveAtDynamicSpeedParam;
class SceneItemSplineMoveAtDynamicSpeedEditableParam {
  constructor() {
    (this.CurrentSpeed = void 0),
      (this.TargetSpeed = void 0),
      (this.Acceleration = void 0);
  }
  Clear() {
    (this.CurrentSpeed = void 0),
      (this.TargetSpeed = void 0),
      (this.Acceleration = void 0);
  }
  Equals(e) {
    return (
      !!e &&
      this.CurrentSpeed === e.CurrentSpeed &&
      this.TargetSpeed === e.TargetSpeed &&
      this.Acceleration === e.Acceleration
    );
  }
}
exports.SceneItemSplineMoveAtDynamicSpeedEditableParam =
  SceneItemSplineMoveAtDynamicSpeedEditableParam;
let SceneItemMoveComponent = class SceneItemMoveComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.o4o = void 0),
      (this.Nln = void 0),
      (this.Oln = void 0),
      (this.kln = !1),
      (this.ZPl = !1),
      (this.Anr = Vector_1.Vector.Create()),
      (this.Fln = []),
      (this._ii = 1),
      (this._ae = Vector_1.Vector.Create()),
      (this.Due = Vector_1.Vector.Create()),
      (this.Vln = Vector_1.Vector.Create()),
      (this.Hln = -0),
      (this.jln = !1),
      (this.Wln = !1),
      (this.BNn = !1),
      (this.wNn = []),
      (this.hIn = []),
      (this.si1 = () => {
        (this.jln = !1),
          this.RemoveStopMoveCallback(this.si1),
          0 < this.Xd_.length && this.RemoveAllOnArrivePointCallbacks(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              39,
              "SceneItemMoveComponent 样条移动停止",
              ["EntityId", this.Entity.Id],
            ),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemSplineMoveStopped,
            this.Entity,
          );
      }),
      (this.Xd_ = []),
      (this.lIn = () => {
        this.BNn = !0;
        for (const e of this.hIn) e(this.Entity);
        this.BNn = !1;
        for (const t of this.wNn) this.hIn.push(t);
        this.wNn.length = 0;
      });
  }
  static get Dependencies() {
    return [200, 0];
  }
  get IsMovingPrepareCompleted() {
    return this.Wln;
  }
  get IsMoving() {
    return Info_1.Info.EnableForceTick
      ? 0 < this.Fln.length || 0 === this._ii
      : this.IsMovingPrepareCompleted
        ? this.o4o.IsMoving()
        : 0 < this.Fln.length;
  }
  get ForceSyncing() {
    return this.ZPl;
  }
  set ForceSyncing(e) {
    (this.ZPl = e),
      this.ZPl &&
        this.Nln?.SetEnableMovementSync(
          !0,
          "SceneItemMoveComponent ForceSyncing",
        );
  }
  IsSplineMoving() {
    return (
      !!this.IsMovingPrepareCompleted && 0 !== this.o4o.GetSplineRunState()
    );
  }
  GetDistanceAloneSpline() {
    return this.IsMovingPrepareCompleted
      ? this.o4o.GetDistanceAlongSpline()
      : 0;
  }
  OnStart() {
    var e = this.Entity.GetComponent(0);
    return (
      (this.ActorComp = this.Entity.GetComponent(200)),
      (this.Nln = this.Entity.GetComponent(156)),
      (this.Oln = this.Entity.GetComponent(128)),
      this.Nln?.SetEnableMovementSync(!1, "SceneItemMoveComponent OnStart"),
      e &&
        e.GetPbEntityInitData() &&
        !Info_1.Info.EnableForceTick &&
        ((this.o4o = this.ActorComp.Owner.GetComponentByClass(
          UE.KuroSceneItemMoveComponent.StaticClass(),
        )),
        this.o4o?.IsValid() ||
          (this.o4o = this.ActorComp.Owner.AddComponentByClass(
            UE.KuroSceneItemMoveComponent.StaticClass(),
            !1,
            new UE.Transform(),
            !1,
          )),
        this.o4o.Kuro_SetGravityDirect(
          this.ActorComp.ActorGravityDirectProxy.ToUeVectorOld(),
        ),
        this.o4o.SetTickingMoveEnable(!1)),
      !0
    );
  }
  OnActivate() {
    if (!Info_1.Info.EnableForceTick && 0 < this.Fln.length) {
      for (const t of this.Fln)
        this.o4o.AddMoveTarget(
          new UE.VectorDouble(
            t.TargetPosData.X ?? 0,
            t.TargetPosData.Y ?? 0,
            t.TargetPosData.Z ?? 0,
          ),
          t.MoveTime,
          t.StayTime,
        );
      (this.Fln = []),
        this.o4o.SetTickingMoveEnable(!0),
        (this.Oln.IsMoving = !0);
    }
    this.Wln = !0;
    var e = this.Entity.GetComponent(0);
    e?.PbMoveSplineId &&
      this.OnRecvSyncSplineMoving(
        e.PbMoveSplineId,
        e.PbMoveSplineConfig,
        e.PbMoveSplineSceneItemRuntimeData,
      );
  }
  Kln() {
    return Vector_1.Vector.DistSquared(this._ae, this.Vln) >= this.Hln;
  }
  OnTick(e) {
    this.Oln.IsMoving
      ? (this.IsMoving && 2 !== this.o4o.GetSimpleRunState()) ||
        (this.Oln.IsMoving = !1)
      : this.IsMoving &&
        1 === this.o4o.GetSimpleRunState() &&
        (this.Oln.IsMoving = !0),
      !this.kln ||
        this.IsMoving ||
        this.ForceSyncing ||
        ((this.kln = !1),
        this.Nln?.GetEnableMovementSync() &&
          this.Nln?.SetEnableMovementSync(
            !1,
            "SceneItemMoveComponent MoveStop",
          ));
  }
  OnForceTick(e) {
    var t, i;
    super.OnTick(e),
      0 === this._ii
        ? (this.Anr.Addition(this.ActorComp.ActorLocationProxy, this.Vln),
          this.Kln()
            ? (this.ActorComp.SetActorLocation(this.Due.ToUeVector()),
              (this._ii = 1))
            : this.ActorComp.SetActorLocation(this.Vln.ToUeVector()))
        : this.Fln &&
          0 !== this.Fln.length &&
          ((t = this.Fln[0]),
          this.Fln.splice(0, 1),
          (this.Due = Vector_1.Vector.Create(
            t.TargetPosData.X,
            t.TargetPosData.Y,
            t.TargetPosData.Z,
          )),
          t.MoveTime <= MathUtils_1.MathUtils.KindaSmallNumber
            ? this.ActorComp.SetActorLocation(this.Due.ToUeVector())
            : (this._ae.DeepCopy(this.ActorComp.ActorLocationProxy),
              (this.Hln = Vector_1.Vector.DistSquared(this._ae, this.Due)),
              (i = Vector_1.Vector.Create()),
              this.Due.Subtraction(this._ae, i),
              i.Division(
                (t.MoveTime * TimeUtil_1.TimeUtil.InverseMillisecond) / e,
                i,
              ),
              (this.Anr = i),
              (this._ii = 0)));
  }
  AddSimpleRotation(e, t, i, n) {
    this.o4o.InitRotationData(e, !1),
      this.o4o.AddRotationStep(t.ToUeRotator(), i.ToUeRotator(), n, 0, void 0),
      this.o4o.StartRotate();
  }
  bSa(e) {
    var t;
    !Info_1.Info.EnableForceTick && this.IsMovingPrepareCompleted
      ? ((t = Vector_1.Vector.Create(
          e.TargetPosData.X ?? 0,
          e.TargetPosData.Y ?? 0,
          e.TargetPosData.Z ?? 0,
        )),
        this.o4o.AddMoveTarget(
          t.ToUeVector(),
          e.MoveTime,
          e.StayTime,
          e.MaxSpees,
          e.Acceleration,
        ),
        this.Oln.IsMoving || this.AddStopMoveCallback(this.lIn),
        this.o4o.SetTickingMoveEnable(!0),
        (t = Vector_1.Vector.Dist(t, this.ActorComp.ActorLocationProxy)),
        0 === this.o4o.GetSimpleRunState() &&
          t > OFFSET &&
          (this.Oln.IsMoving = !0))
      : this.Fln.push(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Movement",
          31,
          "添加路径点",
          ["moveTargetX", e.TargetPosData.X],
          ["moveTargetY", e.TargetPosData.Y],
          ["moveTargetZ", e.TargetPosData.Z],
          ["Time", e.MoveTime],
        );
  }
  AddMoveTarget(t) {
    if (this.jln)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneItem",
          31,
          "当前SceneItem正在巡逻中,不可再添加目标点",
          ["PbDataId", this.Entity.GetComponent(0).GetPbDataId()],
        );
    else {
      let e = void 0;
      var i;
      (e =
        t instanceof MoveTarget
          ? t
          : ((i =
              t.MoveMotion?.Type === IAction_1.EMoveMotion.VariableMotion
                ? -1
                : (t.MoveMotion?.Time ?? 0)),
            new MoveTarget(t.Point, i))),
        this.bSa(e),
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          this.RequestMoveToTarget(e);
    }
  }
  GetNextTarget() {
    var e, t;
    return this.o4o?.IsValid()
      ? ((e = (0, puerts_1.$ref)(new UE.VectorDouble())),
        (t = (0, puerts_1.$ref)(new UE.VectorDouble())),
        {
          HasTarget: this.o4o.GetNextMoveTarget(e, t),
          Target: (0, puerts_1.$unref)(e),
          Velocity: (0, puerts_1.$unref)(t),
        })
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            31,
            "SceneItemMoveComponent不存在",
            ["PbDataId", this.Entity.GetComponent(0).GetPbDataId()],
            ["IsEntityInit", this.Entity.IsInit],
          ),
        {
          HasTarget: !1,
          Target: new UE.VectorDouble(),
          Velocity: new UE.VectorDouble(),
        });
  }
  RequestMoveToTarget(e) {
    var t = Protocol_1.Aki.Protocol.d0a.create();
    (t.M0a = Protocol_1.Aki.Protocol.E0a.create()),
      (t.M0a.F4n = this.ActorComp.CreatureData.GetCreatureDataId()),
      (t.M0a.P5n = {
        X: e.TargetPosData.X,
        Y: e.TargetPosData.Y,
        Z: e.TargetPosData.Z,
      }),
      (t.M0a.g0a = e.MoveTime),
      (t.M0a.f0a = e.StayTime),
      (t.M0a.v0a = e.MaxSpees),
      (t.M0a.p0a = e.Acceleration),
      Net_1.Net.Call(21098, t, (e) => {});
  }
  HandleMoveToTarget(e) {
    e = new MoveTarget(
      { X: e.M0a.P5n.X, Y: e.M0a.P5n.Y, Z: e.M0a.P5n.Z },
      e.M0a.g0a,
      e.M0a.f0a,
      e.M0a.v0a,
      e.M0a.p0a,
    );
    this.bSa(e);
  }
  StartSplineMoveTask(e) {
    this.GetCurSplineMoveTask() &&
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "SceneItem",
          39,
          "SceneItemMoveComponent 样条移动任务未结束时开始新任务，清除旧任务",
          ["EntityId", this.Entity.Id],
        ),
      ControllerHolder_1.ControllerHolder.SplineMoveTaskController.EndEntityTasks(
        this.Entity.Id,
      ));
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
      this.Entity.Id,
    );
    SceneItemSplineMoveTask_1.SceneItemSplineMoveTask.Create(t, e).StartTask();
  }
  GetCurSplineMoveTask() {
    var e =
      ControllerHolder_1.ControllerHolder.SplineMoveTaskController.GetEntityCurSplineMoveTask(
        this.Entity.Id,
      );
    if (e) return e;
  }
  StartSplineMoveAtConstantTimeImplement(e, t, i = !0) {
    return this.o4o.StartMoveWithSplineAtConstantTime(
      e.Spline,
      e.IsRepeat,
      e.IsCycle,
      e.IsKeepLookAt,
      e.TimeSec,
      e.TimeDisCurve,
      e.StartTimeOffset,
      e.StartDis,
      e.EndDis,
    )
      ? ((this.jln = !0),
        (this.kln = i),
        this.Nln?.SetEnableMovementSync(
          i,
          "SceneItemMoveComponent StartPatrolAtConstantTime",
        ),
        this.AddStopMoveCallback(this.si1),
        t && this.AddStopMoveCallback(t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            39,
            "SceneItemMoveComponent 样条移动(ConstantTime)开始",
            ["EntityId", this.Entity.Id],
          ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemSplineMoveStarted,
          this.Entity,
        ),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            39,
            "SceneItemMoveComponent 样条移动(ConstantTime)开始失败",
            ["EntityId", this.Entity.Id],
          ),
        !1);
  }
  StartSplineMoveAtDynamicSpeedImplement(e, t, i = !0) {
    return this.o4o.StartMoveWithSplineAtDynamicSpeed(
      e.Spline,
      e.MaxMoveTimes,
      e.IsCycle,
      e.IsKeepLookAt,
      e.InitSpeed,
      e.Acceleration,
      e.TargetSpeed,
      e.StartDis,
      e.EndDis,
    )
      ? ((this.jln = !0),
        (this.kln = i),
        this.Nln?.SetEnableMovementSync(
          i,
          "SceneItemMoveComponent StartPatrolAtDynamicSpeed",
        ),
        this.AddStopMoveCallback(this.si1),
        t && this.AddStopMoveCallback(t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            39,
            "SceneItemMoveComponent 样条移动(DynamicSpeed)开始",
            ["EntityId", this.Entity.Id],
          ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemSplineMoveStarted,
          this.Entity,
        ),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            39,
            "SceneItemMoveComponent 样条移动(DynamicSpeed)开始失败",
            ["EntityId", this.Entity.Id],
          ),
        !1);
  }
  UpdatePatrolAtDynamicSpeedEditableParam(e) {
    var t, i, n;
    return (
      !(!this.IsSplineMoving() || !this.o4o) &&
      ((n = this.o4o.SplineMoveData.DynamicSpeedData),
      (t = e.CurrentSpeed ?? n.CurrentSpeed),
      (i = e.Acceleration ?? n.Acceleration),
      (e = e.TargetSpeed ?? n.TargetSpeed),
      (n = this.o4o.UpdateDynamicSpeedSplineMoveParams(t, i, e))
        ? (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(
            SCENEITEM_MOVE_DEBUG_KEY,
          ) &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneItem",
              39,
              "SceneItemMoveComponent 更新样条移动参数",
              ["EntityId", this.Entity.Id],
              ["当前速度", t],
              ["加速度", i],
              ["目标速度", e],
            ),
          n)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              39,
              "SceneItemMoveComponent 更新样条移动动态参数失败",
              ["EntityId", this.Entity.Id],
            ),
          !1))
    );
  }
  UpdateSplineMoveDistance(e) {
    return (
      !(!this.IsSplineMoving() || !this.o4o) &&
      this.o4o.UpdateSplineMoveDistance(e)
    );
  }
  UpdateSplineMoveDistanceByPos(e) {
    return (
      !(!this.IsSplineMoving() || !this.o4o) &&
      this.o4o.UpdateSplineMoveDistanceByPosition(e.ToUeVector())
    );
  }
  UpdateSplineMoveDistanceByRuntimeData(
    e,
    t = SPLINE_MOVE_SYNC_DIST_DEVIATION_TOLERANCE,
  ) {
    return !(
      !this.IsSplineMoving() ||
      !this.o4o ||
      (void 0 !== e.DistanceAloneSpline
        ? (MathUtils_1.MathUtils.IsNearlyEqual(
            e.DistanceAloneSpline,
            this.o4o.GetDistanceAlongSpline(),
            t,
          )
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "SceneItem",
                39,
                "[SceneItemMoveComponent.UpdateSplineMoveDistanceByRuntimeData] 样条移动进度相差过小，不更新",
                ["EntityId", this.Entity.Id],
                ["NewDistanceAlongSpline", e.DistanceAloneSpline],
              )
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneItem",
                  39,
                  "[SceneItemMoveComponent.UpdateSplineMoveDistanceByRuntimeData] 更新样条移动进度",
                  ["EntityId", this.Entity.Id],
                  ["NewDistanceAlongSpline", e.DistanceAloneSpline],
                ),
              this.o4o.UpdateSplineMoveDistance(e.DistanceAloneSpline)),
          0)
        : !e.CurPos ||
          (Vector_1.Vector.Distance(
            this.ActorComp.ActorLocationProxy,
            e.CurPos,
          ) > t
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneItem",
                  39,
                  "[SceneItemMoveComponent.UpdateSplineMoveDistanceByRuntimeData] 更新样条移动进度",
                  ["EntityId", this.Entity.Id],
                  ["NewPos", e.CurPos],
                ),
              this.UpdateSplineMoveDistanceByPos(e.CurPos))
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "SceneItem",
                39,
                "[SceneItemMoveComponent.UpdateSplineMoveDistanceByRuntimeData] 样条移动进度相差过小，不更新",
                ["EntityId", this.Entity.Id],
                ["NewPos", e.CurPos],
              ),
          0))
    );
  }
  GetSplineMoveDynamicSpeedData() {
    if (this.o4o?.IsMoving()) return this.o4o.SplineMoveData.DynamicSpeedData;
  }
  OnRecvSyncSplineMoving(e, t, i) {
    var n,
      o = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(e),
      o = o
        ? (0, IComponent_1.getComponent)(o.ComponentsData, "SplineComponent")
        : void 0;
    o?.Option
      ? ((n =
          SplineMoveTaskUtils_1.SplineMoveTaskUtils.CreateDefaultSceneItemSplineMoveConfig()),
        SplineMoveTaskUtils_1.SplineMoveTaskUtils.ParseSplineDataToSceneItemSplineMoveConfig(
          o.Option,
          n,
        ),
        void 0 !== t?.wRc && (n.IsLookDir = t?.wRc),
        void 0 !== t?.ARc && (n.IsClosedLoop = t?.ARc),
        void 0 !== t?.RRc && (n.MoveCount = t.RRc),
        (n.SplineMoveRange = {
          Type: 0,
          StartIndex: t?.bRc ?? -1,
          EndIndex: t?.LRc ?? -1,
        }),
        (o = {
          DistanceAloneSpline: i?.URc,
          CurPos: i?.BRc ? Vector_1.Vector.Create(i.BRc) : void 0,
        }),
        (t = this.GetCurSplineMoveTask())
          ? t.CheckSplineMoveConfigEqual(n)
            ? this.IsSplineMoving() && this.o4o
              ? (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "SceneItem",
                    39,
                    "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 当前样条移动task参数与同步信息相同，更新进度",
                    ["EntityId", this.Entity.Id],
                    ["SplineEntityId", e],
                    ["SplineMoveRuntimeData", o],
                    ["SplineMoveConfig", n],
                  ),
                this.UpdateSplineMoveDistanceByRuntimeData(o))
              : Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneItem",
                  39,
                  "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 当前样条移动task仍未开始样条移动，暂不更新进度",
                  ["EntityId", this.Entity.Id],
                  ["SplineEntityId", e],
                  ["SplineMoveRuntimeData", o],
                  ["SplineMoveConfig", n],
                )
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneItem",
                  39,
                  "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 当前样条移动task参数与同步信息不同，中断并开始新的样条移动task",
                  ["EntityId", this.Entity.Id],
                  ["SplineEntityId", e],
                  ["SplineMoveRuntimeData", o],
                  ["SplineMoveConfig", n],
                ),
              t.EndTask(!1),
              this.StartSplineMoveTask({
                SplineId: e,
                SplineMoveConfig: n,
                EnableSplineMoveSync: !0,
                EnableMovementSync: !1,
                NeedMoveToStartPoint: !1,
                SplineMoveRuntimeData: o,
              }))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "SceneItem",
                39,
                "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 当前没有样条移动task，直接开始新的样条移动task",
                ["EntityId", this.Entity.Id],
                ["SplineEntityId", e],
                ["SplineMoveRuntimeData", o],
                ["SplineMoveConfig", n],
              ),
            this.StartSplineMoveTask({
              SplineId: e,
              SplineMoveConfig: n,
              EnableSplineMoveSync: !0,
              EnableMovementSync: !1,
              NeedMoveToStartPoint: !1,
              SplineMoveRuntimeData: o,
            })))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneItem",
          39,
          "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 找不到样条配置",
          ["EntityId", this.Entity.Id],
          ["SplineEntityId", e],
        );
  }
  OnRecvSyncSplineStop(e, t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "SceneItem",
        39,
        "[SceneItemMoveComponent.OnRecvSyncSplineStop] 停止样条移动task",
        ["EntityId", this.Entity.Id],
        ["SplineEntityId", e],
      ),
      this.GetCurSplineMoveTask()?.EndTask(!0);
  }
  OnRecvSyncSplineInterrupt(e, t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "SceneItem",
        39,
        "[SceneItemMoveComponent.OnRecvSyncSplineStop] 停止样条移动task",
        ["EntityId", this.Entity.Id],
        ["SplineEntityId", e],
      ),
      this.GetCurSplineMoveTask()?.EndTask(!1);
  }
  AddOnArrivePointCallback(e) {
    this.Xd_.push(e), this.o4o.OnArrivePointCallback.Add(e);
  }
  RemoveOnArrivePointCallback(e) {
    this.o4o.OnArrivePointCallback.Remove(e);
  }
  RemoveAllOnArrivePointCallbacks() {
    for (const e of this.Xd_) this.o4o.OnArrivePointCallback.Remove(e);
    this.Xd_.length = 0;
  }
  StopMove(e = !1) {
    var t, i;
    Info_1.Info.EnableForceTick
      ? ((this.Fln = []), (this._ii = 1))
      : this.IsMovingPrepareCompleted
        ? ((this.hIn.length = 0) < this.Xd_.length &&
            this.RemoveAllOnArrivePointCallbacks(),
          (i =
            !!(t = this.o4o?.IsMoving(!0)) &&
            0 !== this.o4o?.GetSimpleRunState()),
          this.o4o.StopAllMove(e),
          t &&
            (i
              ? Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneItem",
                  39,
                  "SceneItemMoveComponent 简单移动中断",
                  ["EntityId", this.Entity.Id],
                )
              : (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneItem",
                    39,
                    "SceneItemMoveComponent 样条移动中断",
                    ["EntityId", this.Entity.Id],
                  ),
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnSceneItemSplineMoveBroken,
                  this.Entity,
                ))))
        : (this.Fln = []);
  }
  AddStopMoveCallback(e) {
    this.o4o.OnStopCallback.Add(e);
  }
  RemoveStopMoveCallback(e) {
    this.o4o.OnStopCallback.Remove(e);
  }
  AddStopMoveCallbackWithEntity(e) {
    (this.BNn ? this.wNn : this.hIn).push(e);
  }
  RemoveStopMoveCallbackWithEntity(e) {
    this.hIn.includes(e) && this.hIn.splice(this.hIn.indexOf(e), 1);
  }
  ClearStopMoveCallbackWithEntity() {
    this.hIn.length = 0;
  }
  GetDebugString() {
    let e = "";
    var t;
    return (
      this.o4o?.IsValid() &&
        ((t = this.o4o.IsMoving(!0)),
        (e += `移动中: ${t}
`),
        t) &&
        ((t = this.o4o.GetSimpleRunState()),
        (e += `简单移动状态: ${t}
`),
        (t = this.o4o.GetSplineRunState()),
        (e += `样条移动状态: ${t}
`),
        0 !== t) &&
        ((t = this.o4o.SplineMoveData.DynamicSpeedData),
        (e =
          (e =
            (e =
              (e =
                (e += `动态速度参数:
`) +
                `	CurrentSpeed: ${t.CurrentSpeed.toFixed(2)}
`) +
              `	TargetSpeed: ${t.TargetSpeed.toFixed(2)}
`) +
            `	Acceleration: ${t.Acceleration.toFixed(2)}
`) +
          `	EndDis: ${t.EndDis.toFixed(2)}
`),
        (t = this.o4o.SplineMoveData.StaticTimeDisData),
        (e =
          (e += `固定时间参数:
`) +
          `	TimeDisCurveValid: ${!!t.TimeDisCurve?.IsValid()}
`)),
      e
    );
  }
};
(SceneItemMoveComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(126)],
  SceneItemMoveComponent,
)),
  (exports.SceneItemMoveComponent = SceneItemMoveComponent);
//# sourceMappingURL=SceneItemMoveComponent.js.map
