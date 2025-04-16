"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbServerSetPlayerPos = void 0);
const FbPosA_1 = require("./FbPosA");
class FbServerSetPlayerPos {
  constructor(e) {
    (this.FbDataInternal = e), (this.uch = !1), (this.dch = void 0);
  }
  static Create(e) {
    if (e) return new FbServerSetPlayerPos(e);
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
exports.FbServerSetPlayerPos = FbServerSetPlayerPos;
//# sourceMappingURL=FbServerSetPlayerPos.js.map
