"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarKanTeLeiLaSlot = void 0);
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarKanTeLeiLaSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments), (this.FullEffectForceDisable = !1);
  }
  RefreshBarPercent(e = !1) {
    var t = this.PercentMachine.GetCurPercent(),
      r = this.GetKeyEnable(),
      s = !this.FullEffectForceDisable && r;
    for (let e = 0; e < this.SlotItemList.length; e++)
      this.SlotItemList[e].UpdatePercent(t * this.SlotNum - e, s);
    this.KeyItem?.RefreshKeyEnable(r, e);
  }
}
exports.SpecialEnergyBarKanTeLeiLaSlot = SpecialEnergyBarKanTeLeiLaSlot;
//# sourceMappingURL=SpecialEnergyBarKanTeLeiLaSlot.js.map
