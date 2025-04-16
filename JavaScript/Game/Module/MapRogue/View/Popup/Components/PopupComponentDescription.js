"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupComponentDescription = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class PopupComponentDescription extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText]];
  }
  SetDescriptionByTextId(e, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, i);
  }
  SetDescriptionByText(e) {
    this.GetText(1).SetText(e);
  }
  SetDescriptionVisible(e) {
    this.GetText(1).SetUIActive(e);
  }
}
exports.PopupComponentDescription = PopupComponentDescription;
//# sourceMappingURL=PopupComponentDescription.js.map
