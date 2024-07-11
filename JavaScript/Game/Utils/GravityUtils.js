"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GravityUtils = void 0);
const Quat_1 = require("../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils");
class GravityUtils {
  static GetAngleOffsetFromCurrentToInput(t) {
    var r;
    return !t.MoveComp || t.MoveComp.IsStandardGravity
      ? MathUtils_1.MathUtils.WrapAngle(
          t.InputRotatorProxy.Yaw - t.ActorRotationProxy.Yaw,
        )
      : ((r =
          Math.acos(
            Vector_1.Vector.DotProduct(t.ActorForwardProxy, t.InputFacingProxy),
          ) * MathUtils_1.MathUtils.RadToDeg),
        Vector_1.Vector.CrossProduct(
          t.ActorForwardProxy,
          t.InputFacingProxy,
          this.TmpVector,
        ),
        0 < Vector_1.Vector.DotProduct(this.TmpVector, t.MoveComp.GravityDirect)
          ? -r
          : r);
  }
  static GetAngleOffsetFromCurrentToInputAbs(t) {
    return !t.MoveComp || t.MoveComp.IsStandardGravity
      ? Math.abs(
          MathUtils_1.MathUtils.WrapAngle(
            t.InputRotatorProxy.Yaw - t.ActorRotationProxy.Yaw,
          ),
        )
      : Math.acos(
          Vector_1.Vector.DotProduct(t.ActorForwardProxy, t.InputFacingProxy),
        ) * MathUtils_1.MathUtils.RadToDeg;
  }
  static ConvertToPlanarVector(t, r) {
    var e;
    return (
      !t.MoveComp || t.MoveComp.IsStandardGravity
        ? ((e = r.Z), (r.Z = 0))
        : ((e = -Vector_1.Vector.DotProduct(r, t.MoveComp.GravityDirect)),
          t.MoveComp.GravityDirect.Multiply(e, this.TmpVector),
          r.AdditionEqual(this.TmpVector)),
      e
    );
  }
  static GetPlanarSizeSquared2D(t, r) {
    return !t.MoveComp || t.MoveComp.IsStandardGravity
      ? r.SizeSquared2D()
      : ((t = r.DotProduct(t.MoveComp.GravityDirect)), r.SizeSquared() - t * t);
  }
  static GetAngleOffsetInGravity(t, r, e) {
    var i;
    return !t.MoveComp || t.MoveComp.IsStandardGravity
      ? MathUtils_1.MathUtils.WrapAngle(
          MathUtils_1.MathUtils.GetAngleByVector2D(e) -
            MathUtils_1.MathUtils.GetAngleByVector2D(r),
        )
      : ((i =
          Math.acos(Vector_1.Vector.DotProduct(r, e)) *
          MathUtils_1.MathUtils.RadToDeg),
        Vector_1.Vector.CrossProduct(r, e, this.TmpVector),
        0 < Vector_1.Vector.DotProduct(this.TmpVector, t.MoveComp.GravityDirect)
          ? -i
          : i);
  }
  static GetAngleOffsetInGravityAbs(t, r, e) {
    return !t.MoveComp || t.MoveComp.IsStandardGravity
      ? MathUtils_1.MathUtils.WrapAngle(
          MathUtils_1.MathUtils.GetAngleByVector2D(e) -
            MathUtils_1.MathUtils.GetAngleByVector2D(r),
        )
      : Math.acos(Vector_1.Vector.DotProduct(r, e)) *
          MathUtils_1.MathUtils.RadToDeg;
  }
  static TurnVectorByDirectionInGravity(r, e, i) {
    if (0 !== i)
      if (!r.MoveComp || r.MoveComp.IsStandardGravity) {
        let t = 0;
        switch (i) {
          case 1:
            (e.X = -e.X), (e.Y = -e.Y);
            break;
          case 2:
            (t = e.X), (e.X = e.Y), (e.Y = -t);
            break;
          case 3:
            (t = -e.X), (e.X = e.Y), (e.Y = -t);
        }
      } else {
        let t = 0;
        switch (i) {
          case 1:
            t = 180;
            break;
          case 2:
            t = 90;
            break;
          case 3:
            t = -90;
            break;
          default:
            return;
        }
        Quat_1.Quat.ConstructorByAxisAngle(
          r.MoveComp.GravityDirect,
          -t,
          this.TmpQuat,
        ),
          this.TmpQuat.RotateVector(e, e);
      }
  }
  static GetQuatFromRotatorAndGravity(t, r, e) {
    !t.MoveComp || t.MoveComp.IsStandardGravity
      ? (this.TmpRotator.Set(0, r.Yaw, 0), this.TmpRotator.Quaternion(e))
      : (r.Quaternion(this.TmpQuat),
        this.TmpQuat.RotateVector(
          Vector_1.Vector.ForwardVectorProxy,
          this.TmpVector,
        ),
        0.99 < Math.abs(this.TmpVector.DotProduct(t.MoveComp.GravityDirect)) &&
          this.TmpQuat.RotateVector(
            Vector_1.Vector.UpVectorProxy,
            this.TmpVector,
          ),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          this.TmpVector,
          t.MoveComp.GravityUp,
          e,
        ));
  }
  static GetZnInGravity(t, r) {
    return !t.MoveComp || t.MoveComp.IsStandardGravity
      ? r.Z
      : -Vector_1.Vector.DotProduct(r, t.MoveComp.GravityDirect);
  }
  static SetZnInGravity(t, r, e) {
    var i;
    !t.MoveComp || t.MoveComp.IsStandardGravity
      ? (r.Z = e)
      : ((i = -Vector_1.Vector.DotProduct(r, t.MoveComp.GravityDirect)),
        t.MoveComp.GravityDirect.Multiply(i - e, this.TmpVector),
        r.AdditionEqual(this.TmpVector));
  }
  static AddZnInGravity(t, r, e) {
    !t.MoveComp || t.MoveComp.IsStandardGravity
      ? (r.Z += e)
      : (t.MoveComp.GravityDirect.Multiply(-e, this.TmpVector),
        r.AdditionEqual(this.TmpVector));
  }
}
((exports.GravityUtils = GravityUtils).TmpVector = Vector_1.Vector.Create()),
  (GravityUtils.TmpVector2 = Vector_1.Vector.Create()),
  (GravityUtils.TmpQuat = Quat_1.Quat.Create()),
  (GravityUtils.TmpRotator = Rotator_1.Rotator.Create());
//# sourceMappingURL=GravityUtils.js.map
