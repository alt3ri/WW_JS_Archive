"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackScreenViewData = void 0);
class BlackScreenViewData {
  constructor() {
    (this.ac = 0), (this.Mgt = new Map());
  }
  Sgt(e) {
    this.Mgt.get(e)?.();
  }
  RegisterStateDelegate(e, t) {
    this.Mgt.set(e, t);
  }
  TriggerCurrentStateDelegate() {
    this.Sgt(this.ac);
  }
  SwitchState(e) {
    return this.ac !== e && ((this.ac = e), this.Sgt(e), !0);
  }
}
exports.BlackScreenViewData = BlackScreenViewData;
// # sourceMappingURL=BlackScreenViewData.js.map
