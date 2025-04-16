"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupCaptionStateItem = void 0);
const UE = require("ue"),
  LguiUtil_1 = require("../../Module/Util/LguiUtil"),
  UiPanelBase_1 = require("../Base/UiPanelBase");
class PopupCaptionStateItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ig1 = void 0),
      (this.rg1 = void 0),
      (this.OnClickCallBack = () => {}),
      (this.YP = () => {
        this.OnClickCallBack();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.YP]]);
  }
  OnStart() {
    (this.ig1 = this.GetSprite(1).GetColor()),
      (this.rg1 = UE.Color.FromHex("FFCC7B"));
  }
  BindClick(t) {
    this.OnClickCallBack = t;
  }
  SetTipsLocalText(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t);
  }
  SetCaptionChangeColor(t) {
    t = t ? this.rg1 : this.ig1;
    this.GetSprite(1).SetColor(t), this.GetText(2).SetColor(t);
  }
}
exports.PopupCaptionStateItem = PopupCaptionStateItem;
//# sourceMappingURL=PopupCaptionStateItem.js.map
