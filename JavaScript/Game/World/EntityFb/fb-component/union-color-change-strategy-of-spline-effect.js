"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionColorChangeStrategyOfSplineEffect =
    exports.unionToUnionColorChangeStrategyOfSplineEffect =
    exports.UnionColorChangeStrategyOfSplineEffect =
      void 0);
const color_change_strategy_of_rgb_js_1 = require("../fb-component/color-change-strategy-of-rgb.js");
var UnionColorChangeStrategyOfSplineEffect;
function unionToUnionColorChangeStrategyOfSplineEffect(e, o) {
  switch (UnionColorChangeStrategyOfSplineEffect[e]) {
    case "NONE":
      return;
    case "ColorChangeStrategyOfRGB":
      return o(
        new color_change_strategy_of_rgb_js_1.ColorChangeStrategyOfRGB(),
      );
    default:
      return;
  }
}
function unionListToUnionColorChangeStrategyOfSplineEffect(e, o, t) {
  switch (UnionColorChangeStrategyOfSplineEffect[e]) {
    case "NONE":
      return;
    case "ColorChangeStrategyOfRGB":
      return o(
        t,
        new color_change_strategy_of_rgb_js_1.ColorChangeStrategyOfRGB(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.ColorChangeStrategyOfRGB = 1)] = "ColorChangeStrategyOfRGB");
})(
  (UnionColorChangeStrategyOfSplineEffect =
    exports.UnionColorChangeStrategyOfSplineEffect ||
    (exports.UnionColorChangeStrategyOfSplineEffect = {})),
),
  (exports.unionToUnionColorChangeStrategyOfSplineEffect =
    unionToUnionColorChangeStrategyOfSplineEffect),
  (exports.unionListToUnionColorChangeStrategyOfSplineEffect =
    unionListToUnionColorChangeStrategyOfSplineEffect);
//# sourceMappingURL=union-color-change-strategy-of-spline-effect.js.map
