"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarChiXia = void 0);
const SpecialEnergyBarPointGraduate_1 = require("../SpecialEnergyBarPointGraduate"),
  GRADUATE_ENERGY_NUM = 30;
class SpecialEnergyBarChiXia extends SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate {
  constructor() {
    super(...arguments),
      (this.lne = (t, e) => {
        if (e) {
          var e =
              this.AttributeComponent.GetCurrentValue(this.Config.AttributeId) -
              GRADUATE_ENERGY_NUM,
            s = this.AttributeComponent.GetCurrentValue(
              this.Config.MaxAttributeId,
            );
          let t = 0 < s ? e / s : 0;
          0 <= t
            ? (this.SetGraduateItemOffset(0, t),
              this.GraduateItemList[0].SetUIActive(!0))
            : this.GraduateItemList[0].SetUIActive(!1);
        } else this.GraduateItemList[0].SetUIActive(!1);
      });
  }
  OnInitData() {
    super.OnInitData(), (this.NeedInitSlot = !1), (this.NeedInitNumItem = !0);
  }
  AddEvents() {
    super.AddEvents(),
      this.ListenForTagAddOrRemoveChanged(1280168885, this.lne);
  }
  RemoveEvents() {
    super.RemoveEvents();
  }
  OnStart() {
    super.OnStart(), this.GraduateItemList[0]?.SetUIActive(!1);
  }
  RefreshBarPercent(t = !1) {
    var e = this.PercentMachine.GetCurPercent(),
      e =
        (this.PointItem.UpdatePercent(e),
        this.KeyItem?.RefreshKeyEnable(e >= this.Config.DisableKeyOnPercent, t),
        this.AttributeComponent.GetCurrentValue(this.Config.AttributeId));
    this.NumItem?.SetNum(e);
  }
}
exports.SpecialEnergyBarChiXia = SpecialEnergyBarChiXia;
//# sourceMappingURL=SpecialEnergyBarChiXia.js.map
