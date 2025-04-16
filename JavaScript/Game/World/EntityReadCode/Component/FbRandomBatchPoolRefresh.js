"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRandomBatchPoolRefresh = void 0);
const UnionEntityBatchHelper_1 = require("./UnionEntityBatchHelper");
class FbRandomBatchPoolRefresh {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.eM1 = !1),
      (this.tM1 = void 0),
      (this.iM1 = !1),
      (this.rM1 = !1);
  }
  static Create(t) {
    if (t) return new FbRandomBatchPoolRefresh(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EntityBatches() {
    if (!this.eM1) {
      (this.eM1 = !0), (this.tM1 = new Array());
      var i = this.FbDataInternal.entityBatchesLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.entityBatchesType(t),
            e =
              UnionEntityBatchHelper_1.UnionEntityBatchHelper.GetUnionEntityBatchObject(
                s,
              );
          e &&
            void 0 !==
              (s =
                UnionEntityBatchHelper_1.UnionEntityBatchHelper.ReadUnionEntityBatch(
                  s,
                  this.FbDataInternal.entityBatches(t, e),
                )) &&
            this.tM1.push(s);
        }
    }
    return this.tM1;
  }
  get IsRestartAfterAllBatchesFinished() {
    return (
      this.iM1 ||
        ((this.iM1 = !0),
        (this.rM1 = this.FbDataInternal.isRestartAfterAllBatchesFinished())),
      this.rM1
    );
  }
}
exports.FbRandomBatchPoolRefresh = FbRandomBatchPoolRefresh;
//# sourceMappingURL=FbRandomBatchPoolRefresh.js.map
