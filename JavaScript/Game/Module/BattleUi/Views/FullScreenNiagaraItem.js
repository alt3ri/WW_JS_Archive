"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FullScreenNiagaraItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView");
class FullScreenNiagaraItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments), (this.Tht = void 0), (this.Lht = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UINiagara]];
  }
  Reset() {
    this.Lht?.SetNiagaraSystem(void 0),
      (this.Tht = void 0),
      (this.Lht = void 0),
      super.Reset();
  }
  async LoadNiagara(e) {
    if (StringUtils_1.StringUtils.IsEmpty(e)) return !1;
    if (this.Tht === e) return !1;
    this.Tht = e;
    const t = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, (e) => {
        e && this.RootItem && ((this.Lht = this.GetUiNiagara(0)), this.Lht)
          ? (this.Lht.SetNiagaraSystem(void 0),
            this.Lht.SetNiagaraSystem(e),
            t.SetResult(!0))
          : t.SetResult(!1);
      }),
      await t.Promise,
      !0
    );
  }
  SetNiagaraFloatValue(e, t) {
    this.Lht && this.Lht.SetNiagaraVarFloat(e, t);
  }
  SetVisible(e) {
    var t = this.GetUiNiagara(0);
    e
      ? t.ActivateSystem(!0)
      : (this.Lht.SetNiagaraSystem(void 0), this.Lht.DeactivateSystem()),
      this.SetActive(e);
  }
}
exports.FullScreenNiagaraItem = FullScreenNiagaraItem;
//# sourceMappingURL=FullScreenNiagaraItem.js.map
