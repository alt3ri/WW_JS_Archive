"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionDynamicPortalCreate =
    exports.unionToUnionDynamicPortalCreate =
    exports.UnionDynamicPortalCreate =
      void 0);
const dynamic_portal_by_bullet_js_1 = require("../fb-component/dynamic-portal-by-bullet.js");
var UnionDynamicPortalCreate;
function unionToUnionDynamicPortalCreate(t, n) {
  switch (UnionDynamicPortalCreate[t]) {
    case "NONE":
      return;
    case "DynamicPortalByBullet":
      return n(new dynamic_portal_by_bullet_js_1.DynamicPortalByBullet());
    default:
      return;
  }
}
function unionListToUnionDynamicPortalCreate(t, n, e) {
  switch (UnionDynamicPortalCreate[t]) {
    case "NONE":
      return;
    case "DynamicPortalByBullet":
      return n(e, new dynamic_portal_by_bullet_js_1.DynamicPortalByBullet());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.DynamicPortalByBullet = 1)] = "DynamicPortalByBullet");
})(
  (UnionDynamicPortalCreate =
    exports.UnionDynamicPortalCreate ||
    (exports.UnionDynamicPortalCreate = {})),
),
  (exports.unionToUnionDynamicPortalCreate = unionToUnionDynamicPortalCreate),
  (exports.unionListToUnionDynamicPortalCreate =
    unionListToUnionDynamicPortalCreate);
//# sourceMappingURL=union-dynamic-portal-create.js.map
