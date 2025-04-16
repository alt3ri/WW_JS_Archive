"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsOddsItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RacingBetsOddsItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Svc = 0), (this._o1 = 0), (this.E01 = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText],
      [1, UE.UIArtText],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnBeforeShow() {
    this.RefreshUi(this.Svc, this._o1, this.E01);
  }
  RefreshUi(s, e, t) {
    (this.Svc = s),
      (this._o1 = e),
      (this.E01 = t),
      this.IsShowOrShowing &&
        (this.GetArtText(0).SetText(s.toString()),
        this.GetArtText(1).SetText(e.toString()),
        this.GetItem(2).SetUIActive(0 < e),
        this.GetItem(3).SetUIActive(t));
  }
  SetItemOffset(s) {
    this.RootItem?.SetAnchorOffset(s);
  }
  SetVisible(s) {
    this.SetActive(s);
  }
}
exports.RacingBetsOddsItem = RacingBetsOddsItem;
//# sourceMappingURL=RacingBetsOddsItem.js.map
