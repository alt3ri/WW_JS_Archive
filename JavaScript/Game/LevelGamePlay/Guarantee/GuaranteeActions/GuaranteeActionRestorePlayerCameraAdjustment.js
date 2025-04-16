"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuaranteeActionRestorePlayerCameraAdjustment = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionRestorePlayerCameraAdjustment extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 39, "保底相机调整"),
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.RestoreCameraFromAdjust();
  }
}
exports.GuaranteeActionRestorePlayerCameraAdjustment =
  GuaranteeActionRestorePlayerCameraAdjustment;
//# sourceMappingURL=GuaranteeActionRestorePlayerCameraAdjustment.js.map
