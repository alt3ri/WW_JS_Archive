"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckInCombat = void 0);
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbCheckInCombat {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Rzh = !1),
      (this.wzh = !1),
      (this.czh = !1),
      (this.uzh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckInCombat(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get InCombat() {
    return (
      this.Rzh ||
        ((this.Rzh = !0), (this.wzh = this.FbDataInternal.inCombat())),
      this.wzh
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
exports.FbCheckInCombat = FbCheckInCombat;
//# sourceMappingURL=FbCheckInCombat.js.map
