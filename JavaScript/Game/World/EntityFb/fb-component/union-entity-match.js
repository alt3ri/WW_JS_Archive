"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionEntityMatch =
    exports.unionToUnionEntityMatch =
    exports.UnionEntityMatch =
      void 0);
const entity_match_all_character_js_1 = require("../fb-component/entity-match-all-character.js"),
  entity_match_dynamic_js_1 = require("../fb-component/entity-match-dynamic.js"),
  entity_match_player_js_1 = require("../fb-component/entity-match-player.js");
var UnionEntityMatch;
function unionToUnionEntityMatch(t, n) {
  switch (UnionEntityMatch[t]) {
    case "NONE":
      return;
    case "EntityMatchAllCharacter":
      return n(new entity_match_all_character_js_1.EntityMatchAllCharacter());
    case "EntityMatchDynamic":
      return n(new entity_match_dynamic_js_1.EntityMatchDynamic());
    case "EntityMatchPlayer":
      return n(new entity_match_player_js_1.EntityMatchPlayer());
    default:
      return;
  }
}
function unionListToUnionEntityMatch(t, n, e) {
  switch (UnionEntityMatch[t]) {
    case "NONE":
      return;
    case "EntityMatchAllCharacter":
      return n(
        e,
        new entity_match_all_character_js_1.EntityMatchAllCharacter(),
      );
    case "EntityMatchDynamic":
      return n(e, new entity_match_dynamic_js_1.EntityMatchDynamic());
    case "EntityMatchPlayer":
      return n(e, new entity_match_player_js_1.EntityMatchPlayer());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.EntityMatchAllCharacter = 1)] = "EntityMatchAllCharacter"),
    (t[(t.EntityMatchDynamic = 2)] = "EntityMatchDynamic"),
    (t[(t.EntityMatchPlayer = 3)] = "EntityMatchPlayer");
})(
  (UnionEntityMatch =
    exports.UnionEntityMatch || (exports.UnionEntityMatch = {})),
),
  (exports.unionToUnionEntityMatch = unionToUnionEntityMatch),
  (exports.unionListToUnionEntityMatch = unionListToUnionEntityMatch);
//# sourceMappingURL=union-entity-match.js.map
