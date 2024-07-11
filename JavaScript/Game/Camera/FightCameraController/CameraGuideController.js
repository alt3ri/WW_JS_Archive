"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraGuideController = void 0);
const UE = require("ue");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../GlobalData");
const CameraControllerBase_1 = require("./CameraControllerBase");
const IS_DEBUG = !1;
const DEFAULT_VALUE = -1;
class CameraGuideController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.CheckAdjustYawAngleMin = 0),
      (this.CheckAdjustYawAngleMax = 0),
      (this.CameraArmLengthRateHorizontal = 0),
      (this.CameraArmLengthRateVertical = 0),
      (this.CameraArmLengthAdditionMax = 0),
      (this.CameraArmOffsetHorizontalLengthRate = 0),
      (this.CameraArmOffsetHorizontalLengthMax = 0),
      (this.CameraArmOffsetVerticalLengthRate = 0),
      (this.CameraArmOffsetVerticalLengthMax = 0),
      (this.DefaultPitchInRangeMin = 0),
      (this.DefaultPitchInRangeMax = 0),
      (this.DefaultPitchOutRangeMin = 0),
      (this.DefaultPitchOutRangeMax = 0),
      (this.CameraPitchMin = 0),
      (this.CameraPitchMax = 0),
      (this.CameraPitchOffset = 0),
      (this.NearerRange = 0),
      (this.j1e = -0),
      (this.c_e = -0),
      (this.W1e = -0),
      (this.m_e = !1),
      (this.CurrentCameraArmLengthAddition = 0),
      (this.d_e = 0),
      (this.C_e = 0),
      (this.CurrentCameraArmOffset = Vector_1.Vector.Create()),
      (this.B1e = Vector_1.Vector.Create()),
      (this.g_e = Vector_1.Vector.Create()),
      (this.f_e = 0),
      (this.ole = 0),
      (this.rle = 0),
      (this.sle = 0),
      (this.ale = 0),
      (this.H6 = 0),
      (this.p_e = 0),
      (this.v_e = Vector_1.Vector.Create()),
      (this.M_e = DEFAULT_VALUE),
      (this.S_e = 0),
      (this.E_e = !1);
  }
  get IsBlending() {
    return this.f_e !== 0;
  }
  Name() {
    return "GuideController";
  }
  OnInit() {
    this.SetConfigMap(1, "CheckAdjustYawAngleMin"),
      this.SetConfigMap(2, "CheckAdjustYawAngleMax"),
      this.SetConfigMap(3, "CameraArmLengthRateHorizontal"),
      this.SetConfigMap(4, "CameraArmLengthRateVertical"),
      this.SetConfigMap(5, "CameraArmLengthAdditionMax"),
      this.SetConfigMap(6, "CameraArmOffsetHorizontalLengthRate"),
      this.SetConfigMap(7, "CameraArmOffsetHorizontalLengthMax"),
      this.SetConfigMap(8, "CameraArmOffsetVerticalLengthRate"),
      this.SetConfigMap(9, "CameraArmOffsetVerticalLengthMax"),
      this.SetConfigMap(10, "DefaultPitchInRangeMin"),
      this.SetConfigMap(11, "DefaultPitchInRangeMax"),
      this.SetConfigMap(12, "DefaultPitchOutRangeMin"),
      this.SetConfigMap(13, "DefaultPitchOutRangeMax"),
      this.SetConfigMap(17, "NearerRange"),
      this.SetConfigMap(14, "CameraPitchMin"),
      this.SetConfigMap(15, "CameraPitchMax"),
      this.SetConfigMap(16, "CameraPitchOffset");
  }
  ExitCameraGuide() {
    this.y_e();
  }
  SetConfigs(t, i) {
    super.SetConfigs(t, i), (this.E_e = !0);
  }
  ApplyCameraGuide(t, i, s, h, e, a, r) {
    this.IsActivate &&
      this.E_e &&
      (this.v_e.FromUeVector(t),
      (this.j1e = i),
      (this.c_e = s),
      (this.W1e = h),
      (this.m_e = e),
      this.I_e(),
      (t = this.Camera.PlayerLocation),
      (i = this.Camera.CurrentCamera.ArmRotation),
      (s = Vector_1.Vector.Create()),
      i.Vector(s),
      (h = Vector_1.Vector.Create()).DeepCopy(this.v_e),
      h.SubtractionEqual(a ?? t),
      (e = h.CosineAngle2D(s)),
      (i = h.SineAngle2D(s)),
      (this.sle = this.Camera.CameraActor.K2_GetActorRotation().Yaw),
      (s = Rotator_1.Rotator.Create()),
      h.Rotation(s),
      (this.ale = s.Yaw),
      i < 0
        ? e >
          Math.cos(this.CheckAdjustYawAngleMin * MathUtils_1.MathUtils.DegToRad)
          ? (this.ale += this.CheckAdjustYawAngleMin)
          : e <
              Math.cos(
                this.CheckAdjustYawAngleMax * MathUtils_1.MathUtils.DegToRad,
              )
            ? (this.ale += this.CheckAdjustYawAngleMax)
            : (this.ale = this.sle)
        : e >
            Math.cos(
              this.CheckAdjustYawAngleMin * MathUtils_1.MathUtils.DegToRad,
            )
          ? (this.ale -= this.CheckAdjustYawAngleMin)
          : e <
              Math.cos(
                this.CheckAdjustYawAngleMax * MathUtils_1.MathUtils.DegToRad,
              )
            ? (this.ale -= this.CheckAdjustYawAngleMax)
            : (this.ale = this.sle),
      this.sle - this.ale > 180
        ? (this.ale += 360)
        : this.ale - this.sle > 180 && (this.ale -= 360),
      (s = Rotator_1.Rotator.Create()),
      h.Rotation(s),
      (this.ole = this.Camera.CameraActor.K2_GetActorRotation().Pitch),
      h.Size() > this.NearerRange
        ? ((i = s.Pitch + this.CameraPitchOffset),
          (this.rle = MathUtils_1.MathUtils.Clamp(
            i,
            this.CameraPitchMin,
            this.CameraPitchMax,
          )))
        : (this.rle = MathUtils_1.MathUtils.RangeClamp(
            h.Z,
            this.DefaultPitchInRangeMin,
            this.DefaultPitchInRangeMax,
            this.DefaultPitchOutRangeMin,
            this.DefaultPitchOutRangeMax,
          )),
      (e = h.Size2D()),
      (this.C_e =
        e * this.CameraArmLengthRateHorizontal +
        Math.abs(h.Z) * this.CameraArmLengthRateVertical),
      (this.C_e = MathUtils_1.MathUtils.Clamp(
        this.C_e,
        0,
        this.CameraArmLengthAdditionMax,
      )),
      a
        ? (this.g_e.DeepCopy(a),
          this.g_e.SubtractionEqual(t),
          (this.M_e = r),
          (this.S_e = this.Camera.CurrentCamera.Fov))
        : ((s = Vector_1.Vector.Create()).DeepCopy(this.v_e),
          s.SubtractionEqual(t),
          (s.Z = 0),
          e * this.CameraArmOffsetHorizontalLengthRate >
          this.CameraArmOffsetHorizontalLengthMax
            ? (s.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
              this.g_e.DeepCopy(s),
              this.g_e.MultiplyEqual(this.CameraArmOffsetHorizontalLengthMax))
            : (this.g_e.DeepCopy(s),
              this.g_e.MultiplyEqual(this.CameraArmOffsetHorizontalLengthRate)),
          (i = (this.v_e.Z - t.Z) * this.CameraArmOffsetVerticalLengthRate),
          (i = MathUtils_1.MathUtils.Clamp(
            i,
            -this.CameraArmOffsetVerticalLengthMax,
            this.CameraArmOffsetVerticalLengthMax,
          )),
          (this.g_e.Z = i),
          (this.M_e = DEFAULT_VALUE)));
  }
  T_e(t) {
    const i = MathUtils_1.MathUtils.LerpSin(this.sle, this.ale, t);
    let s = MathUtils_1.MathUtils.LerpSin(this.ole, this.rle, t);
    (this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(s, i, 0)),
      (this.Camera.IsModifiedArmRotation = !0),
      this.M_e &&
        DEFAULT_VALUE !== this.M_e &&
        ((s = MathUtils_1.MathUtils.LerpSin(this.S_e, this.M_e, t)),
        (this.Camera.DesiredCamera.Fov = s));
  }
  L_e(t) {
    let i, s;
    (this.CurrentCameraArmLengthAddition = MathUtils_1.MathUtils.LerpSin(
      this.d_e,
      this.C_e,
      t,
    )),
      (this.CurrentCameraArmOffset = Vector_1.Vector.Create()),
      Vector_1.Vector.LerpSin(
        this.B1e,
        this.g_e,
        t,
        this.CurrentCameraArmOffset,
      ),
      IS_DEBUG &&
        ((t = Vector_1.Vector.Create(this.Camera.PlayerLocation)),
        (i = Vector_1.Vector.Create())
          .AdditionEqual(t)
          .AdditionEqual(this.CurrentCameraArmOffset),
        (s = Vector_1.Vector.Create()).AdditionEqual(t).AdditionEqual(this.g_e),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          this.Camera.PlayerLocation.ToUeVector(),
          i.ToUeVector(),
          new UE.LinearColor(0, 1, 0, 1),
          0,
          5,
        ),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          i.ToUeVector(),
          s.ToUeVector(),
          new UE.LinearColor(1, 1, 0, 1),
          0,
          5,
        ),
        this.f_e !== 0) &&
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          this.v_e.ToUeVector(),
          s.ToUeVector(),
          new UE.LinearColor(1, 0, 0, 1),
          0,
          5,
        );
  }
  D_e(t) {
    t >= 1 &&
      ((this.CurrentCameraArmLengthAddition = this.d_e),
      this.B1e.DeepCopy(this.CurrentCameraArmOffset)),
      (this.CurrentCameraArmLengthAddition = MathUtils_1.MathUtils.LerpSin(
        this.d_e,
        0,
        t,
      )),
      Vector_1.Vector.LerpSin(
        this.B1e,
        Vector_1.Vector.ZeroVectorProxy,
        t,
        this.CurrentCameraArmOffset,
      ),
      this.M_e &&
        DEFAULT_VALUE !== this.M_e &&
        ((t = MathUtils_1.MathUtils.LerpSin(this.S_e, this.Camera.Fov, t)),
        (this.Camera.DesiredCamera.Fov = t));
  }
  UpdateInternal(t) {
    switch (
      (this.UpdateBreakModifyInfo(),
      (this.H6 += t),
      (this.BreakModifyArmRotation || this.BreakModifyArmLength) && this.y_e(),
      this.f_e)
    ) {
      case 1:
        var i = this.j1e > 0 ? this.H6 / this.j1e : 1;
        var i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
        this.T_e(i), this.L_e(i), this.H6 > this.j1e && this.R_e();
        break;
      case 2:
        this.c_e >= 0 && this.H6 > this.j1e + this.c_e && this.y_e();
        break;
      case 3:
        this.p_e += t;
        (i = this.W1e > 0 ? this.p_e / this.W1e : 1),
          (i = MathUtils_1.MathUtils.Clamp(i, 0, 1));
        this.D_e(i), this.p_e > this.W1e && (this.f_e = 0);
    }
  }
  OnDisable() {
    this.y_e();
  }
  UpdateDeactivateInternal(t) {
    this.f_e === 3 &&
      ((this.p_e += t),
      (t = this.W1e > 0 ? this.p_e / this.W1e : 1),
      (t = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
      this.D_e(t),
      this.p_e > this.W1e) &&
      (this.f_e = 0);
  }
  I_e() {
    this.ResetBreakModifyInfo(),
      (this.f_e = 1),
      (this.H6 = 0),
      (this.p_e = 0),
      (this.d_e = this.CurrentCameraArmLengthAddition),
      this.B1e.Set(
        this.CurrentCameraArmOffset.X,
        this.CurrentCameraArmOffset.Y,
        this.CurrentCameraArmOffset.Z,
      ),
      this.m_e && this.Camera.CameraInputController.Lock(this);
  }
  R_e() {
    this.f_e = 2;
  }
  y_e() {
    (this.f_e !== 1 && this.f_e !== 2) ||
      ((this.f_e = 3),
      (this.p_e = 0),
      (this.d_e = this.CurrentCameraArmLengthAddition),
      this.B1e.DeepCopy(this.CurrentCameraArmOffset),
      this.Camera.CameraInputController.Unlock(this),
      this.M_e &&
        DEFAULT_VALUE !== this.M_e &&
        (this.S_e = this.Camera.CurrentCamera.Fov));
  }
  IsLockCameraInput() {
    return this.m_e;
  }
}
exports.CameraGuideController = CameraGuideController;
// # sourceMappingURL=CameraGuideController.js.map
