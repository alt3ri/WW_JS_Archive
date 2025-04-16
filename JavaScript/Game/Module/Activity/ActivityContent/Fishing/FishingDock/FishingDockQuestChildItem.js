"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingDockQuestChildItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class FishingDockQuestChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetText(1).SetUIActive(!0);
  }
  Refresh(t, i, e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.DesText, t.MaxCount),
      this.GetText(1).SetText(
        "(" + Math.min(t.CurrentCount, t.MaxCount) + "/" + t.MaxCount + ")",
      ),
      this.GetItem(2).SetUIActive(t.CurrentCount >= t.MaxCount),
      (this.GetText(1).useChangeColor = t.CurrentCount >= t.MaxCount),
      (this.GetText(0).useChangeColor = t.CurrentCount >= t.MaxCount);
  }
}
exports.FishingDockQuestChildItem = FishingDockQuestChildItem;
//# sourceMappingURL=FishingDockQuestChildItem.js.map
