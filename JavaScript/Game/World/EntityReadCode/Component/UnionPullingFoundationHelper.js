"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPullingFoundationHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbPullingCategoryMatchingFoundation_1 = require("./FbPullingCategoryMatchingFoundation");
class UnionPullingFoundationHelper {
  static GetUnionPullingFoundationObject(n) {
    if (
      n ===
      fb_component_1.UnionPullingFoundation.PullingCategoryMatchingFoundation
    )
      return new fb_component_1.PullingCategoryMatchingFoundation();
  }
  static ReadUnionPullingFoundation(n, o) {
    return void 0 !== o &&
      n ===
        fb_component_1.UnionPullingFoundation.PullingCategoryMatchingFoundation
      ? FbPullingCategoryMatchingFoundation_1.FbPullingCategoryMatchingFoundation.Create(
          o,
        )
      : void 0;
  }
}
exports.UnionPullingFoundationHelper = UnionPullingFoundationHelper;
//# sourceMappingURL=UnionPullingFoundationHelper.js.map
