"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAbsolutePos2 = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbAbsolutePos2 {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.uch = !1),
      (this.dch = void 0);
  }
  static Create(t) {
    if (t) return new FbAbsolutePos2(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
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
exports.FbAbsolutePos2 = FbAbsolutePos2;
//# sourceMappingURL=FbAbsolutePos2.js.map
