"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillCombineItem = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  CommonKeyItem_1 = require("./KeyItem/CommonKeyItem");
class BattleSkillCombineItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.jtt = void 0),
      (this.Wtt = void 0),
      (this.Ktt = 0),
      (this.Qtt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UINiagara],
    ];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    (this.Qtt = new CommonKeyItem_1.CommonKeyItem()),
      await this.Qtt.CreateThenShowByActorAsync(e.GetOwner()),
      this.Qtt.RefreshAction(InputMappingsDefine_1.actionMappings.组合主键);
  }
  OnStart() {
    this.GetUiNiagara(1).SetNiagaraUIActive(!1, !1);
  }
  SetVisible(e) {
    e
      ? this.IsShowOrShowing || this.Show()
      : this.IsShowOrShowing && this.Hide();
  }
  OnBeforeDestroy() {
    this.Xtt();
  }
  RefreshDynamicEffect(e) {
    e = this.$tt(e);
    this.jtt !== e &&
      ((this.jtt = e),
      this.jtt
        ? this.jtt === this.Wtt
          ? this.Ytt(!0)
          : ((this.Wtt = this.jtt),
            this.Xtt(),
            (this.Ktt = ResourceSystem_1.ResourceSystem.LoadAsync(
              this.Wtt,
              UE.NiagaraSystem,
              (e) => {
                var t;
                e?.IsValid() &&
                  (t = this.GetUiNiagara(1)) &&
                  (t.SetNiagaraSystem(e), this.Wtt === this.jtt) &&
                  this.Ytt(!0);
              },
            )))
        : this.Ytt(!1));
  }
  Xtt() {
    this.Ktt &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Ktt),
      (this.Ktt = void 0));
  }
  $tt(e) {
    if (e) {
      e = e.GetDynamicEffectConfig();
      if (e) {
        e = e.NiagaraPath;
        if (!StringUtils_1.StringUtils.IsEmpty(e)) return e;
      }
    }
  }
  Ytt(e) {
    var t = this.GetUiNiagara(1);
    t &&
      (e
        ? (t.bIsUIActive || t.SetUIActive(!0), t.ActivateSystem(!0))
        : t.bIsUIActive && t.SetUIActive(!1));
  }
}
exports.BattleSkillCombineItem = BattleSkillCombineItem;
//# sourceMappingURL=BattleSkillCombineItem.js.map
