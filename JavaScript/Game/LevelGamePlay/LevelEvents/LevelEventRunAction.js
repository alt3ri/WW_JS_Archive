"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventRunAction = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class LevelEventRunAction extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    e
      ? (ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
          e.ActionList,
          LevelGeneralContextDefine_1.GeneralContext.Copy(t),
          this.IsAsync
            ? () => {}
            : (e) => {
                this.FinishExecute(e === 1);
              },
        ),
        this.IsAsync && this.FinishExecute(!0))
      : this.FinishExecute(!1);
  }
}
exports.LevelEventRunAction = LevelEventRunAction;
// # sourceMappingURL=LevelEventRunAction.js.map
