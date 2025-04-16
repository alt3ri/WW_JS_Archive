"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTimePathConfig = void 0);
class FbTimePathConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.SCh = !1),
      (this.MCh = 0),
      (this.o9h = !1),
      (this.n9h = void 0);
  }
  static Create(t) {
    if (t) return new FbTimePathConfig(t);
  }
  get TotalTime() {
    return (
      this.SCh ||
        ((this.SCh = !0), (this.MCh = this.FbDataInternal.totalTime())),
      this.MCh
    );
  }
  get TimePathCurve() {
    return (
      this.o9h ||
        ((this.o9h = !0), (this.n9h = this.FbDataInternal.timePathCurve())),
      this.n9h
    );
  }
}
exports.FbTimePathConfig = FbTimePathConfig;
//# sourceMappingURL=FbTimePathConfig.js.map
