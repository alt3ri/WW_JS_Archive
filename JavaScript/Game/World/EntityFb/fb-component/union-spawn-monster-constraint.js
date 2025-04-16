"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSpawnMonsterConstraint =
    exports.unionToUnionSpawnMonsterConstraint =
    exports.UnionSpawnMonsterConstraint =
      void 0);
const spawn_monster_constraint_annular_sector_js_1 = require("../fb-component/spawn-monster-constraint-annular-sector.js");
var UnionSpawnMonsterConstraint;
function unionToUnionSpawnMonsterConstraint(n, t) {
  switch (UnionSpawnMonsterConstraint[n]) {
    case "NONE":
      return;
    case "SpawnMonsterConstraintAnnularSector":
      return t(
        new spawn_monster_constraint_annular_sector_js_1.SpawnMonsterConstraintAnnularSector(),
      );
    default:
      return;
  }
}
function unionListToUnionSpawnMonsterConstraint(n, t, o) {
  switch (UnionSpawnMonsterConstraint[n]) {
    case "NONE":
      return;
    case "SpawnMonsterConstraintAnnularSector":
      return t(
        o,
        new spawn_monster_constraint_annular_sector_js_1.SpawnMonsterConstraintAnnularSector(),
      );
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.SpawnMonsterConstraintAnnularSector = 1)] =
      "SpawnMonsterConstraintAnnularSector");
})(
  (UnionSpawnMonsterConstraint =
    exports.UnionSpawnMonsterConstraint ||
    (exports.UnionSpawnMonsterConstraint = {})),
),
  (exports.unionToUnionSpawnMonsterConstraint =
    unionToUnionSpawnMonsterConstraint),
  (exports.unionListToUnionSpawnMonsterConstraint =
    unionListToUnionSpawnMonsterConstraint);
//# sourceMappingURL=union-spawn-monster-constraint.js.map
