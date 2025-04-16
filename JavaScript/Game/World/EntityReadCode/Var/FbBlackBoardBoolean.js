"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBlackBoardBoolean = void 0);
class FbBlackBoardBoolean {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ubh = !1),
      (this.dbh = void 0),
      (this.kmh = !1),
      (this.Gmh = !1);
  }
  static Create(t) {
    if (t) return new FbBlackBoardBoolean(t);
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
exports.FbBlackBoardBoolean = FbBlackBoardBoolean;
//# sourceMappingURL=FbBlackBoardBoolean.js.map
