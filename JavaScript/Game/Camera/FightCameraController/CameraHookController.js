"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraHookController = void 0);
const Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CameraControllerBase_1 = require("./CameraControllerBase");
class CameraHookController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.U_e = void 0),
      (this.f_e = 0),
      (this.H6 = 0),
      (this.p_e = 0),
      (this.A_e = Vector_1.Vector.Create()),
      (this.P_e = Vector_1.Vector.Create()),
      (this.x_e = Vector_1.Vector.Create()),
      (this.WI = !1);
  }
  Name() {
    return "HookController";
  }
  ApplyCameraHook(t) {
    (this.U_e = t), (this.WI = !0), this.w_e();
  }
  ExitCameraHook(t = !0) {
    (this.WI = !1), 0 !== this.f_e && this.B_e(t);
  }
  w_e() {
    (this.f_e = 1),
      (this.H6 = 0),
      (this.p_e = 0),
      this.A_e.DeepCopy(this.Camera.CameraForward),
      this.U_e.CameraGaze.LockCamera &&
        (ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraInputController.Lock(
          this,
        ),
        ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraFocusController.Lock(
          this,
        ));
  }
  UpdateCustomEnableCondition() {
    return this.WI;
  }
  UpdateInternal(t) {
    if (this.U_e.Valid)
      switch (
        ((this.H6 += t),
        (this.Camera.IsModifiedArmRotationPitch ||
          this.Camera.IsModifiedArmRotationYaw ||
          this.Camera.IsModifiedArmLength) &&
          this.B_e(),
        this.b_e(),
        this.f_e)
      ) {
        case 1:
          var i =
              0 < this.U_e.CameraGaze.FadeInTime
                ? this.H6 / this.U_e.CameraGaze.FadeInTime
                : 1,
            i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
          this.q_e(i),
            this.H6 > this.U_e.CameraGaze.FadeInTime && (this.f_e = 2);
          break;
        case 2:
          this.G_e(),
            0 <= this.U_e.CameraGaze.StayTime &&
              this.H6 >
                this.U_e.CameraGaze.FadeInTime + this.U_e.CameraGaze.StayTime &&
              (void 0 === this.U_e.CameraGaze.FadeOutTime
                ? ((this.f_e = 0), this.B_e())
                : ((this.f_e = 3),
                  this.P_e.DeepCopy(this.Camera.CameraForward)));
          break;
        case 3:
          this.p_e += t;
          (i =
            0 < this.U_e.CameraGaze.FadeOutTime
              ? this.p_e / this.U_e.CameraGaze.FadeOutTime
              : 1),
            (i = MathUtils_1.MathUtils.Clamp(i, 0, 1));
          this.D_e(i),
            this.p_e > this.U_e.CameraGaze.FadeOutTime &&
              ((this.f_e = 0), this.B_e());
      }
    else this.ExitCameraHook();
  }
  UpdateDeactivateInternal(t) {
    3 === this.f_e &&
      ((this.p_e += t),
      (t =
        0 < this.U_e.CameraGaze.FadeOutTime
          ? this.p_e / this.U_e.CameraGaze.FadeOutTime
          : 1),
      (t = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
      this.D_e(t),
      this.p_e > this.U_e.CameraGaze.FadeOutTime) &&
      ((this.f_e = 0), this.B_e());
  }
  q_e(t) {
    var i = Vector_1.Vector.Create(),
      t =
        (Vector_1.Vector.LerpSin(this.A_e, this.x_e, t, i),
        i.ToUeVector().Rotation());
    this.Camera.DesiredCamera.ArmRotation.DeepCopy(t),
      (this.Camera.IsModifiedArmRotationPitch = !0),
      (this.Camera.IsModifiedArmRotationYaw = !0);
  }
  G_e() {
    var t = this.x_e.ToUeVector().Rotation();
    this.Camera.DesiredCamera.ArmRotation.DeepCopy(t),
      (this.Camera.IsModifiedArmRotationPitch = !0),
      (this.Camera.IsModifiedArmRotationYaw = !0);
  }
  D_e(t) {
    var i = Vector_1.Vector.Create(),
      t =
        (Vector_1.Vector.LerpSin(this.P_e, this.A_e, t, i),
        i.ToUeVector().Rotation());
    this.Camera.DesiredCamera.ArmRotation.DeepCopy(t),
      (this.Camera.IsModifiedArmRotationPitch = !0),
      (this.Camera.IsModifiedArmRotationYaw = !0);
  }
  b_e() {
    var t = this.U_e.HookLocation,
      i = this.Camera.PlayerLocation;
    t.Subtraction(i, this.x_e),
      this.x_e.Normalize(),
      Math.abs(this.x_e.X) < MathUtils_1.MathUtils.SmallNumber &&
        Math.abs(this.x_e.Y) < MathUtils_1.MathUtils.SmallNumber &&
        (this.x_e = Vector_1.Vector.ZeroVectorProxy);
  }
  B_e(t = !0) {
    (this.WI = !1),
      (1 !== this.f_e && 2 !== this.f_e) ||
      !this.U_e?.Valid ||
      void 0 === this.U_e?.CameraGaze?.FadeOutTime
        ? (ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraInputController.Unlock(
            this,
          ),
          ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraFocusController.Unlock(
            this,
          ))
        : ((this.f_e = 3),
          (this.p_e = t ? 0 : this.U_e.CameraGaze.FadeOutTime),
          this.P_e.DeepCopy(this.Camera.CameraForward));
  }
}
exports.CameraHookController = CameraHookController;
//# sourceMappingURL=CameraHookController.js.map
