"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFaceToPos = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbFaceToPos {
  constructor(t) {
    (this.FbDataInternal = t), (this.uch = !1), (this.dch = void 0);
  }
  static Create(t) {
    if (t) return new FbFaceToPos(t);
  }
  get Pos() {
    return (
      this.uch ||
        ((this.uch = !0),
        (this.dch = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.pos(),
        ))),
      this.dch
    );
  }
}
exports.FbFaceToPos = FbFaceToPos;
//# sourceMappingURL=FbFaceToPos.js.map
