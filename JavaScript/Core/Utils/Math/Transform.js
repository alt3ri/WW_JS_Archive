"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Transform = void 0);
const UE = require("ue"),
  Quat_1 = require("./Quat"),
  Rotator_1 = require("./Rotator"),
  Vector_1 = require("./Vector");
class Transform {
  constructor() {
    (this.rz = void 0),
      (this.mC = void 0),
      (this.nz = void 0),
      (this.sz = void 0),
      (this.Yvl = void 0);
  }
  static Create(...t) {
    var s,
      i = new Transform();
    return (
      1 === t.length
        ? t[0] instanceof UE.Transform
          ? ((s = t[0]),
            (i.mC = Quat_1.Quat.Create(s.GetRotation())),
            (i.rz = Vector_1.Vector.Create(s.GetTranslation())),
            (i.nz = Vector_1.Vector.Create(s.GetScale3D())))
          : t[0] instanceof UE.TransformDouble &&
            ((s = t[0]),
            (i.mC = Quat_1.Quat.Create(s.GetRotation())),
            (i.rz = Vector_1.Vector.Create(s.GetTranslation())),
            (i.nz = Vector_1.Vector.Create(s.GetScale3D())))
        : 0 === t.length
          ? ((i.mC = Quat_1.Quat.Create()),
            (i.rz = Vector_1.Vector.Create()),
            (i.nz = Vector_1.Vector.Create(1, 1, 1)))
          : ((i.mC = Quat_1.Quat.Create(t[0])),
            (i.rz = Vector_1.Vector.Create(t[1])),
            (i.nz = Vector_1.Vector.Create(t[2]))),
      i
    );
  }
  FromUeTransform(t) {
    this.mC.FromUeQuat(t.GetRotation()),
      this.rz.FromUeVector(t.GetTranslation()),
      this.nz.FromUeVector(t.GetScale3D());
  }
  ToUeTransformOld() {
    return (
      void 0 === this.sz
        ? (this.sz = new UE.Transform(
            this.mC.ToUeQuat(),
            this.rz.ToUeVectorOld(),
            this.nz.ToUeVectorOld(),
          ))
        : (this.sz.SetRotation(this.mC.ToUeQuat()),
          this.sz.SetTranslation(this.rz.ToUeVectorOld()),
          this.sz.SetScale3D(this.nz.ToUeVectorOld())),
      this.sz
    );
  }
  ToUeTransform() {
    return (
      void 0 === this.Yvl
        ? (this.Yvl = new UE.TransformDouble(
            this.mC.ToUeQuat(),
            this.rz.ToUeVector(),
            this.nz.ToUeVector(),
          ))
        : (this.Yvl.SetRotation(this.mC.ToUeQuat()),
          this.Yvl.SetTranslation(this.rz.ToUeVector()),
          this.Yvl.SetScale3D(this.nz.ToUeVector())),
      this.Yvl
    );
  }
  Set(t, s, i) {
    this.rz.Set(t.X, t.Y, t.Z),
      this.mC.Set(s.X, s.Y, s.Z, s.W),
      this.nz.Set(i.X, i.Y, i.Z);
  }
  SetLocation(t) {
    this.rz.Set(t.X, t.Y, t.Z);
  }
  GetLocation() {
    return this.rz;
  }
  SetRotation(t) {
    this.mC.Set(t.X, t.Y, t.Z, t.W);
  }
  GetRotation() {
    return this.mC;
  }
  SetScale3D(t) {
    this.nz.Set(t.X, t.Y, t.Z);
  }
  GetScale3D() {
    return this.nz;
  }
  TransformPosition(t, s) {
    this.nz.Multiply(t, s), this.mC.RotateVector(s, s), this.rz.Addition(s, s);
  }
  TransformVector(t, s) {
    this.nz.Multiply(t, s), this.mC.RotateVector(s, s);
  }
  TransformPositionNoScale(t, s) {
    this.mC.RotateVector(t, s), this.rz.Addition(s, s);
  }
  InverseTransformPosition(t, s) {
    t.Subtraction(this.rz, s),
      this.mC.Inverse(Transform.az),
      Transform.az.RotateVector(s, s),
      this.nz.Reciprocal(Transform.wXs),
      Transform.wXs.Multiply(s, s);
  }
  InverseTransformPositionNoScale(t, s) {
    t.Subtraction(this.rz, s),
      this.mC.Inverse(Transform.az),
      Transform.az.RotateVector(s, s);
  }
  TransformRotation(t, s) {
    var i = this.mC,
      t = t.Quaternion();
    s instanceof Rotator_1.Rotator
      ? (i.Multiply(t, Transform.az), s.FromUeRotator(Transform.az.Rotator()))
      : s instanceof Quat_1.Quat && i.Multiply(t, s);
  }
  ComposeTransforms(t, s) {
    this.rz.Multiply(t.nz, s.rz),
      t.mC.RotateVector(s.rz, s.rz),
      t.rz.Addition(s.rz, s.rz),
      this.nz.Multiply(t.nz, s.nz),
      t.mC.Multiply(this.mC, s.mC);
  }
  Reset() {
    this.rz.Reset(),
      this.nz.Reset(),
      this.mC.Reset(),
      this.sz && this.ToUeTransformOld(),
      this.Yvl && this.ToUeTransform();
  }
}
((exports.Transform = Transform).wXs = Vector_1.Vector.Create()),
  (Transform.az = Quat_1.Quat.Create());
//# sourceMappingURL=Transform.js.map
