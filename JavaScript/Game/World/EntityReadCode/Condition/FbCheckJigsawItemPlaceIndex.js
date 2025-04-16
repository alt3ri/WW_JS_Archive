"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckJigsawItemPlaceIndex = void 0);
const FbPieceIndex_1 = require("./FbPieceIndex");
class FbCheckJigsawItemPlaceIndex {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.gAh = !1),
      (this.fAh = 0),
      (this.pAh = !1),
      (this.vAh = 0),
      (this.tJh = !1),
      (this.iJh = void 0),
      (this._ch = !1),
      (this.cch = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckJigsawItemPlaceIndex(t);
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
  get PlaceIndex() {
    return (
      this.tJh ||
        ((this.tJh = !0),
        (this.iJh = FbPieceIndex_1.FbPieceIndex.Create(
          this.FbDataInternal.placeIndex(),
        ))),
      this.iJh
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
}
exports.FbCheckJigsawItemPlaceIndex = FbCheckJigsawItemPlaceIndex;
//# sourceMappingURL=FbCheckJigsawItemPlaceIndex.js.map
