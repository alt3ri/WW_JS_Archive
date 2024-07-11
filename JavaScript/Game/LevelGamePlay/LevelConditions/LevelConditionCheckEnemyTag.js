"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckEnemyTag = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckEnemyTag extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...t) {
    var i;
    return !(
      !t?.length ||
      (0 === e.LimitParams.size
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              "配置错误！条件的参数不应该为空",
              ["inConditionInfo.Id", e.Id],
            ),
          1)
        : (i = e.LimitParams.get("Tag"))
          ? ((t = t[0]),
            !EntitySystem_1.EntitySystem.Get(t)
              ?.GetComponent(188)
              ?.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i)))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelCondition",
                17,
                `配置错误！条件${e.Id}的tag参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckEnemyTag}的定义`,
              ),
            1))
    );
  }
}
exports.LevelConditionCheckEnemyTag = LevelConditionCheckEnemyTag;
//# sourceMappingURL=LevelConditionCheckEnemyTag.js.map
