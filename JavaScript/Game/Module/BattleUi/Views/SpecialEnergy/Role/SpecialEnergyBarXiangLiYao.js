"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarXiangLiYao = void 0);
const SpecialEnergyBarMorph_1 = require("../SpecialEnergyBarMorph"),
  SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarXiangLiYao extends SpecialEnergyBarMorph_1.SpecialEnergyBarMorph {
  OnBeforeShow() {
    var e;
    super.OnBeforeShow(),
      this.NiagaraList[0] &&
        ((e = this.BarItem).ReplaceFullEffect(this.NiagaraList[0]),
        e.UpdateFullEffectOffsetBySlotWidth());
  }
  GetSpecialEnergyBarClass() {
    return SpecialEnergyBarSlot_1.SpecialEnergyBarSlot;
  }
}
exports.SpecialEnergyBarXiangLiYao = SpecialEnergyBarXiangLiYao;
//# sourceMappingURL=SpecialEnergyBarXiangLiYao.js.map
