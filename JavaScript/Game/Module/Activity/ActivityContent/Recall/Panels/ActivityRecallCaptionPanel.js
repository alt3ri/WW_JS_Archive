"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallCaptionPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityRecallCaptionPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.B6e = () => {
        UiManager_1.UiManager.CloseView("ActivityRecallMainView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.B6e]]);
  }
  RefreshData(e) {
    var i = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.Title);
  }
}
exports.ActivityRecallCaptionPanel = ActivityRecallCaptionPanel;
//# sourceMappingURL=ActivityRecallCaptionPanel.js.map
