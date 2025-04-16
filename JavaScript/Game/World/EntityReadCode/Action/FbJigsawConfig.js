"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbJigsawConfig = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbJigsawPiece_1 = require("./FbJigsawPiece");
class FbJigsawConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.eRh = !1),
      (this.tRh = 0),
      (this.iRh = !1),
      (this.rRh = 0),
      (this.oRh = !1),
      (this.n6 = 0),
      (this.nRh = !1),
      (this.c6o = void 0),
      (this.sRh = !1),
      (this.aRh = void 0);
  }
  static Create(t) {
    if (t) return new FbJigsawConfig(t);
  }
  get Row() {
    return (
      this.eRh || ((this.eRh = !0), (this.tRh = this.FbDataInternal.row())),
      this.tRh
    );
  }
  get Column() {
    return (
      this.iRh || ((this.iRh = !0), (this.rRh = this.FbDataInternal.column())),
      this.rRh
    );
  }
  get Size() {
    return (
      this.oRh || ((this.oRh = !0), (this.n6 = this.FbDataInternal.size())),
      this.n6
    );
  }
  get Shape() {
    return (
      this.nRh || ((this.nRh = !0), (this.c6o = this.FbDataInternal.shape())),
      this.c6o
    );
  }
  get Pieces() {
    if (!this.sRh) {
      (this.sRh = !0), (this.aRh = new Array());
      var i = this.FbDataInternal.piecesLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.pieces(t, new fb_action_1.JigsawPiece());
          this.aRh.push(FbJigsawPiece_1.FbJigsawPiece.Create(s));
        }
    }
    return this.aRh;
  }
}
exports.FbJigsawConfig = FbJigsawConfig;
//# sourceMappingURL=FbJigsawConfig.js.map
