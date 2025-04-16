"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetWuYinQuState = void 0);
class FbSetWuYinQuState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Jph = !1),
      (this.Zph = void 0),
      (this.Bch = !1),
      (this.Cbo = void 0);
  }
  static Create(t) {
    if (t) return new FbSetWuYinQuState(t);
  }
  get WuYinQuName() {
    return (
      this.Jph ||
        ((this.Jph = !0), (this.Zph = this.FbDataInternal.wuYinQuName())),
      this.Zph
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
}
exports.FbSetWuYinQuState = FbSetWuYinQuState;
//# sourceMappingURL=FbSetWuYinQuState.js.map
