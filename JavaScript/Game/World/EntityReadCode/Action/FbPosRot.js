"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPosRot = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPosRot {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.uch = !1),
      (this.dch = void 0),
      (this.Aph = !1),
      (this.xph = void 0);
  }
  static Create(t) {
    if (t) return new FbPosRot(t);
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
  get Rot() {
    return (
      this.Aph ||
        ((this.Aph = !0),
        (this.xph = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.rot(),
        ))),
      this.xph
    );
  }
}
exports.FbPosRot = FbPosRot;
//# sourceMappingURL=FbPosRot.js.map
