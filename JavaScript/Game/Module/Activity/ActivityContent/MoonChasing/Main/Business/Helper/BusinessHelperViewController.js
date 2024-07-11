"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessHelperViewController = void 0);
const UiManager_1 = require("../../../../../../../Ui/UiManager"),
  HelpController_1 = require("../../../../../../Help/HelpController"),
  MoonChasingController_1 = require("../../MoonChasingController"),
  INTERACTIVE_HELPID = 106,
  HELP_HELPID = 105;
class BusinessHelperViewController {
  constructor() {
    (this.Yzt = void 0),
      (this.Aaa = !1),
      (this.SelectedRoleId = 0),
      (this.RefreshInteractivePanel = () => {
        this.Aaa && this.Yzt.RefreshInteractivePanel();
      }),
      (this.BackToLastState = () => {
        this.Aaa ? this.SkipToHelpPanel() : this.Yzt.CloseMe();
      }),
      (this.OpenHelpView = () => {
        this.Aaa
          ? HelpController_1.HelpController.OpenHelpById(INTERACTIVE_HELPID)
          : HelpController_1.HelpController.OpenHelpById(HELP_HELPID);
      });
  }
  RegisterView(i) {
    this.Yzt = i;
  }
  Show() {
    this.Yzt.ShowView(this.Aaa);
  }
  async RefreshSpine(i) {
    (this.SelectedRoleId = i), await this.Yzt.RefreshSpine(i);
  }
  SkipToHelpPanel() {
    (this.Aaa = !1), this.Yzt.SkipToHelpPanel();
  }
  SkipToInteractivePanel() {
    (this.Aaa = !0), this.Yzt.SkipToInteractivePanel();
  }
  SkipToTaskView(i, e) {
    MoonChasingController_1.MoonChasingController.OpenTaskView(i, e);
  }
  SkipToBuildingView(i) {
    MoonChasingController_1.MoonChasingController.OpenBuildingTipsInfoView(i);
  }
  SkipToBuildingPreview() {
    var i = UiManager_1.UiManager.GetViewByName("MoonChasingMainView");
    void 0 !== i &&
      ((i.OpenParam.SkipTarget = 2),
      UiManager_1.UiManager.NormalResetToView("MoonChasingMainView"));
  }
}
exports.BusinessHelperViewController = BusinessHelperViewController;
//# sourceMappingURL=BusinessHelperViewController.js.map
