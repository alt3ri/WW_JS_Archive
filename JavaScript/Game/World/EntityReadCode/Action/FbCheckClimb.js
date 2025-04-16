"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckClimb = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCheckClimb {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.tdh = !1),
      (this.idh = void 0),
      (this.rdh = !1),
      (this.odh = 0);
  }
  static Create(t) {
    if (t) return new FbCheckClimb(t);
  }
  get Direction() {
    return (
      this.tdh ||
        ((this.tdh = !0),
        (this.idh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.direction(),
        ))),
      this.idh
    );
  }
  get Distance() {
    return (
      this.rdh ||
        ((this.rdh = !0), (this.odh = this.FbDataInternal.distance())),
      this.odh
    );
  }
}
exports.FbCheckClimb = FbCheckClimb;
//# sourceMappingURL=FbCheckClimb.js.map
