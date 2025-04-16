"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionLevelAiCycleOption =
    exports.unionToUnionLevelAiCycleOption =
    exports.UnionLevelAiCycleOption =
      void 0);
const level_ai_cycle_looply_js_1 = require("../fb-component/level-ai-cycle-looply.js");
var UnionLevelAiCycleOption;
function unionToUnionLevelAiCycleOption(e, o) {
  switch (UnionLevelAiCycleOption[e]) {
    case "NONE":
      return;
    case "LevelAiCycleLooply":
      return o(new level_ai_cycle_looply_js_1.LevelAiCycleLooply());
    default:
      return;
  }
}
function unionListToUnionLevelAiCycleOption(e, o, l) {
  switch (UnionLevelAiCycleOption[e]) {
    case "NONE":
      return;
    case "LevelAiCycleLooply":
      return o(l, new level_ai_cycle_looply_js_1.LevelAiCycleLooply());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.LevelAiCycleLooply = 1)] = "LevelAiCycleLooply");
})(
  (UnionLevelAiCycleOption =
    exports.UnionLevelAiCycleOption || (exports.UnionLevelAiCycleOption = {})),
),
  (exports.unionToUnionLevelAiCycleOption = unionToUnionLevelAiCycleOption),
  (exports.unionListToUnionLevelAiCycleOption =
    unionListToUnionLevelAiCycleOption);
//# sourceMappingURL=union-level-ai-cycle-option.js.map
