"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCipherGameplay = void 0);
class FbCipherGameplay {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.CIh = !1),
      (this.gIh = void 0);
  }
  static Create(t) {
    if (t) return new FbCipherGameplay(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CipherId() {
    return (
      this.CIh ||
        ((this.CIh = !0), (this.gIh = this.FbDataInternal.cipherId())),
      this.gIh
    );
  }
}
exports.FbCipherGameplay = FbCipherGameplay;
//# sourceMappingURL=FbCipherGameplay.js.map
