"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionOpenSystemBoard = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FlowActionLevelAsyncAction_1 = require("./FlowActionLevelAsyncAction");
class FlowActionOpenSystemBoard extends FlowActionLevelAsyncAction_1.FlowActionLevelAsyncAction {
  OnExecute() {
    ModelManager_1.ModelManager.SequenceModel.IsPlaying &&
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
      super.OnExecute();
  }
  OnBackgroundExecute() {
    this.FinishExecute(!0);
  }
  OnActionFinish(e) {
    ModelManager_1.ModelManager.SequenceModel.IsPlaying &&
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!0),
      this.FinishExecute(!0);
  }
}
exports.FlowActionOpenSystemBoard = FlowActionOpenSystemBoard;
//# sourceMappingURL=FlowActionOpenSystemBoard.js.map
