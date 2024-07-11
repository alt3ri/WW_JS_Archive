"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckEnemyBuff = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckEnemyBuff extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    let t;
    return (
      !!o?.length &&
      (e.LimitParams.size === 0
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              "配置错误！条件的参数不应该为空",
              ["inConditionInfo.Id", e.Id],
            ),
          !1)
        : (t = BigInt(e.LimitParams.get("BuffId")))
          ? ((o = o[0]),
            (EntitySystem_1.EntitySystem.Get(o)
              ?.GetComponent(157)
              ?.GetBuffTotalStackById(t) ?? 0) > 0)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelCondition",
                17,
                `配置错误！条件${e.Id}的BuffId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckEnemyBuff}的定义`,
              ),
            !1))
    );
  }
}
exports.LevelConditionCheckEnemyBuff = LevelConditionCheckEnemyBuff;
// # sourceMappingURL=LevelConditionCheckEnemyBuff.js.map
