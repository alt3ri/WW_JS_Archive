"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SplineCurve =
    exports.InterpCurvePointNumber =
    exports.InterpCurvePointQuat =
    exports.InterpCurvePointVector =
      void 0);
const UE = require("ue"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  Log_1 = require("../../Common/Log"),
  Quat_1 = require("../Math/Quat"),
  Rotator_1 = require("../Math/Rotator"),
  Transform_1 = require("../Math/Transform"),
  Vector_1 = require("../Math/Vector"),
  MathUtils_1 = require("../MathUtils"),
  LegendreGaussCoefficients = [
    [0, 0.5688889],
    [-0.5384693, 0.47862867],
    [0.5384693, 0.47862867],
    [-0.90617985, 0.23692688],
    [0.90617985, 0.23692688],
  ],
  REPARAM_STEPS = 10,
  SAMPLE_ANGLE_LIMIT = 15,
  SAMPLE_STEP_DIST = 50;
function getTsInterpCurveMode(e) {
  return e;
}
function fromConfigCurveMode(e) {
  switch (e) {
    case IComponent_1.ESplineLine.Linear:
      return 0;
    case IComponent_1.ESplineLine.Curve:
      return 1;
    case IComponent_1.ESplineLine.Constant:
      return 2;
    case IComponent_1.ESplineLine.CurveCustomTangent:
      return 3;
    default:
      return 6;
  }
}
function splinePointTypeToCurveMode(e) {
  switch (e) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 5;
    case 4:
      return 3;
    default:
      return 6;
  }
}
class InterpCurvePointVector {
  constructor(e) {
    (this.InVal = 0),
      (this.OutVal = Vector_1.Vector.Create()),
      (this.ArriveTangent = Vector_1.Vector.Create()),
      (this.LeaveTangent = Vector_1.Vector.Create()),
      (this.InterpMode = 0),
      (this.InterpMode = getTsInterpCurveMode(e));
  }
  DeepCopy(e) {
    (this.InVal = e.InVal),
      this.OutVal.DeepCopy(e.OutVal),
      this.ArriveTangent.DeepCopy(e.ArriveTangent),
      this.LeaveTangent.DeepCopy(e.LeaveTangent),
      (this.InterpMode = getTsInterpCurveMode(e.InterpMode));
  }
  Clear() {
    (this.InVal = 0),
      this.ArriveTangent.Reset(),
      this.LeaveTangent.Reset(),
      this.OutVal.Reset();
  }
}
exports.InterpCurvePointVector = InterpCurvePointVector;
class InterpCurvePointQuat {
  constructor(e) {
    (this.InVal = 0),
      (this.OutVal = Quat_1.Quat.Create()),
      (this.ArriveTangent = Quat_1.Quat.Create()),
      (this.LeaveTangent = Quat_1.Quat.Create()),
      (this.InterpMode = 1),
      (this.InterpMode = getTsInterpCurveMode(e));
  }
  DeepCopy(e) {
    (this.InVal = e.InVal),
      this.OutVal.DeepCopy(e.OutVal),
      this.ArriveTangent.DeepCopy(e.ArriveTangent),
      this.LeaveTangent.DeepCopy(e.LeaveTangent),
      (this.InterpMode = getTsInterpCurveMode(e.InterpMode));
  }
  Clear() {
    (this.InVal = 0),
      this.ArriveTangent.Reset(),
      this.LeaveTangent.Reset(),
      this.OutVal.Reset();
  }
}
exports.InterpCurvePointQuat = InterpCurvePointQuat;
class InterpCurvePointNumber {
  constructor(e) {
    (this.InVal = 0),
      (this.OutVal = 0),
      (this.ArriveTangent = 0),
      (this.LeaveTangent = 0),
      (this.InterpMode = 0),
      (this.InterpMode = getTsInterpCurveMode(e));
  }
  DeepCopy(e) {
    (this.InVal = e.InVal),
      (this.OutVal = e.OutVal),
      (this.ArriveTangent = e.ArriveTangent),
      (this.LeaveTangent = e.LeaveTangent),
      (this.InterpMode = getTsInterpCurveMode(e.InterpMode));
  }
  Clear() {
    (this.InVal = 0),
      (this.ArriveTangent = 0),
      (this.LeaveTangent = 0),
      (this.OutVal = 0);
  }
}
exports.InterpCurvePointNumber = InterpCurvePointNumber;
class SplineCurve {
  constructor(e = REPARAM_STEPS) {
    (this.yXs = 0),
      (this.SplineTransform = Transform_1.Transform.Create()),
      (this.gih = []),
      (this.vXs = []),
      (this.MXs = []),
      (this.SXs = void 0),
      (this.EXs = void 0),
      (this.j6c = Vector_1.Vector.Create(0, 0, 1)),
      (this.yXs = e),
      this.SplineTransform.Set(
        Vector_1.Vector.ZeroVectorProxy,
        Quat_1.Quat.IdentityProxy,
        Vector_1.Vector.OneVectorProxy,
      );
  }
  InitPoints(t) {
    this.SplineTransform.Set(
      Vector_1.Vector.ZeroVectorProxy,
      Quat_1.Quat.IdentityProxy,
      Vector_1.Vector.OneVectorProxy,
    );
    for (let e = (this.vXs.length = 0); e < t.length; e++) {
      var i = t[e];
      i instanceof InterpCurvePointVector
        ? ((this.vXs[e] = new InterpCurvePointVector(i.InterpMode)),
          this.vXs[e].OutVal.FromConfigVector(i.OutVal))
        : ((this.vXs[e] = new InterpCurvePointVector(
            fromConfigCurveMode(i.LineType),
          )),
          this.vXs[e].OutVal.FromConfigVector(i.Position)),
        (this.vXs[e].InVal = e),
        this.vXs[e].ArriveTangent.FromConfigVector(i.ArriveTangent),
        this.vXs[e].LeaveTangent.FromConfigVector(i.LeaveTangent);
    }
    this.UpdateSplineCurves(), (this.SXs = void 0), (this.EXs = void 0);
  }
  Init(t, i, r, n) {
    if (
      (this.SplineTransform.Set(
        Vector_1.Vector.ZeroVectorProxy,
        Quat_1.Quat.IdentityProxy,
        Vector_1.Vector.OneVectorProxy,
      ),
      t instanceof UE.InterpCurveVector)
    ) {
      for (let e = this.vXs.length; e < t.Points.Num(); e++)
        this.vXs[e] = new InterpCurvePointVector(3);
      for (let e = 0; e < t.Points.Num(); e++)
        this.vXs[e].DeepCopy(t.Points.Get(e));
    } else {
      for (let e = this.vXs.length; e < t.Num(); e++)
        this.vXs[e] = new InterpCurvePointVector(3);
      for (let e = t.Num(); e < this.vXs.length; e++) this.vXs.pop();
      for (let e = 0; e < t.Num(); e++) {
        var s = t.Get(e);
        (this.vXs[e].InVal = s.InputKey),
          this.vXs[e].ArriveTangent.DeepCopy(s.ArriveTangent),
          this.vXs[e].LeaveTangent.DeepCopy(s.LeaveTangent),
          this.vXs[e].OutVal.DeepCopy(s.Position),
          (this.vXs[e].InterpMode = splinePointTypeToCurveMode(s.Type));
      }
    }
    if (i) {
      for (let e = this.MXs.length; e < i.Num(); e++)
        this.MXs[e] = new InterpCurvePointNumber(0);
      for (let e = i.Num(); e < this.MXs.length; e++) this.MXs.pop();
      for (let e = 0; e < i.Num(); e++) this.MXs[e].DeepCopy(i.Get(e));
    } else this.UpdateSplineCurves();
    if (r) {
      this.SXs || (this.SXs = []);
      for (let e = this.SXs.length; e < r.Points.Num(); e++)
        this.SXs[e] = new InterpCurvePointQuat(1);
      for (let e = r.Points.Num(); e < this.SXs.length; e++) this.MXs.pop();
      for (let e = 0; e < r.Points.Num(); e++)
        this.SXs[e].DeepCopy(r.Points.Get(e));
    } else this.SXs = void 0;
    if (n) {
      this.EXs || (this.EXs = []);
      for (let e = this.EXs.length; e < n.Points.Num(); e++)
        this.EXs[e] = new InterpCurvePointVector(1);
      for (let e = n.Points.Num(); e < this.EXs.length; e++) this.MXs.pop();
      for (let e = 0; e < n.Points.Num(); e++)
        this.EXs[e].DeepCopy(n.Points.Get(e));
    } else this.EXs = void 0;
  }
  GetPointsWithSampling() {
    var r = [];
    for (let e = 0, i = this.GetSplinePointsNum(); e < i; e++) {
      var n = new InterpCurvePointVector(3);
      n.DeepCopy(this.vXs[e]),
        (n.InVal = r.length),
        r.push(n),
        this.GetDirectionAtSplinePoint(e, 0, SplineCurve.jye);
      let t = SplineCurve.jye;
      if (e < i - 1) {
        var n = this.GetDistanceAlongSplineAtSplinePoint(e),
          s = this.GetDistanceAlongSplineAtSplinePoint(e + 1);
        for (let e = n + SAMPLE_STEP_DIST; e < s; e += SAMPLE_STEP_DIST) {
          this.GetDirectionAtDistanceAlongSpline(e, 0, SplineCurve.RTe);
          var u = SplineCurve.RTe;
          MathUtils_1.MathUtils.GetAngleByVectorDot(t, u) <
            SAMPLE_ANGLE_LIMIT ||
            ((t = u),
            (u = new InterpCurvePointVector(3)),
            this.GetLocationAtDistanceAlongSpline(e, 0, SplineCurve.sqn),
            (u.InVal = r.length),
            u.ArriveTangent.DeepCopy(SplineCurve.RTe),
            u.LeaveTangent.DeepCopy(SplineCurve.RTe),
            u.OutVal.DeepCopy(SplineCurve.sqn),
            r.push(u));
        }
      }
    }
    return r;
  }
  GetSplinePointsNum() {
    return this.Position.length;
  }
  SetSplineTransform(e, t) {
    var i;
    e instanceof Transform_1.Transform
      ? this.SplineTransform.Set(
          e.GetLocation(),
          e.GetRotation(),
          e.GetScale3D(),
        )
      : ((i = Vector_1.Vector.Create(e.Pos.X ?? 0, e.Pos.Y ?? 0, e.Pos.Z ?? 0)),
        this.SplineTransform.SetLocation(i),
        (i = Rotator_1.Rotator.Create(
          e.Rot?.Y ?? 0,
          e.Rot?.Z ?? 0,
          e.Rot?.X ?? 0,
        )),
        this.SplineTransform.SetRotation(i.Quaternion()),
        (i = Vector_1.Vector.Create(
          e.Scale?.X ?? 1,
          e.Scale?.Y ?? 1,
          e.Scale?.Z ?? 1,
        )),
        this.SplineTransform.SetScale3D(i)),
      t && this.UpdateSplineCurves();
  }
  SetReferenceUp(e) {
    e.Normalize(), this.j6c.DeepCopy(e);
  }
  get Position() {
    return this.vXs;
  }
  get Rotation() {
    return this.SXs;
  }
  get Scale() {
    return this.EXs;
  }
  get ReparamTable() {
    return this.MXs;
  }
  get WorldPositionList() {
    if (!(0 < this.gih.length)) {
      this.gih = [];
      for (let e = 0; e < this.GetSplinePointsNum(); e++) {
        var t = Vector_1.Vector.Create();
        this.GetWorldLocationAtSplinePoint(e, t), this.gih.push(t);
      }
    }
    return this.gih;
  }
  UpdateSplineCurves(e = 0) {
    var t = this.Position.length,
      i = t - 1;
    for (let e = this.ReparamTable.length; e < i * this.yXs + 1; e++)
      this.ReparamTable.push(new InterpCurvePointNumber(0));
    for (let e = 1; e < t; e++)
      if (this.Position[e - 1].InVal >= this.Position[e].InVal)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              42,
              "TsAnimNotifyStateCurveMove曲线初始化异常,Position.Points的InVal非严格递增",
            ),
          !1
        );
    let r = -0,
      n = 0;
    0 < e && ((n = e * this.yXs), (r += this.ReparamTable[n].InVal));
    for (let t = e; t < i; t++) {
      for (let e = 0; e < this.yXs; e++) {
        var s = e / this.yXs,
          u = 0 === e ? 0 : this.IXs(t, s);
        const o = this.ReparamTable[n];
        (o.InVal = u + r), (o.OutVal = t + s), n++;
      }
      r += this.IXs(t, 1);
    }
    const o = this.ReparamTable[n];
    return (o.InVal = r), (o.OutVal = i), !0;
  }
  IXs(e, t) {
    var i = this.Position.length,
      r = this.Position[e],
      i = this.Position[e === i - 1 ? 0 : e + 1],
      e = r.OutVal,
      n = r.LeaveTangent,
      s = i.OutVal,
      i = i.ArriveTangent;
    if (0 === r.InterpMode)
      return (
        SplineCurve.jye.DeepCopy(e),
        SplineCurve.fHo.DeepCopy(s),
        SplineCurve.fHo.Subtraction(SplineCurve.jye, SplineCurve.jye),
        SplineCurve.jye.Size() * t
      );
    if (2 === r.InterpMode) return 0;
    SplineCurve.jye.DeepCopy(e),
      SplineCurve.fHo.DeepCopy(s),
      SplineCurve.pHo.DeepCopy(n),
      SplineCurve.vHo.DeepCopy(i),
      SplineCurve.jye.Subtraction(SplineCurve.fHo, SplineCurve.CXs),
      SplineCurve.CXs.MultiplyEqual(2),
      SplineCurve.CXs.AdditionEqual(SplineCurve.pHo),
      SplineCurve.CXs.AdditionEqual(SplineCurve.vHo),
      SplineCurve.CXs.MultiplyEqual(3),
      SplineCurve.Lz.DeepCopy(n),
      SplineCurve.Lz.MultiplyEqual(4),
      SplineCurve.Tz.DeepCopy(i),
      SplineCurve.Tz.MultiplyEqual(2),
      SplineCurve.fHo.Subtraction(SplineCurve.jye, SplineCurve.gXs),
      SplineCurve.gXs.MultiplyEqual(6),
      SplineCurve.gXs.SubtractionEqual(SplineCurve.Lz),
      SplineCurve.gXs.SubtractionEqual(SplineCurve.Tz);
    var u = 0.5 * t;
    let o = -0;
    for (const l of LegendreGaussCoefficients) {
      var v = u * (1 + l[0]);
      SplineCurve.Lz.DeepCopy(SplineCurve.CXs),
        SplineCurve.Lz.MultiplyEqual(v),
        SplineCurve.Lz.AdditionEqual(SplineCurve.gXs),
        SplineCurve.Lz.MultiplyEqual(v),
        SplineCurve.Lz.AdditionEqual(SplineCurve.pHo),
        (o += SplineCurve.Lz.Size() * l[1]);
    }
    return (o *= u);
  }
  GetSplineLength() {
    var e;
    return 0 < this.Position.length
      ? ((e = this.ReparamTable.length - 1), this.ReparamTable[e].InVal)
      : 0;
  }
  GetSplineLengthAtPoint(e) {
    return 0 < this.Position.length
      ? ((e = this.yXs * e), this.ReparamTable[e].InVal)
      : 0;
  }
  GetWorldLocationAtSplinePoint(e, t) {
    e = this.Position[e];
    SplineCurve.jye.DeepCopy(e.OutVal),
      this.SplineTransform.TransformPosition(SplineCurve.jye, t);
  }
  GetWorldLocationAtDistanceAlongSpline(e, t) {
    e = this.TXs(this.ReparamTable, e);
    this.LXs(e, 1, t);
  }
  GetLocationAtSplinePoint(e, t, i) {
    e = this.Position[e];
    SplineCurve.jye.DeepCopy(e.OutVal),
      1 === t
        ? this.SplineTransform.TransformPosition(SplineCurve.jye, i)
        : i.DeepCopy(SplineCurve.jye);
  }
  GetLocationAtDistanceAlongSpline(e, t, i) {
    e = this.TXs(this.ReparamTable, e);
    this.LXs(e, t, i);
  }
  SetLocationAtSplinePoint(e, t, i, r) {
    var n = this.Position.length;
    0 <= e &&
      e < n &&
      (1 === i
        ? this.SplineTransform.InverseTransformPosition(t, SplineCurve.jye)
        : SplineCurve.jye.DeepCopy(t),
      (this.Position[e].OutVal.X = SplineCurve.jye.X),
      (this.Position[e].OutVal.Y = SplineCurve.jye.Y),
      (this.Position[e].OutVal.Z = SplineCurve.jye.Z)),
      r && this.UpdateSplineCurves(e - 1);
  }
  GetTransformAtSplineIndex(e, t, i) {
    (e = this.ReparamTable[e * this.yXs].InVal),
      (e = this.TXs(this.ReparamTable, e));
    this.fih(e, t, i);
  }
  GetTransformAtRateAlongSpline(e, t, i) {
    var r = this.ReparamTable[this.ReparamTable.length - 1].InVal,
      r = this.TXs(this.ReparamTable, r * e);
    this.fih(r, t, i);
  }
  GetTransformAtDistanceAlongSpline(e, t, i) {
    e = this.TXs(this.ReparamTable, e);
    this.fih(e, t, i);
  }
  fih(e, t, i) {
    this.LXs(e, 0, SplineCurve.jye),
      this.AXs(e, 0, SplineCurve.RTe),
      this.DXs(e, 0, SplineCurve.jJo),
      SplineCurve.Z_e.SetLocation(SplineCurve.jye),
      SplineCurve.Z_e.SetRotation(SplineCurve.jJo),
      SplineCurve.Z_e.SetScale3D(SplineCurve.RTe),
      1 === t && SplineCurve.Z_e.ComposeTransforms(this.SplineTransform, i);
  }
  GetDistanceAlongSplineAtSplinePoint(e) {
    e *= this.yXs;
    return this.ReparamTable.length <= e ? 0 : this.ReparamTable[e].InVal;
  }
  GetDirectionAtSplinePoint(e, t, i) {
    1 === t
      ? this.SplineTransform.TransformVector(this.Position[e].LeaveTangent, i)
      : i.DeepCopy(this.Position[e].LeaveTangent),
      i.Normalize();
  }
  GetDirectionAtDistanceAlongSpline(e, t, i) {
    e = this.TXs(this.ReparamTable, e);
    this.pih(e, t, i);
  }
  pih(e, t, i) {
    this.xXs(this.Position, e, i),
      1 === t && this.SplineTransform.TransformVector(i, i),
      i.Normalize();
  }
  LXs(e, t, i) {
    this.UXs(this.Position, e, i),
      1 === t && this.SplineTransform.TransformPosition(i, i);
  }
  AXs(e, t, i) {
    this.Scale
      ? this.UXs(this.Scale, e, i)
      : i.DeepCopy(Vector_1.Vector.OneVectorProxy),
      1 === t && this.SplineTransform.TransformPosition(i, i);
  }
  DXs(e, t, i) {
    this.xXs(this.Position, e, SplineCurve.sqn),
      SplineCurve.sqn.GetSafeNormal(SplineCurve.sqn),
      this.Rotation
        ? (this.RXs(this.Rotation, e, SplineCurve.pXs),
          SplineCurve.pXs.Normalize(),
          SplineCurve.Lz.DeepCopy(Vector_1.Vector.UpVectorProxy),
          SplineCurve.pXs.RotateVector(SplineCurve.Lz, SplineCurve.Lz))
        : (this.SplineTransform.GetRotation().Inverse(SplineCurve.KJ),
          SplineCurve.KJ.RotateVector(this.j6c, SplineCurve.Lz)),
      MathUtils_1.MathUtils.LookRotationForwardFirst(
        SplineCurve.sqn,
        SplineCurve.Lz,
        i,
      ),
      1 === t && this.SplineTransform.GetRotation().Multiply(i, i);
  }
  RXs(e, t, i, r = Quat_1.Quat.IdentityProxy) {
    var n = e.length,
      s = n - 1;
    if (0 === n) i.DeepCopy(r);
    else {
      var u,
        o,
        n = this.PXs(e, t);
      if (n < 0) i.DeepCopy(e[0].OutVal);
      else {
        if (n !== s)
          return (
            (r = e[n]),
            0 < (o = (u = e[n + 1]).InVal - r.InVal) && 2 !== r.InterpMode
              ? (t = (t - r.InVal) / o) < 0 || 1 < t
                ? void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Movement",
                      42,
                      "TsAnimNotifyStateCurveMove.InterpVectorEvalDerivative计算Alpha异常",
                    )
                  )
                : 0 === r.InterpMode
                  ? (SplineCurve.az.DeepCopy(r.OutVal),
                    SplineCurve.KJ.DeepCopy(u.OutVal),
                    void Quat_1.Quat.Slerp(
                      SplineCurve.az,
                      SplineCurve.KJ,
                      t,
                      i,
                    ))
                  : (SplineCurve.az.DeepCopy(r.OutVal),
                    SplineCurve.KJ.DeepCopy(r.LeaveTangent),
                    SplineCurve.KJ.Multiply(o, SplineCurve.KJ),
                    SplineCurve.QJ.DeepCopy(u.OutVal),
                    SplineCurve.fXs.DeepCopy(u.ArriveTangent),
                    SplineCurve.fXs.Multiply(o, SplineCurve.KJ),
                    void Quat_1.Quat.Squad(
                      SplineCurve.az,
                      SplineCurve.KJ,
                      SplineCurve.QJ,
                      SplineCurve.fXs,
                      t,
                      i,
                    ))
              : void i.DeepCopy(e[n].OutVal)
          );
        i.DeepCopy(e[s].OutVal);
      }
    }
  }
  UXs(e, t, i, r = Vector_1.Vector.ZeroVectorProxy) {
    var n = e.length,
      s = n - 1;
    if (0 === n) i.DeepCopy(r);
    else {
      var u,
        o,
        n = this.PXs(e, t);
      if (n < 0) i.DeepCopy(e[0].OutVal);
      else {
        if (n !== s)
          return (
            (r = e[n]),
            0 < (o = (u = e[n + 1]).InVal - r.InVal) && 2 !== r.InterpMode
              ? (t = (t - r.InVal) / o) < 0 || 1 < t
                ? void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Movement",
                      42,
                      "TsAnimNotifyStateCurveMove.InterpVectorEvalDerivative计算Alpha异常",
                    )
                  )
                : 0 === r.InterpMode
                  ? (SplineCurve.Lz.DeepCopy(r.OutVal),
                    SplineCurve.Tz.DeepCopy(u.OutVal),
                    void Vector_1.Vector.Lerp(
                      SplineCurve.Lz,
                      SplineCurve.Tz,
                      t,
                      i,
                    ))
                  : (SplineCurve.Lz.DeepCopy(r.OutVal),
                    SplineCurve.Tz.DeepCopy(r.LeaveTangent),
                    SplineCurve.Tz.MultiplyEqual(o),
                    SplineCurve.fHo.DeepCopy(u.OutVal),
                    SplineCurve.pHo.DeepCopy(u.ArriveTangent),
                    SplineCurve.pHo.MultiplyEqual(o),
                    void Vector_1.Vector.LerpCubic(
                      SplineCurve.Lz,
                      SplineCurve.Tz,
                      SplineCurve.fHo,
                      SplineCurve.pHo,
                      t,
                      i,
                    ))
              : void i.DeepCopy(e[n].OutVal)
          );
        i.DeepCopy(e[s].OutVal);
      }
    }
  }
  TXs(e, t, i = 0) {
    var r,
      n,
      s = e.length,
      u = s - 1;
    return 0 === s
      ? i
      : (s = this.PXs(e, t)) < 0
        ? e[0].OutVal
        : s === u
          ? e[u].OutVal
          : ((u = e[s]),
            0 < (n = (r = e[s + 1]).InVal - u.InVal) && 2 !== u.InterpMode
              ? (t = (t - u.InVal) / n) < 0 || 1 < t
                ? (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Movement",
                      42,
                      "TsAnimNotifyStateCurveMove.InterpVectorEvalDerivative计算Alpha异常",
                    ),
                  i)
                : 0 === u.InterpMode
                  ? MathUtils_1.MathUtils.Lerp(u.OutVal, r.OutVal, t)
                  : MathUtils_1.MathUtils.LerpCubic(
                      u.OutVal,
                      u.LeaveTangent * n,
                      r.OutVal,
                      r.ArriveTangent * n,
                      t,
                    )
              : e[s].OutVal);
  }
  xXs(e, t, i, r = Vector_1.Vector.ZeroVectorProxy) {
    var n = e.length,
      s = n - 1;
    if (0 === n) i.DeepCopy(r);
    else {
      var u,
        o,
        n = this.PXs(e, t);
      if (n < 0) i.DeepCopy(e[0].LeaveTangent);
      else {
        if (n !== s)
          return (
            (r = e[n]),
            0 < (o = (u = e[n + 1]).InVal - r.InVal) && 2 !== r.InterpMode
              ? 0 === r.InterpMode
                ? (SplineCurve.Lz.DeepCopy(r.OutVal),
                  i.DeepCopy(u.OutVal),
                  i.SubtractionEqual(SplineCurve.Lz),
                  void i.DivisionEqual(o))
                : (t = (t - r.InVal) / o) < 0 || 1 < t
                  ? void (
                      Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Movement",
                        42,
                        "TsAnimNotifyStateCurveMove.InterpVectorEvalDerivative计算Alpha异常",
                      )
                    )
                  : (SplineCurve.Lz.DeepCopy(r.OutVal),
                    SplineCurve.Tz.DeepCopy(r.LeaveTangent),
                    SplineCurve.Tz.MultiplyEqual(o),
                    SplineCurve.fHo.DeepCopy(u.OutVal),
                    SplineCurve.pHo.DeepCopy(u.ArriveTangent),
                    SplineCurve.pHo.MultiplyEqual(o),
                    Vector_1.Vector.LerpCubicDerivative(
                      SplineCurve.Lz,
                      SplineCurve.Tz,
                      SplineCurve.fHo,
                      SplineCurve.pHo,
                      t,
                      i,
                    ),
                    void i.DivisionEqual(o))
              : void i.DeepCopy(e[n].OutVal)
          );
        i.DeepCopy(e[s].ArriveTangent);
      }
    }
  }
  PXs(e, t) {
    var i = e.length,
      r = i - 1;
    if (t < e[0].InVal) return -1;
    if (t >= e[r].InVal) return r;
    let n = 0,
      s = i;
    var u;
    for (Math.floor((n + s) / 2); 1 < s - n; )
      e[(u = Math.floor((n + s) / 2))].InVal <= t ? (n = u) : (s = u);
    return n;
  }
}
((exports.SplineCurve = SplineCurve).jye = Vector_1.Vector.Create()),
  (SplineCurve.RTe = Vector_1.Vector.Create()),
  (SplineCurve.sqn = Vector_1.Vector.Create()),
  (SplineCurve.Lz = Vector_1.Vector.Create()),
  (SplineCurve.Tz = Vector_1.Vector.Create()),
  (SplineCurve.fHo = Vector_1.Vector.Create()),
  (SplineCurve.pHo = Vector_1.Vector.Create()),
  (SplineCurve.vHo = Vector_1.Vector.Create()),
  (SplineCurve.CXs = Vector_1.Vector.Create()),
  (SplineCurve.gXs = Vector_1.Vector.Create()),
  (SplineCurve.jJo = Quat_1.Quat.Create()),
  (SplineCurve.az = Quat_1.Quat.Create()),
  (SplineCurve.KJ = Quat_1.Quat.Create()),
  (SplineCurve.QJ = Quat_1.Quat.Create()),
  (SplineCurve.fXs = Quat_1.Quat.Create()),
  (SplineCurve.pXs = Quat_1.Quat.Create()),
  (SplineCurve.Z_e = Transform_1.Transform.Create());
//# sourceMappingURL=SplineCurve.js.map
