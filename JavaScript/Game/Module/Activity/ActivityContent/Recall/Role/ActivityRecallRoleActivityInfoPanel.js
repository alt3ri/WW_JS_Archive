"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallRoleActivityInfoPanel = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityRecallHelper_1 = require("../Misc/ActivityRecallHelper");
class ActivityRecallRoleActivityInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.gda = void 0),
      (this.Mda = void 0),
      (this.Gda = () => {
        var i = this.gda.GachaId;
        ModelManager_1.ModelManager.GachaModel.GetGachaInfo(i) ||
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
            "RecallActivity_Tips_01",
          ),
          ActivityRecallHelper_1.ActivityRecallHelper.ReportRecallLog1024(2),
          UiManager_1.UiManager.OpenView("GachaMainView", i);
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
    var i = this.GetItem(3);
    (this.Mda = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(void 0)),
      await this.Mda.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    this.Mda.FunctionButton.SetFunction(this.Gda),
      this.Mda.FunctionButton.SetLocalTextNew("RecallActivity_Go");
  }
  RefreshByData(i) {
    this.gda = i;
  }
}
exports.ActivityRecallRoleActivityInfoPanel =
  ActivityRecallRoleActivityInfoPanel;
//# sourceMappingURL=ActivityRecallRoleActivityInfoPanel.js.map
