"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckCertainFishingItemCount = void 0);
class FbCheckCertainFishingItemCount {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tgh = !1),
      (this.FFe = 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.luh = !1),
      (this.v4i = 0);
  }
  static Create(t) {
    if (t) return new FbCheckCertainFishingItemCount(t);
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
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get Count() {
    return (
      this.luh || ((this.luh = !0), (this.v4i = this.FbDataInternal.count())),
      this.v4i
    );
  }
}
exports.FbCheckCertainFishingItemCount = FbCheckCertainFishingItemCount;
//# sourceMappingURL=FbCheckCertainFishingItemCount.js.map
