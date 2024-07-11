"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Vector2D = void 0);
const UE = require("ue");
const MathCommon_1 = require("./MathCommon");
const VECTOR2D_POOL_MAX_CAPACITY = 25;
class Vector2D {
  constructor(t, r) {
    (this._z = void 0), (this.Tuple = [t ?? 0, r ?? 0]);
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
  FromUeVector2D(t) {
    const r = this.Tuple;
    (r[0] = t.X), (r[1] = t.Y);
  }
  static Create(...t) {
    let r;
    const e = new Vector2D();
    return (
      t.length !== 0 &&
        (t.length === 1 && t[0]
          ? e.FromUeVector2D(t[0])
          : (void 0 !== t[0] && typeof t[0] !== "number") ||
            ((r = t[0]), (t = t[1]), e.Set(r, t))),
      e
    );
  }
  ToUeVector2D(t = !1) {
    let r = this.Tuple;
    return (
      (this._z = Vector2D.uz.pop()),
      void 0 === this._z && (this._z = new UE.Vector2D()),
      (this._z.X = r[0]),
      (this._z.Y = r[1]),
      t
        ? ((r = this._z), Vector2D.uz.push(this._z), (this._z = void 0), r)
        : this._z
    );
  }
  Addition(t, r) {
    const e = this.Tuple;
    const i = r.Tuple;
    return (
      typeof t === "number"
        ? ((i[0] = e[0] + t), (i[1] = e[1] + t))
        : ((t = t.Tuple), (i[0] = e[0] + t[0]), (i[1] = e[1] + t[1])),
      r
    );
  }
  AdditionEqual(t) {
    const r = this.Tuple;
    return (
      typeof t === "number"
        ? ((r[0] += t), (r[1] += t))
        : ((t = t.Tuple), (r[0] += t[0]), (r[1] += t[1])),
      this
    );
  }
  Subtraction(t, r) {
    const e = this.Tuple;
    const i = r.Tuple;
    return (
      typeof t === "number"
        ? ((i[0] = e[0] - t), (i[1] = e[1] - t))
        : ((t = t.Tuple), (i[0] = e[0] - t[0]), (i[1] = e[1] - t[1])),
      r
    );
  }
  SubtractionEqual(t) {
    const r = this.Tuple;
    return (
      typeof t === "number"
        ? ((r[0] -= t), (r[1] -= t))
        : ((t = t.Tuple), (r[0] -= t[0]), (r[1] -= t[1])),
      this
    );
  }
  Multiply(t, r) {
    const e = this.Tuple;
    const i = r.Tuple;
    return (
      typeof t === "number"
        ? ((i[0] = e[0] * t), (i[1] = e[1] * t))
        : ((t = t.Tuple), (i[0] = e[0] * t[0]), (i[1] = e[1] * t[1])),
      r
    );
  }
  MultiplyEqual(t) {
    const r = this.Tuple;
    return (
      typeof t === "number"
        ? ((r[0] *= t), (r[1] *= t))
        : ((t = t.Tuple), (r[0] *= t[0]), (r[1] *= t[1])),
      this
    );
  }
  Division(t, r) {
    let e;
    const i = this.Tuple;
    const h = r.Tuple;
    return (
      typeof t === "number"
        ? ((h[0] = i[0] * (e = 1 / t)), (h[1] = i[1] * e))
        : ((e = t.Tuple), (h[0] = i[0] / e[0]), (h[1] = i[1] / e[1])),
      r
    );
  }
  DivisionEqual(t) {
    let r;
    const e = this.Tuple;
    return (
      typeof t === "number"
        ? ((e[0] *= r = 1 / t), (e[1] *= r))
        : ((r = t.Tuple), (e[0] /= r[0]), (e[1] /= r[1])),
      this
    );
  }
  UnaryNegation(t) {
    const r = this.Tuple;
    var t = t.Tuple;
    (t[0] = -r[0]), (t[1] = -r[1]);
  }
  DotProduct(t) {
    const r = this.Tuple;
    var t = t.Tuple;
    return r[0] * t[0] + r[1] * t[1];
  }
  CrossProduct(t) {
    const r = this.Tuple;
    var t = t.Tuple;
    return r[0] * t[1] - r[1] * t[0];
  }
  Size() {
    return Math.sqrt(this.SizeSquared());
  }
  SizeSquared() {
    const t = this.Tuple;
    return t[0] * t[0] + t[1] * t[1];
  }
  IsNearlyZero(t = MathCommon_1.MathCommon.KindaSmallNumber) {
    const r = this.Tuple;
    return !(Math.abs(r[0]) > t || Math.abs(r[1]) > t);
  }
  Normalize(t = MathCommon_1.MathCommon.SmallNumber) {
    const r = this.SizeSquared();
    return t < r && ((t = 1 / Math.sqrt(r)), this.Multiply(t, this), !0);
  }
  GetSafeNormal(t, r = MathCommon_1.MathCommon.SmallNumber) {
    const e = this.SizeSquared();
    e === 1
      ? t.DeepCopy(this)
      : e < r
        ? t.Reset()
        : ((r = 1 / Math.sqrt(e)), this.Multiply(r, t));
  }
  DeepCopy(t) {
    this.Set(t.X, t.Y);
  }
  GetRotated(t, r) {
    const e = this.Tuple;
    var r = r.Tuple;
    var t = MathCommon_1.MathCommon.DegreeToRadian(t);
    const i = Math.sin(t);
    var t = Math.cos(t);
    (r[0] = t * e[0] - i * e[1]), (r[1] = i * e[0] + t * e[1]);
  }
  SphericalToUnitCartesian(t) {
    const r = this.Tuple;
    var t = t.Tuple;
    const e = Math.sin(r[0]);
    (t[0] = Math.cos(r[1]) * e),
      (t[1] = Math.sin(r[1]) * e),
      (t[2] = Math.cos(r[0]));
  }
  Equals(t, r = MathCommon_1.MathCommon.KindaSmallNumber) {
    const e = this.Tuple;
    var t = t.Tuple;
    return Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r;
  }
  GetMax() {
    const t = this.Tuple;
    return Math.max(t[0], t[1]);
  }
  GetAbsMax() {
    const t = this.Tuple;
    return Math.max(Math.abs(t[0]), Math.abs(t[1]));
  }
  GetMin() {
    const t = this.Tuple;
    return Math.min(t[0], t[1]);
  }
  GetAbsMin() {
    const t = this.Tuple;
    return Math.min(Math.abs(t[0]), Math.abs(t[1]));
  }
  ToDirectionAndLength(t) {
    let r;
    const e = this.Tuple;
    const i = t.Tuple;
    const h = this.Size();
    return (
      h > MathCommon_1.MathCommon.SmallNumber
        ? ((i[0] = e[0] * (r = 1 / h)), (i[1] = e[1] * r))
        : t.Reset(),
      h
    );
  }
  Set(t, r) {
    (this.Tuple[0] = t), (this.Tuple[1] = r), this._z && this.ToUeVector2D();
  }
  static Distance(t, r) {
    return Math.sqrt(this.DistSquared(t, r));
  }
  static DistSquared(t, r) {
    (t = t.Tuple), (r = r.Tuple);
    return Math.pow(r[0] - t[0], 2) + Math.pow(r[1] - t[1], 2);
  }
  Reset() {
    const t = this.Tuple;
    (t[0] = 0), (t[1] = 0), this._z && this.ToUeVector2D();
  }
  ContainsNaN() {
    const t = this.Tuple;
    return !isFinite(t[0]) || !isFinite(t[1]);
  }
}
((exports.Vector2D = Vector2D).uz = new Array(VECTOR2D_POOL_MAX_CAPACITY)),
  (Vector2D.ZeroVector = new UE.Vector2D(0, 0)),
  (Vector2D.UnitVector = new UE.Vector2D(1, 1)),
  (Vector2D.Unit45Deg = new UE.Vector2D(Math.SQRT1_2, Math.SQRT1_2));
// # sourceMappingURL=Vector2D.js.map
