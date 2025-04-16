"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbResetEntity = void 0);
const UnionResetEntityConfigHelper_1 = require("./UnionResetEntityConfigHelper");
class FbResetEntity {
  constructor(t) {
    (this.FbDataInternal = t), (this.BAh = !1), (this.qAh = void 0);
  }
  static Create(t) {
    if (t) return new FbResetEntity(t);
  }
  get ResetEntityConfig() {
    var t, e;
    return (
      !this.BAh &&
        ((this.BAh = !0),
        (t = this.FbDataInternal.resetEntityConfigType()),
        (e =
          UnionResetEntityConfigHelper_1.UnionResetEntityConfigHelper.GetUnionResetEntityConfigObject(
            t,
          ))) &&
        (this.qAh =
          UnionResetEntityConfigHelper_1.UnionResetEntityConfigHelper.ReadUnionResetEntityConfig(
            t,
            this.FbDataInternal.resetEntityConfig(e),
          )),
      this.qAh
    );
  }
}
exports.FbResetEntity = FbResetEntity;
//# sourceMappingURL=FbResetEntity.js.map
