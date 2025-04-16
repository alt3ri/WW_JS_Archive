"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckInRangeCondition = void 0);
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbCheckInRangeCondition {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.jAh = !1),
      (this.HAh = void 0),
      (this.SJh = !1),
      (this.MJh = !1),
      (this.czh = !1),
      (this.uzh = void 0);
  }
  static Create(i) {
    if (i) return new FbCheckInRangeCondition(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get RangeEntities() {
    if (!this.jAh) {
      (this.jAh = !0), (this.HAh = new Array());
      var t = this.FbDataInternal.rangeEntitiesLength();
      if (t)
        for (let i = 0; i < t; ++i)
          this.HAh.push(this.FbDataInternal.rangeEntities(i));
    }
    return this.HAh;
  }
  get InRange() {
    return (
      this.SJh || ((this.SJh = !0), (this.MJh = this.FbDataInternal.inRange())),
      this.MJh
    );
  }
  get OnlinePlayerConditionTargetOption() {
    var i, t;
    return (
      !this.czh &&
        ((this.czh = !0),
        (i = this.FbDataInternal.onlinePlayerConditionTargetOptionType()),
        (t =
          UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.GetUnionOnlinePlayerConditionTargetObject(
            i,
          ))) &&
        (this.uzh =
          UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.ReadUnionOnlinePlayerConditionTarget(
            i,
            this.FbDataInternal.onlinePlayerConditionTargetOption(t),
          )),
      this.uzh
    );
  }
}
exports.FbCheckInRangeCondition = FbCheckInRangeCondition;
//# sourceMappingURL=FbCheckInRangeCondition.js.map
