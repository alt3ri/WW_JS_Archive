"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarSanHua = void 0);
const UE = require("ue"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarPointItem_1 = require("../SpecialEnergyBarPointItem"),
  POINT_NUM = 41,
  POINT_WIDTH = 9,
  TOTAL_WIDTH = 369,
  successTagId = 1598973985,
  buffTagId = 1278596622,
  buffId = BigInt(1102012003n);
class SpecialEnergyBarSanHua extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.edt = void 0),
      (this.tdt = !1),
      (this.idt = 0),
      (this.odt = 1),
      (this.rdt = 0),
      (this.ndt = (t) => {
        var s = this.GetUiNiagara(3);
        0 < t
          ? (s.SetAnchorOffsetX(TOTAL_WIDTH * (this.rdt - 0.5)),
            s.SetUIActive(!0))
          : s.SetUIActive(!1);
      }),
      (this.sdt = (t) => {
        this.adt(), this.RefreshBarPercent();
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
    var t = [];
    t.push(this.InitPointItem(this.GetItem(0))),
      t.push(this.InitKeyItem(this.GetItem(4))),
      await Promise.all(t);
  }
  async InitPointItem(t) {
    (this.edt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
      this.edt.InitPrefabInfo(POINT_NUM, POINT_WIDTH),
      await this.edt.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnStart() {
    var t;
    this.Config &&
      (this.Config.EffectColor &&
        ((t = new UE.LinearColor(UE.Color.FromHex(this.Config.EffectColor))),
        this.edt.SetFullEffectColor(t)),
      this.adt(),
      this.RefreshBarPercent(!0),
      this.GetUiNiagara(3).SetUIActive(!1),
      this.KeyItem?.RefreshKeyEnable(!0, !0));
  }
  adt() {
    var t = this.GetBuffCountByBuffId(buffId),
      s = this.AttributeComponent.GetCurrentValue(this.Config.MaxAttributeId);
    (this.idt = this.Config.ExtraFloatParams[2 * t] / s),
      (this.odt = this.Config.ExtraFloatParams[2 * t + 1] / s);
  }
  RefreshBarPercent(t = !1) {
    var s = this.PercentMachine.GetTargetPercent(),
      s =
        (0 < s && (this.rdt = s),
        this.edt.UpdateLeftRightPercent(this.idt, this.odt),
        this.GetItem(1).SetAnchorOffsetX(TOTAL_WIDTH * (s - 0.5)),
        s > this.idt && s <= this.odt);
    (!t && s === this.tdt) ||
      ((this.tdt = s), this.GetUiNiagara(2).SetUIActive(s));
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  Tick(t) {
    super.Tick(t), this.edt?.Tick(t);
  }
  AddEvents() {
    super.AddEvents(),
      this.ListenForTagCountChanged(successTagId, this.ndt),
      this.ListenForTagCountChanged(buffTagId, this.sdt);
  }
  RemoveEvents() {
    super.RemoveEvents();
  }
}
exports.SpecialEnergyBarSanHua = SpecialEnergyBarSanHua;
//# sourceMappingURL=SpecialEnergyBarSanHua.js.map
