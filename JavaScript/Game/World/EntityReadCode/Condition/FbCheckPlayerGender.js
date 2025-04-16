"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckPlayerGender = void 0);
class FbCheckPlayerGender {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Azh = !1),
      (this.xzh = void 0);
  }
  static Create(e) {
    if (e) return new FbCheckPlayerGender(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Gender() {
    return (
      this.Azh || ((this.Azh = !0), (this.xzh = this.FbDataInternal.gender())),
      this.xzh
    );
  }
}
exports.FbCheckPlayerGender = FbCheckPlayerGender;
//# sourceMappingURL=FbCheckPlayerGender.js.map
