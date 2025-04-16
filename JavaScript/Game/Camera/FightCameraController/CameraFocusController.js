"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraFocusController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GravityUtils_1 = require("../../Utils/GravityUtils"),
  CameraUtility_1 = require("../CameraUtility"),
  CameraControllerBase_1 = require("./CameraControllerBase"),
  ARM_OFFSET_Y_SPEED = 100,
  DEFAULT_FPS = 60,
  FIRST_THRESHOLD = 0.5,
  FIRST_THRESHOLD_SQUARED = FIRST_THRESHOLD * FIRST_THRESHOLD;
class CameraFocusController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.RelativeRotationLagYawSpeedMin = 0),
      (this.RelativeRotationLagYawSpeedMax = 0),
      (this.RelativeRotationLagYawAngleRange = 0),
      (this.RelativeRotationLagYawCurve = void 0),
      (this.RelativeRotationLagPitchSpeedMin = 0),
      (this.RelativeRotationLagPitchSpeedMax = 0),
      (this.RelativeRotationLagPitchAngleRange = 0),
      (this.RelativeRotationLagPitchCurve = void 0),
      (this.RelativeRotationLagRatioMin = 0),
      (this.RelativeRotationLagRatioMax = 0),
      (this.RelativeRotationLagDistanceRangeMin = 0),
      (this.RelativeRotationLagDistanceRangeMax = 0),
      (this.RelativeRotationLagRatioCurve = void 0),
      (this.YawSignAdaptionOn = 0),
      (this.YawSignAdaptionThreshold = 0),
      (this.YawSignAdaptionCooldown = 0),
      (this.YawSignAdaptionDistanceThreshold = 0),
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
      (this.SoftUnlockInputTime = 0),
      (this.SoftUnlockInputYawMinSpeed = 0),
      (this.SoftUnlockInputPitchMinSpeed = 0),
      (this.YKa = 0),
      (this.Gue = Rotator_1.Rotator.Create()),
      (this.xzi = Vector_1.Vector.Create()),
      (this.Ele = Rotator_1.Rotator.Create()),
      (this.a_e = !1),
      (this.FocusLimitLength = 0),
      (this.FocusLimitPitchSpeed = 0),
      (this.FocusLimitYawSpeed = 0),
      (this.h_e = 0),
      (this.AddCameraOffsetY = void 0),
      (this.l_e = Vector2D_1.Vector2D.Create()),
      (this.dTn = !0),
      (this.Iic = 0),
      (this.BJe = (t, i, s) => {
        var h = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
        t === h?.Id &&
          (t = h.GetComponent(39))?.Valid &&
          t.CurrentSkill?.SkillInfo.IsLockOn &&
          this.KJa();
      });
  }
  Name() {
    return "FocusController";
  }
  OnInit() {
    this.SetConfigMap(1, "RelativeRotationLagYawSpeedMin"),
      this.SetConfigMap(2, "RelativeRotationLagYawSpeedMax"),
      this.SetConfigMap(3, "RelativeRotationLagYawAngleRange"),
      this.SetCurveConfigMap(3, "RelativeRotationLagYawCurve"),
      this.SetConfigMap(34, "RelativeRotationLagPitchSpeedMin"),
      this.SetConfigMap(35, "RelativeRotationLagPitchSpeedMax"),
      this.SetConfigMap(36, "RelativeRotationLagPitchAngleRange"),
      this.SetCurveConfigMap(36, "RelativeRotationLagPitchCurve"),
      this.SetConfigMap(28, "RelativeRotationLagRatioMin"),
      this.SetConfigMap(29, "RelativeRotationLagRatioMax"),
      this.SetConfigMap(31, "RelativeRotationLagDistanceRangeMin"),
      this.SetConfigMap(30, "RelativeRotationLagDistanceRangeMax"),
      this.SetCurveConfigMap(30, "RelativeRotationLagRatioCurve"),
      this.SetConfigMap(4, "YawSignAdaptionOn"),
      this.SetConfigMap(5, "YawSignAdaptionThreshold"),
      this.SetConfigMap(6, "YawSignAdaptionCooldown"),
      this.SetConfigMap(40, "YawSignAdaptionDistanceThreshold"),
      this.SetConfigMap(7, "RelativeYawSoftMin"),
      this.SetConfigMap(8, "RelativeYawSoftMax"),
      this.SetConfigMap(37, "SoftUnlockInputTime"),
      this.SetConfigMap(38, "SoftUnlockInputYawMinSpeed"),
      this.SetConfigMap(39, "SoftUnlockInputPitchMinSpeed"),
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
        57,
        `锁定镜头配置错误，强锁定-镜头偏角最小值${this.RelativeYawHardMin}不在0-180之间或者大于强锁定-镜头偏角最大值` +
          this.RelativeYawHardMax,
      ),
      (this.RelativeYawHardMax < 0 ||
        180 < this.RelativeYawHardMax ||
        this.RelativeYawHardMax < this.RelativeYawHardMin) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Controller",
          57,
          `锁定镜头配置错误，强锁定-镜头偏角最大值${this.RelativeYawHardMax}不在0-180之间或者小于强锁定-镜头偏角最小值` +
            this.RelativeYawHardMin,
        ),
      (this.RelativePitchHardMin < 0 ||
        180 < this.RelativePitchHardMin ||
        this.RelativePitchHardMin > this.RelativePitchHardMax) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Controller",
          57,
          `锁定镜头配置错误，强锁定-镜头俯仰角最小值${this.RelativePitchHardMin}不在0-180之间或者大于强锁定-镜头俯仰角最大值` +
            this.RelativePitchHardMax,
        ),
      (this.RelativePitchHardMax < 0 ||
        180 < this.RelativePitchHardMax ||
        this.RelativePitchHardMax < this.RelativePitchHardMin) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Controller",
          57,
          `锁定镜头配置错误，强锁定-镜头俯仰角最大值${this.RelativePitchHardMax}不在0-180之间或者小于强锁定-镜头俯仰角最小值` +
            this.RelativePitchHardMin,
        ),
      this.Camera.CameraAutoController.EnableForce(this),
      this.Camera.CameraSidestepController.Lock(this),
      (this.AddCameraOffsetY = 0),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharUseSkill,
        this.BJe,
      );
  }
  InitFocusData(t, i, s, h) {
    0 !== h &&
      ((this.a_e = t),
      (this.FocusLimitLength = h),
      (this.FocusLimitPitchSpeed = s),
      (this.FocusLimitYawSpeed = i));
  }
  OnDisable() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CharUseSkill,
      this.BJe,
    ),
      (this.a_e = !1),
      this.Camera.CameraAutoController.DisableForce(this),
      this.Camera.CameraSidestepController.Unlock(this),
      (this.h_e = 0),
      (this.Iic = 0),
      this.l_e.Reset();
  }
  UpdateCustomEnableCondition() {
    return (
      !!this.Camera.TargetEntity &&
      (!this.a_e || this.Camera.CharacterEntityHandle.IsInit)
    );
  }
  UpdateInternal(t) {
    this.iza(t), this.rza(t), this.oza(t);
  }
  iza(t) {
    var i, s;
    this.Camera.TargetEntity &&
      this.Camera.IsTargetLocationValid &&
      (([i, s] =
        this.Camera.CharacterEntityHandle.Entity.GetComponent(
          61,
        ).GetCameraInput()),
      (i *= Info_1.Info.IsInGamepad()
        ? this.SoftLockInputYawSensitivityGamepad
        : this.SoftLockInputYawSensitivity),
      (s *= Info_1.Info.IsInGamepad()
        ? this.SoftLockInputPitchSensitivityGamepad
        : this.SoftLockInputPitchSensitivity),
      (Math.abs(i) > this.SoftUnlockInputYawMinSpeed ||
        Math.abs(s) > this.SoftUnlockInputPitchMinSpeed) &&
        (this.YKa = this.SoftUnlockInputTime),
      this.YKa <= 0 || (this.YKa -= t));
  }
  rza(t) {
    var i, s, h, e, a;
    this.Camera.TargetEntity &&
      this.Camera.IsTargetLocationValid &&
      ((this.Camera.IsModifiedArmRotationPitch &&
        this.Camera.IsModifiedArmRotationYaw) ||
        (([i, s] =
          this.Camera.CharacterEntityHandle.Entity.GetComponent(
            61,
          ).GetCameraInput()),
        (e =
          !(h = this.Camera.ContainsAnyTag([-1150819426, 1260125908])) &&
          ModelManager_1.ModelManager.CameraModel.IsSoftLockEnable() &&
          !this.ShouldSoftUnlock() &&
          !this.CanMoveCameraInSoftLock()),
        (a = this.Camera.PlayerLocation),
        this.Camera.TargetLocation.Subtraction(a, this.xzi),
        this.Mtl(t, h, e, i),
        this.Stl(t, h, e, s)));
  }
  Mtl(t, l, i, _) {
    if (!this.Camera.IsModifiedArmRotationYaw) {
      (this.Camera.IsModifiedArmRotationYaw = !0),
        void 0 === this.AddCameraOffsetY && (this.AddCameraOffsetY = 0);
      let h = 0,
        e = !1,
        a = 0,
        o = 0,
        n =
          ((this.Ele.Yaw =
            Math.atan2(this.xzi.Y, this.xzi.X) *
            MathUtils_1.MathUtils.RadToDeg),
          MathUtils_1.MathUtils.WrapAngle(
            this.Camera.CameraRotation.Yaw - this.Ele.Yaw,
          )),
        r = 0 <= n ? 1 : -1;
      this.xzi.Rotation(this.Gue);
      var M = GravityUtils_1.GravityUtils.GetRotatorInGravity(
          this.Gue,
          this.Camera.GravityInverseQuat,
          this.Gue,
        ).Yaw,
        s = GravityUtils_1.GravityUtils.GetRotatorInGravity(
          this.Camera.CameraRotation,
          this.Camera.GravityInverseQuat,
          this.Gue,
        ).Yaw,
        v = GravityUtils_1.GravityUtils.GetRotatorInGravity(
          this.Camera.CurrentCamera.ArmRotation,
          this.Camera.GravityInverseQuat,
          this.Gue,
        ).Yaw;
      if (
        (this.Camera.IsInNormalGravityMode() ||
          ((this.Ele.Yaw = M),
          (n = MathUtils_1.MathUtils.WrapAngle(s - M)),
          (r = 0 <= n ? 1 : -1)),
        l)
      ) {
        if (this.YawSignAdaptionOn) {
          let t = 0;
          var M = _,
            l =
              0 <=
              (M *= Info_1.Info.IsInGamepad()
                ? this.HardLockInputYawSensitivityGamepad
                : this.HardLockInputYawSensitivity)
                ? 1
                : -1;
          0 === this.h_e && ((this.h_e = r), (this.Iic = Time_1.Time.Now)),
            Time_1.Time.Now > this.Iic + this.YawSignAdaptionCooldown &&
              this.h_e !== r &&
              ((this.h_e = r), (this.Iic = Time_1.Time.Now));
          let i = 0,
            s = 180;
          if (
            (MathUtils_1.MathUtils.Square(
              this.YawSignAdaptionDistanceThreshold,
            ) < this.xzi.SizeSquared() &&
              ((i = this.RelativeYawHardMin), (s = this.RelativeYawHardMax)),
            Math.abs(n) < i)
          )
            (t += this.h_e * i), l === r && (t += M);
          else if (Math.abs(n) > s) (t += this.h_e * s), l !== r && (t += M);
          else {
            const S = n + M;
            r * S < 0 &&
              (r === l &&
                180 !== s &&
                ((_ = MathUtils_1.MathUtils.WrapAngle(
                  this.Ele.Yaw + this.h_e * s,
                )),
                (M = MathUtils_1.MathUtils.WrapAngle(
                  this.Ele.Yaw + this.h_e * i,
                )),
                (o = Math.max(M, _)),
                (a = Math.min(M, _)),
                (e = !0)),
              r !== l) &&
              0 !== i &&
              ((M = MathUtils_1.MathUtils.WrapAngle(
                this.Ele.Yaw + this.h_e * s,
              )),
              (_ = MathUtils_1.MathUtils.WrapAngle(
                this.Ele.Yaw + this.h_e * i,
              )),
              (o = Math.max(_, M)),
              (a = Math.min(_, M)),
              (e = !0)),
              (t += S);
          }
          (t = MathUtils_1.MathUtils.Clamp(t, n - 179, n + 179)),
            (this.Ele.Yaw = MathUtils_1.MathUtils.WrapAngle(this.Ele.Yaw + t)),
            (h = r * this.CameraOffset);
        }
      } else
        i
          ? (l = this.Camera.CharacterEntityHandle.Entity.GetComponent(32)) &&
            l?.ShowTarget?.Valid &&
            (Math.abs(n) < this.RelativeYawSoftMin
              ? (this.Ele.Yaw += r * this.RelativeYawSoftMin)
              : Math.abs(n) > this.RelativeYawSoftMax
                ? (this.Ele.Yaw += r * this.RelativeYawSoftMax)
                : (this.Ele.Yaw = s))
          : (this.Ele.Yaw = v),
          (h = r * this.CameraOffsetSoft);
      const S = Math.abs(h - this.AddCameraOffsetY);
      S > ARM_OFFSET_Y_SPEED * t
        ? (this.AddCameraOffsetY = MathUtils_1.MathUtils.Lerp(
            this.AddCameraOffsetY,
            h,
            (ARM_OFFSET_Y_SPEED * t) / S,
          ))
        : (this.AddCameraOffsetY = h);
      (_ = MathUtils_1.MathUtils.Lerp(
        this.RelativeRotationLagRatioMin,
        this.RelativeRotationLagRatioMax,
        this.RelativeRotationLagRatioCurve.GetCurrentValue(
          (this.xzi.Size2D() - this.RelativeRotationLagDistanceRangeMin) /
            (this.RelativeRotationLagDistanceRangeMax -
              this.RelativeRotationLagDistanceRangeMin),
        ),
      )),
        (M = MathUtils_1.MathUtils.Lerp(
          this.RelativeRotationLagYawSpeedMin,
          this.RelativeRotationLagYawSpeedMax,
          this.RelativeRotationLagYawCurve.GetCurrentValue(
            Math.abs(n) / this.RelativeRotationLagYawAngleRange,
          ),
        ));
      this.Camera.IsInNormalGravityMode()
        ? (this.Camera.DesiredCamera.ArmRotation.Yaw =
            MathUtils_1.MathUtils.RotatorAxisInterpTo(
              this.Camera.CurrentCamera.ArmRotation.Yaw,
              this.Ele.Yaw,
              t,
              _ * M,
            ))
        : CameraUtility_1.CameraUtility.SetYawInGravity(
            this.Camera.DesiredCamera.ArmRotation,
            MathUtils_1.MathUtils.RotatorAxisInterpTo(
              v,
              this.Ele.Yaw,
              t,
              _ * M,
            ),
            this.Camera.DesiredCamera.ArmRotation,
          ),
        e &&
          (this.Camera.DesiredCamera.ArmRotation.Yaw =
            MathUtils_1.MathUtils.Clamp(
              this.Camera.DesiredCamera.ArmRotation.Yaw,
              a,
              o,
            ));
    }
  }
  Stl(t, h, e, a) {
    if (!this.Camera.IsModifiedArmRotationPitch) {
      (this.Camera.IsModifiedArmRotationPitch = !0),
        (this.Ele.Pitch = this.Camera.AdjustPitch(this.xzi));
      let i = MathUtils_1.MathUtils.WrapAngle(
          this.Camera.CameraRotation.Pitch - this.Ele.Pitch,
        ),
        s = 0 <= i ? 1 : -1;
      var o = GravityUtils_1.GravityUtils.GetRotatorInGravity(
          this.Camera.CameraRotation,
          this.Camera.GravityInverseQuat,
          this.Gue,
        ).Pitch,
        n = GravityUtils_1.GravityUtils.GetRotatorInGravity(
          this.Camera.CurrentCamera.ArmRotation,
          this.Camera.GravityInverseQuat,
          this.Gue,
        ).Pitch;
      if (
        (this.Camera.IsInNormalGravityMode() ||
          ((i = MathUtils_1.MathUtils.WrapAngle(o - this.Ele.Pitch)),
          (s = 0 <= i ? 1 : -1)),
        h)
      ) {
        if (this.YawSignAdaptionOn) {
          let t = 0;
          (o = a),
            (h =
              0 <=
              (o = -(o *= Info_1.Info.IsInGamepad()
                ? this.HardLockInputPitchSensitivityGamepad
                : this.HardLockInputPitchSensitivity))
                ? 1
                : -1);
          Math.abs(i) < this.RelativePitchHardMin
            ? ((t += s * this.RelativePitchHardMin), h === s && (t += o))
            : Math.abs(i) > this.RelativePitchHardMax
              ? ((t += s * this.RelativePitchHardMax), h !== s && (t += o))
              : ((a = i + o), (t += a)),
            (t = MathUtils_1.MathUtils.Clamp(t, i - 179, i + 179)),
            (this.Ele.Pitch = MathUtils_1.MathUtils.WrapAngle(
              this.Ele.Pitch + t,
            ));
        }
      } else
        e ||
          (this.Camera.IsInNormalGravityMode()
            ? (this.Ele.Pitch = this.Camera.CurrentCamera.ArmRotation.Pitch)
            : (this.Ele.Pitch = n));
      h = MathUtils_1.MathUtils.Lerp(
        this.RelativeRotationLagPitchSpeedMin,
        this.RelativeRotationLagPitchSpeedMax,
        this.RelativeRotationLagPitchCurve.GetCurrentValue(
          Math.abs(i) / this.RelativeRotationLagPitchAngleRange,
        ),
      );
      this.Camera.IsInNormalGravityMode()
        ? (this.Camera.DesiredCamera.ArmRotation.Pitch =
            MathUtils_1.MathUtils.RotatorAxisInterpTo(
              this.Camera.CurrentCamera.ArmRotation.Pitch,
              this.Ele.Pitch,
              t,
              h,
            ))
        : CameraUtility_1.CameraUtility.SetPitchInGravity(
            this.Camera.DesiredCamera.ArmRotation,
            MathUtils_1.MathUtils.RotatorAxisInterpTo(n, this.Ele.Pitch, t, h),
            this.Camera.DesiredCamera.ArmRotation,
          );
    }
  }
  oza(t) {
    var i, s, h;
    !this.Camera.ContainsTag(-1150819426) ||
    (([s, h] =
      this.Camera.CharacterEntityHandle.Entity.GetComponent(
        61,
      ).GetCameraInput()),
    0 === s && 0 === h)
      ? (this.l_e.Reset(), (this.dTn = !0))
      : ((h = -h),
        (i =
          (Info_1.Info.IsInGamepad()
            ? this.ChangeShowTargetSensitivityGamepad
            : this.ChangeShowTargetSensitivity) * t),
        s * this.l_e.X + h * this.l_e.Y <= 0
          ? ((this.dTn = !0), this.l_e.Set(s * i, h * i))
          : ((this.l_e.X += s * i), (this.l_e.Y += h * i)),
        (s = this.l_e.SizeSquared()) >
          (this.dTn ? FIRST_THRESHOLD_SQUARED : 1) &&
          ((h = Math.sqrt(s)),
          this.l_e.DivisionEqual(h),
          this.Camera.CharacterEntityHandle.Entity.GetComponent(
            32,
          ).ChangeShowTarget(
            this.l_e,
            this.ChangeShowTargetAngleCoefficient,
            this.ChangeShowTargetDistCoefficient,
          ),
          this.l_e.MultiplyEqual(h - (this.dTn ? FIRST_THRESHOLD : 1)),
          (this.dTn = !1)),
        this.l_e.MultiplyEqual(
          Math.pow(1 - this.ChangeShowTargetDamping, t * DEFAULT_FPS),
        ));
  }
  UpdateDeactivateInternal(t) {
    var i;
    this.KJa(),
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
        61,
      ).GetCameraInput();
    return (
      (t *= Info_1.Info.IsInGamepad()
        ? this.SoftLockInputYawSensitivityGamepad
        : this.SoftLockInputYawSensitivity),
      (i *= Info_1.Info.IsInGamepad()
        ? this.SoftLockInputPitchSensitivityGamepad
        : this.SoftLockInputPitchSensitivity),
      Math.abs(t) > this.SoftUnlockYawSpeed ||
        Math.abs(i) > this.SoftUnlockPitchSpeed
    );
  }
  CanMoveCameraInSoftLock() {
    return 0 < this.YKa;
  }
  KJa() {
    this.YKa = 0;
  }
}
exports.CameraFocusController = CameraFocusController;
//# sourceMappingURL=CameraFocusController.js.map
