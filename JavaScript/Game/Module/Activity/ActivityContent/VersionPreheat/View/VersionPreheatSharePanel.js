"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VersionPreheatSharePanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class VersionPreheatSharePanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    var e = this.OpenParam;
    this.GetText(2)?.SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.NameTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.ThemeTextId),
      this.SetTextureByPath(e.PhotoPath, this.GetTexture(0));
  }
}
exports.VersionPreheatSharePanel = VersionPreheatSharePanel;
//# sourceMappingURL=VersionPreheatSharePanel.js.map
