"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSpawnMonsterPreCondition =
    exports.unionToUnionSpawnMonsterPreCondition =
    exports.UnionSpawnMonsterPreCondition =
      void 0);
const spawn_monster_pre_depend_on_preceding_js_1 = require("../fb-component/spawn-monster-pre-depend-on-preceding.js");
var UnionSpawnMonsterPreCondition;
function unionToUnionSpawnMonsterPreCondition(n, e) {
  switch (UnionSpawnMonsterPreCondition[n]) {
    case "NONE":
      return;
    case "SpawnMonsterPreDependOnPreceding":
      return e(
        new spawn_monster_pre_depend_on_preceding_js_1.SpawnMonsterPreDependOnPreceding(),
      );
    default:
      return;
  }
}
function unionListToUnionSpawnMonsterPreCondition(n, e, o) {
  switch (UnionSpawnMonsterPreCondition[n]) {
    case "NONE":
      return;
    case "SpawnMonsterPreDependOnPreceding":
      return e(
        o,
        new spawn_monster_pre_depend_on_preceding_js_1.SpawnMonsterPreDependOnPreceding(),
      );
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.SpawnMonsterPreDependOnPreceding = 1)] =
      "SpawnMonsterPreDependOnPreceding");
})(
  (UnionSpawnMonsterPreCondition =
    exports.UnionSpawnMonsterPreCondition ||
    (exports.UnionSpawnMonsterPreCondition = {})),
),
  (exports.unionToUnionSpawnMonsterPreCondition =
    unionToUnionSpawnMonsterPreCondition),
  (exports.unionListToUnionSpawnMonsterPreCondition =
    unionListToUnionSpawnMonsterPreCondition);
//# sourceMappingURL=union-spawn-monster-pre-condition.js.map
