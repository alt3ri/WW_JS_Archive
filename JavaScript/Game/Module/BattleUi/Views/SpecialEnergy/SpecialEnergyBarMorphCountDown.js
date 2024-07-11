"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarMorphCountDown = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../../Core/Common/Time"),
  SpecialEnergyBaIconHandle_1 = require("./SpecialEnergyBaIconHandle"),
  SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase"),
  SpecialEnergyBarPointItem_1 = require("./SpecialEnergyBarPointItem"),
  pointNumList = [19, 20],
  TOTAL_NUM = 41,
  POINT_WIDTH = 9,
  EFFECT_DURATION = 500;
class SpecialEnergyBarMorphCountDown extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.Adt = void 0),
      (this.Pdt = void 0),
      (this.Ddt = new SpecialEnergyBaIconHandle_1.SpecialEnergyBaIconHandle()),
      (this.Udt = 0),
      (this.xdt = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UINiagara],
    ];
  }
  async OnBeforeStartAsync() {
    5 === this.Config.PrefabType
      ? (this.xdt = pointNumList[0])
      : (this.xdt = pointNumList[1]);
    var i = [];
    i.push(this.InitPointLeftItem(this.GetItem(0))),
      i.push(this.InitPointRightItem(this.GetItem(1))),
      await Promise.all(i);
  }
  async InitPointLeftItem(i) {
    (this.Adt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
      this.Adt.InitPrefabInfo(this.xdt, POINT_WIDTH),
      await this.Adt.CreateThenShowByActorAsync(i.GetOwner());
  }
  async InitPointRightItem(i) {
    (this.Pdt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
      this.Pdt.InitPrefabInfo(this.xdt, POINT_WIDTH),
      await this.Pdt.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i;
    this.Config &&
      ((i = this.xdt / TOTAL_NUM),
      this.Adt.SetEffectBasePercent(i),
      this.Pdt.SetEffectBasePercent(i),
      this.Config.EffectColor &&
        ((i = new UE.LinearColor(UE.Color.FromHex(this.Config.EffectColor))),
        this.Adt.SetFullEffectColor(i, !0),
        this.Pdt.SetFullEffectColor(i, !0)),
      this.Config.IconPath &&
        ((i = [this.GetSprite(2)]),
        this.Ddt.Init(i),
        this.Ddt.SetIcon(this.Config.IconPath)),
      0 === this.Udt && this.GetUiNiagara(3).SetUIActive(!1),
      this.RefreshBarPercent());
  }
  OnChangeVisibleByTagChange(i) {
    i &&
      (this.GetUiNiagara(3).SetUIActive(!0),
      (this.Udt = EFFECT_DURATION + Time_1.Time.Now));
  }
  OnBeforeShow() {
    9 === this.Config.PrefabType &&
      (this.GetUiNiagara(3).SetUIActive(!0),
      (this.Udt = EFFECT_DURATION + Time_1.Time.Now));
  }
  RefreshBarPercent() {
    var i = this.PercentMachine.GetCurPercent();
    this.Adt.UpdatePercent(i),
      this.Pdt.UpdatePercent(i),
      this.Ddt.PlayEndAnim(i < this.Config.ExtraFloatParams[0]);
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  Tick(i) {
    super.Tick(i),
      this.Adt?.Tick(i),
      this.Pdt?.Tick(i),
      0 < this.Udt &&
        this.Udt <= Time_1.Time.Now &&
        (this.GetUiNiagara(3).SetUIActive(!1), (this.Udt = 0));
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(), this.Ddt.OnBeforeDestroy();
  }
}
exports.SpecialEnergyBarMorphCountDown = SpecialEnergyBarMorphCountDown;
//# sourceMappingURL=SpecialEnergyBarMorphCountDown.js.map
