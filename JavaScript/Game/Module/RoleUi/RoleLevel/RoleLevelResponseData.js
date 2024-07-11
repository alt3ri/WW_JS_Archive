"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleLevelResponseData = void 0);
const RoleDefine_1 = require("../RoleDefine");
class RoleLevelResponseData {
  constructor() {
    (this.q_o = 0), (this.G_o = new RoleLevelUpViewResponseData());
  }
  UpdateRoleLevelUpViewResponse(e) {
    this.G_o = e;
  }
  CalculateItemList(e, t) {
    for (const i of this.G_o.Y5n)
      if (i.Ckn === e)
        return (this.q_o = e), (i.gkn = t ? i.gkn + 1 : i.gkn - 1), !0;
    if (!t) return !1;
    this.q_o = e;
    var s = new RoleDefine_1.ArrayIntInt();
    return (s.Ckn = e), (s.gkn = 1), this.G_o.Y5n.push(s), !0;
  }
  SetSelectedItemId(e) {
    this.q_o = e;
  }
  GetItemList() {
    return this.G_o.Y5n;
  }
  ClearItemList() {
    this.G_o.Y5n = [];
  }
  GetItemCountByItemId(e) {
    for (const t of this.G_o.Y5n) if (t.Ckn === e) return t.gkn;
    return 0;
  }
  GetCostList() {
    return this.G_o.z8n;
  }
  GetOverFlowMap() {
    var e = new Map();
    for (const t of this.G_o.eVn) e.set(t.Ckn, t.gkn);
    return e;
  }
  GetAddExp() {
    return this.G_o.tVn;
  }
  GetFinalProp() {
    var e = new Map();
    for (const t of this.G_o.J8n) e.set(t.Ckn, t.gkn);
    return e;
  }
  GetLevelExp(e) {
    for (const t of this.G_o.iVn) if (t.Ckn === e) return t.gkn;
    return 0;
  }
  GetSelectedItemId() {
    return this.q_o;
  }
}
exports.RoleLevelResponseData = RoleLevelResponseData;
class RoleLevelUpViewResponseData {
  constructor() {
    (this.r3n = 1),
      (this.iVn = void 0),
      (this.k3n = 0),
      (this.tVn = 0),
      (this.J8n = void 0),
      (this.z8n = void 0),
      (this.eVn = void 0),
      (this.Y5n = void 0);
  }
}
//# sourceMappingURL=RoleLevelResponseData.js.map
