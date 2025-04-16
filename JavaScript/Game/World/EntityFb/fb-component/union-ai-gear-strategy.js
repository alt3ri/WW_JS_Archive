"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionAiGearStrategy =
    exports.unionToUnionAiGearStrategy =
    exports.UnionAiGearStrategy =
      void 0);
const race_strategy_js_1 = require("../fb-component/race-strategy.js"),
  renju_strategy_js_1 = require("../fb-component/renju-strategy.js");
var UnionAiGearStrategy;
function unionToUnionAiGearStrategy(e, t) {
  switch (UnionAiGearStrategy[e]) {
    case "NONE":
      return;
    case "RaceStrategy":
      return t(new race_strategy_js_1.RaceStrategy());
    case "RenjuStrategy":
      return t(new renju_strategy_js_1.RenjuStrategy());
    default:
      return;
  }
}
function unionListToUnionAiGearStrategy(e, t, r) {
  switch (UnionAiGearStrategy[e]) {
    case "NONE":
      return;
    case "RaceStrategy":
      return t(r, new race_strategy_js_1.RaceStrategy());
    case "RenjuStrategy":
      return t(r, new renju_strategy_js_1.RenjuStrategy());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.RaceStrategy = 1)] = "RaceStrategy"),
    (e[(e.RenjuStrategy = 2)] = "RenjuStrategy");
})(
  (UnionAiGearStrategy =
    exports.UnionAiGearStrategy || (exports.UnionAiGearStrategy = {})),
),
  (exports.unionToUnionAiGearStrategy = unionToUnionAiGearStrategy),
  (exports.unionListToUnionAiGearStrategy = unionListToUnionAiGearStrategy);
//# sourceMappingURL=union-ai-gear-strategy.js.map
