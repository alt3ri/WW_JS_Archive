"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckFormationRoleInfoCondition = void 0);
const UnionCheckFormationRoleInfoHelper_1 = require("./UnionCheckFormationRoleInfoHelper");
class FbCheckFormationRoleInfoCondition {
  constructor(o) {
    (this.FbDataInternal = o),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.s_h = !1),
      (this.Hye = void 0);
  }
  static Create(o) {
    if (o) return new FbCheckFormationRoleInfoCondition(o);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Option() {
    var o, t;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (o = this.FbDataInternal.optionType()),
        (t =
          UnionCheckFormationRoleInfoHelper_1.UnionCheckFormationRoleInfoHelper.GetUnionCheckFormationRoleInfoObject(
            o,
          ))) &&
        (this.Hye =
          UnionCheckFormationRoleInfoHelper_1.UnionCheckFormationRoleInfoHelper.ReadUnionCheckFormationRoleInfo(
            o,
            this.FbDataInternal.option(t),
          )),
      this.Hye
    );
  }
}
exports.FbCheckFormationRoleInfoCondition = FbCheckFormationRoleInfoCondition;
//# sourceMappingURL=FbCheckFormationRoleInfoCondition.js.map
