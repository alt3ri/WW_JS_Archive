"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionMatchRoleOption =
    exports.MatchPlayerRole =
    exports.MatchPhantomRole =
      void 0);
var match_phantom_role_js_1 = require("./fb-match/match-phantom-role.js"),
  match_player_role_js_1 =
    (Object.defineProperty(exports, "MatchPhantomRole", {
      enumerable: !0,
      get: function () {
        return match_phantom_role_js_1.MatchPhantomRole;
      },
    }),
    require("./fb-match/match-player-role.js")),
  union_match_role_option_js_1 =
    (Object.defineProperty(exports, "MatchPlayerRole", {
      enumerable: !0,
      get: function () {
        return match_player_role_js_1.MatchPlayerRole;
      },
    }),
    require("./fb-match/union-match-role-option.js"));
Object.defineProperty(exports, "UnionMatchRoleOption", {
  enumerable: !0,
  get: function () {
    return union_match_role_option_js_1.UnionMatchRoleOption;
  },
});
//# sourceMappingURL=fb-match.js.map
