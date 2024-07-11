"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraManager = void 0);
const UiCamera_1 = require("./UiCamera");
class UiCameraManager {
  static Initialize() {}
  static Clear() {
    this.XUo?.Destroy(), (this.XUo = void 0);
  }
  static Get() {
    return (
      this.XUo ||
        ((this.XUo = new UiCamera_1.UiCamera()), this.XUo.Initialize()),
      this.XUo
    );
  }
  static Destroy(t = 0, i = 0, e = 0) {
    this.XUo?.Destroy(t, i, e), (this.XUo = void 0);
  }
}
(exports.UiCameraManager = UiCameraManager).XUo = void 0;
//# sourceMappingURL=UiCameraManager.js.map
