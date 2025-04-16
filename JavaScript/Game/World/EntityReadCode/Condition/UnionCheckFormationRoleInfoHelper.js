"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCheckFormationRoleInfoHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbFeatureCollectionLevel_1 = require("./FbFeatureCollectionLevel"),
  FbHasEquippedVision_1 = require("./FbHasEquippedVision"),
  FbHasUpgradableVision_1 = require("./FbHasUpgradableVision"),
  FbRoleLevel_1 = require("./FbRoleLevel"),
  FbWeaponLevel_1 = require("./FbWeaponLevel");
class UnionCheckFormationRoleInfoHelper {
  static GetUnionCheckFormationRoleInfoObject(e) {
    switch (e) {
      case fb_condition_1.UnionCheckFormationRoleInfo.FeatureCollectionLevel:
        return new fb_condition_1.FeatureCollectionLevel();
      case fb_condition_1.UnionCheckFormationRoleInfo.HasEquippedVision:
        return new fb_condition_1.HasEquippedVision();
      case fb_condition_1.UnionCheckFormationRoleInfo.HasUpgradableVision:
        return new fb_condition_1.HasUpgradableVision();
      case fb_condition_1.UnionCheckFormationRoleInfo.RoleLevel:
        return new fb_condition_1.RoleLevel();
      case fb_condition_1.UnionCheckFormationRoleInfo.WeaponLevel:
        return new fb_condition_1.WeaponLevel();
      default:
        return;
    }
  }
  static ReadUnionCheckFormationRoleInfo(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_condition_1.UnionCheckFormationRoleInfo.FeatureCollectionLevel:
          return FbFeatureCollectionLevel_1.FbFeatureCollectionLevel.Create(n);
        case fb_condition_1.UnionCheckFormationRoleInfo.HasEquippedVision:
          return FbHasEquippedVision_1.FbHasEquippedVision.Create(n);
        case fb_condition_1.UnionCheckFormationRoleInfo.HasUpgradableVision:
          return FbHasUpgradableVision_1.FbHasUpgradableVision.Create(n);
        case fb_condition_1.UnionCheckFormationRoleInfo.RoleLevel:
          return FbRoleLevel_1.FbRoleLevel.Create(n);
        case fb_condition_1.UnionCheckFormationRoleInfo.WeaponLevel:
          return FbWeaponLevel_1.FbWeaponLevel.Create(n);
        default:
          return;
      }
  }
}
exports.UnionCheckFormationRoleInfoHelper = UnionCheckFormationRoleInfoHelper;
//# sourceMappingURL=UnionCheckFormationRoleInfoHelper.js.map
