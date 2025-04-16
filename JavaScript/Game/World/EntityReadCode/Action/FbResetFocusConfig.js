"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbResetFocusConfig = void 0);
const FbBaseCurve_1 = require("./FbBaseCurve");
class FbResetFocusConfig {
  constructor(s) {
    (this.FbDataInternal = s),
      (this.mch = !1),
      (this.Cch = 0),
      (this.VIh = !1),
      (this.jIh = void 0);
  }
  static Create(s) {
    if (s) return new FbResetFocusConfig(s);
  }
  get FadeInTime() {
    return (
      this.mch ||
        ((this.mch = !0), (this.Cch = this.FbDataInternal.fadeInTime())),
      this.Cch
    );
  }
  get FadeInCurve() {
    return (
      this.VIh ||
        ((this.VIh = !0),
        (this.jIh = FbBaseCurve_1.FbBaseCurve.Create(
          this.FbDataInternal.fadeInCurve(),
        ))),
      this.jIh
    );
  }
}
exports.FbResetFocusConfig = FbResetFocusConfig;
//# sourceMappingURL=FbResetFocusConfig.js.map
