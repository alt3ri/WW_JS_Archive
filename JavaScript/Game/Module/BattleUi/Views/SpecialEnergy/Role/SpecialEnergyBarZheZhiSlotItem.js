"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarZheZhiSlotItem = void 0);
const SpecialEnergyBarSlotItem_1 = require("../SpecialEnergyBarSlotItem"),
  SpecialEnergyBarZheZhiEffectItem_1 = require("./SpecialEnergyBarZheZhiEffectItem");
class SpecialEnergyBarZheZhiSlotItem extends SpecialEnergyBarSlotItem_1.SpecialEnergyBarSlotItem {
  constructor() {
    super(...arguments), (this.vma = void 0);
  }
  async OnBeforeStartAsync() {
    (this.vma =
      new SpecialEnergyBarZheZhiEffectItem_1.SpecialEnergyBarZheZhiEffectItem()),
      await this.vma.InitAsync(this.RootItem);
  }
  SetEffectItemVisible(e) {
    this.vma?.SetVisible(e);
  }
  SetEffectItemNiagaraParam(e, t) {
    this.vma?.SetNiagaraParam(e, t);
  }
}
exports.SpecialEnergyBarZheZhiSlotItem = SpecialEnergyBarZheZhiSlotItem;
//# sourceMappingURL=SpecialEnergyBarZheZhiSlotItem.js.map
