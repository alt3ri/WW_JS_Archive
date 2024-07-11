"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StrengthUpgradeBarItem = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
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
      ((t = CommonParamById_1.configCommonParamById.GetIntConfig(
        "SingleStrengthValue",
      )),
      (e = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MaxSingleStrengthItemCount",
      )),
      (i = this.Pe.MaxStrength),
      (i = Math.min(Math.floor(i / t), e)),
      this.mco(i),
      this.GetSprite(0).SetFillAmount(1 / i));
  }
  mco(i) {
    if (this.cco) {
      var r = this.GetItem(1),
        s = r.GetParentAsUIItem();
      for (let t = this.cco.length; t < i; t++)
        this.cco.push(LguiUtil_1.LguiUtil.CopyItem(r, s));
      var a = 360 / i;
      let e = 0;
      for (let t = 0; t < i; t++) {
        var h = this.cco[t];
        (this.gii.Yaw = e), h.SetUIRelativeRotation(this.gii), (e += a);
      }
    }
  }
}
exports.StrengthUpgradeBarItem = StrengthUpgradeBarItem;
//# sourceMappingURL=StrengthUpgradeBarItem.js.map
