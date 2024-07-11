"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScrollSwitchComponent = void 0);
const UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent"),
  THRESHOLD = 0.6;
class ScrollSwitchComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments), (this.xbo = !1);
  }
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.FindScrollbar(!0);
  }
  OnInputAxis(e, t) {
    this.xbo
      ? 0 === t && (this.xbo = !1)
      : Math.abs(t) <= THRESHOLD ||
        (UiNavigationNewController_1.UiNavigationNewController.FindScrollbar(
          t < 0,
        ),
        (this.xbo = !0));
  }
  OnRefreshSelfHotKeyState(e) {
    e = e.GetScrollbarData();
    this.SetVisibleMode(2, e.HasActiveScrollbarList());
  }
}
exports.ScrollSwitchComponent = ScrollSwitchComponent;
//# sourceMappingURL=ScrollSwitchComponent.js.map
