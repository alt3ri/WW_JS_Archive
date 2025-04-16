"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCheckPlayerCanJoinActivity =
    exports.unionToUnionCheckPlayerCanJoinActivity =
    exports.UnionCheckPlayerCanJoinActivity =
      void 0);
const check_player_can_join_rogue_js_1 = require("../fb-condition/check-player-can-join-rogue.js");
var UnionCheckPlayerCanJoinActivity;
function unionToUnionCheckPlayerCanJoinActivity(n, e) {
  switch (UnionCheckPlayerCanJoinActivity[n]) {
    case "NONE":
      return;
    case "CheckPlayerCanJoinRogue":
      return e(new check_player_can_join_rogue_js_1.CheckPlayerCanJoinRogue());
    default:
      return;
  }
}
function unionListToUnionCheckPlayerCanJoinActivity(n, e, i) {
  switch (UnionCheckPlayerCanJoinActivity[n]) {
    case "NONE":
      return;
    case "CheckPlayerCanJoinRogue":
      return e(
        i,
        new check_player_can_join_rogue_js_1.CheckPlayerCanJoinRogue(),
      );
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.CheckPlayerCanJoinRogue = 1)] = "CheckPlayerCanJoinRogue");
})(
  (UnionCheckPlayerCanJoinActivity =
    exports.UnionCheckPlayerCanJoinActivity ||
    (exports.UnionCheckPlayerCanJoinActivity = {})),
),
  (exports.unionToUnionCheckPlayerCanJoinActivity =
    unionToUnionCheckPlayerCanJoinActivity),
  (exports.unionListToUnionCheckPlayerCanJoinActivity =
    unionListToUnionCheckPlayerCanJoinActivity);
//# sourceMappingURL=union-check-player-can-join-activity.js.map
