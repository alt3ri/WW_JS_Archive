"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarZheZhiEffectItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class SpecialEnergyBarZheZhiEffectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Hnt = void 0), (this.yne = !1);
  }
  async InitAsync(t) {
    await this.CreateThenShowByResourceIdAsync("UiItem_BarSlot_1105", t, !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UINiagara],
      [3, UE.UINiagara],
      [4, UE.UINiagara],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ];
  }
  OnStart() {
    super.OnStart(),
      this.GetUiNiagara(3).SetUIActive(!1),
      this.GetUiNiagara(4).SetUIActive(!1),
      this.Est(5),
      this.Est(6);
  }
  SetNiagaraParam(t, e) {
    this.GetUiNiagara(2).SetNiagaraVarFloat(t, e);
  }
  SetVisible(t) {
    this.yne !== t &&
      ((this.yne = t)
        ? (this.Gnt(6), this.GetUiNiagara(4).SetUIActive(!1), this.bnt(5))
        : (this.Gnt(5), this.GetUiNiagara(3).SetUIActive(!1), this.bnt(6)));
  }
  OnBeforeHide() {
    this.Hnt = void 0;
  }
  Est(t) {
    var e = [],
      i = this.GetItem(t)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      s = i.Num();
    for (let t = 0; t < s; t++) e.push(i.Get(t));
    this.Hnt || (this.Hnt = new Map()), this.Hnt.set(t, e);
  }
  bnt(t) {
    t = this.Hnt?.get(t);
    if (t) for (const e of t) e.Play();
  }
  Gnt(t) {
    t = this.Hnt?.get(t);
    if (t) for (const e of t) e.Stop();
  }
}
exports.SpecialEnergyBarZheZhiEffectItem = SpecialEnergyBarZheZhiEffectItem;
//# sourceMappingURL=SpecialEnergyBarZheZhiEffectItem.js.map
