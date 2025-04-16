"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionComparedAlertValueHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbCompareCustomAlertValue_1 = require("./FbCompareCustomAlertValue"),
  FbCompareMaxAlertValue_1 = require("./FbCompareMaxAlertValue"),
  FbCompareMinAlertValue_1 = require("./FbCompareMinAlertValue");
class UnionComparedAlertValueHelper {
  static GetUnionComparedAlertValueObject(e) {
    switch (e) {
      case fb_condition_1.UnionComparedAlertValue.CompareCustomAlertValue:
        return new fb_condition_1.CompareCustomAlertValue();
      case fb_condition_1.UnionComparedAlertValue.CompareMaxAlertValue:
        return new fb_condition_1.CompareMaxAlertValue();
      case fb_condition_1.UnionComparedAlertValue.CompareMinAlertValue:
        return new fb_condition_1.CompareMinAlertValue();
      default:
        return;
    }
  }
  static ReadUnionComparedAlertValue(e, r) {
    if (void 0 !== r)
      switch (e) {
        case fb_condition_1.UnionComparedAlertValue.CompareCustomAlertValue:
          return FbCompareCustomAlertValue_1.FbCompareCustomAlertValue.Create(
            r,
          );
        case fb_condition_1.UnionComparedAlertValue.CompareMaxAlertValue:
          return FbCompareMaxAlertValue_1.FbCompareMaxAlertValue.Create(r);
        case fb_condition_1.UnionComparedAlertValue.CompareMinAlertValue:
          return FbCompareMinAlertValue_1.FbCompareMinAlertValue.Create(r);
        default:
          return;
      }
  }
}
exports.UnionComparedAlertValueHelper = UnionComparedAlertValueHelper;
//# sourceMappingURL=UnionComparedAlertValueHelper.js.map
