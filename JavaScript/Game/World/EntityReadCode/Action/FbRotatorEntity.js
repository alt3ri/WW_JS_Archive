"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRotatorEntity = void 0);
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbRotatorEntity {
  constructor(t) {
    (this.FbDataInternal = t), (this.AEh = !1), (this.PW = void 0);
  }
  static Create(t) {
    if (t) return new FbRotatorEntity(t);
  }
  get Entity() {
    var t, e;
    return (
      !this.AEh &&
        ((this.AEh = !0),
        (t = this.FbDataInternal.entityType()),
        (e =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.PW =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.entity(e),
          )),
      this.PW
    );
  }
}
exports.FbRotatorEntity = FbRotatorEntity;
//# sourceMappingURL=FbRotatorEntity.js.map
