"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItemModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  BuffItemData_1 = require("./BuffItemData"),
  UseBuffItemRoleData_1 = require("./UseBuffItemRoleData");
class BuffItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.F0t = new Map()),
      (this.lnt = new Map()),
      (this.K4l = new Map()),
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
  NewBuffItemData(e, t, i) {
    t = new BuffItemData_1.BuffItemData(e, t, i);
    this.lnt.set(e, t);
  }
  GetBuffItemData(e) {
    return this.lnt.get(e);
  }
  GetBuffItemMap() {
    return this.lnt;
  }
  GetInCdBuffItemMap(e) {
    for (const i of this.lnt.values()) {
      var t;
      i.GetBuffItemRemainCdTime() <= 0 || ((t = i.ItemConfigId), e.set(t, i));
    }
  }
  ClearAllBuffItemData() {
    this.F0t.clear(), this.lnt.clear();
  }
  NewUseBuffItemRoleData(e, t, i, s, r, f, a, u) {
    e = new UseBuffItemRoleData_1.UseBuffItemRoleData(e, t, i, s, r, f, a, u);
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
  SetBuffItemCdTimeStamp(e, t, i) {
    var s = this.GetBuffItemData(e);
    s
      ? (s.SetEndCdTimeStamp(t), s.SetTotalCdTime(i))
      : this.NewBuffItemData(e, t, i);
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
  SetBuffEquipItem(e, t) {
    this.K4l.set(e, t);
  }
  IsEquippedBuffItem(e) {
    return !!this.K4l.get(e);
  }
  GetEquippedBuffsByRoleId(e, t = !1) {
    var i = new Array();
    for (const s of ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffEquipItemByRoleId(
      e,
    ))
      !this.IsEquippedBuffItem(s.ItemId) ||
        (t && !s.EnableInUI) ||
        i.push(...s.Buffs);
    return i;
  }
  GetEquippedBuffItemConfigByRoleId(e) {
    var t = new Array();
    for (const i of ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffEquipItemByRoleId(
      e,
    ))
      this.IsEquippedBuffItem(i.ItemId) && t.push(i);
    return t;
  }
}
exports.BuffItemModel = BuffItemModel;
//# sourceMappingURL=BuffItemModel.js.map
