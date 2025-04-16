"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVariableMotion = void 0);
class FbVariableMotion {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.KEh = !1),
      (this.$Eh = 0),
      (this.XEh = !1),
      (this.YEh = 0);
  }
  static Create(t) {
    if (t) return new FbVariableMotion(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Acceleration() {
    return (
      this.KEh ||
        ((this.KEh = !0), (this.$Eh = this.FbDataInternal.acceleration())),
      this.$Eh
    );
  }
  get MaxSpeed() {
    return (
      this.XEh ||
        ((this.XEh = !0), (this.YEh = this.FbDataInternal.maxSpeed())),
      this.YEh
    );
  }
}
exports.FbVariableMotion = FbVariableMotion;
//# sourceMappingURL=FbVariableMotion.js.map
