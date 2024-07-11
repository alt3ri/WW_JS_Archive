"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionCameraLookAt = void 0);
const CameraController_1 = require("../../../Camera/CameraController");
const Global_1 = require("../../../Global");
const InputController_1 = require("../../../Input/InputController");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionLevelAsyncAction_1 = require("./FlowActionLevelAsyncAction");
class FlowActionCameraLookAt extends FlowActionLevelAsyncAction_1.FlowActionLevelAsyncAction {
  OnBackgroundExecute() {
    this.FinishExecute(!0);
  }
  OnInterruptExecute() {
    const e =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        52,
      );
    const o = this.ActionInfo.Params;
    CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraGuide(),
      o.BanInput &&
        (InputController_1.InputController.AddInputHandler(e),
        CameraController_1.CameraController.SetInputEnable(
          Global_1.Global.BaseCharacter,
          !0,
        )),
      super.OnInterruptExecute();
  }
}
exports.FlowActionCameraLookAt = FlowActionCameraLookAt;
// # sourceMappingURL=FlowActionCameraLookAt.js.map
