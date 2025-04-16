"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyResultRoundItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class DangoMonopolyResultRoundItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.ClickCallBack = void 0),
      (this.kqe = (t) => {
        1 === t &&
          this.ScrollViewDelegate?.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !1,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  Refresh(t, s) {
    (this.fGt = t),
      this.GetText(1)?.SetText(this.fGt.GetPosition().toString()),
      this.GetSelfToggle()?.SetToggleState(s ? 1 : 0);
  }
  OnSelected() {
    this.GetSelfToggle()?.SetToggleState(1), this.ClickCallBack?.(this.fGt);
  }
  OnDeselected(t) {
    this.GetSelfToggle()?.SetToggleState(0);
  }
  GetSelfToggle() {
    return this.GetExtendToggle(0);
  }
}
exports.DangoMonopolyResultRoundItem = DangoMonopolyResultRoundItem;
//# sourceMappingURL=DangoMonopolyResultRoundItem.js.map
