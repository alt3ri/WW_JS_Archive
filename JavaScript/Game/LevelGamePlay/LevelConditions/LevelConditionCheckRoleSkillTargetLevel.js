"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckRoleSkillTargetLevel = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRoleSkillTargetLevel extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, l) {
    return (
      !!e.LimitParams &&
      ((e = (e = e.LimitParams.get("Level")) ? parseInt(e) : 0),
      ControllerHolder_1.ControllerHolder.RoleController.CheckRoleSkillTargetLevel(
        e,
      ))
    );
  }
}
exports.LevelConditionCheckRoleSkillTargetLevel =
  LevelConditionCheckRoleSkillTargetLevel;
//# sourceMappingURL=LevelConditionCheckRoleSkillTargetLevel.js.map
