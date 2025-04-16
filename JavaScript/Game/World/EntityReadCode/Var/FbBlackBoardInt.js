"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBlackBoardInt = void 0);
class FbBlackBoardInt {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ubh = !1),
      (this.dbh = void 0),
      (this.kmh = !1),
      (this.Gmh = 0);
  }
  static Create(t) {
    if (t) return new FbBlackBoardInt(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Key() {
    return (
      this.ubh || ((this.ubh = !0), (this.dbh = this.FbDataInternal.key())),
      this.dbh
    );
  }
  get Value() {
    return (
      this.kmh || ((this.kmh = !0), (this.Gmh = this.FbDataInternal.value())),
      this.Gmh
    );
  }
}
exports.FbBlackBoardInt = FbBlackBoardInt;
//# sourceMappingURL=FbBlackBoardInt.js.map
