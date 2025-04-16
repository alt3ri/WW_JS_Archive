"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpaceUtils = void 0);
const Log_1 = require("../Common/Log"),
  Quat_1 = require("./Math/Quat"),
  Vector_1 = require("./Math/Vector"),
  MathUtils_1 = require("./MathUtils"),
  boundPoints = [
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
  static Ez(t) {
    this.Mz.push(...t), (t.length = 0);
  }
  static IsComponentInRingArea(t, i, s, h = void 0) {
    var e = s.D_GetComponentBounds(),
      r =
        (this.Sz.FromUeVector(e.Origin),
        this.yz.FromUeVector(e.BoxExtent),
        i.X * i.X);
    if (r < this.yz.X * this.yz.X || r < this.yz.Y * this.yz.Y)
      return (
        (this.Sz.Z = 0),
        (this.yz.Z = 0),
        this.q9s.Set(t.X, t.Y, 0),
        this.G9s(this.Sz, this.yz, this.q9s, i.X)
      );
    this.Iz.FromUeQuat(s.K2_GetComponentQuaternion()),
      this.Sz.Subtraction(t, this.Tz);
    var o,
      a,
      c = i.Z,
      n = i.Y * i.Y;
    let _ = 0,
      u = 0;
    for (const l of boundPoints)
      if (
        (this.yz.Multiply(l, this.Lz),
        this.Iz.RotateVector(this.Lz, this.Lz),
        this.Lz.AdditionEqual(this.Tz),
        h
          ? ((o = this.Lz.DotProduct(h)),
            3 !== u && (c < o ? (u |= 1) : c < -o ? (u |= 2) : (u = 3)))
          : 3 !== u &&
            (this.Lz.Z > c ? (u |= 1) : -this.Lz.Z > c ? (u |= 2) : (u = 3)),
        h
          ? (Vector_1.Vector.VectorPlaneProject(this.Lz, h, this.fHo),
            (o = this.fHo.SizeSquared()),
            3 !== _ && (r < o ? (_ |= 1) : o < n ? (_ |= 2) : (_ = 3)))
          : ((a = this.Lz.SizeSquared2D()),
            3 !== _ && (r < a ? (_ |= 1) : a < n ? (_ |= 2) : (_ = 3))),
        3 === u && 3 === _)
      )
        return !0;
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          20,
          "无法命中",
          ["inHeight", u],
          ["inDist", _],
        ),
      !1
    );
  }
  static G9s(t, i, s, h) {
    s.Subtraction(t, this.O9s),
      this.O9s.X < 0 && (this.O9s.X = -this.O9s.X),
      this.O9s.Y < 0 && (this.O9s.Y = -this.O9s.Y),
      this.O9s.SubtractionEqual(i);
    let e = !1;
    if ((this.O9s.X < 0 && ((this.O9s.X = 0), (e = !0)), this.O9s.Y < 0)) {
      if (e) return !0;
      this.O9s.Y = 0;
    }
    return this.O9s.DotProduct(this.O9s) <= h * h;
  }
  static UAc(t) {
    return this.yz.X > t || this.yz.Y > t;
  }
  static IsComponentInSectorArea(t, i, s, h) {
    var e = h.D_GetComponentBounds();
    if ((this.yz.FromUeVector(e.BoxExtent), this.UAc(i.X))) return !0;
    this.Sz.FromUeVector(e.Origin),
      this.Iz.FromUeQuat(h.K2_GetComponentQuaternion()),
      this.Sz.Subtraction(t, this.Tz),
      s.Inverse(this.Dz);
    var r = i.X * i.X,
      o = MathUtils_1.MathUtils.DegToRad * i.Y * 0.5,
      a = o < 0.5 * Math.PI,
      c = i.Z;
    let n = 0,
      _ = 0,
      u = 0;
    for (const V of boundPoints) {
      this.yz.Multiply(V, this.Lz),
        this.Iz.RotateVector(this.Lz, this.Lz),
        this.Lz.AdditionEqual(this.Tz),
        this.Dz.RotateVector(this.Lz, this.Lz),
        3 !== _ &&
          (this.Lz.Z > c ? (_ |= 1) : -this.Lz.Z > c ? (_ |= 2) : (_ = 3));
      var l,
        p = this.Lz.SizeSquared2D(),
        p = (3 !== n && p <= r && (n = 3), Math.atan2(this.Lz.Y, this.Lz.X));
      if (
        (3 !== u &&
          (a
            ? o < p
              ? ((l = this.vz()).DeepCopy(this.Lz), this.Rz.push(l))
              : o < -p
                ? ((l = this.vz()).DeepCopy(this.Lz), this.Uz.push(l))
                : (u = 3)
            : Math.abs(p) <= o && (u = 3)),
        3 === _ && 3 === n && 3 === u)
      )
        return a && (this.Ez(this.Uz), this.Ez(this.Rz)), !0;
    }
    if (a) {
      if (3 === _ && 3 === n && this.Az())
        return this.Ez(this.Uz), this.Ez(this.Rz), !0;
      this.Ez(this.Uz), this.Ez(this.Rz);
    }
    return !1;
  }
  static Az() {
    for (const t of this.Uz)
      for (const i of this.Rz)
        if (
          !(Math.abs(i.Y - t.Y) < MathUtils_1.MathUtils.SmallNumber) &&
          0 <= i.X - ((i.X - t.X) / (i.Y - t.Y)) * i.Y
        )
          return !0;
    return !1;
  }
  static IsLocationInSideBullet(t, i) {
    var s = Vector_1.Vector.DistSquared(t.GetCollisionLocation(), i),
      i = t.BulletDataMain.Base,
      h = i.Size;
    switch (i.Shape) {
      case 0:
        return s < h.X * h.X && s < h.Y * h.Y && s < h.Z * h.Z ? !0 : !1;
      case 1:
        return s < h.X * h.X ? !0 : !1;
      case 3:
        return s < h.Y * h.Y ? !0 : !1;
      default:
        return !1;
    }
  }
}
((exports.SpaceUtils = SpaceUtils).Sz = Vector_1.Vector.Create()),
  (SpaceUtils.yz = Vector_1.Vector.Create()),
  (SpaceUtils.Iz = Quat_1.Quat.Create()),
  (SpaceUtils.Lz = Vector_1.Vector.Create()),
  (SpaceUtils.Tz = Vector_1.Vector.Create()),
  (SpaceUtils.fHo = Vector_1.Vector.Create()),
  (SpaceUtils.Dz = Quat_1.Quat.Create()),
  (SpaceUtils.Mz = new Array()),
  (SpaceUtils.Uz = new Array()),
  (SpaceUtils.Rz = new Array()),
  (SpaceUtils.q9s = Vector_1.Vector.Create()),
  (SpaceUtils.O9s = Vector_1.Vector.Create());
//# sourceMappingURL=SpaceUtils.js.map
