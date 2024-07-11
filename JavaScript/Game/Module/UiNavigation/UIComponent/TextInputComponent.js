"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TextInputComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class TextInputComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.ActiveTextInput(
      e.BindButtonTag,
    );
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = e.GetActiveListenerByTag(t)),
      this.SetVisibleMode(2, e?.IsListenerActive() ?? !1));
  }
}
exports.TextInputComponent = TextInputComponent;
//# sourceMappingURL=TextInputComponent.js.map
