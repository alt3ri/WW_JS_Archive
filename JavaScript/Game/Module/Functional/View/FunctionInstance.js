"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionInstance = void 0);
class FunctionInstance {
  constructor(t, e) {
    (this.ija = !1), (this.ige = t), (this.w7t = e);
  }
  GetFunctionId() {
    return this.w7t;
  }
  GetIsShow() {
    return 0 < (1 & this.ige);
  }
  GetIsOpen() {
    return 0 < (2 & this.ige);
  }
  GetHasManualShowUi() {
    return 0 < (4 & this.ige);
  }
  SetFlag(t) {
    this.ige = t;
  }
  SetIsLockByBehaviorTree(t) {
    this.ija = t;
  }
  GetIsLockByBehaviorTree() {
    return this.ija;
  }
}
exports.FunctionInstance = FunctionInstance;
//# sourceMappingURL=FunctionInstance.js.map
