"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarSlotItem = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../../Core/Common/Time"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  EFFECT_DURATION = 500;
class SpecialEnergyBarSlotItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ac = 0),
      (this.Fdt = !1),
      (this.Kdt = 0),
      (this.Qdt = 0),
      (this.Vdt = 1),
      (this.Xdt = 0),
      (this.$dt = 0),
      (this.Ydt = 0),
      (this.PNn = void 0),
      (this.Oca = -1),
      (this.kca = !1),
      (this.Y7_ = -1),
      (this.z7_ = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UINiagara],
      [4, UE.UINiagara],
      [5, UE.UINiagara],
      [6, UE.UINiagara],
      [7, UE.UISprite],
      [8, UE.UISprite],
    ];
  }
  OnStart() {
    this.GetSprite(0).SetUIActive(!0),
      this.GetSprite(1).SetUIActive(!0),
      this.GetSprite(7).SetUIActive(!0),
      this.GetSprite(8).SetUIActive(!0),
      this.GetUiNiagara(3).SetUIActive(!1),
      this.GetUiNiagara(4).SetUIActive(!1),
      this.GetUiNiagara(5).SetUIActive(!1),
      this.GetUiNiagara(6).SetUIActive(!1);
    var t = this.GetSprite(7);
    this.GetSprite(8).SetStretchLeft(t.GetStretchLeft()),
      (this.Xdt = t.GetStretchRight()),
      (this.$dt = t.Width),
      (this.Ydt = t.tileX);
  }
  SetBarColor(t) {
    this.GetSprite(1).SetColor(t);
  }
  SetPointBgColor(t) {
    this.GetSprite(7).SetColor(t);
  }
  SetPointColor(t) {
    this.GetSprite(8).SetColor(t);
  }
  SetFullEffectColor(t, i = !1) {
    this.GetUiNiagara(3).SetNiagaraVarLinearColor("Color", t),
      this.GetUiNiagara(4).SetNiagaraVarLinearColor("Color", t),
      this.GetUiNiagara(6).SetNiagaraVarLinearColor("Color", t),
      this.GetUiNiagara(3).SetNiagaraVarFloat("Default", i ? 0 : 1),
      this.GetUiNiagara(3).SetNiagaraVarFloat("Shift", i ? 1 : 0);
  }
  SetBgAndUseEffectColor(t) {
    this.GetUiNiagara(4).SetNiagaraVarLinearColor("Color", t),
      this.GetUiNiagara(6).SetNiagaraVarLinearColor("Color", t);
  }
  SetChangeEffectColor(t) {
    this.GetUiNiagara(5).SetNiagaraVarLinearColor("Color", t);
  }
  SetEffectBasePercent(t) {
    (this.Vdt = t),
      this.GetUiNiagara(3).SetNiagaraVarFloat("Dissolve", this.Vdt),
      this.GetUiNiagara(4).SetNiagaraVarFloat("Dissolve", this.Vdt),
      this.GetUiNiagara(5).SetNiagaraVarFloat("Dissolve", this.Vdt),
      this.GetUiNiagara(6).SetNiagaraVarFloat("Dissolve", this.Vdt);
  }
  UpdatePercent(t, i, s = !1) {
    let h = 0;
    t <= MathUtils_1.MathUtils.SmallNumber
      ? (h = -1)
      : t >= 1 - MathUtils_1.MathUtils.SmallNumber && i && (h = 1),
      this.ac !== h &&
        (-1 === h
          ? (this.GetSprite(0).SetUIActive(!0),
            this.GetSprite(7).SetUIActive(!0),
            this.GetSprite(8).SetUIActive(!1),
            this.GetSprite(1).SetUIActive(!1),
            this.GetUiNiagara(3).SetUIActive(!1),
            this.GetUiNiagara(4).SetUIActive(!1),
            this.GetUiNiagara(5).SetUIActive(!1),
            1 !== this.ac || s || this.Jdt())
          : 1 === h
            ? (this.GetSprite(0).SetUIActive(!1),
              this.GetSprite(7).SetUIActive(!1),
              this.GetSprite(8).SetUIActive(!1),
              this.GetSprite(1).SetUIActive(!1),
              this.GetUiNiagara(3).SetUIActive(!0),
              this.GetUiNiagara(4).SetUIActive(!0),
              this.GetUiNiagara(6).SetUIActive(!1),
              this.zdt())
            : (this.GetSprite(0).SetUIActive(!0),
              this.GetSprite(7).SetUIActive(!0),
              this.GetSprite(8).SetUIActive(!0),
              this.GetSprite(1).SetUIActive(!0),
              this.GetUiNiagara(3).SetUIActive(!1),
              this.GetUiNiagara(4).SetUIActive(!1),
              this.GetUiNiagara(5).SetUIActive(!1),
              1 !== this.ac || s || this.Jdt()),
        (this.ac = h)),
      0 === h && (this.GetSprite(1).SetFillAmount(t), this.Zdt(t));
  }
  UpdatePercentWithVisible(t, i, s, h, e) {
    i && (this.GetSprite(1).SetFillAmount(t), this.Zdt(t)),
      h
        ? (this.GetSprite(0).SetUIActive(i),
          this.GetSprite(1).SetUIActive(i),
          this.GetSprite(7).SetUIActive(i),
          this.GetSprite(8).SetUIActive(i),
          this.GetUiNiagara(5).SetUIActive(!1),
          this.GetUiNiagara(6).SetUIActive(!1))
        : s &&
          (this.GetSprite(0).SetUIActive(i),
          this.GetSprite(1).SetUIActive(i),
          this.GetSprite(7).SetUIActive(i),
          this.GetSprite(8).SetUIActive(i),
          i
            ? this.GetUiNiagara(5).SetUIActive(!1)
            : (this.GetUiNiagara(5).SetNiagaraVarFloat(
                "Dissolve",
                t * this.Vdt,
              ),
              this.zdt()),
          i && 0 === t
            ? (this.GetUiNiagara(6).SetNiagaraVarFloat(
                "Dissolve",
                e * this.Vdt,
              ),
              this.Jdt())
            : this.GetUiNiagara(6).SetUIActive(!1));
  }
  UpdatePercentWithFullEffect(t, i, s) {
    s &&
      (this.GetSprite(1).SetUIActive(!1),
      this.GetSprite(8).SetUIActive(!1),
      this.GetUiNiagara(5).SetUIActive(!1),
      this.GetUiNiagara(6).SetUIActive(!1),
      this.GetUiNiagara(3).SetUIActive(!0),
      this.GetUiNiagara(4).SetUIActive(!0)),
      this.GetUiNiagara(3).SetNiagaraVarFloat("Dissolve", t),
      this.GetUiNiagara(4).SetNiagaraVarFloat("Dissolve", i),
      this.GetUiNiagara(3).SetUIActive(0 < t),
      this.GetUiNiagara(4).SetUIActive(0 < i);
  }
  UpdatePercentWithFullEffectEnable(t, i, s = !1) {
    let h = 0;
    t <= MathUtils_1.MathUtils.SmallNumber
      ? (h = -1)
      : i && (h = t < 1 - MathUtils_1.MathUtils.SmallNumber ? 1 : 2),
      this.ac !== h &&
        (-1 === h
          ? (this.GetSprite(0).SetUIActive(!0),
            this.GetSprite(7).SetUIActive(!0),
            this.GetSprite(8).SetUIActive(!1),
            this.GetSprite(1).SetUIActive(!1),
            this.GetUiNiagara(3).SetUIActive(!1),
            this.GetUiNiagara(4).SetUIActive(!1),
            this.GetUiNiagara(5).SetUIActive(!1),
            1 !== this.ac || s || this.Jdt())
          : 1 === h
            ? (this.GetSprite(0).SetUIActive(!1),
              this.GetSprite(7).SetUIActive(!0),
              this.GetSprite(8).SetUIActive(!1),
              this.GetSprite(1).SetUIActive(!1),
              this.GetUiNiagara(3).SetUIActive(!0),
              this.GetUiNiagara(4).SetUIActive(!0),
              this.GetUiNiagara(6).SetUIActive(!1),
              this.zdt())
            : 2 === h
              ? (this.GetSprite(0).SetUIActive(!1),
                this.GetSprite(7).SetUIActive(!1),
                this.GetSprite(8).SetUIActive(!1),
                this.GetSprite(1).SetUIActive(!1),
                this.GetUiNiagara(3).SetUIActive(!0),
                this.GetUiNiagara(4).SetUIActive(!0),
                this.GetUiNiagara(6).SetUIActive(!1),
                this.zdt())
              : (this.GetSprite(0).SetUIActive(!0),
                this.GetSprite(7).SetUIActive(!0),
                this.GetSprite(8).SetUIActive(!0),
                this.GetSprite(1).SetUIActive(!0),
                this.GetUiNiagara(3).SetUIActive(!1),
                this.GetUiNiagara(4).SetUIActive(!1),
                this.GetUiNiagara(5).SetUIActive(!1),
                1 !== this.ac || s || this.Jdt()),
        (this.ac = h)),
      0 === h
        ? (this.GetSprite(1).SetFillAmount(t), this.Zdt(t))
        : 1 === h &&
          (this.GetUiNiagara(3).SetNiagaraVarFloat("Dissolve", t),
          this.GetUiNiagara(4).SetNiagaraVarFloat("Dissolve", t));
  }
  Zdt(t) {
    var t = Math.max(0, Math.min(1, t)),
      i = this.GetSprite(8);
    i.SetStretchRight(this.Xdt + this.$dt * (1 - t)), i.SetTileX(this.Ydt * t);
  }
  PlayUseEffectWithPercent(t) {
    this.GetUiNiagara(6).SetNiagaraVarFloat("Dissolve", t * this.Vdt),
      this.Jdt();
  }
  zdt() {
    this.GetUiNiagara(5).SetUIActive(!0),
      (this.Fdt = !0),
      (this.Kdt = EFFECT_DURATION + Time_1.Time.Now);
  }
  PlayChangeEffectWithPercent(t) {
    this.GetUiNiagara(5).SetNiagaraVarFloat("Dissolve", t), this.zdt();
  }
  SetChangeEffectOffsetX(t) {
    var i = this.GetUiNiagara(5);
    this.z7_ || ((this.z7_ = !0), (this.Y7_ = i.GetAnchorOffsetX())),
      i.SetAnchorOffsetX(t);
  }
  Jdt() {
    this.GetUiNiagara(6).SetUIActive(!0),
      (this.Fdt = !0),
      (this.Qdt = EFFECT_DURATION + Time_1.Time.Now);
  }
  Tick(t) {
    this.Fdt &&
      ((this.Fdt = !1),
      0 < this.Kdt &&
        (this.Kdt <= Time_1.Time.Now
          ? (this.GetUiNiagara(5).SetUIActive(!1), (this.Kdt = 0))
          : (this.Fdt = !0)),
      0 < this.Qdt) &&
      (this.Qdt <= Time_1.Time.Now
        ? (this.GetUiNiagara(6).SetUIActive(!1), (this.Qdt = 0))
        : (this.Fdt = !0));
  }
  ReplaceFullEffect(t) {
    var i = this.GetUiNiagara(3);
    this.PNn || (this.PNn = i.NiagaraSystemReference), i.SetNiagaraSystem(t);
  }
  SetFullEffectOffsetX(t) {
    var i = this.GetUiNiagara(3);
    this.kca || ((this.kca = !0), (this.Oca = i.GetAnchorOffsetX())),
      i.SetAnchorOffsetX(t);
  }
  SetFullEffectVisible(t) {
    this.GetUiNiagara(3).SetUIActive(t);
  }
  OnBeforeDestroy() {
    this.PNn &&
      (this.GetUiNiagara(3).SetNiagaraSystem(this.PNn), (this.PNn = void 0)),
      this.kca &&
        (this.GetUiNiagara(3).SetAnchorOffsetX(this.Oca), (this.kca = !1)),
      this.z7_ &&
        (this.GetUiNiagara(5).SetAnchorOffsetX(this.Y7_), (this.z7_ = !1));
  }
}
exports.SpecialEnergyBarSlotItem = SpecialEnergyBarSlotItem;
//# sourceMappingURL=SpecialEnergyBarSlotItem.js.map
