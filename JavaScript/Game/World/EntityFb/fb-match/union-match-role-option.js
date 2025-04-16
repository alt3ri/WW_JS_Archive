"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionMatchRoleOption =
    exports.unionToUnionMatchRoleOption =
    exports.UnionMatchRoleOption =
      void 0);
const match_phantom_role_js_1 = require("../fb-match/match-phantom-role.js"),
  match_player_role_js_1 = require("../fb-match/match-player-role.js");
var UnionMatchRoleOption;
function unionToUnionMatchRoleOption(t, o) {
  switch (UnionMatchRoleOption[t]) {
    case "NONE":
      return;
    case "MatchPhantomRole":
      return o(new match_phantom_role_js_1.MatchPhantomRole());
    case "MatchPlayerRole":
      return o(new match_player_role_js_1.MatchPlayerRole());
    default:
      return;
  }
}
function unionListToUnionMatchRoleOption(t, o, e) {
  switch (UnionMatchRoleOption[t]) {
    case "NONE":
      return;
    case "MatchPhantomRole":
      return o(e, new match_phantom_role_js_1.MatchPhantomRole());
    case "MatchPlayerRole":
      return o(e, new match_player_role_js_1.MatchPlayerRole());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.MatchPhantomRole = 1)] = "MatchPhantomRole"),
    (t[(t.MatchPlayerRole = 2)] = "MatchPlayerRole");
})(
  (UnionMatchRoleOption =
    exports.UnionMatchRoleOption || (exports.UnionMatchRoleOption = {})),
),
  (exports.unionToUnionMatchRoleOption = unionToUnionMatchRoleOption),
  (exports.unionListToUnionMatchRoleOption = unionListToUnionMatchRoleOption);
//# sourceMappingURL=union-match-role-option.js.map
