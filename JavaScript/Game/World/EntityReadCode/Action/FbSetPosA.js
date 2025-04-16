"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetPosA = void 0);
const FbPosA_1 = require("./FbPosA");
class FbSetPosA {
  constructor(s) {
    (this.FbDataInternal = s), (this.uch = !1), (this.dch = void 0);
  }
  static Create(s) {
    if (s) return new FbSetPosA(s);
  }
  get Pos() {
    return (
      this.uch ||
        ((this.uch = !0),
        (this.dch = FbPosA_1.FbPosA.Create(this.FbDataInternal.pos()))),
      this.dch
    );
  }
}
exports.FbSetPosA = FbSetPosA;
//# sourceMappingURL=FbSetPosA.js.map
