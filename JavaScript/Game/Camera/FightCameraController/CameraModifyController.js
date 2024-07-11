"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraModifyController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const CameraUtility_1 = require("../CameraUtility");
const FightCameraLogicComponent_1 = require("../FightCameraLogicComponent");
const CameraControllerBase_1 = require("./CameraControllerBase");
const MODIFY_SMALL_LENGTH = 1;
const MODIFY_ZOOM_MODIFIER_LAG_SPEED = 8;
class CameraFadeOutData {
  constructor() {
    (this.ModifyArmLength = !1),
      (this.StartArmLength = 0),
      (this.ArmLength = 0),
      (this.ModifyCameraOffset = !1),
      (this.StartCameraOffset = Vector_1.Vector.Create()),
      (this.CameraOffset = Vector_1.Vector.Create()),
      (this.ModifyZoomModifier = !1),
      (this.StartZoomModifier = 1),
      (this.ZoomModifier = 1),
      (this.ModifyFov = !1),
      (this.StartFov = 0),
      (this.Fov = 0),
      (this.ModifyArmRotation = !1),
      (this.StartArmRotation = Rotator_1.Rotator.Create()),
      (this.ArmRotation = Quat_1.Quat.Create()),
      (this.ModifyPlayerLocation = !1),
      (this.StartPlayerLocation = Vector_1.Vector.Create()),
      (this.PlayerLocation = Vector_1.Vector.Create()),
      (this.ElapsedTime = 0),
      (this.FadeOutTotalTime = 0),
      (this.UseFadeOutTimeLerp = !1);
  }
}
class CameraModify {
  constructor(t) {
    (this.Name = StringUtils_1.EMPTY_STRING),
      (this.ArmLength = 0),
      (this.ArmLengthAdditional = 0),
      (this.ArmRotation = Rotator_1.Rotator.Create()),
      (this.ArmRotationAdditional = Rotator_1.Rotator.Create()),
      (this.CameraFov = 0),
      (this.CameraOffset = Vector_1.Vector.Create()),
      (this.CameraOffsetAdditional = Vector_1.Vector.Create()),
      (this.FocusCameraRelativeYaw = 0),
      (this.IsLockInput = !1),
      (this.IsModifiedArmLength = !1),
      (this.IsModifiedArmRotation = !1),
      (this.IsModifiedArmRotationPitch = !1),
      (this.IsModifiedArmRotationRoll = !1),
      (this.IsModifiedArmRotationYaw = !1),
      (this.IsModifiedCameraFov = !1),
      (this.IsModifiedCameraOffset = !1),
      (this.IsModifiedCameraOffsetX = !1),
      (this.IsModifiedCameraOffsetY = !1),
      (this.IsModifiedCameraOffsetZ = !1),
      (this.IsModifiedCameraLens = !1),
      (this.OverrideCameraInput = !1),
      (this.ResetFinalArmLength = !1),
      (this.ResetFinalArmRotation = !1),
      (this.StopModifyOnMontageEnd = !1),
      (this.IsLerpArmLocation = !1),
      (this.MaxLookTargetAngle = 0),
      (this.MaxLookTargetAngleSpeed = 0),
      (this.IsSwitchModifier = !1),
      (this.IsModifyArmRotationBasedOnActorRotation = !1),
      (this.IsUseArmLengthFloatCurve = !1),
      (this.ArmLengthFloatCurve = void 0),
      (this.IsUseArmRotationFloatCurve = !1),
      (this.ArmRotationFloatCurve = void 0),
      (this.IsUseFovFloatCurve = !1),
      (this.FovFloatCurve = void 0),
      (this.IsUseLensFloatCurve = !1),
      (this.LensFloatCurve = void 0),
      (this.CameraLens = void 0),
      (this.ResetFinalArmRotationToFocus = !1),
      (this.IsForcePlayModify = !1),
      (this.Name = t.Name),
      (this.ArmLength = t.ArmLength),
      (this.ArmLengthAdditional = t.ArmLengthAdditional),
      (this.ArmRotation = Rotator_1.Rotator.Create(t.ArmRotation)),
      (this.ArmRotationAdditional = Rotator_1.Rotator.Create(
        t.ArmRotationAdditional,
      )),
      (this.CameraFov = t.CameraFov),
      (this.CameraOffset = Vector_1.Vector.Create(t.CameraOffset)),
      (this.CameraOffsetAdditional = Vector_1.Vector.Create(
        t.CameraOffsetAdditional,
      )),
      (this.FocusCameraRelativeYaw = t.FocusCameraRelativeYaw),
      (this.IsLockInput = t.IsLockInput),
      (this.IsModifiedArmLength = t.IsModifiedArmLength),
      (this.IsModifiedArmRotation = t.IsModifiedArmRotation),
      (this.IsModifiedArmRotationPitch = t.IsModifiedArmRotationPitch),
      (this.IsModifiedArmRotationRoll = t.IsModifiedArmRotationRoll),
      (this.IsModifiedArmRotationYaw = t.IsModifiedArmRotationYaw),
      (this.IsModifiedCameraFov = t.IsModifiedCameraFov),
      (this.IsModifiedCameraOffset = t.IsModifiedCameraOffset),
      (this.IsModifiedCameraOffsetX = t.IsModifiedCameraOffsetX),
      (this.IsModifiedCameraOffsetY = t.IsModifiedCameraOffsetY),
      (this.IsModifiedCameraOffsetZ = t.IsModifiedCameraOffsetZ),
      (this.IsModifiedCameraLens = t.IsModifiedCameraLens),
      (this.OverrideCameraInput = t.OverrideCameraInput),
      (this.ResetFinalArmLength = t.ResetFinalArmLength),
      (this.ResetFinalArmRotation = t.ResetFinalArmRotation),
      (this.StopModifyOnMontageEnd = t.StopModifyOnMontageEnd),
      (this.IsLerpArmLocation = t.IsLerpArmLocation),
      (this.MaxLookTargetAngle = t.MaxLookTargetAngle),
      (this.MaxLookTargetAngleSpeed = t.MaxLookTargetAngleSpeed),
      (this.IsSwitchModifier = t.IsSwitchModifier),
      (this.IsModifyArmRotationBasedOnActorRotation =
        t.IsModifyArmRotationBasedOnActorRotation),
      (this.IsUseArmLengthFloatCurve = t.IsUseArmLengthFloatCurve),
      this.IsUseArmLengthFloatCurve &&
        (this.ArmLengthFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
          t.ArmLengthFloatCurve,
        )),
      (this.IsUseArmRotationFloatCurve = t.IsUseArmRotationFloatCurve),
      this.IsUseArmRotationFloatCurve &&
        (this.ArmRotationFloatCurve =
          CurveUtils_1.CurveUtils.CreateCurveByStruct(t.ArmRotationFloatCurve)),
      (this.IsUseFovFloatCurve = t.IsUseFovFloatCurve),
      this.IsUseFovFloatCurve &&
        (this.FovFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
          t.FovFloatCurve,
        )),
      (this.IsUseLensFloatCurve = t.IsUseLensFloatCurve),
      this.IsUseLensFloatCurve &&
        (this.LensFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
          t.LensFloatCurve,
        )),
      (this.CameraLens = t.CameraLens),
      (this.ResetFinalArmRotationToFocus = t.ResetFinalArmRotationToFocus),
      (this.IsForcePlayModify = t.IsForcePlayModify);
  }
}
class CameraModifyController extends CameraControllerBase_1.CameraControllerBase {
  constructor(t) {
    super(t),
      (this.ModifyArmLengthLagSpeed = 0),
      (this.ModifyCameraOffsetLagSpeed = 0),
      (this.ModifyArmRotationLagSpeed = 0),
      (this.ModifyFovLagSpeed = 0),
      (this._ue = -0),
      (this.uue = void 0),
      (this.cue = -0),
      (this.mue = -0),
      (this.due = -0),
      (this.Cue = -0),
      (this.gue = !1),
      (this.fue = void 0),
      (this.pue = void 0),
      (this.vue = !1),
      (this.IsModifyFadeOut = !1),
      (this.CurrentBlendState = 0),
      (this.ModifyFadeOutData = new CameraFadeOutData()),
      (this.ModifySettings = void 0),
      (this.Mue = void 0),
      (this.Sue = void 0),
      (this.ModifyArmLength = !1),
      (this.Eue = !1),
      (this.yue = !1),
      (this.Iue = !1),
      (this.Tue = void 0),
      (this.Lue = ""),
      (this.Due = Vector_1.Vector.Create()),
      (this.Rue = Vector_1.Vector.Create()),
      (this.Uue = !1),
      (this.Aue = !1),
      (this.Pue = !1),
      (this.xue = !0),
      (this.SettlementCamera = void 0),
      (this.wue = Quat_1.Quat.Create()),
      (this.Bue = Rotator_1.Rotator.Create()),
      (this.bue = Rotator_1.Rotator.Create()),
      (this.que = Rotator_1.Rotator.Create()),
      (this.Gue = Rotator_1.Rotator.Create()),
      (this.Nue = Rotator_1.Rotator.Create()),
      (this.Oue = Vector_1.Vector.Create()),
      (this.kue = Vector_1.Vector.Create()),
      (this.Lz = Vector_1.Vector.Create()),
      (this.az = Quat_1.Quat.Create()),
      (this.Fue = Quat_1.Quat.Create()),
      (this.Vue = new FightCameraLogicComponent_1.VirtualCamera()),
      (this.Hue = new FightCameraLogicComponent_1.VirtualCamera()),
      (this.jue = 0),
      (this.Wue = Vector_1.Vector.Create()),
      (this.l5s = () => {
        this.Mue &&
          this.Mue !== this.Sue?.GetCurrentActiveMontage() &&
          this.Que(!0, !0);
      }),
      (this.Kue = (t, i) => {
        this.Mue &&
          this.Mue !== this.Sue?.GetCurrentActiveMontage() &&
          this.Que(!0, !0);
      }),
      (this.Xue = (t) => {
        this.Mue && this.Mue !== t && this.Que(!0, !0);
      }),
      (this.$ue = (t) => {
        t === this.Tue?.EntityId && this.Que(!0, !1);
      }),
      (this.Yue = !1),
      (this.OnChangeRole = (t, i) => {
        this.ModifySettings?.IsSwitchModifier || this.Que(!0, !0);
      }),
      (this.Jue = 0);
  }
  get IsAiming() {
    return this.Yue;
  }
  set IsAiming(t) {
    this.Yue !== t &&
      ((this.Yue = t), this.Yue ? this.Lock(this) : this.Unlock(this));
  }
  Name() {
    return "ModifyController";
  }
  OnInit() {
    this.SetConfigMap(1, "ModifyArmLengthLagSpeed"),
      this.SetConfigMap(2, "ModifyCameraOffsetLagSpeed"),
      this.SetConfigMap(3, "ModifyArmRotationLagSpeed"),
      this.SetConfigMap(4, "ModifyFovLagSpeed");
  }
  SetSettlementModifier(t) {
    (this.SettlementCamera = t),
      this.Camera.SettlementCamera.SetSettlementCamera(t);
  }
  OnDisable() {
    this.IsModified && this.Que(!0, !1),
      this.IsModifyFadeOut && this.EndModifyFadeOut();
  }
  UpdateInternal(t) {
    (this.IsAiming = this.Camera.ContainsTag(428837378)),
      this.IsAiming || (this.UpdateBreakModifyInfo(), this.zue(t), this.Zue(t));
  }
  UpdateDeactivateInternal(t) {
    (this.IsAiming = this.Camera.ContainsTag(428837378)),
      this.IsAiming || this.zue(t);
  }
  get IsActivate() {
    return super.IsActivate || !!this.ModifySettings?.IsForcePlayModify;
  }
  get IsModified() {
    return !!this.ModifySettings;
  }
  ApplyCameraModify(t, i, s, h, e, r, a, o, _, M, n, l) {
    let d, c, v;
    (!super.IsActivate && !r.IsForcePlayModify) ||
      (t && t.TagName !== "None" && !this.Camera.ContainsTag(t.TagId)) ||
      r.Priority < this.Jue ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Camera",
          6,
          "ApplyCameraModify",
          ["tag", t?.TagName],
          ["montage", a?.GetName()],
          ["ArmLengthAddition", r.CameraOffsetAdditional],
        ),
      (d = this.IsModified || this.IsModifyFadeOut),
      (c =
        this.IsModified &&
        (this.ModifyArmLength || !!this.ModifySettings?.IsModifiedArmLength)),
      (v = d && this.Iue),
      this.Que(!d, !1),
      (this.gue = v),
      (this.Jue = r.Priority),
      t && t.TagName !== "None" && (this.uue = t),
      this.Camera.CameraAdjustController.Lock(this),
      this.Camera.CameraGuideController.Lock(this),
      this.Camera.CopyVirtualCamera(this.Hue, this.Camera.CurrentCamera),
      d || this.Camera.CopyVirtualCamera(this.Vue, this.Hue),
      this.ResetBreakModifyInfo(),
      (this.cue = i),
      (this.mue = s),
      (this.due = h),
      (this.Cue = e),
      (this.fue = CurveUtils_1.CurveUtils.CreateCurveByStruct(o)),
      (this.pue = CurveUtils_1.CurveUtils.CreateCurveByStruct(_)),
      (this._ue = 0),
      (this.ModifySettings = new CameraModify(r)),
      this.ModifySettings.StopModifyOnMontageEnd &&
        ((this.Mue = a),
        (this.Sue = this.dBn(M, l)),
        this.Sue?.OnMontageStarted.Add(this.Xue),
        this.Sue?.OnMontageEnded.Add(this.Kue),
        this.Sue?.OnAllMontageInstancesEnded.Add(this.l5s)),
      (this.ModifyArmLength =
        c ||
        !MathUtils_1.MathUtils.IsNearlyEqual(
          this.ModifySettings.ArmLengthAdditional,
          0,
        )),
      (this.Eue = !this.ModifySettings.CameraOffsetAdditional.IsNearlyZero(
        MathUtils_1.MathUtils.KindaSmallNumber,
      )),
      (this.yue = !this.ModifySettings.ArmRotationAdditional.IsNearlyZero()),
      (this.Iue = !!M),
      (this.Tue = M),
      (this.Lue = n),
      this.Iue &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.$ue,
        ),
      (this.jue =
        this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition),
      this.Wue.DeepCopy(
        this.Camera.CameraAutoController.CurrentAutoCameraArmOffset,
      ),
      (this.Uue = this.ModifySettings.IsModifiedCameraFov),
      (this.Aue = this.ModifySettings.IsModifiedCameraLens),
      this.ModifySettings.OverrideCameraInput &&
        ((this.yue || this.ModifySettings.IsModifiedArmRotation) &&
          (this.Camera.CameraInputController.LockArmRotationYaw(this),
          this.Camera.CameraInputController.LockArmRotationPitch(this)),
        this.ModifyArmLength || this.ModifySettings.IsModifiedArmLength) &&
        this.Camera.CameraInputController.LockArmLength(this),
      this.ModifySettings.IsLockInput &&
        this.Camera.CameraInputController.Lock(this),
      this.wue.Reset(),
      (this.xue = !0));
  }
  Zue(e) {
    if (this.IsModified) {
      (this._ue += e),
        this.uue &&
          !this.vue &&
          (this.Camera.ContainsTag(this.uue.TagId)
            ? this._ue > this.mue && (this._ue = this.mue)
            : this._ue < this.mue + this.cue && this.Que(!0, !0));
      let t = void 0;
      let i = 0;
      let s = 0;
      let h = 0;
      let r;
      this._ue < this.mue
        ? ((t = 1),
          (h = this._ue / this.mue),
          (i =
            this.mue > 0 ? this.fue.GetCurrentValue(this._ue / this.mue) : 1),
          (s =
            this.mue > 0
              ? this.fue.GetOffsetRate((this._ue - e) / this.mue, e / this.mue)
              : 1))
        : this._ue < this.mue + this.cue
          ? ((t = 2), (i = 1), (s = 1))
          : ((t = 3),
            (r = this._ue - this.mue - this.cue),
            (i = this.due > 0 ? this.pue.GetCurrentValue(r / this.due) : 1),
            (s =
              this.due > 0
                ? this.pue.GetOffsetRate((r - e) / this.due, e / this.due)
                : 1),
            (this.Jue = 0)),
        (this.CurrentBlendState = t),
        this.ece(),
        this.tce(t, i, s),
        this.ice(t, i, s),
        this.oce(t, i, h),
        this.rce(t, i),
        this.nce(t, i, e, h),
        this.sce(t, i, h),
        this.ace(t, i, h),
        this._ue > this.mue + this.cue + this.due && this.Que(!0, !1);
    }
  }
  tce(t, i, s) {
    if (this.Iue)
      if (this.Tue?.Mesh?.IsValid() && this.Tue?.CharacterActorComponent?.Valid)
        switch (
          (this.Due.FromUeVector(
            this.Tue.Mesh.GetSocketLocation(
              FNameUtil_1.FNameUtil.GetDynamicFName(this.Lue),
            ),
          ),
          t)
        ) {
          case 1:
            this.Lz.DeepCopy(this.gue ? this.Rue : this.Camera.PlayerLocation),
              Vector_1.Vector.Lerp(
                this.Lz,
                this.Due,
                i,
                this.Camera.PlayerLocation,
              ),
              this.Rue.DeepCopy(this.Camera.PlayerLocation),
              (this.Iue = !0);
            break;
          case 2:
            this.Camera.PlayerLocation.DeepCopy(this.Due),
              this.Rue.DeepCopy(this.Camera.PlayerLocation),
              (this.Iue = !0);
            break;
          case 3:
            Vector_1.Vector.Lerp(
              this.Rue,
              this.Camera.PlayerLocation,
              i,
              this.Camera.PlayerLocation,
            ),
              this.Rue.DeepCopy(this.Camera.PlayerLocation),
              (this.Iue = !0);
            break;
          default:
            this.Iue = !1;
        }
      else this.Que(!0, !1);
  }
  ice(t, i, s) {
    if (this.ModifySettings.IsLerpArmLocation) {
      switch (t) {
        case 1:
          Vector_1.Vector.Lerp(
            this.Camera.CurrentCamera.ArmLocation,
            this.Camera.PlayerLocation,
            s,
            this.Camera.DesiredCamera.ArmLocation,
          ),
            Vector_1.Vector.Lerp(
              this.Wue,
              Vector_1.Vector.Create(0, 0, 0),
              s,
              this.Camera.CameraAutoController.CurrentAutoCameraArmOffset,
            );
          break;
        case 3:
          Vector_1.Vector.Lerp(
            this.Camera.CurrentCamera.ArmLocation,
            this.Camera.TmpArmLocation,
            s,
            this.Camera.DesiredCamera.ArmLocation,
          ),
            Vector_1.Vector.Lerp(
              Vector_1.Vector.Create(0, 0, 0),
              this.Wue,
              s,
              this.Camera.CameraAutoController.CurrentAutoCameraArmOffset,
            );
          break;
        default:
          this.Camera.DesiredCamera.ArmLocation.DeepCopy(
            this.Camera.PlayerLocation,
          ),
            this.Camera.CameraAutoController.CurrentAutoCameraArmOffset.Set(
              0,
              0,
              0,
            );
      }
      this.Camera.IsModifiedArmLocation = !0;
    }
  }
  oce(s, h, e) {
    if (
      !this.BreakModifyArmLength &&
      (this.ModifySettings.IsModifiedArmLength || this.ModifyArmLength)
    ) {
      let t = h;
      let i = 0;
      const r = this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera);
      switch (
        ((i = this.ModifySettings.IsModifiedArmLength
          ? this.ModifySettings.ArmLength / r
          : this.Camera.GetArmLengthWithSettingAndZoom(this.Vue) / r),
        this.ModifyArmLength &&
          ((i += this.ModifySettings.ArmLengthAdditional / r),
          (i = Math.max(i, this.Camera.DesiredCamera.MinArmLength / r))),
        s)
      ) {
        case 1:
          this.ModifySettings.IsUseArmLengthFloatCurve &&
            (t = this.ModifySettings.ArmLengthFloatCurve.GetCurrentValue(e)),
            (this.Camera.DesiredCamera.ZoomModifier =
              MathUtils_1.MathUtils.Lerp(this.Hue.ZoomModifier, i, t)),
            this.ModifySettings.IsModifiedArmLength &&
              (this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition =
                MathUtils_1.MathUtils.Lerp(this.jue, 0, t));
          break;
        case 2:
          (this.Camera.DesiredCamera.ZoomModifier = i),
            this.ModifySettings.IsModifiedArmLength &&
              (this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition = 0);
          break;
        case 3:
          (this.Camera.DesiredCamera.ZoomModifier = MathUtils_1.MathUtils.Lerp(
            i,
            this._ce(),
            h,
          )),
            this.ModifySettings.IsModifiedArmLength &&
              (this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition =
                MathUtils_1.MathUtils.Lerp(0, this.jue, h));
      }
      this.Camera.IsModifiedArmLength = !0;
    }
  }
  rce(t, i) {
    if (
      !this.BreakModifyCameraOffset &&
      (this.ModifySettings.IsModifiedCameraOffset || this.Eue)
    ) {
      const s = Vector_1.Vector.Create();
      switch (
        (this.ModifySettings.IsModifiedCameraOffset
          ? (s.FromUeVector(this.ModifySettings.CameraOffset),
            s.Set(
              this.ModifySettings.IsModifiedCameraOffsetX
                ? this.ModifySettings.CameraOffset.X
                : this.Camera.CameraOffsetX,
              this.ModifySettings.IsModifiedCameraOffsetY
                ? this.ModifySettings.CameraOffset.Y
                : this.Camera.CameraOffsetY,
              this.ModifySettings.IsModifiedCameraOffsetZ
                ? this.ModifySettings.CameraOffset.Z
                : this.Camera.CameraOffsetZ,
            ))
          : ((s.X = this.Camera.CameraOffsetX),
            (s.Y = this.Camera.CameraOffsetY),
            (s.Z = this.Camera.CameraOffsetZ)),
        this.Eue &&
          s &&
          s.AdditionEqual(
            Vector_1.Vector.Create(this.ModifySettings.CameraOffsetAdditional),
          ),
        t)
      ) {
        case 1:
          Vector_1.Vector.Lerp(
            this.Hue.CameraOffset,
            s,
            i,
            this.Camera.DesiredCamera.CameraOffset,
          );
          break;
        case 2:
          this.Camera.DesiredCamera.CameraOffset.DeepCopy(s);
          break;
        case 3:
          var h = Vector_1.Vector.Create(
            this.Camera.CameraOffsetX,
            this.Camera.CameraOffsetY,
            this.Camera.CameraOffsetZ,
          );
          Vector_1.Vector.Lerp(s, h, i, this.Camera.DesiredCamera.CameraOffset);
      }
      this.Camera.IsModifiedCameraOffset = !0;
    }
  }
  nce(s, h, e, i) {
    if (
      !(
        this.BreakModifyArmRotation ||
        (!this.ModifySettings.IsModifiedArmRotation && !this.yue) ||
        (!this.ModifySettings.IsLockInput && this.Pue)
      )
    ) {
      this.ModifySettings.IsModifiedArmRotationPitch ||
      this.ModifySettings.IsModifiedArmRotationRoll ||
      this.ModifySettings.IsModifiedArmRotationYaw
        ? (this.Iue && this.Tue?.CharacterActorComponent?.Valid
            ? this.bue.FromUeRotator(
                this.Tue.CharacterActorComponent.ActorRotationProxy,
              )
            : this.bue.FromUeRotator(
                this.Camera.Character.CharacterActorComponent
                  .ActorRotationProxy,
              ),
          this.Bue.FromUeRotator(this.Hue.ArmRotation),
          this.Gue.DeepCopy(this.ModifySettings.ArmRotation),
          this.Bue.Set(
            this.ModifySettings.IsModifiedArmRotationPitch
              ? this.bue.Pitch + this.Gue.Pitch
              : this.Bue.Pitch,
            this.ModifySettings.IsModifiedArmRotationYaw
              ? this.bue.Yaw + this.Gue.Yaw
              : this.Bue.Yaw,
            this.ModifySettings.IsModifiedArmRotationRoll
              ? this.bue.Roll + this.Gue.Roll
              : this.Bue.Roll,
          ),
          this.ModifySettings.IsModifyArmRotationBasedOnActorRotation ||
            this.xue ||
            this.Bue.DeepCopy(this.que),
          this.xue && (this.que.DeepCopy(this.Bue), (this.xue = !1)))
        : this.Bue.DeepCopy(this.Hue.ArmRotation),
        this.yue &&
          this.Bue.Set(
            this.Bue.Pitch + this.ModifySettings.ArmRotationAdditional.Pitch,
            this.Bue.Yaw + this.ModifySettings.ArmRotationAdditional.Yaw,
            this.Bue.Roll + this.ModifySettings.ArmRotationAdditional.Roll,
          );
      let t = h;
      switch (s) {
        case 1:
          this.ModifySettings.IsUseArmRotationFloatCurve &&
            (t = this.ModifySettings.ArmRotationFloatCurve.GetCurrentValue(i)),
            Rotator_1.Rotator.Lerp(this.Hue.ArmRotation, this.Bue, t, this.Gue),
            (this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(
              this.Gue,
            ));
          break;
        case 2:
          this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(
            this.Bue,
          );
          break;
        case 3:
          Rotator_1.Rotator.Lerp(this.Bue, this.lce(), t, this.Gue),
            (this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(
              this.Gue,
            ));
      }
      if (
        ((this.Camera.IsModifiedArmRotation = !0),
        this.Camera.DesiredCamera.ArmRotation.Quaternion(this.Fue),
        this.wue.Multiply(this.Fue, this.Fue),
        this.Fue.Rotator(this.Camera.DesiredCamera.ArmRotation),
        this.Camera.PlayerLocation.Subtraction(
          this.Camera.CameraLocation,
          this.Oue,
        ),
        this.Oue.Normalize())
      ) {
        this.Fue.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.kue);
        let t =
          Math.acos(this.Oue.DotProduct(this.kue)) *
          MathUtils_1.MathUtils.RadToDeg;
        let i = 0;
        if (t < this.ModifySettings.MaxLookTargetAngle || s === 3) {
          if (
            (this.wue.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Lz),
            (t = Math.acos(this.Lz.X) * MathUtils_1.MathUtils.RadToDeg) <
              MathUtils_1.MathUtils.SmallNumber)
          )
            return;
          this.wue.Inverse(this.az),
            (i = Math.min(t, this.ModifySettings.MaxLookTargetAngle - i));
        } else
          Quat_1.Quat.FindBetween(this.kue, this.Oue, this.az),
            (i = t - this.ModifySettings.MaxLookTargetAngle);
        h = Math.min(i, this.ModifySettings.MaxLookTargetAngleSpeed * e) / t;
        Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, this.az, h, this.az),
          this.az.Multiply(this.wue, this.wue),
          this.az.Multiply(this.Fue, this.Fue),
          this.Fue.Rotator(this.Camera.DesiredCamera.ArmRotation);
      }
    }
  }
  ece() {
    const [t, i] = this.Camera?.CharacterEntityHandle.Entity.GetComponent(
      52,
    )?.GetCameraInput() ?? [0, 0];
    (Math.abs(t) > MathUtils_1.MathUtils.KindaSmallNumber ||
      Math.abs(i) > MathUtils_1.MathUtils.KindaSmallNumber) &&
      (this.Pue = !0);
  }
  lce() {
    return this.ModifySettings.ResetFinalArmRotationToFocus
      ? (this.Nue.DeepCopy(
          CameraUtility_1.CameraUtility.GetCameraDefaultFocusRotator(),
        ),
        this.Nue)
      : this.ModifySettings.ResetFinalArmRotation
        ? (this.Nue.DeepCopy(this.Camera.DesiredCamera.ArmRotation),
          (this.Nue.Roll = 0),
          this.Nue)
        : this.Vue.ArmRotation;
  }
  hce() {
    return (
      this.ModifySettings.ResetFinalArmLength
        ? this.Camera.DesiredCamera
        : this.Vue
    ).ArmLength;
  }
  _ce() {
    return this.ModifySettings.ResetFinalArmLength &&
      this.ModifySettings.IsModifiedArmLength
      ? MathUtils_1.MathUtils.Clamp(
          this.ModifySettings.ArmLength +
            (this.ModifyArmLength
              ? this.ModifySettings.ArmLengthAdditional
              : 0),
          this.Camera.CurrentCamera.MinArmLength,
          this.Camera.CurrentCamera.MaxArmLength,
        ) / this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera)
      : this.Vue.ZoomModifier;
  }
  sce(i, s, h) {
    if (!this.BreakModifyFov && this.Uue) {
      let t = s;
      const e = this.ModifySettings.CameraFov;
      switch (i) {
        case 1:
          this.ModifySettings.IsUseFovFloatCurve &&
            (t = this.ModifySettings.FovFloatCurve.GetCurrentValue(h)),
            (this.Camera.DesiredCamera.Fov = MathUtils_1.MathUtils.Lerp(
              this.Hue.Fov,
              e,
              t,
            ));
          break;
        case 2:
          this.Camera.DesiredCamera.Fov = e;
          break;
        case 3:
          this.Camera.DesiredCamera.Fov = MathUtils_1.MathUtils.Lerp(
            e,
            this.Camera.Fov,
            t,
          );
      }
      this.Camera.IsModifiedFov = !0;
    }
  }
  ace(h, e, r) {
    if (this.Aue) {
      let t = e;
      let i = void 0;
      let s = 0;
      const a = this.ModifySettings.CameraLens;
      switch (h) {
        case 1:
          this.ModifySettings.IsUseLensFloatCurve &&
            (t = this.ModifySettings.LensFloatCurve.GetCurrentValue(r)),
            (i = MathUtils_1.MathUtils.Lerp(a.StartFStop, a.EndFStop, t)),
            (s = MathUtils_1.MathUtils.Lerp(
              a.RadialBlurStartIntensity,
              a.RadialBlurEndIntensity,
              t,
            ));
          break;
        case 2:
          (i = a.EndFStop), (s = a.RadialBlurEndIntensity);
          break;
        case 3:
          (i = MathUtils_1.MathUtils.Lerp(a.EndFStop, a.StartFStop, t)),
            (s = MathUtils_1.MathUtils.Lerp(
              a.RadialBlurEndIntensity,
              a.RadialBlurStartIntensity,
              t,
            ));
      }
      this.Camera.ApplyDepthOfField(i, void 0, void 0, void 0),
        this.Camera.ApplyRadialBlur(
          s,
          a.RadialBlurCenter,
          a.RadialBlurRadius,
          a.RadialBlurHardness,
          a.RadialBlurPassNumber,
          a.RadialBlurSampleNumber,
        );
    }
  }
  Que(t, i) {
    this.IsModified &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Camera", 6, "EndModify", ["withFadeOut", t]),
      (this.Jue = 0),
      this.Camera.CameraAdjustController.Unlock(this),
      this.Camera.CameraGuideController.Unlock(this),
      this.ModifySettings.OverrideCameraInput &&
        ((this.yue || this.ModifySettings.IsModifiedArmRotation) &&
          (this.Camera.CameraInputController.UnlockArmRotationYaw(this),
          this.Camera.CameraInputController.UnlockArmRotationPitch(this)),
        this.ModifyArmLength || this.ModifySettings.IsModifiedArmLength) &&
        this.Camera.CameraInputController.UnlockArmLength(this),
      t ? this.uce(i) : this.EndModifyFadeOut(),
      (this.Mue = void 0),
      this.Sue?.IsValid() &&
        (this.Sue.OnMontageStarted.Remove(this.Xue),
        this.Sue.OnMontageEnded.Remove(this.Kue),
        this.Sue.OnAllMontageInstancesEnded.Remove(this.l5s),
        (this.Sue = void 0)),
      (this.ModifyArmLength = !1),
      (this.ModifySettings.IsModifiedCameraOffset || this.Eue) &&
        (this.Eue = !1),
      (this.ModifySettings.IsModifiedArmRotation || this.yue) &&
        (this.yue = !1),
      this.Uue && (this.Uue = !1),
      this.uue && ((this.uue = void 0), (this.vue = !1)),
      this.Aue &&
        ((this.Aue = !1),
        this.Camera.ExitDepthOfField(),
        this.Camera.ExitRadialBlur()),
      (this.Pue = !1),
      (this.ModifySettings = void 0),
      this.Camera.CameraInputController.Unlock(this),
      this.Tue &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.$ue,
        ),
      (this.Tue = void 0),
      (this.Iue = !1),
      (this.gue = !1));
  }
  uce(t = !1) {
    let i;
    this.ResetBreakModifyInfo(),
      (this.ModifyFadeOutData.ModifyArmLength =
        this.ModifySettings.IsModifiedArmLength || this.ModifyArmLength),
      this.ModifyFadeOutData.ModifyArmLength &&
        ((this.ModifyFadeOutData.StartArmLength =
          this.Camera.CurrentCamera.ArmLength),
        (this.ModifyFadeOutData.ArmLength = this.hce())),
      (this.ModifyFadeOutData.ModifyZoomModifier =
        this.ModifyFadeOutData.ModifyArmLength),
      this.ModifyFadeOutData.ModifyZoomModifier &&
        ((this.ModifyFadeOutData.StartZoomModifier =
          this.Camera.CurrentCamera.ZoomModifier),
        (this.ModifyFadeOutData.ZoomModifier = this._ce())),
      (this.ModifyFadeOutData.ModifyArmRotation =
        (this.ModifySettings.IsModifiedArmRotation || this.yue) &&
        (this.ModifySettings.IsLockInput ||
          !this.Pue ||
          !MathUtils_1.MathUtils.IsNearlyZero(
            this.Camera.DesiredCamera.ArmRotation.Roll,
          ))),
      this.ModifyFadeOutData.ModifyArmRotation &&
        (((i = this.lce()).Roll = 0),
        this.ModifyFadeOutData.StartArmRotation.DeepCopy(
          this.Camera.CurrentCamera.ArmRotation,
        ),
        this.ModifyFadeOutData.ArmRotation.DeepCopy(i.Quaternion())),
      (this.ModifyFadeOutData.ModifyCameraOffset =
        this.ModifySettings.IsModifiedCameraOffset || this.Eue),
      this.ModifyFadeOutData.ModifyCameraOffset &&
        this.ModifyFadeOutData.StartCameraOffset.DeepCopy(
          this.Camera.CurrentCamera.CameraOffset,
        ),
      (this.ModifyFadeOutData.ModifyFov = this.Uue),
      this.ModifyFadeOutData.ModifyFov &&
        ((this.ModifyFadeOutData.StartFov = this.Camera.CurrentCamera.Fov),
        (this.ModifyFadeOutData.Fov = this.Camera.Fov)),
      (this.ModifyFadeOutData.ModifyPlayerLocation = this.Iue),
      this.ModifyFadeOutData.ModifyPlayerLocation &&
        (this.ModifyFadeOutData.StartPlayerLocation.DeepCopy(
          this.Camera.PlayerLocation,
        ),
        this.ModifyFadeOutData.PlayerLocation.DeepCopy(this.Rue)),
      (this.ModifyFadeOutData.ElapsedTime = 0),
      (this.ModifyFadeOutData.FadeOutTotalTime = this.Cue),
      (this.ModifyFadeOutData.UseFadeOutTimeLerp = t),
      (this.IsModifyFadeOut =
        this.ModifyFadeOutData.ModifyArmLength ||
        this.ModifyFadeOutData.ModifyArmRotation ||
        this.ModifyFadeOutData.ModifyCameraOffset ||
        this.ModifyFadeOutData.ModifyFov ||
        this.ModifyFadeOutData.ModifyPlayerLocation);
  }
  EndModifyFadeOut() {
    (this.IsModifyFadeOut = !1),
      (this.ModifyFadeOutData.ModifyArmLength = !1),
      (this.ModifyFadeOutData.ModifyArmRotation = !1),
      (this.ModifyFadeOutData.ModifyCameraOffset = !1),
      (this.ModifyFadeOutData.ModifyFov = !1),
      (this.ModifyFadeOutData.ModifyPlayerLocation = !1);
  }
  zue(t) {
    let i, s, h, e, r;
    this.IsModifyFadeOut &&
      ((i = this.ModifyFadeOutData),
      (s = this.Camera.CurrentCamera),
      (h = this.Camera.DesiredCamera),
      (this.ModifyFadeOutData.ElapsedTime += t),
      (e =
        i.FadeOutTotalTime <= 0
          ? 1
          : MathUtils_1.MathUtils.Clamp(
              i.ElapsedTime / i.FadeOutTotalTime,
              0,
              1,
            )),
      i.ModifyArmLength &&
        (this.Camera.IsModifiedArmLength
          ? (i.ModifyArmLength = !1)
          : (([i.ModifyArmLength, h.ArmLength] = i.UseFadeOutTimeLerp
              ? this.FloatLerp(
                  i.StartArmLength,
                  i.ArmLength,
                  e,
                  MODIFY_SMALL_LENGTH,
                )
              : this.FloatInterpTo(
                  s.ArmLength,
                  i.ArmLength,
                  t,
                  this.ModifyArmLengthLagSpeed,
                  MODIFY_SMALL_LENGTH,
                )),
            (this.Camera.IsModifiedArmLength = !0))),
      i.ModifyZoomModifier &&
        (this.Camera.IsModifiedZoomModifier
          ? (i.ModifyZoomModifier = !1)
          : (([i.ModifyZoomModifier, h.ZoomModifier] = i.UseFadeOutTimeLerp
              ? this.FloatLerp(
                  i.StartZoomModifier,
                  i.ZoomModifier,
                  e,
                  MathUtils_1.MathUtils.KindaSmallNumber,
                )
              : this.FloatInterpTo(
                  s.ZoomModifier,
                  i.ZoomModifier,
                  t,
                  MODIFY_ZOOM_MODIFIER_LAG_SPEED,
                  MODIFY_SMALL_LENGTH,
                )),
            (this.Camera.IsModifiedZoomModifier = !0))),
      i.ModifyCameraOffset &&
        (this.Camera.IsModifiedCameraOffset
          ? (i.ModifyCameraOffset = !1)
          : ((i.CameraOffset.X = this.Camera.CameraOffsetX),
            (i.CameraOffset.Y = this.Camera.CameraOffsetY),
            (i.CameraOffset.Z = this.Camera.CameraOffsetZ),
            ([i.ModifyCameraOffset, h.CameraOffset] = i.UseFadeOutTimeLerp
              ? this.VectorLerp(
                  i.StartCameraOffset,
                  i.CameraOffset,
                  e,
                  MODIFY_SMALL_LENGTH,
                )
              : this.VectorInterpTo(
                  s.CameraOffset,
                  i.CameraOffset,
                  t,
                  this.ModifyCameraOffsetLagSpeed,
                  MODIFY_SMALL_LENGTH,
                )),
            (this.Camera.IsModifiedCameraOffset = !0))),
      i.UseFadeOutTimeLerp && this.ece(),
      i.ModifyArmRotation &&
        (this.Camera.IsModifiedArmRotation || this.Pue
          ? (i.ModifyArmRotation = !1)
          : ((r = void 0),
            ([i.ModifyArmRotation, r] = i.UseFadeOutTimeLerp
              ? this.RotationLerp(
                  i.StartArmRotation,
                  i.ArmRotation.Rotator(),
                  e,
                  MODIFY_SMALL_LENGTH,
                )
              : this.RotationInterpTo(
                  s.ArmRotation,
                  i.ArmRotation.Rotator(),
                  t,
                  this.ModifyArmRotationLagSpeed,
                  MODIFY_SMALL_LENGTH,
                )),
            (h.ArmRotation = r),
            (this.Camera.IsModifiedArmRotation = !0))),
      i.ModifyFov &&
        (this.Camera.IsModifiedFov
          ? (i.ModifyFov = !1)
          : (([i.ModifyFov, h.Fov] = i.UseFadeOutTimeLerp
              ? this.FloatLerp(i.StartFov, i.Fov, e, MODIFY_SMALL_LENGTH)
              : this.FloatInterpTo(
                  s.Fov,
                  i.Fov,
                  t,
                  this.ModifyFovLagSpeed,
                  MODIFY_SMALL_LENGTH,
                )),
            (this.Camera.IsModifiedFov = !0))),
      i.ModifyPlayerLocation &&
        (([i.ModifyPlayerLocation, i.PlayerLocation] = i.UseFadeOutTimeLerp
          ? this.VectorLerp(
              i.PlayerLocation,
              this.Camera.PlayerLocation,
              e,
              MODIFY_SMALL_LENGTH,
            )
          : this.VectorInterpTo(
              i.PlayerLocation,
              this.Camera.PlayerLocation,
              t,
              this.ModifyCameraOffsetLagSpeed,
              MODIFY_SMALL_LENGTH,
            )),
        this.Camera.PlayerLocation.DeepCopy(i.PlayerLocation)),
      i.UseFadeOutTimeLerp && i.ElapsedTime > i.FadeOutTotalTime
        ? ((this.IsModifyFadeOut = !1), this.EndModifyFadeOut())
        : (this.IsModifyFadeOut =
            i.ModifyArmLength ||
            i.ModifyZoomModifier ||
            i.ModifyCameraOffset ||
            i.ModifyArmRotation ||
            i.ModifyFov ||
            i.ModifyPlayerLocation));
  }
  dBn(t, i) {
    let s = void 0;
    return (s = t
      ? t.GetEntityNoBlueprint()
      : i?.GetEntityNoBlueprint()?.GetComponent(0)?.IsVision()
        ? i?.GetEntityNoBlueprint()
        : this.Camera.CharacterEntityHandle.Entity)?.GetComponent(160)
      ?.MainAnimInstance;
  }
  FloatInterpTo(t, i, s, h, e) {
    s = MathUtils_1.MathUtils.InterpTo(t, i, s, h);
    return Math.abs(t - i) < e ? [!1, i] : [!0, s];
  }
  VectorInterpTo(t, i, s, h, e) {
    const r = Vector_1.Vector.Create();
    var s =
      (MathUtils_1.MathUtils.VectorInterpTo(t, i, s, h, r),
      Vector_1.Vector.Create());
    return (
      t.Subtraction(i, s),
      s.GetAbsMax() < e ? (r.DeepCopy(i), [!1, r]) : [!0, r]
    );
  }
  RotationInterpTo(t, i, s, h, e) {
    const r = Rotator_1.Rotator.Create();
    return (
      MathUtils_1.MathUtils.RotatorInterpTo(t, i, s, h, r),
      t.Equals(i, e) ? (r.DeepCopy(i), [!1, r]) : [!0, r]
    );
  }
  FloatLerp(t, i, s, h) {
    s = MathUtils_1.MathUtils.Lerp(t, i, s);
    return Math.abs(t - i) < h ? [!1, i] : [!0, s];
  }
  VectorLerp(t, i, s, h) {
    const e = Vector_1.Vector.Create();
    return (
      Vector_1.Vector.Lerp(t, i, s, e),
      t.Equals(i, h) ? (e.DeepCopy(i), [!1, e]) : [!0, e]
    );
  }
  RotationLerp(t, i, s, h) {
    const e = Rotator_1.Rotator.Create();
    return (
      Rotator_1.Rotator.Lerp(t, i, s, e),
      t.Equals(i, h) ? (e.DeepCopy(i), [!1, e]) : [!0, e]
    );
  }
}
exports.CameraModifyController = CameraModifyController;
// # sourceMappingURL=CameraModifyController.js.map
