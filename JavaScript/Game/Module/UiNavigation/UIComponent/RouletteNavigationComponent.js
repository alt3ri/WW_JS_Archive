"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteNavigationComponent = void 0);
const UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class RouletteNavigationComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments), (this.Nxo = void 0), (this.Rqo = !1);
  }
  OnPress() {
    (this.Nxo =
      UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener()),
      (this.Rqo =
        UiNavigationNewController_1.UiNavigationNewController.Interact(!0));
  }
  OnRelease(e) {
    var o =
        UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener(),
      t = UiNavigationNewController_1.UiNavigationNewController.Interact(!1);
    this.Nxo === o &&
      this.Rqo &&
      t &&
      UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroup(
        5,
      );
  }
  OnRefreshSelfHotKeyState(e) {
    e = e.GetFocusListener();
    void 0 !== e && "Group1" === e.GroupName
      ? this.SetVisibleMode(2, !0)
      : this.SetVisibleMode(2, !1);
  }
}
exports.RouletteNavigationComponent = RouletteNavigationComponent;
//# sourceMappingURL=RouletteNavigationComponent.js.map
