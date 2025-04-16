"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnableHostility = void 0);
class FbEnableHostility {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Dch = !1),
      (this.bSo = !1),
      (this.V1h = !1),
      (this.j1h = void 0);
  }
  static Create(t) {
    if (t) return new FbEnableHostility(t);
  }
  get IsEnable() {
    return (
      this.Dch ||
        ((this.Dch = !0), (this.bSo = this.FbDataInternal.isEnable())),
      this.bSo
    );
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var s = this.FbDataInternal.entityIdsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
}
exports.FbEnableHostility = FbEnableHostility;
//# sourceMappingURL=FbEnableHostility.js.map
