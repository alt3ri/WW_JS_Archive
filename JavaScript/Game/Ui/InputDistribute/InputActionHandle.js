"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputActionHandle = void 0);
const InputDistributeHandle_1 = require("./InputDistributeHandle");
class InputActionHandle extends InputDistributeHandle_1.InputDistributeHandle {
  constructor() {
    super(...arguments), (this.wut = !1);
  }
  SetIsPress(t) {
    this.wut = t;
  }
  GetIsPress() {
    return this.wut;
  }
  BindAction(t) {
    this.Bind(t);
  }
  UnBindAction(t) {
    this.UnBind(t);
  }
  BindActionIgnoreLimit(t) {
    this.BindIgnoreLimit(t);
  }
  UnBindActionIgnoreLimit(t) {
    this.UnBindIgnoreLimit(t);
  }
  InputAction(t) {
    t ? this.Call(0) : this.Call(1);
  }
  InputActionIgnoreLimit(t) {
    t ? this.CallIgnoreLimit(0) : this.CallIgnoreLimit(1);
  }
}
exports.InputActionHandle = InputActionHandle;
//# sourceMappingURL=InputActionHandle.js.map
