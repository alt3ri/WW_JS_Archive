"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionInteractAdditionalInfoHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbFishingPointAdditionalInfo_1 = require("./FbFishingPointAdditionalInfo");
class UnionInteractAdditionalInfoHelper {
  static GetUnionInteractAdditionalInfoObject(n) {
    if (
      n ===
      fb_component_1.UnionInteractAdditionalInfo.FishingPointAdditionalInfo
    )
      return new fb_component_1.FishingPointAdditionalInfo();
  }
  static ReadUnionInteractAdditionalInfo(n, o) {
    return void 0 !== o &&
      n ===
        fb_component_1.UnionInteractAdditionalInfo.FishingPointAdditionalInfo
      ? FbFishingPointAdditionalInfo_1.FbFishingPointAdditionalInfo.Create(o)
      : void 0;
  }
}
exports.UnionInteractAdditionalInfoHelper = UnionInteractAdditionalInfoHelper;
//# sourceMappingURL=UnionInteractAdditionalInfoHelper.js.map
