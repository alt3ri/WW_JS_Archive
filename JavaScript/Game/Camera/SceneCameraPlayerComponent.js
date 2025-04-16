"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, o) {
    var n,
      i = arguments.length,
      l =
        i < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, r))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      l = Reflect.decorate(e, t, r, o);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (n = e[a]) && (l = (i < 3 ? n(l) : 3 < i ? n(t, r, l) : n(t, r)) || l);
    return 3 < i && l && Object.defineProperty(t, r, l), l;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneCameraPlayerComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  GlobalData_1 = require("../GlobalData"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager");
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
    ControllerHolder_1.ControllerHolder.CameraController.ExitCameraMode(
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
              ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(
                new UE.Rotator(
                  ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation.Pitch,
                  this.ZPr.CineCamera.K2_GetActorRotation().Yaw,
                  ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation.Roll,
                ),
              )),
            this.ExitCameraMode(t, e, r))
          : (this.ZPr.UpdateViewTarget(), t());
  }
  EnterSceneSubCamera(e) {
    e === this.ZPr.CurSceneSubCamera && this.ZPr.UpdateViewTarget();
  }
  EnterFixSceneSubCamera(e, t, r, o, n, i, l, a = 0, s = 0, h = 0, d = 0) {
    ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() ||
      (ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(
        !1,
      ),
      ((i = this.ZPr.GetUnBoundSceneCamera(i)).FadeIn = o),
      (i.FadeInFunc = a),
      (i.FadeInExp = s),
      (i.FadeOut = n),
      (i.FadeOutFunc = h),
      (i.FadeOutExp = d),
      i.Camera.GetCineCameraComponent().SetFieldOfView(r),
      (i.Camera.CameraComponent.bConstrainAspectRatio = !1),
      i.Camera.D_K2_SetActorTransform(
        new UE.TransformDouble(
          t.ToUeRotator(),
          e.ToUeVector(),
          new UE.VectorDouble(1, 1, 1),
        ),
        !1,
        void 0,
        !0,
      ),
      this.fxr.push(i),
      3 === ModelManager_1.ModelManager.CameraModel.CameraMode
        ? this.EnterSceneSubCamera(i)
        : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Shadow.EnableCSMStable 0",
          ),
          ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(
            3,
            o,
            a,
            s,
            l,
          )));
  }
  ExitFixSceneSubCamera(e = void 0) {
    var t = () => {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Shadow.EnableCSMStable 1",
      ),
        e && e();
    };
    if (this.fxr.length) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(
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
      if (this.ZPr.IsIdle())
        return ModelManager_1.ModelManager.CameraModel.IsInHigherMode(3)
          ? void this.ExitCameraMode(t)
          : (e &&
              (this.ZPr.DefaultSceneSubCamera.CopyData(e),
              this.ZPr.UpdateViewTarget(0)),
            ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(
              new UE.Rotator(
                ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation.Pitch,
                this.ZPr.CineCamera.K2_GetActorRotation().Yaw,
                ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation.Roll,
              ),
            ),
            void ControllerHolder_1.ControllerHolder.CameraController.ExitCameraMode(
              3,
              this.ZPr.DefaultSceneSubCamera.FadeOut,
              this.ZPr.DefaultSceneSubCamera.FadeOutFunc,
              this.ZPr.DefaultSceneSubCamera.FadeOutExp,
              t,
            ));
      this.ZPr.UpdateViewTarget();
    }
  }
};
(SceneCameraPlayerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(8)],
  SceneCameraPlayerComponent,
)),
  (exports.SceneCameraPlayerComponent = SceneCameraPlayerComponent);
//# sourceMappingURL=SceneCameraPlayerComponent.js.map
