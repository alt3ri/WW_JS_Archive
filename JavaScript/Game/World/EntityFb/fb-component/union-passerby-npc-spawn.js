"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPasserbyNpcSpawn =
    exports.unionToUnionPasserbyNpcSpawn =
    exports.UnionPasserbyNpcSpawn =
      void 0);
const passerby_npc_fix_interval_spawn_js_1 = require("../fb-component/passerby-npc-fix-interval-spawn.js");
var UnionPasserbyNpcSpawn;
function unionToUnionPasserbyNpcSpawn(n, s) {
  switch (UnionPasserbyNpcSpawn[n]) {
    case "NONE":
      return;
    case "PasserbyNpcFixIntervalSpawn":
      return s(
        new passerby_npc_fix_interval_spawn_js_1.PasserbyNpcFixIntervalSpawn(),
      );
    default:
      return;
  }
}
function unionListToUnionPasserbyNpcSpawn(n, s, e) {
  switch (UnionPasserbyNpcSpawn[n]) {
    case "NONE":
      return;
    case "PasserbyNpcFixIntervalSpawn":
      return s(
        e,
        new passerby_npc_fix_interval_spawn_js_1.PasserbyNpcFixIntervalSpawn(),
      );
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.PasserbyNpcFixIntervalSpawn = 1)] = "PasserbyNpcFixIntervalSpawn");
})(
  (UnionPasserbyNpcSpawn =
    exports.UnionPasserbyNpcSpawn || (exports.UnionPasserbyNpcSpawn = {})),
),
  (exports.unionToUnionPasserbyNpcSpawn = unionToUnionPasserbyNpcSpawn),
  (exports.unionListToUnionPasserbyNpcSpawn = unionListToUnionPasserbyNpcSpawn);
//# sourceMappingURL=union-passerby-npc-spawn.js.map
