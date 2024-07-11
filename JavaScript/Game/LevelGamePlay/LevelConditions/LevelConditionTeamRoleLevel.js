"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionTeamRoleLevel = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionTeamRoleLevel extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var r, l;
    return (
      !!e.LimitParams &&
      !!(r = e.LimitParams.get("Level")) &&
      ((l = Number(e.LimitParams.get("Position"))),
      !!(l =
        ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0)[
          l - 1
        ])?.IsMyRole()) &&
      ((l =
        ModelManager_1.ModelManager.RoleModel.GetRoleDataById(l.GetConfigId)
          ?.GetLevelData()
          .GetLevel() ?? 0),
      (e = e.LimitParams.get("Op")),
      this.CheckCompareValue(e, l || 0, Number(r)))
    );
  }
}
exports.LevelConditionTeamRoleLevel = LevelConditionTeamRoleLevel;
//# sourceMappingURL=LevelConditionTeamRoleLevel.js.map
