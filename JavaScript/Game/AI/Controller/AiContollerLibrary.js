"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiControllerLibrary = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  GravityUtils_1 = require("../../Utils/GravityUtils"),
  MIN_NAVIGATION_FINAL_DIST_SQUARD = 1e4,
  MIN_NAVIGATION_FINAL_HEIGHt = 200,
  DEFAULT_NAVIGATION_BLOCK_LENGTH = 100,
  defaultBlockHalfExtent = new UE.Vector(1, 1, 500);
class AiControllerLibrary {
  static NavigationFindPath(t, r, i, e = void 0, a, o) {
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
        e &&
          (e.push(Vector_1.Vector.Create(r)),
          e.push(Vector_1.Vector.Create(i))),
        !o
      );
    var l = UE.NavigationSystemV1.FindPathToLocationSynchronously(t, r, i);
    if (!l) return !1;
    var s = l.PathPoints.Num();
    if (s < 2) return !1;
    o = l.PathPoints.Get(s - 1);
    if (
      UE.Vector.DistSquared2D(i, o) > MIN_NAVIGATION_FINAL_DIST_SQUARD ||
      (!a && Math.abs(o.Z - i.Z) > MIN_NAVIGATION_FINAL_HEIGHt)
    )
      return !1;
    if (e)
      for (let t = (e.length = 0); t < s; ++t) {
        var c = l.PathPoints.Get(t);
        e.push(Vector_1.Vector.Create(c.X, c.Y, c.Z));
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
  static NavigationBlock(t, r, i, e = !0) {
    r = r.ToUeVector();
    if (
      e &&
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
    e = DEFAULT_NAVIGATION_BLOCK_LENGTH,
    a = !0,
  ) {
    var o = t.Character.CharacterMovement.MovementMode;
    return (
      (1 !== o && 2 !== o) ||
      (i.Multiply(e, this.cz),
      this.cz.AdditionEqual(r),
      this.NavigationBlock(t, r, this.cz, a))
    );
  }
  static NavigationBlockDirectionE(
    t,
    r,
    i,
    e,
    a = DEFAULT_NAVIGATION_BLOCK_LENGTH,
    o = !0,
  ) {
    return (
      this.GetDirectionVector(i, e, this.fz),
      this.NavigationBlockDirection(t, r, this.fz, a, o)
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
  static TurnToTarget(t, r, i, e = !1, a = 0) {
    r.Subtraction(t.ActorLocationProxy, this.cz),
      t.SetInputFacing(this.cz, !e),
      0 < a
        ? ((r =
            GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(t) /
            a),
          t.SetOverrideTurnSpeed(Math.min(r, i)))
        : t.SetOverrideTurnSpeed(i);
  }
  static TurnToDirect(t, r, i, e = !1, a = 0) {
    this.cz.DeepCopy(r),
      t.SetInputFacing(this.cz, !e),
      0 < a
        ? ((r =
            GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(t) /
            a),
          t.SetOverrideTurnSpeed(Math.min(r, i)))
        : t.SetOverrideTurnSpeed(i);
  }
  static ClearInput(t) {
    t && (t = t.AiController.CharActorComp)?.Valid && t.ClearInput();
  }
  static AllyOnPath(t, r, i, e) {
    var a = t.CharActorComp,
      o = a.ActorLocationProxy,
      l = a.ScaledHalfHeight,
      s = a.ScaledRadius,
      c = (this.cz.Set(-r.Y, r.X, 0), this.cz),
      n = this.fz;
    for (const A of t.AiPerception.Allies)
      if (A !== t.CharAiDesignComp.Entity.Id) {
        var _ =
          CharacterController_1.CharacterController.GetCharacterActorComponentById(
            A,
          );
        if (
          _ &&
          (_.ActorLocationProxy.Subtraction(o, n),
          !(Math.abs(n.Z) > l + _.ScaledHalfHeight))
        ) {
          var _ = s + _.ScaledRadius,
            h = Vector_1.Vector.DotProduct(n, r),
            u = Vector_1.Vector.DotProduct(n, c);
          if (Math.abs(h) < _ && u < i && -i < u && e === (0 < u ? 2 : 3))
            return !0;
          if (Math.abs(u) < _ && h < i && -i < h && e === (0 < h ? 0 : 1))
            return !0;
        }
      }
    return !1;
  }
  static AllyBlockDirections(t, r, i, e) {
    if (t.AiPerception) {
      e.clear();
      var a = t.CharActorComp,
        o = a.ActorLocationProxy,
        l = a.ScaledHalfHeight,
        s = a.ScaledRadius,
        c = (this.cz.Set(-r.Y, r.X, 0), this.cz),
        n = this.fz;
      for (const A of t.AiPerception.Allies) {
        var _,
          h,
          u =
            CharacterController_1.CharacterController.GetCharacterActorComponentById(
              A,
            );
        u &&
          (u.ActorLocationProxy.Subtraction(o, n),
          Math.abs(n.Z) > l + u.ScaledHalfHeight ||
            ((u = s + u.ScaledRadius),
            (_ = Vector_1.Vector.DotProduct(n, r)),
            (h = Vector_1.Vector.DotProduct(n, c)),
            Math.abs(_) < u && h < i && -i < h && e.add(0 < h ? 2 : 3),
            Math.abs(h) < u && _ < i && -i < _ && e.add(0 < _ ? 0 : 1)));
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
    let e =
      Math.atan2(
        t.Y - r.CachedTargetLocation.Y,
        t.X - r.CachedTargetLocation.X,
      ) *
        MathUtils_1.MathUtils.RadToDeg -
      r.CachedControllerYaw -
      r.AngleCenter;
    for (; 180 < e; ) e -= 360;
    for (; 180 < -e; ) e += 360;
    return (
      !(Math.abs(e) > r.MaxAngleOffset * i) &&
      (t = Vector_1.Vector.DistSquared2D(t, r.CachedTargetLocation)) >=
        MathUtils_1.MathUtils.Square(
          r.DistanceCenter - r.MaxDistanceOffset * i,
        ) &&
      t <=
        MathUtils_1.MathUtils.Square(r.DistanceCenter + r.MaxDistanceOffset * i)
    );
  }
  static InputNearestDirection(t, r, i, e, a, o, l) {
    var s, c;
    l
      ? (o
          ? (r.ToOrientationQuat(i),
            i.Inverse(i),
            i.RotateVector(l, e),
            (s = AiControllerLibrary.tqn(e, t.WanderDirectionType, o)),
            (c = t.GetNearestDirection(r, s)),
            0 !== s && 1 !== s && c.UnaryNegation(c),
            AiControllerLibrary.TurnToDirect(t, c, a))
          : AiControllerLibrary.TurnToDirect(t, l, a),
        t.ActorQuatProxy.Inverse(i),
        i.RotateVector(r, e))
      : (t.ActorQuatProxy.Inverse(i),
        i.RotateVector(r, e),
        (s = AiControllerLibrary.tqn(e, t.WanderDirectionType, o)),
        (c =
          (!o && 2 !== t.WanderDirectionType) || 0 === t.WanderDirectionType
            ? r
            : t.GetNearestDirection(r, s)),
        AiControllerLibrary.TurnToDirect(t, c, a)),
      t.InputWanderDirection(r, e);
  }
  static tqn(t, r, i) {
    let e = 0;
    return (
      0 === r && i
        ? (e =
            Math.abs(t.X) > Math.abs(t.Y) ? (t.X < 0 ? 1 : 0) : t.Y < 0 ? 3 : 2)
        : 1 === r
          ? (e = t.X < 0 ? 1 : 0)
          : 2 === r && (e = t.Y < 0 ? 3 : 2),
      e
    );
  }
}
((exports.AiControllerLibrary = AiControllerLibrary).cz =
  Vector_1.Vector.Create()),
  (AiControllerLibrary.fz = Vector_1.Vector.Create());
//# sourceMappingURL=AiContollerLibrary.js.map
