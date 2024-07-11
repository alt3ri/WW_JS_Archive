"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarMorph = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const SpecialEnergyBaIconHandle_1 = require("./SpecialEnergyBaIconHandle");
const SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase");
const SpecialEnergyBarPoint_1 = require("./SpecialEnergyBarPoint");
const SpecialEnergyBarPointGraduate_1 = require("./SpecialEnergyBarPointGraduate");
const SpecialEnergyBarSlot_1 = require("./SpecialEnergyBarSlot");
const specialEnergyBarClassList = [
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
];
const EFFECT_DURATION = 500;
class SpecialEnergyBarMorph extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.Cmt = new SpecialEnergyBaIconHandle_1.SpecialEnergyBaIconHandle()),
      (this.BarItem = void 0),
      (this.fmt = 0),
      (this.Ent = void 0),
      (this.gGn = !1),
      (this.fGn = !1),
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
    const i = [];
    i.push(this.InitBarItem()),
      i.push(this.LoadEffects()),
      i.push(this.InitKeyItem(this.GetItem(1))),
      await Promise.all(i);
  }
  OnStart() {
    let i = [this.GetSprite(0)];
    this.Cmt.Init(i),
      this.Config?.EnableIconPath
        ? (this.gGn = !0)
        : ((this.gGn = !1),
          this.Config?.IconPath && this.Cmt.SetIcon(this.Config.IconPath)),
      this.fmt === 0 && this.GetUiNiagara(2).SetUIActive(!1),
      this.Config?.BuffId &&
        (this.Ent = this.RoleData?.BuffComponent?.GetBuffById(
          this.Config.BuffId,
        )),
      (this.KeyEnableNiagaraIndex = this.Config?.KeyEnableNiagaraIndex ?? -1),
      (this.NeedExtraEffectOnKeyEnable = this.KeyEnableNiagaraIndex >= 0),
      this.NeedExtraEffectOnKeyEnable &&
        ((i = this.NiagaraList[this.KeyEnableNiagaraIndex]) &&
          this.GetUiNiagara(3).SetNiagaraSystem(i),
        this.GetUiNiagara(3).SetUIActive(!1)),
      this.RefreshBarPercent(!0);
  }
  OnChangeVisibleByTagChange(i) {
    i
      ? (this.Config?.BuffId &&
          (this.Ent = this.RoleData?.BuffComponent?.GetBuffById(
            this.Config.BuffId,
          )),
        this.IsShowOrShowing &&
          (this.GetUiNiagara(2).SetUIActive(!0),
          (this.fmt = EFFECT_DURATION + Time_1.Time.Now)))
      : ((this.Ent = void 0), this.Cmt.PlayEndAnim(!1));
  }
  async InitBarItem() {
    const i = this.GetSpecialEnergyBarClass();
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
    super.OnBeforeDestroy(), this.Cmt.OnBeforeDestroy();
  }
  RefreshBarPercent(i = !1) {
    const t = this.GetKeyEnable();
    this.RefreshIcon(t),
      this.RefreshExtraEffectOnKeyEnable(t),
      this.KeyItem?.RefreshKeyEnable(t, i);
  }
  RefreshIcon(t) {
    if (this.gGn) {
      let i = this.Config.IconPath;
      t && this.Config.EnableIconPath && (i = this.Config.EnableIconPath),
        this.Cmt.SetIcon(i);
    }
  }
  RefreshExtraEffectOnKeyEnable(i) {
    this.NeedExtraEffectOnKeyEnable &&
      this.fGn !== i &&
      ((this.fGn = i), this.GetUiNiagara(3).SetUIActive(i));
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
      this.fmt > 0 &&
        this.fmt <= Time_1.Time.Now &&
        (this.GetUiNiagara(2).SetUIActive(!1), (this.fmt = 0)),
      this.Ent &&
        this.Ent.GetRemainDuration() < this.Config.ExtraFloatParams[0] &&
        this.Cmt.PlayEndAnim(!0);
  }
}
exports.SpecialEnergyBarMorph = SpecialEnergyBarMorph;
// # sourceMappingURL=SpecialEnergyBarMorph.js.map
