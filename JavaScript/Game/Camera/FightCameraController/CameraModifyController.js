"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraModifyController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CurveBase_1 = require("../../../Core/Utils/Curve/CurveBase"),
  CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GravityUtils_1 = require("../../Utils/GravityUtils"),
  CameraUtility_1 = require("../CameraUtility"),
  FightCameraLogicComponent_1 = require("../FightCameraLogicComponent"),
  CameraControllerBase_1 = require("./CameraControllerBase"),
  MODIFY_SMALL_LENGTH = 1;
class CameraFadeOutData {
  constructor() {
    (this.ModifyArmLength = !1),
      (this.StartArmLength = 0),
      (this.ArmLength = 0),
      (this.ModifyArmOffset = !1),
      (this.StartArmOffset = Vector_1.Vector.Create()),
      (this.ArmOffset = Vector_1.Vector.Create()),
      (this.ModifyCameraOffset = !1),
      (this.StartCameraOffset = Vector_1.Vector.Create()),
      (this.CameraOffset = Vector_1.Vector.Create()),
      (this.ModifyZoomModifier = !1),
      (this.StartFinalArmLength = 0),
      (this.FinalArmLength = 0),
      (this.ModifyFov = !1),
      (this.StartFov = 0),
      (this.Fov = 0),
      (this.ModifyArmRotationPitch = !1),
      (this.ModifyArmRotationYaw = !1),
      (this.ModifyArmRotationRoll = !1),
      (this.StartArmRotationPitch = 0),
      (this.StartArmRotationYaw = 0),
      (this.StartArmRotationRoll = 0),
      (this.ArmRotationPitch = 0),
      (this.ArmRotationYaw = 0),
      (this.ArmRotationRoll = 0),
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
      (this.IsResetFinalArmLengthToSpecificValue = !1),
      (this.ResetFinalArmLengthToSpecificValue = 0),
      (this.ResetFinalArmRotation = !1),
      (this.IsResetFinalArmRotationToSpecificPitch = !1),
      (this.ResetFinalArmRotationToSpecificPitch = 0),
      (this.IsResetFinalArmRotationToSpecificYaw = !1),
      (this.ResetFinalArmRotationToSpecificYaw = 0),
      (this.StopModifyOnMontageEnd = !1),
      (this.IsLerpArmLocation = !1),
      (this.IsSwitchModifier = !1),
      (this.IsUseArmLengthFloatCurve = !1),
      (this.ArmLengthFloatCurve = void 0),
      (this.IsUseArmRotationFloatCurve = !1),
      (this.ArmRotationFloatCurve = void 0),
      (this.IsUseFovFloatCurve = !1),
      (this.FovFloatCurve = void 0),
      (this.IsUseLensFloatCurve = !1),
      (this.LensFloatCurve = void 0),
      (this.CameraLens = void 0),
      (this.IsForcePlayModify = !1),
      (this.IsUseCameraOffsetFloatCurve = !1),
      (this.CameraOffsetFloatCurve = void 0),
      (this.IsModifiedArmOffset = !1),
      (this.ArmOffset = Vector_1.Vector.Create()),
      (this.IsUseArmOffsetFloatCurve = !1),
      (this.ArmOffsetFloatCurve = void 0),
      (this.Name = t.ModifySettingsAdditional.Name),
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
      (this.IsModifiedCameraLens =
        t.ModifySettingsAdditional.IsModifiedCameraLens),
      (this.OverrideCameraInput = t.OverrideCameraInput),
      (this.ResetFinalArmLength = t.ResetFinalArmLength),
      (this.IsResetFinalArmLengthToSpecificValue =
        t.IsResetFinalArmLengthToSpecificValue),
      (this.ResetFinalArmLengthToSpecificValue =
        t.ResetFinalArmLengthToSpecificValue),
      (this.ResetFinalArmRotation = t.ResetFinalArmRotation),
      (this.IsResetFinalArmRotationToSpecificPitch =
        t.IsResetFinalArmRotationToSpecificPitch),
      (this.ResetFinalArmRotationToSpecificPitch =
        t.ResetFinalArmRotationToSpecificPitch),
      (this.IsResetFinalArmRotationToSpecificYaw =
        t.IsResetFinalArmRotationToSpecificYaw),
      (this.ResetFinalArmRotationToSpecificYaw =
        t.ResetFinalArmRotationToSpecificYaw),
      (this.StopModifyOnMontageEnd = t.StopModifyOnMontageEnd),
      (this.IsLerpArmLocation = t.IsLerpArmLocation),
      (this.IsSwitchModifier = t.IsSwitchModifier),
      (this.IsUseArmLengthFloatCurve =
        t.ModifySettingsAdditional.IsUseArmLengthFloatCurve),
      this.IsUseArmLengthFloatCurve &&
        (this.ArmLengthFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
          t.ModifySettingsAdditional.ArmLengthFloatCurve,
        )),
      (this.IsUseArmRotationFloatCurve =
        t.ModifySettingsAdditional.IsUseArmRotationFloatCurve),
      this.IsUseArmRotationFloatCurve &&
        (this.ArmRotationFloatCurve =
          CurveUtils_1.CurveUtils.CreateCurveByStruct(
            t.ModifySettingsAdditional.ArmRotationFloatCurve,
          )),
      (this.IsUseFovFloatCurve = t.ModifySettingsAdditional.IsUseFovFloatCurve),
      this.IsUseFovFloatCurve &&
        (this.FovFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
          t.ModifySettingsAdditional.FovFloatCurve,
        )),
      (this.IsUseLensFloatCurve =
        t.ModifySettingsAdditional.IsUseLensFloatCurve),
      this.IsUseLensFloatCurve &&
        (this.LensFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
          t.ModifySettingsAdditional.LensFloatCurve,
        )),
      (this.CameraLens = t.ModifySettingsAdditional.CameraLens),
      (this.IsForcePlayModify = t.IsForcePlayModify),
      (this.IsUseCameraOffsetFloatCurve =
        t.ModifySettingsAdditional.IsUseCameraOffsetFloatCurve),
      this.IsUseCameraOffsetFloatCurve &&
        (this.CameraOffsetFloatCurve =
          CurveUtils_1.CurveUtils.CreateCurveByStruct(
            t.ModifySettingsAdditional.CameraOffsetFloatCurve,
          )),
      (this.IsModifiedArmOffset =
        t.ModifySettingsAdditional.IsModifiedArmOffset),
      this.ArmOffset.DeepCopy(t.ModifySettingsAdditional.ArmOffset),
      (this.IsUseArmOffsetFloatCurve =
        t.ModifySettingsAdditional.IsUseArmOffsetFloatCurve),
      this.IsUseArmOffsetFloatCurve &&
        (this.ArmOffsetFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
          t.ModifySettingsAdditional.ArmOffsetFloatCurve,
        ));
  }
}
class CameraModifyController extends CameraControllerBase_1.CameraControllerBase {
  constructor(t) {
    super(t),
      (this.ModifyArmLengthLagSpeed = 0),
      (this.ModifyArmOffsetLagSpeed = 0),
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
      (this.j1_ = void 0),
      (this.Mue = void 0),
      (this.Eue = void 0),
      (this.ModifyArmLength = !1),
      (this.ModifyArmOffset = !1),
      (this.Sue = !1),
      (this.cpa = !1),
      (this.mpa = !1),
      (this.dpa = !1),
      (this.Iue = !1),
      (this.Tue = void 0),
      (this.Lue = ""),
      (this.Due = Vector_1.Vector.Create()),
      (this.Rue = Vector_1.Vector.Create()),
      (this.Uue = !1),
      (this.Aue = !1),
      (this.Pue = !1),
      (this.Cpa = !0),
      (this.gpa = !0),
      (this.fpa = !0),
      (this.wue = Quat_1.Quat.Create()),
      (this.ppa = 0),
      (this.vpa = 0),
      (this.Mpa = 0),
      (this.bue = Rotator_1.Rotator.Create()),
      (this.que = Rotator_1.Rotator.Create()),
      (this.Fhc = Rotator_1.Rotator.Create()),
      (this.Fra = Vector_1.Vector.Create()),
      (this.Nue = Rotator_1.Rotator.Create()),
      (this.Nhc = Rotator_1.Rotator.Create()),
      (this.Vue = new FightCameraLogicComponent_1.VirtualCamera()),
      (this.Hue = new FightCameraLogicComponent_1.VirtualCamera()),
      (this.jue = 0),
      (this.Wue = Vector_1.Vector.Create()),
      (this.Gue = Rotator_1.Rotator.Create()),
      (this.EPn = Rotator_1.Rotator.Create()),
      (this.Vhc = Rotator_1.Rotator.Create()),
      (this.jhc = Rotator_1.Rotator.Create()),
      (this.az = Quat_1.Quat.Create()),
      (this.KJ = Quat_1.Quat.Create()),
      (this.Lz = Vector_1.Vector.Create()),
      (this.Gjs = () => {
        this.Mue &&
          this.Mue !== this.Eue?.GetCurrentActiveMontage() &&
          this.EndModify(!0, !0);
      }),
      (this.Kue = (t, i) => {
        this.Mue &&
          this.Mue !== this.Eue?.GetCurrentActiveMontage() &&
          this.EndModify(!0, !0);
      }),
      (this.Xue = (t) => {
        this.Mue && this.Mue !== t && this.EndModify(!0, !0);
      }),
      (this.$ue = (t) => {
        t === this.Tue?.EntityId && this.EndModify(!0, !1);
      }),
      (this.Yue = !1),
      (this.OnChangeRole = (t, i) => {
        this.ModifySettings?.IsSwitchModifier || this.EndModify(!0, !0);
      }),
      (this.Jue = 0);
  }
  get yue() {
    return this.cpa || this.mpa || this.dpa;
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
      this.SetConfigMap(4, "ModifyFovLagSpeed"),
      this.SetConfigMap(5, "ModifyArmOffsetLagSpeed");
  }
  OnDisable() {
    this.IsModified && this.EndModify(!0, !1),
      this.IsModifyFadeOut && this.EndModifyFadeOut();
  }
  UpdateInternal(t) {
    (this.IsAiming = this.Camera.ContainsTag(428837378)),
      this.IsAiming || (this.zue(t), this.Zue(t));
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
  ApplyCameraModify(t, i, s, h, e, r, a, _, o, l, v, M) {
    var U, n, c, d, L, u;
    (!super.IsActivate && !r.IsForcePlayModify) ||
      (t && "None" !== t.TagName && !this.Camera.ContainsTag(t.TagId)) ||
      r.Priority < this.Jue ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Camera",
          57,
          "ApplyCameraModify",
          ["tag", t?.TagName],
          ["montage", a?.GetName()],
          ["ArmLengthAddition", r.CameraOffsetAdditional],
        ),
      (U = this.IsModified || this.IsModifyFadeOut),
      (n =
        this.IsModified &&
        (this.ModifyArmLength || !!this.ModifySettings?.IsModifiedArmLength)),
      (c =
        this.IsModified &&
        (this.ModifyArmOffset || !!this.ModifySettings?.IsModifiedArmOffset)),
      (d = U && this.Iue),
      (L =
        this.IsModified &&
        (this.Uue || !!this.ModifySettings?.IsModifiedCameraFov)),
      (u =
        this.IsModified &&
        (this.Sue || !!this.ModifySettings?.IsModifiedCameraOffset)),
      this.EndModify(!U, !1),
      (this.gue = d),
      (this.Jue = r.Priority),
      t && "None" !== t.TagName && (this.uue = t),
      this.Camera.CameraAdjustController.Lock(this),
      this.Camera.CameraGuideController.Lock(this),
      this.Camera.CopyVirtualCamera(this.Hue, this.Camera.CurrentCamera),
      U || this.Camera.CopyVirtualCamera(this.Vue, this.Hue),
      (this.cue = i),
      (this.mue = s),
      (this.due = h),
      (this.Cue = e),
      (this.fue =
        _ instanceof CurveBase_1.CurveBase
          ? _
          : CurveUtils_1.CurveUtils.CreateCurveByStruct(_)),
      (this.pue =
        o instanceof CurveBase_1.CurveBase
          ? o
          : CurveUtils_1.CurveUtils.CreateCurveByStruct(o)),
      (this._ue = 0),
      (this.ModifySettings = new CameraModify(r)),
      (this.j1_ = a),
      this.ModifySettings.StopModifyOnMontageEnd &&
        a instanceof UE.AnimMontage &&
        ((this.Mue = a),
        (this.Eue = this.Gqn(l, M)),
        this.Eue?.OnMontageStarted.Add(this.Xue),
        this.Eue?.OnMontageEnded.Add(this.Kue),
        this.Eue?.OnAllMontageInstancesEnded.Add(this.Gjs)),
      (this.ModifyArmLength =
        n ||
        !MathUtils_1.MathUtils.IsNearlyEqual(
          this.ModifySettings.ArmLengthAdditional,
          0,
        )),
      (this.ModifyArmOffset = c),
      (this.Sue =
        u ||
        !this.ModifySettings.CameraOffsetAdditional.IsNearlyZero(
          MathUtils_1.MathUtils.KindaSmallNumber,
        )),
      (this.cpa = !MathUtils_1.MathUtils.IsNearlyZero(
        this.ModifySettings.ArmRotationAdditional.Pitch,
        MathUtils_1.MathUtils.KindaSmallNumber,
      )),
      (this.mpa = !MathUtils_1.MathUtils.IsNearlyZero(
        this.ModifySettings.ArmRotationAdditional.Yaw,
        MathUtils_1.MathUtils.KindaSmallNumber,
      )),
      (this.dpa = !MathUtils_1.MathUtils.IsNearlyZero(
        this.ModifySettings.ArmRotationAdditional.Roll,
        MathUtils_1.MathUtils.KindaSmallNumber,
      )),
      (this.Iue = !!l),
      (this.Tue = l),
      (this.Lue = v),
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
      (this.Uue = L || this.ModifySettings.IsModifiedCameraFov),
      (this.Aue = this.ModifySettings.IsModifiedCameraLens),
      this.ModifySettings.OverrideCameraInput &&
        ((this.cpa ||
          (this.ModifySettings.IsModifiedArmRotation &&
            this.ModifySettings.IsModifiedArmRotationPitch)) &&
          this.Camera.CameraInputController.LockArmRotationPitch(this),
        (this.mpa ||
          (this.ModifySettings.IsModifiedArmRotation &&
            this.ModifySettings.IsModifiedArmRotationYaw)) &&
          this.Camera.CameraInputController.LockArmRotationYaw(this),
        this.ModifyArmLength || this.ModifySettings.IsModifiedArmLength) &&
        this.Camera.CameraInputController.LockArmLength(this),
      this.ModifySettings.IsLockInput &&
        this.Camera.CameraInputController.Lock(this),
      (this.yue || this.ModifySettings.IsModifiedArmRotation) &&
        this.Camera.CameraInputController.ResetCameraInput(),
      this.wue.Reset(),
      (this.Cpa = !0),
      (this.gpa = !0),
      (this.fpa = !0));
  }
  Zue(e) {
    if (this.IsModified) {
      (this._ue += e),
        this.uue &&
          !this.vue &&
          (this.Camera.ContainsTag(this.uue.TagId)
            ? this._ue > this.mue && (this._ue = this.mue)
            : this._ue < this.mue + this.cue && this.EndModify(!0, !0));
      let t = void 0,
        i = 0,
        s = 0,
        h = 0;
      var r;
      this._ue < this.mue
        ? ((t = 1),
          (h = this._ue / this.mue),
          (i =
            0 < this.mue ? this.fue.GetCurrentValue(this._ue / this.mue) : 1),
          (s =
            0 < this.mue
              ? this.fue.GetOffsetRate((this._ue - e) / this.mue, e / this.mue)
              : 1))
        : this._ue < this.mue + this.cue
          ? ((t = 2), (i = 1), (s = 1))
          : ((t = 3),
            (r = this._ue - this.mue - this.cue),
            (i = 0 < this.due ? this.pue.GetCurrentValue(r / this.due) : 1),
            (s =
              0 < this.due
                ? this.pue.GetOffsetRate((r - e) / this.due, e / this.due)
                : 1),
            (this.Jue = 0)),
        (this.CurrentBlendState = t),
        this.ece(),
        this.tce(t, i, s),
        this.ice(t, i, s),
        this.oce(t, i, h),
        this.Vra(t, i, h),
        this.rce(t, i, h),
        this.nce(t, i, h),
        this.sce(t, i, h),
        this.ace(t, i, h),
        this._ue > this.mue + this.cue + this.due && this.EndModify(!0, !1);
    }
  }
  tce(t, i, s) {
    if (this.Iue)
      if (this.Tue?.Mesh?.IsValid() && this.Tue?.CharacterActorComponent?.Valid)
        switch (
          (this.Due.FromUeVector(
            this.Tue.Mesh.D_GetSocketLocation(
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
      else this.EndModify(!0, !1);
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
      !this.Camera.IsModifiedArmLength &&
      (this.ModifySettings.IsModifiedArmLength || this.ModifyArmLength)
    ) {
      let t = h,
        i = 0;
      var r = this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera);
      switch (
        ((i = this.ModifySettings.IsModifiedArmLength
          ? this.ModifySettings.ArmLength / r
          : this.Camera.GetArmLengthWithSettingAndZoom(this.Vue) / r),
        this.ModifyArmLength &&
          ((i += this.ModifySettings.ArmLengthAdditional / r),
          (i = Math.max(i, this.Camera.CurrentCamera.MinArmLength / r))),
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
            MathUtils_1.MathUtils.Clamp(
              this.Uh1(),
              this.Camera.CurrentCamera.MinArmLength,
              this.Camera.CurrentCamera.MaxArmLength,
            ) / this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera),
            h,
          )),
            this.ModifySettings.IsModifiedArmLength &&
              (this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition =
                MathUtils_1.MathUtils.Lerp(0, this.jue, h));
      }
      (this.Camera.IsModifiedArmLength = !0),
        (this.Camera.IsModifiedZoomModifier = !0);
    }
  }
  Vra(i, s, h) {
    if (
      !this.Camera.IsModifiedArmOffset &&
      (this.ModifySettings.IsModifiedArmOffset || this.ModifyArmOffset)
    ) {
      this.Fra.DeepCopy(this.ModifySettings.ArmOffset);
      let t = s;
      switch (i) {
        case 1:
          this.ModifySettings.IsUseArmOffsetFloatCurve &&
            (t = this.ModifySettings.ArmOffsetFloatCurve.GetCurrentValue(h)),
            Vector_1.Vector.Lerp(
              this.Hue.ArmOffset,
              this.Fra,
              t,
              this.Camera.DesiredCamera.ArmOffset,
            );
          break;
        case 2:
          this.Camera.DesiredCamera.ArmOffset.DeepCopy(this.Fra);
          break;
        case 3:
          var e = Vector_1.Vector.Create(
            this.Camera.ArmOffsetX,
            this.Camera.ArmOffsetY,
            this.Camera.ArmOffsetZ,
          );
          Vector_1.Vector.Lerp(
            this.Fra,
            e,
            t,
            this.Camera.DesiredCamera.ArmOffset,
          );
      }
      this.Camera.IsModifiedCameraOffset = !0;
    }
  }
  rce(i, s, h) {
    if (
      !this.Camera.IsModifiedCameraOffset &&
      (this.ModifySettings.IsModifiedCameraOffset || this.Sue)
    ) {
      var e = Vector_1.Vector.Create();
      this.ModifySettings.IsModifiedCameraOffset
        ? (e.FromUeVector(this.ModifySettings.CameraOffset),
          e.Set(
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
        : ((e.X = this.Camera.CameraOffsetX),
          (e.Y = this.Camera.CameraOffsetY),
          (e.Z = this.Camera.CameraOffsetZ)),
        this.Sue &&
          e &&
          e.AdditionEqual(
            Vector_1.Vector.Create(this.ModifySettings.CameraOffsetAdditional),
          );
      let t = s;
      switch (i) {
        case 1:
          this.ModifySettings.IsUseCameraOffsetFloatCurve &&
            (t = this.ModifySettings.CameraOffsetFloatCurve.GetCurrentValue(h)),
            Vector_1.Vector.Lerp(
              this.Hue.CameraOffset,
              e,
              t,
              this.Camera.DesiredCamera.CameraOffset,
            );
          break;
        case 2:
          this.Camera.DesiredCamera.CameraOffset.DeepCopy(e);
          break;
        case 3:
          var r = Vector_1.Vector.Create(
            this.Camera.CameraOffsetX,
            this.Camera.CameraOffsetY,
            this.Camera.CameraOffsetZ,
          );
          Vector_1.Vector.Lerp(e, r, t, this.Camera.DesiredCamera.CameraOffset);
      }
      this.Camera.IsModifiedCameraOffset = !0;
    }
  }
  nce(t, i, s) {
    this.Iue && this.Tue?.CharacterActorComponent?.Valid
      ? this.bue.FromUeRotator(
          this.Tue.CharacterActorComponent.ActorRotationProxy,
        )
      : this.bue.FromUeRotator(this.Camera.PlayerRotator),
      this.Camera.IsInNormalGravityMode()
        ? this.Nue.DeepCopy(this.lce())
        : this.Nue.DeepCopy(this.Hhc()),
      this.bue.Quaternion(this.az),
      this.Camera.GravityInverseQuat.Multiply(this.az, this.KJ),
      this.KJ.Rotator(this.Gue),
      this.bue.DeepCopy(this.Gue),
      GravityUtils_1.GravityUtils.GetRotatorInGravity(
        this.Nue,
        this.Camera.GravityInverseQuat,
        this.Nhc,
      ),
      this.Spa(t, i, s, this.bue.Pitch, this.Nhc.Pitch),
      this.Epa(t, i, s, this.bue.Yaw, this.Nhc.Yaw),
      this.ypa(t, i, s, this.bue.Roll, this.Nhc.Roll);
  }
  Spa(i, s, h, e, r) {
    if (
      !this.Camera.IsModifiedArmRotationPitch &&
      ((this.ModifySettings.IsModifiedArmRotation &&
        this.ModifySettings.IsModifiedArmRotationPitch) ||
        this.cpa) &&
      (this.ModifySettings.IsLockInput || !this.Pue)
    ) {
      this.Camera.IsInNormalGravityMode()
        ? (this.ppa = this.Hue.ArmRotation.Pitch)
        : (this.ppa = GravityUtils_1.GravityUtils.GetRotatorInGravity(
            this.Hue.ArmRotation,
            this.Camera.GravityInverseQuat,
            this.Gue,
          ).Pitch),
        this.ModifySettings.IsModifiedArmRotationPitch &&
          (this.Cpa &&
            ((this.que.Pitch = e + this.ModifySettings.ArmRotation.Pitch),
            (this.Cpa = !1)),
          (this.ppa = this.que.Pitch)),
        this.cpa &&
          (this.ppa += this.ModifySettings.ArmRotationAdditional.Pitch),
        (this.Camera.IsModifiedArmRotationPitch =
          this.ModifySettings.IsModifiedArmRotationPitch || this.cpa);
      let t = s;
      switch (
        (this.Gue.DeepCopy(this.Camera.DesiredCamera.ArmRotation),
        this.Gue.Quaternion(this.az),
        i)
      ) {
        case 1:
          var a;
          this.ModifySettings.IsUseArmRotationFloatCurve &&
            (t = this.ModifySettings.ArmRotationFloatCurve.GetCurrentValue(h)),
            this.Camera.IsInNormalGravityMode()
              ? (this.Camera.DesiredCamera.ArmRotation.Pitch =
                  Rotator_1.Rotator.AxisLerp(
                    this.Hue.ArmRotation.Pitch,
                    this.ppa,
                    t,
                  ))
              : ((a = GravityUtils_1.GravityUtils.GetRotatorInGravity(
                  this.Hue.ArmRotation,
                  this.Camera.GravityInverseQuat,
                  this.Gue,
                ).Pitch),
                GravityUtils_1.GravityUtils.GetRotatorInGravity(
                  this.Camera.DesiredCamera.ArmRotation,
                  this.Camera.GravityInverseQuat,
                  this.EPn,
                ),
                (this.EPn.Pitch = Rotator_1.Rotator.AxisLerp(a, this.ppa, t)),
                GravityUtils_1.GravityUtils.GetRotatorInNormal(
                  this.EPn,
                  this.Camera.GravityQuat,
                  this.Camera.DesiredCamera.ArmRotation,
                ));
          break;
        case 2:
          this.Camera.IsInNormalGravityMode()
            ? (this.Camera.DesiredCamera.ArmRotation.Pitch = this.ppa)
            : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
                this.Camera.DesiredCamera.ArmRotation,
                this.Camera.GravityInverseQuat,
                this.EPn,
              ),
              (this.EPn.Pitch = this.ppa),
              GravityUtils_1.GravityUtils.GetRotatorInNormal(
                this.EPn,
                this.Camera.GravityQuat,
                this.Camera.DesiredCamera.ArmRotation,
              ));
          break;
        case 3:
          this.Camera.IsInNormalGravityMode()
            ? (this.Camera.DesiredCamera.ArmRotation.Pitch =
                Rotator_1.Rotator.AxisLerp(this.ppa, r, t))
            : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
                this.Camera.DesiredCamera.ArmRotation,
                this.Camera.GravityInverseQuat,
                this.EPn,
              ),
              (this.EPn.Pitch = Rotator_1.Rotator.AxisLerp(this.ppa, r, t)),
              GravityUtils_1.GravityUtils.GetRotatorInNormal(
                this.EPn,
                this.Camera.GravityQuat,
                this.Camera.DesiredCamera.ArmRotation,
              ));
      }
    }
  }
  Epa(i, s, h, e, r) {
    if (
      !this.Camera.IsModifiedArmRotationYaw &&
      ((this.ModifySettings.IsModifiedArmRotation &&
        this.ModifySettings.IsModifiedArmRotationYaw) ||
        this.mpa) &&
      (this.ModifySettings.IsLockInput || !this.Pue)
    ) {
      this.Camera.IsInNormalGravityMode()
        ? (this.vpa = this.Hue.ArmRotation.Yaw)
        : (this.vpa = GravityUtils_1.GravityUtils.GetRotatorInGravity(
            this.Hue.ArmRotation,
            this.Camera.GravityInverseQuat,
            this.Gue,
          ).Yaw),
        this.ModifySettings.IsModifiedArmRotationYaw &&
          (this.gpa &&
            ((this.que.Yaw = e + this.ModifySettings.ArmRotation.Yaw),
            (this.gpa = !1)),
          (this.vpa = this.que.Yaw)),
        this.mpa && (this.vpa += this.ModifySettings.ArmRotationAdditional.Yaw),
        (this.Camera.IsModifiedArmRotationYaw =
          this.ModifySettings.IsModifiedArmRotationYaw || this.mpa);
      let t = s;
      switch (i) {
        case 1:
          var a;
          this.ModifySettings.IsUseArmRotationFloatCurve &&
            (t = this.ModifySettings.ArmRotationFloatCurve.GetCurrentValue(h)),
            this.Camera.IsInNormalGravityMode()
              ? (this.Camera.DesiredCamera.ArmRotation.Yaw =
                  Rotator_1.Rotator.AxisLerp(
                    this.Hue.ArmRotation.Yaw,
                    this.vpa,
                    t,
                  ))
              : ((a = GravityUtils_1.GravityUtils.GetRotatorInGravity(
                  this.Hue.ArmRotation,
                  this.Camera.GravityInverseQuat,
                  this.Gue,
                ).Yaw),
                GravityUtils_1.GravityUtils.GetRotatorInGravity(
                  this.Camera.DesiredCamera.ArmRotation,
                  this.Camera.GravityInverseQuat,
                  this.EPn,
                ),
                (this.EPn.Yaw = Rotator_1.Rotator.AxisLerp(a, this.vpa, t)),
                GravityUtils_1.GravityUtils.GetRotatorInNormal(
                  this.EPn,
                  this.Camera.GravityQuat,
                  this.Camera.DesiredCamera.ArmRotation,
                ));
          break;
        case 2:
          this.Camera.IsInNormalGravityMode()
            ? (this.Camera.DesiredCamera.ArmRotation.Yaw = this.vpa)
            : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
                this.Camera.DesiredCamera.ArmRotation,
                this.Camera.GravityInverseQuat,
                this.EPn,
              ),
              (this.EPn.Yaw = this.vpa),
              GravityUtils_1.GravityUtils.GetRotatorInNormal(
                this.EPn,
                this.Camera.GravityQuat,
                this.Camera.DesiredCamera.ArmRotation,
              ));
          break;
        case 3:
          this.Camera.IsInNormalGravityMode()
            ? (this.Camera.DesiredCamera.ArmRotation.Yaw =
                Rotator_1.Rotator.AxisLerp(this.vpa, r, t))
            : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
                this.Camera.DesiredCamera.ArmRotation,
                this.Camera.GravityInverseQuat,
                this.EPn,
              ),
              (this.EPn.Yaw = Rotator_1.Rotator.AxisLerp(this.vpa, r, t)),
              GravityUtils_1.GravityUtils.GetRotatorInNormal(
                this.EPn,
                this.Camera.GravityQuat,
                this.Camera.DesiredCamera.ArmRotation,
              ));
      }
    }
  }
  ypa(i, s, h, e, r) {
    if (
      !this.Camera.IsModifiedArmRotationRoll &&
      ((this.ModifySettings.IsModifiedArmRotation &&
        this.ModifySettings.IsModifiedArmRotationRoll) ||
        this.dpa)
    ) {
      this.Camera.IsInNormalGravityMode()
        ? (this.Mpa = this.Hue.ArmRotation.Roll)
        : (this.Mpa = GravityUtils_1.GravityUtils.GetRotatorInGravity(
            this.Hue.ArmRotation,
            this.Camera.GravityInverseQuat,
            this.Gue,
          ).Roll),
        this.ModifySettings.IsModifiedArmRotationRoll &&
          (this.fpa &&
            ((this.que.Roll = e + this.ModifySettings.ArmRotation.Roll),
            (this.fpa = !1)),
          (this.Mpa = this.que.Roll)),
        this.dpa &&
          (this.Mpa += this.ModifySettings.ArmRotationAdditional.Roll),
        (this.Camera.IsModifiedArmRotationRoll =
          this.ModifySettings.IsModifiedArmRotationRoll || this.dpa);
      let t = s;
      switch (i) {
        case 1:
          var a;
          this.ModifySettings.IsUseArmRotationFloatCurve &&
            (t = this.ModifySettings.ArmRotationFloatCurve.GetCurrentValue(h)),
            this.Camera.IsInNormalGravityMode()
              ? (this.Camera.DesiredCamera.ArmRotation.Roll =
                  Rotator_1.Rotator.AxisLerp(
                    this.Hue.ArmRotation.Roll,
                    this.Mpa,
                    t,
                  ))
              : ((a = GravityUtils_1.GravityUtils.GetRotatorInGravity(
                  this.Hue.ArmRotation,
                  this.Camera.GravityInverseQuat,
                  this.Gue,
                ).Roll),
                GravityUtils_1.GravityUtils.GetRotatorInGravity(
                  this.Camera.DesiredCamera.ArmRotation,
                  this.Camera.GravityInverseQuat,
                  this.EPn,
                ),
                (this.EPn.Roll = Rotator_1.Rotator.AxisLerp(a, this.Mpa, t)),
                GravityUtils_1.GravityUtils.GetRotatorInNormal(
                  this.EPn,
                  this.Camera.GravityQuat,
                  this.Camera.DesiredCamera.ArmRotation,
                ));
          break;
        case 2:
          this.Camera.IsInNormalGravityMode()
            ? (this.Camera.DesiredCamera.ArmRotation.Roll = this.Mpa)
            : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
                this.Camera.DesiredCamera.ArmRotation,
                this.Camera.GravityInverseQuat,
                this.EPn,
              ),
              (this.EPn.Roll = this.Mpa),
              GravityUtils_1.GravityUtils.GetRotatorInNormal(
                this.EPn,
                this.Camera.GravityQuat,
                this.Camera.DesiredCamera.ArmRotation,
              ));
          break;
        case 3:
          this.Camera.IsInNormalGravityMode()
            ? (this.Camera.DesiredCamera.ArmRotation.Roll =
                Rotator_1.Rotator.AxisLerp(this.Mpa, r, t))
            : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
                this.Camera.DesiredCamera.ArmRotation,
                this.Camera.GravityInverseQuat,
                this.EPn,
              ),
              (this.EPn.Roll = Rotator_1.Rotator.AxisLerp(this.Mpa, r, t)),
              GravityUtils_1.GravityUtils.GetRotatorInNormal(
                this.EPn,
                this.Camera.GravityQuat,
                this.Camera.DesiredCamera.ArmRotation,
              ));
      }
    }
  }
  ece() {
    var [t, i] = this.Camera?.CharacterEntityHandle.Entity.GetComponent(
      61,
    )?.GetCameraInput() ?? [0, 0];
    (Math.abs(t) > MathUtils_1.MathUtils.KindaSmallNumber ||
      Math.abs(i) > MathUtils_1.MathUtils.KindaSmallNumber) &&
      (this.Pue = !0);
  }
  lce() {
    return this.ModifySettings.ResetFinalArmRotation
      ? (this.ModifySettings.IsResetFinalArmRotationToSpecificPitch
          ? (this.Nue.Pitch =
              this.ModifySettings.ResetFinalArmRotationToSpecificPitch)
          : (this.Nue.Pitch = this.Camera.DesiredCamera.ArmRotation.Pitch),
        this.ModifySettings.IsResetFinalArmRotationToSpecificYaw
          ? (CameraUtility_1.CameraUtility.GetCameraCharacterRotation(this.Gue),
            (this.Nue.Yaw =
              this.Gue.Yaw +
              this.ModifySettings.ResetFinalArmRotationToSpecificYaw))
          : (this.Nue.Yaw = this.Camera.DesiredCamera.ArmRotation.Yaw),
        (this.Nue.Roll = 0),
        this.Nue)
      : this.Vue.ArmRotation;
  }
  Hhc() {
    return (
      this.Nue.Reset(),
      this.Gue.Reset(),
      this.ModifySettings.ResetFinalArmRotation
        ? (this.ModifySettings.IsResetFinalArmRotationToSpecificPitch ||
            (this.Nue.Pitch = this.Camera.DesiredCamera.ArmRotation.Pitch),
          this.ModifySettings.IsResetFinalArmRotationToSpecificYaw ||
            (this.Nue.Yaw = this.Camera.DesiredCamera.ArmRotation.Yaw),
          (this.Nue.Roll = 0),
          GravityUtils_1.GravityUtils.GetRotatorInGravity(
            this.Nue,
            this.Camera.GravityInverseQuat,
            this.EPn,
          ),
          this.ModifySettings.IsResetFinalArmRotationToSpecificPitch &&
            (this.EPn.Pitch =
              this.ModifySettings.ResetFinalArmRotationToSpecificPitch),
          this.ModifySettings.IsResetFinalArmRotationToSpecificYaw &&
            (CameraUtility_1.CameraUtility.GetCameraCharacterRotation(this.Vhc),
            GravityUtils_1.GravityUtils.GetRotatorInGravity(
              this.Vhc,
              this.Camera.GravityInverseQuat,
              this.jhc,
            ),
            (this.EPn.Yaw =
              this.jhc.Yaw +
              this.ModifySettings.ResetFinalArmRotationToSpecificYaw)),
          (this.EPn.Roll = 0),
          GravityUtils_1.GravityUtils.GetRotatorInNormal(
            this.EPn,
            this.Camera.GravityQuat,
            this.Nue,
          ),
          this.Nue)
        : this.Vue.ArmRotation
    );
  }
  hce() {
    return (
      this.ModifySettings.ResetFinalArmLength
        ? this.Camera.DesiredCamera
        : this.Vue
    ).ArmLength;
  }
  Uh1() {
    if (
      this.ModifySettings.ResetFinalArmLength &&
      this.ModifySettings.IsModifiedArmLength
    ) {
      const t = MathUtils_1.MathUtils.Clamp(
        this.ModifySettings.IsResetFinalArmLengthToSpecificValue
          ? this.ModifySettings.ResetFinalArmLengthToSpecificValue
          : this.ModifySettings.ArmLength +
              (this.ModifyArmLength
                ? this.ModifySettings.ArmLengthAdditional
                : 0),
        this.Camera.CurrentCamera.MinArmLength,
        this.Camera.CurrentCamera.MaxArmLength,
      );
      return t;
    }
    const t = MathUtils_1.MathUtils.Clamp(
      this.Vue.ZoomModifier * this.Camera.GetArmLengthWithSetting(this.Vue),
      this.Camera.CurrentCamera.MinArmLength,
      this.Camera.CurrentCamera.MaxArmLength,
    );
    return t;
  }
  sce(i, s, h) {
    if (!this.Camera.IsModifiedFov && this.Uue) {
      let t = s;
      var e = this.ModifySettings.IsModifiedCameraFov
        ? this.ModifySettings.CameraFov
        : this.Vue.Fov;
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
      let t = e,
        i = void 0,
        s = 0;
      var a = this.ModifySettings.CameraLens;
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
  EndModify(t, i) {
    this.IsModified &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Camera", 6, "EndModify", ["withFadeOut", t]),
      (this.Jue = 0),
      this.Camera.CameraAdjustController.Unlock(this),
      this.Camera.CameraGuideController.Unlock(this),
      this.ModifySettings.OverrideCameraInput &&
        ((this.cpa ||
          (this.ModifySettings.IsModifiedArmRotation &&
            this.ModifySettings.IsModifiedArmRotationPitch)) &&
          this.Camera.CameraInputController.UnlockArmRotationPitch(this),
        (this.mpa ||
          (this.ModifySettings.IsModifiedArmRotation &&
            this.ModifySettings.IsModifiedArmRotationYaw)) &&
          this.Camera.CameraInputController.UnlockArmRotationYaw(this),
        this.ModifyArmLength || this.ModifySettings.IsModifiedArmLength) &&
        this.Camera.CameraInputController.UnlockArmLength(this),
      t ? this.uce(i) : this.EndModifyFadeOut(),
      (this.Mue = void 0),
      (this.j1_ = void 0),
      this.Eue?.IsValid() &&
        (this.Eue.OnMontageStarted.Remove(this.Xue),
        this.Eue.OnMontageEnded.Remove(this.Kue),
        this.Eue.OnAllMontageInstancesEnded.Remove(this.Gjs),
        (this.Eue = void 0)),
      (this.ModifyArmLength = !1),
      (this.ModifyArmOffset = !1),
      (this.ModifySettings.IsModifiedCameraOffset || this.Sue) &&
        (this.Sue = !1),
      this.yue && ((this.cpa = !1), (this.mpa = !1), (this.dpa = !1)),
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
    (this.ModifyFadeOutData.ModifyArmLength =
      this.ModifySettings.IsModifiedArmLength || this.ModifyArmLength),
      this.ModifyFadeOutData.ModifyArmLength &&
        ((this.ModifyFadeOutData.StartArmLength =
          this.Camera.CurrentCamera.ArmLength),
        (this.ModifyFadeOutData.ArmLength = this.hce())),
      (this.ModifyFadeOutData.ModifyZoomModifier =
        this.ModifyFadeOutData.ModifyArmLength),
      this.ModifyFadeOutData.ModifyZoomModifier &&
        ((this.ModifyFadeOutData.StartFinalArmLength =
          this.Camera.GetArmLengthWithSettingAndZoom(
            this.Camera.CurrentCamera,
            !1,
          )),
        (this.ModifyFadeOutData.FinalArmLength = this.Uh1())),
      (this.ModifyFadeOutData.ModifyArmOffset =
        this.ModifySettings.IsModifiedArmOffset || this.ModifyArmOffset),
      this.ModifyFadeOutData.ModifyArmOffset &&
        ((this.ModifyFadeOutData.StartArmOffset =
          this.Camera.CurrentCamera.ArmOffset),
        this.ModifyFadeOutData.ArmOffset.DeepCopy(this.Vue.ArmOffset)),
      GravityUtils_1.GravityUtils.GetRotatorInGravity(
        this.Camera.CurrentCamera.ArmRotation,
        this.Camera.GravityInverseQuat,
        this.Fhc,
      ),
      this.Camera.IsInNormalGravityMode()
        ? this.Nue.DeepCopy(this.lce())
        : this.Nue.DeepCopy(this.Hhc()),
      GravityUtils_1.GravityUtils.GetRotatorInGravity(
        this.Nue,
        this.Camera.GravityInverseQuat,
        this.Nhc,
      ),
      (this.ModifyFadeOutData.ModifyArmRotationPitch =
        (this.cpa ||
          (this.ModifySettings.IsModifiedArmRotation &&
            this.ModifySettings.IsModifiedArmRotationPitch)) &&
        (this.ModifySettings.IsLockInput || !this.Pue)),
      this.ModifyFadeOutData.ModifyArmRotationPitch &&
        ((this.ModifyFadeOutData.StartArmRotationPitch = this.Fhc.Pitch),
        (this.ModifyFadeOutData.ArmRotationPitch = this.Nhc.Pitch)),
      (this.ModifyFadeOutData.ModifyArmRotationYaw =
        (this.mpa ||
          (this.ModifySettings.IsModifiedArmRotation &&
            this.ModifySettings.IsModifiedArmRotationYaw)) &&
        (this.ModifySettings.IsLockInput || !this.Pue)),
      this.ModifyFadeOutData.ModifyArmRotationYaw &&
        ((this.ModifyFadeOutData.StartArmRotationYaw = this.Fhc.Yaw),
        (this.ModifyFadeOutData.ArmRotationYaw = this.Nhc.Yaw)),
      (this.ModifyFadeOutData.ModifyArmRotationRoll =
        (this.dpa ||
          (this.ModifySettings.IsModifiedArmRotation &&
            this.ModifySettings.IsModifiedArmRotationRoll)) &&
        !MathUtils_1.MathUtils.IsNearlyZero(
          this.Camera.DesiredCamera.ArmRotation.Roll,
          MathUtils_1.MathUtils.KindaSmallNumber,
        )),
      this.ModifyFadeOutData.ModifyArmRotationRoll &&
        ((this.ModifyFadeOutData.StartArmRotationRoll = this.Fhc.Roll),
        (this.ModifyFadeOutData.ArmRotationRoll = 0)),
      (this.ModifyFadeOutData.ModifyCameraOffset =
        this.ModifySettings.IsModifiedCameraOffset || this.Sue),
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
        this.ModifyFadeOutData.ModifyArmOffset ||
        this.ModifyFadeOutData.ModifyArmRotationPitch ||
        this.ModifyFadeOutData.ModifyArmRotationYaw ||
        this.ModifyFadeOutData.ModifyArmRotationRoll ||
        this.ModifyFadeOutData.ModifyCameraOffset ||
        this.ModifyFadeOutData.ModifyFov ||
        this.ModifyFadeOutData.ModifyPlayerLocation);
  }
  EndModifyFadeOut() {
    (this.IsModifyFadeOut = !1),
      (this.ModifyFadeOutData.ModifyArmLength = !1),
      (this.ModifyFadeOutData.ModifyArmOffset = !1),
      (this.ModifyFadeOutData.ModifyArmRotationPitch = !1),
      (this.ModifyFadeOutData.ModifyArmRotationYaw = !1),
      (this.ModifyFadeOutData.ModifyArmRotationRoll = !1),
      (this.ModifyFadeOutData.ModifyCameraOffset = !1),
      (this.ModifyFadeOutData.ModifyFov = !1),
      (this.ModifyFadeOutData.ModifyPlayerLocation = !1);
  }
  zue(t) {
    var i, s, h, e, r;
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
          : ((i.FinalArmLength = MathUtils_1.MathUtils.Clamp(
              i.FinalArmLength,
              this.Camera.CurrentCamera.MinArmLength,
              this.Camera.CurrentCamera.MaxArmLength,
            )),
            (r = 0),
            ([i.ModifyZoomModifier, r] = i.UseFadeOutTimeLerp
              ? this.FloatLerp(
                  i.StartFinalArmLength,
                  i.FinalArmLength,
                  e,
                  MathUtils_1.MathUtils.KindaSmallNumber,
                )
              : this.FloatInterpTo(
                  this.Camera.GetArmLengthWithSettingAndZoom(
                    this.Camera.CurrentCamera,
                    !1,
                  ),
                  i.FinalArmLength,
                  t,
                  this.ModifyArmLengthLagSpeed,
                  MODIFY_SMALL_LENGTH,
                )),
            (h.ZoomModifier =
              r /
              this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera)),
            (this.Camera.IsModifiedZoomModifier = !0))),
      i.ModifyArmOffset &&
        (this.Camera.IsModifiedArmOffset
          ? (i.ModifyArmOffset = !1)
          : (([i.ModifyArmOffset, h.ArmOffset] = i.UseFadeOutTimeLerp
              ? this.VectorLerp(
                  i.StartArmOffset,
                  i.ArmOffset,
                  e,
                  MODIFY_SMALL_LENGTH,
                )
              : this.VectorInterpTo(
                  s.ArmOffset,
                  i.ArmOffset,
                  t,
                  this.ModifyArmOffsetLagSpeed,
                  MODIFY_SMALL_LENGTH,
                )),
            (this.Camera.IsModifiedArmOffset = !0))),
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
      this.ece(),
      GravityUtils_1.GravityUtils.GetRotatorInGravity(
        this.Camera.CurrentCamera.ArmRotation,
        this.Camera.GravityInverseQuat,
        this.Fhc,
      ),
      i.ModifyArmRotationPitch &&
        (this.Camera.IsModifiedArmRotationPitch || this.Pue
          ? (i.ModifyArmRotationPitch = !1)
          : this.Camera.IsInNormalGravityMode()
            ? ([i.ModifyArmRotationPitch, h.ArmRotation.Pitch] =
                i.UseFadeOutTimeLerp
                  ? this.RotationAxisLerp(
                      i.StartArmRotationPitch,
                      i.ArmRotationPitch,
                      e,
                      MODIFY_SMALL_LENGTH,
                    )
                  : this.RotationAxisInterpTo(
                      s.ArmRotation.Pitch,
                      i.ArmRotationPitch,
                      t,
                      this.ModifyArmRotationLagSpeed,
                      MODIFY_SMALL_LENGTH,
                    ))
            : ((r = 0),
              ([i.ModifyArmRotationPitch, r] = i.UseFadeOutTimeLerp
                ? this.RotationAxisLerp(
                    i.StartArmRotationPitch,
                    i.ArmRotationPitch,
                    e,
                    MODIFY_SMALL_LENGTH,
                  )
                : this.RotationAxisInterpTo(
                    this.Fhc.Pitch,
                    i.ArmRotationPitch,
                    t,
                    this.ModifyArmRotationLagSpeed,
                    MODIFY_SMALL_LENGTH,
                  )),
              GravityUtils_1.GravityUtils.GetRotatorInGravity(
                this.Camera.DesiredCamera.ArmRotation,
                this.Camera.GravityInverseQuat,
                this.EPn,
              ),
              (this.EPn.Pitch = r),
              GravityUtils_1.GravityUtils.GetRotatorInNormal(
                this.EPn,
                this.Camera.GravityQuat,
                this.Camera.DesiredCamera.ArmRotation,
              ))),
      i.ModifyArmRotationYaw &&
        (this.Camera.IsModifiedArmRotationYaw || this.Pue
          ? (i.ModifyArmRotationYaw = !1)
          : this.Camera.IsInNormalGravityMode()
            ? ([i.ModifyArmRotationYaw, h.ArmRotation.Yaw] =
                i.UseFadeOutTimeLerp
                  ? this.RotationAxisLerp(
                      i.StartArmRotationYaw,
                      i.ArmRotationYaw,
                      e,
                      MODIFY_SMALL_LENGTH,
                    )
                  : this.RotationAxisInterpTo(
                      s.ArmRotation.Yaw,
                      i.ArmRotationYaw,
                      t,
                      this.ModifyArmRotationLagSpeed,
                      MODIFY_SMALL_LENGTH,
                    ))
            : ((r = 0),
              ([i.ModifyArmRotationYaw, r] = i.UseFadeOutTimeLerp
                ? this.RotationAxisLerp(
                    i.StartArmRotationYaw,
                    i.ArmRotationYaw,
                    e,
                    MODIFY_SMALL_LENGTH,
                  )
                : this.RotationAxisInterpTo(
                    this.Fhc.Yaw,
                    i.ArmRotationYaw,
                    t,
                    this.ModifyArmRotationLagSpeed,
                    MODIFY_SMALL_LENGTH,
                  )),
              GravityUtils_1.GravityUtils.GetRotatorInGravity(
                this.Camera.DesiredCamera.ArmRotation,
                this.Camera.GravityInverseQuat,
                this.EPn,
              ),
              (this.EPn.Yaw = r),
              GravityUtils_1.GravityUtils.GetRotatorInNormal(
                this.EPn,
                this.Camera.GravityQuat,
                this.Camera.DesiredCamera.ArmRotation,
              ))),
      i.ModifyArmRotationRoll &&
        (this.Camera.IsModifiedArmRotationRoll
          ? (i.ModifyArmRotationRoll = !1)
          : this.Camera.IsInNormalGravityMode()
            ? ([i.ModifyArmRotationRoll, h.ArmRotation.Roll] =
                i.UseFadeOutTimeLerp
                  ? this.RotationAxisLerp(
                      i.StartArmRotationRoll,
                      i.ArmRotationRoll,
                      e,
                      MODIFY_SMALL_LENGTH,
                    )
                  : this.RotationAxisInterpTo(
                      s.ArmRotation.Roll,
                      i.ArmRotationRoll,
                      t,
                      this.ModifyArmRotationLagSpeed,
                      MODIFY_SMALL_LENGTH,
                    ))
            : ((r = 0),
              ([i.ModifyArmRotationRoll, r] = i.UseFadeOutTimeLerp
                ? this.RotationAxisLerp(
                    i.StartArmRotationRoll,
                    i.ArmRotationRoll,
                    e,
                    MODIFY_SMALL_LENGTH,
                  )
                : this.RotationAxisInterpTo(
                    this.Fhc.Roll,
                    i.ArmRotationRoll,
                    t,
                    this.ModifyArmRotationLagSpeed,
                    MODIFY_SMALL_LENGTH,
                  )),
              GravityUtils_1.GravityUtils.GetRotatorInGravity(
                this.Camera.DesiredCamera.ArmRotation,
                this.Camera.GravityInverseQuat,
                this.EPn,
              ),
              (this.EPn.Roll = r),
              GravityUtils_1.GravityUtils.GetRotatorInNormal(
                this.EPn,
                this.Camera.GravityQuat,
                this.Camera.DesiredCamera.ArmRotation,
              ))),
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
            i.ModifyArmOffset ||
            i.ModifyZoomModifier ||
            i.ModifyCameraOffset ||
            i.ModifyArmRotationPitch ||
            i.ModifyArmRotationYaw ||
            i.ModifyArmRotationRoll ||
            i.ModifyFov ||
            i.ModifyPlayerLocation));
  }
  Gqn(t, i) {
    let s = void 0;
    return (s = t
      ? t.GetEntityNoBlueprint()
      : i?.GetEntityNoBlueprint()?.GetComponent(0)?.IsVision()
        ? i?.GetEntityNoBlueprint()
        : this.Camera.CharacterEntityHandle.Entity)?.GetComponent(175)
      ?.MainAnimInstance;
  }
  FloatInterpTo(t, i, s, h, e) {
    s = MathUtils_1.MathUtils.InterpTo(t, i, s, h);
    return Math.abs(t - i) < e ? [!1, i] : [!0, s];
  }
  VectorInterpTo(t, i, s, h, e) {
    var r = Vector_1.Vector.Create(),
      s =
        (MathUtils_1.MathUtils.VectorInterpTo(t, i, s, h, r),
        Vector_1.Vector.Create());
    return (
      t.Subtraction(i, s),
      s.GetAbsMax() < e ? (r.DeepCopy(i), [!1, r]) : [!0, r]
    );
  }
  RotationInterpTo(t, i, s, h, e) {
    var r = Rotator_1.Rotator.Create();
    return (
      MathUtils_1.MathUtils.RotatorInterpTo(t, i, s, h, r),
      t.Equals(i, e) ? (r.DeepCopy(i), [!1, r]) : [!0, r]
    );
  }
  RotationAxisInterpTo(t, i, s, h, e) {
    s = MathUtils_1.MathUtils.RotatorAxisInterpTo(t, i, s, h);
    return MathUtils_1.MathUtils.IsAngleNearEqual(t, i, e) ? [!1, s] : [!0, s];
  }
  FloatLerp(t, i, s, h) {
    s = MathUtils_1.MathUtils.Lerp(t, i, s);
    return Math.abs(t - i) < h ? [!1, i] : [!0, s];
  }
  VectorLerp(t, i, s, h) {
    var e = Vector_1.Vector.Create();
    return (
      Vector_1.Vector.Lerp(t, i, s, e),
      t.Equals(i, h) ? (e.DeepCopy(i), [!1, e]) : [!0, e]
    );
  }
  RotationLerp(t, i, s, h) {
    var e = Rotator_1.Rotator.Create();
    return (
      Rotator_1.Rotator.Lerp(t, i, s, e),
      t.Equals(i, h) ? (e.DeepCopy(i), [!1, e]) : [!0, e]
    );
  }
  RotationAxisLerp(t, i, s, h) {
    s = Rotator_1.Rotator.AxisLerp(t, i, s);
    return MathUtils_1.MathUtils.IsAngleNearEqual(t, i, h) ? [!1, s] : [!0, s];
  }
  StopCameraModify(t) {
    this.j1_ === t && this.EndModify(!0, !0);
  }
}
exports.CameraModifyController = CameraModifyController;
//# sourceMappingURL=CameraModifyController.js.map
