"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuaranteeActionExitOrbitalCamera = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionExitOrbitalCamera extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    ControllerHolder_1.ControllerHolder.CameraController.OrbitalCamera.PlayerComponent.StopCameraOrbital();
  }
}
exports.GuaranteeActionExitOrbitalCamera = GuaranteeActionExitOrbitalCamera;
//# sourceMappingURL=GuaranteeActionExitOrbitalCamera.js.map
