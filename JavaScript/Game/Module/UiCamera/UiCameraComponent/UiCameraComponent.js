"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  TickSystem_1 = require("../../../../Core/Tick/TickSystem");
class UiCameraComponent {
  constructor() {
    (this.OwnerUiCamera = void 0),
      (this.CameraActor = void 0),
      (this.CineCameraComponent = void 0),
      (this.P$i = TickSystem_1.TickSystem.InvalidId),
      (this.iRo = !1),
      (this.r6 = (i) => {
        this.OnTick(i);
      });
  }
  Initialize(i) {
    (this.OwnerUiCamera = i),
      (this.CameraActor = this.OwnerUiCamera.GetCameraActor()),
      this.CameraActor.SetTickableWhenPaused(!0),
      (this.CineCameraComponent = this.OwnerUiCamera.GetCineCameraComponent()),
      this.CineCameraComponent?.SetTickableWhenPaused(!0),
      this.OnInitialize();
  }
  Destroy() {
    (this.CameraActor = void 0),
      (this.CineCameraComponent = void 0),
      this.Deactivate(),
      this.OnDestroy();
  }
  Activate() {
    this.iRo ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiCamera", 8, "激活相机组件", [
          "Name",
          this.constructor.name,
        ]),
      this.OnAddEvents(),
      this.OnActivate(),
      (this.iRo = !0));
  }
  Deactivate() {
    this.iRo &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiCamera", 8, "休眠相机组件", [
          "Name",
          this.constructor.name,
        ]),
      this.RemoveTick(),
      this.OnRemoveEvents(),
      this.OnDeactivate(),
      (this.iRo = !1));
  }
  EnableTick() {
    this.P$i === TickSystem_1.TickSystem.InvalidId &&
      ((this.P$i = TickSystem_1.TickSystem.Add(
        this.r6,
        this.constructor.name,
        0,
        !0,
      ).Id),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("CameraAnimation", 44, "Ui相机组件Tick开始", [
        "Component",
        this.constructor.name,
      ]);
  }
  ResumeTick() {
    this.P$i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Resume(this.P$i), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("CameraAnimation", 44, "Ui相机组件Tick恢复", [
        "Component",
        this.constructor.name,
      ]);
  }
  PauseTick() {
    this.P$i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Pause(this.P$i), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("CameraAnimation", 44, "Ui相机组件Tick暂停", [
        "Component",
        this.constructor.name,
      ]);
  }
  RemoveTick() {
    this.P$i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.P$i),
      (this.P$i = TickSystem_1.TickSystem.InvalidId),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("CameraAnimation", 44, "Ui相机组件Tick删除", [
        "Component",
        this.constructor.name,
      ]);
  }
  OnInitialize() {}
  OnDestroy() {}
  OnActivate() {}
  OnDeactivate() {}
  OnAddEvents() {}
  OnRemoveEvents() {}
  OnTick(i) {}
  GetIsActivate() {
    return this.iRo;
  }
  GetCameraStructure() {
    return this.OwnerUiCamera.GetStructure();
  }
}
exports.UiCameraComponent = UiCameraComponent;
//# sourceMappingURL=UiCameraComponent.js.map
