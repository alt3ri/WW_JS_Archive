"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionRangeHelper = void 0);
const fb_shape_1 = require("../../../../Game/World/EntityFb/fb-shape"),
  FbBoxRange_1 = require("./FbBoxRange"),
  FbCircleRange_1 = require("./FbCircleRange"),
  FbCylinder_1 = require("./FbCylinder");
class UnionRangeHelper {
  static GetUnionRangeObject(e) {
    switch (e) {
      case fb_shape_1.UnionRange.BoxRange:
        return new fb_shape_1.BoxRange();
      case fb_shape_1.UnionRange.CircleRange:
        return new fb_shape_1.CircleRange();
      case fb_shape_1.UnionRange.Cylinder:
        return new fb_shape_1.Cylinder();
      default:
        return;
    }
  }
  static ReadUnionRange(e, r) {
    if (void 0 !== r)
      switch (e) {
        case fb_shape_1.UnionRange.BoxRange:
          return FbBoxRange_1.FbBoxRange.Create(r);
        case fb_shape_1.UnionRange.CircleRange:
          return FbCircleRange_1.FbCircleRange.Create(r);
        case fb_shape_1.UnionRange.Cylinder:
          return FbCylinder_1.FbCylinder.Create(r);
        default:
          return;
      }
  }
}
exports.UnionRangeHelper = UnionRangeHelper;
//# sourceMappingURL=UnionRangeHelper.js.map
