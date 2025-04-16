"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSkillBlackboardVector = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSkillBlackboardVector {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ubh = !1),
      (this.dbh = void 0),
      (this.kmh = !1),
      (this.Gmh = void 0);
  }
  static Create(t) {
    if (t) return new FbSkillBlackboardVector(t);
  }
  get Key() {
    return (
      this.ubh || ((this.ubh = !0), (this.dbh = this.FbDataInternal.key())),
      this.dbh
    );
  }
  get Value() {
    return (
      this.kmh ||
        ((this.kmh = !0),
        (this.Gmh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.value(),
        ))),
      this.Gmh
    );
  }
}
exports.FbSkillBlackboardVector = FbSkillBlackboardVector;
//# sourceMappingURL=FbSkillBlackboardVector.js.map
