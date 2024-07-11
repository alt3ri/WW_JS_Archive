"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraFocusController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CameraControllerBase_1 = require("./CameraControllerBase"),
  ARM_OFFSET_Y_SPEED = 100,
  DEFAULT_FPS = 60,
  FIRST_THRESHOLD = 0.5,
  FIRST_THRESHOLD_SQUARED = FIRST_THRESHOLD * FIRST_THRESHOLD;
class CameraFocusController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.RelativeRotationLagSpeedMin = 0),
      (this.RelativeRotationLagSpeedMax = 0),
      (this.RelativeRotationLagAngleRange = 0),
      (this.RelativeRotationLagCurve = void 0),
      (this.RelativeRotationLagRatioMin = 0),
      (this.RelativeRotationLagRatioMax = 0),
      (this.RelativeRotationLagDistanceRangeMin = 0),
      (this.RelativeRotationLagDistanceRangeMax = 0),
      (this.RelativeRotationLagRatioCurve = void 0),
      (this.YawSignAdaptionOn = 0),
      (this.YawSignAdaptionThreshold = 0),
      (this.YawSignAdaptionCooldown = 0),
      (this.RelativeYawSoftMin = 0),
      (this.RelativeYawSoftMax = 0),
      (this.CameraOffsetSoft = 0),
      (this.CameraOffset = 0),
      (this.HardLockInputYawSensitivity = 0),
      (this.HardLockInputPitchSensitivity = 0),
      (this.HardLockInputYawSensitivityGamepad = 0),
      (this.HardLockInputPitchSensitivityGamepad = 0),
      (this.SoftLockInputYawSensitivity = 0),
      (this.SoftLockInputPitchSensitivity = 0),
      (this.SoftLockInputYawSensitivityGamepad = 0),
      (this.SoftLockInputPitchSensitivityGamepad = 0),
      (this.ChangeShowTargetDamping = 0),
      (this.ChangeShowTargetAngleCoefficient = 0),
      (this.ChangeShowTargetDistCoefficient = 0),
      (this.ChangeShowTargetSensitivity = 0),
      (this.ChangeShowTargetSensitivityGamepad = 0),
      (this.RelativeYawHardMax = 0),
      (this.RelativeYawHardMin = 0),
      (this.RelativePitchHardMax = 0),
      (this.RelativePitchHardMin = 0),
      (this.SoftUnlockYawSpeed = 0),
      (this.SoftUnlockPitchSpeed = 0),
      (this.s_e = Vector_1.Vector.Create()),
      (this.Sle = Rotator_1.Rotator.Create()),
      (this.a_e = !1),
      (this.FocusLimitLength = 0),
      (this.FocusLimitPitchSpeed = 0),
      (this.FocusLimitYawSpeed = 0),
      (this.h_e = 0),
      (this.AddCameraOffsetY = void 0),
      (this.l_e = Vector2D_1.Vector2D.Create()),
      (this.Qyn = !0),
      (this.__e = !0),
      (this.u_e = 0);
  }
  Name() {
    return "FocusController";
  }
  OnInit() {
    this.SetConfigMap(1, "RelativeRotationLagSpeedMin"),
      this.SetConfigMap(2, "RelativeRotationLagSpeedMax"),
      this.SetConfigMap(3, "RelativeRotationLagAngleRange"),
      this.SetCurveConfigMap(3, "RelativeRotationLagCurve"),
      this.SetConfigMap(28, "RelativeRotationLagRatioMin"),
      this.SetConfigMap(29, "RelativeRotationLagRatioMax"),
      this.SetConfigMap(31, "RelativeRotationLagDistanceRangeMin"),
      this.SetConfigMap(30, "RelativeRotationLagDistanceRangeMax"),
      this.SetCurveConfigMap(30, "RelativeRotationLagRatioCurve"),
      this.SetConfigMap(4, "YawSignAdaptionOn"),
      this.SetConfigMap(5, "YawSignAdaptionThreshold"),
      this.SetConfigMap(6, "YawSignAdaptionCooldown"),
      this.SetConfigMap(7, "RelativeYawSoftMin"),
      this.SetConfigMap(8, "RelativeYawSoftMax"),
      this.SetConfigMap(9, "CameraOffsetSoft"),
      this.SetConfigMap(10, "CameraOffset"),
      this.SetConfigMap(11, "HardLockInputYawSensitivity"),
      this.SetConfigMap(12, "HardLockInputPitchSensitivity"),
      this.SetConfigMap(13, "HardLockInputYawSensitivityGamepad"),
      this.SetConfigMap(14, "HardLockInputPitchSensitivityGamepad"),
      this.SetConfigMap(24, "SoftLockInputYawSensitivity"),
      this.SetConfigMap(25, "SoftLockInputPitchSensitivity"),
      this.SetConfigMap(26, "SoftLockInputYawSensitivityGamepad"),
      this.SetConfigMap(27, "SoftLockInputPitchSensitivityGamepad"),
      this.SetConfigMap(15, "ChangeShowTargetDamping"),
      this.SetConfigMap(16, "ChangeShowTargetAngleCoefficient"),
      this.SetConfigMap(17, "ChangeShowTargetDistCoefficient"),
      this.SetConfigMap(18, "RelativeYawHardMin"),
      this.SetConfigMap(19, "RelativeYawHardMax"),
      this.SetConfigMap(20, "RelativePitchHardMin"),
      this.SetConfigMap(21, "RelativePitchHardMax"),
      this.SetConfigMap(22, "SoftUnlockYawSpeed"),
      this.SetConfigMap(23, "SoftUnlockPitchSpeed"),
      this.SetConfigMap(32, "ChangeShowTargetSensitivity"),
      this.SetConfigMap(33, "ChangeShowTargetSensitivityGamepad");
  }
  OnEnable() {
    (this.RelativeYawHardMin < 0 ||
      180 < this.RelativeYawHardMin ||
      this.RelativeYawHardMin > this.RelativeYawHardMax) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Controller",
        58,
        `锁定镜头配置错误，强锁定-镜头偏角最小值${this.RelativeYawHardMin}不在0-180之间或者大于强锁定-镜头偏角最大值` +
          this.RelativeYawHardMax,
      ),
      (this.RelativeYawHardMax < 0 ||
        180 < this.RelativeYawHardMax ||
        this.RelativeYawHardMax < this.RelativeYawHardMin) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Controller",
          58,
          `锁定镜头配置错误，强锁定-镜头偏角最大值${this.RelativeYawHardMax}不在0-180之间或者小于强锁定-镜头偏角最小值` +
            this.RelativeYawHardMin,
        ),
      (this.RelativePitchHardMin < 0 ||
        180 < this.RelativePitchHardMin ||
        this.RelativePitchHardMin > this.RelativePitchHardMax) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Controller",
          58,
          `锁定镜头配置错误，强锁定-镜头俯仰角最小值${this.RelativePitchHardMin}不在0-180之间或者大于强锁定-镜头俯仰角最大值` +
            this.RelativePitchHardMax,
        ),
      (this.RelativePitchHardMax < 0 ||
        180 < this.RelativePitchHardMax ||
        this.RelativePitchHardMax < this.RelativePitchHardMin) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Controller",
          58,
          `锁定镜头配置错误，强锁定-镜头俯仰角最大值${this.RelativePitchHardMax}不在0-180之间或者小于强锁定-镜头俯仰角最小值` +
            this.RelativePitchHardMin,
        ),
      this.Camera.CameraAutoController.EnableForce(this),
      this.Camera.CameraSidestepController.Lock(this),
      (this.AddCameraOffsetY = 0);
  }
  InitFocusData(t, i, s, h) {
    0 !== h &&
      ((this.a_e = t),
      (this.FocusLimitLength = h),
      (this.FocusLimitPitchSpeed = s),
      (this.FocusLimitYawSpeed = i));
  }
  OnDisable() {
    (this.a_e = !1),
      this.Camera.CameraAutoController.DisableForce(this),
      this.Camera.CameraSidestepController.Unlock(this),
      (this.h_e = 0),
      (this.u_e = 0),
      this.l_e.Reset();
  }
  UpdateCustomEnableCondition() {
    return (
      !!this.Camera.TargetEntity &&
      (!this.a_e || this.Camera.CharacterEntityHandle.IsInit)
    );
  }
  UpdateInternal(t) {
    this.UpdateArmRotation(t), this.UpdateShowTarget(t);
  }
  UpdateArmRotation(o) {
    if (
      this.Camera.TargetEntity &&
      this.Camera.IsTargetLocationValid &&
      (!this.Camera.IsModifiedArmRotation || this.__e)
    ) {
      this.__e = !1;
      var [r, n] =
          this.Camera.CharacterEntityHandle.Entity.GetComponent(
            52,
          ).GetCameraInput(),
        l = this.Camera.CurrentCamera.ArmRotation,
        M = this.Camera.PlayerLocation,
        M =
          (this.Camera.TargetLocation.Subtraction(M, this.s_e),
          this.Camera.ContainsAnyTag([-1150819426, 1260125908]));
      void 0 === this.AddCameraOffsetY && (this.AddCameraOffsetY = 0);
      let t = 0,
        i = !1,
        s = 0,
        h = 0,
        a = 0,
        e = 0;
      (this.Sle.Pitch = this.Camera.AdjustPitch(this.s_e)),
        (this.Sle.Yaw =
          Math.atan2(this.s_e.Y, this.s_e.X) * MathUtils_1.MathUtils.RadToDeg);
      var _ = MathUtils_1.MathUtils.WrapAngle(
          this.Camera.CameraRotation.Yaw - this.Sle.Yaw,
        ),
        S = MathUtils_1.MathUtils.WrapAngle(
          this.Camera.CameraRotation.Pitch - this.Sle.Pitch,
        ),
        R = 0 <= _ ? 1 : -1,
        g = 0 <= S ? 1 : -1;
      if (M) {
        if (this.YawSignAdaptionOn) {
          var M =
              0 <=
              (r *= ModelManager_1.ModelManager.PlatformModel.IsGamepad()
                ? this.HardLockInputYawSensitivityGamepad
                : this.HardLockInputYawSensitivity)
                ? 1
                : -1,
            d =
              0 <=
              (n = -(n *= ModelManager_1.ModelManager.PlatformModel.IsGamepad()
                ? this.HardLockInputPitchSensitivityGamepad
                : this.HardLockInputPitchSensitivity))
                ? 1
                : -1;
          if (
            (0 === this.h_e &&
              ((this.h_e = R),
              (this.u_e = Time_1.Time.Now + this.YawSignAdaptionCooldown)),
            Time_1.Time.Now > this.u_e &&
              this.h_e !== R &&
              ((this.h_e = R),
              (this.u_e = Time_1.Time.Now + this.YawSignAdaptionCooldown)),
            Math.abs(_) < this.RelativeYawHardMin)
          )
            (a += this.h_e * this.RelativeYawHardMin), M == R && (a += r);
          else if (Math.abs(_) > this.RelativeYawHardMax)
            (a += this.h_e * this.RelativeYawHardMax), M != R && (a += r);
          else {
            const c = _ + r;
            R * c < 0 &&
              (R == M &&
                180 !== this.RelativeYawHardMax &&
                ((r = MathUtils_1.MathUtils.WrapAngle(
                  this.Sle.Yaw + this.h_e * this.RelativeYawHardMax,
                )),
                (v = MathUtils_1.MathUtils.WrapAngle(
                  this.Sle.Yaw + this.h_e * this.RelativeYawHardMin,
                )),
                (h = Math.max(v, r)),
                (s = Math.min(v, r)),
                (i = !0)),
              R != M) &&
              0 !== this.RelativeYawHardMin &&
              ((v = MathUtils_1.MathUtils.WrapAngle(
                this.Sle.Yaw + this.h_e * this.RelativeYawHardMax,
              )),
              (r = MathUtils_1.MathUtils.WrapAngle(
                this.Sle.Yaw + this.h_e * this.RelativeYawHardMin,
              )),
              (h = Math.max(r, v)),
              (s = Math.min(r, v)),
              (i = !0)),
              (a += c);
          }
          if (Math.abs(S) < this.RelativePitchHardMin)
            (e += g * this.RelativePitchHardMin), d == g && (e += n);
          else if (Math.abs(S) > this.RelativePitchHardMax)
            (e += g * this.RelativePitchHardMax), d != g && (e += n);
          else {
            const c = S + n;
            e += c;
          }
          (a = MathUtils_1.MathUtils.Clamp(a, _ - 179, _ + 179)),
            (e = MathUtils_1.MathUtils.Clamp(e, S - 179, S + 179)),
            (this.Sle.Yaw += a),
            (this.Sle.Pitch += e),
            (this.Sle.Yaw = MathUtils_1.MathUtils.WrapAngle(this.Sle.Yaw)),
            (this.Sle.Pitch = MathUtils_1.MathUtils.WrapAngle(this.Sle.Pitch)),
            (t = R * this.CameraOffset);
        }
      } else
        !ModelManager_1.ModelManager.CameraModel.IsEnableSoftLockCamera ||
        ((M = this.Camera.CameraModifyController), this.ShouldSoftUnlock()) ||
        M?.IsModified ||
        M?.IsModifyFadeOut ||
        M?.ModifySettings?.IsModifiedArmRotation
          ? ((this.Sle.Yaw = l.Yaw), (this.Sle.Pitch = l.Pitch))
          : (r = this.Camera.CharacterEntityHandle.Entity.GetComponent(29)) &&
            r?.ShowTarget?.Valid &&
            ((this.__e = !0),
            Math.abs(_) < this.RelativeYawSoftMin
              ? (this.Sle.Yaw += R * this.RelativeYawSoftMin)
              : Math.abs(_) > this.RelativeYawSoftMax
                ? (this.Sle.Yaw += R * this.RelativeYawSoftMax)
                : (this.Sle.Yaw = this.Camera.CameraRotation.Yaw)),
          (t = this.h_e * this.CameraOffsetSoft);
      const c = Math.abs(t - this.AddCameraOffsetY);
      c > ARM_OFFSET_Y_SPEED * o
        ? (this.AddCameraOffsetY = MathUtils_1.MathUtils.Lerp(
            this.AddCameraOffsetY,
            t,
            (ARM_OFFSET_Y_SPEED * o) / c,
          ))
        : (this.AddCameraOffsetY = t);
      var v = MathUtils_1.MathUtils.Lerp(
          this.RelativeRotationLagRatioMin,
          this.RelativeRotationLagRatioMax,
          this.RelativeRotationLagRatioCurve.GetCurrentValue(
            (this.s_e.Size2D() - this.RelativeRotationLagDistanceRangeMin) /
              (this.RelativeRotationLagDistanceRangeMax -
                this.RelativeRotationLagDistanceRangeMin),
          ),
        ),
        d = MathUtils_1.MathUtils.Lerp(
          this.RelativeRotationLagSpeedMin,
          this.RelativeRotationLagSpeedMax,
          this.RelativeRotationLagCurve.GetCurrentValue(
            Math.abs(a) / this.RelativeRotationLagAngleRange,
          ),
        );
      MathUtils_1.MathUtils.RotatorInterpTo(
        l,
        this.Sle,
        o,
        v * d,
        this.Camera.DesiredCamera.ArmRotation,
      ),
        i &&
          (this.Camera.DesiredCamera.ArmRotation.Yaw =
            MathUtils_1.MathUtils.Clamp(
              this.Camera.DesiredCamera.ArmRotation.Yaw,
              s,
              h,
            )),
        (this.Camera.IsModifiedArmRotation = !0);
    }
  }
  UpdateShowTarget(t) {
    var i, s, h;
    !this.Camera.ContainsTag(-1150819426) ||
    (([s, h] =
      this.Camera.CharacterEntityHandle.Entity.GetComponent(
        52,
      ).GetCameraInput()),
    0 === s && 0 === h)
      ? (this.l_e.Reset(), (this.Qyn = !0))
      : ((h = -h),
        (i =
          (ModelManager_1.ModelManager.PlatformModel.IsGamepad()
            ? this.ChangeShowTargetSensitivityGamepad
            : this.ChangeShowTargetSensitivity) * t),
        s * this.l_e.X + h * this.l_e.Y <= 0
          ? ((this.Qyn = !0), this.l_e.Set(s * i, h * i))
          : ((this.l_e.X += s * i), (this.l_e.Y += h * i)),
        (s = this.l_e.SizeSquared()) >
          (this.Qyn ? FIRST_THRESHOLD_SQUARED : 1) &&
          ((h = Math.sqrt(s)),
          this.l_e.DivisionEqual(h),
          this.Camera.CharacterEntityHandle.Entity.GetComponent(
            29,
          ).ChangeShowTarget(
            this.l_e,
            this.ChangeShowTargetAngleCoefficient,
            this.ChangeShowTargetDistCoefficient,
          ),
          this.l_e.MultiplyEqual(h - (this.Qyn ? FIRST_THRESHOLD : 1)),
          (this.Qyn = !1)),
        this.l_e.MultiplyEqual(
          Math.pow(1 - this.ChangeShowTargetDamping, t * DEFAULT_FPS),
        ));
  }
  UpdateDeactivateInternal(t) {
    var i;
    void 0 !== this.AddCameraOffsetY &&
      ((i = Math.abs(0 - this.AddCameraOffsetY)) > ARM_OFFSET_Y_SPEED * t
        ? (this.AddCameraOffsetY = MathUtils_1.MathUtils.Lerp(
            this.AddCameraOffsetY,
            0,
            (ARM_OFFSET_Y_SPEED * t) / i,
          ))
        : (this.AddCameraOffsetY = void 0));
  }
  ShouldSoftUnlock() {
    var [t, i] =
      this.Camera.CharacterEntityHandle.Entity.GetComponent(
        52,
      ).GetCameraInput();
    return (
      (t *= ModelManager_1.ModelManager.PlatformModel.IsGamepad()
        ? this.SoftLockInputYawSensitivityGamepad
        : this.SoftLockInputYawSensitivity),
      (i *= ModelManager_1.ModelManager.PlatformModel.IsGamepad()
        ? this.SoftLockInputPitchSensitivityGamepad
        : this.SoftLockInputPitchSensitivity),
      Math.abs(t) > this.SoftUnlockYawSpeed ||
        Math.abs(i) > this.SoftUnlockPitchSpeed
    );
  }
}
exports.CameraFocusController = CameraFocusController;
//# sourceMappingURL=CameraFocusController.js.map
