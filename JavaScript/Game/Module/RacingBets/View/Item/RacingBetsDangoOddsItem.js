"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoOddsItem = void 0);
const UE = require("ue"),
  DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsDangoOddsItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.VPc = void 0),
      (this.jPc = void 0),
      (this.kqe = () => {
        this.jPc(this.VPc);
      }),
      (this.A5e = () => 1 !== this.GetExtendToggle(0)?.GetToggleState());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.A5e);
  }
  Refresh(t, s, e) {
    this.VPc = t;
    t = DangoManager_1.DangoManager.GetDangoData(this.VPc.DangoId);
    this.GetText(1).SetText((this.VPc.Odds / 100).toString()),
      this.SetTextureShowUntilLoaded(t.Icon, this.GetTexture(2)),
      this.HPc(s);
  }
  RefreshOddsDango(t) {
    this.GetItem(3).SetUIActive(t === this.VPc.DangoId);
  }
  OnSelected(t) {
    this.HPc(!0);
  }
  OnDeselected(t) {
    this.HPc(!1);
  }
  HPc(t) {
    this.GetExtendToggle(0).SetToggleStateForce(t ? 1 : 0);
  }
  BindClickGearItemCallBack(t) {
    this.jPc = t;
  }
}
exports.RacingBetsDangoOddsItem = RacingBetsDangoOddsItem;
//# sourceMappingURL=RacingBetsDangoOddsItem.js.map
