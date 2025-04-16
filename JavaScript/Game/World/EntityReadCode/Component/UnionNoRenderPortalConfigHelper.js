"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionNoRenderPortalConfigHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbStaticNoRenderPortal_1 = require("./FbStaticNoRenderPortal");
class UnionNoRenderPortalConfigHelper {
  static GetUnionNoRenderPortalConfigObject(e) {
    if (e === fb_component_1.UnionNoRenderPortalConfig.StaticNoRenderPortal)
      return new fb_component_1.StaticNoRenderPortal();
  }
  static ReadUnionNoRenderPortalConfig(e, o) {
    return void 0 !== o &&
      e === fb_component_1.UnionNoRenderPortalConfig.StaticNoRenderPortal
      ? FbStaticNoRenderPortal_1.FbStaticNoRenderPortal.Create(o)
      : void 0;
  }
}
exports.UnionNoRenderPortalConfigHelper = UnionNoRenderPortalConfigHelper;
//# sourceMappingURL=UnionNoRenderPortalConfigHelper.js.map
