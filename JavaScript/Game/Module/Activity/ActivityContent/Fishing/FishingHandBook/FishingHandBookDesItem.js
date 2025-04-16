"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingHandBookDesItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class FishingHandBookDesItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  Refresh(t, i, e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.DesText),
      this.GetText(1).SetText(t.DataText),
      this.GetItem(2).SetUIActive(t.IsGolden ?? !1),
      this.GetItem(3).SetUIActive(t.IsSliver ?? !1);
  }
}
exports.FishingHandBookDesItem = FishingHandBookDesItem;
//# sourceMappingURL=FishingHandBookDesItem.js.map
