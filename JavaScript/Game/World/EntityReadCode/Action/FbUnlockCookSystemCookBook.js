"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbUnlockCookSystemCookBook = void 0);
class FbUnlockCookSystemCookBook {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.iyh = !1),
      (this.ryh = 0);
  }
  static Create(t) {
    if (t) return new FbUnlockCookSystemCookBook(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CookBookId() {
    return (
      this.iyh ||
        ((this.iyh = !0), (this.ryh = this.FbDataInternal.cookBookId())),
      this.ryh
    );
  }
}
exports.FbUnlockCookSystemCookBook = FbUnlockCookSystemCookBook;
//# sourceMappingURL=FbUnlockCookSystemCookBook.js.map
