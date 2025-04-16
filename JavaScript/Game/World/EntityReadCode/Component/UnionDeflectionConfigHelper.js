"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionDeflectionConfigHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbDeflectionCustom_1 = require("./FbDeflectionCustom"),
  FbDeflectionRandom_1 = require("./FbDeflectionRandom");
class UnionDeflectionConfigHelper {
  static GetUnionDeflectionConfigObject(e) {
    switch (e) {
      case fb_component_1.UnionDeflectionConfig.DeflectionCustom:
        return new fb_component_1.DeflectionCustom();
      case fb_component_1.UnionDeflectionConfig.DeflectionRandom:
        return new fb_component_1.DeflectionRandom();
      default:
        return;
    }
  }
  static ReadUnionDeflectionConfig(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_component_1.UnionDeflectionConfig.DeflectionCustom:
          return FbDeflectionCustom_1.FbDeflectionCustom.Create(n);
        case fb_component_1.UnionDeflectionConfig.DeflectionRandom:
          return FbDeflectionRandom_1.FbDeflectionRandom.Create(n);
        default:
          return;
      }
  }
}
exports.UnionDeflectionConfigHelper = UnionDeflectionConfigHelper;
//# sourceMappingURL=UnionDeflectionConfigHelper.js.map
