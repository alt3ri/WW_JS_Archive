"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongPressInsideComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class LongPressInsideComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRelease(e) {
    UiNavigationNewController_1.UiNavigationNewController.SimulationPointUpInside(
      e.BindButtonTag,
    );
  }
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.SimulationPointDownInside(
      e.BindButtonTag,
    );
  }
  OnRefreshSelfHotKeyState(e) {
    const t = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = e.GetFocusListener())
        ? ((e = e.GetChildListenerByTag(t)),
          this.SetVisibleMode(2, e?.IsListenerActive() ?? !1))
        : this.SetVisibleMode(2, !1));
  }
}
exports.LongPressInsideComponent = LongPressInsideComponent;
// # sourceMappingURL=LongPressInsideComponent.js.map
