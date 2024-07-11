"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractWheelComponent = void 0);
const UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent"),
  ZOOM_THRESHOLD = 1;
class InteractWheelComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments),
      (this.F1i = 0),
      (this.V1i = 0),
      (this.j1i = 0),
      (this.IsPress = !1),
      (this.Q1i = !1);
  }
  OnInputAxis(t, i) {
    var e = -i,
      e =
        (this.j1i * e < 0 && (this.j1i = 0),
        (this.j1i += e),
        (0 < e ? 1 : -1) * Math.floor(Math.abs(this.j1i / ZOOM_THRESHOLD))),
      e = ((this.j1i -= ZOOM_THRESHOLD * e), 0 !== i);
    this.IsPress !== e &&
      ((this.IsPress = e),
      0 < i
        ? UiNavigationNewController_1.UiNavigationNewController.FindTarget(6)
        : i < 0 &&
          UiNavigationNewController_1.UiNavigationNewController.FindTarget(5));
  }
  OnRefreshMode() {
    (this.IsAction = !1), super.OnRefreshMode();
  }
  UpdateIndex(t) {
    var i = this.V1i;
    return this.X1i(t), this.V1i !== i;
  }
  X1i(t) {
    t && (this.F1i = t),
      this.F1i &&
        (this.V1i < 0 || this.V1i >= this.F1i) &&
        (this.Q1i
          ? ((this.V1i = this.V1i % this.F1i),
            this.V1i < 0 && (this.V1i = this.F1i + this.V1i))
          : (this.V1i = Math.max(0, Math.min(this.V1i, this.F1i - 1))));
  }
}
exports.InteractWheelComponent = InteractWheelComponent;
//# sourceMappingURL=InteractWheelComponent.js.map
