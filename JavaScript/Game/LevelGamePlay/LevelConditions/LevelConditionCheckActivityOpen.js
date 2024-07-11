"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckActivityOpen = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckActivityOpen extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return (
      !!e.LimitParams &&
      !!(e = Number(e.LimitParams.get("ActivityId"))) &&
      !ModelManager_1.ModelManager.ActivityModel.GetActivityById(
        e,
      ).CheckIfClose()
    );
  }
}
exports.LevelConditionCheckActivityOpen = LevelConditionCheckActivityOpen;
// # sourceMappingURL=LevelConditionCheckActivityOpen.js.map
