"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionInhalationPerformance =
    exports.unionToUnionInhalationPerformance =
    exports.UnionInhalationPerformance =
      void 0);
const role_inhalation_js_1 = require("../fb-component/role-inhalation.js"),
  scene_item_inhalation_js_1 = require("../fb-component/scene-item-inhalation.js");
var UnionInhalationPerformance;
function unionToUnionInhalationPerformance(n, e) {
  switch (UnionInhalationPerformance[n]) {
    case "NONE":
      return;
    case "RoleInhalation":
      return e(new role_inhalation_js_1.RoleInhalation());
    case "SceneItemInhalation":
      return e(new scene_item_inhalation_js_1.SceneItemInhalation());
    default:
      return;
  }
}
function unionListToUnionInhalationPerformance(n, e, o) {
  switch (UnionInhalationPerformance[n]) {
    case "NONE":
      return;
    case "RoleInhalation":
      return e(o, new role_inhalation_js_1.RoleInhalation());
    case "SceneItemInhalation":
      return e(o, new scene_item_inhalation_js_1.SceneItemInhalation());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.RoleInhalation = 1)] = "RoleInhalation"),
    (n[(n.SceneItemInhalation = 2)] = "SceneItemInhalation");
})(
  (UnionInhalationPerformance =
    exports.UnionInhalationPerformance ||
    (exports.UnionInhalationPerformance = {})),
),
  (exports.unionToUnionInhalationPerformance =
    unionToUnionInhalationPerformance),
  (exports.unionListToUnionInhalationPerformance =
    unionListToUnionInhalationPerformance);
//# sourceMappingURL=union-inhalation-performance.js.map
