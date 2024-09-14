"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTipsActivateTipPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  HelpController_1 = require("../../../Help/HelpController"),
  HELP_ID = 119;
class MapTipsActivateTipPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.mji = () => {
        HelpController_1.HelpController.OpenHelpById(HELP_ID);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.mji]]);
  }
}
exports.MapTipsActivateTipPanel = MapTipsActivateTipPanel;
//# sourceMappingURL=MapTipsActivateTipPanel.js.map
