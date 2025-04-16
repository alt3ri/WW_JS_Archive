"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSpawnMonsterCompleteCondition =
    exports.unionToUnionSpawnMonsterCompleteCondition =
    exports.UnionSpawnMonsterCompleteCondition =
      void 0);
const all_kill_condition_js_1 = require("../fb-component/all-kill-condition.js"),
  duration_condition_js_1 = require("../fb-component/duration-condition.js"),
  quantity_refill_condition_js_1 = require("../fb-component/quantity-refill-condition.js");
var UnionSpawnMonsterCompleteCondition;
function unionToUnionSpawnMonsterCompleteCondition(n, o) {
  switch (UnionSpawnMonsterCompleteCondition[n]) {
    case "NONE":
      return;
    case "AllKillCondition":
      return o(new all_kill_condition_js_1.AllKillCondition());
    case "DurationCondition":
      return o(new duration_condition_js_1.DurationCondition());
    case "QuantityRefillCondition":
      return o(new quantity_refill_condition_js_1.QuantityRefillCondition());
    default:
      return;
  }
}
function unionListToUnionSpawnMonsterCompleteCondition(n, o, i) {
  switch (UnionSpawnMonsterCompleteCondition[n]) {
    case "NONE":
      return;
    case "AllKillCondition":
      return o(i, new all_kill_condition_js_1.AllKillCondition());
    case "DurationCondition":
      return o(i, new duration_condition_js_1.DurationCondition());
    case "QuantityRefillCondition":
      return o(i, new quantity_refill_condition_js_1.QuantityRefillCondition());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.AllKillCondition = 1)] = "AllKillCondition"),
    (n[(n.DurationCondition = 2)] = "DurationCondition"),
    (n[(n.QuantityRefillCondition = 3)] = "QuantityRefillCondition");
})(
  (UnionSpawnMonsterCompleteCondition =
    exports.UnionSpawnMonsterCompleteCondition ||
    (exports.UnionSpawnMonsterCompleteCondition = {})),
),
  (exports.unionToUnionSpawnMonsterCompleteCondition =
    unionToUnionSpawnMonsterCompleteCondition),
  (exports.unionListToUnionSpawnMonsterCompleteCondition =
    unionListToUnionSpawnMonsterCompleteCondition);
//# sourceMappingURL=union-spawn-monster-complete-condition.js.map
