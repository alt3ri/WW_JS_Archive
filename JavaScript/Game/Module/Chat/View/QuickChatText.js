"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuickChatText = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class QuickChatText extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.yyt = ""),
      (this.jYe = void 0),
      (this.Iyt = () => {
        this.jYe && this.jYe(this.yyt);
      }),
      this.CreateThenShowByActor(e);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.Iyt]]);
  }
  OnBeforeDestroy() {
    this.jYe = void 0;
  }
  Refresh(e) {
    this.GetText(0).SetText(e), (this.yyt = e);
  }
  BindOnClicked(e) {
    this.jYe = e;
  }
}
exports.QuickChatText = QuickChatText;
//# sourceMappingURL=QuickChatText.js.map
