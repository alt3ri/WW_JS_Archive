"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFlowComponent = void 0);
const FbPlayFlow_1 = require("../Action/FbPlayFlow");
class FbFlowComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.wAh = !1),
      (this.PAh = void 0);
  }
  static Create(t) {
    if (t) return new FbFlowComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get InitState() {
    return (
      this.wAh ||
        ((this.wAh = !0),
        (this.PAh = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.initState(),
        ))),
      this.PAh
    );
  }
}
exports.FbFlowComponent = FbFlowComponent;
//# sourceMappingURL=FbFlowComponent.js.map
