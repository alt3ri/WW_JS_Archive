"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHealthAttribute = void 0);
class FbHealthAttribute {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.kmh = !1),
      (this.Gmh = 0);
  }
  static Create(t) {
    if (t) return new FbHealthAttribute(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get Value() {
    return (
      this.kmh || ((this.kmh = !0), (this.Gmh = this.FbDataInternal.value())),
      this.Gmh
    );
  }
}
exports.FbHealthAttribute = FbHealthAttribute;
//# sourceMappingURL=FbHealthAttribute.js.map
