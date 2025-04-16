"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BagFullTip = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BagFullTip extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  SetAdjustPanelVisible(e) {
    this.GetItem(0).SetUIActive(e);
  }
}
exports.BagFullTip = BagFullTip;
//# sourceMappingURL=BagFullTip.js.map
