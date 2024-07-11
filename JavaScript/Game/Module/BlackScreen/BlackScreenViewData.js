"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackScreenViewData = void 0);
class BlackScreenViewData {
  constructor() {
    (this.ac = 0), (this.x0t = new Map());
  }
  w0t(e) {
    this.x0t.get(e)?.();
  }
  RegisterStateDelegate(e, t) {
    this.x0t.set(e, t);
  }
  TriggerCurrentStateDelegate() {
    this.w0t(this.ac);
  }
  SwitchState(e) {
    return this.ac !== e && ((this.ac = e), this.w0t(e), !0);
  }
}
exports.BlackScreenViewData = BlackScreenViewData;
//# sourceMappingURL=BlackScreenViewData.js.map
