"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeOtherState = void 0);
const FbPlayFlow_1 = require("./FbPlayFlow");
class FbChangeOtherState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.Bch = !1),
      (this.Cbo = void 0);
  }
  static Create(t) {
    if (t) return new FbChangeOtherState(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get State() {
    return (
      this.Bch ||
        ((this.Bch = !0),
        (this.Cbo = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.state(),
        ))),
      this.Cbo
    );
  }
}
exports.FbChangeOtherState = FbChangeOtherState;
//# sourceMappingURL=FbChangeOtherState.js.map
