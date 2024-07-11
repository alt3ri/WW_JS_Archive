"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BigJumpUnit = exports.DEFAULT_GRAVITY = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  CurveUtils_1 = require("../../../../../../Core/Utils/Curve/CurveUtils"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
exports.DEFAULT_GRAVITY = 1960;
class BigJumpUnit {
  constructor() {
    (this.qJo = -0),
      (this.GJo = -0),
      (this.dYi = Vector_1.Vector.Create()),
      (this.NJo = Vector_1.Vector.Create()),
      (this.fDe = Vector_1.Vector.Create()),
      (this.OJo = ""),
      (this.kJo = void 0),
      (this.FJo = -0),
      (this.VJo = Vector_1.Vector.Create()),
      (this.HJo = Vector_1.Vector.Create()),
      (this.Rotator = Rotator_1.Rotator.Create());
  }
  SetAll(t, i, s, h, e = "", r = exports.DEFAULT_GRAVITY, u = void 0) {
    (this.qJo = t),
      this.dYi.DeepCopy(i),
      this.NJo.DeepCopy(s),
      this.fDe.DeepCopy(h),
      this.OJo !== e &&
        ((this.OJo = e), (this.kJo = void 0), e) &&
        ResourceSystem_1.ResourceSystem.LoadAsync(
          e,
          UE.Object,
          (t) => {
            this.kJo = t;
          },
          104,
        ),
      (this.FJo = r),
      u && this.Rotator.DeepCopy(u);
  }
  SetStartPoint(t) {
    this.dYi.DeepCopy(t);
  }
  Init() {
    0 < this.FJo
      ? (this.fDe.Subtraction(this.dYi, BigJumpUnit.Lz),
        this.Rotator.Set(
          0,
          MathUtils_1.MathUtils.GetAngleByVector2D(BigJumpUnit.Lz),
          0,
        ),
        this.NJo.Subtraction(this.dYi, BigJumpUnit.Tz),
        (BigJumpUnit.Lz.Z = 0),
        (BigJumpUnit.Tz.Z = 0),
        BigJumpUnit.Lz.Normalize(),
        BigJumpUnit.Lz.MultiplyEqual(BigJumpUnit.Tz.DotProduct(BigJumpUnit.Lz)),
        BigJumpUnit.Lz.AdditionEqual(this.dYi),
        (this.NJo.X = BigJumpUnit.Lz.X),
        (this.NJo.Y = BigJumpUnit.Lz.Y),
        (this.GJo = Math.sqrt((2 * (this.NJo.Z - this.fDe.Z)) / this.FJo)),
        this.fDe.Subtraction(this.NJo, BigJumpUnit.Lz),
        (BigJumpUnit.Lz.Z = 0),
        BigJumpUnit.Lz.Division(this.GJo, this.HJo),
        this.NJo.Subtraction(this.dYi, BigJumpUnit.Lz),
        (BigJumpUnit.Lz.Z = 0),
        BigJumpUnit.Lz.DivisionEqual(this.qJo),
        BigJumpUnit.Lz.MultiplyEqual(2),
        BigJumpUnit.Lz.Subtraction(this.HJo, this.VJo))
      : (this.NJo.Subtraction(this.dYi, BigJumpUnit.Lz),
        (BigJumpUnit.Lz.Z = 0),
        BigJumpUnit.Lz.DivisionEqual(this.qJo),
        this.VJo.DeepCopy(BigJumpUnit.Lz),
        this.HJo.DeepCopy(this.VJo),
        (this.GJo = 0));
  }
  ToString() {
    return (
      `TimeLength: ${this.qJo} + ${this.GJo}, Points: ${this.dYi.ToString()}, ${this.NJo.ToString()}, ${this.fDe.ToString()}
  Gravity2: ${this.FJo}, Speeds: ${this.VJo.ToString()}, ` + this.HJo.ToString()
    );
  }
  get RisingTime() {
    return this.qJo;
  }
  get TimeLength() {
    return this.qJo + this.GJo;
  }
  GetLocation(t, i) {
    var s;
    t < this.qJo
      ? (Vector_1.Vector.Lerp(this.VJo, this.HJo, t / this.qJo, i),
        i.AdditionEqual(this.VJo),
        i.MultiplyEqual(t / 2),
        i.AdditionEqual(this.dYi),
        (s = this.kJo
          ? this.kJo.GetFloatValue(t / this.qJo)
          : CurveUtils_1.CurveUtils.DefaultPara.GetCurrentValue(t / this.qJo)),
        (i.Z = MathUtils_1.MathUtils.Lerp(this.dYi.Z, this.NJo.Z, s)))
      : ((s = t - this.qJo),
        this.HJo.Multiply(s, i),
        (i.Z = (-this.FJo * s * s) / 2),
        i.AdditionEqual(this.NJo));
  }
  GetOffset(t, i, s) {
    this.GetLocation(t, BigJumpUnit.Lz),
      this.GetLocation(t + i, s),
      s.SubtractionEqual(BigJumpUnit.Lz);
  }
  GetSpeed(t, i) {
    t < this.qJo
      ? (Vector_1.Vector.Lerp(this.VJo, this.HJo, t / this.qJo, i),
        i.AdditionEqual(this.VJo),
        i.MultiplyEqual(0.5))
      : (i.DeepCopy(this.HJo), (t = t - this.qJo), (i.Z = -this.FJo * t));
  }
}
((exports.BigJumpUnit = BigJumpUnit).Lz = Vector_1.Vector.Create()),
  (BigJumpUnit.Tz = Vector_1.Vector.Create());
//# sourceMappingURL=BigJumpUnit.js.map
