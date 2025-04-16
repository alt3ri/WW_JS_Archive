"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckFishingTechUnlock = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFishingTechUnlock extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var n = Number(e.LimitParams.get("FishingTechId"));
    return !n || isNaN(n)
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            74,
            "CheckFishingTechUnlock条件参数错误, 无法解析为数值",
          ),
        !1)
      : ((e =
          "TRUE" ===
          (e.LimitParams.get("ReverseUnlockCheck") ?? "FALSE").toUpperCase()),
        ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(n) !== e);
  }
}
exports.LevelConditionCheckFishingTechUnlock =
  LevelConditionCheckFishingTechUnlock;
//# sourceMappingURL=LevelConditionCheckFishingTechUnlock.js.map
