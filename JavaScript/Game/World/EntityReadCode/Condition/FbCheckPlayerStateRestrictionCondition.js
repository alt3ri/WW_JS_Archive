"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckPlayerStateRestrictionCondition = void 0);
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbCheckPlayerStateRestrictionCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Wzh = !1),
      (this.Qzh = 0),
      (this.czh = !1),
      (this.uzh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckPlayerStateRestrictionCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get RestrictionId() {
    return (
      this.Wzh ||
        ((this.Wzh = !0), (this.Qzh = this.FbDataInternal.restrictionId())),
      this.Qzh
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
exports.FbCheckPlayerStateRestrictionCondition =
  FbCheckPlayerStateRestrictionCondition;
//# sourceMappingURL=FbCheckPlayerStateRestrictionCondition.js.map
