"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckDockyardWareHouseHasItem = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDockyardWareHouseHasItem extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var r = ModelManager_1.ModelManager.DockyardModel?.BackpackUseSize;
    return !!r && 0 < r;
  }
}
exports.LevelConditionCheckDockyardWareHouseHasItem =
  LevelConditionCheckDockyardWareHouseHasItem;
//# sourceMappingURL=LevelConditionCheckDockyardWareHouseHasItem.js.map
