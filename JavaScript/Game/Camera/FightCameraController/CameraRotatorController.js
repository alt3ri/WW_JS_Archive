"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraRotatorController = void 0);
const Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  CameraControllerBase_1 = require("./CameraControllerBase");
class CameraRotatorController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.cce = Rotator_1.Rotator.Create()),
      (this.mce = Rotator_1.Rotator.Create()),
      (this.cie = Rotator_1.Rotator.Create()),
      (this.dce = !1),
      (this.Ql = -0),
      (this.Cce = -0),
      (this.gce = 0),
      (this.fce = 0),
      (this.pce = 0),
      (this.vce = void 0);
  }
  Name() {
    return "RotatorController";
  }
  PlayCameraRotator(t, i, s, r) {
    this.Mce(t, i, s, r, 0, 1);
  }
  PlayCameraRotatorWithCurve(t, i, s, r, h, a, o) {
    (this.vce = o), this.Mce(t, i, s, r, h, a);
  }
  PlayCameraEulerRotator(t, i) {
    this.Ece(t, i, 0, 1);
  }
  PlayCameraEulerRotatorWithCurve(t, i, s, r, h) {
    (this.vce = h), this.Ece(t, i, s, r);
  }
  nce(t) {
    var i, s;
    this.dce &&
      (([s, i] =
        this.Camera.CharacterEntityHandle.Entity.GetComponent(
          54,
        ).GetCameraInput()),
      0 < Math.abs(s) ||
        0 < Math.abs(i) ||
        ((s = this.Cce / this.Ql),
        this.vce ? (this.gce = this.vce.GetCurrentValue(s)) : (this.gce = s),
        (this.gce = MathUtils_1.MathUtils.Clamp(this.gce, this.fce, this.pce)),
        Rotator_1.Rotator.Lerp(this.cce, this.mce, this.gce, this.cie),
        (this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(
          this.cie,
        )),
        (this.Cce += t),
        this.Cce >= this.Ql)) &&
      this.Sce();
  }
  Mce(t, i, s, r, h, a) {
    (this.dce = !0),
      this.cce.FromUeRotator(this.Camera.CurrentCamera.ArmRotation);
    var o = Vector_1.Vector.Create();
    i.Subtraction(t, o),
      o.Rotation(this.mce),
      (this.Ql = r),
      (this.Cce = 0),
      (this.gce = 0),
      (this.fce = h),
      (this.pce = a),
      MathUtils_1.MathUtils.ComposeRotator(this.mce, s, this.mce);
  }
  Ece(t, i, s, r) {
    (this.dce = !0),
      this.cce.FromUeRotator(this.Camera.CurrentCamera.ArmRotation),
      this.mce.Set(t.Pitch, t.Yaw, t.Roll),
      (this.Ql = i),
      (this.Cce = 0),
      (this.gce = 0),
      (this.fce = s),
      (this.pce = r);
  }
  Sce() {
    (this.dce = !1), (this.vce = void 0);
  }
  UpdateInternal(t) {
    this.nce(t);
  }
}
exports.CameraRotatorController = CameraRotatorController;
//# sourceMappingURL=CameraRotatorController.js.map
