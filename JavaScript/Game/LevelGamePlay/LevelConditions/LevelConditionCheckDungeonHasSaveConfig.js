"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckDungeonHasSaveConfig = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDungeonHasSaveConfig extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    return (
      !!e &&
      ((e = e),
      (ModelManager_1.ModelManager.InstanceDungeonModel?.GetIfInstanceHasSaveData(
        e.DungeonId,
      ) ?? !1) === e.IsHasSaveConfig)
    );
  }
}
exports.LevelConditionCheckDungeonHasSaveConfig =
  LevelConditionCheckDungeonHasSaveConfig;
//# sourceMappingURL=LevelConditionCheckDungeonHasSaveConfig.js.map
