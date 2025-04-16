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
  buffId = 1102012003;
class SpecialEnergyBarSanHua extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.edt = void 0),
      (this.tdt = !1),
      (this.idt = 0),
      (this.odt = 1),
      (this.rdt = 0),
      (this.ndt = (s) => {
        var t = this.GetUiNiagara(3);
        0 < s
          ? (t.SetAnchorOffsetX(TOTAL_WIDTH * (this.rdt - 0.5)),
            t.SetUIActive(!0))
          : t.SetUIActive(!1);
      }),
      (this.sdt = (s) => {
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
    var s = [];
    s.push(this.InitPointItem(this.GetItem(0))),
      s.push(this.InitKeyItem(this.GetItem(4))),
      await Promise.all(s);
  }
  async InitPointItem(s) {
    (this.edt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
      this.edt.InitPrefabInfo(POINT_NUM, POINT_WIDTH),
      await this.edt.CreateThenShowByActorAsync(s.GetOwner());
  }
  OnStart() {
    var s;
    this.Config &&
      (this.Config.EffectColor &&
        ((s = new UE.LinearColor(UE.Color.FromHex(this.Config.EffectColor))),
        this.edt.SetFullEffectColor(s)),
      this.adt(),
      this.RefreshBarPercent(!0),
      this.GetUiNiagara(3).SetUIActive(!1),
      this.KeyItem?.RefreshKeyEnable(!0, !0));
  }
  adt() {
    var s = this.GetBuffCountByBuffId(buffId),
      t = this.AttributeComponent.GetCurrentValue(this.Config.MaxAttributeId);
    (this.idt = this.Config.ExtraFloatParams[2 * s] / t),
      (this.odt = this.Config.ExtraFloatParams[2 * s + 1] / t);
  }
  RefreshBarPercent(s = !1) {
    var t = this.PercentMachine.GetTargetPercent(),
      t =
        (0 < t && (this.rdt = t),
        this.edt.UpdateLeftRightPercent(this.idt, this.odt),
        this.GetItem(1).SetAnchorOffsetX(TOTAL_WIDTH * (t - 0.5)),
        t > this.idt && t <= this.odt);
    (!s && t === this.tdt) ||
      ((this.tdt = t), this.GetUiNiagara(2).SetUIActive(t));
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  Tick(s) {
    super.Tick(s), this.edt?.Tick(s);
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
