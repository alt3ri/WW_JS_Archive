"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiControllerLibrary = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  GravityUtils_1 = require("../../Utils/GravityUtils"),
  MIN_NAVIGATION_FINAL_DIST_SQUARD = 1e4,
  MIN_NAVIGATION_FINAL_HEIGHt = 200,
  DEFAULT_NAVIGATION_BLOCK_LENGTH = 100,
  defaultBlockHalfExtent = new UE.VectorDouble(1, 1, 500);
class AiControllerLibrary {
  static NavigationFindPath(t, r, i, e = void 0, o, a) {
    if (
      t.AiController?.CharActorComp?.MoveComp &&
      !t.AiController.CharActorComp.MoveComp.IsStandardGravity
    )
      e &&
        (e.push(Vector_1.Vector.Create(r)), e.push(Vector_1.Vector.Create(i)));
    else {
      if (
        !UE.NavigationSystemV1.D_K2_ProjectPointToNavigation(
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
          !a
        );
      var s = UE.NavigationSystemV1.D_FindPathToLocationSynchronously(t, r, i);
      if (!s) return !1;
      var l = s.PathPoints.Num();
      if (l < 2) return !1;
      a = s.PathPoints.Get(l - 1);
      if (
        UE.VectorDouble.DistSquared2D(i, new UE.VectorDouble(a)) >
          MIN_NAVIGATION_FINAL_DIST_SQUARD ||
        (!o && Math.abs(a.Z - i.Z) > MIN_NAVIGATION_FINAL_HEIGHt)
      )
        return !1;
      if (e)
        for (let t = (e.length = 0); t < l; ++t) {
          var c = s.PathPoints.Get(t);
          e.push(Vector_1.Vector.Create(c));
        }
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
    if (
      t.AiController?.CharActorComp?.MoveComp &&
      !t.AiController.CharActorComp.MoveComp.IsStandardGravity
    )
      return !1;
    r = r.ToUeVector();
    if (
      e &&
      !UE.NavigationSystemV1.D_K2_ProjectPointToNavigation(
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
    return !UE.NavigationSystemV1.D_IsStraightReachable(
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
    o = !0,
  ) {
    var a = t.Character.CharacterMovement.MovementMode;
    return (
      (1 !== a && 2 !== a) ||
      (i.Multiply(e, this.cz),
      this.cz.AdditionEqual(r),
      this.NavigationBlock(t, r, this.cz, o))
    );
  }
  static NavigationBlockDirectionE(
    t,
    r,
    i,
    e,
    o = DEFAULT_NAVIGATION_BLOCK_LENGTH,
    a = !0,
  ) {
    return (
      this.GetDirectionVector(t, i, e, this.fz),
      this.NavigationBlockDirection(t, r, this.fz, o, a)
    );
  }
  static GetDirectionVector(t, r, i, e) {
    e.DeepCopy(r);
    var o = t;
    if (
      o.AiController?.CharActorComp?.MoveComp &&
      !o.AiController.CharActorComp.MoveComp.IsStandardGravity
    )
      switch (i) {
        case 0:
          break;
        case 1:
          e.UnaryNegation(e);
          break;
        case 2:
          Vector_1.Vector.CrossProduct(
            o.AiController.CharActorComp.MoveComp.GravityUp,
            r,
            this.cz,
          ),
            this.cz.Normalize(),
            e.DeepCopy(this.cz);
          break;
        case 3:
          Vector_1.Vector.CrossProduct(
            r,
            o.AiController.CharActorComp.MoveComp.GravityUp,
            this.cz,
          ),
            this.cz.Normalize(),
            e.DeepCopy(this.cz);
      }
    else
      switch (i) {
        case 0:
          break;
        case 1:
          e.UnaryNegation(e);
          break;
        case 2:
          e.Set(-e.Y, e.X, 0);
          break;
        case 3:
          e.Set(e.Y, -e.X, 0);
      }
  }
  static TurnToTarget(t, r, i, e = !1, o = 0) {
    r.Subtraction(t.ActorLocationProxy, this.cz),
      t.SetInputFacing(this.cz, !e),
      0 < o
        ? ((r =
            GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(t) /
            o),
          t.SetOverrideTurnSpeed(Math.min(r, i)))
        : t.SetOverrideTurnSpeed(i);
  }
  static TurnToDirect(t, r, i, e = !1, o = 0) {
    this.cz.DeepCopy(r),
      t.SetInputFacing(this.cz, !e),
      0 < o
        ? ((r =
            GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(t) /
            o),
          t.SetOverrideTurnSpeed(Math.min(r, i)))
        : t.SetOverrideTurnSpeed(i);
  }
  static ClearInput(t) {
    t && (t = t.AiController.CharActorComp)?.Valid && t.ClearInput();
  }
  static AllyOnPath(t, r, i, e) {
    var o = t.CharActorComp,
      a = o.ActorLocationProxy,
      s = o.ScaledHalfHeight,
      l = o.ScaledRadius,
      c =
        (o.MoveComp && !o.MoveComp.IsStandardGravity
          ? (Vector_1.Vector.CrossProduct(o.MoveComp.GravityUp, r, this.cz),
            this.cz.Normalize())
          : this.cz.Set(-r.Y, r.X, 0),
        this.cz),
      _ = this.fz;
    for (const v of t.AiPerception.Allies)
      if (v !== t.CharAiDesignComp.Entity.Id) {
        var n =
          ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(
            v,
          );
        if (
          n &&
          (n.ActorLocationProxy.Subtraction(a, _),
          !(
            GravityUtils_1.GravityUtils.GetZnInGravityForActor(o, _) >
            s + n.ScaledHalfHeight
          ))
        ) {
          var n = l + n.ScaledRadius,
            h = Vector_1.Vector.DotProduct(_, r),
            u = Vector_1.Vector.DotProduct(_, c);
          if (Math.abs(h) < n && u < i && -i < u && e === (0 < u ? 2 : 3))
            return !0;
          if (Math.abs(u) < n && h < i && -i < h && e === (0 < h ? 0 : 1))
            return !0;
        }
      }
    return !1;
  }
  static AllyBlockDirections(t, r, i, e) {
    if (t.AiPerception) {
      e.clear();
      var o = t.CharActorComp,
        a = o.ActorLocationProxy,
        s = o.ScaledHalfHeight,
        l = o.ScaledRadius,
        c =
          (o.MoveComp && !o.MoveComp.IsStandardGravity
            ? (Vector_1.Vector.CrossProduct(o.MoveComp.GravityUp, r, this.cz),
              this.cz.Normalize())
            : this.cz.Set(-r.Y, r.X, 0),
          this.cz),
        _ = this.fz;
      for (const v of t.AiPerception.Allies) {
        var n,
          h,
          u =
            ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(
              v,
            );
        u &&
          (u.ActorLocationProxy.Subtraction(a, _),
          GravityUtils_1.GravityUtils.GetZnInGravityForActor(o, _) >
            s + u.ScaledHalfHeight ||
            ((u = l + u.ScaledRadius),
            (n = Vector_1.Vector.DotProduct(_, r)),
            (h = Vector_1.Vector.DotProduct(_, c)),
            Math.abs(n) < u && h < i && -i < h && e.add(0 < h ? 2 : 3),
            Math.abs(h) < u && n < i && -i < n && e.add(0 < n ? 0 : 1)));
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
    t.Subtraction(r.CachedTargetLocation, this.cz),
      r.Group.InverseGravityQuat.RotateVector(this.cz, this.cz);
    let e =
      Math.atan2(this.cz.Y, this.cz.X) * MathUtils_1.MathUtils.RadToDeg -
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
  static InputNearestDirection(t, r, i, e, o, a, s) {
    var l, c;
    s
      ? (a
          ? (MathUtils_1.MathUtils.LookRotationForwardFirst(
              r,
              t?.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy,
              i,
            ),
            i.Inverse(i),
            i.RotateVector(s, e),
            (l = AiControllerLibrary.tqn(e, t.WanderDirectionType, a)),
            (c = t.GetNearestDirection(r, l)),
            0 !== l && 1 !== l && c.UnaryNegation(c),
            AiControllerLibrary.TurnToDirect(t, c, o))
          : AiControllerLibrary.TurnToDirect(t, s, o),
        t.ActorQuatProxy.Inverse(i),
        i.RotateVector(r, e))
      : (t.ActorQuatProxy.Inverse(i),
        i.RotateVector(r, e),
        (l = AiControllerLibrary.tqn(e, t.WanderDirectionType, a)),
        (c =
          (!a && 2 !== t.WanderDirectionType) || 0 === t.WanderDirectionType
            ? r
            : t.GetNearestDirection(r, l)),
        AiControllerLibrary.TurnToDirect(t, c, o)),
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
