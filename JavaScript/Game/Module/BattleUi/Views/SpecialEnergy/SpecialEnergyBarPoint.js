"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarPoint = void 0);
const UE = require("ue");
const SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase");
const SpecialEnergyBarPointItem_1 = require("./SpecialEnergyBarPointItem");
const POINT_NUM = 41;
const POINT_WIDTH = 9;
class SpecialEnergyBarPoint extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments), (this.Vct = void 0), (this.IsMorph = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    const e = [];
    e.push(this.InitPointItem(this.GetItem(0))),
      e.push(this.InitKeyItem(this.GetItem(1))),
      await Promise.all(e);
  }
  async InitPointItem(e) {
    (this.Vct = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
      this.Vct.InitPrefabInfo(POINT_NUM, POINT_WIDTH),
      await this.Vct.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {
    let e;
    this.Config &&
      (this.Config.EffectColor &&
        ((e = new UE.LinearColor(UE.Color.FromHex(this.Config.EffectColor))),
        this.Vct.SetFullEffectColor(e)),
      this.GetItem(2).SetUIActive(!this.IsMorph),
      this.RefreshBarPercent(!0));
  }
  RefreshBarPercent(e = !1) {
    const t = this.PercentMachine.GetCurPercent();
    this.Vct.UpdatePercent(t),
      this.KeyItem?.RefreshKeyEnable(this.GetKeyEnable(), e);
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  OnKeyEnableChanged() {
    this.RefreshBarPercent();
  }
  Tick(e) {
    super.Tick(e), this.Vct?.Tick(e);
  }
}
exports.SpecialEnergyBarPoint = SpecialEnergyBarPoint;
// # sourceMappingURL=SpecialEnergyBarPoint.js.map
