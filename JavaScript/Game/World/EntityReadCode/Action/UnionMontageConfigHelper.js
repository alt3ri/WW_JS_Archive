"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionMontageConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbMontageAsset_1 = require("./FbMontageAsset"),
  FbMontageRegistered_1 = require("./FbMontageRegistered");
class UnionMontageConfigHelper {
  static GetUnionMontageConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionMontageConfig.MontageAsset:
        return new fb_action_1.MontageAsset();
      case fb_action_1.UnionMontageConfig.MontageRegistered:
        return new fb_action_1.MontageRegistered();
      default:
        return;
    }
  }
  static ReadUnionMontageConfig(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionMontageConfig.MontageAsset:
          return FbMontageAsset_1.FbMontageAsset.Create(t);
        case fb_action_1.UnionMontageConfig.MontageRegistered:
          return FbMontageRegistered_1.FbMontageRegistered.Create(t);
        default:
          return;
      }
  }
}
exports.UnionMontageConfigHelper = UnionMontageConfigHelper;
//# sourceMappingURL=UnionMontageConfigHelper.js.map
