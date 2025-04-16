"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckDangoCultivationProgress = void 0);
const UnionCheckDangoCultivationProgressConfigHelper_1 = require("./UnionCheckDangoCultivationProgressConfigHelper");
class FbCheckDangoCultivationProgress {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.wJh = !1),
      (this.PJh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckDangoCultivationProgress(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CheckType() {
    var t, i;
    return (
      !this.wJh &&
        ((this.wJh = !0),
        (t = this.FbDataInternal.checkTypeType()),
        (i =
          UnionCheckDangoCultivationProgressConfigHelper_1.UnionCheckDangoCultivationProgressConfigHelper.GetUnionCheckDangoCultivationProgressConfigObject(
            t,
          ))) &&
        (this.PJh =
          UnionCheckDangoCultivationProgressConfigHelper_1.UnionCheckDangoCultivationProgressConfigHelper.ReadUnionCheckDangoCultivationProgressConfig(
            t,
            this.FbDataInternal.checkType(i),
          )),
      this.PJh
    );
  }
}
exports.FbCheckDangoCultivationProgress = FbCheckDangoCultivationProgress;
//# sourceMappingURL=FbCheckDangoCultivationProgress.js.map
