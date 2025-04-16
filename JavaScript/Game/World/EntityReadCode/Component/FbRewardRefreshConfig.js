"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRewardRefreshConfig = void 0);
const UnionRefreshRuleHelper_1 = require("./UnionRefreshRuleHelper");
class FbRewardRefreshConfig {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.vPc = !1),
      (this.yPc = void 0),
      (this.SPc = !1),
      (this.MPc = 0);
  }
  static Create(e) {
    if (e) return new FbRewardRefreshConfig(e);
  }
  get RefreshType() {
    var e, s;
    return (
      !this.vPc &&
        ((this.vPc = !0),
        (e = this.FbDataInternal.refreshTypeType()),
        (s =
          UnionRefreshRuleHelper_1.UnionRefreshRuleHelper.GetUnionRefreshRuleObject(
            e,
          ))) &&
        (this.yPc =
          UnionRefreshRuleHelper_1.UnionRefreshRuleHelper.ReadUnionRefreshRule(
            e,
            this.FbDataInternal.refreshType(s),
          )),
      this.yPc
    );
  }
  get MaxCount() {
    return (
      this.SPc ||
        ((this.SPc = !0), (this.MPc = this.FbDataInternal.maxCount())),
      this.MPc
    );
  }
}
exports.FbRewardRefreshConfig = FbRewardRefreshConfig;
//# sourceMappingURL=FbRewardRefreshConfig.js.map
