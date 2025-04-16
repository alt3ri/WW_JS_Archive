"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityCategoryWeight = void 0);
const FbStaticEntitiyMatch_1 = require("./FbStaticEntitiyMatch");
class FbEntityCategoryWeight {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.m2h = !1),
      (this.C2h = void 0),
      (this.jDh = !1),
      (this.HDh = 0);
  }
  static Create(t) {
    if (t) return new FbEntityCategoryWeight(t);
  }
  get EntitiyMatch() {
    return (
      this.m2h ||
        ((this.m2h = !0),
        (this.C2h = FbStaticEntitiyMatch_1.FbStaticEntitiyMatch.Create(
          this.FbDataInternal.entitiyMatch(),
        ))),
      this.C2h
    );
  }
  get Weight() {
    return (
      this.jDh || ((this.jDh = !0), (this.HDh = this.FbDataInternal.weight())),
      this.HDh
    );
  }
}
exports.FbEntityCategoryWeight = FbEntityCategoryWeight;
//# sourceMappingURL=FbEntityCategoryWeight.js.map
