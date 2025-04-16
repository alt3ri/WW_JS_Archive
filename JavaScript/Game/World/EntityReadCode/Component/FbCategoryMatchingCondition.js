"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCategoryMatchingCondition = void 0);
const FbDynamicEntityMatch_1 = require("./FbDynamicEntityMatch");
class FbCategoryMatchingCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.gFh = !1),
      (this.fFh = void 0),
      (this.pFh = !1),
      (this.vFh = void 0);
  }
  static Create(t) {
    if (t) return new FbCategoryMatchingCondition(t);
  }
  get EntityMatch() {
    return (
      this.gFh ||
        ((this.gFh = !0),
        (this.fFh = FbDynamicEntityMatch_1.FbDynamicEntityMatch.Create(
          this.FbDataInternal.entityMatch(),
        ))),
      this.fFh
    );
  }
  get SelfState() {
    return (
      this.pFh ||
        ((this.pFh = !0), (this.vFh = this.FbDataInternal.selfState())),
      this.vFh
    );
  }
}
exports.FbCategoryMatchingCondition = FbCategoryMatchingCondition;
//# sourceMappingURL=FbCategoryMatchingCondition.js.map
