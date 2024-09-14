"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleBreachResponseData = void 0);
class RoleBreachResponseData {
  UpdateRoleBreakThroughViewResponse(e) {
    this.Iuo = e;
  }
  GetLevelLimit() {
    return this.Iuo.GHn;
  }
  GetUnLockSkillId() {
    return this.Iuo.OHn;
  }
  GetFinalProp() {
    var e = new Map();
    for (const t of this.Iuo.NHn) e.set(t.Z4n, t.e5n);
    return e;
  }
  GetCostList() {
    return this.Iuo.kHn;
  }
  GetRewardList() {
    return this.Iuo.FHn;
  }
}
exports.RoleBreachResponseData = RoleBreachResponseData;
class RoleBreakThroughViewResponse {
  constructor() {
    (this.GHn = 0),
      (this.OHn = 0),
      (this.NHn = void 0),
      (this.kHn = void 0),
      (this.FHn = void 0);
  }
}
//# sourceMappingURL=RoleBreachResponseData.js.map
