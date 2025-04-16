"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbJigsawPiece = void 0);
const FbPieceIndex_1 = require("./FbPieceIndex");
class FbJigsawPiece {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Afh = !1),
      (this.V_i = void 0),
      (this.AAh = !1),
      (this.qzo = !1),
      (this.xAh = !1),
      (this.RAh = !1),
      (this.wAh = !1),
      (this.PAh = void 0);
  }
  static Create(t) {
    if (t) return new FbJigsawPiece(t);
  }
  get Index() {
    return (
      this.Afh ||
        ((this.Afh = !0),
        (this.V_i = FbPieceIndex_1.FbPieceIndex.Create(
          this.FbDataInternal.index(),
        ))),
      this.V_i
    );
  }
  get Active() {
    return (
      this.AAh || ((this.AAh = !0), (this.qzo = this.FbDataInternal.active())),
      this.qzo
    );
  }
  get IsCorrect() {
    return (
      this.xAh ||
        ((this.xAh = !0), (this.RAh = this.FbDataInternal.isCorrect())),
      this.RAh
    );
  }
  get InitState() {
    return (
      this.wAh ||
        ((this.wAh = !0), (this.PAh = this.FbDataInternal.initState())),
      this.PAh
    );
  }
}
exports.FbJigsawPiece = FbJigsawPiece;
//# sourceMappingURL=FbJigsawPiece.js.map
