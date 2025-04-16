"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckCurFishingEntrustAvailablePeriod = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckCurFishingEntrustAvailablePeriod extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var a,
      e = e.LimitParams.get("ExceptedPeriod");
    return (
      !!e &&
      !!(a =
        ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust) &&
      ((a = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(a)),
      e.toUpperCase() === (a.IsNight ? "NIGHT" : "DAY"))
    );
  }
}
exports.LevelConditionCheckCurFishingEntrustAvailablePeriod =
  LevelConditionCheckCurFishingEntrustAvailablePeriod;
//# sourceMappingURL=LevelConditionCheckFishingEntrustAvailablePeriod.js.map
