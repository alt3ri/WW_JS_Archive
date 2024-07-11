"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillUltraItem = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BattleSkillUltraItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Visible = !1),
      (this.mit = void 0),
      (this.dit = void 0),
      (this.Cit = ""),
      (this.git = void 0),
      (this.fit = ""),
      (this.pit = void 0),
      (this.vit = void 0),
      (this.Mit = -1),
      (this.nit = new Map()),
      this.CreateByResourceIdAsync("UiItem_BattleSkillUltraItem", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UINiagara],
      [2, UE.UINiagara],
      [3, UE.UINiagara],
    ];
  }
  OnStart() {
    this.mit = this.GetSprite(0);
    for (const t of this.nit.values()) t();
  }
  OnBeforeDestroy() {
    (this.mit = void 0), this.nit.clear(), this.Eit(), this.yit();
  }
  SetComponentActive(t) {
    this.Visible = t;
    t = () => {
      this.SetActive(this.Visible);
    };
    this.InAsyncLoading() ? this.nit.set("SetActive", t) : t();
  }
  SetBarPercent(t, i) {
    let s;
    this.Mit !== t &&
      ((s = () => {
        this.mit.SetFillAmount(t), (this.Mit = t);
      }),
      this.InAsyncLoading() ? this.nit.set("SetBarPercent", s) : s());
  }
  SetBarVisible(t) {
    const i = () => {
      this.mit.bIsUIActive !== t && this.mit.SetUIActive(t);
    };
    this.InAsyncLoading() ? this.nit.set("SetBarVisible", i) : i();
  }
  SetFrameSprite(t) {
    let i;
    !t ||
      (this.dit && this.dit.op_Equality(t)) ||
      ((i = () => {
        this.mit?.SetColor(t), (this.dit = t);
      }),
      this.InAsyncLoading() ? this.nit.set("SetFrameSprite", i) : i());
  }
  SetUltraEffectEnable(i) {
    const t = () => {
      const t = this.GetUiNiagara(1);
      t.bIsUIActive !== i &&
        (t.SetUIActive(i), i ? t.ActivateSystem(!0) : t.DeactivateSystem());
    };
    this.InAsyncLoading() ? this.nit.set("SetUltraEffectEnable", t) : t();
  }
  SetUltraTipsEffectEnable(i) {
    const t = () => {
      const t = this.GetUiNiagara(2);
      t.bIsUIActive !== i && t.SetUIActive(i),
        i ? t.ActivateSystem(!0) : t.DeactivateSystem();
    };
    this.InAsyncLoading() ? this.nit.set("SetUltraTipsEffectEnable", t) : t();
  }
  SetUltraUpEffectEnable(i) {
    const t = () => {
      const t = this.GetUiNiagara(3);
      t.bIsUIActive !== i && t.SetUIActive(i),
        i
          ? (t.SetNiagaraVarFloat("Time", this.Mit), t.ActivateSystem(!0))
          : t.DeactivateSystem();
    };
    this.InAsyncLoading() ? this.nit.set("SetUltraUpEffectEnable", t) : t();
  }
  RefreshUltraEffect(t, i) {
    let s;
    StringUtils_1.StringUtils.IsEmpty(this.Cit) || this.Cit !== t
      ? ((this.git = i),
        (s = () => {
          this.Eit(),
            (this.pit = ResourceSystem_1.ResourceSystem.LoadAsync(
              t,
              UE.NiagaraSystem,
              (t) => {
                let i;
                t?.IsValid() &&
                  ((i = this.GetUiNiagara(1))?.SetNiagaraSystem(t),
                  i?.SetNiagaraVarLinearColor("Color", this.git));
              },
            )),
            (this.Cit = t);
        }),
        this.InAsyncLoading() ? this.nit.set("RefreshUltraEffect", s) : s())
      : this.git !== i &&
        ((this.git = i),
        this.InAsyncLoading() ||
          this.GetUiNiagara(1)?.SetNiagaraVarLinearColor("Color", this.git));
  }
  Eit() {
    this.pit &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.pit),
      (this.pit = void 0));
  }
  RefreshUltraTipsEffect(t) {
    let i;
    (!StringUtils_1.StringUtils.IsEmpty(this.fit) && this.fit === t) ||
      ((i = () => {
        this.yit(),
          (this.vit = ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.NiagaraSystem,
            (t) => {
              t?.IsValid() && this.GetUiNiagara(2)?.SetNiagaraSystem(t);
            },
          )),
          (this.fit = t);
      }),
      this.InAsyncLoading() ? this.nit.set("RefreshUltraTipsEffect", i) : i());
  }
  yit() {
    this.vit &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.vit),
      (this.vit = void 0));
  }
}
exports.BattleSkillUltraItem = BattleSkillUltraItem;
// # sourceMappingURL=BattleSkillUltraItem.js.map
