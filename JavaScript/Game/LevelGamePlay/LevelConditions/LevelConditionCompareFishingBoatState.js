"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCompareFishingBoatState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareFishingBoatState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    return (
      (e?.IsStop ?? !0) ===
      ModelManager_1.ModelManager.FishingModel.GetShipData().IsShipInPort()
    );
  }
}
exports.LevelConditionCompareFishingBoatState =
  LevelConditionCompareFishingBoatState;
//# sourceMappingURL=LevelConditionCompareFishingBoatState.js.map
