"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionFollowTrackEndOption =
    exports.unionToUnionFollowTrackEndOption =
    exports.UnionFollowTrackEndOption =
      void 0);
const follow_track_to_foundation_js_1 = require("../fb-component/follow-track-to-foundation.js"),
  follow_track_to_spline_destination_js_1 = require("../fb-component/follow-track-to-spline-destination.js"),
  follow_track_to_start_js_1 = require("../fb-component/follow-track-to-start.js");
var UnionFollowTrackEndOption;
function unionToUnionFollowTrackEndOption(o, n) {
  switch (UnionFollowTrackEndOption[o]) {
    case "NONE":
      return;
    case "FollowTrackToFoundation":
      return n(new follow_track_to_foundation_js_1.FollowTrackToFoundation());
    case "FollowTrackToSplineDestination":
      return n(
        new follow_track_to_spline_destination_js_1.FollowTrackToSplineDestination(),
      );
    case "FollowTrackToStart":
      return n(new follow_track_to_start_js_1.FollowTrackToStart());
    default:
      return;
  }
}
function unionListToUnionFollowTrackEndOption(o, n, t) {
  switch (UnionFollowTrackEndOption[o]) {
    case "NONE":
      return;
    case "FollowTrackToFoundation":
      return n(
        t,
        new follow_track_to_foundation_js_1.FollowTrackToFoundation(),
      );
    case "FollowTrackToSplineDestination":
      return n(
        t,
        new follow_track_to_spline_destination_js_1.FollowTrackToSplineDestination(),
      );
    case "FollowTrackToStart":
      return n(t, new follow_track_to_start_js_1.FollowTrackToStart());
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.FollowTrackToFoundation = 1)] = "FollowTrackToFoundation"),
    (o[(o.FollowTrackToSplineDestination = 2)] =
      "FollowTrackToSplineDestination"),
    (o[(o.FollowTrackToStart = 3)] = "FollowTrackToStart");
})(
  (UnionFollowTrackEndOption =
    exports.UnionFollowTrackEndOption ||
    (exports.UnionFollowTrackEndOption = {})),
),
  (exports.unionToUnionFollowTrackEndOption = unionToUnionFollowTrackEndOption),
  (exports.unionListToUnionFollowTrackEndOption =
    unionListToUnionFollowTrackEndOption);
//# sourceMappingURL=union-follow-track-end-option.js.map
