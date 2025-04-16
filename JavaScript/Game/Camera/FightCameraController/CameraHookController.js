"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraHookController = void 0);
const Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CameraControllerBase_1 = require("./CameraControllerBase");
class GazeParams {
  constructor(t, s = !1) {
    (this.LockCamera = !1),
      (this.FadeInTime = 0),
      (this.FadeOutTime = 0),
      (this.StayTime = 0),
      s
        ? ((this.LockCamera =
            t.GazeNextPointAfterInteract?.GazePerformance.LockCamera ?? !1),
          (this.FadeInTime =
            t.GazeNextPointAfterInteract?.GazePerformance.FadeInTime ?? 1),
          (this.FadeOutTime =
            t.GazeNextPointAfterInteract?.GazePerformance.FadeOutTime || 1),
          (this.StayTime =
            t.GazeNextPointAfterInteract?.GazePerformance.StayTime ?? 1))
        : ((this.LockCamera = t.CameraGaze?.LockCamera ?? !1),
          (this.FadeInTime = t.CameraGaze?.FadeInTime ?? 0),
          (this.FadeOutTime = t.CameraGaze?.FadeOutTime),
          (this.StayTime = t.CameraGaze?.StayTime ?? 0));
  }
}
class CameraHookController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.U_e = void 0),
      (this.wpl = void 0),
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
  ApplyCameraHook(t, s = void 0) {
    (this.U_e = t),
      (this.wpl = s ? new GazeParams(s, !0) : new GazeParams(t)),
      (this.WI = !0),
      this.w_e();
  }
  ExitCameraHook(t = !0) {
    (this.WI = !1), 0 !== this.f_e && this.B_e(t);
  }
  w_e() {
    (this.f_e = 1),
      (this.H6 = 0),
      (this.p_e = 0),
      this.A_e.DeepCopy(this.Camera.CameraForward),
      this.wpl.LockCamera &&
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
          var s = 0 < this.wpl.FadeInTime ? this.H6 / this.wpl.FadeInTime : 1,
            s = MathUtils_1.MathUtils.Clamp(s, 0, 1);
          this.q_e(s), this.H6 > this.wpl.FadeInTime && (this.f_e = 2);
          break;
        case 2:
          this.G_e(),
            0 <= this.wpl.StayTime &&
              this.H6 > this.wpl.FadeInTime + this.wpl.StayTime &&
              (void 0 === this.wpl.FadeOutTime
                ? ((this.f_e = 0), this.B_e())
                : ((this.f_e = 3),
                  this.P_e.DeepCopy(this.Camera.CameraForward)));
          break;
        case 3:
          this.p_e += t;
          (s = 0 < this.wpl.FadeOutTime ? this.p_e / this.wpl.FadeOutTime : 1),
            (s = MathUtils_1.MathUtils.Clamp(s, 0, 1));
          this.D_e(s),
            this.p_e > this.wpl.FadeOutTime && ((this.f_e = 0), this.B_e());
      }
    else this.ExitCameraHook();
  }
  UpdateDeactivateInternal(t) {
    3 === this.f_e &&
      ((this.p_e += t),
      (t = 0 < this.wpl.FadeOutTime ? this.p_e / this.wpl.FadeOutTime : 1),
      (t = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
      this.D_e(t),
      this.p_e > this.wpl.FadeOutTime) &&
      ((this.f_e = 0), this.B_e());
  }
  q_e(t) {
    var s = Vector_1.Vector.Create(),
      t =
        (Vector_1.Vector.LerpSin(this.A_e, this.x_e, t, s),
        s.ToUeVector().Rotation());
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
    var s = Vector_1.Vector.Create(),
      t =
        (Vector_1.Vector.LerpSin(this.P_e, this.A_e, t, s),
        s.ToUeVector().Rotation());
    this.Camera.DesiredCamera.ArmRotation.DeepCopy(t),
      (this.Camera.IsModifiedArmRotationPitch = !0),
      (this.Camera.IsModifiedArmRotationYaw = !0);
  }
  b_e() {
    var t = this.U_e.HookLocation,
      s = this.Camera.PlayerLocation;
    t.Subtraction(s, this.x_e),
      this.x_e.Normalize(),
      Math.abs(this.x_e.X) < MathUtils_1.MathUtils.SmallNumber &&
        Math.abs(this.x_e.Y) < MathUtils_1.MathUtils.SmallNumber &&
        (this.x_e = Vector_1.Vector.ZeroVectorProxy);
  }
  B_e(t = !0) {
    (this.WI = !1),
      (1 !== this.f_e && 2 !== this.f_e) ||
      !this.U_e?.Valid ||
      void 0 === this.wpl?.FadeOutTime
        ? (ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraInputController.Unlock(
            this,
          ),
          ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraFocusController.Unlock(
            this,
          ))
        : ((this.f_e = 3),
          (this.p_e = t ? 0 : this.wpl.FadeOutTime),
          this.P_e.DeepCopy(this.Camera.CameraForward));
  }
}
exports.CameraHookController = CameraHookController;
//# sourceMappingURL=CameraHookController.js.map
