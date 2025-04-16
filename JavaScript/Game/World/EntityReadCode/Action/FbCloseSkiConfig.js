"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCloseSkiConfig = void 0);
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbCloseSkiConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ldh = !1),
      (this.NHo = void 0);
  }
  static Create(t) {
    if (t) return new FbCloseSkiConfig(t);
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
}
exports.FbCloseSkiConfig = FbCloseSkiConfig;
//# sourceMappingURL=FbCloseSkiConfig.js.map
