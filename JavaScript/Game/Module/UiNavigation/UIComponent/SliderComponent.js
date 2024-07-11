"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SliderReduceComponent =
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
  OnInputAxis(e, o) {
    o <= 0 || this.SetValue(o * INTERVAL);
  }
}
exports.SliderIncreaseComponent = SliderIncreaseComponent;
class SliderReduceComponent extends SliderComponent {
  OnRelease(e) {
    this.SetValue(-INTERVAL);
  }
  OnInputAxis(e, o) {
    0 <= o || this.SetValue(o * INTERVAL);
  }
}
exports.SliderReduceComponent = SliderReduceComponent;
//# sourceMappingURL=SliderComponent.js.map
