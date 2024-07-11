"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionLevelAsyncAction = void 0);
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionLevelAsyncAction extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments), (this._Xe = 0);
  }
  OnExecute() {
    this._Xe++;
    const t = this._Xe;
    var e = LevelGeneralContextDefine_1.PlotContext.Create(
      this.Context.FlowIncId,
      this.Context.Context?.SubType,
    );
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
      [this.ActionInfo],
      e,
      (e) => {
        this.ActionInfo &&
          this.Runner &&
          t === this._Xe &&
          this.OnActionFinish(1 === e);
      },
    );
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
  OnInterruptExecute() {
    this._Xe++, this.FinishExecute(!0);
  }
  OnActionFinish(e) {
    this.FinishExecute(e);
  }
}
exports.FlowActionLevelAsyncAction = FlowActionLevelAsyncAction;
//# sourceMappingURL=FlowActionLevelAsyncAction.js.map
