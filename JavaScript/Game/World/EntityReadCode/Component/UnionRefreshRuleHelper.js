"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionRefreshRuleHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCdRefreshRule_1 = require("./FbCdRefreshRule"),
  FbFixedDateTimeRefreshRule_1 = require("./FbFixedDateTimeRefreshRule"),
  FbRandomNpcRule_1 = require("./FbRandomNpcRule");
class UnionRefreshRuleHelper {
  static GetUnionRefreshRuleObject(e) {
    switch (e) {
      case fb_component_1.UnionRefreshRule.CdRefreshRule:
        return new fb_component_1.CdRefreshRule();
      case fb_component_1.UnionRefreshRule.FixedDateTimeRefreshRule:
        return new fb_component_1.FixedDateTimeRefreshRule();
      case fb_component_1.UnionRefreshRule.RandomNpcRule:
        return new fb_component_1.RandomNpcRule();
      default:
        return;
    }
  }
  static ReadUnionRefreshRule(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_component_1.UnionRefreshRule.CdRefreshRule:
          return FbCdRefreshRule_1.FbCdRefreshRule.Create(n);
        case fb_component_1.UnionRefreshRule.FixedDateTimeRefreshRule:
          return FbFixedDateTimeRefreshRule_1.FbFixedDateTimeRefreshRule.Create(
            n,
          );
        case fb_component_1.UnionRefreshRule.RandomNpcRule:
          return FbRandomNpcRule_1.FbRandomNpcRule.Create(n);
        default:
          return;
      }
  }
}
exports.UnionRefreshRuleHelper = UnionRefreshRuleHelper;
//# sourceMappingURL=UnionRefreshRuleHelper.js.map
