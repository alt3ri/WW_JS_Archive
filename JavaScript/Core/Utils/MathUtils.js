"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MathUtils =
    exports.FastUeFloatRange =
    exports.INT_BIT =
    exports.intBit =
    exports.PI_DEG_DOUBLE =
    exports.PI_DEG =
      void 0);
const UE = require("ue");
const Long = require("../../Core/Define/Net/long");
const Stack_1 = require("../Container/Stack");
const MathCommon_1 = require("./Math/MathCommon");
const Quat_1 = require("./Math/Quat");
const Rotator_1 = require("./Math/Rotator");
const Transform_1 = require("./Math/Transform");
const Vector_1 = require("./Math/Vector");
(exports.PI_DEG = 180),
  (exports.PI_DEG_DOUBLE = 2 * exports.PI_DEG),
  (exports.intBit = 32n),
  (exports.INT_BIT = 32);
class FastUeFloatRange {
  constructor(t) {
    (this.LowerBoundValue = 0),
      (this.UpperBoundValue = 0),
      (this.LowerBoundValue = t.LowerBound.Value),
      (this.UpperBoundValue = t.UpperBound.Value),
      (this.LowerBoundType = t.LowerBound.Type),
      (this.UpperBoundType = t.UpperBound.Type);
  }
}
exports.FastUeFloatRange = FastUeFloatRange;
class MathUtils {
  static IsNearlyEqual(t, a, i = this.SmallNumber) {
    return Math.abs(t - a) <= i;
  }
  static IsNearlyZero(t, a = this.SmallNumber) {
    return Math.abs(t) <= a;
  }
  static Clamp(t, a, i) {
    return MathCommon_1.MathCommon.Clamp(t, a, i);
  }
  static GetRangePct(t, a, i) {
    const s = a - t;
    return this.IsNearlyZero(s) ? (a <= i ? 1 : 0) : (i - t) / s;
  }
  static RangeClamp(t, a, i, s, r) {
    a = this.Clamp(this.GetRangePct(a, i, t), 0, 1);
    return this.Lerp(s, r, a);
  }
  static Lerp(t, a, i) {
    return t * (1 - i) + a * i;
  }
  static LerpSin(t, a, i) {
    i = Math.sin((i * Math.PI) / 2);
    return t * (1 - i) + a * i;
  }
  static LerpVector(t, a, i, s = void 0) {
    i = this.Clamp(i, 0, 1);
    return s
      ? ((s.X = this.Lerp(t.X, a.X, i)),
        (s.Y = this.Lerp(t.Y, a.Y, i)),
        (s.Z = this.Lerp(t.Z, a.Z, i)),
        s)
      : new UE.Vector(
          this.Lerp(t.X, a.X, i),
          this.Lerp(t.Y, a.Y, i),
          this.Lerp(t.Z, a.Z, i),
        );
  }
  static LerpDirect2dByMaxAngle(t, a, i, s, r, e) {
    const o = MathUtils.GetAngleByVector2D(t);
    let n = MathUtils.GetAngleByVector2D(a);
    var t = Math.asin(t.Z) * MathUtils.RadToDeg;
    var a = Math.asin(a.Z) * MathUtils.RadToDeg * i;
    let h = n - o;
    for (; h > 180; ) h -= 360;
    for (; -h > 180; ) h += 360;
    r && (h = h > 0 ? h - 360 : h + 360);
    let c = a - t;
    (i = Math.sqrt(h * h + c * c)),
      s < i && ((h *= s / i), (c *= s / i)),
      (n = o + h),
      (r = (t + c) * MathUtils.DegToRad),
      (e.Z = Math.sin(r)),
      (a = Math.cos(r));
    (e.X = Math.cos(n * MathUtils.DegToRad) * a),
      (e.Y = Math.sin(n * MathUtils.DegToRad) * a);
  }
  static InterpTo(t, a, i, s) {
    const r = a - t;
    return Math.abs(r) < MathCommon_1.MathCommon.KindaSmallNumber
      ? a
      : t + r * this.Clamp(i * s, 0, 1);
  }
  static InterpConstantTo(t, a, i, s) {
    const r = a - t;
    return Math.abs(r) < MathCommon_1.MathCommon.KindaSmallNumber
      ? a
      : t + this.Clamp(r, -(a = i * s), a);
  }
  static VectorInterpTo(t, a, i, s, r) {
    a.Subtraction(t, this.cz),
      this.cz.MultiplyEqual(this.Clamp(i * s, 0, 1)),
      this.cz.Addition(t, r);
  }
  static RotatorInterpTo(t, a, i, s, r) {
    s <= 0
      ? r.DeepCopy(a)
      : ((s *= i),
        (r.Pitch = a.Pitch - t.Pitch),
        (r.Yaw = a.Yaw - t.Yaw),
        (r.Roll = a.Roll - t.Roll),
        MathCommon_1.MathCommon.VectorNormalizeRotator(r),
        (r.Pitch = s >= 1 ? r.Pitch : r.Pitch * s),
        (r.Yaw = s >= 1 ? r.Yaw : r.Yaw * s),
        (r.Roll = s >= 1 ? r.Roll : r.Roll * s),
        (r.Pitch += t.Pitch),
        (r.Yaw += t.Yaw),
        (r.Roll += t.Roll),
        MathCommon_1.MathCommon.VectorNormalizeRotator(r));
  }
  static RotatorInterpConstantTo(t, a, i, s, r) {
    i <= 0 || s <= 0
      ? r.DeepCopy(t)
      : ((s *= i),
        (r.Pitch = a.Pitch - t.Pitch),
        (r.Yaw = a.Yaw - t.Yaw),
        (r.Roll = a.Roll - t.Roll),
        MathCommon_1.MathCommon.VectorNormalizeRotator(r),
        (r.Pitch = this.Clamp(r.Pitch, -s, s)),
        (r.Yaw = this.Clamp(r.Yaw, -s, s)),
        (r.Roll = this.Clamp(r.Roll, -s, s)),
        (r.Pitch += t.Pitch),
        (r.Yaw += t.Yaw),
        (r.Roll += t.Roll),
        MathCommon_1.MathCommon.VectorNormalizeRotator(r));
  }
  static RotatorInterpConstantToAvoid(t, a, i, s, r, e) {
    s <= 0 || r <= 0
      ? e.DeepCopy(t)
      : ((r *= s),
        (e.Pitch = a.Pitch - t.Pitch),
        (e.Yaw = a.Yaw - t.Yaw),
        (e.Roll = a.Roll - t.Roll),
        MathCommon_1.MathCommon.VectorNormalizeRotator(e),
        (e.Pitch = this.Clamp(e.Pitch, -r, r)),
        (e.Yaw = this.Clamp(e.Yaw, -r, r)),
        (e.Roll = this.Clamp(e.Roll, -r, r)),
        (e.Pitch += t.Pitch),
        (e.Yaw += t.Yaw),
        (e.Roll += t.Roll),
        MathCommon_1.MathCommon.VectorNormalizeRotator(e));
  }
  static GetRandomFloatNumber(t, a) {
    return t + (a - t) * Math.random();
  }
  static GetRandomVector(t, a) {
    const i = new UE.Vector();
    return (
      (i.X = MathUtils.GetRandomFloatNumber(t, a)),
      (i.Y = MathUtils.GetRandomFloatNumber(t, a)),
      (i.Z = MathUtils.GetRandomFloatNumber(t, a)),
      i
    );
  }
  static GetRandomVector2d(t, a) {
    const i = new UE.Vector2D();
    return (
      (i.X = MathUtils.GetRandomFloatNumber(t, a)),
      (i.Y = MathUtils.GetRandomFloatNumber(t, a)),
      i
    );
  }
  static GetAngleByVector2D(t) {
    let a = 0;
    return (
      (a = (
        t instanceof UE.Vector ? (this.cz.FromUeVector(t), this.cz) : t
      ).HeadingAngle()) * this.RadToDeg
    );
  }
  static GetVector2dByAngle(t) {
    t *= this.DegToRad;
    return new UE.Vector(Math.cos(t), Math.sin(t), 0);
  }
  static InRange(t, a) {
    return t >= a.Min && t <= a.Max;
  }
  static InRangeArray(t, a) {
    return t >= a[0] && t <= a[1];
  }
  static InRangeAngle(t, a) {
    let i = t;
    for (; i + 360 <= a.Max; ) i += 360;
    for (; i - 360 >= a.Min; ) i -= 360;
    return this.InRange(i, a);
  }
  static InRangeAngleArray(t, a) {
    let i = t;
    for (; i + 360 <= a[1]; ) i += 360;
    for (; i - 360 >= a[0]; ) i -= 360;
    return this.InRangeArray(i, a);
  }
  static InUeRange(t, a) {
    return (
      (a.LowerBound.Type === 0
        ? t > a.LowerBound.Value
        : t >= a.LowerBound.Value) &&
      (a.UpperBound.Type === 0
        ? t < a.UpperBound.Value
        : t <= a.UpperBound.Value)
    );
  }
  static InFastUeRange(t, a) {
    return (
      (a.LowerBoundType === 0
        ? t > a.LowerBoundValue
        : t >= a.LowerBoundValue) &&
      (a.UpperBoundType === 0 ? t < a.UpperBoundValue : t <= a.UpperBoundValue)
    );
  }
  static InUeRangeAngle(t, a) {
    let i = t;
    for (; i + 360 <= a.UpperBound.Value; ) i += 360;
    for (; i - 360 >= a.LowerBound.Value; ) i -= 360;
    return this.InUeRange(i, a);
  }
  static InFastUeRangeAngle(t, a) {
    let i = t;
    for (; i + 360 <= a.UpperBoundValue; ) i += 360;
    for (; i - 360 >= a.LowerBoundValue; ) i -= 360;
    return this.InFastUeRange(i, a);
  }
  static LocationInRangeArray(t, a, i, s, r, e, o) {
    this.InverseTransformPositionNoScale(t, a, i, this.cz);
    t = this.cz.Z;
    return (
      !!this.InRangeArray(t, o) &&
      ((a = this.cz.Size2D() - s), !!this.InRangeArray(a, r)) &&
      ((i = MathUtils.GetAngleByVector2D(this.cz)),
      this.InRangeAngleArray(i, e))
    );
  }
  static LocationInUeRange(t, a, i, s, r, e, o) {
    this.InverseTransformPositionNoScale(t, a, i, this.cz);
    t = this.cz.Z;
    return (
      !!this.InUeRange(t, o) &&
      ((a = this.cz.Size2D() - s), !!this.InUeRange(a, r)) &&
      ((i = MathUtils.GetAngleByVector2D(this.cz)), this.InUeRangeAngle(i, e))
    );
  }
  static LocationInFastUeRange(t, a, i, s, r, e, o) {
    this.InverseTransformPositionNoScale(t, a, i, this.cz);
    t = this.cz.Z;
    return (
      !!this.InFastUeRange(t, o) &&
      ((a = this.cz.Size2D() - s), !!this.InFastUeRange(a, r)) &&
      ((i = MathUtils.GetAngleByVector2D(this.cz)),
      this.InFastUeRangeAngle(i, e))
    );
  }
  static GetFloatPointFloor(t, a = 0) {
    (a = Math.pow(10, a)), (t *= a), (t = Math.floor(t));
    return (t /= a);
  }
  static GetFloatPointFloorString(t, a = 0) {
    return MathUtils.GetFloatPointFloor(t, a).toFixed(a);
  }
  static SafeDivide(t, a) {
    return a !== 0 ? t / a : 0;
  }
  static LongToBigInt(t) {
    if (typeof t === "number") {
      const i = BigInt(t);
      return i;
    }
    const a = BigInt(t.low >>> 0);
    const i = (BigInt(t.high) << exports.intBit) | a;
    return i;
  }
  static LongToNumber(t) {
    let a;
    return typeof t === "number"
      ? t
      : ((a = BigInt(t.low >>> 0)),
        (t = (BigInt(t.high) << exports.intBit) | a),
        Number(t));
  }
  static NumberToLong(t) {
    t = BigInt(t);
    return Long.fromBigInt(t);
  }
  static BigIntToLong(t) {
    return Long.fromBigInt(t);
  }
  static GetRandomRange(t, a) {
    a -= t;
    return t + Math.random() * a;
  }
  static BlendEaseIn(t, a, i, s) {
    return t + (a - t) * this.Lerp(0, 1, Math.pow(i, s));
  }
  static StandardizingPitch(t) {
    return t > 180 ? t - 360 : t < -180 ? t + 360 : t;
  }
  static WrapAngle(t) {
    return MathCommon_1.MathCommon.WrapAngle(t);
  }
  static GetAngleByVectorDot(t, a) {
    t = this.DotProduct(t, a);
    return Math.acos(MathCommon_1.MathCommon.Clamp(t, -1, 1)) * this.RadToDeg;
  }
  static DotProduct(t, a) {
    return t.X * a.X + t.Y * a.Y + t.Z * a.Z;
  }
  static ComposeRotator(t, a, i) {
    (t = t.Quaternion()), (a = a.Quaternion());
    i instanceof Quat_1.Quat
      ? a.Multiply(t, i)
      : i instanceof Rotator_1.Rotator &&
        (a.Multiply(t, this.az), this.az.Rotator(i));
  }
  static VectorToRotator(t, a) {
    return (
      (a.Yaw = Math.atan2(t.Y, t.X) * this.RadToDeg),
      (a.Pitch =
        Math.atan2(t.Z, Math.sqrt(t.X * t.X + t.Y * t.Y)) * this.RadToDeg),
      (a.Roll = 0),
      a
    );
  }
  static RotatorToVector(t, a) {
    var i = MathCommon_1.MathCommon.WrapAngle(t.Pitch);
    var t = MathCommon_1.MathCommon.WrapAngle(t.Yaw);
    var i = MathCommon_1.MathCommon.DegreeToRadian(i);
    var t = MathCommon_1.MathCommon.DegreeToRadian(t);
    const s = Math.cos(i);
    var i = Math.sin(i);
    const r = Math.cos(t);
    var t = Math.sin(t);
    return (a.X = s * r), (a.Y = s * t), (a.Z = i), a;
  }
  static Bisection(t, a, i, s) {
    let r = a;
    let e = i;
    for (; e - r > s; ) {
      const o = (r + e) / 2;
      t(o) ? (e = o) : (r = o + s);
    }
    return r;
  }
  static Square(t) {
    return t * t;
  }
  static TransformPosition(t, a, i, s, r) {
    i.Multiply(s, r), a.Quaternion().RotateVector(r, r), t.Addition(r, r);
  }
  static TransformPositionNoScale(t, a, i, s) {
    a.Quaternion().RotateVector(i, s), t.Addition(s, s);
  }
  static InverseTransformPosition(t, a, i, s, r) {
    s.Subtraction(t, r),
      a.Quaternion(this.az),
      this.az.Inverse(this.az),
      this.az.RotateVector(r, r),
      i.Multiply(r, r);
  }
  static InverseTransformPositionNoScale(t, a, i, s) {
    i.Subtraction(t, s),
      a.Quaternion(this.az),
      this.az.Inverse(this.az),
      this.az.RotateVector(s, s);
  }
  static mz() {
    return (
      this.dz ||
        ((this.dz = new Array(3)),
        (this.dz[0] = new Array(3)),
        (this.dz[1] = new Array(3)),
        (this.dz[2] = new Array(3))),
      this.dz
    );
  }
  static Cz() {
    return this.gz || (this.gz = new Array(3)), this.gz;
  }
  static LookRotation(a, i, s, r) {
    let e = a.X + i.Y + s.Z;
    if (e > 0) {
      e += 1;
      var o = 0.5 / Math.sqrt(e);
      var n = o * e;
      var h = (i.Z - s.Y) * o;
      var c = (s.X - a.Z) * o;
      var o = (a.Y - i.X) * o;
      r.Set(h, c, o, n);
    } else {
      (h = this.mz()),
        (c =
          ((h[0][0] = a.X),
          (h[0][1] = i.X),
          (h[0][2] = s.X),
          (h[1][0] = a.Y),
          (h[1][1] = i.Y),
          (h[1][2] = s.Y),
          (h[2][0] = a.Z),
          (h[2][1] = i.Z),
          (h[2][2] = s.Z),
          this.Cz()));
      let t = 0;
      i.Y > a.Y && (t = 1);
      (o = ((t = s.Z > h[t][t] ? 2 : t) + 1) % 3),
        (n = (1 + o) % 3),
        (i = ((e = h[t][t] - h[o][o] - h[n][n] + 1), 0.5 / Math.sqrt(e))),
        (a = ((c[t] = i * e), (h[n][o] - h[o][n]) * i));
      (c[o] = (h[o][t] + h[t][o]) * i),
        (c[n] = (h[n][t] + h[t][n]) * i),
        r.Set(c[0], c[1], c[2], a);
    }
    r.Normalize();
  }
  static LookRotationUpFirst(t, a, i) {
    const s = this.cz;
    var a = (s.FromUeVector(a), s.Normalize(), this.fz);
    var t = (s.CrossProduct(t, a), a.Normalize(), this.pz);
    a.CrossProduct(s, t),
      i instanceof Quat_1.Quat
        ? this.LookRotation(t, a, s, i)
        : i instanceof Rotator_1.Rotator &&
          (this.LookRotation(t, a, s, this.az), this.az.Rotator(i));
  }
  static LookRotationForwardFirst(t, a, i) {
    const s = this.cz;
    var t = (s.FromUeVector(t), s.Normalize(), this.fz);
    var a = (a.CrossProduct(s, t), t.Normalize(), this.pz);
    s.CrossProduct(t, a),
      i instanceof Quat_1.Quat
        ? this.LookRotation(s, t, a, i)
        : i instanceof Rotator_1.Rotator &&
          (this.LookRotation(s, t, a, this.az), this.az.Rotator(i));
  }
  static GetCubicValue(t) {
    return (-2 * t + 3) * t * t;
  }
  static DecimalToBinary(t) {
    let a = t;
    let i = "";
    if (a < 0) (i = "-"), (a = 0 - a);
    else {
      if (a === 0) return "0";
      i = "+";
    }
    for (var s = new Stack_1.Stack(); a > 0; )
      s.Push(Math.floor(a % 2)), (a = Math.floor(a / 2));
    const r = s.Size;
    for (let t = 0; t < r; t++) i += s.Pop().toString();
    return i;
  }
  static GetObliqueTriangleAngle(t, a, i) {
    return Math.acos((t * t + a * a - i * i) / (2 * t * a));
  }
  static GetTriangleCircumradius(t, a, i) {
    const s = (t + a + i) / 2;
    return (
      (t * a * i) /
      (this.CircumradiusRatio * Math.sqrt(s * (s - t) * (s - a) * (s - i)))
    );
  }
  static VerticalFovToHorizontally(t, a) {
    t = Math.tan((t / 2) * MathUtils.DegToRad);
    return 2 * Math.atan(t * a) * MathUtils.RadToDeg;
  }
  static HorizontalFovToVertically(t, a) {
    t = Math.tan((t / 2) * MathUtils.DegToRad);
    return 2 * Math.atan(t / a) * MathUtils.RadToDeg;
  }
  static IsValidNumbers(t, a, i, s = 1e8) {
    return (
      void 0 !== t &&
      void 0 !== a &&
      void 0 !== i &&
      t !== null &&
      a !== null &&
      i !== null &&
      !(isNaN(t) || isNaN(a) || isNaN(i)) &&
      Math.abs(t) < s &&
      Math.abs(a) < s &&
      Math.abs(i) < s
    );
  }
  static IsValidVector(t, a = 1e8) {
    let i, s;
    return (
      !!t &&
      ((i = t.X), (s = t.Y), (t = t.Z), void 0 !== i) &&
      void 0 !== s &&
      void 0 !== t &&
      i !== null &&
      s !== null &&
      t !== null &&
      !(isNaN(i) || isNaN(s) || isNaN(t)) &&
      Math.abs(i) < a &&
      Math.abs(s) < a &&
      Math.abs(t) < a
    );
  }
  static IsValidRotator(t, a = 1e8) {
    let i, s;
    return (
      !!t &&
      ((i = t.Roll), (s = t.Pitch), (t = t.Yaw), void 0 !== i) &&
      void 0 !== s &&
      void 0 !== t &&
      i !== null &&
      s !== null &&
      t !== null &&
      !(isNaN(i) || isNaN(s) || isNaN(t)) &&
      Math.abs(i) < a &&
      Math.abs(s) < a &&
      Math.abs(t) < a
    );
  }
}
((exports.MathUtils = MathUtils).MaxFloat = 3402823466e29),
  (MathUtils.Int32Max = 2147483647),
  (MathUtils.Int16Max = 32767),
  (MathUtils.SmallNumber = 1e-8),
  (MathUtils.KindaSmallNumber = 1e-4),
  (MathUtils.LargeNumber = 1e50),
  (MathUtils.MillisecondToSecond = 0.001),
  (MathUtils.SecondToMillisecond = 1e3),
  (MathUtils.CircumradiusRatio = 4),
  (MathUtils.RadToDeg = exports.PI_DEG / Math.PI),
  (MathUtils.DegToRad = Math.PI / exports.PI_DEG),
  (MathUtils.DefaultTransform = new UE.Transform()),
  (MathUtils.DefaultTransformProxy = Transform_1.Transform.Create()),
  (MathUtils.cz = Vector_1.Vector.Create()),
  (MathUtils.fz = Vector_1.Vector.Create()),
  (MathUtils.pz = Vector_1.Vector.Create()),
  (MathUtils.CommonTempVector = Vector_1.Vector.Create()),
  (MathUtils.CommonTempRotator = Rotator_1.Rotator.Create()),
  (MathUtils.CommonTempQuat = Quat_1.Quat.Create()),
  (MathUtils.az = Quat_1.Quat.Create());
// # sourceMappingURL=MathUtils.js.map
