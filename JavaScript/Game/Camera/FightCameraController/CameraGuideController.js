"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraGuideController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../GlobalData"),
  CameraUtility_1 = require("../CameraUtility"),
  CameraControllerBase_1 = require("./CameraControllerBase"),
  IS_DEBUG = !1,
  DEFAULT_VALUE = -1;
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
      (this.Ghc = Vector_1.Vector.Create()),
      (this.M_e = DEFAULT_VALUE),
      (this.E_e = 0),
      (this.S_e = !1),
      (this.Ctc = !0);
  }
  get IsBlending() {
    return 0 !== this.f_e;
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
    this.Ctc &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Camera",
        57,
        "[CameraLookAt] OnExitGuide ExitCameraGuide",
      ),
      this.y_e();
  }
  SetConfigs(t, i) {
    super.SetConfigs(t, i), (this.S_e = !0);
  }
  ApplyCameraGuide(t, i, s, h, a, e, r, o = !1) {
    this.Ctc &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Camera",
        57,
        "[CameraLookAt] ApplyCameraGuide",
        ["lookAt", t],
        ["fadeInTime", i],
        ["stayTime", s],
        ["fadeOutTime", h],
        ["lockCameraInput", a],
        ["endPosition", e],
        ["fov", r],
        ["ignoreAdjustYaw", o],
      ),
      this.IsActivate && this.S_e
        ? (this.v_e.FromUeVector(t),
          CameraUtility_1.CameraUtility.GetVectorInGravity(t, this.Ghc),
          (this.j1e = i),
          (this.c_e = s),
          (this.W1e = h),
          (this.m_e = a),
          this.I_e(),
          (t = this.Camera.PlayerLocation),
          (i = this.Camera.CurrentCamera.ArmRotation),
          (s = Vector_1.Vector.Create()),
          i.Vector(s),
          (h = Vector_1.Vector.Create()).DeepCopy(this.v_e),
          h.SubtractionEqual(e ?? t),
          CameraUtility_1.CameraUtility.GetVectorInGravity(h, h),
          CameraUtility_1.CameraUtility.GetVectorInGravity(s, s),
          (a = Rotator_1.Rotator.Create()),
          h.Rotation(a),
          (this.ale = a.Yaw),
          (this.sle = this.Camera.CameraRotationInGravity.Yaw),
          o ||
            ((i = h.CosineAngle2D(s)),
            h.SineAngle2D(s) < 0
              ? i >
                Math.cos(
                  this.CheckAdjustYawAngleMin * MathUtils_1.MathUtils.DegToRad,
                )
                ? (this.ale += this.CheckAdjustYawAngleMin)
                : i <
                    Math.cos(
                      this.CheckAdjustYawAngleMax *
                        MathUtils_1.MathUtils.DegToRad,
                    )
                  ? (this.ale += this.CheckAdjustYawAngleMax)
                  : (this.ale = this.sle)
              : i >
                  Math.cos(
                    this.CheckAdjustYawAngleMin *
                      MathUtils_1.MathUtils.DegToRad,
                  )
                ? (this.ale -= this.CheckAdjustYawAngleMin)
                : i <
                    Math.cos(
                      this.CheckAdjustYawAngleMax *
                        MathUtils_1.MathUtils.DegToRad,
                    )
                  ? (this.ale -= this.CheckAdjustYawAngleMax)
                  : (this.ale = this.sle)),
          180 < this.sle - this.ale
            ? (this.ale += 360)
            : 180 < this.ale - this.sle && (this.ale -= 360),
          (a = Rotator_1.Rotator.Create()),
          h.Rotation(a),
          (this.ole = this.Camera.CameraRotationInGravity.Pitch),
          h.Size() > this.NearerRange
            ? ((o = a.Pitch + this.CameraPitchOffset),
              (this.rle = MathUtils_1.MathUtils.Clamp(
                o,
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
          (s = h.Size2D()),
          (this.C_e =
            s * this.CameraArmLengthRateHorizontal +
            Math.abs(h.Z) * this.CameraArmLengthRateVertical),
          (this.C_e = MathUtils_1.MathUtils.Clamp(
            this.C_e,
            0,
            this.CameraArmLengthAdditionMax,
          )),
          e
            ? (this.g_e.DeepCopy(e),
              this.g_e.SubtractionEqual(t),
              (this.M_e = r),
              (this.E_e = this.Camera.CurrentCamera.Fov))
            : ((i = Vector_1.Vector.Create()).DeepCopy(this.v_e),
              i.SubtractionEqual(t),
              CameraUtility_1.CameraUtility.SetZnInGravity(i, 0, i),
              s * this.CameraArmOffsetHorizontalLengthRate >
              this.CameraArmOffsetHorizontalLengthMax
                ? (i.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
                  this.g_e.DeepCopy(i),
                  this.g_e.MultiplyEqual(
                    this.CameraArmOffsetHorizontalLengthMax,
                  ))
                : (this.g_e.DeepCopy(i),
                  this.g_e.MultiplyEqual(
                    this.CameraArmOffsetHorizontalLengthRate,
                  )),
              (a =
                (this.Ghc.Z - this.Camera.PlayerLocationInGravity.Z) *
                this.CameraArmOffsetVerticalLengthRate),
              (a = MathUtils_1.MathUtils.Clamp(
                a,
                -this.CameraArmOffsetVerticalLengthMax,
                this.CameraArmOffsetVerticalLengthMax,
              )),
              CameraUtility_1.CameraUtility.SetZnInGravity(
                this.g_e,
                a,
                this.g_e,
              ),
              (this.M_e = DEFAULT_VALUE)))
        : this.Ctc &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Camera",
              57,
              "[CameraLookAt] ApplyCameraGuide Fail",
              ["this.IsActivate", this.IsActivate],
              ["this.Initialized", this.S_e],
            ),
          this.ShowBlockSetInfo("CameraLookAt"));
  }
  T_e(t) {
    var i = MathUtils_1.MathUtils.LerpSin(this.sle, this.ale, t),
      s = MathUtils_1.MathUtils.LerpSin(this.ole, this.rle, t);
    CameraUtility_1.CameraUtility.SetRotatorInGravity(
      this.Camera.DesiredCamera.ArmRotation,
      Rotator_1.Rotator.Create(s, i, 0),
    ),
      (this.Camera.IsModifiedArmRotationPitch = !0),
      (this.Camera.IsModifiedArmRotationYaw = !0),
      this.M_e &&
        DEFAULT_VALUE !== this.M_e &&
        ((s = MathUtils_1.MathUtils.LerpSin(this.E_e, this.M_e, t)),
        (this.Camera.DesiredCamera.Fov = s));
  }
  L_e(t) {
    var i, s;
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
        UE.KismetSystemLibrary.D_DrawDebugLine(
          GlobalData_1.GlobalData.World,
          this.Camera.PlayerLocation.ToUeVector(),
          i.ToUeVector(),
          new UE.LinearColor(0, 1, 0, 1),
          0,
          5,
        ),
        UE.KismetSystemLibrary.D_DrawDebugLine(
          GlobalData_1.GlobalData.World,
          i.ToUeVector(),
          s.ToUeVector(),
          new UE.LinearColor(1, 1, 0, 1),
          0,
          5,
        ),
        0 !== this.f_e) &&
        UE.KismetSystemLibrary.D_DrawDebugLine(
          GlobalData_1.GlobalData.World,
          this.v_e.ToUeVector(),
          s.ToUeVector(),
          new UE.LinearColor(1, 0, 0, 1),
          0,
          5,
        );
  }
  D_e(t) {
    1 <= t &&
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
        ((t = MathUtils_1.MathUtils.LerpSin(this.E_e, this.Camera.Fov, t)),
        (this.Camera.DesiredCamera.Fov = t));
  }
  UpdateInternal(t) {
    switch (((this.H6 += t), !this.m_e && this.XOc() && this.y_e(), this.f_e)) {
      case 1:
        var i = 0 < this.j1e ? this.H6 / this.j1e : 1,
          i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
        this.T_e(i), this.L_e(i), this.H6 > this.j1e && this.R_e();
        break;
      case 2:
        0 <= this.c_e &&
          this.H6 > this.j1e + this.c_e &&
          (this.Ctc &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Camera",
              57,
              "[CameraLookAt] OnExitGuide EBlendState.Staying",
            ),
          this.y_e());
        break;
      case 3:
        this.p_e += t;
        (i = 0 < this.W1e ? this.p_e / this.W1e : 1),
          (i = MathUtils_1.MathUtils.Clamp(i, 0, 1));
        this.D_e(i), this.p_e > this.W1e && (this.f_e = 0);
    }
  }
  OnDisable() {
    this.Ctc &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Camera", 57, "[CameraLookAt] OnExitGuide OnDisable"),
      this.y_e();
  }
  UpdateDeactivateInternal(t) {
    3 === this.f_e &&
      ((this.p_e += t),
      (t = 0 < this.W1e ? this.p_e / this.W1e : 1),
      (t = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
      this.D_e(t),
      this.p_e > this.W1e) &&
      (this.f_e = 0);
  }
  I_e() {
    this.Ctc &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Camera",
        57,
        "[CameraLookAt] ApplyCameraGuide OnEnterGuide",
        [
          "this.StartCameraArmLengthAddition",
          this.CurrentCameraArmLengthAddition,
        ],
        ["this.StartCameraArmOffset", this.CurrentCameraArmOffset],
      ),
      (this.f_e = 1),
      (this.H6 = 0),
      (this.p_e = 0),
      (this.d_e = this.CurrentCameraArmLengthAddition),
      this.B1e.Set(
        this.CurrentCameraArmOffset.X,
        this.CurrentCameraArmOffset.Y,
        this.CurrentCameraArmOffset.Z,
      ),
      this.m_e && this.Camera.CameraInputController.Lock(this),
      this.Camera.CameraRotationZone.Lock(this);
  }
  R_e() {
    this.f_e = 2;
  }
  y_e() {
    (1 !== this.f_e && 2 !== this.f_e) ||
      (this.Ctc &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Camera",
          57,
          "[CameraLookAt] ApplyCameraGuide OnExitGuide",
          ["this.FadeInTime", this.j1e],
          ["this.ElapsedTime", this.H6],
          ["this.FadeOutElapsedTime", this.p_e],
          ["this.BlendState", this.f_e],
        ),
      (this.f_e = 3),
      (this.p_e = 0),
      (this.d_e = this.CurrentCameraArmLengthAddition),
      this.B1e.DeepCopy(this.CurrentCameraArmOffset),
      this.Camera.CameraInputController.Unlock(this),
      this.M_e &&
        DEFAULT_VALUE !== this.M_e &&
        (this.E_e = this.Camera.CurrentCamera.Fov)),
      this.Camera.CameraRotationZone.Unlock(this);
  }
  IsLockCameraInput() {
    return this.m_e;
  }
  XOc() {
    var t;
    return (
      !!this.Camera.CharacterEntityHandle?.Valid &&
      !!(t = this.Camera.CharacterEntityHandle.Entity.GetComponent(61))
        ?.Valid &&
      t.HasCameraInput()
    );
  }
}
exports.CameraGuideController = CameraGuideController;
//# sourceMappingURL=CameraGuideController.js.map
