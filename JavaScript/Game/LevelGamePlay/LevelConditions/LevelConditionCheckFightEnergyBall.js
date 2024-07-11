"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckFightEnergyBall = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneTeamDefine_1 = require("../../Module/SceneTeam/SceneTeamDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFightEnergyBall extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    let o;
    return e.LimitParams.size === 0
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1)
      : (o = Number(e.LimitParams.get("能量球状态"))) < 0 || o > 2
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              `配置错误！条件${e.Id}的能量球状态只能是0，1`,
            ),
          !1)
        : ((e =
            ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
              79,
            )?.RoleElementEnergy) === 0 &&
            o === 0) ||
          (e > 0 && e < SceneTeamDefine_1.MAX_ELEMENT_ENERGY && o === 2) ||
          (e >= SceneTeamDefine_1.MAX_ELEMENT_ENERGY && o === 1);
  }
}
exports.LevelConditionCheckFightEnergyBall = LevelConditionCheckFightEnergyBall;
// # sourceMappingURL=LevelConditionCheckFightEnergyBall.js.map
