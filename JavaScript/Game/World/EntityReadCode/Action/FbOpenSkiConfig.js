"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenSkiConfig = void 0);
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbOpenSkiConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ldh = !1),
      (this.NHo = void 0),
      (this.Qbh = !1),
      (this.Kbh = void 0);
  }
  static Create(t) {
    if (t) return new FbOpenSkiConfig(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Target() {
    var t, i;
    return (
      !this.ldh &&
        ((this.ldh = !0),
        (t = this.FbDataInternal.targetType()),
        (i =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.NHo =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.target(i),
          )),
      this.NHo
    );
  }
  get SkiConfig() {
    return (
      this.Qbh ||
        ((this.Qbh = !0), (this.Kbh = this.FbDataInternal.skiConfig())),
      this.Kbh
    );
  }
}
exports.FbOpenSkiConfig = FbOpenSkiConfig;
//# sourceMappingURL=FbOpenSkiConfig.js.map
