"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInhalationMatching = void 0);
const FbCategoryMatchingCondition_1 = require("./FbCategoryMatchingCondition");
class FbInhalationMatching {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.oYh = !1),
      (this.nYh = 0),
      (this.gFh = !1),
      (this.fFh = void 0);
  }
  static Create(t) {
    if (t) return new FbInhalationMatching(t);
  }
  get InhalationStrength() {
    return (
      this.oYh ||
        ((this.oYh = !0),
        (this.nYh = this.FbDataInternal.inhalationStrength())),
      this.nYh
    );
  }
  get EntityMatch() {
    return (
      this.gFh ||
        ((this.gFh = !0),
        (this.fFh =
          FbCategoryMatchingCondition_1.FbCategoryMatchingCondition.Create(
            this.FbDataInternal.entityMatch(),
          ))),
      this.fFh
    );
  }
}
exports.FbInhalationMatching = FbInhalationMatching;
//# sourceMappingURL=FbInhalationMatching.js.map
