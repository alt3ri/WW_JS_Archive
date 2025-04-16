"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSplineMoveTask = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  SplineMoveTaskBase_1 = require("./SplineMoveTaskBase"),
  CHARACTER_TRACE_DISTANCE = 50;
class CharacterSplineMoveTask extends SplineMoveTaskBase_1.SplineMoveTaskBase {
  constructor(e, t, i) {
    super(e),
      (this.Spline = t),
      (this.SplineData = i),
      (this.gLe = void 0),
      (this.RCl = !1),
      (this.il = 0),
      (this.wXt = 0),
      (this.B7 = void 0),
      (this.xsa = (e, t) => {
        this.EntityHandle?.Entity?.Valid &&
          t !== CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
          (t = this.EntityHandle.Entity.GetComponent(44)) &&
          t.IsMovingToLocation() &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("AI", 42, "MoveWithSpline打断墙上移动"),
          t.MoveToLocationEnd(2));
      });
  }
  static Create(e, t) {
    e = new CharacterSplineMoveTask(e, t.Spline, t.SplineData);
    return (
      (e.gLe = t.EventParam), (e.RCl = t.NoSyncPoint), (e.B7 = t.Callback), e
    );
  }
  OnStartTask() {
    super.OnStartTask(),
      this.EntityHandle.Entity.GetComponent(0)?.IsNpc() && this.gLe?.NpcFollow
        ? (this.EntityHandle.Entity.GetComponent(185)?.PauseAi(
            "StartMoveWithSpline",
          ),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.EntityHandle.Entity,
            EventDefine_1.EEventName.StartMoveWithSpline,
            this.gLe,
            this.RCl,
            (e) => {
              this.EndTask(e);
            },
          ))
        : (this.LCl(), this.ODe());
  }
  OnEndTask(e) {
    super.OnEndTask(e);
    var t,
      i,
      s = this.EntityHandle.Entity.GetComponent(3);
    s?.Actor.CapsuleComponent.SetCollisionResponseToChannel(
      QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
      2,
    ),
      this.gLe?.CheckClimb &&
        this.EntityHandle?.Entity?.Valid &&
        EventSystem_1.EventSystem.HasWithTarget(
          this.EntityHandle.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.xsa,
        ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.EntityHandle.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.xsa,
        ),
      s?.ClearInput(),
      "Player" === this.gLe?.MoveTarget.Type &&
        ((s = this.EntityHandle.Entity.GetComponent(44)),
        (t = this.EntityHandle.Entity.GetComponent(99)),
        s && (s.StopMove(!1), (i = t?.MoveState), s.ResetMaxSpeed(i)),
        this.gLe?.CheckClimb &&
          (s = this.EntityHandle.Entity.GetComponent(34)) &&
          t &&
          t.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
          s.KickWallExit(),
        (i = this.EntityHandle.Entity.GetComponent(61))?.ClearMoveVectorCache(),
        i?.SetActive(!0)),
      (this.EntityHandle.Entity.GetComponent(44).IsSpecialMove = !1),
      this.EntityHandle.Entity.GetComponent(0)?.IsNpc() &&
        this.gLe?.NpcFollow &&
        this.EntityHandle.Entity.GetComponent(185)?.ResumeAi(
          "StartMoveWithSpline",
        ),
      this.B7?.(e);
  }
  nKl(e, t) {
    var i = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation,
      s = (i.Set(e.X, e.Y, e.Z), this.gLe.CheckClimb.Direction),
      r = CharacterSplineMoveTask.Gco,
      a = CharacterSplineMoveTask.jye,
      s =
        (r.Set(s.Y ?? 0, s.Z ?? 0, s.X ?? 0),
        r.Vector(a),
        a.Normalize(),
        a.MultiplyEqual(this.gLe.CheckClimb.Distance),
        ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation),
      r =
        (s.Set(e.X + a.X, e.Y + a.Y, e.Z + a.Z),
        ModelManager_1.ModelManager.TraceElementModel.GetLineTrace()),
      e =
        ((r.WorldContextObject = t.Owner),
        r.ActorsToIgnore.Empty(),
        r.ActorsToIgnore.Add(t.Owner),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, i),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, s),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          r,
          "MoveWithSplineDetectClimb",
        )),
      a = r.HitResult;
    return r.ClearCacheData(), [e, a];
  }
  sKl() {
    var e = this.EntityHandle.Entity.GetComponent(1),
      t = e.ActorLocationProxy,
      t = this.nKl(t, e.Owner);
    if (!t[0])
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("AI", 42, "MoveWithSpline上墙失败,射线检测不到墙面"),
        !1
      );
    var t = t[1],
      i = CharacterSplineMoveTask.jye,
      s =
        (TraceElementCommon_1.TraceElementCommon.GetImpactNormal(t, 0, i),
        i.MultiplyEqual(CHARACTER_TRACE_DISTANCE),
        CharacterSplineMoveTask.RTe),
      t =
        (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(t, 0, s),
        s.AdditionEqual(i),
        this.EntityHandle.Entity.GetComponent(175)),
      r = t.GetMeshTransform(),
      e =
        (e.SetActorLocation(s.ToUeVector(), "MoveWithSplineDetectClimb", !0),
        t.SetModelBuffer(r, 10),
        i),
      s = (e.UnaryNegation(e), this.EntityHandle.Entity.GetComponent(99));
    if (
      s?.PositionState !==
        CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
      !this.EntityHandle.Entity.GetComponent(34)?.DetectClimbWithDirect(
        !1,
        e.ToUeVector(),
        !0,
      )
    )
      return !1;
    return !0;
  }
  ODe() {
    if (this.gLe?.CheckClimb && !this.sKl())
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("AI", 42, "MoveWithSpline上墙失败"),
        void this.EndTask(!1)
      );
    var t = this.SplineData && this.SplineData.Points.length,
      i = [];
    for (let e = this.il; e <= this.wXt; ++e)
      i.push(
        Vector_1.Vector.Create(this.Spline.D_GetLocationAtSplinePoint(e, 1)),
      );
    var s = [];
    for (let e = this.il; e <= this.wXt; ++e) {
      var r,
        a = e - this.il,
        a = { Index: a, Position: i[a] };
      t &&
        ((r = this.SplineData.Points[e])?.MoveSpeed &&
          (a.MoveSpeed = r.MoveSpeed),
        r?.MoveState) &&
        (a.MoveState = r.MoveState),
        s.push(a);
    }
    var e = {
        Points: s,
        Navigation: this.SplineData?.IsNavigation ?? !1,
        IsFly: this.gLe?.IsFollowStrictly ?? this.SplineData?.IsFloating ?? !1,
        DebugMode: !0,
        Loop: !1,
        UseNearestPoint: !0,
        Callback: (e) => {
          1 === e ? this.EndTask(!0) : this.EndTask(!1);
        },
        ReturnFalseWhenNavigationFailed: !1,
        NoAsyncPoint: this.RCl,
        StartIndex: this.gLe?.CheckClimb && 1 < s.length ? 1 : 0,
      },
      h =
        (this.SplineData?.CycleOption &&
          this.SplineData.CycleOption.Type ===
            IComponent_1.EPatrolCycleMode.Loop &&
          ((e.Loop = !0),
          (e.CircleMove = this.SplineData.CycleOption.IsCircle)),
        this.SplineData?.TurnSpeed && (e.TurnSpeed = this.SplineData.TurnSpeed),
        this.EntityHandle.Entity.GetComponent(44));
    h.IsMovingToLocation() && h.MoveToLocationEnd(1),
      this.EntityHandle.Entity.GetComponent(
        3,
      )?.Actor.CapsuleComponent.SetCollisionResponseToChannel(
        QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
        0,
      ),
      h.MoveAlongPath(e),
      this.gLe?.CheckClimb &&
        this.EntityHandle.Entity?.Valid &&
        !EventSystem_1.EventSystem.HasWithTarget(
          this.EntityHandle.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.xsa,
        ) &&
        EventSystem_1.EventSystem.AddWithTarget(
          this.EntityHandle.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.xsa,
        );
  }
  LCl() {
    var e = this.Spline.GetNumberOfSplinePoints();
    (this.il = this.gLe.StartPointIndex
      ? MathUtils_1.MathUtils.Clamp(this.gLe.StartPointIndex, 0, e - 1)
      : 0),
      (this.wXt = this.gLe.EndPointIndex
        ? MathUtils_1.MathUtils.Clamp(this.gLe.EndPointIndex, 0, e - 1)
        : e - 1);
  }
}
((exports.CharacterSplineMoveTask = CharacterSplineMoveTask).Gco =
  Rotator_1.Rotator.Create()),
  (CharacterSplineMoveTask.jye = Vector_1.Vector.Create()),
  (CharacterSplineMoveTask.RTe = Vector_1.Vector.Create());
//# sourceMappingURL=CharacterSplineMoveTask.js.map
