"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityQuestTipsItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityQuestTipsItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Gke = void 0),
      (this.ije = () => {
        this.Gke?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.ije]]);
  }
  SetContentByTextId(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t, e);
  }
  SetContentByText(t) {
    this.GetText(0).SetText(t);
  }
  SetContentVisible(t) {
    this.GetText(0).SetUIActive(t);
  }
  SetRewardButtonVisible(t) {
    this.GetItem(1).SetUIActive(t);
  }
  SetRewardButtonFunction(t) {
    this.Gke = t;
  }
}
exports.ActivityQuestTipsItem = ActivityQuestTipsItem;
//# sourceMappingURL=ActivityQuestTipsItem.js.map
