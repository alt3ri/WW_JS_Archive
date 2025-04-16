"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionInhaledPerResultType =
    exports.unionToUnionInhaledPerResultType =
    exports.UnionInhaledPerResultType =
      void 0);
const inhaled_change_self_state_js_1 = require("../fb-component/inhaled-change-self-state.js"),
  inhaled_destroy_self_js_1 = require("../fb-component/inhaled-destroy-self.js");
var UnionInhaledPerResultType;
function unionToUnionInhaledPerResultType(e, n) {
  switch (UnionInhaledPerResultType[e]) {
    case "NONE":
      return;
    case "InhaledChangeSelfState":
      return n(new inhaled_change_self_state_js_1.InhaledChangeSelfState());
    case "InhaledDestroySelf":
      return n(new inhaled_destroy_self_js_1.InhaledDestroySelf());
    default:
      return;
  }
}
function unionListToUnionInhaledPerResultType(e, n, t) {
  switch (UnionInhaledPerResultType[e]) {
    case "NONE":
      return;
    case "InhaledChangeSelfState":
      return n(t, new inhaled_change_self_state_js_1.InhaledChangeSelfState());
    case "InhaledDestroySelf":
      return n(t, new inhaled_destroy_self_js_1.InhaledDestroySelf());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.InhaledChangeSelfState = 1)] = "InhaledChangeSelfState"),
    (e[(e.InhaledDestroySelf = 2)] = "InhaledDestroySelf");
})(
  (UnionInhaledPerResultType =
    exports.UnionInhaledPerResultType ||
    (exports.UnionInhaledPerResultType = {})),
),
  (exports.unionToUnionInhaledPerResultType = unionToUnionInhaledPerResultType),
  (exports.unionListToUnionInhaledPerResultType =
    unionListToUnionInhaledPerResultType);
//# sourceMappingURL=union-inhaled-per-result-type.js.map
