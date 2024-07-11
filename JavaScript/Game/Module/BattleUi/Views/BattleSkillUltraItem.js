"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillUltraItem = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BattleSkillUltraItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Visible = !1),
      (this.Uot = void 0),
      (this.Aot = void 0),
      (this.Pot = ""),
      (this.xot = void 0),
      (this.wot = ""),
      (this.Bot = void 0),
      (this.bot = void 0),
      (this.qot = -1),
      (this.vot = new Map()),
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
    this.Uot = this.GetSprite(0);
    for (const t of this.vot.values()) t();
  }
  OnBeforeDestroy() {
    (this.Uot = void 0), this.vot.clear(), this.Got(), this.Not();
  }
  SetComponentActive(t) {
    this.Visible = t;
    t = () => {
      this.SetActive(this.Visible);
    };
    this.InAsyncLoading() ? this.vot.set("SetActive", t) : t();
  }
  SetBarPercent(t, i) {
    var s;
    this.qot !== t &&
      ((s = () => {
        this.Uot.SetFillAmount(t), (this.qot = t);
      }),
      this.InAsyncLoading() ? this.vot.set("SetBarPercent", s) : s());
  }
  SetBarVisible(t) {
    var i = () => {
      this.Uot.bIsUIActive !== t && this.Uot.SetUIActive(t);
    };
    this.InAsyncLoading() ? this.vot.set("SetBarVisible", i) : i();
  }
  SetFrameSprite(t) {
    var i;
    !t ||
      (this.Aot && this.Aot.op_Equality(t)) ||
      ((i = () => {
        this.Uot?.SetColor(t), (this.Aot = t);
      }),
      this.InAsyncLoading() ? this.vot.set("SetFrameSprite", i) : i());
  }
  SetUltraEffectEnable(i) {
    var t = () => {
      var t = this.GetUiNiagara(1);
      t.bIsUIActive !== i &&
        (t.SetUIActive(i), i ? t.ActivateSystem(!0) : t.DeactivateSystem());
    };
    this.InAsyncLoading() ? this.vot.set("SetUltraEffectEnable", t) : t();
  }
  SetUltraTipsEffectEnable(i) {
    var t = () => {
      var t = this.GetUiNiagara(2);
      t.bIsUIActive !== i && t.SetUIActive(i),
        i ? t.ActivateSystem(!0) : t.DeactivateSystem();
    };
    this.InAsyncLoading() ? this.vot.set("SetUltraTipsEffectEnable", t) : t();
  }
  SetUltraUpEffectEnable(i) {
    var t = () => {
      var t = this.GetUiNiagara(3);
      t.bIsUIActive !== i && t.SetUIActive(i),
        i
          ? (t.SetNiagaraVarFloat("Time", this.qot), t.ActivateSystem(!0))
          : t.DeactivateSystem();
    };
    this.InAsyncLoading() ? this.vot.set("SetUltraUpEffectEnable", t) : t();
  }
  RefreshUltraEffect(t, i) {
    var s;
    StringUtils_1.StringUtils.IsEmpty(this.Pot) || this.Pot !== t
      ? ((this.xot = i),
        (s = () => {
          this.Got(),
            (this.Bot = ResourceSystem_1.ResourceSystem.LoadAsync(
              t,
              UE.NiagaraSystem,
              (t) => {
                var i;
                t?.IsValid() &&
                  ((i = this.GetUiNiagara(1))?.SetNiagaraSystem(t),
                  i?.SetNiagaraVarLinearColor("Color", this.xot));
              },
            )),
            (this.Pot = t);
        }),
        this.InAsyncLoading() ? this.vot.set("RefreshUltraEffect", s) : s())
      : this.xot !== i &&
        ((this.xot = i),
        this.InAsyncLoading() ||
          this.GetUiNiagara(1)?.SetNiagaraVarLinearColor("Color", this.xot));
  }
  Got() {
    this.Bot &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Bot),
      (this.Bot = void 0));
  }
  RefreshUltraTipsEffect(t) {
    var i;
    (!StringUtils_1.StringUtils.IsEmpty(this.wot) && this.wot === t) ||
      ((i = () => {
        this.Not(),
          (this.bot = ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.NiagaraSystem,
            (t) => {
              t?.IsValid() && this.GetUiNiagara(2)?.SetNiagaraSystem(t);
            },
          )),
          (this.wot = t);
      }),
      this.InAsyncLoading() ? this.vot.set("RefreshUltraTipsEffect", i) : i());
  }
  Not() {
    this.bot &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.bot),
      (this.bot = void 0));
  }
}
exports.BattleSkillUltraItem = BattleSkillUltraItem;
//# sourceMappingURL=BattleSkillUltraItem.js.map
