"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarSanHua = void 0);
const UE = require("ue");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarPointItem_1 = require("../SpecialEnergyBarPointItem");
const POINT_NUM = 41;
const POINT_WIDTH = 9;
const TOTAL_WIDTH = 369;
const successTagId = 1598973985;
const buffTagId = 1278596622;
const buffId = BigInt(1102012003n);
class SpecialEnergyBarSanHua extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.Vct = void 0),
      (this.Hct = !1),
      (this.jct = 0),
      (this.Wct = 1),
      (this.Kct = 0),
      (this.Qct = (t) => {
        const s = this.GetUiNiagara(3);
        t > 0
          ? (s.SetAnchorOffsetX(TOTAL_WIDTH * (this.Kct - 0.5)),
            s.SetUIActive(!0))
          : s.SetUIActive(!1);
      }),
      (this.Xct = (t) => {
        this.$ct(), this.RefreshBarPercent();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UINiagara],
      [3, UE.UINiagara],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    const t = [];
    t.push(this.InitPointItem(this.GetItem(0))),
      t.push(this.InitKeyItem(this.GetItem(4))),
      await Promise.all(t);
  }
  async InitPointItem(t) {
    (this.Vct = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
      this.Vct.InitPrefabInfo(POINT_NUM, POINT_WIDTH),
      await this.Vct.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnStart() {
    let t;
    this.Config &&
      (this.Config.EffectColor &&
        ((t = new UE.LinearColor(UE.Color.FromHex(this.Config.EffectColor))),
        this.Vct.SetFullEffectColor(t)),
      this.$ct(),
      this.RefreshBarPercent(!0),
      this.GetUiNiagara(3).SetUIActive(!1),
      this.KeyItem?.RefreshKeyEnable(!0, !0));
  }
  $ct() {
    const t = this.GetBuffCountByBuffId(buffId);
    const s = this.AttributeComponent.GetCurrentValue(
      this.Config.MaxAttributeId,
    );
    (this.jct = this.Config.ExtraFloatParams[2 * t] / s),
      (this.Wct = this.Config.ExtraFloatParams[2 * t + 1] / s);
  }
  RefreshBarPercent(t = !1) {
    var s = this.PercentMachine.GetTargetPercent();
    var s =
      (s > 0 && (this.Kct = s),
      this.Vct.UpdateLeftRightPercent(this.jct, this.Wct),
      this.GetItem(1).SetAnchorOffsetX(TOTAL_WIDTH * (s - 0.5)),
      s > this.jct && s <= this.Wct);
    (!t && s === this.Hct) ||
      ((this.Hct = s), this.GetUiNiagara(2).SetUIActive(s));
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  Tick(t) {
    super.Tick(t), this.Vct?.Tick(t);
  }
  AddEvents() {
    super.AddEvents(),
      this.ListenForTagCountChanged(successTagId, this.Qct),
      this.ListenForTagCountChanged(buffTagId, this.Xct);
  }
  RemoveEvents() {
    super.RemoveEvents();
  }
}
exports.SpecialEnergyBarSanHua = SpecialEnergyBarSanHua;
// # sourceMappingURL=SpecialEnergyBarSanHua.js.map
