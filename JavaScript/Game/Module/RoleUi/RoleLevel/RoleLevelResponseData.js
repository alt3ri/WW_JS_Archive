"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleLevelResponseData = void 0);
const RoleDefine_1 = require("../RoleDefine");
class RoleLevelResponseData {
  constructor() {
    (this.xuo = 0), (this.wuo = new RoleLevelUpViewResponseData());
  }
  UpdateRoleLevelUpViewResponse(e) {
    this.wuo = e;
  }
  CalculateItemList(e, t) {
    for (const i of this.wuo.O9n)
      if (i.Z4n === e)
        return (this.xuo = e), (i.e5n = t ? i.e5n + 1 : i.e5n - 1), !0;
    if (!t) return !1;
    this.xuo = e;
    var s = new RoleDefine_1.ArrayIntInt();
    return (s.Z4n = e), (s.e5n = 1), this.wuo.O9n.push(s), !0;
  }
  SetSelectedItemId(e) {
    this.xuo = e;
  }
  GetItemList() {
    return this.wuo.O9n;
  }
  ClearItemList() {
    this.wuo.O9n = [];
  }
  GetItemCountByItemId(e) {
    for (const t of this.wuo.O9n) if (t.Z4n === e) return t.e5n;
    return 0;
  }
  GetCostList() {
    return this.wuo.kHn;
  }
  GetOverFlowMap() {
    var e = new Map();
    for (const t of this.wuo.VHn) e.set(t.Z4n, t.e5n);
    return e;
  }
  GetAddExp() {
    return this.wuo.HHn;
  }
  GetFinalProp() {
    var e = new Map();
    for (const t of this.wuo.NHn) e.set(t.Z4n, t.e5n);
    return e;
  }
  GetLevelExp(e) {
    for (const t of this.wuo.jHn) if (t.Z4n === e) return t.e5n;
    return 0;
  }
  GetSelectedItemId() {
    return this.xuo;
  }
}
exports.RoleLevelResponseData = RoleLevelResponseData;
class RoleLevelUpViewResponseData {
  constructor() {
    (this.F6n = 1),
      (this.jHn = void 0),
      (this.U8n = 0),
      (this.HHn = 0),
      (this.NHn = void 0),
      (this.kHn = void 0),
      (this.VHn = void 0),
      (this.O9n = void 0);
  }
}
//# sourceMappingURL=RoleLevelResponseData.js.map
