"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionBeginFlowTemplate = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionBeginFlowTemplate extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelC" ||
    ModelManager_1.ModelManager.PlotModel.IsInTemplate()
      ? this.FinishExecute(!0)
      : ModelManager_1.ModelManager.PlotModel.StartPlotTemplate(
          this.ActionInfo.Params,
          this.Context,
          () => {
            this.FinishExecute(!0);
          },
        );
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionBeginFlowTemplate = FlowActionBeginFlowTemplate;
// # sourceMappingURL=FlowActionBeginFlowTemplate.js.map
