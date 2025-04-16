"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcRideInGongduolaPerform = void 0);
class FbNpcRideInGongduolaPerform {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.mgh = !1),
      (this.Cgh = void 0);
  }
  static Create(t) {
    if (t) return new FbNpcRideInGongduolaPerform(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Montage() {
    return (
      this.mgh || ((this.mgh = !0), (this.Cgh = this.FbDataInternal.montage())),
      this.Cgh
    );
  }
}
exports.FbNpcRideInGongduolaPerform = FbNpcRideInGongduolaPerform;
//# sourceMappingURL=FbNpcRideInGongduolaPerform.js.map
