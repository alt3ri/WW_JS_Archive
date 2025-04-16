"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckInCombat = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckInCombat extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e) {
    return (
      !!e &&
      ((e = e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Temp", 35, "LevelConditionCheckInCombat", [
          "CharacterUnifiedStateComponent.GlobalIsInFight",
          ControllerHolder_1.ControllerHolder.FormationDataController
            .GlobalIsInFight,
        ]),
      ControllerHolder_1.ControllerHolder.FormationDataController
        .GlobalIsInFight === e.InCombat)
    );
  }
}
exports.LevelConditionCheckInCombat = LevelConditionCheckInCombat;
//# sourceMappingURL=LevelConditionCheckInCombat.js.map
