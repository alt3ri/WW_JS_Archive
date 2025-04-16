"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionEffectPos2 =
    exports.unionToUnionEffectPos2 =
    exports.UnionEffectPos2 =
      void 0);
const absolute_pos2_js_1 = require("../fb-action/absolute-pos2.js"),
  effect_entity_pos2_js_1 = require("../fb-action/effect-entity-pos2.js"),
  effect_player_pos2_js_1 = require("../fb-action/effect-player-pos2.js");
var UnionEffectPos2;
function unionToUnionEffectPos2(e, t) {
  switch (UnionEffectPos2[e]) {
    case "NONE":
      return;
    case "AbsolutePos2":
      return t(new absolute_pos2_js_1.AbsolutePos2());
    case "EffectEntityPos2":
      return t(new effect_entity_pos2_js_1.EffectEntityPos2());
    case "EffectPlayerPos2":
      return t(new effect_player_pos2_js_1.EffectPlayerPos2());
    default:
      return;
  }
}
function unionListToUnionEffectPos2(e, t, s) {
  switch (UnionEffectPos2[e]) {
    case "NONE":
      return;
    case "AbsolutePos2":
      return t(s, new absolute_pos2_js_1.AbsolutePos2());
    case "EffectEntityPos2":
      return t(s, new effect_entity_pos2_js_1.EffectEntityPos2());
    case "EffectPlayerPos2":
      return t(s, new effect_player_pos2_js_1.EffectPlayerPos2());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.AbsolutePos2 = 1)] = "AbsolutePos2"),
    (e[(e.EffectEntityPos2 = 2)] = "EffectEntityPos2"),
    (e[(e.EffectPlayerPos2 = 3)] = "EffectPlayerPos2");
})(
  (UnionEffectPos2 = exports.UnionEffectPos2 || (exports.UnionEffectPos2 = {})),
),
  (exports.unionToUnionEffectPos2 = unionToUnionEffectPos2),
  (exports.unionListToUnionEffectPos2 = unionListToUnionEffectPos2);
//# sourceMappingURL=union-effect-pos2.js.map
