"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Rotator = void 0);
const UE = require("ue");
const MathCommon_1 = require("./MathCommon");
const Quat_1 = require("./Quat");
class Rotator {
  constructor(t, o, a) {
    (this.iz = void 0),
      (this.oz = void 0),
      (this.Tuple = [t ?? 0, o ?? 0, a ?? 0]);
  }
  ToString() {
    return `(Pitch = ${this.Pitch}, Yaw = ${this.Yaw}, Roll = ${this.Roll})`;
  }
  get Pitch() {
    return this.Tuple[0];
  }
  set Pitch(t) {
    this.Tuple[0] = t;
  }
  get Yaw() {
    return this.Tuple[1];
  }
  set Yaw(t) {
    this.Tuple[1] = t;
  }
  get Roll() {
    return this.Tuple[2];
  }
  set Roll(t) {
    this.Tuple[2] = t;
  }
  Set(t, o, a) {
    const r = this.Tuple;
    (r[0] = t), (r[1] = o), (r[2] = a), this.oz && this.ToUeRotator();
  }
  FromUeRotator(t) {
    const o = this.Tuple;
    (o[0] = t.Pitch), (o[1] = t.Yaw), (o[2] = t.Roll);
  }
  DeepCopy(t) {
    this.Set(t.Pitch, t.Yaw, t.Roll);
  }
  static Create(...t) {
    let o;
    let a;
    const r = new Rotator();
    return (
      t.length === 1 && t[0]
        ? r.FromUeRotator(t[0])
        : (void 0 !== t[0] && typeof t[0] !== "number") ||
          ((o = t[0]), (a = t[1]), (t = t[2]), r.Set(o || 0, a || 0, t || 0)),
      r
    );
  }
  ToUeRotator() {
    const t = this.Tuple;
    return (
      void 0 === this.oz
        ? (this.oz = new UE.Rotator(t[0], t[1], t[2]))
        : ((this.oz.Pitch = t[0]), (this.oz.Yaw = t[1]), (this.oz.Roll = t[2])),
      this.oz
    );
  }
  static NormalizeAxis(t) {
    let o = this.ClampAxis(t);
    return (
      o > MathCommon_1.MathCommon.FlatAngle &&
        (o -= MathCommon_1.MathCommon.RoundAngle),
      o
    );
  }
  static ClampAxis(t) {
    let o = t % MathCommon_1.MathCommon.RoundAngle;
    return o < 0 && (o += MathCommon_1.MathCommon.RoundAngle), o;
  }
  Clamp(t) {
    const o = this.Tuple;
    const a = t.Tuple;
    return (
      (a[0] = Rotator.ClampAxis(o[0])),
      (a[1] = Rotator.ClampAxis(o[1])),
      (a[2] = Rotator.ClampAxis(o[2])),
      t
    );
  }
  Vector(t) {
    var o = this.Tuple;
    var t = t.Tuple;
    var a = MathCommon_1.MathCommon.WrapAngle(o[0]);
    var o = MathCommon_1.MathCommon.WrapAngle(o[1]);
    var a = MathCommon_1.MathCommon.DegreeToRadian(a);
    var o = MathCommon_1.MathCommon.DegreeToRadian(o);
    const r = Math.cos(a);
    var a = Math.sin(a);
    const h = Math.cos(o);
    var o = Math.sin(o);
    (t[0] = r * h), (t[1] = r * o), (t[2] = a);
  }
  Quaternion(t) {
    let o = t;
    o ||
      (void 0 === this.iz && (this.iz = Quat_1.Quat.Create()), (o = this.iz));
    var t = o.Tuple;
    var a = this.Tuple[0] % MathCommon_1.MathCommon.RoundAngle;
    var r = this.Tuple[1] % MathCommon_1.MathCommon.RoundAngle;
    var h = this.Tuple[2] % MathCommon_1.MathCommon.RoundAngle;
    var a = a * MathCommon_1.MathCommon.RadDividedBy2;
    var r = r * MathCommon_1.MathCommon.RadDividedBy2;
    var h = h * MathCommon_1.MathCommon.RadDividedBy2;
    const i = Math.sin(a);
    var a = Math.cos(a);
    const s = Math.sin(r);
    var r = Math.cos(r);
    const e = Math.sin(h);
    var h = Math.cos(h);
    const n = -h * i * r - e * a * s;
    const m = +h * a * s - e * i * r;
    const M = +h * a * r + e * i * s;
    return (
      (t[0] = +h * i * s - e * a * r), (t[1] = n), (t[2] = m), (t[3] = M), o
    );
  }
  IsNearlyZero() {
    const t = MathCommon_1.MathCommon.KindaSmallNumber;
    const o = this.Tuple;
    return !(
      Math.abs(Rotator.NormalizeAxis(o[1])) > t ||
      Math.abs(Rotator.NormalizeAxis(o[0])) > t ||
      Math.abs(Rotator.NormalizeAxis(o[2])) > t
    );
  }
  Equals(t, o = MathCommon_1.MathCommon.KindaSmallNumber) {
    const a = this.Tuple;
    var t = t.Tuple;
    return !(
      Math.abs(Rotator.NormalizeAxis(a[1] - t[1])) > o ||
      Math.abs(Rotator.NormalizeAxis(a[0] - t[0])) > o ||
      Math.abs(Rotator.NormalizeAxis(a[2] - t[2])) > o
    );
  }
  Equals2(t, o = MathCommon_1.MathCommon.KindaSmallNumber) {
    const a = this.Tuple;
    return !(
      Math.abs(Rotator.NormalizeAxis(a[1] - t.Yaw)) > o ||
      Math.abs(Rotator.NormalizeAxis(a[0] - t.Pitch)) > o ||
      Math.abs(Rotator.NormalizeAxis(a[2] - t.Roll)) > o
    );
  }
  AdditionEqual(t) {
    const o = this.Tuple;
    return (o[0] += t.Pitch), (o[1] += t.Yaw), (o[2] += t.Roll), this;
  }
  SubtractionEqual(t) {
    const o = this.Tuple;
    return (o[0] -= t.Pitch), (o[1] -= t.Yaw), (o[2] -= t.Roll), this;
  }
  MultiplyEqual(t) {
    const o = this.Tuple;
    return (o[0] *= t), (o[1] *= t), (o[2] *= t), this;
  }
  UnaryNegation(t) {
    const o = this.Tuple;
    var t = t.Tuple;
    (t[0] = -o[0]), (t[1] = -o[1]), (t[2] = -o[2]);
  }
  Reset() {
    (this.Pitch = 0),
      (this.Yaw = 0),
      (this.Roll = 0),
      this.oz && this.ToUeRotator();
  }
  static UeRotatorCopy(t, o) {
    (o.Pitch = t.Pitch), (o.Yaw = t.Yaw), (o.Roll = t.Roll);
  }
  static Lerp(t, o, a, r) {
    const h = r.Tuple;
    var o = o.Tuple;
    var t = t.Tuple;
    (h[0] = o[0] - t[0]),
      (h[1] = o[1] - t[1]),
      (h[2] = o[2] - t[2]),
      MathCommon_1.MathCommon.VectorNormalizeRotator(r),
      (h[0] = h[0] * a),
      (h[1] = h[1] * a),
      (h[2] = h[2] * a),
      (h[0] += t[0]),
      (h[1] += t[1]),
      (h[2] += t[2]),
      MathCommon_1.MathCommon.VectorNormalizeRotator(r);
  }
}
((exports.Rotator = Rotator).ZeroRotatorProxy = Rotator.Create(0, 0, 0)),
  (Rotator.ZeroRotator = Rotator.ZeroRotatorProxy.ToUeRotator()),
  Object.defineProperty(Rotator.ZeroRotatorProxy.Tuple, "0", { writable: !1 }),
  Object.defineProperty(Rotator.ZeroRotatorProxy.Tuple, "1", { writable: !1 }),
  Object.defineProperty(Rotator.ZeroRotatorProxy.Tuple, "2", { writable: !1 });
// # sourceMappingURL=Rotator.js.map
