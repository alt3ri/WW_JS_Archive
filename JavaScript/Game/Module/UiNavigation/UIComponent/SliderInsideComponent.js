"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SliderReduceInsideComponent =
    exports.SliderIncreaseInsideComponent =
    exports.SliderInsideComponent =
      void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const SliderComponent_1 = require("./SliderComponent");
const INTERVAL = 0.05;
class SliderInsideComponent extends SliderComponent_1.SliderComponent {
  SetValue(e) {
    UiNavigationNewController_1.UiNavigationNewController.SliderInsideComponentSetValue(
      this.GetBindButtonTag(),
      e,
    );
  }
  OnRefreshSelfHotKeyState(e) {
    const t = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = e.GetFocusListener()) &&
      (e =
        UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(
          e,
          t,
        ))
        ? this.SetVisibleMode(2, e.IsListenerActive())
        : this.SetVisibleMode(2, !1));
  }
}
class SliderIncreaseInsideComponent extends (exports.SliderInsideComponent =
  SliderInsideComponent) {
  OnRelease(e) {
    this.SetValue(INTERVAL);
  }
  OnInputAxis(e, t) {
    t <= 0 || this.SetValue(t * INTERVAL);
  }
}
exports.SliderIncreaseInsideComponent = SliderIncreaseInsideComponent;
class SliderReduceInsideComponent extends SliderInsideComponent {
  OnRelease(e) {
    this.SetValue(-INTERVAL);
  }
  OnInputAxis(e, t) {
    t >= 0 || this.SetValue(t * INTERVAL);
  }
}
exports.SliderReduceInsideComponent = SliderReduceInsideComponent;
// # sourceMappingURL=SliderInsideComponent.js.map
