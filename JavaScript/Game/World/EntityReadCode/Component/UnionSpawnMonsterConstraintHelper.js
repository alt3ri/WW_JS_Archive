"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSpawnMonsterConstraintHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSpawnMonsterConstraintAnnularSector_1 = require("./FbSpawnMonsterConstraintAnnularSector");
class UnionSpawnMonsterConstraintHelper {
  static GetUnionSpawnMonsterConstraintObject(n) {
    if (
      n ===
      fb_component_1.UnionSpawnMonsterConstraint
        .SpawnMonsterConstraintAnnularSector
    )
      return new fb_component_1.SpawnMonsterConstraintAnnularSector();
  }
  static ReadUnionSpawnMonsterConstraint(n, t) {
    return void 0 !== t &&
      n ===
        fb_component_1.UnionSpawnMonsterConstraint
          .SpawnMonsterConstraintAnnularSector
      ? FbSpawnMonsterConstraintAnnularSector_1.FbSpawnMonsterConstraintAnnularSector.Create(
          t,
        )
      : void 0;
  }
}
exports.UnionSpawnMonsterConstraintHelper = UnionSpawnMonsterConstraintHelper;
//# sourceMappingURL=UnionSpawnMonsterConstraintHelper.js.map
