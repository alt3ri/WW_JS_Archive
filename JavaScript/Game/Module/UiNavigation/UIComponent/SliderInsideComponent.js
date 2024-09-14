"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SettingSliderReduceInsideComponent =
    exports.SettingSliderIncreaseInsideComponent =
    exports.SliderReduceInsideComponent =
    exports.SliderIncreaseInsideComponent =
    exports.SliderInsideComponent =
      void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  SliderComponent_1 = require("./SliderComponent"),
  INTERVAL = 0.05;
class SliderInsideComponent extends SliderComponent_1.SliderComponent {
  SetValue(e) {
    UiNavigationNewController_1.UiNavigationNewController.SliderInsideComponentSetValue(
      this.GetBindButtonTag(),
      e,
    );
  }
  OnRefreshSelfHotKeyState(e) {
    var n = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(n) ||
      ((e = e.GetFocusListener()) &&
      (e =
        UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(
          e,
          n,
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
  OnInputAxis(e, n) {
    n <= 0 || this.SetValue(n * INTERVAL);
  }
}
exports.SliderIncreaseInsideComponent = SliderIncreaseInsideComponent;
class SliderReduceInsideComponent extends SliderInsideComponent {
  OnRelease(e) {
    this.SetValue(-INTERVAL);
  }
  OnInputAxis(e, n) {
    0 <= n || this.SetValue(n * INTERVAL);
  }
}
exports.SliderReduceInsideComponent = SliderReduceInsideComponent;
const DEAD_AREA = 0.073,
  SETTING_INTERVAL = 0.01;
class SettingSliderIncreaseInsideComponent extends SliderIncreaseInsideComponent {
  OnInputAxis(e, n) {
    n <= DEAD_AREA || this.SetValue(n * SETTING_INTERVAL);
  }
}
exports.SettingSliderIncreaseInsideComponent =
  SettingSliderIncreaseInsideComponent;
class SettingSliderReduceInsideComponent extends SliderReduceInsideComponent {
  OnInputAxis(e, n) {
    n >= -DEAD_AREA || this.SetValue(n * SETTING_INTERVAL);
  }
}
exports.SettingSliderReduceInsideComponent = SettingSliderReduceInsideComponent;
//# sourceMappingURL=SliderInsideComponent.js.map
