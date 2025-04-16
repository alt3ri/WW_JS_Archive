"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionMonsterShowOnDeathConfig =
    exports.unionToUnionMonsterShowOnDeathConfig =
    exports.UnionMonsterShowOnDeathConfig =
      void 0);
const monster_show_on_death_effect_js_1 = require("../fb-component/monster-show-on-death-effect.js");
var UnionMonsterShowOnDeathConfig;
function unionToUnionMonsterShowOnDeathConfig(n, o) {
  switch (UnionMonsterShowOnDeathConfig[n]) {
    case "NONE":
      return;
    case "MonsterShowOnDeathEffect":
      return o(
        new monster_show_on_death_effect_js_1.MonsterShowOnDeathEffect(),
      );
    default:
      return;
  }
}
function unionListToUnionMonsterShowOnDeathConfig(n, o, e) {
  switch (UnionMonsterShowOnDeathConfig[n]) {
    case "NONE":
      return;
    case "MonsterShowOnDeathEffect":
      return o(
        e,
        new monster_show_on_death_effect_js_1.MonsterShowOnDeathEffect(),
      );
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.MonsterShowOnDeathEffect = 1)] = "MonsterShowOnDeathEffect");
})(
  (UnionMonsterShowOnDeathConfig =
    exports.UnionMonsterShowOnDeathConfig ||
    (exports.UnionMonsterShowOnDeathConfig = {})),
),
  (exports.unionToUnionMonsterShowOnDeathConfig =
    unionToUnionMonsterShowOnDeathConfig),
  (exports.unionListToUnionMonsterShowOnDeathConfig =
    unionListToUnionMonsterShowOnDeathConfig);
//# sourceMappingURL=union-monster-show-on-death-config.js.map
