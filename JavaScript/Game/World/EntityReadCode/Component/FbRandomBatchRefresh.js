"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRandomBatchRefresh = void 0);
const UnionEntityBatchHelper_1 = require("./UnionEntityBatchHelper");
class FbRandomBatchRefresh {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.eM1 = !1),
      (this.tM1 = void 0);
  }
  static Create(t) {
    if (t) return new FbRandomBatchRefresh(t);
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
          var e = this.FbDataInternal.entityBatchesType(t),
            s =
              UnionEntityBatchHelper_1.UnionEntityBatchHelper.GetUnionEntityBatchObject(
                e,
              );
          s &&
            void 0 !==
              (e =
                UnionEntityBatchHelper_1.UnionEntityBatchHelper.ReadUnionEntityBatch(
                  e,
                  this.FbDataInternal.entityBatches(t, s),
                )) &&
            this.tM1.push(e);
        }
    }
    return this.tM1;
  }
}
exports.FbRandomBatchRefresh = FbRandomBatchRefresh;
//# sourceMappingURL=FbRandomBatchRefresh.js.map
