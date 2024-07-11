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
      (this.Smt = 1),
      (this.Emt = 0),
      (this.ymt = !0),
      (this.Imt = 0),
      (this.Tmt = 0),
      (this.Lmt = 0),
      (this.Dmt = []),
      (this.Rmt = 0),
      (this.Umt = !1),
      (this.Amt = 1),
      (this.pGn = void 0);
  }
  InitPrefabInfo(t, i, s = !0) {
    (this.Smt = t), (this.Emt = i), (this.ymt = s);
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
        this.Dmt.push(i);
    }
  }
  SetFullEffectColor(t, i = !1) {
    this.GetUiNiagara(1).SetNiagaraVarLinearColor("Color", t),
      this.GetUiNiagara(2).SetNiagaraVarLinearColor("Color", t);
    for (const s of this.Dmt) s.Effect.SetNiagaraVarLinearColor("Color", t);
    this.GetUiNiagara(1).SetNiagaraVarFloat("Default", i ? 0 : 1),
      this.GetUiNiagara(1).SetNiagaraVarFloat("Shift", i ? 1 : 0);
  }
  SetEffectBasePercent(t) {
    (this.Amt = t),
      this.GetUiNiagara(1).SetNiagaraVarFloat("Dissolve", this.Amt),
      this.GetUiNiagara(2).SetNiagaraVarFloat("Dissolve", this.Amt);
  }
  UpdatePercent(t, i = !0) {
    var s = Math.ceil(t * this.Smt),
      t = (this.Amt * s) / this.Smt;
    if (
      (this.GetUiNiagara(1).SetNiagaraVarFloat("Dissolve", t),
      this.GetUiNiagara(2).SetNiagaraVarFloat("Dissolve", t),
      this.GetUiNiagara(1).SetUIActive(0 < t),
      this.GetUiNiagara(2).SetUIActive(0 < t),
      i && this.Imt > s)
    ) {
      var e = EFFECT_DURATION + Time_1.Time.Now;
      for (let i = Math.min(s + POINT_EFFECT_NUM, this.Imt) - 1; i >= s; i--) {
        let t = i;
        this.ymt || (t = this.Smt - t - 1);
        var h = this.Emt * (t - (this.Smt - 1) / 2),
          r = this.Pmt(),
          o = r.Effect;
        o.SetAnchorOffsetX(h),
          r.IsPlaying || o.SetUIActive(!0),
          o.ActivateSystem(!0),
          (r.FinishTime = e);
      }
      this.Umt = !0;
    }
    this.Imt = s;
  }
  UpdatePercentWithVisible(t, i, s, e) {
    (s || e) && this.RootItem.SetUIActive(i),
      i && this.UpdatePercent(t, !s && !e);
  }
  UpdateLeftRightPercent(t, i) {
    var s,
      t = Math.ceil(t * this.Smt),
      i = Math.ceil(i * this.Smt);
    (this.Tmt === t && this.Lmt === i) ||
      ((this.Tmt = t),
      (this.Lmt = t),
      (s = this.Emt * t),
      this.GetItem(0).SetAnchorOffsetX(s),
      (s = (i - t) / this.Smt),
      this.GetUiNiagara(1).SetNiagaraVarFloat("Dissolve", s),
      this.GetUiNiagara(2).SetNiagaraVarFloat("Dissolve", s));
  }
  Pmt() {
    var t = this.Dmt[this.Rmt];
    return this.Rmt++, this.Rmt >= POINT_EFFECT_NUM && (this.Rmt = 0), t;
  }
  Tick(t) {
    if (this.Umt) {
      this.Umt = !1;
      for (const i of this.Dmt)
        i.IsPlaying &&
          (i.FinishTime <= Time_1.Time.Now
            ? (i.Effect.SetUIActive(!1), (i.IsPlaying = !1))
            : (this.Umt = !0));
    }
  }
  ReplaceFullEffect(t) {
    var i = this.GetUiNiagara(1);
    this.pGn || (this.pGn = i.NiagaraSystemReference), i.SetNiagaraSystem(t);
  }
  OnBeforeDestroy() {
    this.pGn &&
      (this.GetUiNiagara(1).SetNiagaraSystem(this.pGn), (this.pGn = void 0));
  }
}
exports.SpecialEnergyBarPointItem = SpecialEnergyBarPointItem;
//# sourceMappingURL=SpecialEnergyBarPointItem.js.map
