"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, o) {
    var n,
      a = arguments.length,
      i =
        a < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, r))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(e, t, r, o);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (n = e[s]) && (i = (a < 3 ? n(i) : 3 < a ? n(t, r, i) : n(t, r)) || i);
    return 3 < a && i && Object.defineProperty(t, r, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneCameraPlayerComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CameraController_1 = require("./CameraController");
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
      r && 1 === r ? 0 : t ? t.FadeOut : 1,
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
      3 === ModelManager_1.ModelManager.CameraModel.CameraMode
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
        1 === this.yxr.CurSceneSubCamera.Type &&
        this.yxr.DefaultSceneSubCamera !== this.yxr.CurSceneSubCamera &&
        (e = this.yxr.CurSceneSubCamera);
        this.Fxr.length;

      ) {
        var t = this.Fxr.pop();
        this.yxr.RemoveBoundSceneCamera(t);
      }
      if (3 === ModelManager_1.ModelManager.CameraModel.CameraMode)
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
//# sourceMappingURL=SceneCameraPlayerComponent.js.map
