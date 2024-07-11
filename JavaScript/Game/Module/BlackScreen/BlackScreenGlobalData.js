"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackScreenGlobalData = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
class BlackScreenGlobalData {
  static get ShowPromise() {
    return this.L0t;
  }
  static CreateShowPromise() {
    this.L0t = new CustomPromise_1.CustomPromise();
  }
  static FinishShowPromise() {
    this.L0t.SetResult(void 0);
  }
  static get HidePromise() {
    return this.D0t;
  }
  static CreateHidePromise() {
    this.D0t = new CustomPromise_1.CustomPromise();
  }
  static FinishHidePromise() {
    this.D0t.SetResult(void 0);
  }
  static ResetGlobalData() {
    (this.L0t = void 0), (this.D0t = void 0);
  }
}
((exports.BlackScreenGlobalData = BlackScreenGlobalData).L0t = void 0),
  (BlackScreenGlobalData.D0t = void 0);
//# sourceMappingURL=BlackScreenGlobalData.js.map
