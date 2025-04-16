"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPatrolRange = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPatrolRange {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.nIh = !1),
      (this.n9o = void 0),
      (this.sIh = !1),
      (this.s9o = 0);
  }
  static Create(t) {
    if (t) return new FbPatrolRange(t);
  }
  get Center() {
    return (
      this.nIh ||
        ((this.nIh = !0),
        (this.n9o = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.center(),
        ))),
      this.n9o
    );
  }
  get Radius() {
    return (
      this.sIh || ((this.sIh = !0), (this.s9o = this.FbDataInternal.radius())),
      this.s9o
    );
  }
}
exports.FbPatrolRange = FbPatrolRange;
//# sourceMappingURL=FbPatrolRange.js.map
