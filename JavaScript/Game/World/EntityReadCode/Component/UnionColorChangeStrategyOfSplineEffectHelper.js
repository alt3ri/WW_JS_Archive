"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionColorChangeStrategyOfSplineEffectHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbColorChangeStrategyOfRGB_1 = require("./FbColorChangeStrategyOfRGB");
class UnionColorChangeStrategyOfSplineEffectHelper {
  static GetUnionColorChangeStrategyOfSplineEffectObject(e) {
    if (
      e ===
      fb_component_1.UnionColorChangeStrategyOfSplineEffect
        .ColorChangeStrategyOfRGB
    )
      return new fb_component_1.ColorChangeStrategyOfRGB();
  }
  static ReadUnionColorChangeStrategyOfSplineEffect(e, t) {
    return void 0 !== t &&
      e ===
        fb_component_1.UnionColorChangeStrategyOfSplineEffect
          .ColorChangeStrategyOfRGB
      ? FbColorChangeStrategyOfRGB_1.FbColorChangeStrategyOfRGB.Create(t)
      : void 0;
  }
}
exports.UnionColorChangeStrategyOfSplineEffectHelper =
  UnionColorChangeStrategyOfSplineEffectHelper;
//# sourceMappingURL=UnionColorChangeStrategyOfSplineEffectHelper.js.map
