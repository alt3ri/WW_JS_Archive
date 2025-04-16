"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompareEntityGroupStateCondition = void 0);
const FbEntityGroupCondition_1 = require("./FbEntityGroupCondition");
class FbCompareEntityGroupStateCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.MVh = !1),
      (this.EVh = void 0);
  }
  static Create(t) {
    if (t) return new FbCompareEntityGroupStateCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get GroupCondition() {
    return (
      this.MVh ||
        ((this.MVh = !0),
        (this.EVh = FbEntityGroupCondition_1.FbEntityGroupCondition.Create(
          this.FbDataInternal.groupCondition(),
        ))),
      this.EVh
    );
  }
}
exports.FbCompareEntityGroupStateCondition = FbCompareEntityGroupStateCondition;
//# sourceMappingURL=FbCompareEntityGroupStateCondition.js.map
