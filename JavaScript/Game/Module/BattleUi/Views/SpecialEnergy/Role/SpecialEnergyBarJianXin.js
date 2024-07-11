"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarJianXin = void 0);
const SpecialEnergyBarPointGraduate_1 = require("../SpecialEnergyBarPointGraduate");
class SpecialEnergyBarJianXin extends SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate {
  constructor() {
    super(...arguments),
      (this.kct = 0),
      (this.Fct = (t) => {
        0 < t && this.SlotItem.PlayUseEffectWithPercent(this.kct);
      });
  }
  AddEvents() {
    super.AddEvents(), this.ListenForTagCountChanged(2044061337, this.Fct);
  }
  RefreshBarPercent(t = !1) {
    let i = this.PercentMachine.GetCurPercent();
    1 === this.PercentMachine.GetTargetPercent() && (i = 1),
      (this.IsKeyEnable = i >= this.Config.DisableKeyOnPercent);
    let s = !0,
      e = !1;
    if (
      (t
        ? (s = i < 1)
        : i > this.LastPercent
          ? ((e = 1 <= i), (s = !e))
          : i < this.LastPercent && ((e = i <= 0), (s = e)),
      this.SlotItem.UpdatePercentWithVisible(
        i,
        s,
        e,
        t,
        e && s ? 0 : this.LastPercent,
      ),
      this.PointItem.UpdatePercentWithVisible(i, !s, e, t),
      e || t)
    )
      for (const r of this.GraduateItemList) r.SetUIActive(!s);
    this.KeyItem?.RefreshKeyEnable(this.IsKeyEnable, t),
      0 === i && (this.kct = this.LastPercent),
      (this.LastPercent = i);
  }
}
exports.SpecialEnergyBarJianXin = SpecialEnergyBarJianXin;
//# sourceMappingURL=SpecialEnergyBarJianXin.js.map
