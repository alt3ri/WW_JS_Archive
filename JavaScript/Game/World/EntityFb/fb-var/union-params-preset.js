"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionParamsPreset =
    exports.unionToUnionParamsPreset =
    exports.UnionParamsPreset =
      void 0);
const decal_params_js_1 = require("../fb-var/decal-params.js"),
  rush_warning_effect_params_js_1 = require("../fb-var/rush-warning-effect-params.js");
var UnionParamsPreset;
function unionToUnionParamsPreset(r, e) {
  switch (UnionParamsPreset[r]) {
    case "NONE":
      return;
    case "DecalParams":
      return e(new decal_params_js_1.DecalParams());
    case "RushWarningEffectParams":
      return e(new rush_warning_effect_params_js_1.RushWarningEffectParams());
    default:
      return;
  }
}
function unionListToUnionParamsPreset(r, e, a) {
  switch (UnionParamsPreset[r]) {
    case "NONE":
      return;
    case "DecalParams":
      return e(a, new decal_params_js_1.DecalParams());
    case "RushWarningEffectParams":
      return e(
        a,
        new rush_warning_effect_params_js_1.RushWarningEffectParams(),
      );
    default:
      return;
  }
}
!(function (r) {
  (r[(r.NONE = 0)] = "NONE"),
    (r[(r.DecalParams = 1)] = "DecalParams"),
    (r[(r.RushWarningEffectParams = 2)] = "RushWarningEffectParams");
})(
  (UnionParamsPreset =
    exports.UnionParamsPreset || (exports.UnionParamsPreset = {})),
),
  (exports.unionToUnionParamsPreset = unionToUnionParamsPreset),
  (exports.unionListToUnionParamsPreset = unionListToUnionParamsPreset);
//# sourceMappingURL=union-params-preset.js.map
