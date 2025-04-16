"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckFishingEntrustState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  NONE_OR_FINISHED = -1;
class LevelConditionCheckFishingEntrustState extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, t) {
    var r = Number(e.LimitParams.get("EntrustId")),
      e = Number(e.LimitParams.get("EntrustState"));
    return isNaN(r) || isNaN(e)
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            74,
            "CheckFishingEntrustState条件参数错误, 无法解析为数值",
          ),
        !1)
      : void 0 ===
          (r =
            ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(
              r,
            ))
        ? e === NONE_OR_FINISHED
        : r === e;
  }
}
exports.LevelConditionCheckFishingEntrustState =
  LevelConditionCheckFishingEntrustState;
//# sourceMappingURL=LevelConditionCheckFishingEntrustState.js.map
