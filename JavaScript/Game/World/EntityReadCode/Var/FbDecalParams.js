"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDecalParams = void 0);
class FbDecalParams {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.VZh = !1),
      (this.jZh = 0),
      (this.HZh = !1),
      (this.WZh = 0);
  }
  static Create(t) {
    if (t) return new FbDecalParams(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get SpreadRadius() {
    return (
      this.VZh ||
        ((this.VZh = !0), (this.jZh = this.FbDataInternal.spreadRadius())),
      this.jZh
    );
  }
  get SpreadTime() {
    return (
      this.HZh ||
        ((this.HZh = !0), (this.WZh = this.FbDataInternal.spreadTime())),
      this.WZh
    );
  }
}
exports.FbDecalParams = FbDecalParams;
//# sourceMappingURL=FbDecalParams.js.map
