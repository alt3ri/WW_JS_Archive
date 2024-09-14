"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarPointItem = exports.SpecialEnergyBarPointEffectInfo =
    void 0);
const UE = require("ue"),
  Time_1 = require("../../../../../Core/Common/Time"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  POINT_EFFECT_NUM = 3,
  EFFECT_DURATION = 500;
class SpecialEnergyBarPointEffectInfo {
  constructor() {
    (this.Effect = void 0), (this.FinishTime = 0), (this.IsPlaying = !1);
  }
}
exports.SpecialEnergyBarPointEffectInfo = SpecialEnergyBarPointEffectInfo;
class SpecialEnergyBarPointItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.wdt = 1),
      (this.Bdt = 0),
      (this.bdt = !0),
      (this.qdt = 0),
      (this.Gdt = 0),
      (this.Ndt = 0),
      (this.Odt = []),
      (this.kdt = 0),
      (this.Fdt = !1),
      (this.Vdt = 1),
      (this.PNn = void 0);
  }
  InitPrefabInfo(t, i, s = !0) {
    (this.wdt = t), (this.Bdt = i), (this.bdt = s);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UINiagara],
      [2, UE.UINiagara],
    ];
    for (let t = 0; t < POINT_EFFECT_NUM; t++)
      this.ComponentRegisterInfos.push([t + 3, UE.UINiagara]);
  }
  OnStart() {
    for (let t = 0; t < POINT_EFFECT_NUM; t++) {
      var i = new SpecialEnergyBarPointEffectInfo();
      (i.Effect = this.GetUiNiagara(t + 3)),
        i.Effect.SetUIActive(!1),
        this.Odt.push(i);
    }
  }
  SetFullEffectColor(t, i = !1) {
    this.GetUiNiagara(1).SetNiagaraVarLinearColor("Color", t),
      this.GetUiNiagara(2).SetNiagaraVarLinearColor("Color", t);
    for (const s of this.Odt) s.Effect.SetNiagaraVarLinearColor("Color", t);
    this.GetUiNiagara(1).SetNiagaraVarFloat("Default", i ? 0 : 1),
      this.GetUiNiagara(1).SetNiagaraVarFloat("Shift", i ? 1 : 0);
  }
  SetEffectBasePercent(t) {
    (this.Vdt = t),
      this.GetUiNiagara(1).SetNiagaraVarFloat("Dissolve", this.Vdt),
      this.GetUiNiagara(2).SetNiagaraVarFloat("Dissolve", this.Vdt);
  }
  UpdatePercent(t, i = !0) {
    var s = Math.ceil(t * this.wdt),
      t = (this.Vdt * s) / this.wdt;
    if (
      (this.GetUiNiagara(1).SetNiagaraVarFloat("Dissolve", t),
      this.GetUiNiagara(2).SetNiagaraVarFloat("Dissolve", t),
      this.GetUiNiagara(1).SetUIActive(0 < t),
      this.GetUiNiagara(2).SetUIActive(0 < t),
      i && this.qdt > s)
    ) {
      var e = EFFECT_DURATION + Time_1.Time.Now;
      for (let i = Math.min(s + POINT_EFFECT_NUM, this.qdt) - 1; i >= s; i--) {
        let t = i;
        this.bdt || (t = this.wdt - t - 1);
        var h = this.Bdt * (t - (this.wdt - 1) / 2),
          r = this.Hdt(),
          o = r.Effect;
        o.SetAnchorOffsetX(h),
          r.IsPlaying || o.SetUIActive(!0),
          o.ActivateSystem(!0),
          (r.FinishTime = e);
      }
      this.Fdt = !0;
    }
    this.qdt = s;
  }
  UpdatePercentWithVisible(t, i, s, e) {
    (s || e) && this.RootItem.SetUIActive(i),
      i && this.UpdatePercent(t, !s && !e);
  }
  UpdateLeftRightPercent(t, i) {
    var s,
      t = Math.ceil(t * this.wdt),
      i = Math.ceil(i * this.wdt);
    (this.Gdt === t && this.Ndt === i) ||
      ((this.Gdt = t),
      (this.Ndt = t),
      (s = this.Bdt * t),
      this.GetItem(0).SetAnchorOffsetX(s),
      (s = (i - t) / this.wdt),
      this.GetUiNiagara(1).SetNiagaraVarFloat("Dissolve", s),
      this.GetUiNiagara(2).SetNiagaraVarFloat("Dissolve", s));
  }
  Hdt() {
    var t = this.Odt[this.kdt];
    return this.kdt++, this.kdt >= POINT_EFFECT_NUM && (this.kdt = 0), t;
  }
  Tick(t) {
    if (this.Fdt) {
      this.Fdt = !1;
      for (const i of this.Odt)
        i.IsPlaying &&
          (i.FinishTime <= Time_1.Time.Now
            ? (i.Effect.SetUIActive(!1), (i.IsPlaying = !1))
            : (this.Fdt = !0));
    }
  }
  ReplaceFullEffect(t) {
    var i = this.GetUiNiagara(1);
    this.PNn || (this.PNn = i.NiagaraSystemReference), i.SetNiagaraSystem(t);
  }
  OnBeforeDestroy() {
    this.PNn &&
      (this.GetUiNiagara(1).SetNiagaraSystem(this.PNn), (this.PNn = void 0));
  }
}
exports.SpecialEnergyBarPointItem = SpecialEnergyBarPointItem;
//# sourceMappingURL=SpecialEnergyBarPointItem.js.map
