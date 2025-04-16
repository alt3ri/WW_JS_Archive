"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStateConfig = void 0);
class FbStateConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.I_h = !1),
      (this.y6o = 0);
  }
  static Create(t) {
    if (t) return new FbStateConfig(t);
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
}
exports.FbStateConfig = FbStateConfig;
//# sourceMappingURL=FbStateConfig.js.map
