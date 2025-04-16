"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetPieceState = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbJigsawPiece_1 = require("./FbJigsawPiece");
class FbSetPieceState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.bAh = !1),
      (this.LAh = void 0);
  }
  static Create(t) {
    if (t) return new FbSetPieceState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get PieceState() {
    if (!this.bAh) {
      (this.bAh = !0), (this.LAh = new Array());
      var i = this.FbDataInternal.pieceStateLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.pieceState(
            t,
            new fb_action_1.JigsawPiece(),
          );
          this.LAh.push(FbJigsawPiece_1.FbJigsawPiece.Create(e));
        }
    }
    return this.LAh;
  }
}
exports.FbSetPieceState = FbSetPieceState;
//# sourceMappingURL=FbSetPieceState.js.map
