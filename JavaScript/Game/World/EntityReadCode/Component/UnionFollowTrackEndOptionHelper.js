"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionFollowTrackEndOptionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbFollowTrackToFoundation_1 = require("./FbFollowTrackToFoundation"),
  FbFollowTrackToSplineDestination_1 = require("./FbFollowTrackToSplineDestination"),
  FbFollowTrackToStart_1 = require("./FbFollowTrackToStart");
class UnionFollowTrackEndOptionHelper {
  static GetUnionFollowTrackEndOptionObject(o) {
    switch (o) {
      case fb_component_1.UnionFollowTrackEndOption.FollowTrackToFoundation:
        return new fb_component_1.FollowTrackToFoundation();
      case fb_component_1.UnionFollowTrackEndOption
        .FollowTrackToSplineDestination:
        return new fb_component_1.FollowTrackToSplineDestination();
      case fb_component_1.UnionFollowTrackEndOption.FollowTrackToStart:
        return new fb_component_1.FollowTrackToStart();
      default:
        return;
    }
  }
  static ReadUnionFollowTrackEndOption(o, n) {
    if (void 0 !== n)
      switch (o) {
        case fb_component_1.UnionFollowTrackEndOption.FollowTrackToFoundation:
          return FbFollowTrackToFoundation_1.FbFollowTrackToFoundation.Create(
            n,
          );
        case fb_component_1.UnionFollowTrackEndOption
          .FollowTrackToSplineDestination:
          return FbFollowTrackToSplineDestination_1.FbFollowTrackToSplineDestination.Create(
            n,
          );
        case fb_component_1.UnionFollowTrackEndOption.FollowTrackToStart:
          return FbFollowTrackToStart_1.FbFollowTrackToStart.Create(n);
        default:
          return;
      }
  }
}
exports.UnionFollowTrackEndOptionHelper = UnionFollowTrackEndOptionHelper;
//# sourceMappingURL=UnionFollowTrackEndOptionHelper.js.map
