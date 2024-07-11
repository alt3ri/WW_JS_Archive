"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityDescriptionTypeA = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityDescriptionTypeA extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  SetContentByTextId(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, t);
  }
  SetContentByText(e) {
    this.GetText(0).SetText(e);
  }
  SetContentVisible(e) {
    this.GetText(0).SetUIActive(e);
  }
}
exports.ActivityDescriptionTypeA = ActivityDescriptionTypeA;
//# sourceMappingURL=ActivityDescriptionTypeA.js.map
