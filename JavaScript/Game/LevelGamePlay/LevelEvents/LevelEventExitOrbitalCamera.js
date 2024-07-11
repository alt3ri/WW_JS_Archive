"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventExitOrbitalCamera = void 0);
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventExitOrbitalCamera extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    e
      ? CameraController_1.CameraController.OrbitalCamera.PlayerComponent.StopCameraOrbital()
      : this.FinishExecute(!1);
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RemGuaranteeAction,
      this.Type,
      this.BaseContext,
      { Name: "ExitOrbitalCamera" },
    );
  }
}
exports.LevelEventExitOrbitalCamera = LevelEventExitOrbitalCamera;
// # sourceMappingURL=LevelEventExitOrbitalCamera.js.map
