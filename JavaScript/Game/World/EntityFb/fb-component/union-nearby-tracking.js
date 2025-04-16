"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionNearbyTracking =
    exports.unionToUnionNearbyTracking =
    exports.UnionNearbyTracking =
      void 0);
const audio_point_nearby_tracking_js_1 = require("../fb-component/audio-point-nearby-tracking.js"),
  compass_tracking_js_1 = require("../fb-component/compass-tracking.js"),
  icon_nearby_tracking_js_1 = require("../fb-component/icon-nearby-tracking.js");
var UnionNearbyTracking;
function unionToUnionNearbyTracking(n, r) {
  switch (UnionNearbyTracking[n]) {
    case "NONE":
      return;
    case "AudioPointNearbyTracking":
      return r(new audio_point_nearby_tracking_js_1.AudioPointNearbyTracking());
    case "CompassTracking":
      return r(new compass_tracking_js_1.CompassTracking());
    case "IconNearbyTracking":
      return r(new icon_nearby_tracking_js_1.IconNearbyTracking());
    default:
      return;
  }
}
function unionListToUnionNearbyTracking(n, r, a) {
  switch (UnionNearbyTracking[n]) {
    case "NONE":
      return;
    case "AudioPointNearbyTracking":
      return r(
        a,
        new audio_point_nearby_tracking_js_1.AudioPointNearbyTracking(),
      );
    case "CompassTracking":
      return r(a, new compass_tracking_js_1.CompassTracking());
    case "IconNearbyTracking":
      return r(a, new icon_nearby_tracking_js_1.IconNearbyTracking());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.AudioPointNearbyTracking = 1)] = "AudioPointNearbyTracking"),
    (n[(n.CompassTracking = 2)] = "CompassTracking"),
    (n[(n.IconNearbyTracking = 3)] = "IconNearbyTracking");
})(
  (UnionNearbyTracking =
    exports.UnionNearbyTracking || (exports.UnionNearbyTracking = {})),
),
  (exports.unionToUnionNearbyTracking = unionToUnionNearbyTracking),
  (exports.unionListToUnionNearbyTracking = unionListToUnionNearbyTracking);
//# sourceMappingURL=union-nearby-tracking.js.map
