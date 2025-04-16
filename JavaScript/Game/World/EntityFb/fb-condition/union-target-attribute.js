"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTargetAttribute =
    exports.unionToUnionTargetAttribute =
    exports.UnionTargetAttribute =
      void 0);
const player_attribute_js_1 = require("../fb-condition/player-attribute.js");
var UnionTargetAttribute;
function unionToUnionTargetAttribute(t, e) {
  switch (UnionTargetAttribute[t]) {
    case "NONE":
      return;
    case "PlayerAttribute":
      return e(new player_attribute_js_1.PlayerAttribute());
    default:
      return;
  }
}
function unionListToUnionTargetAttribute(t, e, r) {
  switch (UnionTargetAttribute[t]) {
    case "NONE":
      return;
    case "PlayerAttribute":
      return e(r, new player_attribute_js_1.PlayerAttribute());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"), (t[(t.PlayerAttribute = 1)] = "PlayerAttribute");
})(
  (UnionTargetAttribute =
    exports.UnionTargetAttribute || (exports.UnionTargetAttribute = {})),
),
  (exports.unionToUnionTargetAttribute = unionToUnionTargetAttribute),
  (exports.unionListToUnionTargetAttribute = unionListToUnionTargetAttribute);
//# sourceMappingURL=union-target-attribute.js.map
