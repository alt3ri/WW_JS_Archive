"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItemModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  BuffItemData_1 = require("./BuffItemData"),
  UseBuffItemRoleData_1 = require("./UseBuffItemRoleData");
class BuffItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.F0t = new Map()),
      (this.lnt = new Map()),
      (this.V0t = 0),
      (this.H0t = void 0),
      (this.j0t = void 0),
      (this.W0t = 0),
      (this.K0t = (e) => {
        this.GetBuffItemRemainCdTime(this.W0t) <= 0 &&
          (this.j0t && this.j0t(), this.Q0t());
      });
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return this.ClearAllUseBuffItemRoleData(), this.ClearAllBuffItemData(), !0;
  }
  OnLeaveLevel() {
    return this.ClearAllUseBuffItemRoleData(), !0;
  }
  NewBuffItemData(e, t, s) {
    t = new BuffItemData_1.BuffItemData(e, t, s);
    this.lnt.set(e, t);
  }
  GetBuffItemData(e) {
    return this.lnt.get(e);
  }
  GetBuffItemMap() {
    return this.lnt;
  }
  GetInCdBuffItemMap(e) {
    for (const s of this.lnt.values()) {
      var t;
      s.GetBuffItemRemainCdTime() <= 0 || ((t = s.ItemConfigId), e.set(t, s));
    }
  }
  ClearAllBuffItemData() {
    this.F0t.clear(), this.lnt.clear();
  }
  NewUseBuffItemRoleData(e, t, s, i, r, f, m, u) {
    e = new UseBuffItemRoleData_1.UseBuffItemRoleData(e, t, s, i, r, f, m, u);
    this.F0t.set(t, e);
  }
  SetCurrentUseBuffItemId(e) {
    this.V0t = e;
  }
  GetCurrentUseBuffItemId() {
    return this.V0t;
  }
  GetAllUseBuffItemRole() {
    return this.F0t;
  }
  GetUseBuffItemRole(e) {
    return this.F0t.get(e);
  }
  GetUseItemRoleByRoleConfigId(e) {
    for (const t of this.F0t.values()) if (t.RoleConfigId === e) return t;
  }
  ClearAllUseBuffItemRoleData() {
    this.F0t.clear();
  }
  GetBuffItemRemainCdTime(e) {
    e = this.GetBuffItemData(e);
    return e ? e.GetBuffItemRemainCdTime() : 0;
  }
  GetBuffItemTotalCdTime(e) {
    e = this.GetBuffItemData(e);
    return e ? e.GetBuffItemTotalCdTime() : 0;
  }
  SetBuffItemCdTimeStamp(e, t, s) {
    var i = this.GetBuffItemData(e);
    i
      ? (i.SetEndCdTimeStamp(t), i.SetTotalCdTime(s))
      : this.NewBuffItemData(e, t, s);
  }
  SetBuffItemCdEndCallback(e, t) {
    this.GetBuffItemData(e) &&
      ((this.W0t = e),
      (this.j0t = t),
      (this.H0t = TimerSystem_1.TimerSystem.Forever(
        this.K0t,
        TimeUtil_1.TimeUtil.InverseMillisecond,
      )));
  }
  Q0t() {
    TimerSystem_1.TimerSystem.Has(this.H0t) &&
      TimerSystem_1.TimerSystem.Remove(this.H0t),
      (this.W0t = 0),
      (this.j0t = void 0),
      (this.H0t = void 0);
  }
}
exports.BuffItemModel = BuffItemModel;
//# sourceMappingURL=BuffItemModel.js.map
