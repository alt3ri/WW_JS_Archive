"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckLevelPlayState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckLevelPlayState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    return (
      !!e &&
      ((e = e),
      ModelManager_1.ModelManager.LevelPlayModel.CheckLevelPlayState(
        e.LevelId,
        e.State,
        e.Compare,
      ))
    );
  }
}
exports.LevelConditionCheckLevelPlayState = LevelConditionCheckLevelPlayState;
// # sourceMappingURL=LevelConditionCheckLevelPlayState.js.map
