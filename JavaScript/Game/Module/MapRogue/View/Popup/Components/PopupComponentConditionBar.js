"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupComponentConditionBar = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class PopupComponentConditionBar extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ButtonCallBack = void 0),
      (this.IUn = () => {
        this.ButtonCallBack?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.IUn]]);
  }
  SetTextByTextId(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, e);
  }
  SetTextByText(t) {
    this.GetText(1).SetText(t);
  }
  GetIconSprite() {
    return this.GetSprite(0);
  }
  SetSpriteVisible(t) {
    this.GetSprite(0).SetUIActive(t);
  }
  SetButtonVisible(t) {
    this.GetButton(2).RootUIComp.SetUIActive(t);
  }
}
exports.PopupComponentConditionBar = PopupComponentConditionBar;
//# sourceMappingURL=PopupComponentConditionBar.js.map
