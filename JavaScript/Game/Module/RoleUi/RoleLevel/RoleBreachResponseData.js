"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleBreachResponseData = void 0);
class RoleBreachResponseData {
  UpdateRoleBreakThroughViewResponse(e) {
    this.Iuo = e;
  }
  GetLevelLimit() {
    return this.Iuo.AHn;
  }
  GetUnLockSkillId() {
    return this.Iuo.UHn;
  }
  GetFinalProp() {
    var e = new Map();
    for (const t of this.Iuo.RHn) e.set(t.j4n, t.W4n);
    return e;
  }
  GetCostList() {
    return this.Iuo.xHn;
  }
  GetRewardList() {
    return this.Iuo.PHn;
  }
}
exports.RoleBreachResponseData = RoleBreachResponseData;
class RoleBreakThroughViewResponse {
  constructor() {
    (this.AHn = 0),
      (this.UHn = 0),
      (this.RHn = void 0),
      (this.xHn = void 0),
      (this.PHn = void 0);
  }
}
//# sourceMappingURL=RoleBreachResponseData.js.map
