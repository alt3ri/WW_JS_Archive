"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraModel =
    exports.SeqCameraThings =
    exports.cameraModeFree =
    exports.cameraModeOrbital =
    exports.cameraModeScene =
    exports.cameraModeSequence =
    exports.cameraModeWidget =
    exports.cameraModeLockOn =
    exports.cameraModeDefault =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Time_1 = require("../../Core/Common/Time"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../Core/Framework/ModelBase"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GameSettingsDefine_1 = require("../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../GameSettings/GameSettingsManager"),
  Global_1 = require("../Global"),
  CameraUtility_1 = require("./CameraUtility"),
  FightCamera_1 = require("./FightCamera"),
  FreeCamera_1 = require("./FreeCamera"),
  OrbitalCamera_1 = require("./OrbitalCamera"),
  SceneCamera_1 = require("./SceneCamera"),
  SequenceCamera_1 = require("./SequenceCamera"),
  WidgetCamera_1 = require("./WidgetCamera"),
  CAMERA_TICK_PRIORITY = -100,
  CAMERA_DEFAULT_SENSITIVITY = 50,
  CAMERA_MAX_SENSITIVITY = 100,
  CAMERA_MIN_SENSITIVITY = 0,
  CAMERA_DEFAULT_SENSITIVITY_MODIFIER = 1,
  CAMERA_MAX_SENSITIVITY_MODIFIER = 2,
  CAMERA_MIN_SENSITIVITY_MODIFIER = 0.1,
  MOTION_BLUR_DEFAULT_VALUE = 50,
  MOTION_BLUR_MAX_VALUE = 100,
  MOTION_BLUR_MIN_VALUE = 0,
  MOTION_BLUR_DEFAULT_MODIFIER = 0.25,
  MOTION_BLUR_MAX_MODIFIER = 0.4,
  MOTION_BLUR_MIN_MODIFIER = 0.1,
  CAMERA_DEFAULT_REVERSE = !1,
  CAMERA_ADDITION_ARM_LENGTH_VALUE_MAX = 100,
  CAMERA_ADDITION_ARM_LENGTH_VALUE_DEFAULT = 50,
  CAMERA_ADDITION_ARM_LENGTH_VALUE_MIN = 0,
  CAMERA_SHAKE_MODIFIER_MIN = 0,
  CAMERA_SHAKE_MODIFIER_MAX = 2;
(exports.cameraModeDefault = new UE.FName("KuroDefault")),
  (exports.cameraModeLockOn = new UE.FName("KuroLockOn")),
  (exports.cameraModeWidget = new UE.FName("KuroWidget")),
  (exports.cameraModeSequence = new UE.FName("KuroSequence")),
  (exports.cameraModeScene = new UE.FName("KuroScene")),
  (exports.cameraModeOrbital = new UE.FName("KuroOrbital")),
  (exports.cameraModeFree = new UE.FName("KuroFree"));
class SeqCameraThings {
  constructor() {
    (this.CameraLocation = Vector_1.Vector.Create().ToUeVector()),
      (this.CameraRotation = Rotator_1.Rotator.Create().ToUeRotator()),
      (this.CameraScale = Vector_1.Vector.Create().ToUeVector()),
      (this.OriginRootTransform = void 0),
      (this.ConstrainAspectRatio = !1),
      (this.CurrentAperture = 0),
      (this.CurrentFocalLength = 0),
      (this.FocusSettings = void 0),
      (this.LensSettings = void 0),
      (this.FieldOfView = 0);
  }
}
exports.SeqCameraThings = SeqCameraThings;
class CameraModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.AimAssistDebugDraw = !1),
      (this.CameraDebugToolEnabled = !1),
      (this.CameraDebugToolDrawRotator = !1),
      (this.CameraDebugToolDrawCameraCollision = !1),
      (this.CameraDebugToolDrawSpringArm = !1),
      (this.CameraDebugToolDrawFocusTargetLine = !1),
      (this.CameraDebugToolDrawSpringArmEdgeRange = !1),
      (this.CameraDebugToolDrawLockCameraMoveLine = !1),
      (this.CameraDebugToolDrawSettlementCamera = !1),
      (this.CameraDebugToolDrawCameraZone = !1),
      (this.CameraDebugToolDrawCameraRotator = !1),
      (this.UiCameraDebugToolEnabled = !1),
      (this.CurrentCameraActor = void 0),
      (this.CameraLocation = Vector_1.Vector.Create()),
      (this.CameraRotator = Rotator_1.Rotator.Create()),
      (this.CameraTransform = void 0),
      (this.CameraDitherStartHideDistance = 0),
      (this.NextFindStartHideDistanceTime = 0),
      (this.dhe = void 0),
      (this.Che = void 0),
      (this.ghe = 0),
      (this.fhe = void 0),
      (this.phe = void 0),
      (this.vhe = void 0),
      (this.Ut1 = void 0),
      (this.Mhe = void 0),
      (this.Ehe = new Array()),
      (this.She = new Array()),
      (this.yhe = new Array()),
      (this.Ihe = !1),
      (this.The = void 0),
      (this.Lhe = 1),
      (this.rwa = 1),
      (this.owa = new Map()),
      (this.nwa = this.rwa),
      (this.Rhe = CAMERA_DEFAULT_SENSITIVITY),
      (this.Uhe = CAMERA_DEFAULT_SENSITIVITY),
      (this.Ahe = CAMERA_DEFAULT_SENSITIVITY),
      (this.Phe = CAMERA_DEFAULT_SENSITIVITY),
      (this.IsEnableSpecificCameraSensitivity = !1),
      (this.SpecificCameraBaseYawSensitivity = 1),
      (this.SpecificCameraBasePitchSensitivity = 1),
      (this.SpecificCameraAimingYawSensitivity = 1),
      (this.SpecificCameraAimingPitchSensitivity = 1),
      (this.xhe = CAMERA_DEFAULT_REVERSE),
      (this.whe = CAMERA_DEFAULT_REVERSE),
      (this.Bhe = CAMERA_DEFAULT_REVERSE),
      (this.bhe = CAMERA_DEFAULT_REVERSE),
      (this.qhe = !0),
      (this.Ghe = MOTION_BLUR_DEFAULT_VALUE),
      (this.IsEnableResetFocus = !0),
      (this.IsEnableSidestepCamera = !0),
      (this.h6a = !0),
      (this.CameraSettingFightAdditionArmLength =
        CAMERA_ADDITION_ARM_LENGTH_VALUE_DEFAULT),
      (this.CameraSettingNormalAdditionArmLength =
        CAMERA_ADDITION_ARM_LENGTH_VALUE_DEFAULT),
      (this.Nhe = void 0),
      (this.Ohe = !0),
      (this.l6a = new Set()),
      (this.pwl = !1);
  }
  get CameraBaseYawSensitivity() {
    return this.Rhe;
  }
  get CameraBasePitchSensitivity() {
    return this.Uhe;
  }
  get CameraAimingYawSensitivity() {
    return this.Ahe;
  }
  get CameraAimingPitchSensitivity() {
    return this.Phe;
  }
  get IsEnableSoftLockCameraExternal() {
    return this.h6a;
  }
  get CameraBaseYawSensitivityInputModifier() {
    var t;
    return this.IsEnableSpecificCameraSensitivity
      ? this.SpecificCameraBaseYawSensitivity
      : ((t =
          (t = this.Rhe) < CAMERA_DEFAULT_SENSITIVITY
            ? MathUtils_1.MathUtils.RangeClamp(
                t,
                CAMERA_MIN_SENSITIVITY,
                CAMERA_DEFAULT_SENSITIVITY,
                CAMERA_MIN_SENSITIVITY_MODIFIER,
                CAMERA_DEFAULT_SENSITIVITY_MODIFIER,
              )
            : MathUtils_1.MathUtils.RangeClamp(
                t,
                CAMERA_DEFAULT_SENSITIVITY,
                CAMERA_MAX_SENSITIVITY,
                CAMERA_DEFAULT_SENSITIVITY_MODIFIER,
                CAMERA_MAX_SENSITIVITY_MODIFIER,
              )),
        this.xhe ? -t : t);
  }
  get CameraBasePitchSensitivityInputModifier() {
    var t;
    return this.IsEnableSpecificCameraSensitivity
      ? this.SpecificCameraBasePitchSensitivity
      : ((t =
          (t = this.Uhe) < CAMERA_DEFAULT_SENSITIVITY
            ? MathUtils_1.MathUtils.RangeClamp(
                t,
                CAMERA_MIN_SENSITIVITY,
                CAMERA_DEFAULT_SENSITIVITY,
                CAMERA_MIN_SENSITIVITY_MODIFIER,
                CAMERA_DEFAULT_SENSITIVITY_MODIFIER,
              )
            : MathUtils_1.MathUtils.RangeClamp(
                t,
                CAMERA_DEFAULT_SENSITIVITY,
                CAMERA_MAX_SENSITIVITY,
                CAMERA_DEFAULT_SENSITIVITY_MODIFIER,
                CAMERA_MAX_SENSITIVITY_MODIFIER,
              )),
        this.whe ? -t : t);
  }
  get CameraAimingYawSensitivityInputModifier() {
    var t;
    return this.IsEnableSpecificCameraSensitivity
      ? this.SpecificCameraAimingYawSensitivity
      : ((t =
          (t = this.Ahe) < CAMERA_DEFAULT_SENSITIVITY
            ? MathUtils_1.MathUtils.RangeClamp(
                t,
                CAMERA_MIN_SENSITIVITY,
                CAMERA_DEFAULT_SENSITIVITY,
                CAMERA_MIN_SENSITIVITY_MODIFIER,
                CAMERA_DEFAULT_SENSITIVITY_MODIFIER,
              )
            : MathUtils_1.MathUtils.RangeClamp(
                t,
                CAMERA_DEFAULT_SENSITIVITY,
                CAMERA_MAX_SENSITIVITY,
                CAMERA_DEFAULT_SENSITIVITY_MODIFIER,
                CAMERA_MAX_SENSITIVITY_MODIFIER,
              )),
        this.Bhe ? -t : t);
  }
  get CameraAimingPitchSensitivityInputModifier() {
    var t;
    return this.IsEnableSpecificCameraSensitivity
      ? this.SpecificCameraAimingPitchSensitivity
      : ((t =
          (t = this.Phe) < CAMERA_DEFAULT_SENSITIVITY
            ? MathUtils_1.MathUtils.RangeClamp(
                t,
                CAMERA_MIN_SENSITIVITY,
                CAMERA_DEFAULT_SENSITIVITY,
                CAMERA_MIN_SENSITIVITY_MODIFIER,
                CAMERA_DEFAULT_SENSITIVITY_MODIFIER,
              )
            : MathUtils_1.MathUtils.RangeClamp(
                t,
                CAMERA_DEFAULT_SENSITIVITY,
                CAMERA_MAX_SENSITIVITY,
                CAMERA_DEFAULT_SENSITIVITY_MODIFIER,
                CAMERA_MAX_SENSITIVITY_MODIFIER,
              )),
        this.bhe ? -t : t);
  }
  get IsCameraResetPitch() {
    return this.qhe;
  }
  get MotionBlurModifier() {
    return this.Ghe < MOTION_BLUR_DEFAULT_VALUE
      ? MathUtils_1.MathUtils.RangeClamp(
          this.Ghe,
          MOTION_BLUR_MIN_VALUE,
          MOTION_BLUR_DEFAULT_VALUE,
          MOTION_BLUR_MIN_MODIFIER,
          MOTION_BLUR_DEFAULT_MODIFIER,
        )
      : MathUtils_1.MathUtils.RangeClamp(
          this.Ghe,
          MOTION_BLUR_DEFAULT_VALUE,
          MOTION_BLUR_MAX_VALUE,
          MOTION_BLUR_DEFAULT_MODIFIER,
          MOTION_BLUR_MAX_MODIFIER,
        );
  }
  get CameraSettingArmLengthPercentage() {
    return this.FightCamera.LogicComponent.ContainsTag(1996802261)
      ? MathUtils_1.MathUtils.RangeClamp(
          this.CameraSettingFightAdditionArmLength,
          CAMERA_ADDITION_ARM_LENGTH_VALUE_MIN,
          CAMERA_ADDITION_ARM_LENGTH_VALUE_MAX,
          0,
          1,
        )
      : MathUtils_1.MathUtils.RangeClamp(
          this.CameraSettingNormalAdditionArmLength,
          CAMERA_ADDITION_ARM_LENGTH_VALUE_MIN,
          CAMERA_ADDITION_ARM_LENGTH_VALUE_MAX,
          0,
          1,
        );
  }
  get AimAssistMode() {
    return this.nwa;
  }
  get FightCamera() {
    return this.dhe;
  }
  get SequenceCamera() {
    return this.Che;
  }
  get CurSeqCameraIndex() {
    return this.ghe;
  }
  get WidgetCamera() {
    return this.fhe;
  }
  get SceneCamera() {
    return this.phe;
  }
  get OrbitalCamera() {
    return this.vhe;
  }
  get FreeCamera() {
    return this.Ut1;
  }
  get CameraMode() {
    return this.Mhe;
  }
  get ShakeModify() {
    return this.Lhe;
  }
  get FightCameraFinalDistance() {
    return this.FightCamera?.LogicComponent?.FinalCameraDistance ?? 0;
  }
  get FirstPersonEnabled() {
    return this.pwl;
  }
  set FirstPersonEnabled(t) {
    this.pwl !== t &&
      ((this.pwl = t)
        ? this.FightCamera?.LogicComponent?.Character?.CharRenderingComponent?.SetDitherApplyHeadsOnly()
        : this.FightCamera?.LogicComponent?.Character?.CharRenderingComponent?.SetDitherApplyAll());
  }
  SetCameraShakeModify(t) {
    this.Lhe = MathUtils_1.MathUtils.Clamp(
      t,
      CAMERA_SHAKE_MODIFIER_MIN,
      CAMERA_SHAKE_MODIFIER_MAX,
    );
  }
  SetCameraMode(t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.CameraModeChanged,
      t,
      this.Mhe,
    ),
      (this.Mhe = t),
      Global_1.Global.CharacterController.ClientSetCameraMode(
        CameraUtility_1.CameraUtility.GetCameraMode(t),
      );
  }
  RefreshAimAssetMode() {
    if (0 === this.owa.size) this.nwa = this.rwa;
    else {
      this.nwa = 0;
      for (var [, t] of this.owa) this.nwa = Math.max(this.nwa, t);
    }
  }
  SetAimAssistMode(t) {
    (this.rwa = t), this.RefreshAimAssetMode();
  }
  SetAimAssistModeWithKey(t, e) {
    this.owa.set(t, e), this.RefreshAimAssetMode();
  }
  ClearAimAssistModeWithKey(t) {
    this.owa.delete(t), this.RefreshAimAssetMode();
  }
  SetIsCameraResetPitch(t) {
    this.qhe = t;
  }
  SetCameraBaseYawSensitivity(t) {
    this.Rhe = MathUtils_1.MathUtils.Clamp(
      t,
      CAMERA_MIN_SENSITIVITY,
      CAMERA_MAX_SENSITIVITY,
    );
  }
  SetCameraBasePitchSensitivity(t) {
    this.Uhe = MathUtils_1.MathUtils.Clamp(
      t,
      CAMERA_MIN_SENSITIVITY,
      CAMERA_MAX_SENSITIVITY,
    );
  }
  SetCameraAimingYawSensitivity(t) {
    this.Ahe = MathUtils_1.MathUtils.Clamp(
      t,
      CAMERA_MIN_SENSITIVITY,
      CAMERA_MAX_SENSITIVITY,
    );
  }
  SetCameraAimingPitchSensitivity(t) {
    this.Phe = MathUtils_1.MathUtils.Clamp(
      t,
      CAMERA_MIN_SENSITIVITY,
      CAMERA_MAX_SENSITIVITY,
    );
  }
  SetCameraBaseYawReverse(t) {
    this.xhe = t;
  }
  SetCameraBasePitchReverse(t) {
    this.whe = t;
  }
  SetCameraAimingYawReverse(t) {
    this.Bhe = t;
  }
  SetCameraAimingPitchReverse(t) {
    this.bhe = t;
  }
  SetMotionBlurValue(t) {
    (this.Ghe = MathUtils_1.MathUtils.Clamp(
      t,
      MOTION_BLUR_MIN_VALUE,
      MOTION_BLUR_MAX_VALUE,
    )),
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(
        GameSettingsDefine_1.EFunction.MOTIONBLUR,
        this.Ghe,
        0,
      );
  }
  get Blending() {
    return this.Ihe;
  }
  SetBlending(t) {
    this.Ihe = t;
  }
  get BlendTimerId() {
    return this.The;
  }
  SetBlendTimerId(t) {
    this.The = t;
  }
  EnableMode(t) {
    this.Ehe[t] = !0;
  }
  DisableMode(t) {
    this.Ehe[t] = !1;
  }
  IsModeEnabled(t) {
    return this.Ehe[t];
  }
  GetNextMode() {
    for (const t of this.She) if (this.Ehe[t]) return t;
    return 0;
  }
  IsInHigherMode(t) {
    return this.yhe[this.CameraMode] > this.yhe[t];
  }
  SetAimAssistEnable(t) {
    this.Ohe = t;
  }
  GetAimAssistEnable() {
    return this.Ohe;
  }
  EnableSoftLock(t) {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Camera", 57, "开启软锁状态", ["reason", t]),
      this.l6a.add(++CameraModel._6a),
      CameraModel._6a
    );
  }
  DisableSoftLock(t, e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Camera", 57, "关闭软锁状态", ["reason", e]),
      this.l6a.has(t) && this.l6a.delete(t);
  }
  SetSettingSoftLockState(t) {
    this.h6a = t;
  }
  IsSoftLockEnable() {
    return this.h6a || 0 < this.l6a.size;
  }
  OnInit() {
    (this.Che = EntitySystem_1.EntitySystem.Create(
      SequenceCamera_1.SequenceCamera,
      CAMERA_TICK_PRIORITY,
    )),
      EntitySystem_1.EntitySystem.Init(this.Che),
      EntitySystem_1.EntitySystem.Start(this.Che),
      EntitySystem_1.EntitySystem.Activate(this.Che),
      EntitySystem_1.EntitySystem.PostActive(this.Che),
      this.Che.SetTimeDilation(Time_1.Time.TimeDilation),
      (this.dhe = EntitySystem_1.EntitySystem.Create(
        FightCamera_1.FightCamera,
        CAMERA_TICK_PRIORITY,
      )),
      EntitySystem_1.EntitySystem.Init(this.dhe),
      EntitySystem_1.EntitySystem.Start(this.dhe),
      EntitySystem_1.EntitySystem.Activate(this.dhe),
      EntitySystem_1.EntitySystem.PostActive(this.dhe),
      this.dhe.SetTimeDilation(Time_1.Time.TimeDilation),
      (this.fhe = EntitySystem_1.EntitySystem.Create(
        WidgetCamera_1.WidgetCamera,
        CAMERA_TICK_PRIORITY,
      )),
      EntitySystem_1.EntitySystem.Init(this.fhe),
      EntitySystem_1.EntitySystem.Start(this.fhe),
      EntitySystem_1.EntitySystem.Activate(this.fhe),
      EntitySystem_1.EntitySystem.PostActive(this.fhe),
      this.fhe.SetTimeDilation(Time_1.Time.TimeDilation),
      (this.phe = EntitySystem_1.EntitySystem.Create(
        SceneCamera_1.SceneCamera,
        CAMERA_TICK_PRIORITY,
      )),
      EntitySystem_1.EntitySystem.Init(this.phe),
      EntitySystem_1.EntitySystem.Start(this.phe),
      EntitySystem_1.EntitySystem.Activate(this.phe),
      EntitySystem_1.EntitySystem.PostActive(this.phe),
      this.phe.SetTimeDilation(Time_1.Time.TimeDilation),
      (this.vhe = EntitySystem_1.EntitySystem.Create(
        OrbitalCamera_1.OrbitalCamera,
        CAMERA_TICK_PRIORITY,
      )),
      EntitySystem_1.EntitySystem.Init(this.vhe),
      EntitySystem_1.EntitySystem.Start(this.vhe),
      EntitySystem_1.EntitySystem.Activate(this.vhe),
      EntitySystem_1.EntitySystem.PostActive(this.vhe),
      this.vhe.SetTimeDilation(Time_1.Time.TimeDilation),
      (Global_1.Global.CharacterCameraManager.CameraModifyCustomTimeDilation =
        Time_1.Time.TimeDilation),
      (this.CameraTransform = new UE.TransformDouble());
    for (let t = 0; t < 6; ++t) this.Ehe.push(!1), this.yhe.push(0);
    (this.Ehe[0] = !0),
      this.She.push(1),
      this.She.push(2),
      this.She.push(3),
      this.She.push(4),
      this.She.push(5),
      this.She.push(0);
    for (let t = 0; t < this.She.length; ++t)
      this.yhe[this.She[t]] = this.She.length - t;
    return (
      (this.Nhe = void 0),
      this.dhe.Valid &&
        this.Che.Valid &&
        this.fhe.Valid &&
        this.phe.Valid &&
        this.vhe.Valid
    );
  }
  OnClear() {
    Global_1.Global.CharacterCameraManager.CameraModifyCustomTimeDilation = 1;
    var t = EntitySystem_1.EntitySystem.Destroy(this.dhe);
    return (
      (this.dhe = void 0),
      (t &&= EntitySystem_1.EntitySystem.Destroy(this.Che)),
      (this.Che = void 0),
      (t &&= EntitySystem_1.EntitySystem.Destroy(this.fhe)),
      (this.fhe = void 0),
      (t &&= EntitySystem_1.EntitySystem.Destroy(this.phe)),
      (this.phe = void 0),
      (t &&= EntitySystem_1.EntitySystem.Destroy(this.vhe)),
      (this.vhe = void 0),
      (t &&= this.DestroyFreeCamera()),
      (this.CameraTransform = void 0),
      (this.Nhe = void 0),
      t
    );
  }
  SaveSeqCamera() {
    this.Nhe = this.SequenceCamera?.PlayerComponent?.SaveSeqCamera();
  }
  GetSavedSeqCameraThings() {
    return this.Nhe;
  }
  ResetSavedSeqCameraThings() {
    this.Nhe = void 0;
  }
  IsToLockOnCameraMode() {
    return 0 === this.CameraMode;
  }
  IsToSceneCameraMode() {
    return 3 === this.CameraMode;
  }
  CreateFreeCamera() {
    return (
      (this.Ut1 = EntitySystem_1.EntitySystem.Create(
        FreeCamera_1.FreeCamera,
        CAMERA_TICK_PRIORITY,
      )),
      EntitySystem_1.EntitySystem.Init(this.Ut1),
      EntitySystem_1.EntitySystem.Start(this.Ut1),
      EntitySystem_1.EntitySystem.Activate(this.Ut1),
      EntitySystem_1.EntitySystem.PostActive(this.Ut1),
      this.Ut1.SetTimeDilation(Time_1.Time.TimeDilation),
      this.Ut1.Valid
    );
  }
  DestroyFreeCamera() {
    var t;
    return (
      !this.Ut1 ||
      ((t = EntitySystem_1.EntitySystem.Destroy(this.Ut1)),
      (this.Ut1 = void 0),
      t)
    );
  }
}
(exports.CameraModel = CameraModel)._6a = 0;
//# sourceMappingURL=CameraModel.js.map
