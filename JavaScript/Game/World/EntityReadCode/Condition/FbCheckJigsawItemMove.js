"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckJigsawItemMove = void 0);
class FbCheckJigsawItemMove {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.gAh = !1),
      (this.fAh = 0),
      (this._ch = !1),
      (this.cch = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckJigsawItemMove(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ItemEntityId() {
    return (
      this.gAh ||
        ((this.gAh = !0), (this.fAh = this.FbDataInternal.itemEntityId())),
      this.fAh
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
}
exports.FbCheckJigsawItemMove = FbCheckJigsawItemMove;
//# sourceMappingURL=FbCheckJigsawItemMove.js.map
