"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckPureModeWhenBattleViewActive = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckPureModeWhenBattleViewActive extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return ModelManager_1.ModelManager.BattleUiModel.PureModeData?.IsOpen ?? !1;
  }
}
exports.LevelConditionCheckPureModeWhenBattleViewActive =
  LevelConditionCheckPureModeWhenBattleViewActive;
//# sourceMappingURL=LevelConditionCheckPureModeWhenBattleViewActive.js.map
