"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckTargetAttributeCondition = void 0);
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper"),
  UnionTargetAttributeHelper_1 = require("./UnionTargetAttributeHelper");
class FbCheckTargetAttributeCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.s_h = !1),
      (this.Hye = void 0),
      (this.czh = !1),
      (this.uzh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckTargetAttributeCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Option() {
    var t, e;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (t = this.FbDataInternal.optionType()),
        (e =
          UnionTargetAttributeHelper_1.UnionTargetAttributeHelper.GetUnionTargetAttributeObject(
            t,
          ))) &&
        (this.Hye =
          UnionTargetAttributeHelper_1.UnionTargetAttributeHelper.ReadUnionTargetAttribute(
            t,
            this.FbDataInternal.option(e),
          )),
      this.Hye
    );
  }
  get OnlinePlayerConditionTargetOption() {
    var t, e;
    return (
      !this.czh &&
        ((this.czh = !0),
        (t = this.FbDataInternal.onlinePlayerConditionTargetOptionType()),
        (e =
          UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.GetUnionOnlinePlayerConditionTargetObject(
            t,
          ))) &&
        (this.uzh =
          UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.ReadUnionOnlinePlayerConditionTarget(
            t,
            this.FbDataInternal.onlinePlayerConditionTargetOption(e),
          )),
      this.uzh
    );
  }
}
exports.FbCheckTargetAttributeCondition = FbCheckTargetAttributeCondition;
//# sourceMappingURL=FbCheckTargetAttributeCondition.js.map
