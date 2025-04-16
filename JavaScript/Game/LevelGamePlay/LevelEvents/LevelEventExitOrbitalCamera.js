"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventExitOrbitalCamera = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventExitOrbitalCamera extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    e
      ? ControllerHolder_1.ControllerHolder.CameraController.OrbitalCamera.PlayerComponent.StopCameraOrbital()
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
//# sourceMappingURL=LevelEventExitOrbitalCamera.js.map
