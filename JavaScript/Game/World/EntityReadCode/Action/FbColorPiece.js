"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbColorPiece = void 0);
class FbColorPiece {
  constructor(t) {
    (this.FbDataInternal = t), (this.xIh = !1), (this.RIh = void 0);
  }
  static Create(t) {
    if (t) return new FbColorPiece(t);
  }
  get Color() {
    return (
      this.xIh || ((this.xIh = !0), (this.RIh = this.FbDataInternal.color())),
      this.RIh
    );
  }
}
exports.FbColorPiece = FbColorPiece;
//# sourceMappingURL=FbColorPiece.js.map
