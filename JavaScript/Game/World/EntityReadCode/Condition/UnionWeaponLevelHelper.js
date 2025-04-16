"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionWeaponLevelHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbSpecifyRoleWeaponLevel_1 = require("./FbSpecifyRoleWeaponLevel");
class UnionWeaponLevelHelper {
  static GetUnionWeaponLevelObject(e) {
    if (e === fb_condition_1.UnionWeaponLevel.SpecifyRoleWeaponLevel)
      return new fb_condition_1.SpecifyRoleWeaponLevel();
  }
  static ReadUnionWeaponLevel(e, o) {
    return void 0 !== o &&
      e === fb_condition_1.UnionWeaponLevel.SpecifyRoleWeaponLevel
      ? FbSpecifyRoleWeaponLevel_1.FbSpecifyRoleWeaponLevel.Create(o)
      : void 0;
  }
}
exports.UnionWeaponLevelHelper = UnionWeaponLevelHelper;
//# sourceMappingURL=UnionWeaponLevelHelper.js.map
