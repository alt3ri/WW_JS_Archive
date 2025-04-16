"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActiveRange = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbActiveRange {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.yEh = !1),
      (this.SEh = void 0),
      (this.MEh = !1),
      (this.EEh = 0),
      (this.IEh = !1),
      (this.TEh = 0);
  }
  static Create(t) {
    if (t) return new FbActiveRange(t);
  }
  get CheckPoint() {
    return (
      this.yEh ||
        ((this.yEh = !0),
        (this.SEh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.checkPoint(),
        ))),
      this.SEh
    );
  }
  get CheckEnterRange() {
    return (
      this.MEh ||
        ((this.MEh = !0), (this.EEh = this.FbDataInternal.checkEnterRange())),
      this.EEh
    );
  }
  get CheckLeaveRange() {
    return (
      this.IEh ||
        ((this.IEh = !0), (this.TEh = this.FbDataInternal.checkLeaveRange())),
      this.TEh
    );
  }
}
exports.FbActiveRange = FbActiveRange;
//# sourceMappingURL=FbActiveRange.js.map
