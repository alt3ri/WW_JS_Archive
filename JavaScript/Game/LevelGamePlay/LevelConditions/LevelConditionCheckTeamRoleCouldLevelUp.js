"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckTeamRoleCouldLevelUp = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTeamRoleCouldLevelUp extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    let o = !1;
    for (const l of ModelManager_1.ModelManager.RoleModel.GetRoleCostExpList())
      if (
        0 <
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(l.Id)
      ) {
        o = !0;
        break;
      }
    if (o)
      for (const n of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(
        !0,
      )) {
        var r = n.GetConfigId,
          r =
            ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
              r,
            ).GetLevelData();
        if (r.GetLevel() < r.GetCurrentMaxLevel()) return !0;
      }
    return !1;
  }
}
exports.LevelConditionCheckTeamRoleCouldLevelUp =
  LevelConditionCheckTeamRoleCouldLevelUp;
//# sourceMappingURL=LevelConditionCheckTeamRoleCouldLevelUp.js.map
