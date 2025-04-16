"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarZanniSlot = void 0);
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarZanniSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments),
      (this.BottomLineLight = void 0),
      (this.DarkItemList = []),
      (this.FullEffectWhenEnable = !1),
      (this.ac = 0);
  }
  RefreshBarPercent(e = !1) {
    var s = this.PercentMachine.GetCurPercent();
    if (this.FullEffectWhenEnable) {
      var i = this.GetKeyEnable();
      for (let t = 0; t < this.SlotItemList.length; t++) {
        var r = this.SlotItemList[t],
          a = s * this.SlotNum - t;
        r.UpdatePercentWithFullEffectEnable(a, i, e);
      }
      this.KeyItem?.RefreshKeyEnable(i, e);
    } else {
      super.RefreshBarPercent();
      let t = 0;
      s <= 0 ? (t = -1) : 1 <= s && (t = 1), this.Owt(t, e);
    }
  }
  Owt(t, e = !1) {
    if (this.ac !== t || e) {
      (this.ac = t), this.BottomLineLight?.SetUIActive(1 === this.ac);
      for (const s of this.DarkItemList) s.SetUIActive(-1 !== this.ac);
    }
  }
}
exports.SpecialEnergyBarZanniSlot = SpecialEnergyBarZanniSlot;
//# sourceMappingURL=SpecialEnergyBarZanniSlot.js.map
