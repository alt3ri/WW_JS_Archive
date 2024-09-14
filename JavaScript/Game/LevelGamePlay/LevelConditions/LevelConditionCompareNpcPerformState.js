"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCompareNpcPerformState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareNpcPerformState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (e) {
      var a = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
        e.EntityId,
      )?.Entity?.GetComponent(172);
      if (a?.PerformGroupController) {
        var t = a.PerformGroupController.IsPerformStateEnabled(e.State);
        switch (e.Compare) {
          case "Eq":
            return t;
          case "Ne":
            return !t;
        }
      }
    }
    return !1;
  }
}
exports.LevelConditionCompareNpcPerformState =
  LevelConditionCompareNpcPerformState;
//# sourceMappingURL=LevelConditionCompareNpcPerformState.js.map
