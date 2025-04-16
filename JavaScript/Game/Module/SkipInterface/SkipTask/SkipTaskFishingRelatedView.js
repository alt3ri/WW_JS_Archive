"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskFishingRelatedView = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  SkipTask_1 = require("./SkipTask"),
  DEFAULT_PORT_ID = 1;
class SkipTaskFishingRelatedView extends SkipTask_1.SkipTask {
  constructor() {
    super(...arguments),
      (this.Y9t = () => {
        this.lY_("FishingQuestView") ||
          UiManager_1.UiManager.OpenView("FishingQuestView");
      }),
      (this.JO_ = () => {
        this.lY_("FishingHandBookView") ||
          UiManager_1.UiManager.OpenView("FishingHandBookView");
      }),
      (this.eG_ = () => {
        this.lY_("DockyardView") ||
          ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardView();
      }),
      (this.tG_ = () => {
        this.lY_("DockyardShopMainView") ||
          ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardShopView(
            1,
          );
      }),
      (this.iG_ = () => {
        this.lY_("DockyardShopMainView") ||
          ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardShopView(
            0,
          );
      });
  }
  OnRun(e, i, a) {
    switch (Number(e)) {
      case 1:
        this.rG_(this.Y9t);
        break;
      case 2:
        this.rG_(this.JO_);
        break;
      case 3:
        this.oG_(() => {
          var e;
          this.lY_("FishingTechRootView") ||
            ((e = { Type: Number(i), NodeId: Number(a) }),
            UiManager_1.UiManager.OpenView("FishingTechRootView", e));
        });
        break;
      case 4:
        this.rG_(this.eG_);
        break;
      case 5:
        this.oG_(this.tG_);
        break;
      case 6:
        this.oG_(this.iG_);
    }
    this.Finish();
  }
  CheckMainViewOpen() {
    return void 0 !== UiManager_1.UiManager.GetViewByName("FishingDockView");
  }
  CheckIsInSailing() {
    return (
      ModelManager_1.ModelManager.FishingModel.GetShipData()?.IsShipDriving() ??
      !1
    );
  }
  SkipToMap() {
    let e =
      ModelManager_1.ModelManager.FishingModel.GetShipData().GetLastPortId();
    e <= 0 && (e = DEFAULT_PORT_ID);
    var i = {
      MarkId:
        ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(e)
          .MarkId,
      MarkType: 34,
    };
    ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, !1, i);
  }
  oG_(e) {
    this.CheckMainViewOpen() ? e() : this.SkipToMap();
  }
  rG_(e) {
    this.CheckMainViewOpen() || this.CheckIsInSailing()
      ? e()
      : this.SkipToMap();
  }
  lY_(e) {
    return (
      !!UiManager_1.UiManager.IsViewOpen(e) ||
      (void 0 !== UiManager_1.UiManager.GetViewByName(e) &&
        (UiManager_1.UiManager.NormalResetToView(e), !0))
    );
  }
}
exports.SkipTaskFishingRelatedView = SkipTaskFishingRelatedView;
//# sourceMappingURL=SkipTaskFishingRelatedView.js.map
