"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCharacterLookAt = void 0);
const UnionCharacterLookAtDataHelper_1 = require("./UnionCharacterLookAtDataHelper");
class FbCharacterLookAt {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.JZl = !1),
      (this.ZZl = 0),
      (this.ldh = !1),
      (this.NHo = void 0);
  }
  static Create(t) {
    if (t) return new FbCharacterLookAt(t);
  }
  get CharEntityId() {
    return (
      this.JZl ||
        ((this.JZl = !0), (this.ZZl = this.FbDataInternal.charEntityId())),
      this.ZZl
    );
  }
  get Target() {
    var t, r;
    return (
      !this.ldh &&
        ((this.ldh = !0),
        (t = this.FbDataInternal.targetType()),
        (r =
          UnionCharacterLookAtDataHelper_1.UnionCharacterLookAtDataHelper.GetUnionCharacterLookAtDataObject(
            t,
          ))) &&
        (this.NHo =
          UnionCharacterLookAtDataHelper_1.UnionCharacterLookAtDataHelper.ReadUnionCharacterLookAtData(
            t,
            this.FbDataInternal.target(r),
          )),
      this.NHo
    );
  }
}
exports.FbCharacterLookAt = FbCharacterLookAt;
//# sourceMappingURL=FbCharacterLookAt.js.map
