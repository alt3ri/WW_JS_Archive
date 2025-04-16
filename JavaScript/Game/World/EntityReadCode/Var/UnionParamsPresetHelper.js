"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionParamsPresetHelper = void 0);
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var"),
  FbDecalParams_1 = require("./FbDecalParams"),
  FbRushWarningEffectParams_1 = require("./FbRushWarningEffectParams");
class UnionParamsPresetHelper {
  static GetUnionParamsPresetObject(e) {
    switch (e) {
      case fb_var_1.UnionParamsPreset.DecalParams:
        return new fb_var_1.DecalParams();
      case fb_var_1.UnionParamsPreset.RushWarningEffectParams:
        return new fb_var_1.RushWarningEffectParams();
      default:
        return;
    }
  }
  static ReadUnionParamsPreset(e, r) {
    if (void 0 !== r)
      switch (e) {
        case fb_var_1.UnionParamsPreset.DecalParams:
          return FbDecalParams_1.FbDecalParams.Create(r);
        case fb_var_1.UnionParamsPreset.RushWarningEffectParams:
          return FbRushWarningEffectParams_1.FbRushWarningEffectParams.Create(
            r,
          );
        default:
          return;
      }
  }
}
exports.UnionParamsPresetHelper = UnionParamsPresetHelper;
//# sourceMappingURL=UnionParamsPresetHelper.js.map
