"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopAccumulateItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class PayShopAccumulateItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
    ];
  }
  RefreshCurrencyTex(e) {
    const t = this.GetTexture(1);
    t.SetUIActive(!1),
      this.SetItemIcon(this.GetTexture(1), e, void 0, () => {
        t.SetUIActive(!0);
      });
  }
  RefreshTextById(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, t);
  }
}
exports.PayShopAccumulateItem = PayShopAccumulateItem;
//# sourceMappingURL=PayShopAccumulateItem.js.map
