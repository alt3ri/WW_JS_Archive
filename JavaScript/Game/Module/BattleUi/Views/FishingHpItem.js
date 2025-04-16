"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingHpItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FishingHpItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
    ];
  }
  SetHpVisible(e) {
    this.GetSprite(0)?.SetUIActive(e);
  }
}
exports.FishingHpItem = FishingHpItem;
//# sourceMappingURL=FishingHpItem.js.map
