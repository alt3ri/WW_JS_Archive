"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttributeItemData = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  ItemDataBase_1 = require("./ItemDataBase"),
  ATTRIBUTE_ITEM_DEFAULT_COUNT = 1;
class AttributeItemData extends ItemDataBase_1.ItemDataBase {
  constructor(t, e, r, a) {
    super(t, ATTRIBUTE_ITEM_DEFAULT_COUNT, a),
      (this.UniqueId = e),
      (this.Smi = r);
  }
  GetUniqueId() {
    return this.UniqueId;
  }
  SetFunctionValue(t) {
    (this.Smi = t), this.OnSetFunctionValue(t);
  }
  OnSetFunctionValue(t) {}
  IsFunctionValue(t) {
    return 0 < (this.Smi & (1 << t));
  }
  GetIsLock() {
    return this.IsFunctionValue(0);
  }
  GetIsDeprecated() {
    return this.IsFunctionValue(1);
  }
  GetDefaultDownText() {
    return "";
  }
  GetUseCountLimit() {
    return 1;
  }
  HasRedDot() {
    var t = this.GetUniqueId();
    return ModelManager_1.ModelManager.InventoryModel.IsAttributeItemHasRedDot(
      t,
    );
  }
  IsValid() {
    return !0;
  }
}
exports.AttributeItemData = AttributeItemData;
//# sourceMappingURL=AttributeItemData.js.map
