"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetWuYinQuState = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetWuYinQuState extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    e &&
      ControllerHolder_1.ControllerHolder.RenderModuleController.SetBattleState(
        e.WuYinQuName,
        e.State,
      );
  }
}
exports.LevelEventSetWuYinQuState = LevelEventSetWuYinQuState;
//# sourceMappingURL=LevelEventSetWuYinQuState.js.map
