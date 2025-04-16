"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFixedPos = void 0);
const FbPosA_1 = require("./FbPosA");
class FbFixedPos {
  constructor(s) {
    (this.FbDataInternal = s),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.hfh = !1),
      (this.lfh = void 0);
  }
  static Create(s) {
    if (s) return new FbFixedPos(s);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TargetPos() {
    return (
      this.hfh ||
        ((this.hfh = !0),
        (this.lfh = FbPosA_1.FbPosA.Create(this.FbDataInternal.targetPos()))),
      this.lfh
    );
  }
}
exports.FbFixedPos = FbFixedPos;
//# sourceMappingURL=FbFixedPos.js.map
