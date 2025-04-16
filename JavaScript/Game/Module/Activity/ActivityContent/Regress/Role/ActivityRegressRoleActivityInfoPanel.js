"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressRoleActivityInfoPanel = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class ActivityRegressRoleActivityInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Lo = void 0),
      (this.Bda = void 0),
      (this.ema = () => {
        var e = this.Lo.GachaId;
        ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e) ||
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
            "RecallActivity_Tips_01",
          ),
          ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1024(2),
          UiManager_1.UiManager.OpenView("GachaMainView", e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.GetItem(0).SetUIActive(!1), this.GetItem(1).SetUIActive(!1);
    this.GetItem(2).SetUIActive(!1);
    var e = this.GetItem(3);
    (this.Bda = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(void 0)),
      await this.Bda.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {
    this.Bda.FunctionButton.SetFunction(this.ema),
      this.Bda.FunctionButton.SetLocalTextNew("RecallActivity_Go");
  }
  RefreshData(e) {
    this.Lo = e;
  }
}
exports.ActivityRegressRoleActivityInfoPanel =
  ActivityRegressRoleActivityInfoPanel;
//# sourceMappingURL=ActivityRegressRoleActivityInfoPanel.js.map
