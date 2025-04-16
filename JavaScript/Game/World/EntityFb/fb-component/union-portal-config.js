"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPortalConfig =
    exports.unionToUnionPortalConfig =
    exports.UnionPortalConfig =
      void 0);
const dynamic_portal_js_1 = require("../fb-component/dynamic-portal.js"),
  static_portal_js_1 = require("../fb-component/static-portal.js");
var UnionPortalConfig;
function unionToUnionPortalConfig(t, o) {
  switch (UnionPortalConfig[t]) {
    case "NONE":
      return;
    case "DynamicPortal":
      return o(new dynamic_portal_js_1.DynamicPortal());
    case "StaticPortal":
      return o(new static_portal_js_1.StaticPortal());
    default:
      return;
  }
}
function unionListToUnionPortalConfig(t, o, n) {
  switch (UnionPortalConfig[t]) {
    case "NONE":
      return;
    case "DynamicPortal":
      return o(n, new dynamic_portal_js_1.DynamicPortal());
    case "StaticPortal":
      return o(n, new static_portal_js_1.StaticPortal());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.DynamicPortal = 1)] = "DynamicPortal"),
    (t[(t.StaticPortal = 2)] = "StaticPortal");
})(
  (UnionPortalConfig =
    exports.UnionPortalConfig || (exports.UnionPortalConfig = {})),
),
  (exports.unionToUnionPortalConfig = unionToUnionPortalConfig),
  (exports.unionListToUnionPortalConfig = unionListToUnionPortalConfig);
//# sourceMappingURL=union-portal-config.js.map
