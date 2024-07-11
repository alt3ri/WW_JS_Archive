"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckRangeByPbDataId = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRangeByPbDataId extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, t, ...o) {
    return !(
      !o?.length ||
      (e.LimitParams.size !== 2
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              54,
              "配置错误！条件的参数不应该为空",
              ["inConditionInfo.Id", e.Id],
            ),
          1)
        : ((e = e.LimitParams.get("PbDataId")),
          (o = o[0]),
          !(o = EntitySystem_1.EntitySystem.Get(o)
            ?.GetComponent(0)
            ?.GetPbDataId()) ||
            o !== parseInt(e) ||
            !Global_1.Global.BaseCharacter ||
            !Global_1.Global.BaseCharacter.CharacterActorComponent))
    );
  }
}
exports.LevelConditionCheckRangeByPbDataId = LevelConditionCheckRangeByPbDataId;
// # sourceMappingURL=LevelConditionCheckRangeByPbDataId.js.map
