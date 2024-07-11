"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckItemWithOperator = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckItemWithOperator extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var t, a;
    return (
      !!e.LimitParams &&
      ((t = e.LimitParams.get("ItemID")),
      (a = e.LimitParams.get("Count")),
      (e = e.LimitParams.get("Op")),
      void 0 !== t) &&
      void 0 !== a &&
      void 0 !== e &&
      ((t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        parseInt(t),
      )),
      (a = parseInt(a)),
      this.CheckCompareValue(e, t, a))
    );
  }
}
exports.LevelConditionCheckItemWithOperator =
  LevelConditionCheckItemWithOperator;
//# sourceMappingURL=LevelConditionCheckItemWithOperator.js.map
