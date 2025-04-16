"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionEffectSplineCreateOptionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEffectSplineEquidistantPointMode_1 = require("./FbEffectSplineEquidistantPointMode"),
  FbEffectSplineWholeLineMode_1 = require("./FbEffectSplineWholeLineMode");
class UnionEffectSplineCreateOptionHelper {
  static GetUnionEffectSplineCreateOptionObject(e) {
    switch (e) {
      case fb_component_1.UnionEffectSplineCreateOption
        .EffectSplineEquidistantPointMode:
        return new fb_component_1.EffectSplineEquidistantPointMode();
      case fb_component_1.UnionEffectSplineCreateOption
        .EffectSplineWholeLineMode:
        return new fb_component_1.EffectSplineWholeLineMode();
      default:
        return;
    }
  }
  static ReadUnionEffectSplineCreateOption(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_component_1.UnionEffectSplineCreateOption
          .EffectSplineEquidistantPointMode:
          return FbEffectSplineEquidistantPointMode_1.FbEffectSplineEquidistantPointMode.Create(
            t,
          );
        case fb_component_1.UnionEffectSplineCreateOption
          .EffectSplineWholeLineMode:
          return FbEffectSplineWholeLineMode_1.FbEffectSplineWholeLineMode.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionEffectSplineCreateOptionHelper =
  UnionEffectSplineCreateOptionHelper;
//# sourceMappingURL=UnionEffectSplineCreateOptionHelper.js.map
