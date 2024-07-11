"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardTargetTabItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract");
class RewardTargetTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fla = void 0),
      (this.pla = -1),
      (this.vla = () => {
        this.fla?.ClickedCallback?.(this.pla);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.vla]]);
  }
  SetToggleState(t, e) {
    t = t ? 1 : 0;
    this.GetExtendToggle(1).SetToggleState(t, e);
  }
  Mla(t) {
    this.GetItem(2).SetUIActive(t);
  }
  RefreshRedDot() {
    var t = this.fla?.RefreshRedDot?.(this.pla + 1) ?? !1;
    this.Mla(t);
  }
  Refresh(t, e, s) {
    (this.fla = t),
      (this.pla = t.Index),
      t.NameTextId && this.GetText(0)?.ShowTextNew(t.NameTextId),
      this.RefreshRedDot();
  }
}
exports.RewardTargetTabItem = RewardTargetTabItem;
//# sourceMappingURL=RewardTargetTabItem.js.map
