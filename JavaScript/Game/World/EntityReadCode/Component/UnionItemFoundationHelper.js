"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionItemFoundationHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbBuildingBlockFoundation_1 = require("./FbBuildingBlockFoundation"),
  FbCategoryMatchingFoundation_1 = require("./FbCategoryMatchingFoundation"),
  FbPulseDeviceFoundation_1 = require("./FbPulseDeviceFoundation"),
  FbRangeAdsorptionFoundation_1 = require("./FbRangeAdsorptionFoundation");
class UnionItemFoundationHelper {
  static GetUnionItemFoundationObject(n) {
    switch (n) {
      case fb_component_1.UnionItemFoundation.BuildingBlockFoundation:
        return new fb_component_1.BuildingBlockFoundation();
      case fb_component_1.UnionItemFoundation.CategoryMatchingFoundation:
        return new fb_component_1.CategoryMatchingFoundation();
      case fb_component_1.UnionItemFoundation.PulseDeviceFoundation:
        return new fb_component_1.PulseDeviceFoundation();
      case fb_component_1.UnionItemFoundation.RangeAdsorptionFoundation:
        return new fb_component_1.RangeAdsorptionFoundation();
      default:
        return;
    }
  }
  static ReadUnionItemFoundation(n, o) {
    if (void 0 !== o)
      switch (n) {
        case fb_component_1.UnionItemFoundation.BuildingBlockFoundation:
          return FbBuildingBlockFoundation_1.FbBuildingBlockFoundation.Create(
            o,
          );
        case fb_component_1.UnionItemFoundation.CategoryMatchingFoundation:
          return FbCategoryMatchingFoundation_1.FbCategoryMatchingFoundation.Create(
            o,
          );
        case fb_component_1.UnionItemFoundation.PulseDeviceFoundation:
          return FbPulseDeviceFoundation_1.FbPulseDeviceFoundation.Create(o);
        case fb_component_1.UnionItemFoundation.RangeAdsorptionFoundation:
          return FbRangeAdsorptionFoundation_1.FbRangeAdsorptionFoundation.Create(
            o,
          );
        default:
          return;
      }
  }
}
exports.UnionItemFoundationHelper = UnionItemFoundationHelper;
//# sourceMappingURL=UnionItemFoundationHelper.js.map
