"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelCodeConditionCheckGroup = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelCodeConditionCheckGroup extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r, o) {
    return (
      !e ||
      !e.ConditionGroup ||
      ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
        e.ConditionGroup,
        r,
        o,
      )
    );
  }
}
exports.LevelCodeConditionCheckGroup = LevelCodeConditionCheckGroup;
//# sourceMappingURL=LevelCodeConditionCheckGroup.js.map
