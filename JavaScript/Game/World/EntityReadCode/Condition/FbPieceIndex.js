"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPieceIndex = void 0);
class FbPieceIndex {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.MAh = !1),
      (this.EAh = 0),
      (this.IAh = !1),
      (this.TAh = 0);
  }
  static Create(t) {
    if (t) return new FbPieceIndex(t);
  }
  get RowIndex() {
    return (
      this.MAh ||
        ((this.MAh = !0), (this.EAh = this.FbDataInternal.rowIndex())),
      this.EAh
    );
  }
  get ColumnIndex() {
    return (
      this.IAh ||
        ((this.IAh = !0), (this.TAh = this.FbDataInternal.columnIndex())),
      this.TAh
    );
  }
}
exports.FbPieceIndex = FbPieceIndex;
//# sourceMappingURL=FbPieceIndex.js.map
