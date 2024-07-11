"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCamera = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Stack_1 = require("../../../Core/Container/Stack"),
  CameraController_1 = require("../../Camera/CameraController"),
  UiCameraPostEffectComponent_1 = require("./UiCameraComponent/UiCameraPostEffectComponent"),
  UiCameraSequenceComponent_1 = require("./UiCameraComponent/UiCameraSequenceComponent");
class UiCamera {
  constructor() {
    (this.CameraActor = void 0),
      (this.CineCameraComponent = void 0),
      (this.$Ro = new Map()),
      (this.YRo = new Stack_1.Stack()),
      (this.JRo = !1);
  }
  Initialize() {
    var e = CameraController_1.CameraController.WidgetCamera;
    return e
      ? (e = e.GetComponent(12)).Valid
        ? (e = e.CineCamera)?.IsValid()
          ? ((this.CameraActor = e),
            this.CameraActor.SetTickableWhenPaused(!0),
            (this.CineCameraComponent = e.GetCineCameraComponent()),
            this.CineCameraComponent?.SetTickableWhenPaused(!0),
            this.AddUiCameraComponent(
              UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
            ),
            this.AddUiCameraComponent(
              UiCameraSequenceComponent_1.UiCameraSequenceComponent,
            ),
            !0)
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "UiCamera",
                8,
                "初始化界面摄像机时，CameraActor不可用",
              ),
            !1)
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "UiCamera",
              8,
              "初始化界面摄像机时，找不到 WidgetCameraDisplayComponent 组件",
            ),
          !1)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "UiCamera",
            8,
            "初始化界面摄像机时，找不到 widgetCamera 组件",
          ),
        !1);
  }
  Destroy(e = 0, t = 0, r = 0) {
    this.Exit(e, t, r),
      this.zRo(),
      (this.CameraActor = void 0),
      (this.CineCameraComponent = void 0);
  }
  SetWorldLocation(e) {
    this.CameraActor?.IsValid() &&
      this.CameraActor.K2_SetActorLocation(e, !1, void 0, !1);
  }
  SetWorldRotation(e) {
    this.CameraActor?.IsValid() && this.CameraActor.K2_SetActorRotation(e, !1);
  }
  Enter(e = 0, t = 0, r = 0) {
    if (this.JRo)
      CameraController_1.CameraController.EnterCameraMode(2, e, t, r);
    else {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCamera",
          8,
          "进入Ui相机",
          ["blendTime", e],
          ["blendFunction", t],
          ["blendExp", r],
        );
      for (const i of this.$Ro.values()) i.Activate();
      CameraController_1.CameraController.EnterCameraMode(2, e, t, r),
        (this.JRo = !0);
    }
  }
  Exit(e = 0, t = 0, r = 0) {
    if (this.JRo) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCamera",
          8,
          "退出Ui相机",
          ["blendTime", e],
          ["blendFunction", t],
          ["blendExp", r],
        ),
        CameraController_1.CameraController.ExitCameraMode(2, e, t, r);
      for (const i of this.$Ro.values()) i.Deactivate();
      this.ClearStructure(), (this.JRo = !1);
    } else CameraController_1.CameraController.ExitCameraMode(2, e, t, r);
  }
  PushStructure(e) {
    if (e)
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCamera",
            46,
            "PushStructure:",
            [
              "this.UiCameraStructureStack.Peek()?.constructor.name",
              this.YRo.Peek()?.constructor.name,
            ],
            ["uiCameraStructureClass.name", e.name],
          ),
        this.YRo.Peek()?.constructor.name === e.name
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "UiCamera",
                46,
                "PushStructure时，已经有相同的UiCameraStructure，直接返回此UiCameraStructure:",
                ["Name", this.YRo.Peek()?.constructor.name],
              ),
            this.YRo.Peek())
          : ((e = new e()).Initialize(this), e.Activate(), this.YRo.Push(e), e)
      );
  }
  PopStructure() {
    this.YRo.Pop().Destroy(), this.YRo.Peek()?.Activate();
  }
  GetStructure() {
    return this.YRo.Peek();
  }
  ClearStructure() {
    for (const e of this.YRo) e.Destroy();
    this.YRo.Clear();
  }
  AddUiCameraComponent(e, t = !0) {
    let r = this.$Ro.get(e);
    return (
      r || ((r = new e()).Initialize(this), this.$Ro.set(e, r)),
      this.JRo && t && r.Activate(),
      r
    );
  }
  DestroyUiCameraComponent(e) {
    var t = this.$Ro.get(e);
    t && (t.Destroy(), this.$Ro.delete(e));
  }
  zRo() {
    for (const e of this.$Ro.values()) e.Destroy();
    this.$Ro.clear();
  }
  GetUiCameraComponent(e) {
    return this.$Ro.get(e);
  }
  GetCameraActor() {
    return this.CameraActor;
  }
  GetCineCameraComponent() {
    return this.CineCameraComponent;
  }
  GetIsEntered() {
    return this.JRo;
  }
}
exports.UiCamera = UiCamera;
//# sourceMappingURL=UiCamera.js.map
