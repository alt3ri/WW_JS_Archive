"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckHasUnlockAffixInBossRush = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckHasUnlockAffixInBossRush extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, s) {
    return (
      !!e.LimitParams &&
      !!(e = Number(e.LimitParams.get("ActivityId"))) &&
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(
        e,
      ).GetUnlockedBuffIndices().length > 1
    );
  }
}
exports.LevelConditionCheckHasUnlockAffixInBossRush =
  LevelConditionCheckHasUnlockAffixInBossRush;
// # sourceMappingURL=LevelConditionCheckHasUnlockAffixInBossRush.js.map
