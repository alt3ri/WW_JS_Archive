"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, a) {
    var o,
      n = arguments.length,
      i =
        n < 3
          ? t
          : null === a
            ? (a = Object.getOwnPropertyDescriptor(t, r))
            : a;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(e, t, r, a);
    else
      for (var l = e.length - 1; 0 <= l; l--)
        (o = e[l]) && (i = (n < 3 ? o(i) : 3 < n ? o(t, r, i) : o(t, r)) || i);
    return 3 < n && i && Object.defineProperty(t, r, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneCameraPlayerComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CameraController_1 = require("./CameraController");
let SceneCameraPlayerComponent = class SceneCameraPlayerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), (this.ZPr = void 0), (this.fxr = void 0);
  }
  OnStart() {
    return (
      (this.ZPr = this.Entity.GetComponent(7)),
      (this.fxr = new Array()),
      this.ZPr.Valid
    );
  }
  OnEnd() {
    return (this.ZPr = void 0), !(this.fxr = void 0);
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
    this.ZPr.RemoveBoundSceneCamera(e),
      ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()
        ? this.ExitCameraMode(t, e, r)
        : this.ZPr.IsIdle()
          ? (ModelManager_1.ModelManager.CameraModel.IsInHigherMode(3) ||
              (this.ZPr.UpdateViewTarget(0),
              CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
                new UE.Rotator(
                  CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.Pitch,
                  this.ZPr.CineCamera.K2_GetActorRotation().Yaw,
                  CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.Roll,
                ),
              )),
            this.ExitCameraMode(t, e, r))
          : (this.ZPr.UpdateViewTarget(), t());
  }
  EnterSceneSubCamera(e) {
    e === this.ZPr.CurSceneSubCamera && this.ZPr.UpdateViewTarget();
  }
  EnterFixSceneSubCamera(e, t, r, a, o, n) {
    ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() ||
      (CameraController_1.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(
        !1,
      ),
      ((n = this.ZPr.GetUnBoundSceneCamera(n)).FadeIn = a),
      (n.FadeOut = o),
      n.Camera.GetCineCameraComponent().SetFieldOfView(r),
      (n.Camera.CameraComponent.bConstrainAspectRatio = !1),
      n.Camera.K2_SetActorTransform(
        new UE.Transform(
          t.ToUeRotator(),
          e.ToUeVector(),
          new UE.Vector(1, 1, 1),
        ),
        !1,
        void 0,
        !0,
      ),
      this.fxr.push(n),
      3 === ModelManager_1.ModelManager.CameraModel.CameraMode
        ? this.EnterSceneSubCamera(n)
        : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Shadow.EnableCSMStable 0",
          ),
          CameraController_1.CameraController.EnterCameraMode(3, a, 0, 0)));
  }
  ExitFixSceneSubCamera() {
    var t = () => {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Shadow.EnableCSMStable 1",
      );
    };
    if (this.fxr.length) {
      CameraController_1.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(
        !0,
      );
      let e = void 0;
      for (
        1 === this.ZPr.CurSceneSubCamera.Type &&
        this.ZPr.DefaultSceneSubCamera !== this.ZPr.CurSceneSubCamera &&
        (e = this.ZPr.CurSceneSubCamera);
        this.fxr.length;

      ) {
        var r = this.fxr.pop();
        this.ZPr.RemoveBoundSceneCamera(r);
      }
      if (3 === ModelManager_1.ModelManager.CameraModel.CameraMode)
        return this.ZPr.IsIdle()
          ? ModelManager_1.ModelManager.CameraModel.IsInHigherMode(3)
            ? void this.ExitCameraMode(t)
            : (e &&
                (this.ZPr.DefaultSceneSubCamera.CopyData(e),
                this.ZPr.UpdateViewTarget(0)),
              CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
                new UE.Rotator(
                  CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.Pitch,
                  this.ZPr.CineCamera.K2_GetActorRotation().Yaw,
                  CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.Roll,
                ),
              ),
              void CameraController_1.CameraController.ExitCameraMode(
                3,
                this.ZPr.DefaultSceneSubCamera.FadeOut,
                0,
                0,
                t,
              ))
          : void this.ZPr.UpdateViewTarget();
    }
  }
};
(SceneCameraPlayerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(8)],
  SceneCameraPlayerComponent,
)),
  (exports.SceneCameraPlayerComponent = SceneCameraPlayerComponent);
//# sourceMappingURL=SceneCameraPlayerComponent.js.map
