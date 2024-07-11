"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionInstance = void 0);
class FunctionInstance {
  constructor(t, s) {
    (this.ige = t), (this.w9t = s);
  }
  GetFunctionId() {
    return this.w9t;
  }
  GetIsShow() {
    return (1 & this.ige) > 0;
  }
  GetIsOpen() {
    return (2 & this.ige) > 0;
  }
  GetHasManualShowUi() {
    return (4 & this.ige) > 0;
  }
  SetFlag(t) {
    this.ige = t;
  }
}
exports.FunctionInstance = FunctionInstance;
// # sourceMappingURL=FunctionInstance.js.map
