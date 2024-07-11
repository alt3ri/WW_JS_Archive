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
      (this.n_a = void 0),
      (this.l_a = void 0),
      (this.A_a = () => {
        var e = this.n_a.GachaId;
        ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e) ||
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
            "RecallActivity_Tips_01",
          ),
          ActivityRecallHelper_1.ActivityRecallHelper.ReportRecallLog1024(2),
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
    (this.l_a = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
      await this.l_a.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {
    this.l_a.FunctionButton?.BindCallback(this.A_a),
      this.l_a.FunctionButton.RefreshTextNew("RecallActivity_Go");
  }
  RefreshByData(e) {
    this.n_a = e;
  }
}
exports.ActivityRecallRoleActivityInfoPanel =
  ActivityRecallRoleActivityInfoPanel;
//# sourceMappingURL=ActivityRecallRoleActivityInfoPanel.js.map
