"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPutInTheSpecifiedPiece = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbJigsawPieceMatch_1 = require("./FbJigsawPieceMatch");
class FbPutInTheSpecifiedPiece {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.RNh = !1),
      (this.wNh = void 0);
  }
  static Create(e) {
    if (e) return new FbPutInTheSpecifiedPiece(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MatchList() {
    if (!this.RNh) {
      (this.RNh = !0), (this.wNh = new Array());
      var t = this.FbDataInternal.matchListLength();
      if (t)
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.matchList(
            e,
            new fb_component_1.JigsawPieceMatch(),
          );
          this.wNh.push(FbJigsawPieceMatch_1.FbJigsawPieceMatch.Create(i));
        }
    }
    return this.wNh;
  }
}
exports.FbPutInTheSpecifiedPiece = FbPutInTheSpecifiedPiece;
//# sourceMappingURL=FbPutInTheSpecifiedPiece.js.map
