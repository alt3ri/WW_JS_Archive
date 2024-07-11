"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiControllerLibrary = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  MIN_NAVIGATION_FINAL_DIST_SQUARD = 1e4,
  MIN_NAVIGATION_FINAL_HEIGHt = 200,
  DEFAULT_NAVIGATION_BLOCK_LENGTH = 100,
  defaultBlockHalfExtent = new UE.Vector(1, 1, 500);
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
    var l = UE.NavigationSystemV1.FindPathToLocationSynchronously(t, r, i);
    if (!l)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("AI", 43, "没有寻到路", ["from", r], ["to", i]),
        !1
      );
    var s = l.PathPoints.Num();
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
        var n = l.PathPoints.Get(t);
        o.push(Vector_1.Vector.Create(n.X, n.Y, n.Z));
      }
    return !0;
  }
  static GetPathLength(t, r) {
    if (0 === r.length) return 0;
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
    var a = t.Character.CharacterMovement.MovementMode;
    return (
      (1 !== a && 2 !== a) ||
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
      0 < e
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
      0 < e
        ? ((o = (t.InputRotator.Yaw - t.ActorRotation.Yaw) / e),
          t.SetOverrideTurnSpeed(Math.min(o, i)))
        : t.SetOverrideTurnSpeed(i);
  }
  static ClearInput(t) {
    t && (t = t.AiController.CharActorComp)?.Valid && t.ClearInput();
  }
  static AllyOnPath(t, r, i, o) {
    var e = t.CharActorComp,
      a = e.ActorLocationProxy,
      l = e.ScaledHalfHeight,
      s = e.ScaledRadius,
      n = (this.cz.Set(-r.Y, r.X, 0), this.cz),
      c = this.fz;
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
          var _ = s + _.ScaledRadius,
            h = Vector_1.Vector.DotProduct(c, r),
            A = Vector_1.Vector.DotProduct(c, n);
          if (Math.abs(h) < _ && A < i && -i < A && o === (0 < A ? 2 : 3))
            return !0;
          if (Math.abs(A) < _ && h < i && -i < h && o === (0 < h ? 0 : 1))
            return !0;
        }
      }
    return !1;
  }
  static AllyBlockDirections(t, r, i, o) {
    if (t.AiPerception) {
      o.clear();
      var e = t.CharActorComp,
        a = e.ActorLocationProxy,
        l = e.ScaledHalfHeight,
        s = e.ScaledRadius,
        n = (this.cz.Set(-r.Y, r.X, 0), this.cz),
        c = this.fz;
      for (const u of t.AiPerception.Allies) {
        var _,
          h,
          A =
            CharacterController_1.CharacterController.GetCharacterActorComponentById(
              u,
            );
        A &&
          (A.ActorLocationProxy.Subtraction(a, c),
          Math.abs(c.Z) > l + A.ScaledHalfHeight ||
            ((A = s + A.ScaledRadius),
            (_ = Vector_1.Vector.DotProduct(c, r)),
            (h = Vector_1.Vector.DotProduct(c, n)),
            Math.abs(_) < A && h < i && -i < h && o.add(0 < h ? 2 : 3),
            Math.abs(h) < A && _ < i && -i < _ && o.add(0 < _ ? 0 : 1)));
      }
    }
  }
  static GetLocationFromEntity(t) {
    var r = t?.GetComponent(1);
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
    for (; 180 < o; ) o -= 360;
    for (; 180 < -o; ) o += 360;
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
    var s, n;
    l
      ? (a
          ? (r.ToOrientationQuat(i),
            i.Inverse(i),
            i.RotateVector(l, o),
            (s = AiControllerLibrary.KPn(o, t.WanderDirectionType, a)),
            (n = t.GetNearestDirection(r, s)),
            0 !== s && 1 !== s && n.UnaryNegation(n),
            AiControllerLibrary.TurnToDirect(t, n, e))
          : AiControllerLibrary.TurnToDirect(t, l, e),
        t.ActorQuatProxy.Inverse(i),
        i.RotateVector(r, o))
      : (t.ActorQuatProxy.Inverse(i),
        i.RotateVector(r, o),
        (s = AiControllerLibrary.KPn(o, t.WanderDirectionType, a)),
        (n =
          (!a && 2 !== t.WanderDirectionType) || 0 === t.WanderDirectionType
            ? r
            : t.GetNearestDirection(r, s)),
        AiControllerLibrary.TurnToDirect(t, n, e)),
      t.InputWanderDirection(r, o);
  }
  static KPn(t, r, i) {
    let o = 0;
    return (
      0 === r && i
        ? (o =
            Math.abs(t.X) > Math.abs(t.Y) ? (t.X < 0 ? 1 : 0) : t.Y < 0 ? 3 : 2)
        : 1 === r
          ? (o = t.X < 0 ? 1 : 0)
          : 2 === r && (o = t.Y < 0 ? 3 : 2),
      o
    );
  }
}
((exports.AiControllerLibrary = AiControllerLibrary).cz =
  Vector_1.Vector.Create()),
  (AiControllerLibrary.fz = Vector_1.Vector.Create()),
  (AiControllerLibrary.cie = Rotator_1.Rotator.Create());
//# sourceMappingURL=AiContollerLibrary.js.map
