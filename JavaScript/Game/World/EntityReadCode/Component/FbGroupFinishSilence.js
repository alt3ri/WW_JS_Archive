"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGroupFinishSilence = void 0);
const FbEntityState_1 = require("./FbEntityState");
class FbGroupFinishSilence {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.$Oh = !1),
      (this.XOh = void 0);
  }
  static Create(t) {
    if (t) return new FbGroupFinishSilence(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get SwitchSpecifiedStatus() {
    return (
      this.$Oh ||
        ((this.$Oh = !0),
        (this.XOh = FbEntityState_1.FbEntityState.Create(
          this.FbDataInternal.switchSpecifiedStatus(),
        ))),
      this.XOh
    );
  }
}
exports.FbGroupFinishSilence = FbGroupFinishSilence;
//# sourceMappingURL=FbGroupFinishSilence.js.map
