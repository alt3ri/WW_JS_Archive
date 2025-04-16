"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionRenderSpecifiedRangeConfigHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbRenderBookPage_1 = require("./FbRenderBookPage"),
  FbRenderFlowerBridge_1 = require("./FbRenderFlowerBridge"),
  FbRenderFogBarrier_1 = require("./FbRenderFogBarrier");
class UnionRenderSpecifiedRangeConfigHelper {
  static GetUnionRenderSpecifiedRangeConfigObject(e) {
    switch (e) {
      case fb_component_1.UnionRenderSpecifiedRangeConfig.RenderBookPage:
        return new fb_component_1.RenderBookPage();
      case fb_component_1.UnionRenderSpecifiedRangeConfig.RenderFlowerBridge:
        return new fb_component_1.RenderFlowerBridge();
      case fb_component_1.UnionRenderSpecifiedRangeConfig.RenderFogBarrier:
        return new fb_component_1.RenderFogBarrier();
      default:
        return;
    }
  }
  static ReadUnionRenderSpecifiedRangeConfig(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_component_1.UnionRenderSpecifiedRangeConfig.RenderBookPage:
          return FbRenderBookPage_1.FbRenderBookPage.Create(n);
        case fb_component_1.UnionRenderSpecifiedRangeConfig.RenderFlowerBridge:
          return FbRenderFlowerBridge_1.FbRenderFlowerBridge.Create(n);
        case fb_component_1.UnionRenderSpecifiedRangeConfig.RenderFogBarrier:
          return FbRenderFogBarrier_1.FbRenderFogBarrier.Create(n);
        default:
          return;
      }
  }
}
exports.UnionRenderSpecifiedRangeConfigHelper =
  UnionRenderSpecifiedRangeConfigHelper;
//# sourceMappingURL=UnionRenderSpecifiedRangeConfigHelper.js.map
