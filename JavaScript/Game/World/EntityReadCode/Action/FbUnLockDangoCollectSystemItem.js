"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbUnLockDangoCollectSystemItem = void 0);
class FbUnLockDangoCollectSystemItem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tgh = !1),
      (this.FFe = 0);
  }
  static Create(t) {
    if (t) return new FbUnLockDangoCollectSystemItem(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
}
exports.FbUnLockDangoCollectSystemItem = FbUnLockDangoCollectSystemItem;
//# sourceMappingURL=FbUnLockDangoCollectSystemItem.js.map
