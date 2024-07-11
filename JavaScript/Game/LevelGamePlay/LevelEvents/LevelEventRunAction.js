"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventRunAction = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
class LevelEventRunAction extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    e
      ? (ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
          e.ActionList,
          LevelGeneralContextDefine_1.GeneralContext.Copy(t),
          this.IsAsync
            ? () => {}
            : (e) => {
                this.FinishExecute(1 === e);
              },
        ),
        this.IsAsync && this.FinishExecute(!0))
      : this.FinishExecute(!1);
  }
}
exports.LevelEventRunAction = LevelEventRunAction;
//# sourceMappingURL=LevelEventRunAction.js.map
