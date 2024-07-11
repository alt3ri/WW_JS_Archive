"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFilter = void 0);
const CommonFilter_1 = require("./CommonFilter");
class RoleFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments),
      (this.GetElementConfigId = (t) => {
        return t.GetElementInfo().Id;
      }),
      (this.GetWeaponType = (t) => {
        return t.GetRoleConfig().WeaponType;
      }),
      (this.GetRoleTagIdList = (t) => {
        return t.GetRoleConfig().Tag;
      });
  }
  OnInitFilterMap() {
    this.FilterMap.set(1, this.GetElementConfigId),
      this.FilterMap.set(2, this.GetWeaponType),
      this.FilterMap.set(27, this.GetRoleTagIdList);
  }
}
exports.RoleFilter = RoleFilter;
//# sourceMappingURL=RoleFilter.js.map
