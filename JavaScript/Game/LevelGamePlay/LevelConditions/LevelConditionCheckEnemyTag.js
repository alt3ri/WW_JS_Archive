"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckEnemyTag = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckEnemyTag extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, i, ...n) {
    if (n?.length)
      if (0 === e.LimitParams.size)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          );
      else {
        var t = e.LimitParams.get("Tag");
        if (t) {
          for (const o of n[0])
            if (
              EntitySystem_1.EntitySystem.Get(o)
                ?.GetComponent(190)
                ?.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t))
            )
              return !0;
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              `配置错误！条件${e.Id}的tag参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckEnemyTag}的定义`,
            );
      }
    return !1;
  }
}
exports.LevelConditionCheckEnemyTag = LevelConditionCheckEnemyTag;
//# sourceMappingURL=LevelConditionCheckEnemyTag.js.map
