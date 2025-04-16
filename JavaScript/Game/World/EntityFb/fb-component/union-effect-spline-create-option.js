"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionEffectSplineCreateOption =
    exports.unionToUnionEffectSplineCreateOption =
    exports.UnionEffectSplineCreateOption =
      void 0);
const effect_spline_equidistant_point_mode_js_1 = require("../fb-component/effect-spline-equidistant-point-mode.js"),
  effect_spline_whole_line_mode_js_1 = require("../fb-component/effect-spline-whole-line-mode.js");
var UnionEffectSplineCreateOption;
function unionToUnionEffectSplineCreateOption(e, n) {
  switch (UnionEffectSplineCreateOption[e]) {
    case "NONE":
      return;
    case "EffectSplineEquidistantPointMode":
      return n(
        new effect_spline_equidistant_point_mode_js_1.EffectSplineEquidistantPointMode(),
      );
    case "EffectSplineWholeLineMode":
      return n(
        new effect_spline_whole_line_mode_js_1.EffectSplineWholeLineMode(),
      );
    default:
      return;
  }
}
function unionListToUnionEffectSplineCreateOption(e, n, t) {
  switch (UnionEffectSplineCreateOption[e]) {
    case "NONE":
      return;
    case "EffectSplineEquidistantPointMode":
      return n(
        t,
        new effect_spline_equidistant_point_mode_js_1.EffectSplineEquidistantPointMode(),
      );
    case "EffectSplineWholeLineMode":
      return n(
        t,
        new effect_spline_whole_line_mode_js_1.EffectSplineWholeLineMode(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.EffectSplineEquidistantPointMode = 1)] =
      "EffectSplineEquidistantPointMode"),
    (e[(e.EffectSplineWholeLineMode = 2)] = "EffectSplineWholeLineMode");
})(
  (UnionEffectSplineCreateOption =
    exports.UnionEffectSplineCreateOption ||
    (exports.UnionEffectSplineCreateOption = {})),
),
  (exports.unionToUnionEffectSplineCreateOption =
    unionToUnionEffectSplineCreateOption),
  (exports.unionListToUnionEffectSplineCreateOption =
    unionListToUnionEffectSplineCreateOption);
//# sourceMappingURL=union-effect-spline-create-option.js.map
