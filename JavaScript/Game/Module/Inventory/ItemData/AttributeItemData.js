"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttributeItemData = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
const ItemDataBase_1 = require("./ItemDataBase");
const ATTRIBUTE_ITEM_DEFAULT_COUNT = 1;
class AttributeItemData extends ItemDataBase_1.ItemDataBase {
  constructor(t, e, r, a) {
    super(t, ATTRIBUTE_ITEM_DEFAULT_COUNT, a),
      (this.UniqueId = e),
      (this.Eci = r);
  }
  GetUniqueId() {
    return this.UniqueId;
  }
  SetFunctionValue(t) {
    (this.Eci = t), this.OnSetFunctionValue(t);
  }
  OnSetFunctionValue(t) {}
  IsFunctionValue(t) {
    return (this.Eci & (1 << t)) > 0;
  }
  GetIsLock() {
    return this.IsFunctionValue(0);
  }
  GetDefaultDownText() {
    return "";
  }
  GetUseCountLimit() {
    return 1;
  }
  HasRedDot() {
    const t = this.GetUniqueId();
    return ModelManager_1.ModelManager.InventoryModel.IsAttributeItemHasRedDot(
      t,
    );
  }
  IsValid() {
    return !0;
  }
}
exports.AttributeItemData = AttributeItemData;
// # sourceMappingURL=AttributeItemData.js.map
