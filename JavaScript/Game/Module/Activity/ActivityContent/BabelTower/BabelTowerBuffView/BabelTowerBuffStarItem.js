"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerStarItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class BabelTowerStarItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  SetText(e) {
    this.GetText(0).SetText(e);
  }
}
exports.BabelTowerStarItem = BabelTowerStarItem;
//# sourceMappingURL=BabelTowerBuffStarItem.js.map
