"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillResponseData = void 0);
class RoleSkillResponseData {
  constructor() {
    (this.Pmo = void 0), (this.xmo = void 0), (this.wmo = 0);
  }
  UpdateRoleSkillViewResponse(e, t, s) {
    (this.Pmo = e), (this.xmo = t), (this.wmo = s);
  }
  GetSkillId() {
    return this.wmo;
  }
  GetSkillEffect() {
    return this.Pmo;
  }
  GetNextLevelSkillEffect() {
    return this.xmo;
  }
}
exports.RoleSkillResponseData = RoleSkillResponseData;
//# sourceMappingURL=RoleSkillResponseData.js.map
