"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionRoleLevelHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbSpecifyRoleLevel_1 = require("./FbSpecifyRoleLevel");
class UnionRoleLevelHelper {
  static GetUnionRoleLevelObject(e) {
    if (e === fb_condition_1.UnionRoleLevel.SpecifyRoleLevel)
      return new fb_condition_1.SpecifyRoleLevel();
  }
  static ReadUnionRoleLevel(e, o) {
    return void 0 !== o && e === fb_condition_1.UnionRoleLevel.SpecifyRoleLevel
      ? FbSpecifyRoleLevel_1.FbSpecifyRoleLevel.Create(o)
      : void 0;
  }
}
exports.UnionRoleLevelHelper = UnionRoleLevelHelper;
//# sourceMappingURL=UnionRoleLevelHelper.js.map
