"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbJigsawPieceMatch = void 0);
const FbPieceIndex_1 = require("../Action/FbPieceIndex");
class FbJigsawPieceMatch {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.Afh = !1),
      (this.V_i = void 0);
  }
  static Create(t) {
    if (t) return new FbJigsawPieceMatch(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
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
}
exports.FbJigsawPieceMatch = FbJigsawPieceMatch;
//# sourceMappingURL=FbJigsawPieceMatch.js.map
