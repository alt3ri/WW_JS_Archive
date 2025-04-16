"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionNoRenderPortalConfig =
    exports.unionToUnionNoRenderPortalConfig =
    exports.UnionNoRenderPortalConfig =
      void 0);
const static_no_render_portal_js_1 = require("../fb-component/static-no-render-portal.js");
var UnionNoRenderPortalConfig;
function unionToUnionNoRenderPortalConfig(o, n) {
  switch (UnionNoRenderPortalConfig[o]) {
    case "NONE":
      return;
    case "StaticNoRenderPortal":
      return n(new static_no_render_portal_js_1.StaticNoRenderPortal());
    default:
      return;
  }
}
function unionListToUnionNoRenderPortalConfig(o, n, e) {
  switch (UnionNoRenderPortalConfig[o]) {
    case "NONE":
      return;
    case "StaticNoRenderPortal":
      return n(e, new static_no_render_portal_js_1.StaticNoRenderPortal());
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.StaticNoRenderPortal = 1)] = "StaticNoRenderPortal");
})(
  (UnionNoRenderPortalConfig =
    exports.UnionNoRenderPortalConfig ||
    (exports.UnionNoRenderPortalConfig = {})),
),
  (exports.unionToUnionNoRenderPortalConfig = unionToUnionNoRenderPortalConfig),
  (exports.unionListToUnionNoRenderPortalConfig =
    unionListToUnionNoRenderPortalConfig);
//# sourceMappingURL=union-no-render-portal-config.js.map
