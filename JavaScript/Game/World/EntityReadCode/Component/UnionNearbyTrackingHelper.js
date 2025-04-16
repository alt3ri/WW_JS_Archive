"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionNearbyTrackingHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbAudioPointNearbyTracking_1 = require("./FbAudioPointNearbyTracking"),
  FbCompassTracking_1 = require("./FbCompassTracking"),
  FbIconNearbyTracking_1 = require("./FbIconNearbyTracking");
class UnionNearbyTrackingHelper {
  static GetUnionNearbyTrackingObject(e) {
    switch (e) {
      case fb_component_1.UnionNearbyTracking.AudioPointNearbyTracking:
        return new fb_component_1.AudioPointNearbyTracking();
      case fb_component_1.UnionNearbyTracking.CompassTracking:
        return new fb_component_1.CompassTracking();
      case fb_component_1.UnionNearbyTracking.IconNearbyTracking:
        return new fb_component_1.IconNearbyTracking();
      default:
        return;
    }
  }
  static ReadUnionNearbyTracking(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_component_1.UnionNearbyTracking.AudioPointNearbyTracking:
          return FbAudioPointNearbyTracking_1.FbAudioPointNearbyTracking.Create(
            n,
          );
        case fb_component_1.UnionNearbyTracking.CompassTracking:
          return FbCompassTracking_1.FbCompassTracking.Create(n);
        case fb_component_1.UnionNearbyTracking.IconNearbyTracking:
          return FbIconNearbyTracking_1.FbIconNearbyTracking.Create(n);
        default:
          return;
      }
  }
}
exports.UnionNearbyTrackingHelper = UnionNearbyTrackingHelper;
//# sourceMappingURL=UnionNearbyTrackingHelper.js.map
