"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, r, o) {
    let n;
    const a = arguments.length;
    let i =
      a < 3 ? t : o === null ? (o = Object.getOwnPropertyDescriptor(t, r)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      i = Reflect.decorate(e, t, r, o);
    else
      for (let s = e.length - 1; s >= 0; s--)
        (n = e[s]) && (i = (a < 3 ? n(i) : a > 3 ? n(t, r, i) : n(t, r)) || i);
    return a > 3 && i && Object.defineProperty(t, r, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneCameraPlayerComponent = void 0);
const UE = require("ue");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../Manager/ModelManager");
const CameraController_1 = require("./CameraController");
let SceneCameraPlayerComponent = class SceneCameraPlayerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), (this.yxr = void 0), (this.Fxr = void 0);
  }
  OnStart() {
    return (
      (this.yxr = this.Entity.GetComponent(7)),
      (this.Fxr = new Array()),
      this.yxr.Valid
    );
  }
  OnEnd() {
    return (this.yxr = void 0), !(this.Fxr = void 0);
  }
  ExitCameraMode(e = () => {}, t, r) {
    CameraController_1.CameraController.ExitCameraMode(
      3,
      r && r === 1 ? 0 : t ? t.FadeOut : 1,
      0,
      0,
      e,
    ) || e();
  }
  ExitSceneSubCamera(e, t = () => {}, r) {
    this.yxr.RemoveBoundSceneCamera(e),
      ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()
        ? this.ExitCameraMode(t, e, r)
        : this.yxr.IsIdle()
          ? (ModelManager_1.ModelManager.CameraModel.IsInHigherMode(3) ||
              (this.yxr.UpdateViewTarget(0),
              CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
                new UE.Rotator(
                  CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.Pitch,
                  this.yxr.CineCamera.K2_GetActorRotation().Yaw,
                  CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.Roll,
                ),
              )),
            this.ExitCameraMode(t, e, r))
          : (this.yxr.UpdateViewTarget(), t());
  }
  EnterSceneSubCamera(e) {
    e === this.yxr.CurSceneSubCamera && this.yxr.UpdateViewTarget();
  }
  EnterFixSceneSubCamera(e, t, r, o, n, a) {
    ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() ||
      (CameraController_1.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(
        !1,
      ),
      ((a = this.yxr.GetUnBoundSceneCamera(a)).FadeIn = o),
      (a.FadeOut = n),
      a.Camera.GetCineCameraComponent().SetFieldOfView(r),
      (a.Camera.CameraComponent.bConstrainAspectRatio = !1),
      a.Camera.K2_SetActorTransform(
        new UE.Transform(
          t.ToUeRotator(),
          e.ToUeVector(),
          new UE.Vector(1, 1, 1),
        ),
        !1,
        void 0,
        !0,
      ),
      this.Fxr.push(a),
      ModelManager_1.ModelManager.CameraModel.CameraMode === 3
        ? this.EnterSceneSubCamera(a)
        : CameraController_1.CameraController.EnterCameraMode(3, o, 0, 0));
  }
  ExitFixSceneSubCamera() {
    if (this.Fxr.length) {
      CameraController_1.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(
        !0,
      );
      let e = void 0;
      for (
        this.yxr.CurSceneSubCamera.Type === 1 &&
        this.yxr.DefaultSceneSubCamera !== this.yxr.CurSceneSubCamera &&
        (e = this.yxr.CurSceneSubCamera);
        this.Fxr.length;

      ) {
        const t = this.Fxr.pop();
        this.yxr.RemoveBoundSceneCamera(t);
      }
      if (ModelManager_1.ModelManager.CameraModel.CameraMode === 3)
        return this.yxr.IsIdle()
          ? ModelManager_1.ModelManager.CameraModel.IsInHigherMode(3)
            ? void this.ExitCameraMode(void 0)
            : (e &&
                (this.yxr.DefaultSceneSubCamera.CopyData(e),
                this.yxr.UpdateViewTarget(0)),
              CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
                new UE.Rotator(
                  CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.Pitch,
                  this.yxr.CineCamera.K2_GetActorRotation().Yaw,
                  CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.Roll,
                ),
              ),
              void CameraController_1.CameraController.ExitCameraMode(
                3,
                this.yxr.DefaultSceneSubCamera.FadeOut,
                0,
                0,
              ))
          : void this.yxr.UpdateViewTarget();
    }
  }
};
(SceneCameraPlayerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(8)],
  SceneCameraPlayerComponent,
)),
  (exports.SceneCameraPlayerComponent = SceneCameraPlayerComponent);
// # sourceMappingURL=SceneCameraPlayerComponent.js.map
