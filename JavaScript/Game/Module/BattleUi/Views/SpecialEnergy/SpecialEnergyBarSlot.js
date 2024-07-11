"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarSlot = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase");
const SpecialEnergyBarSlotItem_1 = require("./SpecialEnergyBarSlotItem");
const effectBasePercents = [1, 20 / 41, 13 / 41, 9 / 41, 7 / 41, 6 / 41];
class SpecialEnergyBarSlot extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments), (this.xmt = 0), (this.wmt = []), (this.IsMorph = !1);
  }
  OnRegisterComponent() {
    (this.xmt = this.Config.SlotNum),
      this.xmt === 0 &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 18, "槽型的能量条，分段数量不能为0", [
          "id",
          this.Config.Id,
        ]);
    for (let t = 0; t <= this.xmt + 1; t++)
      this.ComponentRegisterInfos.push([t, UE.UIItem]);
  }
  async OnBeforeStartAsync() {
    const e = [];
    for (let t = 0; t < this.xmt; t++)
      e.push(this.InitSlotItem(this.GetItem(t)));
    e.push(this.InitKeyItem(this.GetItem(this.xmt))), await Promise.all(e);
  }
  async InitSlotItem(t) {
    const e = new SpecialEnergyBarSlotItem_1.SpecialEnergyBarSlotItem();
    await e.CreateThenShowByActorAsync(t.GetOwner()), this.wmt.push(e);
  }
  OnStart() {
    if (this.Config) {
      const t = effectBasePercents[this.xmt - 1];
      for (const i of this.wmt) i.SetEffectBasePercent(t);
      if (this.Config.EffectColor) {
        const e = UE.Color.FromHex(this.Config.EffectColor);
        const s = new UE.LinearColor(e);
        let t = e;
        this.Config.PointColor &&
          (t = UE.Color.FromHex(this.Config.PointColor));
        for (const r of this.wmt)
          r.SetBarColor(e),
            r.SetPointColor(t),
            r.SetFullEffectColor(s, this.IsMorph);
      }
      this.GetItem(this.xmt + 1)?.SetUIActive(!this.IsMorph),
        this.RefreshBarPercent(!0);
    }
  }
  RefreshBarPercent(t = !1) {
    const e = this.PercentMachine.GetCurPercent();
    const s = this.GetKeyEnable();
    for (let t = 0; t < this.wmt.length; t++)
      this.wmt[t].UpdatePercent(e * this.xmt - t, s);
    this.KeyItem?.RefreshKeyEnable(s, t);
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  OnKeyEnableChanged() {
    this.RefreshBarPercent();
  }
  Tick(t) {
    super.Tick(t);
    for (const e of this.wmt) e.Tick(t);
  }
}
exports.SpecialEnergyBarSlot = SpecialEnergyBarSlot;
// # sourceMappingURL=SpecialEnergyBarSlot.js.map
