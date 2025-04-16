"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcPerformStateConfig = void 0);
class FbNpcPerformStateConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.L6h = !1),
      (this.A6h = void 0);
  }
  static Create(t) {
    if (t) return new FbNpcPerformStateConfig(t);
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get MaterialDa() {
    return (
      this.L6h ||
        ((this.L6h = !0), (this.A6h = this.FbDataInternal.materialDa())),
      this.A6h
    );
  }
}
exports.FbNpcPerformStateConfig = FbNpcPerformStateConfig;
//# sourceMappingURL=FbNpcPerformStateConfig.js.map
