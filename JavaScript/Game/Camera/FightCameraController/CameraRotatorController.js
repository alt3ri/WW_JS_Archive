"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraRotatorController = void 0);
const Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  CameraUtility_1 = require("../CameraUtility"),
  CameraControllerBase_1 = require("./CameraControllerBase");
class CameraRotatorController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.StartRotator = Rotator_1.Rotator.Create()),
      (this.DesRotator = Rotator_1.Rotator.Create()),
      (this.CurrentRotator = Rotator_1.Rotator.Create()),
      (this.dce = !1),
      (this.Ql = -0),
      (this.c_e = -0),
      (this.Cce = -0),
      (this.Alpha = 0),
      (this.fce = 0),
      (this.pce = 0),
      (this.vce = void 0),
      (this.nQ_ = !0);
  }
  Name() {
    return "RotatorController";
  }
  PlayCameraRotator(t, i, s, h, r = !0, a = 0) {
    this.Mce(t, i, s, h, a, 0, 1, r);
  }
  PlayCameraRotatorWithCurve(t, i, s, h, r, a, e, o = !0, l = 0) {
    (this.vce = e), this.Mce(t, i, s, l, h, r, a, o);
  }
  PlayCameraEulerRotator(t, i, s = !0, h = 0) {
    this.Ece(t, i, h, 0, 1, s);
  }
  PlayCameraEulerRotatorWithCurve(t, i, s, h, r, a = !0, e = 0) {
    (this.vce = r), this.Ece(t, i, e, s, h, a);
  }
  nce(t) {
    var i, s;
    this.dce &&
      (([s, i] =
        this.Camera.CharacterEntityHandle.Entity.GetComponent(
          61,
        ).GetCameraInput()),
      (this.nQ_ && (0 < Math.abs(s) || 0 < Math.abs(i))) ||
        ((s = this.Cce / this.Ql),
        this.vce
          ? (this.Alpha = this.vce.GetCurrentValue(s))
          : (this.Alpha = s),
        (this.Alpha = MathUtils_1.MathUtils.Clamp(
          this.Alpha,
          this.fce,
          this.pce,
        )),
        Rotator_1.Rotator.Lerp(
          this.StartRotator,
          this.DesRotator,
          this.Alpha,
          this.CurrentRotator,
        ),
        this.Camera.IsInNormalGravityMode()
          ? (this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(
              this.CurrentRotator,
            ))
          : CameraUtility_1.CameraUtility.SetRotatorInGravity(
              this.Camera.DesiredCamera.ArmRotation,
              this.CurrentRotator,
            ),
        (this.Cce += t),
        this.Cce >= this.Ql + this.c_e)) &&
      this.Sce();
  }
  Mce(t, i, s, h, r, a, e, o) {
    (this.dce = !0),
      this.Camera.IsInNormalGravityMode()
        ? this.StartRotator.FromUeRotator(this.Camera.CurrentCamera.ArmRotation)
        : CameraUtility_1.CameraUtility.GetRotatorInGravity(
            this.Camera.CurrentCamera.ArmRotation,
            this.StartRotator,
          );
    var l = Vector_1.Vector.Create();
    i.Subtraction(t, l),
      l.Rotation(this.DesRotator),
      this.Camera.IsInNormalGravityMode() ||
        CameraUtility_1.CameraUtility.GetRotatorInGravity(
          this.DesRotator,
          this.DesRotator,
        ),
      (this.Ql = h),
      (this.c_e = r),
      (this.Cce = 0),
      (this.Alpha = 0),
      (this.fce = a),
      (this.pce = e),
      (this.nQ_ = o),
      MathUtils_1.MathUtils.ComposeRotator(this.DesRotator, s, this.DesRotator),
      this.sQ_();
  }
  Ece(t, i, s, h, r, a) {
    (this.dce = !0),
      this.Camera.IsInNormalGravityMode()
        ? (this.StartRotator.FromUeRotator(
            this.Camera.CurrentCamera.ArmRotation,
          ),
          this.DesRotator.Set(t.Pitch, t.Yaw, t.Roll))
        : (CameraUtility_1.CameraUtility.GetRotatorInGravity(
            this.Camera.CurrentCamera.ArmRotation,
            this.StartRotator,
          ),
          CameraUtility_1.CameraUtility.GetRotatorInGravity(
            t,
            this.DesRotator,
          )),
      (this.Ql = i),
      (this.c_e = s),
      (this.Cce = 0),
      (this.Alpha = 0),
      (this.fce = h),
      (this.pce = r),
      (this.nQ_ = a),
      this.sQ_();
  }
  Sce() {
    (this.dce = !1),
      (this.vce = void 0),
      this.Camera.CameraInputController.Unlock(this),
      this.Camera.CameraRotationZone.Unlock(this);
  }
  sQ_() {
    this.nQ_
      ? this.Camera.CameraInputController.Unlock(this)
      : this.Camera.CameraInputController.Lock(this),
      this.Camera.CameraRotationZone.Lock(this);
  }
  UpdateInternal(t) {
    this.nce(t);
  }
}
exports.CameraRotatorController = CameraRotatorController;
//# sourceMappingURL=CameraRotatorController.js.map
