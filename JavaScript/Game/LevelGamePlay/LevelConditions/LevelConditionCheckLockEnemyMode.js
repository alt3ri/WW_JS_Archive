"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckLockEnemyMode = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckLockEnemyMode extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, t) {
    e = e.LimitParams.get("ModeIndex");
    if (void 0 === e) return !1;
    var n = parseInt(e),
      e =
        GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo(),
      r = e.KeyboardLockEnemyMode,
      a = e.GamepadLockEnemyMode;
    switch (Info_1.Info.InputControllerMainType) {
      case 0:
        return n === r;
      case 1:
        return n === a;
      case 2:
        return 0 === n;
      default:
        return !1;
    }
  }
}
exports.LevelConditionCheckLockEnemyMode = LevelConditionCheckLockEnemyMode;
//# sourceMappingURL=LevelConditionCheckLockEnemyMode.js.map
