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
    for (const i of this.wuo.U9n)
      if (i.j4n === e)
        return (this.xuo = e), (i.W4n = t ? i.W4n + 1 : i.W4n - 1), !0;
    if (!t) return !1;
    this.xuo = e;
    var s = new RoleDefine_1.ArrayIntInt();
    return (s.j4n = e), (s.W4n = 1), this.wuo.U9n.push(s), !0;
  }
  SetSelectedItemId(e) {
    this.xuo = e;
  }
  GetItemList() {
    return this.wuo.U9n;
  }
  ClearItemList() {
    this.wuo.U9n = [];
  }
  GetItemCountByItemId(e) {
    for (const t of this.wuo.U9n) if (t.j4n === e) return t.W4n;
    return 0;
  }
  GetCostList() {
    return this.wuo.xHn;
  }
  GetOverFlowMap() {
    var e = new Map();
    for (const t of this.wuo.BHn) e.set(t.j4n, t.W4n);
    return e;
  }
  GetAddExp() {
    return this.wuo.wHn;
  }
  GetFinalProp() {
    var e = new Map();
    for (const t of this.wuo.RHn) e.set(t.j4n, t.W4n);
    return e;
  }
  GetLevelExp(e) {
    for (const t of this.wuo.bHn) if (t.j4n === e) return t.W4n;
    return 0;
  }
  GetSelectedItemId() {
    return this.xuo;
  }
}
exports.RoleLevelResponseData = RoleLevelResponseData;
class RoleLevelUpViewResponseData {
  constructor() {
    (this.P6n = 1),
      (this.bHn = void 0),
      (this.M8n = 0),
      (this.wHn = 0),
      (this.RHn = void 0),
      (this.xHn = void 0),
      (this.BHn = void 0),
      (this.U9n = void 0);
  }
}
//# sourceMappingURL=RoleLevelResponseData.js.map
