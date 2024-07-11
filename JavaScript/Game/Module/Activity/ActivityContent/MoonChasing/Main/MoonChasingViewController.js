"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingViewController = void 0);
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  HelpController_1 = require("../../../../Help/HelpController"),
  MAINVIEW_HELPID = 107,
  BUILDVIEW_HELPID = 102;
class MoonChasingViewController {
  constructor() {
    (this.Yzt = void 0),
      (this.jio = void 0),
      (this.SkipToBusiness = () => {
        ModelManager_1.ModelManager.MoonChasingModel.RemoveDelegationRedDot(),
          ControllerHolder_1.ControllerHolder.MoonChasingController.OpenBusinessMainView();
      }),
      (this.SkipToReward = () => {
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenRewardView();
      }),
      (this.SkipToBuild = () => {
        (this.jio.IsInBuildingModule = !0), this.Yzt.SkipToBuild();
      }),
      (this.SkipToTask = () => {
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenTaskView();
      }),
      (this.SkipToHandbook = () => {
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenHandbookView();
      }),
      (this.CloseSelf = () => {
        this.jio.IsInBuildingModule
          ? this.BuildingBackToMainView()
          : this.Yzt.CloseMe();
      }),
      (this.OpenHelpView = () => {
        this.jio.IsInBuildingModule
          ? HelpController_1.HelpController.OpenHelpById(BUILDVIEW_HELPID)
          : HelpController_1.HelpController.OpenHelpById(MAINVIEW_HELPID);
      });
  }
  RegisterView(t) {
    (this.Yzt = t), (this.jio = t.OpenParam);
  }
  Z7s() {
    2 === this.jio.SkipTarget
      ? this.SkipToBuild()
      : 1 === this.jio.SkipTarget
        ? this.SkipToBusiness()
        : 3 === this.jio.SkipTarget && this.SkipToTask(),
      (this.jio.SkipTarget = 0);
  }
  eHs() {
    0 < this.jio.RefreshBuildingId &&
      (this.Yzt.RefreshMainModule(this.jio.RefreshBuildingId),
      (this.jio.RefreshBuildingId = 0));
  }
  Show() {
    this.Z7s(),
      this.eHs(),
      this.B0a(),
      this.Yzt.RefreshBuildingModule(),
      this.Yzt.RefreshRedDot();
  }
  BuildingBackToMainView() {
    this.Yzt.RefreshRedDot(),
      (this.jio.IsInBuildingModule = !1),
      this.Yzt.BuildingBackToMainView(),
      this.jio.BuildingBackToBusiness &&
        ((this.jio.BuildingBackToBusiness = !1), this.SkipToBusiness());
  }
  B0a() {
    ModelManager_1.ModelManager.MoonChasingModel.HasEnteredMainViewFlag
      ? (this.Yzt.UiViewSequence.StartSequenceName = "Start")
      : ((this.Yzt.UiViewSequence.StartSequenceName = "Start01"),
        (ModelManager_1.ModelManager.MoonChasingModel.HasEnteredMainViewFlag =
          !0));
  }
}
exports.MoonChasingViewController = MoonChasingViewController;
//# sourceMappingURL=MoonChasingViewController.js.map
