"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbForwardFrontRebound = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbForwardFrontRebound {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.w7h = !1),
      (this.P7h = void 0);
  }
  static Create(t) {
    if (t) return new FbForwardFrontRebound(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ReboundPoint() {
    return (
      this.w7h ||
        ((this.w7h = !0),
        (this.P7h = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.reboundPoint(),
        ))),
      this.P7h
    );
  }
}
exports.FbForwardFrontRebound = FbForwardFrontRebound;
//# sourceMappingURL=FbForwardFrontRebound.js.map
