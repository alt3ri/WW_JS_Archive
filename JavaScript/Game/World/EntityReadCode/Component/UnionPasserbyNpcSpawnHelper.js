"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPasserbyNpcSpawnHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbPasserbyNpcFixIntervalSpawn_1 = require("./FbPasserbyNpcFixIntervalSpawn");
class UnionPasserbyNpcSpawnHelper {
  static GetUnionPasserbyNpcSpawnObject(e) {
    if (e === fb_component_1.UnionPasserbyNpcSpawn.PasserbyNpcFixIntervalSpawn)
      return new fb_component_1.PasserbyNpcFixIntervalSpawn();
  }
  static ReadUnionPasserbyNpcSpawn(e, n) {
    return void 0 !== n &&
      e === fb_component_1.UnionPasserbyNpcSpawn.PasserbyNpcFixIntervalSpawn
      ? FbPasserbyNpcFixIntervalSpawn_1.FbPasserbyNpcFixIntervalSpawn.Create(n)
      : void 0;
  }
}
exports.UnionPasserbyNpcSpawnHelper = UnionPasserbyNpcSpawnHelper;
//# sourceMappingURL=UnionPasserbyNpcSpawnHelper.js.map
