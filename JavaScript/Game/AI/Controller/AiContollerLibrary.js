"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiControllerLibrary = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CharacterController_1 = require("../../NewWorld/Character/CharacterController");
const MIN_NAVIGATION_FINAL_DIST_SQUARD = 1e4;
const MIN_NAVIGATION_FINAL_HEIGHt = 200;
const DEFAULT_NAVIGATION_BLOCK_LENGTH = 100;
const defaultBlockHalfExtent = new UE.Vector(1, 1, 500);
class AiControllerLibrary {
  static NavigationFindPath(t, r, i, o = void 0, e, a) {
    if (
      !UE.NavigationSystemV1.K2_ProjectPointToNavigation(
        t,
        r,
        void 0,
        void 0,
        void 0,
        defaultBlockHalfExtent,
        -1,
      )
    )
      return (
        o &&
          (o.push(Vector_1.Vector.Create(r)),
          o.push(Vector_1.Vector.Create(i))),
        !a
      );
    const l = UE.NavigationSystemV1.FindPathToLocationSynchronously(t, r, i);
    if (!l)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("AI", 43, "没有寻到路", ["from", r], ["to", i]),
        !1
      );
    const s = l.PathPoints.Num();
    if (s < 2)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            43,
            "寻路点数量小于2",
            ["from", r],
            ["to", i],
            ["length", s],
          ),
        !1
      );
    a = l.PathPoints.Get(s - 1);
    if (
      UE.Vector.DistSquared2D(i, a) > MIN_NAVIGATION_FINAL_DIST_SQUARD ||
      (!e && Math.abs(a.Z - i.Z) > MIN_NAVIGATION_FINAL_HEIGHt)
    )
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            43,
            "寻路终点偏差过大",
            ["from", r],
            ["to", i],
            ["finalPoint", a],
          ),
        !1
      );
    if (o)
      for (let t = (o.length = 0); t < s; ++t) {
        const n = l.PathPoints.Get(t);
        o.push(Vector_1.Vector.Create(n.X, n.Y, n.Z));
      }
    return !0;
  }
  static GetPathLength(t, r) {
    if (r.length === 0) return 0;
    let i = 0;
    this.cz.FromUeVector(t), (i += Vector_1.Vector.Dist(this.cz, r[0]));
    for (let t = 1; t < r.length; ++t)
      i += Vector_1.Vector.Dist(r[t - 1], r[t]);
    return i;
  }
  static NavigationBlock(t, r, i, o = !0) {
    r = r.ToUeVector();
    if (
      o &&
      !UE.NavigationSystemV1.K2_ProjectPointToNavigation(
        t,
        r,
        void 0,
        void 0,
        void 0,
        defaultBlockHalfExtent,
        -1,
      )
    )
      return !1;
    return !UE.NavigationSystemV1.IsStraightReachable(
      t,
      r,
      i.ToUeVector(),
      void 0,
      void 0,
      defaultBlockHalfExtent,
    );
  }
  static NavigationBlockDirection(
    t,
    r,
    i,
    o = DEFAULT_NAVIGATION_BLOCK_LENGTH,
    e = !0,
  ) {
    const a = t.Character.CharacterMovement.MovementMode;
    return (
      (a !== 1 && a !== 2) ||
      (i.Multiply(o, this.cz),
      this.cz.AdditionEqual(r),
      this.NavigationBlock(t, r, this.cz, e))
    );
  }
  static NavigationBlockDirectionE(
    t,
    r,
    i,
    o,
    e = DEFAULT_NAVIGATION_BLOCK_LENGTH,
    a = !0,
  ) {
    return (
      this.GetDirectionVector(i, o, this.fz),
      this.NavigationBlockDirection(t, r, this.fz, e, a)
    );
  }
  static GetDirectionVector(t, r, i) {
    switch ((i.DeepCopy(t), r)) {
      case 0:
        break;
      case 1:
        i.UnaryNegation(i);
        break;
      case 2:
        i.Set(-i.Y, i.X, 0);
        break;
      case 3:
        i.Set(i.Y, -i.X, 0);
    }
  }
  static TurnToTarget(t, r, i, o = !1, e = 0) {
    r.Subtraction(t.ActorLocationProxy, this.cz),
      o
        ? (MathUtils_1.MathUtils.LookRotationForwardFirst(
            this.cz,
            Vector_1.Vector.UpVectorProxy,
            this.cie,
          ),
          t.SetInputRotator(this.cie))
        : t.SetInputRotatorByNumber(
            0,
            this.cz.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg,
            0,
          ),
      e > 0
        ? ((r = (t.InputRotator.Yaw - t.ActorRotation.Yaw) / e),
          t.SetOverrideTurnSpeed(Math.min(r, i)))
        : t.SetOverrideTurnSpeed(i);
  }
  static TurnToDirect(t, r, i, o = !1, e = 0) {
    o
      ? (MathUtils_1.MathUtils.LookRotationForwardFirst(
          r,
          Vector_1.Vector.UpVectorProxy,
          this.cie,
        ),
        t.SetInputRotator(this.cie))
      : t.SetInputRotatorByNumber(
          0,
          MathUtils_1.MathUtils.GetAngleByVector2D(r),
          0,
        ),
      e > 0
        ? ((o = (t.InputRotator.Yaw - t.ActorRotation.Yaw) / e),
          t.SetOverrideTurnSpeed(Math.min(o, i)))
        : t.SetOverrideTurnSpeed(i);
  }
  static ClearInput(t) {
    t && (t = t.AiController.CharActorComp)?.Valid && t.ClearInput();
  }
  static AllyOnPath(t, r, i, o) {
    const e = t.CharActorComp;
    const a = e.ActorLocationProxy;
    const l = e.ScaledHalfHeight;
    const s = e.ScaledRadius;
    const n = (this.cz.Set(-r.Y, r.X, 0), this.cz);
    const c = this.fz;
    for (const u of t.AiPerception.Allies)
      if (u !== t.CharAiDesignComp.Entity.Id) {
        var _ =
          CharacterController_1.CharacterController.GetCharacterActorComponentById(
            u,
          );
        if (
          _ &&
          (_.ActorLocationProxy.Subtraction(a, c),
          !(Math.abs(c.Z) > l + _.ScaledHalfHeight))
        ) {
          var _ = s + _.ScaledRadius;
          const h = Vector_1.Vector.DotProduct(c, r);
          const A = Vector_1.Vector.DotProduct(c, n);
          if (Math.abs(h) < _ && A < i && -i < A && o === (A > 0 ? 2 : 3))
            return !0;
          if (Math.abs(A) < _ && h < i && -i < h && o === (h > 0 ? 0 : 1))
            return !0;
        }
      }
    return !1;
  }
  static AllyBlockDirections(t, r, i, o) {
    if (t.AiPerception) {
      o.clear();
      const e = t.CharActorComp;
      const a = e.ActorLocationProxy;
      const l = e.ScaledHalfHeight;
      const s = e.ScaledRadius;
      const n = (this.cz.Set(-r.Y, r.X, 0), this.cz);
      const c = this.fz;
      for (const u of t.AiPerception.Allies) {
        var _;
        var h;
        let A =
          CharacterController_1.CharacterController.GetCharacterActorComponentById(
            u,
          );
        A &&
          (A.ActorLocationProxy.Subtraction(a, c),
          Math.abs(c.Z) > l + A.ScaledHalfHeight ||
            ((A = s + A.ScaledRadius),
            (_ = Vector_1.Vector.DotProduct(c, r)),
            (h = Vector_1.Vector.DotProduct(c, n)),
            Math.abs(_) < A && h < i && -i < h && o.add(h > 0 ? 2 : 3),
            Math.abs(h) < A && _ < i && -i < _ && o.add(_ > 0 ? 0 : 1)));
      }
    }
  }
  static GetLocationFromEntity(t) {
    const r = t?.GetComponent(1);
    return r
      ? r.ActorLocationProxy
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("AI", 6, "目标Entity没有坐标属性", [
            "EntityId",
            t.Id,
          ]),
        Vector_1.Vector.ZeroVectorProxy);
  }
  static InTeamArea(t, r, i = 1) {
    var t = t.CharActorComp.ActorLocationProxy;
    let o =
      Math.atan2(
        t.Y - r.CachedTargetLocation.Y,
        t.X - r.CachedTargetLocation.X,
      ) *
        MathUtils_1.MathUtils.RadToDeg -
      r.CachedControllerYaw -
      r.AngleCenter;
    for (; o > 180; ) o -= 360;
    for (; -o > 180; ) o += 360;
    return (
      !(Math.abs(o) > r.MaxAngleOffset * i) &&
      (t = Vector_1.Vector.DistSquared2D(t, r.CachedTargetLocation)) >=
        MathUtils_1.MathUtils.Square(
          r.DistanceCenter - r.MaxDistanceOffset * i,
        ) &&
      t <=
        MathUtils_1.MathUtils.Square(r.DistanceCenter + r.MaxDistanceOffset * i)
    );
  }
  static InputNearestDirection(t, r, i, o, e, a, l) {
    let s, n;
    l
      ? (a
          ? (r.ToOrientationQuat(i),
            i.Inverse(i),
            i.RotateVector(l, o),
            (s = AiControllerLibrary.KPn(o, t.WanderDirectionType, a)),
            (n = t.GetNearestDirection(r, s)),
            s !== 0 && s !== 1 && n.UnaryNegation(n),
            AiControllerLibrary.TurnToDirect(t, n, e))
          : AiControllerLibrary.TurnToDirect(t, l, e),
        t.ActorQuatProxy.Inverse(i),
        i.RotateVector(r, o))
      : (t.ActorQuatProxy.Inverse(i),
        i.RotateVector(r, o),
        (s = AiControllerLibrary.KPn(o, t.WanderDirectionType, a)),
        (n =
          (!a && t.WanderDirectionType !== 2) || t.WanderDirectionType === 0
            ? r
            : t.GetNearestDirection(r, s)),
        AiControllerLibrary.TurnToDirect(t, n, e)),
      t.InputWanderDirection(r, o);
  }
  static KPn(t, r, i) {
    let o = 0;
    return (
      r === 0 && i
        ? (o =
            Math.abs(t.X) > Math.abs(t.Y) ? (t.X < 0 ? 1 : 0) : t.Y < 0 ? 3 : 2)
        : r === 1
          ? (o = t.X < 0 ? 1 : 0)
          : r === 2 && (o = t.Y < 0 ? 3 : 2),
      o
    );
  }
}
((exports.AiControllerLibrary = AiControllerLibrary).cz =
  Vector_1.Vector.Create()),
  (AiControllerLibrary.fz = Vector_1.Vector.Create()),
  (AiControllerLibrary.cie = Rotator_1.Rotator.Create());
// # sourceMappingURL=AiContollerLibrary.js.map
