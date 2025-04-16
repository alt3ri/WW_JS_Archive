"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRoleLevel = void 0);
const UnionRoleLevelHelper_1 = require("./UnionRoleLevelHelper");
class FbRoleLevel {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.s_h = !1),
      (this.Hye = void 0);
  }
  static Create(e) {
    if (e) return new FbRoleLevel(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Option() {
    var e, t;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (e = this.FbDataInternal.optionType()),
        (t =
          UnionRoleLevelHelper_1.UnionRoleLevelHelper.GetUnionRoleLevelObject(
            e,
          ))) &&
        (this.Hye =
          UnionRoleLevelHelper_1.UnionRoleLevelHelper.ReadUnionRoleLevel(
            e,
            this.FbDataInternal.option(t),
          )),
      this.Hye
    );
  }
}
exports.FbRoleLevel = FbRoleLevel;
//# sourceMappingURL=FbRoleLevel.js.map
