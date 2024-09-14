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
      (this.fQa = new SpecialEnergyBaIconHandle_1.SpecialEnergyBaIconHandle()),
      (this.BarItem = void 0),
      (this.Udt = 0),
      (this.bst = void 0),
      (this.Nqa = 0),
      (this.RNn = !1),
      (this.xNn = !1),
      (this.NeedExtraEffectOnKeyEnable = !1),
      (this.KeyEnableNiagaraIndex = -1),
      (this.ReplaceFullEffectIndex = -1),
      (this.ReplaceStartEffectIndex = -1);
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
      [4, UE.UIItem],
      [5, UE.UISprite],
    ];
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem()),
      i.push(this.LoadEffects()),
      i.push(this.InitKeyItem(this.GetItem(1))),
      await Promise.all(i);
  }
  OnInitData() {
    var i, t;
    super.OnInitData(),
      this.Config &&
        ((this.KeyEnableNiagaraIndex = this.Config.KeyEnableNiagaraIndex),
        (this.NeedExtraEffectOnKeyEnable = 0 <= this.KeyEnableNiagaraIndex),
        1 < (t = (i = this.Config.ExtraFloatParams).length) &&
          (this.ReplaceFullEffectIndex = i[1]),
        2 < t) &&
        (this.ReplaceStartEffectIndex = i[2]);
  }
  OnStart() {
    var i = [this.GetSprite(0)];
    this.Ddt.Init(i),
      this.Config?.EnableIconPath
        ? (this.RNn = !0)
        : ((this.RNn = !1),
          this.Config?.IconPath
            ? this.Ddt.SetIcon(this.Config.IconPath)
            : this.Ddt.SetIcon(void 0)),
      this.fQa.Init([this.GetSprite(5)]),
      this.Config?.FrontIconPath
        ? this.fQa.SetIcon(this.Config.FrontIconPath)
        : this.fQa.SetIcon(void 0),
      0 === this.Udt && this.GetUiNiagara(2).SetUIActive(!1),
      this.RefreshBuff(),
      this.NeedExtraEffectOnKeyEnable &&
        ((i = this.NiagaraList[this.KeyEnableNiagaraIndex]) &&
          (this.GetUiNiagara(3).SetNiagaraSystem(i),
          this.Config?.OtherEffectColorList[this.KeyEnableNiagaraIndex]) &&
          ((i = UE.Color.FromHex(
            this.Config?.OtherEffectColorList[this.KeyEnableNiagaraIndex],
          )),
          (i = new UE.LinearColor(i)),
          this.GetUiNiagara(3).SetNiagaraVarLinearColor("Color", i)),
        this.GetUiNiagara(3).SetUIActive(!1)),
      0 <= this.ReplaceFullEffectIndex &&
        (i = this.NiagaraList[this.ReplaceFullEffectIndex]) &&
        this.BarItem &&
        (this.BarItem.ReplaceFullEffect(i),
        this.BarItem instanceof SpecialEnergyBarSlot_1.SpecialEnergyBarSlot) &&
        this.BarItem.UpdateFullEffectOffsetBySlotWidth(),
      0 <= this.ReplaceStartEffectIndex &&
        (i = this.NiagaraList[this.ReplaceStartEffectIndex]) &&
        this.GetUiNiagara(2).SetNiagaraSystem(i),
      this.RefreshBarPercent(!0);
  }
  RefreshBuff() {
    this.Config?.BuffId
      ? ((this.bst = this.BuffComponent?.GetBuffById(this.Config.BuffId)),
        (this.Nqa = this.bst?.Handle ?? 0))
      : ((this.bst = void 0), (this.Nqa = 0));
  }
  OnChangeVisibleByTagChange(i) {
    i
      ? (this.RefreshBuff(),
        this.IsShowOrShowing &&
          (this.GetUiNiagara(2).SetUIActive(!0),
          (this.Udt = EFFECT_DURATION + Time_1.Time.Now)))
      : ((this.bst = void 0), (this.Nqa = 0), this.Ddt.PlayEndAnim(!1));
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
        this.GetItem(4),
        this.Config.PrefabPath,
      ));
  }
  GetSpecialEnergyBarClass() {
    return specialEnergyBarClassList[this.Config.PrefabType];
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(),
      this.Ddt.OnBeforeDestroy(),
      this.fQa.OnBeforeDestroy();
  }
  RefreshBarPercent(i = !1) {
    var t = this.GetKeyEnable();
    this.RefreshIcon(t),
      this.RefreshExtraEffectOnKeyEnable(t),
      this.KeyItem?.RefreshKeyEnable(t, i);
  }
  RefreshIcon(t) {
    if (this.RNn) {
      let i = this.Config.IconPath;
      t && this.Config.EnableIconPath && (i = this.Config.EnableIconPath),
        this.Ddt.SetIcon(i);
    }
  }
  RefreshExtraEffectOnKeyEnable(i) {
    this.NeedExtraEffectOnKeyEnable &&
      this.xNn !== i &&
      ((this.xNn = i), this.GetUiNiagara(3).SetUIActive(i));
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
      (this.bst && this.BuffComponent?.GetBuffByHandle(this.Nqa)) ||
        this.RefreshBuff(),
      this.bst &&
        this.Ddt.PlayEndAnim(
          this.bst.GetRemainDuration() < this.Config.ExtraFloatParams[0],
        );
  }
  ReplaceFullEffect(i) {
    this.BarItem.ReplaceFullEffect(i);
  }
}
exports.SpecialEnergyBarMorph = SpecialEnergyBarMorph;
//# sourceMappingURL=SpecialEnergyBarMorph.js.map
