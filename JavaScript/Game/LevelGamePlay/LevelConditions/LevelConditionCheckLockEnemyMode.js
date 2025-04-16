"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckLockEnemyMode = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckLockEnemyMode extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = e.LimitParams.get("ModeIndex");
    if (void 0 === e) return !1;
    var t = parseInt(e),
      a = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
        GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode,
      ),
      r = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
        GameSettingsDefine_1.EFunction.GamepadLockEnemyMode,
      );
    switch (Info_1.Info.InputControllerMainType) {
      case 1:
        return t === a;
      case 2:
        return t === r;
      case 3:
        return 0 === t;
      default:
        return !1;
    }
  }
}
exports.LevelConditionCheckLockEnemyMode = LevelConditionCheckLockEnemyMode;
//# sourceMappingURL=LevelConditionCheckLockEnemyMode.js.map
