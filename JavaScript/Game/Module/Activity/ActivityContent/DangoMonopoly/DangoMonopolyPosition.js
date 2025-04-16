"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyPosition = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class DangoMonopolyPosition extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await this.CreateByResourceIdAsync("UiItem_ActivityMonopolySle", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  UpdatePosition(e, o = !0) {
    this.SetActive(o), this.GetRootItem().SetAnchorOffset(e);
  }
}
exports.DangoMonopolyPosition = DangoMonopolyPosition;
//# sourceMappingURL=DangoMonopolyPosition.js.map
