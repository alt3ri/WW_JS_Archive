"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Spring25SharePanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class Spring25SharePanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
    ];
  }
  OnStart() {
    var e = this.OpenParam;
    this.GetText(2)?.SetUIActive(!1),
      this.GetText(1)?.SetUIActive(!1),
      this.GetText(3)?.SetUIActive(!1),
      this.GetItem(4)?.SetUIActive(!1),
      this.SetTextureByPath(e.PhotoPath, this.GetTexture(0));
  }
}
exports.Spring25SharePanel = Spring25SharePanel;
//# sourceMappingURL=Spring25SharePanel.js.map
