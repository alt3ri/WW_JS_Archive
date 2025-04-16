"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckRoleTargetLevel = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRoleTargetLevel extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return (
      !!e.LimitParams &&
      ((e = (e = e.LimitParams.get("Level")) ? parseInt(e) : 0),
      ControllerHolder_1.ControllerHolder.RoleController.CheckRoleTargetLevel(
        e,
      ))
    );
  }
}
exports.LevelConditionCheckRoleTargetLevel = LevelConditionCheckRoleTargetLevel;
//# sourceMappingURL=LevelConditionCheckRoleTargetLevel.js.map
