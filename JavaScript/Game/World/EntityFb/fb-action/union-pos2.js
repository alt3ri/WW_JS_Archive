"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPos2 =
    exports.unionToUnionPos2 =
    exports.UnionPos2 =
      void 0);
const absolute_pos2_js_1 = require("../fb-action/absolute-pos2.js"),
  entity_pos2_js_1 = require("../fb-action/entity-pos2.js"),
  player_pos2_js_1 = require("../fb-action/player-pos2.js");
var UnionPos2;
function unionToUnionPos2(s, o) {
  switch (UnionPos2[s]) {
    case "NONE":
      return;
    case "AbsolutePos2":
      return o(new absolute_pos2_js_1.AbsolutePos2());
    case "EntityPos2":
      return o(new entity_pos2_js_1.EntityPos2());
    case "PlayerPos2":
      return o(new player_pos2_js_1.PlayerPos2());
    default:
      return;
  }
}
function unionListToUnionPos2(s, o, e) {
  switch (UnionPos2[s]) {
    case "NONE":
      return;
    case "AbsolutePos2":
      return o(e, new absolute_pos2_js_1.AbsolutePos2());
    case "EntityPos2":
      return o(e, new entity_pos2_js_1.EntityPos2());
    case "PlayerPos2":
      return o(e, new player_pos2_js_1.PlayerPos2());
    default:
      return;
  }
}
!(function (s) {
  (s[(s.NONE = 0)] = "NONE"),
    (s[(s.AbsolutePos2 = 1)] = "AbsolutePos2"),
    (s[(s.EntityPos2 = 2)] = "EntityPos2"),
    (s[(s.PlayerPos2 = 3)] = "PlayerPos2");
})((UnionPos2 = exports.UnionPos2 || (exports.UnionPos2 = {}))),
  (exports.unionToUnionPos2 = unionToUnionPos2),
  (exports.unionListToUnionPos2 = unionListToUnionPos2);
//# sourceMappingURL=union-pos2.js.map
