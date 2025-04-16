"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPointAttachTarget = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPointAttachTarget {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.s$h = !1),
      (this.a$h = void 0);
  }
  static Create(t) {
    if (t) return new FbPointAttachTarget(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get RelativePoint() {
    return (
      this.s$h ||
        ((this.s$h = !0),
        (this.a$h = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.relativePoint(),
        ))),
      this.a$h
    );
  }
}
exports.FbPointAttachTarget = FbPointAttachTarget;
//# sourceMappingURL=FbPointAttachTarget.js.map
