"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarSlot = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase"),
  SpecialEnergyBarSlotItem_1 = require("./SpecialEnergyBarSlotItem"),
  effectBasePercents = [1, 20 / 41, 13 / 41, 9 / 41, 7 / 41, 6 / 41];
class SpecialEnergyBarSlot extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.SlotNum = 0),
      (this.SlotItemList = []),
      (this.IsMorph = !1);
  }
  OnRegisterComponent() {
    (this.SlotNum = this.Config.SlotNum),
      0 === this.SlotNum &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 18, "槽型的能量条，分段数量不能为0", [
          "id",
          this.Config.Id,
        ]);
    for (let t = 0; t <= this.SlotNum + 1; t++)
      this.ComponentRegisterInfos.push([t, UE.UIItem]);
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (let t = 0; t < this.SlotNum; t++)
      e.push(this.InitSlotItem(this.GetItem(t)));
    e.push(this.InitKeyItem(this.GetItem(this.SlotNum))), await Promise.all(e);
  }
  async InitSlotItem(t) {
    var e = new SpecialEnergyBarSlotItem_1.SpecialEnergyBarSlotItem();
    await e.CreateThenShowByActorAsync(t.GetOwner()), this.SlotItemList.push(e);
  }
  OnStart() {
    if (this.Config) {
      var e = effectBasePercents[this.SlotNum - 1];
      for (const r of this.SlotItemList) r.SetEffectBasePercent(e);
      if (this.Config.EffectColor) {
        var s = UE.Color.FromHex(this.Config.EffectColor),
          i = new UE.LinearColor(s);
        let t = s;
        this.Config.PointColor &&
          (t = UE.Color.FromHex(this.Config.PointColor));
        for (const h of this.SlotItemList)
          h.SetBarColor(s),
            h.SetPointColor(t),
            h.SetFullEffectColor(i, this.IsMorph);
      }
      let t = !0;
      this.IsMorph && this.Config?.IconPath && (t = !1),
        this.GetItem(this.SlotNum + 1)?.SetUIActive(t),
        this.RefreshBarPercent(!0);
    }
  }
  RefreshBarPercent(t = !1) {
    var e = this.PercentMachine.GetCurPercent(),
      s = this.GetKeyEnable();
    for (let t = 0; t < this.SlotItemList.length; t++)
      this.SlotItemList[t].UpdatePercent(e * this.SlotNum - t, s);
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
    for (const e of this.SlotItemList) e.Tick(t);
  }
  ReplaceFullEffect(t) {
    for (const e of this.SlotItemList) e.ReplaceFullEffect(t);
  }
  UpdateFullEffectOffsetBySlotWidth() {
    for (const t of this.SlotItemList)
      t.SetFullEffectOffsetX(t.GetRootItem().Width / 2);
  }
}
exports.SpecialEnergyBarSlot = SpecialEnergyBarSlot;
//# sourceMappingURL=SpecialEnergyBarSlot.js.map
