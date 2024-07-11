"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractWheelComponent = void 0);
const UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent"),
  ZOOM_THRESHOLD = 1;
class InteractWheelComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments),
      (this.F_i = 0),
      (this.V_i = 0),
      (this.j_i = 0),
      (this.IsPress = !1),
      (this.Q_i = !1);
  }
  OnInputAxis(t, i) {
    var e = -i,
      e =
        (this.j_i * e < 0 && (this.j_i = 0),
        (this.j_i += e),
        (0 < e ? 1 : -1) * Math.floor(Math.abs(this.j_i / ZOOM_THRESHOLD))),
      e = ((this.j_i -= ZOOM_THRESHOLD * e), 0 !== i);
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
    var i = this.V_i;
    return this.X_i(t), this.V_i !== i;
  }
  X_i(t) {
    t && (this.F_i = t),
      this.F_i &&
        (this.V_i < 0 || this.V_i >= this.F_i) &&
        (this.Q_i
          ? ((this.V_i = this.V_i % this.F_i),
            this.V_i < 0 && (this.V_i = this.F_i + this.V_i))
          : (this.V_i = Math.max(0, Math.min(this.V_i, this.F_i - 1))));
  }
}
exports.InteractWheelComponent = InteractWheelComponent;
//# sourceMappingURL=InteractWheelComponent.js.map
