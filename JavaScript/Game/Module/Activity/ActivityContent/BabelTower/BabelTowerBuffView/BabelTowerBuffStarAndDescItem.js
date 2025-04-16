"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerBuffStarAndDescItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class BabelTowerBuffStarAndDescItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  Refresh(e, s, t) {
    this.GetText(0).SetUIActive(s),
      s && this.GetText(0).SetText(e),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
  }
}
exports.BabelTowerBuffStarAndDescItem = BabelTowerBuffStarAndDescItem;
//# sourceMappingURL=BabelTowerBuffStarAndDescItem.js.map
