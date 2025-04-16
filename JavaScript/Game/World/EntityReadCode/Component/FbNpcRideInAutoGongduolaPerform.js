"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcRideInAutoGongduolaPerform = void 0);
class FbNpcRideInAutoGongduolaPerform {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.mgh = !1),
      (this.Cgh = void 0);
  }
  static Create(t) {
    if (t) return new FbNpcRideInAutoGongduolaPerform(t);
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
exports.FbNpcRideInAutoGongduolaPerform = FbNpcRideInAutoGongduolaPerform;
//# sourceMappingURL=FbNpcRideInAutoGongduolaPerform.js.map
