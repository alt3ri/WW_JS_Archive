"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckTargetEntity = void 0);
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbCheckTargetEntity {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Hch = !1),
      (this.Wch = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckTargetEntity(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TargetEntity() {
    var t, e;
    return (
      !this.Hch &&
        ((this.Hch = !0),
        (t = this.FbDataInternal.targetEntityType()),
        (e =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.Wch =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.targetEntity(e),
          )),
      this.Wch
    );
  }
}
exports.FbCheckTargetEntity = FbCheckTargetEntity;
//# sourceMappingURL=FbCheckTargetEntity.js.map
