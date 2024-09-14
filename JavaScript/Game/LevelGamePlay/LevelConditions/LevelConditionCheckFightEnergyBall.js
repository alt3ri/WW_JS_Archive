"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckFightEnergyBall = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFightEnergyBall extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var n, r;
    return 0 === e.LimitParams.size
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1)
      : (n = Number(e.LimitParams.get("能量球状态"))) < 0 || 2 < n
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              `配置错误！条件${e.Id}的能量球状态只能是0，1`,
            ),
          !1)
        : ((r = (e =
            ModelManager_1.ModelManager.SceneTeamModel
              .GetCurrentEntity)?.Entity?.GetComponent(82)?.RoleElementEnergy),
          (e = e?.Entity?.GetComponent(82)?.RoleElementEnergyMax),
          (0 === r && 0 === n) ||
            (0 < r && r < e && 2 === n) ||
            (e <= r && 1 === n));
  }
}
exports.LevelConditionCheckFightEnergyBall = LevelConditionCheckFightEnergyBall;
//# sourceMappingURL=LevelConditionCheckFightEnergyBall.js.map
