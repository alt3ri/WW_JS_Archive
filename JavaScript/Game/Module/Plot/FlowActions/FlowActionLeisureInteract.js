"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionLeisureInteract = void 0);
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionLeisureInteract extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments),
      (this.cRe = () => {
        this.FinishExecute(!0);
      });
  }
  OnExecute() {
    var e = LevelGeneralContextDefine_1.PlotContext.Create(
      this.Context.FlowIncId,
      this.Context.Context?.SubType,
    );
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
      [this.ActionInfo],
      e,
      this.cRe,
    );
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionLeisureInteract = FlowActionLeisureInteract;
//# sourceMappingURL=FlowActionLeisureInteract.js.map
