"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCircleRange = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCircleRange {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.uch = !1),
      (this.dch = void 0),
      (this.sIh = !1),
      (this.s9o = 0);
  }
  static Create(t) {
    if (t) return new FbCircleRange(t);
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
  get Radius() {
    return (
      this.sIh || ((this.sIh = !0), (this.s9o = this.FbDataInternal.radius())),
      this.s9o
    );
  }
}
exports.FbCircleRange = FbCircleRange;
//# sourceMappingURL=FbCircleRange.js.map
