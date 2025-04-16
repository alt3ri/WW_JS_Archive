"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMoveToPosA = void 0);
const FbPosA_1 = require("./FbPosA");
class FbMoveToPosA {
  constructor(s) {
    (this.FbDataInternal = s),
      (this.Tuh = !1),
      (this.buh = 0),
      (this.uch = !1),
      (this.dch = void 0);
  }
  static Create(s) {
    if (s) return new FbMoveToPosA(s);
  }
  get Timeout() {
    return (
      this.Tuh || ((this.Tuh = !0), (this.buh = this.FbDataInternal.timeout())),
      this.buh
    );
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
exports.FbMoveToPosA = FbMoveToPosA;
//# sourceMappingURL=FbMoveToPosA.js.map
