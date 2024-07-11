"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckSystemState = void 0);
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckSystemState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    var n;
    return (
      !!e &&
      (e = e.Config).Type ===
        ICondition_1.ECheckSystemStateType.TrackMoonBuilding &&
      ((n =
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
          e.BuildingId,
        )),
      e.IsBuilt === n.IsBuild)
    );
  }
}
exports.LevelConditionCheckSystemState = LevelConditionCheckSystemState;
//# sourceMappingURL=LevelConditionCheckSystemState.js.map
