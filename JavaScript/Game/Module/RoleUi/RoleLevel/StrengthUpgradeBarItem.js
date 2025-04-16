"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StrengthUpgradeBarItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class StrengthUpgradeBarItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.cco = void 0),
      (this.gii = new UE.Rotator(0, 0, 0));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.cco = []), this.cco.push(this.GetItem(1));
  }
  Update(t) {
    (this.Pe = t), this.Refresh();
  }
  Refresh() {
    var t, e, i;
    this.Pe &&
      ((t = this.Pe.SingleStrengthValue),
      (e = this.Pe.MaxSingleStrengthItemCount),
      (i = this.Pe.MaxStrength),
      (i = Math.min(Math.floor(i / t), e)),
      this.mco(i),
      this.GetSprite(0).SetFillAmount(1 / i));
  }
  mco(i) {
    if (this.cco) {
      var s = this.GetItem(1),
        r = s.GetParentAsUIItem();
      for (let t = this.cco.length; t < i; t++)
        this.cco.push(LguiUtil_1.LguiUtil.CopyItem(s, r));
      var h = 360 / i;
      let e = 0;
      for (let t = 0; t < i; t++) {
        var a = this.cco[t];
        (this.gii.Yaw = e), a.SetUIRelativeRotation(this.gii), (e += h);
      }
    }
  }
}
exports.StrengthUpgradeBarItem = StrengthUpgradeBarItem;
//# sourceMappingURL=StrengthUpgradeBarItem.js.map
