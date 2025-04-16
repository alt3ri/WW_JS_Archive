"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTipsActivateTipPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  HelpController_1 = require("../../../Help/HelpController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
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
  OnStart() {
    this.SetDistanceTips();
  }
  SetHideTip(e) {
    void 0 !== e
      ? this.GetText(1).SetText(e)
      : this.SetActivatedTip("PlayPointClearDesc_Text"),
      this.GetButton(2).RootUIComp.SetUIActive(!1);
  }
  SetDistanceTips() {
    this.SetActivatedTip("QuickTravelOverDistance_Text"),
      this.GetButton(2).RootUIComp.SetUIActive(!0);
  }
  SetActivatedTip(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
}
exports.MapTipsActivateTipPanel = MapTipsActivateTipPanel;
//# sourceMappingURL=MapTipsActivateTipPanel.js.map
