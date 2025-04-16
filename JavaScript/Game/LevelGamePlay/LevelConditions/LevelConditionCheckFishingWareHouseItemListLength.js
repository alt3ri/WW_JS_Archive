"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckFishingWareHouseItemListLength = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFishingWareHouseItemListLength extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return (
      0 <
      ModelManager_1.ModelManager.DockyardModel.GetWareHouseDataList().length
    );
  }
}
exports.LevelConditionCheckFishingWareHouseItemListLength =
  LevelConditionCheckFishingWareHouseItemListLength;
//# sourceMappingURL=LevelConditionCheckFishingWareHouseItemListLength.js.map
