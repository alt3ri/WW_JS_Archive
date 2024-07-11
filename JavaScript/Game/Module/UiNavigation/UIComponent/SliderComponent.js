"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SliderReduceReverseComponent =
    exports.SliderIncreaseReverseComponent =
    exports.SliderReduceComponent =
    exports.SliderIncreaseComponent =
    exports.SliderComponent =
      void 0);
const UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent"),
  INTERVAL = 0.05;
class SliderComponent extends HotKeyComponent_1.HotKeyComponent {
  SetValue(e) {
    UiNavigationNewController_1.UiNavigationNewController.SliderComponentSetValue(
      this.GetBindButtonTag(),
      e,
    );
  }
}
class SliderIncreaseComponent extends (exports.SliderComponent =
  SliderComponent) {
  OnRelease(e) {
    this.SetValue(INTERVAL);
  }
  OnInputAxis(e, n) {
    n <= 0 || this.SetValue(n * INTERVAL);
  }
}
exports.SliderIncreaseComponent = SliderIncreaseComponent;
class SliderReduceComponent extends SliderComponent {
  OnRelease(e) {
    this.SetValue(-INTERVAL);
  }
  OnInputAxis(e, n) {
    0 <= n || this.SetValue(n * INTERVAL);
  }
}
exports.SliderReduceComponent = SliderReduceComponent;
class SliderIncreaseReverseComponent extends SliderComponent {
  OnRelease(e) {
    this.SetValue(INTERVAL);
  }
  OnInputAxis(e, n) {
    0 <= n || this.SetValue(-n * INTERVAL);
  }
}
exports.SliderIncreaseReverseComponent = SliderIncreaseReverseComponent;
class SliderReduceReverseComponent extends SliderComponent {
  OnRelease(e) {
    this.SetValue(-INTERVAL);
  }
  OnInputAxis(e, n) {
    n <= 0 || this.SetValue(-n * INTERVAL);
  }
}
exports.SliderReduceReverseComponent = SliderReduceReverseComponent;
//# sourceMappingURL=SliderComponent.js.map
