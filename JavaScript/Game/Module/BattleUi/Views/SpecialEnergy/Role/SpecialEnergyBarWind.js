"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarWind = void 0);
const UE = require("ue"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot"),
  EFFECT_BASE_PERCENT = 18 / 41;
class SpecialEnergyBarWind extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.Rdt = void 0),
      (this.DB = !1),
      (this.Vdc = !1),
      (this.jdc = (t, e) => {
        this.Hdc(e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem()), await Promise.all(t);
  }
  async InitBarItem() {
    (this.Rdt = new SpecialEnergyBarSlot_1.SpecialEnergyBarSlot()),
      (this.Rdt.ForceHideBottomLine = !0),
      (this.Rdt.ForceEffectBasePercent = EFFECT_BASE_PERCENT),
      this.Rdt.InitData(this.RoleData, this.Config, !0),
      await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(4), this.InitTweenAnim(5), this.Gdl(!0);
    var t = this.TagComponent?.HasTag(1356344465) ?? !1;
    this.Hdc(t, !0);
  }
  AddEvents() {
    super.AddEvents(),
      this.ListenForTagAddOrRemoveChanged(1356344465, this.jdc);
  }
  OnBarPercentChanged() {
    this.Gdl();
  }
  OnKeyEnableChanged() {
    this.Gdl();
  }
  Gdl(t = !1) {
    var e = this.GetKeyEnable();
    this.$dc(e, t);
  }
  $dc(t, e = !1) {
    (this.DB === t && !e) ||
      ((this.DB = t)
        ? (this.GetItem(1)?.SetUIActive(!1), this.GetItem(2)?.SetUIActive(!0))
        : (this.GetItem(1)?.SetUIActive(!0), this.GetItem(2)?.SetUIActive(!1)),
      e) ||
      (t
        ? (this.PlayTweenAnim(4), this.StopTweenAnim(5))
        : (this.StopTweenAnim(4), this.PlayTweenAnim(5)));
  }
  Hdc(t, e = !1) {
    (this.Vdc === t && !e) ||
      ((this.Vdc = t), this.GetItem(3)?.SetUIActive(!t));
  }
  Tick(t) {
    super.Tick(t), this.Rdt?.Tick(t);
  }
}
exports.SpecialEnergyBarWind = SpecialEnergyBarWind;
//# sourceMappingURL=SpecialEnergyBarWind.js.map
