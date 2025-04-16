"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCheckFormationRoleInfo =
    exports.unionToUnionCheckFormationRoleInfo =
    exports.UnionCheckFormationRoleInfo =
      void 0);
const feature_collection_level_js_1 = require("../fb-condition/feature-collection-level.js"),
  has_equipped_vision_js_1 = require("../fb-condition/has-equipped-vision.js"),
  has_upgradable_vision_js_1 = require("../fb-condition/has-upgradable-vision.js"),
  role_level_js_1 = require("../fb-condition/role-level.js"),
  weapon_level_js_1 = require("../fb-condition/weapon-level.js");
var UnionCheckFormationRoleInfo;
function unionToUnionCheckFormationRoleInfo(e, o) {
  switch (UnionCheckFormationRoleInfo[e]) {
    case "NONE":
      return;
    case "FeatureCollectionLevel":
      return o(new feature_collection_level_js_1.FeatureCollectionLevel());
    case "HasEquippedVision":
      return o(new has_equipped_vision_js_1.HasEquippedVision());
    case "HasUpgradableVision":
      return o(new has_upgradable_vision_js_1.HasUpgradableVision());
    case "RoleLevel":
      return o(new role_level_js_1.RoleLevel());
    case "WeaponLevel":
      return o(new weapon_level_js_1.WeaponLevel());
    default:
      return;
  }
}
function unionListToUnionCheckFormationRoleInfo(e, o, n) {
  switch (UnionCheckFormationRoleInfo[e]) {
    case "NONE":
      return;
    case "FeatureCollectionLevel":
      return o(n, new feature_collection_level_js_1.FeatureCollectionLevel());
    case "HasEquippedVision":
      return o(n, new has_equipped_vision_js_1.HasEquippedVision());
    case "HasUpgradableVision":
      return o(n, new has_upgradable_vision_js_1.HasUpgradableVision());
    case "RoleLevel":
      return o(n, new role_level_js_1.RoleLevel());
    case "WeaponLevel":
      return o(n, new weapon_level_js_1.WeaponLevel());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.FeatureCollectionLevel = 1)] = "FeatureCollectionLevel"),
    (e[(e.HasEquippedVision = 2)] = "HasEquippedVision"),
    (e[(e.HasUpgradableVision = 3)] = "HasUpgradableVision"),
    (e[(e.RoleLevel = 4)] = "RoleLevel"),
    (e[(e.WeaponLevel = 5)] = "WeaponLevel");
})(
  (UnionCheckFormationRoleInfo =
    exports.UnionCheckFormationRoleInfo ||
    (exports.UnionCheckFormationRoleInfo = {})),
),
  (exports.unionToUnionCheckFormationRoleInfo =
    unionToUnionCheckFormationRoleInfo),
  (exports.unionListToUnionCheckFormationRoleInfo =
    unionListToUnionCheckFormationRoleInfo);
//# sourceMappingURL=union-check-formation-role-info.js.map
