"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPrefabConfig =
    exports.unionToUnionPrefabConfig =
    exports.UnionPrefabConfig =
      void 0);
const prefab_config_js_1 = require("../fb-action/prefab-config.js"),
  random_prefab_config_js_1 = require("../fb-action/random-prefab-config.js"),
  rogue_prefab_config_js_1 = require("../fb-action/rogue-prefab-config.js"),
  slash_tower_prefab_config_js_1 = require("../fb-action/slash-tower-prefab-config.js"),
  tower_dungeon_prefab_config_js_1 = require("../fb-action/tower-dungeon-prefab-config.js");
var UnionPrefabConfig;
function unionToUnionPrefabConfig(e, n) {
  switch (UnionPrefabConfig[e]) {
    case "NONE":
      return;
    case "PrefabConfig":
      return n(new prefab_config_js_1.PrefabConfig());
    case "RandomPrefabConfig":
      return n(new random_prefab_config_js_1.RandomPrefabConfig());
    case "RoguePrefabConfig":
      return n(new rogue_prefab_config_js_1.RoguePrefabConfig());
    case "SlashTowerPrefabConfig":
      return n(new slash_tower_prefab_config_js_1.SlashTowerPrefabConfig());
    case "TowerDungeonPrefabConfig":
      return n(new tower_dungeon_prefab_config_js_1.TowerDungeonPrefabConfig());
    default:
      return;
  }
}
function unionListToUnionPrefabConfig(e, n, o) {
  switch (UnionPrefabConfig[e]) {
    case "NONE":
      return;
    case "PrefabConfig":
      return n(o, new prefab_config_js_1.PrefabConfig());
    case "RandomPrefabConfig":
      return n(o, new random_prefab_config_js_1.RandomPrefabConfig());
    case "RoguePrefabConfig":
      return n(o, new rogue_prefab_config_js_1.RoguePrefabConfig());
    case "SlashTowerPrefabConfig":
      return n(o, new slash_tower_prefab_config_js_1.SlashTowerPrefabConfig());
    case "TowerDungeonPrefabConfig":
      return n(
        o,
        new tower_dungeon_prefab_config_js_1.TowerDungeonPrefabConfig(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.PrefabConfig = 1)] = "PrefabConfig"),
    (e[(e.RandomPrefabConfig = 2)] = "RandomPrefabConfig"),
    (e[(e.RoguePrefabConfig = 3)] = "RoguePrefabConfig"),
    (e[(e.SlashTowerPrefabConfig = 4)] = "SlashTowerPrefabConfig"),
    (e[(e.TowerDungeonPrefabConfig = 5)] = "TowerDungeonPrefabConfig");
})(
  (UnionPrefabConfig =
    exports.UnionPrefabConfig || (exports.UnionPrefabConfig = {})),
),
  (exports.unionToUnionPrefabConfig = unionToUnionPrefabConfig),
  (exports.unionListToUnionPrefabConfig = unionListToUnionPrefabConfig);
//# sourceMappingURL=union-prefab-config.js.map
