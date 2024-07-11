"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraInputController = void 0);
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const Switcher_1 = require("../../Utils/Switcher");
const CameraUtility_1 = require("../CameraUtility");
const CameraControllerBase_1 = require("./CameraControllerBase");
const DEFAULT_FPS = 60;
const RANGE_TO_RADIUS = 0.7;
const DEFAULT_SEGMENT = 12;
const MAX_AIM_ASSIST_ANGLE = 40 * MathUtils_1.MathUtils.DegToRad;
const STOP_ON_START_ANGLE_THRESHOLD = 1;
const SHORT_AIM_START_TIME = 0.4;
const AIM_RANGE_TOLERANT = 1.05;
const MIN_PHYSICAL_DENSITY_DPI = 160;
const DEFAULT_DPI = 180;
class CameraInputController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.ZoomSpeed = 0),
      (this.InputSpeedMax = 0),
      (this.InputSpeedPercentage = 0),
      (this.SmoothFactorMin = 0),
      (this.SmoothFactorMax = 0),
      (this.SmoothFactorRange = 0),
      (this.SmoothFactorCurve = void 0),
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
      (this.K_e = 0),
      (this.Q_e = void 0),
      (this.X_e = !1),
      (this.uoe = void 0),
      (this.$_e = Vector_1.Vector.Create()),
      (this.Y_e = Vector_1.Vector.Create()),
      (this.Lz = Vector_1.Vector.Create()),
      (this.J_e = Vector_1.Vector.Create()),
      (this.z_e = Vector_1.Vector.Create()),
      (this.az = Quat_1.Quat.Create()),
      (this.KJ = Quat_1.Quat.Create()),
      (this.Z_e = Transform_1.Transform.Create()),
      (this.eue = []),
      (this.tue = new Array()),
      (this.ybn = 0),
      (this.Ibn = 0),
      (this.Tbn = 0),
      (this.Lbn = 0),
      (this.Dbn = 0),
      (this.Abn = 0),
      (this.Ubn = 0);
  }
  get IsAiming() {
    return this.Camera.ContainsTag(428837378);
  }
  Name() {
    return "InputController";
  }
  OnInit() {
    this.SetConfigMap(1, "ZoomSpeed"),
      this.SetConfigMap(5, "InputSpeedMin"),
      this.SetConfigMap(6, "InputSpeedMax"),
      this.SetConfigMap(2, "SmoothFactorMin"),
      this.SetConfigMap(3, "SmoothFactorMax"),
      this.SetConfigMap(4, "SmoothFactorRange"),
      this.SetCurveConfigMap(4, "SmoothFactorCurve"),
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
    let t, i, s, h;
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
      ModelManager_1.ModelManager.PlatformModel.IsMobile()
        ? ((t = (i = cpp_1.KuroScreen.GetPhysicalScreenResolution()).X),
          (i = i.Y),
          (s =
            GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetDefaultScreenResolution()
              .X),
          (h =
            GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetDefaultScreenResolution()
              .Y),
          (this.ybn = Math.max(s, h)),
          (this.Ibn = Math.min(s, h)),
          (this.Tbn = Math.max(t, i)),
          (this.Lbn = Math.min(t, i)),
          ModelManager_1.ModelManager.PlatformModel.PlatformType === 1
            ? (this.Dbn = Math.max(
                cpp_1.KuroScreen.ComputePhysicalScreenDensity(),
                MIN_PHYSICAL_DENSITY_DPI,
              ))
            : (this.Dbn = Math.max(
                cpp_1.KuroScreen.GetPhysicalScreenDensityDPI(),
                MIN_PHYSICAL_DENSITY_DPI,
              )),
          (MathUtils_1.MathUtils.IsNearlyEqual(this.Tbn, 0) ||
            MathUtils_1.MathUtils.IsNearlyEqual(this.Lbn, 0)) &&
            ((this.Tbn = this.ybn), (this.Lbn = this.Ibn)),
          (this.Abn = this.Tbn / (this.ybn * this.Dbn)),
          (this.Ubn = this.Lbn / (this.Ibn * this.Dbn)),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Camera",
              58,
              "CameraInputController",
              ["GameScreenWidth", this.ybn],
              ["GameScreenHeight", this.Ibn],
              ["PhysicalScreenWidth", this.Tbn],
              ["PhysicalScreenHeight", this.Lbn],
              ["PhysicalDensityDpi", this.Dbn],
              ["MobileDensityYawScale", this.Abn],
              ["MobileDensityPitchScale", this.Ubn],
            ))
        : ((this.Abn = 1 / DEFAULT_DPI), (this.Ubn = 1 / DEFAULT_DPI));
  }
  OnDisable() {
    this.K_e = 0;
  }
  UpdateInternal(t) {
    this.Camera.ContainsAnyTag([-1150819426, 1260125908]) || this.iue(t),
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
    if (h && h.IsInit) {
      const e = this.Camera.CharacterController;
      if (e)
        if (this.N_e.Active) {
          const a = e.GetControlRotation();
          const r = this.Camera.CurrentCamera.ArmRotation;
          let [t, i] = h.Entity.GetComponent(52).GetCameraInput();
          ModelManager_1.ModelManager.PlatformModel.IsGamepad()
            ? ((t *= this.GamepadInputRate), (i *= this.GamepadInputRate))
            : ModelManager_1.ModelManager.PlatformModel.IsPc()
              ? ((t /= DEFAULT_FPS), (i /= DEFAULT_FPS))
              : ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
                ((t *= DEFAULT_DPI * this.Abn), (i *= DEFAULT_DPI * this.Ubn));
          var h = ModelManager_1.ModelManager.CameraModel;
          var h =
            (this.IsAiming
              ? ((t *= h.CameraAimingYawSensitivityInputModifier),
                (i *= h.CameraAimingPitchSensitivityInputModifier))
              : ((t *= h.CameraBaseYawSensitivityInputModifier),
                (i *= h.CameraBasePitchSensitivityInputModifier)),
            Math.sqrt(t * t + i * i));
          const _ =
            ((t *=
              MathUtils_1.MathUtils.Lerp(
                this.SensitivityYawMin,
                this.SensitivityYawMax,
                this.SensitivityYawCurve.GetCurrentValue(
                  h / this.SensitivityYawRange,
                ),
              ) * s),
            (i *=
              MathUtils_1.MathUtils.Lerp(
                this.SensitivityPitchMin,
                this.SensitivityPitchMax,
                this.SensitivityPitchCurve.GetCurrentValue(
                  h / this.SensitivityPitchRange,
                ),
              ) * s),
            (this.X_e = !1),
            this.nue(s, !(!t && !i)));
          var h =
            (_ &&
              ((t *= 1 - this.AimAssistDamping),
              (i *= 1 - this.AimAssistDamping)),
            MathUtils_1.MathUtils.Lerp(
              this.SmoothFactorMin,
              this.SmoothFactorMax,
              this.SmoothFactorCurve.GetCurrentValue(
                h / this.SmoothFactorRange,
              ),
            ));
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
            this.Camera.CameraCollision.CurrentBlendState === 1 &&
              ((this.Camera.CameraCollision.IsLeftCollision && this.j_e > 0) ||
                (this.Camera.CameraCollision.IsRightCollision &&
                  this.j_e < 0)) &&
              (this.j_e = 0),
            (this.InputSpeedPercentage = Math.abs(
              this.j_e / this.InputSpeedMax,
            )),
            this.O_e.size !== 0 ||
              MathUtils_1.MathUtils.IsNearlyZero(
                this.j_e,
                this.InputSpeedMin,
              ) ||
              (e.AddYawInput(this.j_e),
              MathUtils_1.MathUtils.IsNearlyEqual(
                r.Yaw,
                a.Yaw,
                MathUtils_1.MathUtils.KindaSmallNumber,
              )) ||
              ((this.Camera.DesiredCamera.ArmRotation.Yaw = a.Yaw),
              (this.Camera.IsModifiedArmRotation = !0),
              (this.Camera.FadeArmRotationYaw = !1)),
            this.k_e.size !== 0 ||
              MathUtils_1.MathUtils.IsNearlyZero(
                this.W_e,
                this.InputSpeedMin,
              ) ||
              (e.AddPitchInput(this.W_e),
              MathUtils_1.MathUtils.IsNearlyEqual(
                r.Pitch,
                a.Pitch,
                MathUtils_1.MathUtils.KindaSmallNumber,
              )) ||
              ((this.Camera.DesiredCamera.ArmRotation.Pitch = a.Pitch),
              (this.Camera.IsModifiedArmRotation = !0),
              (this.Camera.FadeArmRotationPitch = !1)),
            _ && this.sue(s);
        } else this.K_e = 0;
      else this.K_e = 0;
    } else this.K_e = 0;
  }
  oue(t) {
    let i = this.Camera.CharacterEntityHandle;
    i &&
      i.IsInit &&
      (!this.N_e.Active ||
        this.F_e.size > 0 ||
        this.Camera.IsModifiedArmLength ||
        ((i = -i.Entity.GetComponent(52).GetZoomInput() * t) &&
          ((t =
            (i * this.ZoomSpeed) /
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
    const i = this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera);
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
    const h = this.Camera.CharacterEntityHandle.Entity.GetComponent(3);
    const t = h.Actor.Camp;
    const e = i.Entity.GetComponent(3);
    if (
      e &&
      CampUtils_1.CampUtils.GetCampRelationship(t, e.Actor.Camp) === 2 &&
      CameraUtility_1.CameraUtility.TargetCanBeSelect(e)
    ) {
      let t = this.AimAssistRange;
      if (!FNameUtil_1.FNameUtil.IsEmpty(s) && e.LockOnParts.size) {
        i = e.LockOnParts.get(s.toString());
        if (
          (i?.AimPartBoneName
            ? (this.Q_e = e.AimParts.get(i.AimPartBoneName))
            : (this.Q_e = e.AimParts.get(s.toString())),
          this.Q_e)
        )
          return (
            this.Z_e.FromUeTransform(
              e.Actor.Mesh.GetSocketTransform(this.Q_e.BoneName),
            ),
            this.Z_e.TransformPosition(this.Q_e.Offset, this.J_e),
            this.J_e.Subtraction(this.Camera.CameraLocation, this.z_e),
            this.$_e.DeepCopy(this.J_e),
            void this.Y_e.DeepCopy(this.J_e)
          );
      } else this.Q_e = void 0;
      for (const [, a] of e.AimParts) {
        this.Z_e.FromUeTransform(e.Actor.Mesh.GetSocketTransform(a.BoneName)),
          this.Z_e.TransformPosition(a.Offset, this.J_e),
          this.J_e.Subtraction(this.Camera.CameraLocation, this.z_e);
        const r = this.z_e.DotProduct(this.Camera.CameraForward);
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
        const s = this.K_e < this.AimAssistStartTimeLength;
        switch (ModelManager_1.ModelManager.CameraModel.AimAssistMode) {
          case 0:
            return !1;
          case 1:
            if (s) break;
            return !1;
        }
        const h = ModelManager_1.ModelManager.CameraModel.AimAssistDebugDraw;
        const e = this.Camera.CharacterEntityHandle.Entity.GetComponent(3);
        const a = e.Actor;
        if (!i && this.hue(t, a))
          return (
            h &&
              UE.KismetSystemLibrary.DrawDebugSphere(
                this.Q_e.Owner.Actor,
                this.$_e.ToUeVector(),
                this.Q_e.GetRadius(s),
                DEFAULT_SEGMENT,
                ColorUtils_1.ColorUtils.LinearGreen,
              ),
            !0
          );
        let r;
        var i = this.AimAssistRange * RANGE_TO_RADIUS;
        const _ =
          (this.Lz.DeepCopy(this.Camera.CameraForward),
          this.Lz.MultiplyEqual(i),
          this.Lz.AdditionEqual(this.Camera.PlayerLocation),
          ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
            this.Lz,
            i,
            2,
            this.eue,
          ),
          (this.Q_e = void 0),
          a.Camp);
        this.tue.length = 0;
        for (const M of this.eue)
          if (M.Entity?.Active) {
            var o;
            const n = M.Entity.GetComponent(3);
            if (
              n &&
              CampUtils_1.CampUtils.GetCampRelationship(_, n.Actor.Camp) ===
                2 &&
              CameraUtility_1.CameraUtility.TargetCanBeSelect(n)
            )
              for ([, o] of n.AimParts) {
                this.Z_e.FromUeTransform(
                  n.Actor.Mesh.GetSocketTransform(o.BoneName),
                ),
                  this.Z_e.TransformPosition(o.Offset, this.J_e),
                  h &&
                    UE.KismetSystemLibrary.DrawDebugSphere(
                      n.Actor,
                      this.J_e.ToUeVector(),
                      o.GetRadius(s),
                      DEFAULT_SEGMENT,
                      ColorUtils_1.ColorUtils.LinearGreen,
                    ),
                  this.J_e.Subtraction(this.Camera.CameraLocation, this.z_e);
                let l = this.z_e.DotProduct(this.Camera.CameraForward);
                l < 0 ||
                  l > this.AimAssistRange ||
                  this.z_e.SizeSquared() - MathUtils_1.MathUtils.Square(l) >
                    MathUtils_1.MathUtils.Square(o.GetRadius(s)) ||
                  (this.J_e.Subtraction(e.ActorLocationProxy, this.Lz),
                  this.Lz.Normalize(),
                  (l = Math.acos(
                    this.Lz.DotProduct(this.Camera.CameraForward),
                  )) > MAX_AIM_ASSIST_ANGLE) ||
                  this.tue.push([l, o]);
              }
          }
        this.tue.sort((t, i) => t[0] - i[0]);
        for ([, r] of this.tue)
          if (
            (this.Z_e.FromUeTransform(
              r.Owner.Actor.Mesh.GetSocketTransform(r.BoneName),
            ),
            this.Z_e.TransformPosition(r.Offset, this.J_e),
            this.lue(a, this.J_e, r))
          )
            return this.$_e.DeepCopy(this.J_e), (this.Q_e = r), (this.X_e = !0);
      } else
        this.K_e &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Camera", 6, "Exit Aim Assist"),
          (this.K_e = 0),
          (this.Q_e = void 0);
    return !1;
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
    const h = this.uoe.HitResult?.GetHitCount();
    if (h) {
      const e = s.IgnoreCollisionBoneName;
      for (let t = 0; t < h; ++t) {
        const a = this.uoe.HitResult.Components.Get(0);
        if (
          a.GetCollisionResponseToChannel(
            QueryTypeDefine_1.KuroCollisionChannel.Bullet,
          ) !== 0
        ) {
          if (a.GetOwner() !== s.Owner.Actor || (e && a.GetName() !== e))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hue(t, i) {
    if (
      !this.Q_e ||
      !CameraUtility_1.CameraUtility.TargetCanBeSelect(this.Q_e.Owner)
    )
      return !1;
    var s = this.Q_e;
    var s =
      (this.Z_e.FromUeTransform(
        s.Owner.Actor.Mesh.GetSocketTransform(s.BoneName),
      ),
      this.Z_e.TransformPosition(s.Offset, this.$_e),
      this.$_e.Subtraction(this.Camera.CameraLocation, this.z_e),
      this.z_e.DotProduct(this.Camera.CameraForward));
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
      this.Camera.IsModifiedArmRotation = !0;
      const h = this.Camera.DesiredCamera.ArmRotation;
      var e =
        (this.X_e ||
          (this.Y_e.Subtraction(this.Camera.CameraLocation, this.Lz),
          Quat_1.Quat.FindBetween(this.Lz, this.z_e, this.az),
          h.Quaternion(this.KJ),
          this.az.Multiply(this.KJ, this.KJ),
          this.KJ.Rotator(h)),
        this.Y_e.DeepCopy(this.$_e),
        this.z_e.DotProduct(this.Camera.CameraForward));
      var e = Math.sqrt(
        this.z_e.SizeSquared() - MathUtils_1.MathUtils.Square(e),
      );
      const a = this.K_e < this.AimAssistStartTimeLength;
      const r = a ? 0 : this.Q_e.RadiusIn;
      if (!(e <= r)) {
        let _;
        var o = this.z_e.Size();
        const n = Math.asin(e / o) * MathUtils_1.MathUtils.RadToDeg;
        var o = n - Math.asin(r / o) * MathUtils_1.MathUtils.RadToDeg;
        a &&
          o < STOP_ON_START_ANGLE_THRESHOLD &&
          this.K_e > SHORT_AIM_START_TIME &&
          (this.K_e = this.AimAssistStartTimeLength + 1);
        let t = 0;
        let i =
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
}
exports.CameraInputController = CameraInputController;
// # sourceMappingURL=CameraInputController.js.map
