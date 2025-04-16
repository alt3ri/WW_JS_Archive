"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  WeaponDefine_1 = require("./WeaponDefine"),
  WeaponInstance_1 = require("./WeaponInstance");
class WeaponModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Lko = new Map()),
      (this.Dko = new Map()),
      (this.Rko = 0),
      (this.BlueprintWeaponBreachLevel = 0),
      (this.BlueprintWeaponEquippedRoleId = 0),
      (this.Uko = (e, t) => t.QualityId - e.QualityId);
  }
  AddWeaponData(e) {
    var e = this.CreateWeaponInstance(e),
      t = e.GetIncId(),
      n = (this.Lko.set(t, e), e.HasRole());
    n &&
      ((n = e.GetRoleId()), this.Dko.set(n, t), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Role", 43, "武器设置", ["roleId", n], ["incId", t]);
  }
  RemoveWeaponData(e) {
    var t = this.Lko.get(e);
    t &&
      (t.HasRole() && ((t = t.GetRoleId()), this.Dko.delete(t)),
      this.Lko.delete(e));
  }
  CreateWeaponInstance(e) {
    var t = new WeaponInstance_1.WeaponInstance();
    return t.SetWeaponItem(e), t;
  }
  SetWeaponLevelData(e, t, n) {
    e = this.Lko.get(e);
    e && (e.SetExp(t), e.SetLevel(n));
  }
  SetWeaponBreachData(e, t) {
    e = this.Lko.get(e);
    e && e.SetBreachLevel(t);
  }
  SetWeaponResonanceData(e, t) {
    e = this.Lko.get(e);
    e && e.SetResonanceLevel(t);
  }
  GetWeaponLevelById(e) {
    e = this.Lko.get(e);
    return e ? e.GetLevel() : 0;
  }
  GetWeaponDataByRoleDataId(e, t = !0) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e, t);
    return t.IsTrialRole() || t.IsOnlineRole()
      ? t.GetWeaponData()
      : void 0 !== (t = this.GetWeaponInstanceByRoleId(e))
        ? t
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Role", 58, "获取不到武器数据", ["roleDataId", e])
          );
  }
  GetWeaponIdByRoleDataId(e) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    return t
      ? t.IsTrialRole()
        ? t.GetWeaponData().GetItemId()
        : void 0 !== (t = this.GetWeaponInstanceByRoleId(e))
          ? t.GetItemId()
          : void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error("Role", 58, "获取不到武器数据", ["roleDataId", e])
            )
      : ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)
          .InitWeaponItemId;
  }
  GetWeaponInstanceByRoleId(e) {
    e = this.Dko.get(e);
    if (e) return this.Lko.get(e);
  }
  GetWeaponDataByIncId(e) {
    return this.Lko.get(e);
  }
  WeaponRoleLoadEquip(e) {
    if (e) {
      for (const o of e) {
        var t = o.mjn,
          n = o.djn;
        this.ChangeWeaponEquip(n, t);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EquipWeapon);
    }
  }
  WeaponLevelUpResponse(e) {
    this.SetWeaponLevelData(e.w5n, e.gjn, e.Cjn),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeaponLevelUp),
      this.wOo(e._vs);
  }
  wOo(e) {
    var t = [];
    for (const o of Object.keys(e)) {
      var n = [{ IncId: 0, ItemId: Number.parseInt(o) }, e[o]];
      t.push(n);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.WeaponLevelUpReceiveItem,
      t,
    );
  }
  ChangeWeaponEquip(e, t) {
    var n = this.Lko.get(e),
      o = n.GetRoleId();
    0 < o &&
      (this.Dko.set(o, 0), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Role", 43, "武器设置", ["lastRoleId", o], ["incId", 0]),
      n.SetRoleId(t),
      0 < t &&
        (this.Dko.set(t, e), Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("Role", 43, "武器设置", ["roleId", t], ["incId", e]);
  }
  GetCurveValue(e, t, n, o) {
    return (
      t *
      ((ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponPropertyGrowthConfig(
        e,
        n,
        o,
      )?.CurveValue ?? 0) /
        WeaponDefine_1.WEAPON_CURVE_RATION)
    );
  }
  GetWeaponListFromReplace(e) {
    var t = [];
    for (const n of ModelManager_1.ModelManager.InventoryModel.GetWeaponItemDataList())
      this.GetWeaponDataByIncId(n.GetUniqueId()).GetWeaponConfig()
        .WeaponType === e && t.push(n);
    return t;
  }
  GetResonanceMaterialList(e) {
    var t = ModelManager_1.ModelManager.InventoryModel,
      n = this.GetWeaponDataByIncId(e),
      o = n.GetItemId(),
      r = [];
    for (const a of t.GetItemDataBaseByMainType(2))
      a.GetConfigId() !== o ||
        a.GetUniqueId() === e ||
        this.GetWeaponDataByIncId(a.GetUniqueId()).HasRole() ||
        r.push(a);
    n = n.GetResonanceConfig().AlternativeConsume;
    if (n && 0 < n.length)
      for (const i of n)
        for (const s of t.GetItemDataBaseByConfigId(i)) r.push(s);
    return r;
  }
  GetCanChangeMaterialList(e) {
    var t = new Map(),
      n = ConfigCommon_1.ConfigCommon.ToList(
        ConfigManager_1.ConfigManager.ItemConfig.GetConfigListByItemType(4),
      );
    n.sort(this.Uko);
    let o = e;
    for (const i of n) {
      var r,
        a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(
          i.Id,
        );
      o >= a.BasicExp &&
        ((r = Math.floor(o / a.BasicExp)), t.set(i.Id, r), (o %= a.BasicExp));
    }
    return t;
  }
  GetResonanceNeedMoney(t, n, o) {
    let r = 0;
    for (let e = n; e < o; e++)
      r += ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
        t,
        e,
      ).GoldConsume;
    return r;
  }
  GetWeaponBreachMaxLevel(e) {
    var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreachList(e),
      n = t.length;
    let o = 0;
    for (let e = 0; e < n; e++) {
      var r = t[e];
      r.Level > o && (o = r.Level);
    }
    return o;
  }
  GetWeaponItemBaseExp(e) {
    if (4 === e.GetType()) {
      const t =
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(
          e.GetConfigId(),
        );
      return t.BasicExp;
    }
    const t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponQualityInfo(
      e.GetQuality(),
    );
    return t.BasicExp;
  }
  GetWeaponConfigDescParams(e, t) {
    var n,
      o = [];
    for (const r of e.DescParams)
      r &&
        ((n = t >= r.ArrayString.length ? r.ArrayString.length : t),
        (n = r.ArrayString[n - 1]),
        o.push(n));
    return o;
  }
  GetCurSelectViewName() {
    return this.Rko;
  }
  SetCurSelectViewName(e) {
    this.Rko = e;
  }
  IsWeaponUsedByUncommonRole(e) {
    e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    if (e) {
      e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
        e.GetRoleId(),
      );
      if (e && 1 !== e.GetRoleConfig().RoleType) return !0;
    }
    return !1;
  }
  CanItemUseAsExpItem(e) {
    if (2 === e.GetType() && 0 < e.GetUniqueId()) {
      e = this.GetWeaponDataByIncId(e.GetUniqueId());
      if (e.HasRole() || 5 <= e.GetItemConfig().QualityId) return !1;
    }
    return !0;
  }
  IsWeaponHighQuality(e) {
    return (
      ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponQualityCheck() <
      e.GetItemConfig().QualityId
    );
  }
  IsWeaponHighLevel(e) {
    return (
      ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelCheck() <
      e.GetLevel()
    );
  }
  IsWeaponHighResonanceLevel(e) {
    return (
      ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceCheck() <
      e.GetResonanceLevel()
    );
  }
  HasWeaponResonance(e) {
    return 1 < e.GetResonanceLevel();
  }
  GetWeaponItemExp(e, t) {
    return e && 0 < e
      ? this.GetWeaponDataByIncId(e).GetMaterialExp()
      : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(t)
          .BasicExp;
  }
  GetWeaponItemExpCost(e, t) {
    return e && 0 < e
      ? this.GetWeaponDataByIncId(e).GetMaterialCost()
      : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(t)
          .Cost;
  }
  GetWeaponExpItemListCost(e) {
    let t = 0;
    for (const o of e) {
      if (0 === o[0].ItemId) break;
      var n = this.GetWeaponItemExpCost(o[0].IncId, o[0].ItemId);
      t += n * o[1];
    }
    return t;
  }
  GetWeaponExpItemList(e) {
    var t = [];
    for (const n of ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByMainType(
      2,
    ))
      this.CanItemUseAsExpItem(n) && e !== n.GetUniqueId() && t.push(n);
    return t;
  }
  GetWeaponExpItemListUseToAuto(e) {
    var t = [];
    for (const o of this.GetWeaponExpItemList(e))
      if (!o.GetIsLock()) {
        if (2 === o.GetType()) {
          var n = this.GetWeaponDataByIncId(o.GetUniqueId());
          if (this.IsWeaponHighResonanceLevel(n)) continue;
          if (this.IsWeaponHighLevel(n)) continue;
        }
        t.push(o);
      }
    return this.GetWeaponExpItemListWithSort(t), t;
  }
  GetWeaponExpItemListWithSort(e) {
    var t = new Set();
    return (
      t.add(2),
      t.add(10),
      t.add(8),
      ModelManager_1.ModelManager.SortModel.SortDataByData(e, 2, t, !0),
      e
    );
  }
  AutoAddExpItem(e, t, n, o) {
    let r = e;
    var a = [];
    for (const u of n) {
      if (t <= a.length || r <= 0) break;
      var i = o(u),
        s = Math.ceil(r / i),
        f = u.Count - u.SelectedCount,
        s = u.SelectedCount + Math.min(s, f);
      0 < s &&
        ((f = {
          IncId: u.IncId,
          ItemId: u.ItemId,
          Count: u.Count,
          SelectedCount: s,
        }),
        a.push(f),
        (r -= s * i));
    }
    return a;
  }
  CheckSatisfyExp(e, t, n, o) {
    let r = e,
      a = 0;
    for (const u of n) {
      if (a >= t || r <= 0) break;
      var i = o(u),
        s = Math.ceil(r / i),
        f = u.Count - u.SelectedCount,
        s = u.SelectedCount + Math.min(s, f);
      0 < s && (a++, (r -= s * i));
    }
    return r <= 0;
  }
  AutoAddExpItemEx(e, t, n) {
    let o = e;
    for (const s of t) {
      if (o <= 0) break;
      var r = n(s),
        a = Math.ceil(o / r),
        i = s.Count - s.SelectedCount,
        a = s.SelectedCount + Math.min(a, i);
      (s.SelectedCount = a), (o -= a * r);
    }
  }
  GetWeaponAttributeParamList(e) {
    return [
      { PropId: e.FirstPropId, CurveId: e.FirstCurve },
      { PropId: e.SecondPropId, CurveId: e.SecondCurve },
    ];
  }
  GetWeaponBreachState(e) {
    var t,
      n,
      e = this.GetWeaponDataByIncId(e),
      o = e.GetBreachConfig();
    if (
      !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
        o.ConditionId.toString(),
        void 0,
        !0,
      )
    )
      return 3;
    for ([t, n] of e.GetBreachConsume())
      if (
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t) < n
      )
        return 0;
    e = o.GoldConsume;
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      ItemDefines_1.EItemId.Gold,
    ) < e
      ? 1
      : 2;
  }
  RedDotWeaponBreachCondition(e) {
    e = this.GetWeaponInstanceByRoleId(e);
    return (
      !(void 0 === e || !e.CanGoBreach()) &&
      2 === this.GetWeaponBreachState(e.GetIncId())
    );
  }
}
exports.WeaponModel = WeaponModel;
//# sourceMappingURL=WeaponModel.js.map
