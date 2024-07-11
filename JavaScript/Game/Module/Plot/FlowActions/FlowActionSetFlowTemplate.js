"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionSetFlowTemplate = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionSetFlowTemplate extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelC"
      ? this.FinishExecute(!0, !0)
      : ModelManager_1.ModelManager.PlotModel.SetPlotTemplate(
          this.ActionInfo.Params,
          () => {
            this.FinishExecute(!0);
          },
        );
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionSetFlowTemplate = FlowActionSetFlowTemplate;
// # sourceMappingURL=FlowActionSetFlowTemplate.js.map
