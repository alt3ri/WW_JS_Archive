"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionHideRangeConfig =
    exports.unionToUnionHideRangeConfig =
    exports.UnionHideRangeConfig =
      void 0);
const hide_world_entity_and_level_play_js_1 = require("../fb-action/hide-world-entity-and-level-play.js"),
  hide_world_monster_and_monster_treasure_js_1 = require("../fb-action/hide-world-monster-and-monster-treasure.js");
var UnionHideRangeConfig;
function unionToUnionHideRangeConfig(e, n) {
  switch (UnionHideRangeConfig[e]) {
    case "NONE":
      return;
    case "HideWorldEntityAndLevelPlay":
      return n(
        new hide_world_entity_and_level_play_js_1.HideWorldEntityAndLevelPlay(),
      );
    case "HideWorldMonsterAndMonsterTreasure":
      return n(
        new hide_world_monster_and_monster_treasure_js_1.HideWorldMonsterAndMonsterTreasure(),
      );
    default:
      return;
  }
}
function unionListToUnionHideRangeConfig(e, n, r) {
  switch (UnionHideRangeConfig[e]) {
    case "NONE":
      return;
    case "HideWorldEntityAndLevelPlay":
      return n(
        r,
        new hide_world_entity_and_level_play_js_1.HideWorldEntityAndLevelPlay(),
      );
    case "HideWorldMonsterAndMonsterTreasure":
      return n(
        r,
        new hide_world_monster_and_monster_treasure_js_1.HideWorldMonsterAndMonsterTreasure(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.HideWorldEntityAndLevelPlay = 1)] = "HideWorldEntityAndLevelPlay"),
    (e[(e.HideWorldMonsterAndMonsterTreasure = 2)] =
      "HideWorldMonsterAndMonsterTreasure");
})(
  (UnionHideRangeConfig =
    exports.UnionHideRangeConfig || (exports.UnionHideRangeConfig = {})),
),
  (exports.unionToUnionHideRangeConfig = unionToUnionHideRangeConfig),
  (exports.unionListToUnionHideRangeConfig = unionListToUnionHideRangeConfig);
//# sourceMappingURL=union-hide-range-config.js.map
