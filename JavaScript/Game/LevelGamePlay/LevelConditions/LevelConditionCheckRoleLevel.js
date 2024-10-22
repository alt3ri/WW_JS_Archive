"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckRoleLevel = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRoleLevel extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, l) {
    var r, a;
    return (
      !!(
        e.LimitParams &&
        (r = e.LimitParams.get("Level")) &&
        (a = e.LimitParams.get("RoleId")) &&
        ((a = parseInt(a)),
        (a =
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
            a,
          )?.GetLevelData()))
      ) &&
      ((e = e.LimitParams.get("Op")),
      this.CheckCompareValue(e, a.GetLevel(), Number(r)))
    );
  }
}
exports.LevelConditionCheckRoleLevel = LevelConditionCheckRoleLevel;
//# sourceMappingURL=LevelConditionCheckRoleLevel.js.map
