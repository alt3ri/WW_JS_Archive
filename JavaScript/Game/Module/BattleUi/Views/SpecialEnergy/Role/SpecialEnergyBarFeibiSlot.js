"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarFeibiSlot = void 0);
const UE = require("ue"),
  SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot"),
  EFFECT_BASE_PERCENT = 19 / 41,
  TOTAL_POINT_NUM = 19,
  CHANGE_EFFECT_OFFSET_X = 184.5,
  CHANGE_EFFECT_WIDTH = 369;
class SpecialEnergyBarFeibiSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments), (this.rdt = [0, 0]);
  }
  OnStart() {
    if (this.Config?.EffectColor) {
      var e = UE.Color.FromHex(this.Config.EffectColor),
        t = new UE.LinearColor(e);
      for (const E of this.SlotItemList)
        E.SetBarColor(e), E.SetChangeEffectColor(t);
    }
    super.OnStart();
  }
  RefreshBarPercent(t = !1) {
    var E = this.PercentMachine.GetCurPercent(),
      e = this.GetKeyEnable();
    for (let e = 0; e < this.SlotItemList.length; e++) {
      var r = this.SlotItemList[e],
        s = Math.floor((2 * E - e) * TOTAL_POINT_NUM) / TOTAL_POINT_NUM,
        s = Math.max(s, 0),
        i = (s = Math.min(s, 1)) * EFFECT_BASE_PERCENT;
      r.UpdatePercentWithFullEffect(s, i, t),
        this.rdt[e] > i &&
          !t &&
          (r.SetChangeEffectOffsetX(
            CHANGE_EFFECT_OFFSET_X + CHANGE_EFFECT_WIDTH * i,
          ),
          r.PlayChangeEffectWithPercent(this.rdt[e] - i)),
        (this.rdt[e] = i);
    }
    this.KeyItem?.RefreshKeyEnable(e, t);
  }
}
exports.SpecialEnergyBarFeibiSlot = SpecialEnergyBarFeibiSlot;
//# sourceMappingURL=SpecialEnergyBarFeibiSlot.js.map
