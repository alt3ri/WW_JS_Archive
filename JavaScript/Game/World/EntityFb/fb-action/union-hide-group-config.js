"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionHideGroupConfig =
    exports.unionToUnionHideGroupConfig =
    exports.UnionHideGroupConfig =
      void 0);
const hide_specify_entity_group_js_1 = require("../fb-action/hide-specify-entity-group.js"),
  hide_world_entity_and_level_play_group_js_1 = require("../fb-action/hide-world-entity-and-level-play-group.js"),
  hide_world_monster_and_monster_treasure_group_js_1 = require("../fb-action/hide-world-monster-and-monster-treasure-group.js");
var UnionHideGroupConfig;
function unionToUnionHideGroupConfig(e, r) {
  switch (UnionHideGroupConfig[e]) {
    case "NONE":
      return;
    case "HideSpecifyEntityGroup":
      return r(new hide_specify_entity_group_js_1.HideSpecifyEntityGroup());
    case "HideWorldEntityAndLevelPlayGroup":
      return r(
        new hide_world_entity_and_level_play_group_js_1.HideWorldEntityAndLevelPlayGroup(),
      );
    case "HideWorldMonsterAndMonsterTreasureGroup":
      return r(
        new hide_world_monster_and_monster_treasure_group_js_1.HideWorldMonsterAndMonsterTreasureGroup(),
      );
    default:
      return;
  }
}
function unionListToUnionHideGroupConfig(e, r, n) {
  switch (UnionHideGroupConfig[e]) {
    case "NONE":
      return;
    case "HideSpecifyEntityGroup":
      return r(n, new hide_specify_entity_group_js_1.HideSpecifyEntityGroup());
    case "HideWorldEntityAndLevelPlayGroup":
      return r(
        n,
        new hide_world_entity_and_level_play_group_js_1.HideWorldEntityAndLevelPlayGroup(),
      );
    case "HideWorldMonsterAndMonsterTreasureGroup":
      return r(
        n,
        new hide_world_monster_and_monster_treasure_group_js_1.HideWorldMonsterAndMonsterTreasureGroup(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.HideSpecifyEntityGroup = 1)] = "HideSpecifyEntityGroup"),
    (e[(e.HideWorldEntityAndLevelPlayGroup = 2)] =
      "HideWorldEntityAndLevelPlayGroup"),
    (e[(e.HideWorldMonsterAndMonsterTreasureGroup = 3)] =
      "HideWorldMonsterAndMonsterTreasureGroup");
})(
  (UnionHideGroupConfig =
    exports.UnionHideGroupConfig || (exports.UnionHideGroupConfig = {})),
),
  (exports.unionToUnionHideGroupConfig = unionToUnionHideGroupConfig),
  (exports.unionListToUnionHideGroupConfig = unionListToUnionHideGroupConfig);
//# sourceMappingURL=union-hide-group-config.js.map
