"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraFixedController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CameraControllerBase_1 = require("./CameraControllerBase");
class CameraFixedController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.j1e = -0),
      (this.W1e = -0),
      (this.K1e = void 0),
      (this.Q1e = void 0),
      (this.IsLockedCamera = !1),
      (this.IsChangingCamera = !1),
      (this.X1e = void 0),
      (this.$1e = void 0),
      (this.Y1e = () => {
        this.$1e !== this.X1e &&
          (this.$1e?.K2_DestroyActor(), (this.$1e = void 0)),
          (this.IsChangingCamera = !1);
      }),
      (this.J1e = () => {
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Unlock(
          this,
        ),
          this.X1e?.K2_DestroyActor(),
          (this.X1e = void 0),
          this.$1e?.K2_DestroyActor(),
          (this.$1e = void 0),
          this.z1e(),
          this.Z1e(),
          this.e_e(),
          (this.IsChangingCamera = !1);
      }),
      (this.OnViewTargetChanged = () => {
        this.X1e &&
          ModelManager_1.ModelManager.CameraModel.CurrentCameraActor !==
            this.X1e &&
          this.IsLockedCamera &&
          (ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Unlock(
            this,
          ),
          this.z1e(),
          (this.IsLockedCamera = !1));
      }),
      (this.OnFixedCameraRestored = () => {
        this.IsLockedCamera && this.FixedCameraResetViewTarget(),
          ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(
            !0,
          );
      });
  }
  Name() {
    return "FixedController";
  }
  InitFixedCamera(e, t, i, r, s) {
    (this.X1e &&
      this.t_e(e) &&
      ModelManager_1.ModelManager.CameraModel.CurrentCameraActor ===
        this.X1e) ||
      ((this.$1e = this.X1e),
      (this.X1e = UE.KuroActorManager.D_SpawnActor(
        GlobalData_1.GlobalData.World,
        UE.CameraActor.StaticClass(),
        new UE.TransformDouble(
          t.ToUeRotator(),
          e.ToUeVector(),
          new UE.VectorDouble(1, 1, 1),
        ),
      )),
      this.X1e &&
        ((this.j1e = r),
        (this.W1e = s),
        (this.X1e.CameraComponent.FieldOfView = i),
        (this.X1e.CameraComponent.bConstrainAspectRatio = !1),
        this.i_e(),
        this.o_e()));
  }
  r_e() {
    this.K1e &&
      TimerSystem_1.TimerSystem.Has(this.K1e) &&
      (TimerSystem_1.TimerSystem.Remove(this.K1e), this.Y1e()),
      this.e_e(),
      0.2 < this.j1e
        ? (this.K1e = TimerSystem_1.TimerSystem.Delay(
            this.Y1e,
            this.j1e * TimeUtil_1.TimeUtil.InverseMillisecond,
          ))
        : this.Y1e();
  }
  Z1e() {
    this.K1e &&
      TimerSystem_1.TimerSystem.Has(this.K1e) &&
      (TimerSystem_1.TimerSystem.Remove(this.K1e), this.Y1e());
  }
  n_e() {
    this.Q1e &&
      TimerSystem_1.TimerSystem.Has(this.Q1e) &&
      (TimerSystem_1.TimerSystem.Remove(this.Q1e), this.J1e()),
      this.Z1e(),
      0.2 < this.W1e
        ? (this.Q1e = TimerSystem_1.TimerSystem.Delay(
            this.J1e,
            this.W1e * TimeUtil_1.TimeUtil.InverseMillisecond,
          ))
        : this.J1e();
  }
  e_e() {
    this.Q1e &&
      TimerSystem_1.TimerSystem.Has(this.Q1e) &&
      TimerSystem_1.TimerSystem.Remove(this.Q1e);
  }
  o_e() {
    ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(
      this.X1e,
      "FixedCameraSetViewTarget",
      this.j1e,
    ),
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Lock(
        this,
      ),
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(
        !1,
      ),
      (this.IsLockedCamera = !0),
      (this.IsChangingCamera = !0),
      this.r_e();
  }
  FixedCameraResetViewTarget() {
    var e, t, i;
    return (
      this.$1e !== this.X1e &&
      !!(e =
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera
          .LogicComponent.DesiredCamera) &&
      ((t = e.ArmRotation),
      (i = this.X1e?.K2_GetActorRotation()),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Camera",
          45,
          "fightCameraRotation:Before",
          ["Pitch", t.Pitch],
          ["Yaw", t.Yaw],
          ["Roll", t.Roll],
        ),
      (e.ArmRotation = new Rotator_1.Rotator(i.Pitch, i.Yaw, t.Roll)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Camera",
          45,
          "fightCameraRotation:After",
          ["Pitch", e.ArmRotation.Pitch],
          ["Yaw", e.ArmRotation.Yaw],
          ["Roll", e.ArmRotation.Roll],
        ),
      ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.GetComponent(
          4,
        )?.CameraActor,
        "FixedCameraResetViewTarget",
        this.W1e,
      ),
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Lock(
        this,
      ),
      (this.IsChangingCamera = !0),
      this.n_e(),
      !0)
    );
  }
  i_e() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CameraViewTargetChanged,
      this.OnViewTargetChanged,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CameraViewTargetChanged,
        this.OnViewTargetChanged,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.FixedCameraRestored,
        this.OnFixedCameraRestored,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.FixedCameraRestored,
          this.OnFixedCameraRestored,
        );
  }
  z1e() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CameraViewTargetChanged,
      this.OnViewTargetChanged,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CameraViewTargetChanged,
        this.OnViewTargetChanged,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.FixedCameraRestored,
        this.OnFixedCameraRestored,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.FixedCameraRestored,
          this.OnFixedCameraRestored,
        );
  }
  t_e(e) {
    var t = this.X1e?.D_K2_GetActorLocation();
    return (
      t.X === e.ToUeVector().X &&
      (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Camera", 45, "X==X"),
      t.Y === e.ToUeVector().Y) &&
      (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Camera", 45, "Y==Y"),
      t.Z === e.ToUeVector().Z) &&
      (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Camera", 45, "Z==Z"), !0)
    );
  }
}
exports.CameraFixedController = CameraFixedController;
//# sourceMappingURL=CameraFixedController.js.map
