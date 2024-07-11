"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpaceUtils = void 0);
const Quat_1 = require("./Math/Quat");
const Vector_1 = require("./Math/Vector");
const MathUtils_1 = require("./MathUtils");
const boundPoints = [
  Vector_1.Vector.Create(1, 1, 1),
  Vector_1.Vector.Create(1, 1, -1),
  Vector_1.Vector.Create(1, -1, 1),
  Vector_1.Vector.Create(1, -1, -1),
  Vector_1.Vector.Create(-1, 1, 1),
  Vector_1.Vector.Create(-1, 1, -1),
  Vector_1.Vector.Create(-1, -1, 1),
  Vector_1.Vector.Create(-1, -1, -1),
];
class SpaceUtils {
  static vz() {
    return this.Mz.length ? this.Mz.pop() : Vector_1.Vector.Create();
  }
  static Sz(t) {
    this.Mz.push(...t), (t.length = 0);
  }
  static IsComponentInRingArea(t, s, i) {
    const h = i.Bounds;
    const e =
      (this.Ez.FromUeVector(h.Origin),
      this.yz.FromUeVector(h.BoxExtent),
      s.X * s.X);
    if (e < this.yz.X * this.yz.X || e < this.yz.Y * this.yz.Y)
      return (
        (this.Ez.Z = 0),
        (this.yz.Z = 0),
        this.y4s.Set(t.X, t.Y, 0),
        this.I4s(this.Ez, this.yz, this.y4s, s.X)
      );
    this.Iz.FromUeQuat(i.K2_GetComponentQuaternion()),
      this.Ez.Subtraction(t, this.Tz);
    const r = s.Z;
    const a = s.Y * s.Y;
    let o = 0;
    let c = 0;
    for (const _ of boundPoints) {
      this.yz.Multiply(_, this.Lz),
        this.Iz.RotateVector(this.Lz, this.Lz),
        this.Lz.AdditionEqual(this.Tz),
        c !== 3 &&
          (this.Lz.Z > r ? (c |= 1) : -this.Lz.Z > r ? (c |= 2) : (c = 3));
      const n = this.Lz.SizeSquared2D();
      if (
        (o !== 3 && (e < n ? (o |= 1) : n < a ? (o |= 2) : (o = 3)),
        c === 3 && o === 3)
      )
        return !0;
    }
    return !1;
  }
  static I4s(t, s, i, h) {
    i.Subtraction(t, this.T4s),
      this.T4s.X < 0 && (this.T4s.X = -this.T4s.X),
      this.T4s.Y < 0 && (this.T4s.Y = -this.T4s.Y),
      this.T4s.SubtractionEqual(s);
    let e = !1;
    if ((this.T4s.X < 0 && ((this.T4s.X = 0), (e = !0)), this.T4s.Y < 0)) {
      if (e) return !0;
      this.T4s.Y = 0;
    }
    return this.T4s.DotProduct(this.T4s) <= h * h;
  }
  static IsComponentInSectorArea(t, s, i, h) {
    const e = h.Bounds;
    const r =
      (this.Ez.FromUeVector(e.Origin),
      this.yz.FromUeVector(e.BoxExtent),
      this.Iz.FromUeQuat(h.K2_GetComponentQuaternion()),
      this.Ez.Subtraction(t, this.Tz),
      i.Inverse(this.Dz),
      s.X * s.X);
    const a = MathUtils_1.MathUtils.DegToRad * s.Y * 0.5;
    const o = a < 0.5 * Math.PI;
    const c = s.Z;
    let n = 0;
    let _ = 0;
    let u = 0;
    for (const V of boundPoints) {
      this.yz.Multiply(V, this.Lz),
        this.Iz.RotateVector(this.Lz, this.Lz),
        this.Lz.AdditionEqual(this.Tz),
        this.Dz.RotateVector(this.Lz, this.Lz),
        _ !== 3 &&
          (this.Lz.Z > c ? (_ |= 1) : -this.Lz.Z > c ? (_ |= 2) : (_ = 3));
      var l;
      var p = this.Lz.SizeSquared2D();
      var p = (n !== 3 && p <= r && (n = 3), Math.atan2(this.Lz.Y, this.Lz.X));
      if (
        (u !== 3 &&
          (o
            ? a < p
              ? ((l = this.vz()).DeepCopy(this.Lz), this.Rz.push(l))
              : a < -p
                ? ((l = this.vz()).DeepCopy(this.Lz), this.Uz.push(l))
                : (u = 3)
            : Math.abs(p) <= a && (u = 3)),
        _ === 3 && n === 3 && u === 3)
      )
        return o && (this.Sz(this.Uz), this.Sz(this.Rz)), !0;
    }
    if (o) {
      if (_ === 3 && n === 3 && this.Az())
        return this.Sz(this.Uz), this.Sz(this.Rz), !0;
      this.Sz(this.Uz), this.Sz(this.Rz);
    }
    return !1;
  }
  static Az() {
    for (const t of this.Uz)
      for (const s of this.Rz)
        if (
          !(Math.abs(s.Y - t.Y) < MathUtils_1.MathUtils.SmallNumber) &&
          s.X - ((s.X - t.X) / (s.Y - t.Y)) * s.Y >= 0
        )
          return !0;
    return !1;
  }
  static IsLocationInSideBullet(t, s) {
    const i = Vector_1.Vector.DistSquared(t.CollisionLocation, s);
    var s = t.BulletDataMain.Base;
    const h = s.Size;
    switch (s.Shape) {
      case 0:
        return i < h.X * h.X && i < h.Y * h.Y && i < h.Z * h.Z ? !0 : !1;
      case 1:
        return i < h.X * h.X ? !0 : !1;
      case 3:
        return i < h.Y * h.Y ? !0 : !1;
      default:
        return !1;
    }
  }
}
((exports.SpaceUtils = SpaceUtils).Ez = Vector_1.Vector.Create()),
  (SpaceUtils.yz = Vector_1.Vector.Create()),
  (SpaceUtils.Iz = Quat_1.Quat.Create()),
  (SpaceUtils.Lz = Vector_1.Vector.Create()),
  (SpaceUtils.Tz = Vector_1.Vector.Create()),
  (SpaceUtils.Dz = Quat_1.Quat.Create()),
  (SpaceUtils.Mz = new Array()),
  (SpaceUtils.Uz = new Array()),
  (SpaceUtils.Rz = new Array()),
  (SpaceUtils.y4s = Vector_1.Vector.Create()),
  (SpaceUtils.T4s = Vector_1.Vector.Create());
// # sourceMappingURL=SpaceUtils.js.map
