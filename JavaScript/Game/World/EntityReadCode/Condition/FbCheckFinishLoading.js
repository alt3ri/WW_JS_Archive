"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckFinishLoading = void 0);
const UnionCheckTargetTypeConfigHelper_1 = require("./UnionCheckTargetTypeConfigHelper");
class FbCheckFinishLoading {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.BJh = !1),
      (this.qJh = void 0);
  }
  static Create(e) {
    if (e) return new FbCheckFinishLoading(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CheckTarget() {
    var e, i;
    return (
      !this.BJh &&
        ((this.BJh = !0),
        (e = this.FbDataInternal.checkTargetType()),
        (i =
          UnionCheckTargetTypeConfigHelper_1.UnionCheckTargetTypeConfigHelper.GetUnionCheckTargetTypeConfigObject(
            e,
          ))) &&
        (this.qJh =
          UnionCheckTargetTypeConfigHelper_1.UnionCheckTargetTypeConfigHelper.ReadUnionCheckTargetTypeConfig(
            e,
            this.FbDataInternal.checkTarget(i),
          )),
      this.qJh
    );
  }
}
exports.FbCheckFinishLoading = FbCheckFinishLoading;
//# sourceMappingURL=FbCheckFinishLoading.js.map
