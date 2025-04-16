"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionInteractOption =
    exports.unionToUnionInteractOption =
    exports.UnionInteractOption =
      void 0);
const interact_actions_js_1 = require("../fb-action/interact-actions.js"),
  interact_flow_js_1 = require("../fb-action/interact-flow.js");
var UnionInteractOption;
function unionToUnionInteractOption(t, n) {
  switch (UnionInteractOption[t]) {
    case "NONE":
      return;
    case "InteractActions":
      return n(new interact_actions_js_1.InteractActions());
    case "InteractFlow":
      return n(new interact_flow_js_1.InteractFlow());
    default:
      return;
  }
}
function unionListToUnionInteractOption(t, n, e) {
  switch (UnionInteractOption[t]) {
    case "NONE":
      return;
    case "InteractActions":
      return n(e, new interact_actions_js_1.InteractActions());
    case "InteractFlow":
      return n(e, new interact_flow_js_1.InteractFlow());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.InteractActions = 1)] = "InteractActions"),
    (t[(t.InteractFlow = 2)] = "InteractFlow");
})(
  (UnionInteractOption =
    exports.UnionInteractOption || (exports.UnionInteractOption = {})),
),
  (exports.unionToUnionInteractOption = unionToUnionInteractOption),
  (exports.unionListToUnionInteractOption = unionListToUnionInteractOption);
//# sourceMappingURL=union-interact-option.js.map
