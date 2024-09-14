"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallCaptionNameListPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ActivityRecallCaptionPanel_1 = require("./ActivityRecallCaptionPanel");
class ActivityRecallCaptionNameListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.xda = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.xda = new ActivityRecallCaptionPanel_1.ActivityRecallCaptionPanel();
    var e = this.GetItem(0).GetOwner();
    await this.xda.CreateThenShowByActorAsync(e);
  }
  OnAfterShow() {}
  RefreshData(e) {}
}
exports.ActivityRecallCaptionNameListPanel = ActivityRecallCaptionNameListPanel;
//# sourceMappingURL=ActivityRecallCaptionNameListPanel.js.map
