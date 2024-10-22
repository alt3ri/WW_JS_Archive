"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarMorph = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  SpecialEnergyBaIconHandle_1 = require("./SpecialEnergyBaIconHandle"),
  SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase"),
  SpecialEnergyBarPoint_1 = require("./SpecialEnergyBarPoint"),
  SpecialEnergyBarPointGraduate_1 = require("./SpecialEnergyBarPointGraduate"),
  SpecialEnergyBarSlot_1 = require("./SpecialEnergyBarSlot"),
  specialEnergyBarClassList = [
    void 0,
    void 0,
    void 0,
    SpecialEnergyBarPoint_1.SpecialEnergyBarPoint,
    SpecialEnergyBarSlot_1.SpecialEnergyBarSlot,
    void 0,
    void 0,
    void 0,
    void 0,
    SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate,
  ],
  EFFECT_DURATION = 500;
class SpecialEnergyBarMorph extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.Ddt = new SpecialEnergyBaIconHandle_1.SpecialEnergyBaIconHandle()),
      (this.BarItem = void 0),
      (this.Udt = 0),
      (this.bst = void 0),
      (this.SNn = !1),
      (this.ENn = !1),
      (this.NeedExtraEffectOnKeyEnable = !1),
      (this.KeyEnableNiagaraIndex = 0);
  }
  async InitByPathAsync(i, t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "加载特殊能量条 - 变身组件"),
      (this.NeedOverrideDestroy = !1),
      await this.CreateByResourceIdAsync("UiItem_BarPointMorp", i, !0),
      this.AddEvents(),
      this.RefreshVisible();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UINiagara],
      [3, UE.UINiagara],
    ];
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem()),
      i.push(this.LoadEffects()),
      i.push(this.InitKeyItem(this.GetItem(1))),
      await Promise.all(i);
  }
  OnStart() {
    var i = [this.GetSprite(0)];
    this.Ddt.Init(i),
      this.Config?.EnableIconPath
        ? (this.SNn = !0)
        : ((this.SNn = !1),
          this.Config?.IconPath && this.Ddt.SetIcon(this.Config.IconPath)),
      0 === this.Udt && this.GetUiNiagara(2).SetUIActive(!1),
      this.Config?.BuffId &&
        (this.bst = this.RoleData?.BuffComponent?.GetBuffById(
          this.Config.BuffId,
        )),
      (this.KeyEnableNiagaraIndex = this.Config?.KeyEnableNiagaraIndex ?? -1),
      (this.NeedExtraEffectOnKeyEnable = 0 <= this.KeyEnableNiagaraIndex),
      this.NeedExtraEffectOnKeyEnable &&
        ((i = this.NiagaraList[this.KeyEnableNiagaraIndex]) &&
          this.GetUiNiagara(3).SetNiagaraSystem(i),
        this.GetUiNiagara(3).SetUIActive(!1)),
      this.RefreshBarPercent(!0);
  }
  OnChangeVisibleByTagChange(i) {
    i
      ? (this.Config?.BuffId &&
          (this.bst = this.RoleData?.BuffComponent?.GetBuffById(
            this.Config.BuffId,
          )),
        this.IsShowOrShowing &&
          (this.GetUiNiagara(2).SetUIActive(!0),
          (this.Udt = EFFECT_DURATION + Time_1.Time.Now)))
      : ((this.bst = void 0), this.Ddt.PlayEndAnim(!1));
  }
  async InitBarItem() {
    var i = this.GetSpecialEnergyBarClass();
    i &&
      ((this.BarItem = new i()),
      this.BarItem.InitData(this.RoleData, this.Config, !1),
      (i !== SpecialEnergyBarSlot_1.SpecialEnergyBarSlot &&
        i !== SpecialEnergyBarPoint_1.SpecialEnergyBarPoint &&
        i !== SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate) ||
        (this.BarItem.IsMorph = !0),
      await this.BarItem.InitByPathAsync(
        this.RootItem,
        this.Config.PrefabPath,
      ));
  }
  GetSpecialEnergyBarClass() {
    return specialEnergyBarClassList[this.Config.PrefabType];
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(), this.Ddt.OnBeforeDestroy();
  }
  RefreshBarPercent(i = !1) {
    var t = this.GetKeyEnable();
    this.RefreshIcon(t),
      this.RefreshExtraEffectOnKeyEnable(t),
      this.KeyItem?.RefreshKeyEnable(t, i);
  }
  RefreshIcon(t) {
    if (this.SNn) {
      let i = this.Config.IconPath;
      t && this.Config.EnableIconPath && (i = this.Config.EnableIconPath),
        this.Ddt.SetIcon(i);
    }
  }
  RefreshExtraEffectOnKeyEnable(i) {
    this.NeedExtraEffectOnKeyEnable &&
      this.ENn !== i &&
      ((this.ENn = i), this.GetUiNiagara(3).SetUIActive(i));
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  OnKeyEnableChanged() {
    this.RefreshBarPercent();
  }
  Tick(i) {
    super.Tick(i),
      this.BarItem?.Tick(i),
      0 < this.Udt &&
        this.Udt <= Time_1.Time.Now &&
        (this.GetUiNiagara(2).SetUIActive(!1), (this.Udt = 0)),
      this.bst ||
        (this.Config?.BuffId &&
          (this.bst = this.RoleData?.BuffComponent?.GetBuffById(
            this.Config.BuffId,
          ))),
      this.bst &&
        this.bst.GetRemainDuration() < this.Config.ExtraFloatParams[0] &&
        this.Ddt.PlayEndAnim(!0);
  }
  ReplaceFullEffect(i) {
    this.BarItem.ReplaceFullEffect(i);
  }
}
exports.SpecialEnergyBarMorph = SpecialEnergyBarMorph;
//# sourceMappingURL=SpecialEnergyBarMorph.js.map
