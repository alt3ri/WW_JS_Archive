"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPickInteraction =
    exports.unionToUnionPickInteraction =
    exports.UnionPickInteraction =
      void 0);
const chessman_pick_interaction_js_1 = require("../fb-component/chessman-pick-interaction.js");
var UnionPickInteraction;
function unionToUnionPickInteraction(n, t) {
  switch (UnionPickInteraction[n]) {
    case "NONE":
      return;
    case "ChessmanPickInteraction":
      return t(new chessman_pick_interaction_js_1.ChessmanPickInteraction());
    default:
      return;
  }
}
function unionListToUnionPickInteraction(n, t, i) {
  switch (UnionPickInteraction[n]) {
    case "NONE":
      return;
    case "ChessmanPickInteraction":
      return t(i, new chessman_pick_interaction_js_1.ChessmanPickInteraction());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.ChessmanPickInteraction = 1)] = "ChessmanPickInteraction");
})(
  (UnionPickInteraction =
    exports.UnionPickInteraction || (exports.UnionPickInteraction = {})),
),
  (exports.unionToUnionPickInteraction = unionToUnionPickInteraction),
  (exports.unionListToUnionPickInteraction = unionListToUnionPickInteraction);
//# sourceMappingURL=union-pick-interaction.js.map
