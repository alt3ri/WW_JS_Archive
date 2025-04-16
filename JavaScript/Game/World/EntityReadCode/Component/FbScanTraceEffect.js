"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbScanTraceEffect = void 0);
class FbScanTraceEffect {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.sUh = !1),
      (this.aUh = void 0),
      (this.ldh = !1),
      (this.NHo = 0);
  }
  static Create(t) {
    if (t) return new FbScanTraceEffect(t);
  }
  get Effect() {
    return (
      this.sUh || ((this.sUh = !0), (this.aUh = this.FbDataInternal.effect())),
      this.aUh
    );
  }
  get Target() {
    return (
      this.ldh || ((this.ldh = !0), (this.NHo = this.FbDataInternal.target())),
      this.NHo
    );
  }
}
exports.FbScanTraceEffect = FbScanTraceEffect;
//# sourceMappingURL=FbScanTraceEffect.js.map
