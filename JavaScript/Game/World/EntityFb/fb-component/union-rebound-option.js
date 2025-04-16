"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionReboundOption =
    exports.unionToUnionReboundOption =
    exports.UnionReboundOption =
      void 0);
const forward_front_rebound_js_1 = require("../fb-component/forward-front-rebound.js");
var UnionReboundOption;
function unionToUnionReboundOption(n, o) {
  switch (UnionReboundOption[n]) {
    case "NONE":
      return;
    case "ForwardFrontRebound":
      return o(new forward_front_rebound_js_1.ForwardFrontRebound());
    default:
      return;
  }
}
function unionListToUnionReboundOption(n, o, r) {
  switch (UnionReboundOption[n]) {
    case "NONE":
      return;
    case "ForwardFrontRebound":
      return o(r, new forward_front_rebound_js_1.ForwardFrontRebound());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.ForwardFrontRebound = 1)] = "ForwardFrontRebound");
})(
  (UnionReboundOption =
    exports.UnionReboundOption || (exports.UnionReboundOption = {})),
),
  (exports.unionToUnionReboundOption = unionToUnionReboundOption),
  (exports.unionListToUnionReboundOption = unionListToUnionReboundOption);
//# sourceMappingURL=union-rebound-option.js.map
