"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionLevelAsyncAction = void 0);
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  FlowActionBase_1 = require("./FlowActionBase"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FlowActionLevelAsyncAction extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments), (this.zKe = 0);
  }
  OnExecute() {
    this.zKe++;
    const t = this.zKe;
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
      [this.ActionInfo],
      LevelGeneralContextDefine_1.GeneralContext.Copy(this.Context.Context),
      (e) => {
        this.ActionInfo &&
          this.Runner &&
          t === this.zKe &&
          this.FinishExecute(1 === e);
      },
    );
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
  OnInterruptExecute() {
    this.zKe++, this.FinishExecute(!0);
  }
}
exports.FlowActionLevelAsyncAction = FlowActionLevelAsyncAction;
//# sourceMappingURL=FlowActionLevelAsyncAction.js.map
