"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSpawnMonsterPreConditionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSpawnMonsterPreDependOnPreceding_1 = require("./FbSpawnMonsterPreDependOnPreceding");
class UnionSpawnMonsterPreConditionHelper {
  static GetUnionSpawnMonsterPreConditionObject(e) {
    if (
      e ===
      fb_component_1.UnionSpawnMonsterPreCondition
        .SpawnMonsterPreDependOnPreceding
    )
      return new fb_component_1.SpawnMonsterPreDependOnPreceding();
  }
  static ReadUnionSpawnMonsterPreCondition(e, n) {
    return void 0 !== n &&
      e ===
        fb_component_1.UnionSpawnMonsterPreCondition
          .SpawnMonsterPreDependOnPreceding
      ? FbSpawnMonsterPreDependOnPreceding_1.FbSpawnMonsterPreDependOnPreceding.Create(
          n,
        )
      : void 0;
  }
}
exports.UnionSpawnMonsterPreConditionHelper =
  UnionSpawnMonsterPreConditionHelper;
//# sourceMappingURL=UnionSpawnMonsterPreConditionHelper.js.map
