"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionWorldLevelBonus =
    exports.unionToUnionWorldLevelBonus =
    exports.UnionWorldLevelBonus =
      void 0);
const area_bouns_js_1 = require("../fb-component/area-bouns.js"),
  world_level_table_js_1 = require("../fb-component/world-level-table.js");
var UnionWorldLevelBonus;
function unionToUnionWorldLevelBonus(e, o) {
  switch (UnionWorldLevelBonus[e]) {
    case "NONE":
      return;
    case "AreaBouns":
      return o(new area_bouns_js_1.AreaBouns());
    case "WorldLevelTable":
      return o(new world_level_table_js_1.WorldLevelTable());
    default:
      return;
  }
}
function unionListToUnionWorldLevelBonus(e, o, n) {
  switch (UnionWorldLevelBonus[e]) {
    case "NONE":
      return;
    case "AreaBouns":
      return o(n, new area_bouns_js_1.AreaBouns());
    case "WorldLevelTable":
      return o(n, new world_level_table_js_1.WorldLevelTable());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.AreaBouns = 1)] = "AreaBouns"),
    (e[(e.WorldLevelTable = 2)] = "WorldLevelTable");
})(
  (UnionWorldLevelBonus =
    exports.UnionWorldLevelBonus || (exports.UnionWorldLevelBonus = {})),
),
  (exports.unionToUnionWorldLevelBonus = unionToUnionWorldLevelBonus),
  (exports.unionListToUnionWorldLevelBonus = unionListToUnionWorldLevelBonus);
//# sourceMappingURL=union-world-level-bonus.js.map
