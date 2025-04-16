"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInteractFlow = void 0);
const FbPlayFlow_1 = require("./FbPlayFlow");
class FbInteractFlow {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.F_h = !1),
      (this.N_h = void 0);
  }
  static Create(t) {
    if (t) return new FbInteractFlow(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Flow() {
    return (
      this.F_h ||
        ((this.F_h = !0),
        (this.N_h = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.flow(),
        ))),
      this.N_h
    );
  }
}
exports.FbInteractFlow = FbInteractFlow;
//# sourceMappingURL=FbInteractFlow.js.map
