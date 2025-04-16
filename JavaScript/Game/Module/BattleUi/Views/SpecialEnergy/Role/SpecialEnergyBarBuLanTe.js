"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarBuLanTe = void 0);
const UE = require("ue"),
  SpecialEnergyBaIconHandle_1 = require("../SpecialEnergyBaIconHandle"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot"),
  SpecialEnergyBarBuLanTeStarItem_1 = require("./SpecialEnergyBarBuLanTeStarItem"),
  NUM = 3;
class SpecialEnergyBarBuLanTe extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.Rdt = void 0),
      (this.Ddt = new SpecialEnergyBaIconHandle_1.SpecialEnergyBaIconHandle()),
      (this.tqt = []),
      (this.CN = !1),
      (this.DP_ = !1),
      (this.TGe = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e = [];
    e.push(this.InitBarItem());
    for (let t = 0; t < NUM; t++) e.push(this.BP_(t));
    await Promise.all(e);
  }
  async InitBarItem() {
    (this.Rdt = new SpecialEnergyBarSlot_1.SpecialEnergyBarSlot()),
      (this.Rdt.ForceHideBottomLine = !0),
      this.Rdt.InitData(this.RoleData, this.Config, !0),
      await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  async BP_(t) {
    var e =
      new SpecialEnergyBarBuLanTeStarItem_1.SpecialEnergyBarBuLanTeStarItem();
    this.tqt.push(e),
      await e.CreateThenShowByActorAsync(this.GetItem(3 + t).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(6),
      this.InitTweenAnim(7),
      this.InitTweenAnim(8),
      this.InitTweenAnim(9),
      this.InitTweenAnim(10),
      this.InitTweenAnim(11),
      this.PlayTweenAnim(11),
      this.Ddt.Init([this.GetTexture(2)]),
      this.kP_(!0),
      this.qP_(!0),
      this.OP_(!0);
  }
  OnBarPercentChanged() {
    this.kP_(), this.qP_(), this.OP_();
  }
  kP_(t = !1) {
    var e =
      this.PercentMachine.GetCurPercent() >= this.Config.DisableKeyOnPercent;
    (this.DP_ === e && !t) ||
      ((this.DP_ = e),
      this.DP_
        ? (this.StopTweenAnim(7), this.PlayTweenAnim(6))
        : t
          ? (this.StopTweenAnim(6),
            this.GetTexture(2)?.SetUIActive(!0),
            this.GetTexture(2)?.SetAlpha(1))
          : (this.StopTweenAnim(6), this.PlayTweenAnim(7)));
  }
  qP_(t = !1) {
    var e = this.PercentMachine.GetCurPercent(),
      i = (this.GetSprite(1)?.SetFillAmount(e), e <= 0);
    if (this.CN !== i || t) {
      (this.CN = i)
        ? this.Ddt.SetIcon(this.Config?.IconPath)
        : this.Ddt.SetIcon(this.Config?.EnableIconPath);
      for (const s of this.tqt) s.SetIsEmpty(i);
    }
  }
  OP_(t = 0) {
    var e = this.PercentMachine.GetCurPercent(),
      i = Math.min(Math.floor(4 * e), NUM);
    for (let t = this.TGe; t < i; t++) this.PlayTweenAnim(8 + t);
    for (let t = i; t < NUM; t++) this.tqt[t].SetStarEnable(!1);
    this.TGe = i;
  }
  Tick(t) {
    super.Tick(t), this.Rdt?.Tick(t);
  }
  OnBeforeDestroy() {
    this.Ddt.OnBeforeDestroy(), super.OnBeforeDestroy();
  }
}
exports.SpecialEnergyBarBuLanTe = SpecialEnergyBarBuLanTe;
//# sourceMappingURL=SpecialEnergyBarBuLanTe.js.map
