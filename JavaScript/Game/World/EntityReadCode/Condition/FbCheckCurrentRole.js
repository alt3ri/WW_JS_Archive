"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckCurrentRole = void 0);
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbCheckCurrentRole {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Lzh = !1),
      (this.JGi = 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.czh = !1),
      (this.uzh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckCurrentRole(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get RoleId() {
    return (
      this.Lzh || ((this.Lzh = !0), (this.JGi = this.FbDataInternal.roleId())),
      this.JGi
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get OnlinePlayerConditionTargetOption() {
    var t, i;
    return (
      !this.czh &&
        ((this.czh = !0),
        (t = this.FbDataInternal.onlinePlayerConditionTargetOptionType()),
        (i =
          UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.GetUnionOnlinePlayerConditionTargetObject(
            t,
          ))) &&
        (this.uzh =
          UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.ReadUnionOnlinePlayerConditionTarget(
            t,
            this.FbDataInternal.onlinePlayerConditionTargetOption(i),
          )),
      this.uzh
    );
  }
}
exports.FbCheckCurrentRole = FbCheckCurrentRole;
//# sourceMappingURL=FbCheckCurrentRole.js.map
