"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoBroadcastItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  RacingBetsDefine_1 = require("../../RacingBetsDefine");
class RacingBetsDangoBroadcastItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Gg1 = 0),
      (this.Fg1 = 0),
      (this.Ng1 = !1),
      (this.ZPc = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
    ];
  }
  Init(e) {
    this.ZPc = e;
  }
  OnTick(e) {
    this.Ng1
      ? (this.Vg1(e),
        (this.Fg1 += e),
        this.Fg1 > this.Gg1 && ((this.Fg1 = 0), (this.Ng1 = !1)))
      : this.jg1();
  }
  Vg1(e) {
    var t = this.GetText(1);
    t.SetAnchorOffsetX(
      t.GetAnchorOffsetX() -
        e * RacingBetsDefine_1.RACING_BETS_DANGO_BROADCAST_MOVE_SPEED,
    );
  }
  jg1() {
    this.Ng1 = !0;
    var e = this.GetText(1),
      t = this.GetItem(0).Width;
    e.SetAnchorOffsetX(t),
      e.ShowTextNew(this.ZPc.GetDangoBroadcastText()),
      (this.Gg1 =
        (t + e.GetTextRenderSize().X) /
          RacingBetsDefine_1.RACING_BETS_DANGO_BROADCAST_MOVE_SPEED +
        RacingBetsDefine_1.RACING_BETS_DANGO_BROADCAST_INTERVAL);
  }
}
exports.RacingBetsDangoBroadcastItem = RacingBetsDangoBroadcastItem;
//# sourceMappingURL=RacingBetsDangoBroadcastItem.js.map
