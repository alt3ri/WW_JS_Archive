"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBoxRange = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbBoxRange {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.uch = !1),
      (this.dch = void 0),
      (this.oRh = !1),
      (this.n6 = void 0),
      (this.EZh = !1),
      (this.kJ = void 0);
  }
  static Create(t) {
    if (t) return new FbBoxRange(t);
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
  get Size() {
    return (
      this.oRh ||
        ((this.oRh = !0),
        (this.n6 = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.size(),
        ))),
      this.n6
    );
  }
  get Rotator() {
    return (
      this.EZh ||
        ((this.EZh = !0),
        (this.kJ = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.rotator(),
        ))),
      this.kJ
    );
  }
}
exports.FbBoxRange = FbBoxRange;
//# sourceMappingURL=FbBoxRange.js.map
