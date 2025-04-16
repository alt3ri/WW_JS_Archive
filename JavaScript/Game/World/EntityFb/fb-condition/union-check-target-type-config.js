"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCheckTargetTypeConfig =
    exports.unionToUnionCheckTargetTypeConfig =
    exports.UnionCheckTargetTypeConfig =
      void 0);
const all_player_type_js_1 = require("../fb-condition/all-player-type.js");
var UnionCheckTargetTypeConfig;
function unionToUnionCheckTargetTypeConfig(e, n) {
  switch (UnionCheckTargetTypeConfig[e]) {
    case "NONE":
      return;
    case "AllPlayerType":
      return n(new all_player_type_js_1.AllPlayerType());
    default:
      return;
  }
}
function unionListToUnionCheckTargetTypeConfig(e, n, o) {
  switch (UnionCheckTargetTypeConfig[e]) {
    case "NONE":
      return;
    case "AllPlayerType":
      return n(o, new all_player_type_js_1.AllPlayerType());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"), (e[(e.AllPlayerType = 1)] = "AllPlayerType");
})(
  (UnionCheckTargetTypeConfig =
    exports.UnionCheckTargetTypeConfig ||
    (exports.UnionCheckTargetTypeConfig = {})),
),
  (exports.unionToUnionCheckTargetTypeConfig =
    unionToUnionCheckTargetTypeConfig),
  (exports.unionListToUnionCheckTargetTypeConfig =
    unionListToUnionCheckTargetTypeConfig);
//# sourceMappingURL=union-check-target-type-config.js.map
