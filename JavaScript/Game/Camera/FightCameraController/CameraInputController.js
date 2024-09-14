"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraInputController = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils"),
  ColorUtils_1 = require("../../Utils/ColorUtils"),
  Switcher_1 = require("../../Utils/Switcher"),
  CameraUtility_1 = require("../CameraUtility"),
  CameraControllerBase_1 = require("./CameraControllerBase"),
  DEFAULT_FPS = 60,
  RANGE_TO_RADIUS = 0.7,
  DEFAULT_SEGMENT = 12,
  MAX_AIM_ASSIST_ANGLE = 40 * MathUtils_1.MathUtils.DegToRad,
  STOP_ON_START_ANGLE_THRESHOLD = 1,
  SHORT_AIM_START_TIME = 0.4,
  AIM_RANGE_TOLERANT = 1.05,
  MIN_PHYSICAL_DENSITY_DPI = 160,
  DEFAULT_DPI = 180,
  MAX_YAW_DELTA_TIME = 0.033,
  MAX_PITCH_DELTA_TIME = 0.033;
class CameraInputController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.ZoomSpeed = 0),
      (this.GamePadZoomSpeed = 0),
      (this.InputSpeedMax = 0),
      (this.InputSpeedPercentage = 0),
      (this.SmoothFactorMin = 0),
      (this.SmoothFactorMax = 0),
      (this.SmoothFactorRange = 0),
      (this.SmoothFactorCurve = void 0),
      (this.GamePadSmoothFactorMin = 0),
      (this.GamePadSmoothFactorMax = 0),
      (this.GamePadSmoothFactorRange = 0),
      (this.GamePadSmoothFactorCurve = void 0),
      (this.SensitivityYawMin = 0),
      (this.SensitivityYawMax = 0),
      (this.SensitivityYawRange = 0),
      (this.SensitivityYawCurve = void 0),
      (this.SensitivityPitchMin = 0),
      (this.SensitivityPitchMax = 0),
      (this.SensitivityPitchRange = 0),
      (this.SensitivityPitchCurve = void 0),
      (this.InputSpeedMin = 0),
      (this.GamepadInputRate = 0),
      (this.AimAssistSpeedCenter = 0),
      (this.AimAssistSpeedEdge = 0),
      (this.AimAssistRange = 0),
      (this.AimAssistDamping = 0),
      (this.AimAssistCurve = void 0),
      (this.AimAssistStartTimeLength = 0),
      (this.AimAssistStartSpeedBegin = 0),
      (this.AimAssistStartSpeedEnd = 0),
      (this.AimAssistStartCurve = void 0),
      (this.N_e = new Switcher_1.Switcher(!0)),
      (this.O_e = new Set()),
      (this.k_e = new Set()),
      (this.F_e = new Set()),
      (this.mae = 0),
      (this.V_e = 0),
      (this.H_e = 0),
      (this.j_e = 0),
      (this.W_e = 0),
      (this.cUa = !1),
      (this.mUa = !1),
      (this.K_e = 0),
      (this.Q_e = void 0),
      (this.X_e = !1),
      (this.uoe = void 0),
      (this.$_e = Vector_1.Vector.Create()),
      (this.Y_e = Vector_1.Vector.Create()),
      (this.Lz = Vector_1.Vector.Create()),
      (this.J_e = Vector_1.Vector.Create()),
      (this.z_e = Vector_1.Vector.Create()),
      (this.Gue = Rotator_1.Rotator.Create()),
      (this.EPn = Rotator_1.Rotator.Create()),
      (this.az = Quat_1.Quat.Create()),
      (this.KJ = Quat_1.Quat.Create()),
      (this.QJ = Quat_1.Quat.Create()),
      (this.eue = []),
      (this.tue = new Array()),
      (this.xOn = 0),
      (this.POn = 0),
      (this.BOn = 0),
      (this.wOn = 0),
      (this.bOn = 0),
      (this.qOn = 0),
      (this.GOn = 0);
  }
  get IsAiming() {
    return (
      this.Camera.ContainsTag(428837378) || this.Camera.ContainsTag(-1058855731)
    );
  }
  Name() {
    return "InputController";
  }
  OnInit() {
    this.SetConfigMap(1, "ZoomSpeed"),
      this.SetConfigMap(24, "GamePadZoomSpeed"),
      this.SetConfigMap(5, "InputSpeedMin"),
      this.SetConfigMap(6, "InputSpeedMax"),
      this.SetConfigMap(2, "SmoothFactorMin"),
      this.SetConfigMap(3, "SmoothFactorMax"),
      this.SetConfigMap(4, "SmoothFactorRange"),
      this.SetCurveConfigMap(4, "SmoothFactorCurve"),
      this.SetConfigMap(21, "GamePadSmoothFactorMin"),
      this.SetConfigMap(22, "GamePadSmoothFactorMax"),
      this.SetConfigMap(23, "GamePadSmoothFactorRange"),
      this.SetCurveConfigMap(23, "GamePadSmoothFactorCurve"),
      this.SetConfigMap(7, "SensitivityYawMin"),
      this.SetConfigMap(8, "SensitivityYawMax"),
      this.SetConfigMap(9, "SensitivityYawRange"),
      this.SetCurveConfigMap(9, "SensitivityYawCurve"),
      this.SetConfigMap(10, "SensitivityPitchMin"),
      this.SetConfigMap(11, "SensitivityPitchMax"),
      this.SetConfigMap(12, "SensitivityPitchRange"),
      this.SetCurveConfigMap(12, "SensitivityPitchCurve"),
      this.SetConfigMap(13, "GamepadInputRate"),
      this.SetConfigMap(14, "AimAssistSpeedCenter"),
      this.SetConfigMap(15, "AimAssistSpeedEdge"),
      this.SetConfigMap(16, "AimAssistRange"),
      this.SetConfigMap(17, "AimAssistDamping"),
      this.SetCurveConfigMap(16, "AimAssistCurve"),
      this.SetConfigMap(18, "AimAssistStartTimeLength"),
      this.SetConfigMap(19, "AimAssistStartSpeedBegin"),
      this.SetConfigMap(20, "AimAssistStartSpeedEnd"),
      this.SetCurveConfigMap(18, "AimAssistStartCurve");
  }
  OnStart() {
    var t, i, s, h;
    super.OnStart(),
      (this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.uoe.bIsSingle = !1),
      (this.uoe.bIgnoreSelf = !0),
      this.uoe.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
      ),
      this.uoe.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic,
      ),
      this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
      this.uoe.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
      ),
      this.uoe.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        this.uoe,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        this.uoe,
        ColorUtils_1.ColorUtils.LinearRed,
      ),
      Info_1.Info.IsMobilePlatform()
        ? ((t = (i = cpp_1.KuroScreen.GetPhysicalScreenResolution()).X),
          (i = i.Y),
          (s = (h =
            GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution())
            .X),
          (h = h.Y),
          (this.xOn = Math.max(s, h)),
          (this.POn = Math.min(s, h)),
          (this.BOn = Math.max(t, i)),
          (this.wOn = Math.min(t, i)),
          1 === Info_1.Info.PlatformType
            ? (this.bOn = Math.max(
                cpp_1.KuroScreen.ComputePhysicalScreenDensity(),
                MIN_PHYSICAL_DENSITY_DPI,
              ))
            : (this.bOn = Math.max(
                cpp_1.KuroScreen.GetPhysicalScreenDensityDPI(),
                MIN_PHYSICAL_DENSITY_DPI,
              )),
          (MathUtils_1.MathUtils.IsNearlyEqual(this.BOn, 0) ||
            MathUtils_1.MathUtils.IsNearlyEqual(this.wOn, 0)) &&
            ((this.BOn = this.xOn), (this.wOn = this.POn)),
          (this.qOn = this.BOn / (this.xOn * this.bOn)),
          (this.GOn = this.wOn / (this.POn * this.bOn)),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Camera",
              58,
              "CameraInputController",
              ["GameScreenWidth", this.xOn],
              ["GameScreenHeight", this.POn],
              ["PhysicalScreenWidth", this.BOn],
              ["PhysicalScreenHeight", this.wOn],
              ["PhysicalDensityDpi", this.bOn],
              ["MobileDensityYawScale", this.qOn],
              ["MobileDensityPitchScale", this.GOn],
            ))
        : ((this.qOn = 1 / DEFAULT_DPI), (this.GOn = 1 / DEFAULT_DPI));
  }
  OnDisable() {
    (this.K_e = 0), (this.W_e = 0), (this.j_e = 0);
  }
  UpdateInternal(t) {
    var i = this.Camera.ContainsAnyTag([-1150819426, 1260125908]);
    (this.Camera.TargetEntity &&
      this.Camera.IsTargetLocationValid &&
      (i || !this.Camera.CameraFocusController.CanMoveCameraInSoftLock())) ||
      this.iue(t),
      this.oue(t),
      this.rue();
  }
  LockArmRotationYaw(t) {
    this.O_e.add(t);
  }
  LockArmRotationPitch(t) {
    this.k_e.add(t);
  }
  UnlockArmRotationYaw(t) {
    this.O_e.delete(t);
  }
  UnlockArmRotationPitch(t) {
    this.k_e.delete(t);
  }
  LockArmLength(t) {
    this.F_e.add(t);
  }
  UnlockArmLength(t) {
    this.F_e.delete(t);
  }
  SetInputEnable(t, i) {
    this.N_e.SetActive(t, i);
  }
  iue(s) {
    var h = this.Camera.CharacterEntityHandle;
    if (h && h.IsInit)
      if (this.Camera.CharacterController)
        if (this.N_e.Active) {
          (this.cUa = !1), (this.mUa = !1);
          var e = this.Camera.CurrentCamera.ArmRotation,
            a = h.Entity.GetComponent(164);
          let [t, i] = h.Entity.GetComponent(54).GetCameraInput();
          Info_1.Info.IsInGamepad()
            ? ModelManager_1.ModelManager.ControlScreenModel?.IsTouching
              ? ((t *= DEFAULT_DPI * this.qOn), (i *= DEFAULT_DPI * this.GOn))
              : ((t *= this.GamepadInputRate), (i *= this.GamepadInputRate))
            : Info_1.Info.IsInKeyBoard()
              ? ((t /= DEFAULT_FPS), (i /= DEFAULT_FPS))
              : Info_1.Info.IsInTouch() &&
                ((t *= DEFAULT_DPI * this.qOn), (i *= DEFAULT_DPI * this.GOn));
          var h = ModelManager_1.ModelManager.CameraModel,
            h =
              (this.IsAiming
                ? ((t *= h.CameraAimingYawSensitivityInputModifier),
                  (i *= h.CameraAimingPitchSensitivityInputModifier))
                : ((t *= h.CameraBaseYawSensitivityInputModifier),
                  (i *= h.CameraBasePitchSensitivityInputModifier)),
              Math.sqrt(t * t + i * i)),
            r =
              ((t *=
                MathUtils_1.MathUtils.Lerp(
                  this.SensitivityYawMin,
                  this.SensitivityYawMax,
                  this.SensitivityYawCurve.GetCurrentValue(
                    h / this.SensitivityYawRange,
                  ),
                ) * Math.min(s, MAX_YAW_DELTA_TIME)),
              (i *=
                MathUtils_1.MathUtils.Lerp(
                  this.SensitivityPitchMin,
                  this.SensitivityPitchMax,
                  this.SensitivityPitchCurve.GetCurrentValue(
                    h / this.SensitivityPitchRange,
                  ),
                ) * Math.min(s, MAX_PITCH_DELTA_TIME)),
              (this.X_e = !1),
              this.nue(s, !(!t && !i))),
            h =
              (r &&
                ((t *= 1 - this.AimAssistDamping),
                (i *= 1 - this.AimAssistDamping)),
              this.upa(h, s));
          (this.j_e = this.j_e * h + t * (1 - h)),
            (this.W_e = this.W_e * h + i * (1 - h)),
            (this.j_e = MathUtils_1.MathUtils.Clamp(
              this.j_e,
              -this.InputSpeedMax,
              this.InputSpeedMax,
            )),
            (this.W_e = MathUtils_1.MathUtils.Clamp(
              this.W_e,
              -this.InputSpeedMax,
              this.InputSpeedMax,
            )),
            1 === this.Camera.CameraCollision.CurrentBlendState &&
              ((this.Camera.CameraCollision.IsLeftCollision && 0 < this.j_e) ||
                (this.Camera.CameraCollision.IsRightCollision &&
                  this.j_e < 0)) &&
              (this.j_e = 0),
            (this.InputSpeedPercentage = Math.abs(
              this.j_e / this.InputSpeedMax,
            )),
            this.Gue.DeepCopy(e),
            this.Gue.Quaternion(this.az),
            0 !== this.O_e.size ||
              MathUtils_1.MathUtils.IsNearlyZero(
                this.j_e,
                this.InputSpeedMin,
              ) ||
              ((this.cUa = !0),
              (this.Camera.IsModifiedArmRotationYaw = !0),
              !a || a.IsStandardGravity
                ? (this.Gue.Yaw = MathUtils_1.MathUtils.WrapAngle(
                    this.Gue.Yaw +
                      this.j_e * this.Camera.CharacterController.InputYawScale,
                  ))
                : (Quat_1.Quat.ConstructorByAxisAngle(
                    a.GravityUp,
                    this.j_e *
                      this.Camera.CharacterController.InputYawScale *
                      MathUtils_1.MathUtils.DegToRad,
                    this.KJ,
                  ),
                  this.KJ.Multiply(this.az, this.QJ),
                  this.az.DeepCopy(this.QJ))),
            0 !== this.k_e.size ||
              MathUtils_1.MathUtils.IsNearlyZero(
                this.W_e,
                this.InputSpeedMin,
              ) ||
              ((this.mUa = !0),
              (this.Camera.IsModifiedArmRotationPitch = !0),
              (h = this.Camera.GetCameraPitchInGravity()),
              (e = MathUtils_1.MathUtils.Clamp(
                h + this.W_e * this.Camera.CharacterController.InputPitchScale,
                -90,
                90,
              )),
              !a || a.IsStandardGravity
                ? (this.Gue.Pitch = e)
                : ((e = e - h),
                  Math.abs(e) > MathUtils_1.MathUtils.SmallNumber &&
                    (this.EPn.Set(e, 0, 0),
                    this.EPn.Quaternion(this.KJ),
                    this.az.Multiply(this.KJ, this.QJ),
                    this.az.DeepCopy(this.QJ)))),
            (this.cUa || this.mUa) &&
              (!a || a.IsStandardGravity
                ? this.Camera.DesiredCamera.ArmRotation.DeepCopy(this.Gue)
                : this.az.Rotator(this.Camera.DesiredCamera.ArmRotation)),
            r && this.sue(s);
        } else this.K_e = 0;
      else this.K_e = 0;
    else this.K_e = 0;
  }
  oue(t) {
    var i = this.Camera.CharacterEntityHandle;
    i &&
      i.IsInit &&
      (!this.N_e.Active ||
        0 < this.F_e.size ||
        this.Camera.IsModifiedArmLength ||
        ((i = -i.Entity.GetComponent(54).GetZoomInput() * t) &&
          ((t =
            (i *
              (Info_1.Info.IsInGamepad()
                ? this.GamePadZoomSpeed
                : this.ZoomSpeed)) /
            (this.Camera.DesiredCamera.MaxArmLength -
              this.Camera.DesiredCamera.MinArmLength)),
          this.aue(this.Camera.DesiredCamera.ZoomModifier + t),
          (this.Camera.IsModifiedArmLength = !0))));
  }
  rue() {
    this.Camera.IsModifiedArmLength ||
      (this.mae <= 0 || this.V_e <= 0 || this.H_e <= 0
        ? ((this.mae = this.Camera.CurrentCamera.ArmLength),
          (this.V_e = this.Camera.CurrentCamera.MinArmLength),
          (this.H_e = this.Camera.CurrentCamera.MaxArmLength))
        : (MathUtils_1.MathUtils.IsNearlyEqual(
            this.V_e,
            this.Camera.CurrentCamera.MinArmLength,
          ) &&
            MathUtils_1.MathUtils.IsNearlyEqual(
              this.H_e,
              this.Camera.CurrentCamera.MaxArmLength,
            ) &&
            MathUtils_1.MathUtils.IsNearlyEqual(
              this.mae,
              this.Camera.CurrentCamera.ArmLength,
            )) ||
          this.aue(this.Camera.DesiredCamera.ZoomModifier));
  }
  aue(t) {
    var i = this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera);
    (this.Camera.DesiredCamera.ZoomModifier =
      MathUtils_1.MathUtils.Clamp(
        t * i,
        this.Camera.CurrentCamera.MinArmLength,
        this.Camera.CurrentCamera.MaxArmLength,
      ) / i),
      (this.mae = this.Camera.CurrentCamera.ArmLength),
      (this.V_e = this.Camera.CurrentCamera.MinArmLength),
      (this.H_e = this.Camera.CurrentCamera.MaxArmLength);
  }
  SetAimAssistTarget(i, s) {
    var h = this.Camera.CharacterEntityHandle.Entity.GetComponent(3),
      e = h.Actor.Camp,
      i = i.Entity.GetComponent(3);
    if (
      i &&
      2 === CampUtils_1.CampUtils.GetCampRelationship(e, i.Actor.Camp) &&
      CameraUtility_1.CameraUtility.TargetCanBeSelect(i)
    ) {
      let t = this.AimAssistRange;
      if (!FNameUtil_1.FNameUtil.IsEmpty(s) && i.LockOnParts.size) {
        e = i.LockOnParts.get(s.toString());
        if (
          (e?.AimPartBoneName
            ? (this.Q_e = i.AimParts.get(e.AimPartBoneName))
            : (this.Q_e = i.AimParts.get(s.toString())),
          this.Q_e)
        )
          return (
            this.Q_e.GetAimPointLocation(this.J_e),
            this.J_e.Subtraction(this.Camera.CameraLocation, this.z_e),
            this.$_e.DeepCopy(this.J_e),
            void this.Y_e.DeepCopy(this.J_e)
          );
      } else this.Q_e = void 0;
      for (var [, a] of i.AimParts) {
        a.GetAimPointLocation(this.J_e),
          this.J_e.Subtraction(this.Camera.CameraLocation, this.z_e);
        var r = this.z_e.DotProduct(this.Camera.CameraForward);
        r < 0 ||
          r > t ||
          this.z_e.SizeSquared() - MathUtils_1.MathUtils.Square(r) >
            MathUtils_1.MathUtils.Square(a.GetRadius(!0)) ||
          (this.J_e.Subtraction(h.ActorLocationProxy, this.Lz),
          this.Lz.Normalize(),
          Math.acos(this.Lz.DotProduct(this.Camera.CameraForward)) >
            MAX_AIM_ASSIST_ANGLE) ||
          ((t = r),
          (this.Q_e = a),
          this.$_e.DeepCopy(this.J_e),
          this.Y_e.DeepCopy(this.J_e));
      }
    }
  }
  nue(t, i) {
    if (ModelManager_1.ModelManager.CameraModel?.GetAimAssistEnable())
      if (this.IsAiming) {
        i ? (this.K_e = this.AimAssistStartTimeLength + 1) : (this.K_e += t);
        var s = this.K_e < this.AimAssistStartTimeLength;
        switch (ModelManager_1.ModelManager.CameraModel.AimAssistMode) {
          case 0:
            return !1;
          case 1:
            if (s) break;
            return !1;
        }
        var h = ModelManager_1.ModelManager.CameraModel.AimAssistDebugDraw,
          e = this.Camera.CharacterEntityHandle.Entity.GetComponent(3);
        if (e) {
          var a = e.Actor;
          if (!i && this.hue(t, a))
            return (
              h &&
                UE.KismetSystemLibrary.DrawDebugSphere(
                  this.Q_e.OwnerBase.Owner,
                  this.$_e.ToUeVector(),
                  this.Q_e.GetRadius(s),
                  DEFAULT_SEGMENT,
                  ColorUtils_1.ColorUtils.LinearGreen,
                ),
              !0
            );
          var r,
            i = this.AimAssistRange * RANGE_TO_RADIUS,
            _ =
              (this.Lz.DeepCopy(this.Camera.CameraForward),
              this.Lz.MultiplyEqual(i),
              this.Lz.AdditionEqual(this.Camera.PlayerLocation),
              ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
                this.Lz,
                i,
                63,
                this.eue,
              ),
              (this.Q_e = void 0),
              a.Camp);
          this.tue.length = 0;
          for (const l of this.eue)
            if (l.Entity?.Active) {
              var o = l.Entity.GetComponent(3);
              if (
                o &&
                2 ===
                  CampUtils_1.CampUtils.GetCampRelationship(_, o.Actor.Camp) &&
                CameraUtility_1.CameraUtility.TargetCanBeSelect(o)
              )
                for (var [, n] of o.AimParts) this.ega(n, s, e);
              o = l.Entity.GetComponent(141);
              if (o) for (const M of o.AimParts) this.ega(M, s, e);
            }
          this.tue.sort((t, i) => t[0] - i[0]);
          for ([, r] of this.tue)
            if ((r.GetAimPointLocation(this.J_e), this.lue(a, this.J_e, r)))
              return (
                this.$_e.DeepCopy(this.J_e), (this.Q_e = r), (this.X_e = !0)
              );
        }
      } else
        this.K_e &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Camera", 6, "Exit Aim Assist"),
          (this.K_e = 0),
          (this.Q_e = void 0);
    return !1;
  }
  ega(t, i, s) {
    t.GetAimPointLocation(this.J_e),
      ModelManager_1.ModelManager.CameraModel.AimAssistDebugDraw &&
        UE.KismetSystemLibrary.DrawDebugSphere(
          t.OwnerBase.Owner,
          this.J_e.ToUeVector(),
          t.GetRadius(i),
          DEFAULT_SEGMENT,
          ColorUtils_1.ColorUtils.LinearGreen,
        ),
      this.J_e.Subtraction(this.Camera.CameraLocation, this.z_e);
    var h = this.z_e.DotProduct(this.Camera.CameraForward);
    h < 0 ||
      h > this.AimAssistRange ||
      this.z_e.SizeSquared() - MathUtils_1.MathUtils.Square(h) >
        MathUtils_1.MathUtils.Square(t.GetRadius(i)) ||
      (this.J_e.Subtraction(s.ActorLocationProxy, this.Lz),
      this.Lz.Normalize(),
      (h = Math.acos(this.Lz.DotProduct(this.Camera.CameraForward))) >
        MAX_AIM_ASSIST_ANGLE) ||
      this.tue.push([h, t]);
  }
  lue(t, i, s) {
    (this.uoe.WorldContextObject = t),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.uoe,
        this.Camera.CameraLocation,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, i),
      TraceElementCommon_1.TraceElementCommon.LineTrace(
        this.uoe,
        "CameraInputController Aim",
      );
    var h = this.uoe.HitResult?.GetHitCount();
    if (h) {
      var e = s.IgnoreCollisionBoneName;
      for (let t = 0; t < h; ++t) {
        var a = this.uoe.HitResult.Components.Get(0);
        if (
          0 !==
          a.GetCollisionResponseToChannel(
            QueryTypeDefine_1.KuroCollisionChannel.Bullet,
          )
        ) {
          if (s.OwnerCharacter) {
            if (a.GetOwner() === s.OwnerBase.Owner && (!e || a.GetName() === e))
              break;
          } else if (s.SceneItemHit) {
            var r = s.OwnerBase.Owner;
            let t = a.GetOwner();
            for (; t && t !== r; ) t = t.GetAttachParentActor();
            if (t) break;
          }
          return !1;
        }
      }
    }
    return !0;
  }
  hue(t, i) {
    if (
      !this.Q_e ||
      !CameraUtility_1.CameraUtility.TargetCanBeSelect(this.Q_e.OwnerBase)
    )
      return !1;
    this.Q_e.GetAimPointLocation(this.$_e),
      this.$_e.Subtraction(this.Camera.CameraLocation, this.z_e);
    var s = this.z_e.DotProduct(this.Camera.CameraForward);
    if (s < 0 || s > this.AimAssistRange * AIM_RANGE_TOLERANT) return !1;
    this.Y_e.Subtraction(this.Camera.CameraLocation, this.Lz);
    s = this.Lz.SizeSquared() * this.z_e.SizeSquared();
    if (
      s > MathUtils_1.MathUtils.SmallNumber &&
      Math.acos(
        MathUtils_1.MathUtils.DotProduct(this.Lz, this.z_e) / Math.sqrt(s),
      ) *
        MathUtils_1.MathUtils.RadToDeg >
        this.AimAssistSpeedEdge * t
    )
      return !1;
    return !!this.lue(i, this.$_e, this.Q_e);
  }
  sue(s) {
    if (
      this.Q_e &&
      (this.$_e.Subtraction(this.Camera.CameraLocation, this.z_e),
      !this.z_e.IsNearlyZero())
    ) {
      (this.Camera.IsModifiedArmRotationPitch = !0),
        (this.Camera.IsModifiedArmRotationYaw = !0);
      var h = this.Camera.DesiredCamera.ArmRotation,
        e =
          (this.X_e ||
            (this.Y_e.Subtraction(this.Camera.CameraLocation, this.Lz),
            Quat_1.Quat.FindBetween(this.Lz, this.z_e, this.az),
            h.Quaternion(this.KJ),
            this.az.Multiply(this.KJ, this.KJ),
            this.KJ.Rotator(h)),
          this.Y_e.DeepCopy(this.$_e),
          this.z_e.DotProduct(this.Camera.CameraForward)),
        e = Math.sqrt(this.z_e.SizeSquared() - MathUtils_1.MathUtils.Square(e)),
        a = this.K_e < this.AimAssistStartTimeLength,
        r = a ? 0 : this.Q_e.RadiusIn;
      if (!(e <= r)) {
        var _,
          o = this.z_e.Size(),
          n = Math.asin(e / o) * MathUtils_1.MathUtils.RadToDeg,
          o = n - Math.asin(r / o) * MathUtils_1.MathUtils.RadToDeg;
        a &&
          o < STOP_ON_START_ANGLE_THRESHOLD &&
          this.K_e > SHORT_AIM_START_TIME &&
          (this.K_e = this.AimAssistStartTimeLength + 1);
        let t = 0,
          i =
            (a
              ? ((t = MathUtils_1.MathUtils.Lerp(
                  this.AimAssistStartSpeedBegin,
                  this.AimAssistStartSpeedEnd,
                  this.AimAssistCurve.GetCurrentValue(
                    this.K_e / this.AimAssistStartTimeLength,
                  ),
                )),
                (_ = this.Camera.CharacterEntityHandle.Entity.GetComponent(3)),
                this.$_e.Subtraction(_.ActorLocationProxy, this.Lz),
                this.Lz.Normalize(),
                (_ = Math.acos(this.Lz.DotProduct(this.Camera.CameraForward))),
                (t *= 1 + (0.5 * _) / MAX_AIM_ASSIST_ANGLE))
              : ((_ = this.Q_e.GetRadius(a)),
                (t = MathUtils_1.MathUtils.Lerp(
                  this.AimAssistSpeedCenter,
                  this.AimAssistSpeedEdge,
                  this.AimAssistCurve.GetCurrentValue((e - r) / (_ - r)),
                ))),
            0);
        (i = t * s > o ? o / n : (t * s) / n),
          Quat_1.Quat.FindBetween(this.Camera.CameraForward, this.z_e, this.az),
          Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, this.az, i, this.az),
          h.Quaternion(this.KJ),
          this.az.Multiply(this.KJ, this.KJ),
          this.KJ.Rotator(h);
      }
    }
  }
  upa(t, i) {
    return MathUtils_1.MathUtils.Lerp(
      Info_1.Info.IsInGamepad()
        ? this.GamePadSmoothFactorMin
        : this.SmoothFactorMin,
      Info_1.Info.IsInGamepad()
        ? this.GamePadSmoothFactorMax
        : this.SmoothFactorMax,
      Info_1.Info.IsInGamepad()
        ? this.GamePadSmoothFactorCurve.GetCurrentValue(
            t / this.GamePadSmoothFactorRange,
          )
        : this.SmoothFactorCurve.GetCurrentValue(t / this.SmoothFactorRange),
    );
  }
  ResetCameraInput() {
    (this.W_e = 0), (this.j_e = 0);
  }
}
exports.CameraInputController = CameraInputController;
//# sourceMappingURL=CameraInputController.js.map
