"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Vector = void 0);
const UE = require("ue"),
  MathCommon_1 = require("./MathCommon"),
  Quat_1 = require("./Quat"),
  VECTOR_POOL_MAX_CAPACITY = 50;
class Vector {
  constructor(t, r, e) {
    (this.Tuple = [t ?? 0, r ?? 0, e ?? 0]), (this.hz = void 0);
  }
  get X() {
    return this.Tuple[0];
  }
  set X(t) {
    this.Tuple[0] = t;
  }
  get Y() {
    return this.Tuple[1];
  }
  set Y(t) {
    this.Tuple[1] = t;
  }
  get Z() {
    return this.Tuple[2];
  }
  set Z(t) {
    this.Tuple[2] = t;
  }
  ToUeVector(t = !1) {
    var r = this.Tuple;
    return (
      (this.hz = Vector.lz.pop()),
      void 0 === this.hz && (this.hz = new UE.Vector()),
      this.hz.Set(r[0], r[1], r[2]),
      t
        ? ((r = this.hz), Vector.lz.push(this.hz), (this.hz = void 0), r)
        : this.hz
    );
  }
  ToString() {
    return `X=${this.Tuple[0]}, Y=${this.Tuple[1]}, Z=` + this.Tuple[2];
  }
  FromUeVector(t) {
    var r = this.Tuple;
    (r[0] = t.X), (r[1] = t.Y), (r[2] = t.Z);
  }
  FromConfigVector(t) {
    var r = this.Tuple;
    (r[0] = t.X ?? 0), (r[1] = t.Y ?? 0), (r[2] = t.Z ?? 0);
  }
  static Create(t, r, e) {
    var a = new Vector();
    return (
      "number" == typeof t || void 0 === t
        ? a.Set(t || 0, r || 0, e || 0)
        : t && a.FromUeVector(t),
      a
    );
  }
  DotProduct(t) {
    var r = this.Tuple,
      t = t.Tuple;
    return r[0] * t[0] + r[1] * t[1] + r[2] * t[2];
  }
  static DotProduct(t, r) {
    return t.DotProduct(r);
  }
  CrossProduct(t, r) {
    var e = this.Tuple,
      t = t.Tuple,
      r = r.Tuple;
    [r[0], r[1], r[2]] = [
      e[1] * t[2] - e[2] * t[1],
      e[2] * t[0] - e[0] * t[2],
      e[0] * t[1] - e[1] * t[0],
    ];
  }
  CrossProductEqual(t) {
    return this.CrossProduct(t, this), this;
  }
  static CrossProduct(t, r, e) {
    t.CrossProduct(r, e);
  }
  DeepCopy(t) {
    var r = this.Tuple;
    (r[0] = t.X), (r[1] = t.Y), (r[2] = t.Z), this.hz && this.ToUeVector();
  }
  AdditionEqual(t) {
    var r = this.Tuple;
    return (
      "number" == typeof t
        ? ((r[0] += t), (r[1] += t), (r[2] += t))
        : ((t = t.Tuple), (r[0] += t[0]), (r[1] += t[1]), (r[2] += t[2])),
      this
    );
  }
  SubtractionEqual(t) {
    var r = this.Tuple;
    return (
      "number" == typeof t
        ? ((r[0] -= t), (r[1] -= t), (r[2] -= t))
        : ((t = t.Tuple), (r[0] -= t[0]), (r[1] -= t[1]), (r[2] -= t[2])),
      this
    );
  }
  MultiplyEqual(t) {
    var r = this.Tuple;
    return (
      "number" == typeof t
        ? ((r[0] *= t), (r[1] *= t), (r[2] *= t))
        : ((t = t.Tuple), (r[0] *= t[0]), (r[1] *= t[1]), (r[2] *= t[2])),
      this
    );
  }
  DivisionEqual(t) {
    var r,
      e = this.Tuple;
    return (
      "number" == typeof t
        ? ((e[0] *= r = 1 / t), (e[1] *= r), (e[2] *= r))
        : ((r = t.Tuple), (e[0] /= r[0]), (e[1] /= r[1]), (e[2] /= r[2])),
      this
    );
  }
  Addition(t, r) {
    var e = this.Tuple,
      a = r.Tuple;
    return (
      "number" == typeof t
        ? ((a[0] = e[0] + t), (a[1] = e[1] + t), (a[2] = e[2] + t))
        : ((t = t.Tuple),
          (a[0] = e[0] + t[0]),
          (a[1] = e[1] + t[1]),
          (a[2] = e[2] + t[2])),
      r
    );
  }
  Subtraction(t, r) {
    var e = this.Tuple,
      a = r.Tuple;
    return (
      "number" == typeof t
        ? ((a[0] = e[0] - t), (a[1] = e[1] - t), (a[2] = e[2] - t))
        : ((t = t.Tuple),
          (a[0] = e[0] - t[0]),
          (a[1] = e[1] - t[1]),
          (a[2] = e[2] - t[2])),
      r
    );
  }
  Multiply(t, r) {
    var e = this.Tuple,
      a = r.Tuple;
    return (
      "number" == typeof t
        ? ((a[0] = e[0] * t), (a[1] = e[1] * t), (a[2] = e[2] * t))
        : ((t = t.Tuple),
          (a[0] = e[0] * t[0]),
          (a[1] = e[1] * t[1]),
          (a[2] = e[2] * t[2])),
      r
    );
  }
  Division(t, r) {
    var e,
      a = this.Tuple,
      o = r.Tuple;
    return (
      "number" == typeof t
        ? ((o[0] = a[0] * (e = 1 / t)), (o[1] = a[1] * e), (o[2] = a[2] * e))
        : ((e = t.Tuple),
          (o[0] = a[0] / e[0]),
          (o[1] = a[1] / e[1]),
          (o[2] = a[2] / e[2])),
      r
    );
  }
  Equality(t) {
    var r = this.Tuple,
      t = t.Tuple;
    return r[0] === t[0] && r[1] === t[1] && r[2] === t[2];
  }
  Inequality(t) {
    var r = this.Tuple,
      t = t.Tuple;
    return r[0] !== t[0] || r[1] !== t[1] || r[2] !== t[2];
  }
  Equals(t, r = MathCommon_1.MathCommon.KindaSmallNumber) {
    var e = this.Tuple,
      t = t.Tuple;
    return (
      Math.abs(e[0] - t[0]) <= r &&
      Math.abs(e[1] - t[1]) <= r &&
      Math.abs(e[2] - t[2]) <= r
    );
  }
  AllComponentsEqual(t = MathCommon_1.MathCommon.KindaSmallNumber) {
    var r = this.Tuple;
    return !(
      Math.abs(r[0] - r[1]) > t ||
      Math.abs(r[0] - r[2]) > t ||
      Math.abs(r[1] - r[2]) > t
    );
  }
  UnaryNegation(t) {
    var r = this.Tuple,
      t = t.Tuple;
    (t[0] = -r[0]), (t[1] = -r[1]), (t[2] = -r[2]);
  }
  Component(t) {
    switch (t) {
      case 0:
        return this.Tuple[0];
      case 1:
        return this.Tuple[1];
      case 2:
        return this.Tuple[2];
      default:
        return;
    }
  }
  GetComponentForAxis(t) {
    switch (t) {
      case 1:
        return this.Tuple[0];
      case 2:
        return this.Tuple[1];
      case 3:
        return this.Tuple[2];
      default:
        return 0;
    }
  }
  SetComponentForAxis(t, r) {
    switch (t) {
      case 1:
        this.Tuple[0] = r;
        break;
      case 2:
        this.Tuple[1] = r;
        break;
      case 3:
        this.Tuple[2] = r;
    }
  }
  Set(t, r, e) {
    var a = this.Tuple;
    (a[0] = t), (a[1] = r), (a[2] = e), this.hz && this.ToUeVector();
  }
  GetMax() {
    var t = this.Tuple;
    return Math.max(t[0], t[1], t[2]);
  }
  GetAbsMax() {
    var t = this.Tuple;
    return Math.max(Math.abs(t[0]), Math.abs(t[1]), Math.abs(t[2]));
  }
  GetMin() {
    var t = this.Tuple;
    return Math.min(t[0], t[1], t[2]);
  }
  GetAbsMin() {
    var t = this.Tuple;
    return Math.min(Math.abs(t[0]), Math.abs(t[1]), Math.abs(t[2]));
  }
  ComponentMin(t, r) {
    var e = this.Tuple,
      t = t.Tuple,
      r = r.Tuple;
    (r[0] = Math.min(e[0], t[0])),
      (r[1] = Math.min(e[1], t[1])),
      (r[2] = Math.min(e[2], t[2]));
  }
  ComponentMax(t, r) {
    var e = this.Tuple,
      t = t.Tuple,
      r = r.Tuple;
    (r[0] = Math.max(e[0], t[0])),
      (r[1] = Math.max(e[1], t[1])),
      (r[2] = Math.max(e[2], t[2]));
  }
  GetAbs(t) {
    var r = this.Tuple,
      t = t.Tuple;
    (t[0] = Math.abs(r[0])), (t[1] = Math.abs(r[1])), (t[2] = Math.abs(r[2]));
  }
  Size() {
    return Math.sqrt(this.SizeSquared());
  }
  SizeSquared() {
    var t = this.Tuple;
    return t[0] * t[0] + t[1] * t[1] + t[2] * t[2];
  }
  Size2D() {
    return Math.sqrt(this.SizeSquared2D());
  }
  SizeSquared2D() {
    var t = this.Tuple;
    return t[0] * t[0] + t[1] * t[1];
  }
  IsNearlyZero(t = MathCommon_1.MathCommon.KindaSmallNumber) {
    var r = this.Tuple;
    return !(Math.abs(r[0]) > t || Math.abs(r[1]) > t || Math.abs(r[2]) > t);
  }
  IsZero() {
    var t = this.Tuple;
    return 0 === t[0] && 0 === t[1] && 0 === t[2];
  }
  IsUnit(t = MathCommon_1.MathCommon.KindaSmallNumber) {
    return Math.abs(1 - this.SizeSquared()) < t;
  }
  IsNormalized() {
    return this.IsUnit(MathCommon_1.MathCommon.ThreshVectorNormalized);
  }
  Normalize(t = MathCommon_1.MathCommon.SmallNumber) {
    var r = this.SizeSquared();
    return t < r && ((t = 1 / Math.sqrt(r)), this.MultiplyEqual(t), !0);
  }
  GetUnsafeNormal(t) {
    var r = 1 / this.Size();
    this.Multiply(r, t);
  }
  GetUnsafeNormal2D(t) {
    var r = this.Tuple,
      t = t.Tuple,
      e = 1 / this.Size2D();
    (t[0] = r[0] * e), (t[1] = r[1] * e), (t[2] = 0);
  }
  GetSafeNormal(t, r = MathCommon_1.MathCommon.SmallNumber) {
    var e = this.SizeSquared();
    1 === e
      ? t.DeepCopy(this)
      : e < r
        ? t.Reset()
        : ((r = 1 / Math.sqrt(e)), this.Multiply(r, t));
  }
  GetSafeNormal2D(t, r = MathCommon_1.MathCommon.SmallNumber) {
    var e = this.Tuple,
      a = t.Tuple,
      o = this.SizeSquared2D();
    1 === o
      ? t.DeepCopy(this)
      : o < r
        ? t.Reset()
        : ((r = 1 / Math.sqrt(o)), (a[0] = e[0] * r), (a[1] = e[1] * r)),
      (a[2] = 0);
  }
  ToDirectionAndLength(t) {
    var r,
      e = this.Size();
    return (
      e > MathCommon_1.MathCommon.SmallNumber
        ? ((r = 1 / e), t.MultiplyEqual(this).MultiplyEqual(r))
        : t.Reset(),
      e
    );
  }
  GetSignVector(t) {
    var r = this.Tuple,
      t = t.Tuple;
    (t[0] = MathCommon_1.MathCommon.FloatSelect(r[0], 1, -1)),
      (t[1] = MathCommon_1.MathCommon.FloatSelect(r[1], 1, -1)),
      (t[2] = MathCommon_1.MathCommon.FloatSelect(r[2], 1, -1));
  }
  Projection(t) {
    var r = this.Tuple,
      t = t.Tuple,
      e = 1 / r[2];
    (t[0] = r[0] * e), (t[1] = r[1] * e), (t[2] = 1);
  }
  GridSnap(t, r) {
    var e = this.Tuple,
      r = r.Tuple;
    (r[0] = t ? Math.floor((e[0] + 0.5 * t) / t) * t : r[0]),
      (r[1] = t ? Math.floor((e[1] + 0.5 * t) / t) * t : r[0]),
      (r[2] = t ? Math.floor((e[2] + 0.5 * t) / t) * t : r[0]);
  }
  BoundToCube(t, r) {
    var e = this.Tuple,
      r = r.Tuple;
    (r[0] = MathCommon_1.MathCommon.Clamp(e[0], -t, t)),
      (r[1] = MathCommon_1.MathCommon.Clamp(e[1], -t, t)),
      (r[2] = MathCommon_1.MathCommon.Clamp(e[2], -t, t));
  }
  BoundToBox(t, r, e) {
    var a = this.Tuple,
      e = e.Tuple,
      t = t.Tuple,
      r = r.Tuple;
    (e[0] = MathCommon_1.MathCommon.Clamp(a[0], t[0], r[0])),
      (e[1] = MathCommon_1.MathCommon.Clamp(a[1], t[1], r[1])),
      (e[2] = MathCommon_1.MathCommon.Clamp(a[2], t[2], r[2]));
  }
  GetClampedToSize(t, r, e) {
    var a = this.Size();
    a > MathCommon_1.MathCommon.SmallNumber ? this.Division(a, e) : e.Reset(),
      (a = MathCommon_1.MathCommon.Clamp(a, t, r)),
      e.MultiplyEqual(a);
  }
  GetClampedToSize2D(t, r, e) {
    var a = this.Tuple,
      o = e.Tuple,
      i = this.Size2D();
    i > MathCommon_1.MathCommon.SmallNumber
      ? e.DivisionEqual(this).DivisionEqual(i)
      : e.Reset(),
      (i = MathCommon_1.MathCommon.Clamp(i, t, r)),
      (o[0] = o[0] * i),
      (o[1] = o[1] * i),
      (o[2] = a[2]);
  }
  GetClampedToMaxSize(t, r) {
    var e;
    t < MathCommon_1.MathCommon.KindaSmallNumber
      ? r.Reset()
      : (e = this.SizeSquared()) > Math.pow(t, 2)
        ? ((t = t / Math.sqrt(e)), this.Multiply(t, r))
        : r.DeepCopy(this);
  }
  GetClampedToMaxSize2D(t, r) {
    var e,
      a = this.Tuple,
      o = r.Tuple;
    (o[2] = a[2]),
      t < MathCommon_1.MathCommon.KindaSmallNumber
        ? (o[0] = o[1] = 0)
        : (e = this.SizeSquared2D()) > Math.pow(t, 2)
          ? ((t = +t / Math.sqrt(e)), (o[0] = a[0] * t), (o[1] = a[1] * t))
          : r.DeepCopy(this);
  }
  AddBounded(t, r = MathCommon_1.MathCommon.MaxInt16) {
    this.AdditionEqual(t), this.BoundToCube(r, this);
  }
  Reciprocal(t) {
    var r = this.Tuple,
      t = t.Tuple;
    (t[0] = 0 !== r[0] ? 1 / r[0] : MathCommon_1.MathCommon.BigNumber),
      (t[1] = 0 !== r[1] ? 1 / r[1] : MathCommon_1.MathCommon.BigNumber),
      (t[2] = 0 !== r[2] ? 1 / r[2] : MathCommon_1.MathCommon.BigNumber);
  }
  IsUniform(t = MathCommon_1.MathCommon.KindaSmallNumber) {
    return this.AllComponentsEqual(t);
  }
  MirrorByVector(t, r) {
    var e = this.DotProduct(t);
    t.MultiplyEqual(-2 * e), r.AdditionEqual(this);
  }
  MirrorByPlane(t, r) {
    var e = this.Tuple,
      a = t.Tuple,
      e = e[0] * a[0] + e[1] * a[1] + e[2] * a[2] - t.W;
    t.Multiply(-2 * e, r), r.AdditionEqual(this);
  }
  RotateAngleAxis(t, r, e) {
    var a = this.Tuple,
      r = r.Tuple,
      e = e.Tuple,
      t = t * MathCommon_1.MathCommon.DegToRad,
      o = Math.sin(t),
      t = Math.cos(t),
      i = r[0] * r[0],
      h = r[1] * r[1],
      s = r[2] * r[2],
      n = r[0] * r[1],
      c = r[1] * r[2],
      M = r[2] * r[0],
      m = r[0] * o,
      u = r[1] * o,
      r = r[2] * o,
      o = 1 - t,
      V = a[0],
      C = a[1],
      a = a[2];
    (e[0] = (o * i + t) * V + (o * n - r) * C + (o * M + u) * a),
      (e[1] = (o * n + r) * V + (o * h + t) * C + (o * c - m) * a),
      (e[2] = (o * M - u) * V + (o * c + m) * C + (o * s + t) * a);
  }
  CosineAngle2D(t, r = MathCommon_1.MathCommon.KindaSmallNumber) {
    var e,
      a = this.Tuple[0],
      o = this.Tuple[1],
      i = t.Tuple[0],
      t = t.Tuple[1],
      h = a * a + o * o;
    return h <= r || (e = i * i + t * t) <= r
      ? 0
      : (a * i + o * t) / Math.sqrt(h * e);
  }
  ProjectOnTo(t, r) {
    t = this.DotProduct(t) / t.SizeSquared();
    this.Multiply(t, r);
  }
  ProjectOnToNormal(t, r) {
    t = this.DotProduct(t);
    this.Multiply(t, r);
  }
  ToOrientationRotator(t) {
    (t.Yaw =
      Math.atan2(this.Tuple[1], this.Tuple[0]) *
      MathCommon_1.MathCommon.RadToDeg),
      (t.Pitch =
        Math.atan2(this.Tuple[2], this.Size2D()) *
        MathCommon_1.MathCommon.RadToDeg),
      (t.Roll = 0);
  }
  ToOrientationQuat(t) {
    var r = Math.atan2(this.Tuple[1], this.Tuple[0]),
      e = Math.atan2(this.Tuple[2], this.Size2D()),
      a = Math.sin(0.5 * e),
      e = Math.cos(0.5 * e),
      o = Math.sin(0.5 * r),
      r = Math.cos(0.5 * r);
    (t.X = a * o), (t.Y = -a * r), (t.Z = e * o), (t.W = e * r);
  }
  Rotation(t) {
    this.ToOrientationRotator(t);
  }
  FindBestAxisVectors(t, r) {
    var e = this.Tuple,
      a = t.Tuple,
      o = Math.abs(e[0]),
      i = Math.abs(e[1]),
      h = Math.abs(e[2]),
      o =
        (o < h && i < h
          ? ((a[0] = 1), (a[1] = a[2] = 0))
          : ((a[0] = a[1] = 0), (a[2] = 1)),
        this.DotProduct(t)),
      i = a[0] - e[0] * o,
      h = a[1] - e[1] * o,
      e = a[2] - e[2] * o,
      o = i * i + h * h + e * e;
    1 == o
      ? ((a[0] = i), (a[1] = h), (a[2] = e))
      : o < MathCommon_1.MathCommon.SmallNumber
        ? t.Reset()
        : ((o = 1 / Math.sqrt(o)),
          (a[0] = i * o),
          (a[1] = h * o),
          (a[2] = e * o)),
      t.CrossProduct(this, r);
  }
  UnwindEuler() {
    var t = this.Tuple;
    (t[0] = MathCommon_1.MathCommon.UnwindDegrees(t[0])),
      (t[1] = MathCommon_1.MathCommon.UnwindDegrees(t[1])),
      (t[2] = MathCommon_1.MathCommon.UnwindDegrees(t[2]));
  }
  ContainsNaN() {
    var t = this.Tuple;
    return !isFinite(t[0]) || !isFinite(t[1]) || !isFinite(t[2]);
  }
  UnitCartesianToSpherical(t) {
    var r = this.Tuple,
      e = r[0],
      a = r[1],
      r = r[2];
    (t.X = Math.acos(r / this.Size())), (t.Y = Math.atan2(a, e));
  }
  HeadingAngle() {
    var t = this.Tuple,
      r = Math.abs(t[0]) < MathCommon_1.MathCommon.KindaSmallNumber ? 0 : t[0],
      t = Math.abs(t[1]) < MathCommon_1.MathCommon.KindaSmallNumber ? 0 : t[1];
    return 0 === r && 0 === t ? 0 : Math.atan2(t, r);
  }
  static CreateOrthonormalBasis(t, r, e) {
    var a = t.Tuple,
      o = r.Tuple,
      i = e.Tuple,
      h = t.DotProduct(e) / e.SizeSquared(),
      s = r.DotProduct(e) / e.SizeSquared(),
      a =
        ((a[0] -= h * i[0]),
        (a[1] -= h * i[1]),
        (a[2] -= h * i[2]),
        (o[0] -= s * i[0]),
        (o[1] -= s * i[1]),
        (o[2] -= s * i[2]),
        MathCommon_1.MathCommon.Delta * MathCommon_1.MathCommon.Delta);
    t.SizeSquared() < a && r.CrossProduct(e, t),
      r.SizeSquared() < a && t.CrossProduct(e, r),
      t.Normalize(),
      r.Normalize(),
      e.Normalize();
  }
  static PointsAreSame(t, r) {
    return this.PointsAreNear(t, r, MathCommon_1.MathCommon.ThreshPointAreSame);
  }
  static PointsAreNear(t, r, e) {
    (t = t.Tuple), (r = r.Tuple);
    return (
      Math.abs(t[0] - r[0]) < e &&
      Math.abs(t[1] - r[1]) < e &&
      Math.abs(t[2] - r[2]) < e
    );
  }
  static PointPlaneDist(t, r, e) {
    var t = t.Tuple,
      r = r.Tuple,
      e = e.Tuple,
      a = t[0] - r[0],
      o = t[1] - r[1],
      t = t[2] - r[2];
    return a * e[0] + o * e[1] + t * e[2];
  }
  static PointPlaneProject(...t) {
    var r, e, a, o, i, h, s, n, c, M;
    t.length < 3 ||
      5 < t.length ||
      ((r = t[0]),
      (a = (e = t[t.length - 1]).Tuple),
      3 === t.length
        ? ((c = t[1]),
          (o = this.DotProduct(r, c) - c.W),
          c.Multiply(-o, e),
          e.AdditionEqual(r))
        : 4 === t.length
          ? ((c = t[1]),
            (o = t[2]),
            (c = this.PointPlaneDist(r, c, o)),
            o.Multiply(-c, e),
            e.AdditionEqual(r))
          : 5 === t.length &&
            ((c = (o = t[1]).Tuple),
            (M = t[2].Tuple),
            (t = t[3].Tuple),
            (i = M[0] - c[0]),
            (h = M[1] - c[1]),
            (M = M[2] - c[2]),
            (s = t[0] - c[0]),
            (n = t[1] - c[1]),
            (t = t[0] - c[2]),
            (a[0] = h * t - M * n),
            (a[1] = M * s - i * t),
            (a[2] = i * n - h * s),
            (M = this.DotProduct(o, (c = e))),
            (t = this.DotProduct(r, c) - M),
            c.Multiply(-t, e),
            e.AdditionEqual(r)));
  }
  static VectorPlaneProject(t, r, e) {
    t.ProjectOnToNormal(r, e), e.UnaryNegation(e), e.AdditionEqual(t);
  }
  static DistSquaredXY(t, r) {
    (t = t.Tuple), (r = r.Tuple);
    return Math.pow(r[0] - t[0], 2) + Math.pow(r[1] - t[1], 2);
  }
  static DistXY(t, r) {
    return Math.sqrt(this.DistSquaredXY(t, r));
  }
  static DistSquared(t, r) {
    (t = t.Tuple), (r = r.Tuple);
    return (
      Math.pow(r[0] - t[0], 2) +
      Math.pow(r[1] - t[1], 2) +
      Math.pow(r[2] - t[2], 2)
    );
  }
  static Dist(t, r) {
    return Math.sqrt(this.DistSquared(t, r));
  }
  static Distance(t, r) {
    return this.Dist(t, r);
  }
  static Dist2D(t, r) {
    return this.DistXY(t, r);
  }
  static DistSquared2D(t, r) {
    return this.DistSquaredXY(t, r);
  }
  static BoxPushOut(t, r) {
    (t = t.Tuple), (r = r.Tuple);
    return (
      Math.abs(t[0] * r[0]) + Math.abs(t[1] * r[1]) + Math.abs(t[2] * r[2])
    );
  }
  static Parallel(t, r, e = MathCommon_1.MathCommon.ThreshNormalsAreParallel) {
    t = this.DotProduct(t, r);
    return Math.abs(t) >= e;
  }
  static Coincident(
    t,
    r,
    e = MathCommon_1.MathCommon.ThreshNormalsAreParallel,
  ) {
    return e <= this.DotProduct(t, r);
  }
  static Orthogonal(
    t,
    r,
    e = MathCommon_1.MathCommon.ThreshNormalsAreOrthogonal,
  ) {
    t = this.DotProduct(t, r);
    return Math.abs(t) <= e;
  }
  static Coplanar(
    t,
    r,
    e,
    a,
    o = MathCommon_1.MathCommon.ThreshNormalsAreParallel,
  ) {
    return !(
      !this.Parallel(r, a, o) ||
      Math.abs(this.PointPlaneDist(t, e, r)) >
        MathCommon_1.MathCommon.ThreshPointOnPlane
    );
  }
  static Triple(t, r, e) {
    (t = t.Tuple), (r = r.Tuple), (e = e.Tuple);
    return (
      t[0] * (r[1] * e[2] - r[2] * e[1]) +
      t[1] * (r[2] * e[0] - r[0] * e[2]) +
      t[2] * (r[0] * e[1] - r[1] * e[0])
    );
  }
  static RadiansToDegrees(t, r) {
    (t = t.Tuple), (r = r.Tuple);
    (r[0] = t[0] * MathCommon_1.MathCommon.RadToDeg),
      (r[1] = t[1] * MathCommon_1.MathCommon.RadToDeg),
      (r[2] = t[2] * MathCommon_1.MathCommon.RadToDeg);
  }
  static DegreesToRadians(t, r) {
    (t = t.Tuple), (r = r.Tuple);
    (r[0] = t[0] * MathCommon_1.MathCommon.DegToRad),
      (r[1] = t[1] * MathCommon_1.MathCommon.DegToRad),
      (r[2] = t[2] * MathCommon_1.MathCommon.DegToRad);
  }
  Reset() {
    var t = this.Tuple;
    (t[0] = 0), (t[1] = 0), (t[2] = 0), this.hz && this.ToUeVector();
  }
  DeepCopy2D(t) {
    var r = this.Tuple,
      t = t.Tuple;
    (t[0] = r[0]), (t[1] = r[1]), (t[2] = 0), this.hz && this.ToUeVector();
  }
  SineAngle2D(t, r = MathCommon_1.MathCommon.KindaSmallNumber) {
    var e = this.Tuple,
      t = t.Tuple;
    let a = e[0],
      o = e[1],
      i = t[0],
      h = t[1];
    (e = a * a + o * o),
      r < e && ((t = 1 / Math.sqrt(e)), (a *= t), (o *= t)),
      (e = i * i + h * h);
    return r < e && ((t = 1 / Math.sqrt(e)), (i *= t), (h *= t)), a * h - o * i;
  }
  static VectorBlendEaseIn(t, r, e, a, o) {
    var t = t.Tuple,
      r = r.Tuple,
      o = o.Tuple,
      i = t[0],
      h = t[1],
      t = t[2],
      s = r[0] - i,
      n = r[1] - h,
      r = r[2] - t,
      e = MathCommon_1.MathCommon.Lerp(0, 1, Math.pow(e, a));
    (o[0] = i + s * e), (o[1] = h + n * e), (o[2] = t + r * e);
  }
  static DirectLerp(t, r, e, a) {
    var o,
      i = Vector.DotProduct(t, r),
      i = Math.acos(i) * MathCommon_1.MathCommon.RadToDeg;
    i < e
      ? a.DeepCopy(r)
      : ((o = Quat_1.Quat.Create()),
        Quat_1.Quat.FindBetween(t, r, o),
        Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, o, e / i, o),
        o.RotateVector(t, a));
  }
  static Lerp(t, r, e, a) {
    e = MathCommon_1.MathCommon.Clamp(e, 0, 1);
    r.Subtraction(t, a), a.MultiplyEqual(e), a.AdditionEqual(t);
  }
  static LerpSin(t, r, e, a) {
    (t = t.Tuple), (r = r.Tuple), (e = MathCommon_1.MathCommon.Clamp(e, 0, 1));
    a.Set(
      MathCommon_1.MathCommon.LerpSin(t[0], r[0], e),
      MathCommon_1.MathCommon.LerpSin(t[1], r[1], e),
      MathCommon_1.MathCommon.LerpSin(t[2], r[2], e),
    );
  }
  static VectorCopy(t, r) {
    (r.X = t.X), (r.Y = t.Y), (r.Z = t.Z);
  }
  static GetVector2dByAngle(t) {
    t *= MathCommon_1.MathCommon.DegToRad;
    return Vector.Create(Math.cos(t), Math.sin(t), 0);
  }
  static GetAngleByVector2D(t) {
    return t.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg;
  }
}
((exports.Vector = Vector).lz = new Array(VECTOR_POOL_MAX_CAPACITY)),
  (Vector.ZeroVectorProxy = Vector.Create(0, 0, 0)),
  (Vector.OneVectorProxy = Vector.Create(1, 1, 1)),
  (Vector.UpVectorProxy = Vector.Create(0, 0, 1)),
  (Vector.DownVectorProxy = Vector.Create(0, 0, -1)),
  (Vector.ForwardVectorProxy = Vector.Create(1, 0, 0)),
  (Vector.BackwardVectorProxy = Vector.Create(-1, 0, 0)),
  (Vector.RightVectorProxy = Vector.Create(0, 1, 0)),
  (Vector.LeftVectorProxy = Vector.Create(0, -1, 0)),
  (Vector.XAxisVectorProxy = Vector.ForwardVectorProxy),
  (Vector.YAxisVectorProxy = Vector.RightVectorProxy),
  (Vector.ZAxisVectorProxy = Vector.UpVectorProxy),
  (Vector.ZeroVector = Vector.ZeroVectorProxy.ToUeVector()),
  (Vector.OneVector = Vector.OneVectorProxy.ToUeVector()),
  (Vector.UpVector = Vector.UpVectorProxy.ToUeVector()),
  (Vector.DownVector = Vector.DownVectorProxy.ToUeVector()),
  (Vector.ForwardVector = Vector.ForwardVectorProxy.ToUeVector()),
  (Vector.BackwardVector = Vector.BackwardVectorProxy.ToUeVector()),
  (Vector.RightVector = Vector.RightVectorProxy.ToUeVector()),
  (Vector.LeftVector = Vector.LeftVectorProxy.ToUeVector()),
  (Vector.XAxisVector = Vector.XAxisVectorProxy.ToUeVector()),
  (Vector.YAxisVector = Vector.YAxisVectorProxy.ToUeVector()),
  (Vector.ZAxisVector = Vector.ZAxisVectorProxy.ToUeVector()),
  Object.defineProperty(Vector.ZeroVectorProxy.Tuple, "0", { writable: !1 }),
  Object.defineProperty(Vector.ZeroVectorProxy.Tuple, "1", { writable: !1 }),
  Object.defineProperty(Vector.ZeroVectorProxy.Tuple, "2", { writable: !1 }),
  Object.defineProperty(Vector.OneVectorProxy.Tuple, "0", { writable: !1 }),
  Object.defineProperty(Vector.OneVectorProxy.Tuple, "1", { writable: !1 }),
  Object.defineProperty(Vector.OneVectorProxy.Tuple, "2", { writable: !1 }),
  Object.defineProperty(Vector.UpVectorProxy.Tuple, "0", { writable: !1 }),
  Object.defineProperty(Vector.UpVectorProxy.Tuple, "1", { writable: !1 }),
  Object.defineProperty(Vector.UpVectorProxy.Tuple, "2", { writable: !1 }),
  Object.defineProperty(Vector.DownVectorProxy.Tuple, "0", { writable: !1 }),
  Object.defineProperty(Vector.DownVectorProxy.Tuple, "1", { writable: !1 }),
  Object.defineProperty(Vector.DownVectorProxy.Tuple, "2", { writable: !1 }),
  Object.defineProperty(Vector.ForwardVectorProxy.Tuple, "0", { writable: !1 }),
  Object.defineProperty(Vector.ForwardVectorProxy.Tuple, "1", { writable: !1 }),
  Object.defineProperty(Vector.ForwardVectorProxy.Tuple, "2", { writable: !1 }),
  Object.defineProperty(Vector.BackwardVectorProxy.Tuple, "0", {
    writable: !1,
  }),
  Object.defineProperty(Vector.BackwardVectorProxy.Tuple, "1", {
    writable: !1,
  }),
  Object.defineProperty(Vector.BackwardVectorProxy.Tuple, "2", {
    writable: !1,
  }),
  Object.defineProperty(Vector.RightVectorProxy.Tuple, "0", { writable: !1 }),
  Object.defineProperty(Vector.RightVectorProxy.Tuple, "1", { writable: !1 }),
  Object.defineProperty(Vector.RightVectorProxy.Tuple, "2", { writable: !1 }),
  Object.defineProperty(Vector.LeftVectorProxy.Tuple, "0", { writable: !1 }),
  Object.defineProperty(Vector.LeftVectorProxy.Tuple, "1", { writable: !1 }),
  Object.defineProperty(Vector.LeftVectorProxy.Tuple, "2", { writable: !1 }),
  Object.defineProperty(Vector.XAxisVectorProxy.Tuple, "0", { writable: !1 }),
  Object.defineProperty(Vector.XAxisVectorProxy.Tuple, "1", { writable: !1 }),
  Object.defineProperty(Vector.XAxisVectorProxy.Tuple, "2", { writable: !1 }),
  Object.defineProperty(Vector.YAxisVectorProxy.Tuple, "0", { writable: !1 }),
  Object.defineProperty(Vector.YAxisVectorProxy.Tuple, "1", { writable: !1 }),
  Object.defineProperty(Vector.YAxisVectorProxy.Tuple, "2", { writable: !1 }),
  Object.defineProperty(Vector.ZAxisVectorProxy.Tuple, "0", { writable: !1 }),
  Object.defineProperty(Vector.ZAxisVectorProxy.Tuple, "1", { writable: !1 }),
  Object.defineProperty(Vector.ZAxisVectorProxy.Tuple, "2", { writable: !1 });
//# sourceMappingURL=Vector.js.map
