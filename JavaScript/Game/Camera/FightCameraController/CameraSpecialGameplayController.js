"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraSpecialGameplayController = void 0);
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  CameraControllerBase_1 = require("./CameraControllerBase"),
  ISpecialGameplayCamera_1 = require("./SpecialGameplay/ISpecialGameplayCamera");
class CameraSpecialGameplayController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments), (this.CameraActor = void 0), (this.wce = void 0);
  }
  Name() {
    return "SpecialGameplayController";
  }
  OnInit() {
    this.Lock(this);
  }
  UpdateInternal(e) {
    this.wce && this.wce.Update(e);
  }
  EnterSpecialGameplayController(e) {
    this.CameraActor ||
      (this.CameraActor =
        ControllerHolder_1.ControllerHolder.CameraController.SpawnCameraActor()),
      ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(
        this.CameraActor,
        "EnterSpecialGameplayController",
        0,
        0,
      ),
      ISpecialGameplayCamera_1.SpecialGameplayCamera.GameplayMap.has(e)
        ? ((this.wce =
            ISpecialGameplayCamera_1.SpecialGameplayCamera.GameplayMap.get(
              e,
            )()),
          this.wce.OnInit(this.CameraActor))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Camera", 57, "[特殊玩法相机] 使用空相机", [
            "gameplayId",
            e,
          ]),
      this.Unlock(this);
  }
  ExitSpecialGameplayController() {
    this.Camera?.CameraActor?.IsValid() &&
      ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(
        this.Camera.CameraActor,
        "ExitSpecialGameplayController",
      ),
      this?.CameraActor &&
        (ActorSystem_1.ActorSystem.Put(
          "CameraSpecialGameplayController.ExitSpecialGameplayController",
          this.CameraActor,
        ),
        (this.CameraActor = void 0)),
      this.wce?.OnDestroy(),
      (this.wce = void 0),
      this.Lock(this);
  }
}
exports.CameraSpecialGameplayController = CameraSpecialGameplayController;
//# sourceMappingURL=CameraSpecialGameplayController.js.map
