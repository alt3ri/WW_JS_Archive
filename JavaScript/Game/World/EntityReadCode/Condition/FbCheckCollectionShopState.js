"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckCollectionShopState = void 0);
class FbCheckCollectionShopState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.dJh = !1),
      (this.mJh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckCollectionShopState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ShopType() {
    return (
      this.dJh ||
        ((this.dJh = !0), (this.mJh = this.FbDataInternal.shopType())),
      this.mJh
    );
  }
}
exports.FbCheckCollectionShopState = FbCheckCollectionShopState;
//# sourceMappingURL=FbCheckCollectionShopState.js.map
