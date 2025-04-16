"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressCaptionNameListPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ActivityRegressCaptionPanel_1 = require("./ActivityRegressCaptionPanel");
class ActivityRegressCaptionNameListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Kda = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.Kda = new ActivityRegressCaptionPanel_1.ActivityRecallCaptionPanel();
    var e = this.GetItem(0).GetOwner();
    await this.Kda.CreateThenShowByActorAsync(e);
  }
  OnAfterShow() {}
  RefreshData(e) {}
}
exports.ActivityRegressCaptionNameListPanel =
  ActivityRegressCaptionNameListPanel;
//# sourceMappingURL=ActivityRegressCaptionNameListPanel.js.map
