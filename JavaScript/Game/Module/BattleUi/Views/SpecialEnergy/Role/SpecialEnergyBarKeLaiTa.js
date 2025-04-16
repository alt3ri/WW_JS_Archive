"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarKeLaiTa = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot"),
  EFFECT_BASE_PERCENT = 19 / 41;
class SpecialEnergyBarKeLaiTa extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.Rdt = void 0),
      (this.bst = void 0),
      (this.p2a = 0),
      (this.Rdl = !1),
      (this.$jl = -1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UINiagara],
      [4, UE.UINiagara],
      [5, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem()),
      t.push(this.LoadEffects()),
      await Promise.all(t);
  }
  async InitBarItem() {
    (this.Rdt = new SpecialEnergyBarSlot_1.SpecialEnergyBarSlot()),
      (this.Rdt.ForceHideBottomLine = !0),
      this.Rdt.InitData(this.RoleData, this.Config, !0),
      await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    super.OnStart(),
      this.InitTweenAnim(5),
      this.Rdt.SetCustomEffectBasePercent(EFFECT_BASE_PERCENT),
      this.RefreshBuff(),
      this.y4l(void 0 === this.bst, !0);
  }
  RefreshBuff() {
    this.Config?.BuffId
      ? ((this.bst = this.BuffComponent?.GetBuffById(this.Config.BuffId)),
        (this.p2a = this.bst?.Handle ?? 0))
      : ((this.bst = void 0), (this.p2a = 0));
  }
  Tick(t) {
    super.Tick(t),
      this.Rdt?.Tick(t),
      (this.bst && this.BuffComponent?.GetBuffByHandle(this.p2a)) ||
        this.RefreshBuff(),
      this.bst && 0 < this.bst.Duration
        ? (this.y4l(!1),
          (t = 1 - this.bst.GetRemainDuration() / this.bst.Duration),
          this.Xjl(t))
        : this.y4l(!0);
  }
  Xjl(t) {
    this.$jl !== t &&
      ((this.$jl = t),
      this.GetUiNiagara(3).SetNiagaraVarFloat("Dissolve", t),
      this.GetUiNiagara(4).SetNiagaraVarFloat("Dissolve", t));
  }
  y4l(t, i = !1) {
    (this.Rdl === t && !i) ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "【能量条】柯莱塔终结重击状态更新", [
          "isRed",
          t,
        ]),
      (this.Rdl = t),
      this.GetItem(1)?.SetUIActive(!t),
      this.GetItem(2)?.SetUIActive(t),
      t) ||
      i ||
      this.PlayTweenAnim(5);
  }
}
exports.SpecialEnergyBarKeLaiTa = SpecialEnergyBarKeLaiTa;
//# sourceMappingURL=SpecialEnergyBarKeLaiTa.js.map
