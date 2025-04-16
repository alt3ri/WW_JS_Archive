"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRefreshComponent = void 0);
const UnionRefreshRuleHelper_1 = require("./UnionRefreshRuleHelper");
class FbRefreshComponent {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.KDh = !1),
      (this.$Dh = void 0),
      (this.XDh = !1),
      (this.YDh = !1);
  }
  static Create(e) {
    if (e) return new FbRefreshComponent(e);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get RefreshRule() {
    var e, s;
    return (
      !this.KDh &&
        ((this.KDh = !0),
        (e = this.FbDataInternal.refreshRuleType()),
        (s =
          UnionRefreshRuleHelper_1.UnionRefreshRuleHelper.GetUnionRefreshRuleObject(
            e,
          ))) &&
        (this.$Dh =
          UnionRefreshRuleHelper_1.UnionRefreshRuleHelper.ReadUnionRefreshRule(
            e,
            this.FbDataInternal.refreshRule(s),
          )),
      this.$Dh
    );
  }
  get IsDisableRefreshAfterDroppingReward() {
    return (
      this.XDh ||
        ((this.XDh = !0),
        (this.YDh = this.FbDataInternal.isDisableRefreshAfterDroppingReward())),
      this.YDh
    );
  }
}
exports.FbRefreshComponent = FbRefreshComponent;
//# sourceMappingURL=FbRefreshComponent.js.map
