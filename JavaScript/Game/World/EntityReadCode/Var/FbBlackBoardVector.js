"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBlackBoardVector = void 0);
const FbVectorInfo_1 = require("./FbVectorInfo");
class FbBlackBoardVector {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ubh = !1),
      (this.dbh = void 0),
      (this.DZh = !1),
      (this.BZh = void 0);
  }
  static Create(t) {
    if (t) return new FbBlackBoardVector(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Key() {
    return (
      this.ubh || ((this.ubh = !0), (this.dbh = this.FbDataInternal.key())),
      this.dbh
    );
  }
  get Vector() {
    return (
      this.DZh ||
        ((this.DZh = !0),
        (this.BZh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.vector(),
        ))),
      this.BZh
    );
  }
}
exports.FbBlackBoardVector = FbBlackBoardVector;
//# sourceMappingURL=FbBlackBoardVector.js.map
