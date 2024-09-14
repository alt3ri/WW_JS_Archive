"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckLockEnemyMode = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckLockEnemyMode extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = e.LimitParams.get("ModeIndex");
    if (void 0 === e) return !1;
    var r = parseInt(e),
      t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(129),
      a = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(134);
    switch (Info_1.Info.InputControllerMainType) {
      case 1:
        return r === t;
      case 2:
        return r === a;
      case 3:
        return 0 === r;
      default:
        return !1;
    }
  }
}
exports.LevelConditionCheckLockEnemyMode = LevelConditionCheckLockEnemyMode;
//# sourceMappingURL=LevelConditionCheckLockEnemyMode.js.map
