"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckChessWinner = void 0);
class FbCheckChessWinner {
  constructor(s) {
    (this.FbDataInternal = s),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.NJh = !1),
      (this.VJh = 0),
      (this.jJh = !1),
      (this.HJh = void 0);
  }
  static Create(s) {
    if (s) return new FbCheckChessWinner(s);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ChessboardId() {
    return (
      this.NJh ||
        ((this.NJh = !0), (this.VJh = this.FbDataInternal.chessboardId())),
      this.VJh
    );
  }
  get Winner() {
    return (
      this.jJh || ((this.jJh = !0), (this.HJh = this.FbDataInternal.winner())),
      this.HJh
    );
  }
}
exports.FbCheckChessWinner = FbCheckChessWinner;
//# sourceMappingURL=FbCheckChessWinner.js.map
