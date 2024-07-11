"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionItemCheck = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionItemCheck extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    let a;
    return (
      !!e.LimitParams &&
      ((a = e.LimitParams.get("ItemID")), (e = e.NeedNum), !!a) &&
      e <=
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          parseInt(a),
        )
    );
  }
  CheckNew(e, r) {
    if (!e) return !1;
    if (!e.Items?.length) return !0;
    let a = !1;
    e.Compare === "Eq" && (a = !0);
    for (const t of e.Items) {
      const n =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          t.ItemId,
        );
      if (t.Count > n) return !a;
    }
    return a;
  }
}
exports.LevelConditionItemCheck = LevelConditionItemCheck;
// # sourceMappingURL=LevelConditionItemCheck.js.map
