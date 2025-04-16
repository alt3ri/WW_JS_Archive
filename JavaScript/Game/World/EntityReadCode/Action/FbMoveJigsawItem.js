"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMoveJigsawItem = void 0);
const FbPieceIndex_1 = require("./FbPieceIndex");
class FbMoveJigsawItem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.gAh = !1),
      (this.fAh = 0),
      (this.pAh = !1),
      (this.vAh = 0),
      (this.yAh = !1),
      (this.SAh = void 0);
  }
  static Create(t) {
    if (t) return new FbMoveJigsawItem(t);
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
  get FoundationEntityId() {
    return (
      this.pAh ||
        ((this.pAh = !0),
        (this.vAh = this.FbDataInternal.foundationEntityId())),
      this.vAh
    );
  }
  get Destination() {
    return (
      this.yAh ||
        ((this.yAh = !0),
        (this.SAh = FbPieceIndex_1.FbPieceIndex.Create(
          this.FbDataInternal.destination(),
        ))),
      this.SAh
    );
  }
}
exports.FbMoveJigsawItem = FbMoveJigsawItem;
//# sourceMappingURL=FbMoveJigsawItem.js.map
