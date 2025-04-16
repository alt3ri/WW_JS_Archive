"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupComponentRecommendTip = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../..//Util/LguiUtil");
class PopupComponentRecommendTip extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
    ];
  }
  SetTextChangeColor(e) {
    this.GetSprite(1).SetChangeColor(e, this.GetSprite(1).changeColor);
  }
  SetDescriptionByTextId(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, t);
  }
  SetDescriptionByText(e) {
    this.GetText(0).SetText(e);
  }
}
exports.PopupComponentRecommendTip = PopupComponentRecommendTip;
//# sourceMappingURL=PopupComponentRecommendTip.js.map
