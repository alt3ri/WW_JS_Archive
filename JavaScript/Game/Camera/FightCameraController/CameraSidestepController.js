"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraSidestepController = void 0);
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CameraUtility_1 = require("../CameraUtility"),
  FightCameraLogicComponent_1 = require("../FightCameraLogicComponent"),
  CameraControllerBase_1 = require("./CameraControllerBase");
class CameraSidestepController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.YawInterpSpeed = 0),
      (this.PitchInterpSpeed = 0),
      (this.PitchAccelerate = 0),
      (this.yce = 0),
      (this.PitchOffset = 0),
      (this.MaxYawSpeed = 0),
      (this.MaxPitch = 0),
      (this.MinPitch = 0),
      (this.MoveDurationThreshold = 1),
      (this.Tce = 0),
      (this.Lce = -0),
      (this.InputRecoverArmLengthMin = 0),
      (this.InputRecoverArmLengthMax = 0),
      (this.InputRecoverArmLengthSpeedMin = 0),
      (this.InputRecoverArmLengthSpeedMax = 0),
      (this.InputRecoverArmLengthLimit = 0),
      (this.InputRecoverArmLengthCurve = void 0),
      (this.Dce = Vector_1.Vector.Create()),
      (this.Rce = Vector_1.Vector.Create()),
      (this.y6l = Vector_1.Vector.Create()),
      (this.S6l = Vector_1.Vector.Create()),
      (this.cie = Rotator_1.Rotator.Create()),
      (this.pme = Rotator_1.Rotator.Create()),
      (this.cz = Vector_1.Vector.Create());
  }
  Name() {
    return "SidestepController";
  }
  OnInit() {
    this.SetConfigMap(1, "YawInterpSpeed"),
      this.SetConfigMap(2, "PitchInterpSpeed"),
      this.SetConfigMap(7, "PitchAccelerate"),
      this.SetConfigMap(5, "MaxPitch"),
      this.SetConfigMap(4, "MinPitch"),
      this.SetConfigMap(3, "PitchOffset"),
      this.SetConfigMap(6, "MoveDurationThreshold"),
      this.SetConfigMap(8, "MaxYawSpeed"),
      this.SetConfigMap(9, "InputRecoverArmLengthMin"),
      this.SetConfigMap(10, "InputRecoverArmLengthMax"),
      this.SetConfigMap(11, "InputRecoverArmLengthSpeedMin"),
      this.SetConfigMap(12, "InputRecoverArmLengthSpeedMax"),
      this.SetConfigMap(13, "InputRecoverArmLengthLimit"),
      this.SetCurveConfigMap(13, "InputRecoverArmLengthCurve");
  }
  UpdateInternal(t) {
    ModelManager_1.ModelManager.CameraModel.IsEnableSidestepCamera &&
      this.Camera.Character &&
      (this.Uce(t), this.Lce <= 0 || (this.Ace(t), this.Pce(t), this.xce(t)));
  }
  Uce(t) {
    this.Camera.GetCameraTargetRotator(this.cie),
      CameraUtility_1.CameraUtility.GetRotatorInGravity(this.cie, this.cie),
      CameraUtility_1.CameraUtility.GetRotatorInGravity(
        this.Camera.CurrentCamera.ArmRotation,
        this.pme,
      );
    var i = Rotator_1.Rotator.Create(0, this.cie.Yaw, 0),
      h = Rotator_1.Rotator.Create(0, this.pme.Yaw, 0);
    i.Vector(this.Rce),
      h.Vector(this.Dce),
      this.Camera.IsModifiedArmRotationPitch ||
      this.Camera.IsModifiedArmRotationYaw ||
      this.Camera.IsModifiedArmLength ||
      !this.IsCharacterMoving()
        ? ((this.Lce = 0), (this.Tce = 0))
        : ((this.Lce += t),
          (this.Tce = MathUtils_1.MathUtils.InterpTo(
            this.Tce,
            this.MaxYawSpeed,
            t,
            this.YawInterpSpeed,
          )));
  }
  Ace(t) {
    var i,
      t = this.Dce.SineAngle2D(this.Rce) * t * this.Tce;
    this.Camera.IsInNormalGravityMode()
      ? ((i = this.Camera.DesiredCamera.ArmRotation).Yaw = (i.Yaw + t) % 360)
      : CameraUtility_1.CameraUtility.AddYawInGravity(
          this.Camera.DesiredCamera.ArmRotation,
          t,
          this.Camera.DesiredCamera.ArmRotation,
        ),
      (this.Camera.IsModifiedArmRotationYaw = !0);
  }
  Pce(t) {
    var i, h, s;
    this.Lce < this.MoveDurationThreshold ||
      ((i = this.Camera.CharacterEntityHandle?.Entity?.GetComponent(175))
        ?.Valid &&
        (s = this.Camera.CharacterEntityHandle?.Entity?.GetComponent(176))
          ?.Valid &&
        (this.Camera.CharacterDriveVehicleComponent?.IsOnVehicle &&
        this.Camera.VehicleAnimationComponent?.Valid
          ? (this.y6l.FromUeVector(this.Camera.VehicleMoveComponent.GravityUp),
            this.S6l.FromUeVector(
              this.Camera.VehicleAnimationComponent.MovementNormal,
            ))
          : (this.y6l.FromUeVector(s.GravityUp),
            this.S6l.FromUeVector(i.MovementTerrainNormal)),
        CameraUtility_1.CameraUtility.GetVectorInGravity(this.y6l, this.y6l),
        CameraUtility_1.CameraUtility.GetVectorInGravity(this.S6l, this.S6l),
        (s = this.cz),
        this.y6l.CrossProduct(this.Dce, s),
        s.CrossProduct(this.S6l, s),
        (i = this.Camera.CameraRotationInGravity.Pitch),
        (s =
          MathUtils_1.MathUtils.Clamp(
            Math.atan2(
              s.Z,
              s.Size2D() + MathCommon_1.MathCommon.KindaSmallNumber,
            ) *
              MathCommon_1.MathCommon.RadToDeg -
              this.PitchOffset,
            this.MinPitch,
            this.MaxPitch,
          ) - i),
        (h = Math.abs(s)),
        (s = this.PitchInterpSpeed * s),
        (this.yce = MathUtils_1.MathUtils.InterpConstantTo(
          this.yce,
          s,
          t,
          this.PitchAccelerate,
        )),
        this.Camera.IsInNormalGravityMode()
          ? (this.Camera.DesiredCamera.ArmRotation.Pitch =
              i + MathUtils_1.MathUtils.Clamp(this.yce * t, -h, h))
          : CameraUtility_1.CameraUtility.AddPitchInGravity(
              this.Camera.DesiredCamera.ArmRotation,
              MathUtils_1.MathUtils.Clamp(this.yce * t, -h, h),
              this.Camera.DesiredCamera.ArmRotation,
            ),
        (this.Camera.IsModifiedArmRotationPitch = !0)));
  }
  IsCharacterMoving() {
    var t;
    return (
      !!this.Camera.Character &&
      !this.Camera.ContainsTag(-1371021686) &&
      !this.Camera.ContainsTag(1008164187) &&
      (this.Camera.CharacterDriveVehicleComponent?.IsOnVehicle &&
      this.Camera.VehicleMoveComponent?.Valid
        ? this.Camera.VehicleMoveComponent.Speed >
          FightCameraLogicComponent_1.CLEAN_TARGET_SPEED_THRESHOLD
        : !!(t = this.Camera.CharacterEntityHandle.Entity.GetComponent(176))
            ?.Valid &&
          t.Speed > FightCameraLogicComponent_1.CLEAN_TARGET_SPEED_THRESHOLD)
    );
  }
  xce(i) {
    if (
      this.Camera.Character?.CharacterActorComponent.Entity.GetComponent(176)
        ?.HasMoveInput ||
      !this.Camera.CharacterDriveVehicleComponent?.IsOnVehicle ||
      this.Camera.VehicleMoveComponent?.HasMoveInput
    ) {
      let t = 0;
      var h,
        s = this.Camera.GetArmLengthWithSettingAndZoom(
          this.Camera.CurrentCamera,
        ),
        e = this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera),
        r = e - this.Camera.CurrentCamera.ArmLength,
        r = this.InputRecoverArmLengthMin + r,
        e = Math.max(e, this.InputRecoverArmLengthMax),
        e =
          (s < r
            ? ((r = r - s),
              (h = MathUtils_1.MathUtils.Lerp(
                this.InputRecoverArmLengthSpeedMin,
                this.InputRecoverArmLengthSpeedMax,
                this.InputRecoverArmLengthCurve.GetCurrentValue(
                  r / this.InputRecoverArmLengthLimit,
                ),
              )),
              (t = Math.min(h * i, r)))
            : e < s &&
              ((h = s - e),
              (r = MathUtils_1.MathUtils.Lerp(
                this.InputRecoverArmLengthSpeedMin,
                this.InputRecoverArmLengthSpeedMax,
                this.InputRecoverArmLengthCurve.GetCurrentValue(
                  h / this.InputRecoverArmLengthLimit,
                ),
              )),
              (t = -Math.min(r * i, h))),
          s + t),
        r = s / this.Camera.DesiredCamera.ZoomModifier;
      this.Camera.DesiredCamera.ZoomModifier = e / r;
    }
  }
}
exports.CameraSidestepController = CameraSidestepController;
//# sourceMappingURL=CameraSidestepController.js.map
