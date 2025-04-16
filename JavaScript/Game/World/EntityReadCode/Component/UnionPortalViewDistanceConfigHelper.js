"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPortalViewDistanceConfigHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCustomViewDistance_1 = require("./FbCustomViewDistance"),
  FbHighViewDistance_1 = require("./FbHighViewDistance"),
  FbLowViewDistance_1 = require("./FbLowViewDistance"),
  FbMidViewDistance_1 = require("./FbMidViewDistance");
class UnionPortalViewDistanceConfigHelper {
  static GetUnionPortalViewDistanceConfigObject(e) {
    switch (e) {
      case fb_component_1.UnionPortalViewDistanceConfig.CustomViewDistance:
        return new fb_component_1.CustomViewDistance();
      case fb_component_1.UnionPortalViewDistanceConfig.HighViewDistance:
        return new fb_component_1.HighViewDistance();
      case fb_component_1.UnionPortalViewDistanceConfig.LowViewDistance:
        return new fb_component_1.LowViewDistance();
      case fb_component_1.UnionPortalViewDistanceConfig.MidViewDistance:
        return new fb_component_1.MidViewDistance();
      default:
        return;
    }
  }
  static ReadUnionPortalViewDistanceConfig(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_component_1.UnionPortalViewDistanceConfig.CustomViewDistance:
          return FbCustomViewDistance_1.FbCustomViewDistance.Create(n);
        case fb_component_1.UnionPortalViewDistanceConfig.HighViewDistance:
          return FbHighViewDistance_1.FbHighViewDistance.Create(n);
        case fb_component_1.UnionPortalViewDistanceConfig.LowViewDistance:
          return FbLowViewDistance_1.FbLowViewDistance.Create(n);
        case fb_component_1.UnionPortalViewDistanceConfig.MidViewDistance:
          return FbMidViewDistance_1.FbMidViewDistance.Create(n);
        default:
          return;
      }
  }
}
exports.UnionPortalViewDistanceConfigHelper =
  UnionPortalViewDistanceConfigHelper;
//# sourceMappingURL=UnionPortalViewDistanceConfigHelper.js.map
