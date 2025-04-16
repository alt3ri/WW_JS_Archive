"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDurabilityState = void 0);
class FbDurabilityState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.e3h = !1),
      (this.t3h = 0),
      (this.Bch = !1),
      (this.Cbo = void 0);
  }
  static Create(t) {
    if (t) return new FbDurabilityState(t);
  }
  get Durability() {
    return (
      this.e3h ||
        ((this.e3h = !0), (this.t3h = this.FbDataInternal.durability())),
      this.t3h
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
}
exports.FbDurabilityState = FbDurabilityState;
//# sourceMappingURL=FbDurabilityState.js.map
