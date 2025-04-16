"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSkiConfig = void 0);
const UnionSkiConfigHelper_1 = require("./UnionSkiConfigHelper");
class FbSkiConfig {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(i) {
    if (i) return new FbSkiConfig(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Config() {
    var i, t;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (i = this.FbDataInternal.configType()),
        (t =
          UnionSkiConfigHelper_1.UnionSkiConfigHelper.GetUnionSkiConfigObject(
            i,
          ))) &&
        (this.TAe =
          UnionSkiConfigHelper_1.UnionSkiConfigHelper.ReadUnionSkiConfig(
            i,
            this.FbDataInternal.config(t),
          )),
      this.TAe
    );
  }
}
exports.FbSkiConfig = FbSkiConfig;
//# sourceMappingURL=FbSkiConfig.js.map
