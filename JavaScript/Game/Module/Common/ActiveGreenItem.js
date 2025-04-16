"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActiveGreenItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class ActiveGreenItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
    ];
  }
  SetText(e) {
    this.GetText(1)?.SetText(e);
  }
}
exports.ActiveGreenItem = ActiveGreenItem;
//# sourceMappingURL=ActiveGreenItem.js.map
