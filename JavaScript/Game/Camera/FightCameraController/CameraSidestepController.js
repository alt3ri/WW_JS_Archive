"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraSidestepController = void 0);
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const FightCameraLogicComponent_1 = require("../FightCameraLogicComponent");
const CameraControllerBase_1 = require("./CameraControllerBase");
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
      (this.Rce = Vector_1.Vector.Create());
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
    const i = Rotator_1.Rotator.Create(0, this.Camera.PlayerRotator.Yaw, 0);
    const h = Rotator_1.Rotator.Create(
      0,
      this.Camera.CurrentCamera.ArmRotation.Yaw,
      0,
    );
    i.Vector(this.Rce),
      h.Vector(this.Dce),
      this.Camera.IsModifiedArmRotation ||
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
    var t = this.Dce.SineAngle2D(this.Rce) * t * this.Tce;
    const i = this.Camera.DesiredCamera.ArmRotation;
    (i.Yaw = (i.Yaw + t) % 360), (this.Camera.IsModifiedArmRotation = !0);
  }
  Pce(t) {
    let i, h, s;
    this.Lce < this.MoveDurationThreshold ||
      ((s = this.Camera.CharacterEntityHandle?.Entity?.GetComponent(160)) &&
        ((s = s.MovementTerrainNormal),
        (s = Vector_1.Vector.Create(0, 0, 1)
          .CrossProductEqual(this.Dce)
          .CrossProductEqual(s)),
        (i = MathUtils_1.MathUtils.WrapAngle(
          this.Camera.DesiredCamera.ArmRotation.Pitch,
        )),
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
        (this.Camera.DesiredCamera.ArmRotation.Pitch =
          i + MathUtils_1.MathUtils.Clamp(this.yce * t, -h, h)),
        (this.Camera.IsModifiedArmRotation = !0)));
  }
  IsCharacterMoving() {
    let t;
    return (
      !!this.Camera.Character &&
      void 0 !==
        (t = this.Camera.CharacterEntityHandle.Entity.GetComponent(161)) &&
      t.Valid &&
      t.Speed > FightCameraLogicComponent_1.CLEAN_TARGET_SPEED_THRESHOLD &&
      !this.Camera.ContainsTag(-1371021686) &&
      !this.Camera.ContainsTag(1008164187)
    );
  }
  xce(i) {
    var h =
      this.Camera.Character?.CharacterActorComponent.Entity.GetComponent(161);
    if (h && h.HasMoveInput) {
      let t = 0;
      let s;
      var h = this.Camera.GetArmLengthWithSettingAndZoom(
        this.Camera.CurrentCamera,
      );
      var e = this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera);
      var r = e - this.Camera.CurrentCamera.ArmLength;
      var r = this.InputRecoverArmLengthMin + r;
      var e = Math.max(e, this.InputRecoverArmLengthMax);
      var e =
        (h < r
          ? ((r = r - h),
            (s = MathUtils_1.MathUtils.Lerp(
              this.InputRecoverArmLengthSpeedMin,
              this.InputRecoverArmLengthSpeedMax,
              this.InputRecoverArmLengthCurve.GetCurrentValue(
                r / this.InputRecoverArmLengthLimit,
              ),
            )),
            (t = Math.min(s * i, r)))
          : e < h &&
            ((s = h - e),
            (r = MathUtils_1.MathUtils.Lerp(
              this.InputRecoverArmLengthSpeedMin,
              this.InputRecoverArmLengthSpeedMax,
              this.InputRecoverArmLengthCurve.GetCurrentValue(
                s / this.InputRecoverArmLengthLimit,
              ),
            )),
            (t = -Math.min(r * i, s))),
        h + t);
      var r = h / this.Camera.DesiredCamera.ZoomModifier;
      this.Camera.DesiredCamera.ZoomModifier = e / r;
    }
  }
}
exports.CameraSidestepController = CameraSidestepController;
// # sourceMappingURL=CameraSidestepController.js.map
