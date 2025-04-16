"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillUltraItem = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
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
      (this.dsh = ""),
      (this.Bot = void 0),
      (this.bot = void 0),
      (this.Csh = void 0),
      (this.qot = -1),
      (this.vot = new Map()),
      (this.Qel = !1),
      (this.Eoh = (t) => {
        this.ixl();
      }),
      this.CreateByResourceIdAsync("UiItem_BattleSkillUltraItem", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UINiagara],
      [2, UE.UINiagara],
      [3, UE.UINiagara],
      [4, UE.UINiagara],
    ];
  }
  OnStart() {
    this.Uot = this.GetSprite(0);
    for (const t of this.vot.values()) t();
    ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink() &&
      (this.ixl(),
      (this.Qel = !0),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleLinkStatusChanged,
        this.Eoh,
      ));
  }
  OnBeforeDestroy() {
    (this.Uot = void 0),
      this.vot.clear(),
      this.Got(),
      this.Not(),
      this.Qel &&
        ((this.Qel = !1),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnBattleLinkStatusChanged,
          this.Eoh,
        ));
  }
  SetComponentActive(t) {
    this.Visible = t;
    t = () => {
      this.SetActive(this.Visible);
    };
    this.InAsyncLoading() ? this.vot.set("SetActive", t) : t();
  }
  SetBarPercent(t, i) {
    var e;
    this.qot !== t &&
      ((e = () => {
        this.Uot.SetFillAmount(t), (this.qot = t);
      }),
      this.InAsyncLoading() ? this.vot.set("SetBarPercent", e) : e());
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
  gsh(t, i) {
    t &&
      t.bIsUIActive !== i &&
      (t.SetUIActive(i), i ? t.ActivateSystem(!0) : t.DeactivateSystem());
  }
  SetUltraEffectEnable(t) {
    var i = () => {
      this.HasValidUltDynamicEffect()
        ? t
          ? (this.SetBarVisible(!1),
            this.gsh(this.GetUiNiagara(1), !1),
            this.gsh(this.GetUiNiagara(4), !0))
          : (this.SetBarVisible(!0),
            this.gsh(this.GetUiNiagara(1), !1),
            this.gsh(this.GetUiNiagara(4), !1))
        : (this.SetBarVisible(!0),
          this.gsh(this.GetUiNiagara(1), t),
          this.gsh(this.GetUiNiagara(4), !1));
    };
    this.InAsyncLoading() ? this.vot.set("SetUltraEffectEnable", i) : i();
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
    var e;
    StringUtils_1.StringUtils.IsEmpty(this.Pot) || this.Pot !== t
      ? ((this.xot = i),
        (e = () => {
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
        this.InAsyncLoading() ? this.vot.set("RefreshUltraEffect", e) : e())
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
  RefreshUltraDynamicEffect(t, i = 0) {
    var e;
    (!StringUtils_1.StringUtils.IsEmpty(this.dsh) && this.dsh === t) ||
      ((e = () => {
        this.fsh(),
          (this.Csh = ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.NiagaraSystem,
            (t) => {
              t?.IsValid() && this.GetUiNiagara(4)?.SetNiagaraSystem(t);
            },
          )),
          (this.dsh = t);
      }),
      this.InAsyncLoading()
        ? this.vot.set("RefreshUltraDynamicEffect", e)
        : e());
  }
  fsh() {
    this.Csh &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Csh),
      (this.Csh = void 0));
  }
  StopUltraDynamicEffect() {
    var t = this.GetUiNiagara(4);
    t?.DeactivateSystem(), t?.SetUIActive(!1);
  }
  HasValidUltDynamicEffect() {
    return (
      !(
        !this.Csh ||
        !ModelManager_1.ModelManager.BattleLinkModel.CheckInDreamLink()
      ) && ModelManager_1.ModelManager.BattleLinkModel.CanUseLinkSkill()
    );
  }
  ixl() {
    ModelManager_1.ModelManager.BattleLinkModel?.CanUseLinkSkill()
      ? this.SetUltraEffectEnable(!0)
      : this.SetUltraEffectEnable(!1);
  }
}
exports.BattleSkillUltraItem = BattleSkillUltraItem;
//# sourceMappingURL=BattleSkillUltraItem.js.map
