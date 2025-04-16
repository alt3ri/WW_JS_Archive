"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInhalationConfig = void 0);
const FbInhalationMatching_1 = require("./FbInhalationMatching"),
  UnionInhalationPerformanceHelper_1 = require("./UnionInhalationPerformanceHelper");
class FbInhalationConfig {
  constructor(n) {
    (this.FbDataInternal = n),
      (this.eYh = !1),
      (this.tYh = void 0),
      (this.iYh = !1),
      (this.rYh = void 0);
  }
  static Create(n) {
    if (n) return new FbInhalationConfig(n);
  }
  get InhalationMatching() {
    return (
      this.eYh ||
        ((this.eYh = !0),
        (this.tYh = FbInhalationMatching_1.FbInhalationMatching.Create(
          this.FbDataInternal.inhalationMatching(),
        ))),
      this.tYh
    );
  }
  get InhalationPerformance() {
    var n, t;
    return (
      !this.iYh &&
        ((this.iYh = !0),
        (n = this.FbDataInternal.inhalationPerformanceType()),
        (t =
          UnionInhalationPerformanceHelper_1.UnionInhalationPerformanceHelper.GetUnionInhalationPerformanceObject(
            n,
          ))) &&
        (this.rYh =
          UnionInhalationPerformanceHelper_1.UnionInhalationPerformanceHelper.ReadUnionInhalationPerformance(
            n,
            this.FbDataInternal.inhalationPerformance(t),
          )),
      this.rYh
    );
  }
}
exports.FbInhalationConfig = FbInhalationConfig;
//# sourceMappingURL=FbInhalationConfig.js.map
