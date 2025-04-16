"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAccelerateSkiConfig = void 0);
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbAccelerateSkiConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ldh = !1),
      (this.NHo = void 0),
      (this.I_h = !1),
      (this.y6o = 0),
      (this.Vbh = !1),
      (this.jbh = 0),
      (this.KEh = !1),
      (this.$Eh = 0),
      (this.Hbh = !1),
      (this.Wbh = 0);
  }
  static Create(t) {
    if (t) return new FbAccelerateSkiConfig(t);
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
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
  get LimitSpeed() {
    return (
      this.Vbh ||
        ((this.Vbh = !0), (this.jbh = this.FbDataInternal.limitSpeed())),
      this.jbh
    );
  }
  get Acceleration() {
    return (
      this.KEh ||
        ((this.KEh = !0), (this.$Eh = this.FbDataInternal.acceleration())),
      this.$Eh
    );
  }
  get InstantSpeed() {
    return (
      this.Hbh ||
        ((this.Hbh = !0), (this.Wbh = this.FbDataInternal.instantSpeed())),
      this.Wbh
    );
  }
}
exports.FbAccelerateSkiConfig = FbAccelerateSkiConfig;
//# sourceMappingURL=FbAccelerateSkiConfig.js.map
