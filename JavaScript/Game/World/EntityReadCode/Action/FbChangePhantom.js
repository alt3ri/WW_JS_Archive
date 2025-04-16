"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangePhantom = void 0);
class FbChangePhantom {
  constructor(t) {
    (this.FbDataInternal = t), (this.tgh = !1), (this.FFe = 0);
  }
  static Create(t) {
    if (t) return new FbChangePhantom(t);
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
}
exports.FbChangePhantom = FbChangePhantom;
//# sourceMappingURL=FbChangePhantom.js.map
