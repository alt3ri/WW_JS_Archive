"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckEnemyBuff = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckEnemyBuff extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    if (o?.length)
      if (0 === e.LimitParams.size)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          );
      else {
        var i = BigInt(e.LimitParams.get("BuffId"));
        if (i) {
          for (const t of o[0])
            if (
              0 <
              (EntitySystem_1.EntitySystem.Get(t)
                ?.GetComponent(160)
                ?.GetBuffTotalStackById(i) ?? 0)
            )
              return !0;
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              `配置错误！条件${e.Id}的BuffId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckEnemyBuff}的定义`,
            );
      }
    return !1;
  }
}
exports.LevelConditionCheckEnemyBuff = LevelConditionCheckEnemyBuff;
//# sourceMappingURL=LevelConditionCheckEnemyBuff.js.map
