"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionChangeEntityPrefabPerformance =
    exports.unionToUnionChangeEntityPrefabPerformance =
    exports.UnionChangeEntityPrefabPerformance =
      void 0);
const change_self_entity_prefab_performance_js_1 = require("../fb-action/change-self-entity-prefab-performance.js"),
  change_target_entity_prefab_performance_js_1 = require("../fb-action/change-target-entity-prefab-performance.js");
var UnionChangeEntityPrefabPerformance;
function unionToUnionChangeEntityPrefabPerformance(e, n) {
  switch (UnionChangeEntityPrefabPerformance[e]) {
    case "NONE":
      return;
    case "ChangeSelfEntityPrefabPerformance":
      return n(
        new change_self_entity_prefab_performance_js_1.ChangeSelfEntityPrefabPerformance(),
      );
    case "ChangeTargetEntityPrefabPerformance":
      return n(
        new change_target_entity_prefab_performance_js_1.ChangeTargetEntityPrefabPerformance(),
      );
    default:
      return;
  }
}
function unionListToUnionChangeEntityPrefabPerformance(e, n, r) {
  switch (UnionChangeEntityPrefabPerformance[e]) {
    case "NONE":
      return;
    case "ChangeSelfEntityPrefabPerformance":
      return n(
        r,
        new change_self_entity_prefab_performance_js_1.ChangeSelfEntityPrefabPerformance(),
      );
    case "ChangeTargetEntityPrefabPerformance":
      return n(
        r,
        new change_target_entity_prefab_performance_js_1.ChangeTargetEntityPrefabPerformance(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.ChangeSelfEntityPrefabPerformance = 1)] =
      "ChangeSelfEntityPrefabPerformance"),
    (e[(e.ChangeTargetEntityPrefabPerformance = 2)] =
      "ChangeTargetEntityPrefabPerformance");
})(
  (UnionChangeEntityPrefabPerformance =
    exports.UnionChangeEntityPrefabPerformance ||
    (exports.UnionChangeEntityPrefabPerformance = {})),
),
  (exports.unionToUnionChangeEntityPrefabPerformance =
    unionToUnionChangeEntityPrefabPerformance),
  (exports.unionListToUnionChangeEntityPrefabPerformance =
    unionListToUnionChangeEntityPrefabPerformance);
//# sourceMappingURL=union-change-entity-prefab-performance.js.map
