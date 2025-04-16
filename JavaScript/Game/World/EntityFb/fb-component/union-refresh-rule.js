"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionRefreshRule =
    exports.unionToUnionRefreshRule =
    exports.UnionRefreshRule =
      void 0);
const cd_refresh_rule_js_1 = require("../fb-component/cd-refresh-rule.js"),
  fixed_date_time_refresh_rule_js_1 = require("../fb-component/fixed-date-time-refresh-rule.js"),
  random_npc_rule_js_1 = require("../fb-component/random-npc-rule.js");
var UnionRefreshRule;
function unionToUnionRefreshRule(e, r) {
  switch (UnionRefreshRule[e]) {
    case "NONE":
      return;
    case "CdRefreshRule":
      return r(new cd_refresh_rule_js_1.CdRefreshRule());
    case "FixedDateTimeRefreshRule":
      return r(
        new fixed_date_time_refresh_rule_js_1.FixedDateTimeRefreshRule(),
      );
    case "RandomNpcRule":
      return r(new random_npc_rule_js_1.RandomNpcRule());
    default:
      return;
  }
}
function unionListToUnionRefreshRule(e, r, n) {
  switch (UnionRefreshRule[e]) {
    case "NONE":
      return;
    case "CdRefreshRule":
      return r(n, new cd_refresh_rule_js_1.CdRefreshRule());
    case "FixedDateTimeRefreshRule":
      return r(
        n,
        new fixed_date_time_refresh_rule_js_1.FixedDateTimeRefreshRule(),
      );
    case "RandomNpcRule":
      return r(n, new random_npc_rule_js_1.RandomNpcRule());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CdRefreshRule = 1)] = "CdRefreshRule"),
    (e[(e.FixedDateTimeRefreshRule = 2)] = "FixedDateTimeRefreshRule"),
    (e[(e.RandomNpcRule = 3)] = "RandomNpcRule");
})(
  (UnionRefreshRule =
    exports.UnionRefreshRule || (exports.UnionRefreshRule = {})),
),
  (exports.unionToUnionRefreshRule = unionToUnionRefreshRule),
  (exports.unionListToUnionRefreshRule = unionListToUnionRefreshRule);
//# sourceMappingURL=union-refresh-rule.js.map
