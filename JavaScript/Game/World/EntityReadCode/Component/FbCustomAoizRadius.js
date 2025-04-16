"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCustomAoizRadius = void 0);
class FbCustomAoizRadius {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.hUh = !1),
      (this.lUh = 0),
      (this._Uh = !1),
      (this.cUh = 0);
  }
  static Create(t) {
    if (t) return new FbCustomAoizRadius(t);
  }
  get Up() {
    return (
      this.hUh || ((this.hUh = !0), (this.lUh = this.FbDataInternal.up())),
      this.lUh
    );
  }
  get Down() {
    return (
      this._Uh || ((this._Uh = !0), (this.cUh = this.FbDataInternal.down())),
      this.cUh
    );
  }
}
exports.FbCustomAoizRadius = FbCustomAoizRadius;
//# sourceMappingURL=FbCustomAoizRadius.js.map
