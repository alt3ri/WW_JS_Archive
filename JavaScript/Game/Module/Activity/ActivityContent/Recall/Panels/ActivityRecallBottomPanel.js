"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallBottomPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
class ActivityRecallBottomPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Zqe = void 0),
      (this.p4e = void 0),
      (this.tWt = () => {
        this.Zqe?.();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    var t = this.GetItem(2);
    (this.p4e = new ButtonItem_1.ButtonItem(t)), this.p4e.SetFunction(this.tWt);
  }
  OnBeforeShow() {
    this.p4e.BindRedDot("ActivityRecallTask");
  }
  OnAfterHide() {
    this.p4e.UnBindRedDot();
  }
  BindCallback(t) {
    this.Zqe = t;
  }
  UnBindCallBack() {
    this.Zqe = void 0;
  }
}
exports.ActivityRecallBottomPanel = ActivityRecallBottomPanel;
//# sourceMappingURL=ActivityRecallBottomPanel.js.map
