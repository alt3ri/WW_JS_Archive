"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckGameplayTagCondition = void 0);
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbCheckGameplayTagCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ldh = !1),
      (this.NHo = void 0),
      (this.Rvh = !1),
      (this.wvh = void 0),
      (this._ch = !1),
      (this.cch = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckGameplayTagCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Target() {
    var t, i;
    return (
      !this.ldh &&
        ((this.ldh = !0),
        (t = this.FbDataInternal.targetType()),
        (i =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.NHo =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.target(i),
          )),
      this.NHo
    );
  }
  get GameplayTag() {
    return (
      this.Rvh ||
        ((this.Rvh = !0), (this.wvh = this.FbDataInternal.gameplayTag())),
      this.wvh
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
}
exports.FbCheckGameplayTagCondition = FbCheckGameplayTagCondition;
//# sourceMappingURL=FbCheckGameplayTagCondition.js.map
