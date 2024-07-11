"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckExploreSkill = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckExploreSkill extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    let r;
    return e.LimitParams.size === 0
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1)
      : (r = Number(e.LimitParams.get("探索技能Id")))
        ? r === ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              `配置错误！条件${e.Id}的探索技能Id应该是数字`,
            ),
          !1);
  }
}
exports.LevelConditionCheckExploreSkill = LevelConditionCheckExploreSkill;
// # sourceMappingURL=LevelConditionCheckExploreSkill.js.map
