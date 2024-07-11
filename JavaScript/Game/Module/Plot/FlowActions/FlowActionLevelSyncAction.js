"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionLevelSyncAction = void 0);
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  FlowActionBase_1 = require("./FlowActionBase"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FlowActionLevelSyncAction extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
      [this.ActionInfo],
      LevelGeneralContextDefine_1.GeneralContext.Copy(this.Context.Context),
    );
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionLevelSyncAction = FlowActionLevelSyncAction;
//# sourceMappingURL=FlowActionLevelSyncAction.js.map
