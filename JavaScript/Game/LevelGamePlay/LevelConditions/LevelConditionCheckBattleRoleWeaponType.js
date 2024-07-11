"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckBattleRoleWeaponType = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckBattleRoleWeaponType extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    let n;
    return e.LimitParams.size === 0
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1)
      : !!(e = e.LimitParams.get("WeaponType")) &&
          ((e = parseInt(e)),
          !!(n =
            ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId())) &&
          ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n)
            .WeaponType === e;
  }
}
exports.LevelConditionCheckBattleRoleWeaponType =
  LevelConditionCheckBattleRoleWeaponType;
// # sourceMappingURL=LevelConditionCheckBattleRoleWeaponType.js.map
