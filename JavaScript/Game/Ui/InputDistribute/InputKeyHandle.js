"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputKeyHandle = void 0);
const InputDistributeHandle_1 = require("./InputDistributeHandle");
class InputKeyHandle extends InputDistributeHandle_1.InputDistributeHandle {
  BindAction(t) {
    this.Bind(t);
  }
  UnBindAction(t) {
    this.UnBind(t);
  }
  InputKey(t) {
    t ? this.Call(0) : this.Call(1);
  }
}
exports.InputKeyHandle = InputKeyHandle;
//# sourceMappingURL=InputKeyHandle.js.map
