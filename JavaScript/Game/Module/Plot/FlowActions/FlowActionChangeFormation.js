"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionChangeFormation = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PlotController_1 = require("../PlotController");
const FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionChangeFormation extends FlowActionServerAction_1.FlowActionServerAction {
  OnExecute() {
    ModelManager_1.ModelManager.PlotModel.IsInSequencePlot() &&
    ModelManager_1.ModelManager.SequenceModel.IsPlaying
      ? (PlotController_1.PlotController.ChangeFormation(),
        this.RequestServerAction(!1))
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "禁止在非Seq剧情中使用切编队"),
        this.FinishExecute(!0));
  }
  OnBackgroundExecute() {}
}
exports.FlowActionChangeFormation = FlowActionChangeFormation;
// # sourceMappingURL=FlowActionChangeFormation.js.map
