"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionItemCountByType = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionItemCountByType extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    let a, t;
    return (
      !!e.LimitParams &&
      void 0 !== (a = Number(e.LimitParams.get("ItemType"))) &&
      ((t = Number(e.LimitParams.get("Value"))),
      !!(e = e.LimitParams.get("Op"))) &&
      this.CheckCompareValue(
        e,
        ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByItemType(a)
          .size,
        t,
      )
    );
  }
}
exports.LevelConditionItemCountByType = LevelConditionItemCountByType;
// # sourceMappingURL=LevelConditionItemCountByType.js.map
