"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStaticEntitiyMatch = void 0);
const FbEntityCategory_1 = require("./FbEntityCategory");
class FbStaticEntitiyMatch {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Rwh = !1),
      (this.wwh = void 0),
      (this.yFh = !1),
      (this.SFh = void 0);
  }
  static Create(t) {
    if (t) return new FbStaticEntitiyMatch(t);
  }
  get Category() {
    return (
      this.Rwh ||
        ((this.Rwh = !0),
        (this.wwh = FbEntityCategory_1.FbEntityCategory.Create(
          this.FbDataInternal.category(),
        ))),
      this.wwh
    );
  }
  get CategoryType() {
    return (
      this.yFh ||
        ((this.yFh = !0), (this.SFh = this.FbDataInternal.categoryType())),
      this.SFh
    );
  }
}
exports.FbStaticEntitiyMatch = FbStaticEntitiyMatch;
//# sourceMappingURL=FbStaticEntitiyMatch.js.map
