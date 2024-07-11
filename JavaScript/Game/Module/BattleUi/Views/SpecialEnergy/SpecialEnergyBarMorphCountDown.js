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
      (this.pmt = void 0),
      (this.vmt = void 0),
      (this.Cmt = new SpecialEnergyBaIconHandle_1.SpecialEnergyBaIconHandle()),
      (this.fmt = 0),
      (this.Mmt = 0);
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
      ? (this.Mmt = pointNumList[0])
      : (this.Mmt = pointNumList[1]);
    var i = [];
    i.push(this.InitPointLeftItem(this.GetItem(0))),
      i.push(this.InitPointRightItem(this.GetItem(1))),
      await Promise.all(i);
  }
  async InitPointLeftItem(i) {
    (this.pmt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
      this.pmt.InitPrefabInfo(this.Mmt, POINT_WIDTH),
      await this.pmt.CreateThenShowByActorAsync(i.GetOwner());
  }
  async InitPointRightItem(i) {
    (this.vmt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
      this.vmt.InitPrefabInfo(this.Mmt, POINT_WIDTH),
      await this.vmt.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i;
    this.Config &&
      ((i = this.Mmt / TOTAL_NUM),
      this.pmt.SetEffectBasePercent(i),
      this.vmt.SetEffectBasePercent(i),
      this.Config.EffectColor &&
        ((i = new UE.LinearColor(UE.Color.FromHex(this.Config.EffectColor))),
        this.pmt.SetFullEffectColor(i, !0),
        this.vmt.SetFullEffectColor(i, !0)),
      this.Config.IconPath &&
        ((i = [this.GetSprite(2)]),
        this.Cmt.Init(i),
        this.Cmt.SetIcon(this.Config.IconPath)),
      0 === this.fmt && this.GetUiNiagara(3).SetUIActive(!1),
      this.RefreshBarPercent());
  }
  OnChangeVisibleByTagChange(i) {
    i &&
      (this.GetUiNiagara(3).SetUIActive(!0),
      (this.fmt = EFFECT_DURATION + Time_1.Time.Now));
  }
  OnBeforeShow() {
    9 === this.Config.PrefabType &&
      (this.GetUiNiagara(3).SetUIActive(!0),
      (this.fmt = EFFECT_DURATION + Time_1.Time.Now));
  }
  RefreshBarPercent() {
    var i = this.PercentMachine.GetCurPercent();
    this.pmt.UpdatePercent(i),
      this.vmt.UpdatePercent(i),
      this.Cmt.PlayEndAnim(i < this.Config.ExtraFloatParams[0]);
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  Tick(i) {
    super.Tick(i),
      this.pmt?.Tick(i),
      this.vmt?.Tick(i),
      0 < this.fmt &&
        this.fmt <= Time_1.Time.Now &&
        (this.GetUiNiagara(3).SetUIActive(!1), (this.fmt = 0));
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(), this.Cmt.OnBeforeDestroy();
  }
}
exports.SpecialEnergyBarMorphCountDown = SpecialEnergyBarMorphCountDown;
//# sourceMappingURL=SpecialEnergyBarMorphCountDown.js.map
