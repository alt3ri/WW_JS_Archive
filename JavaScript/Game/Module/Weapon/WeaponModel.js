"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const WeaponDefine_1 = require("./WeaponDefine");
const WeaponInstance_1 = require("./WeaponInstance");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class WeaponModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.UOo = new Map()),
      (this.AOo = new Map()),
      (this.POo = 0),
      (this.BlueprintWeaponBreachLevel = 0),
      (this.xOo = (e, t) => t.QualityId - e.QualityId);
  }
  AddWeaponData(e) {
    var e = this.CreateWeaponInstance(e);
    const t = e.GetIncId();
    let n = (this.UOo.set(t, e), e.HasRole());
    n &&
      ((n = e.GetRoleId()), this.AOo.set(n, t), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Role", 44, "武器设置", ["roleId", n], ["incId", t]);
  }
  RemoveWeaponData(e) {
    let t = this.UOo.get(e);
    t &&
      (t.HasRole() && ((t = t.GetRoleId()), this.AOo.delete(t)),
      this.UOo.delete(e));
  }
  CreateWeaponInstance(e) {
    const t = new WeaponInstance_1.WeaponInstance();
    return t.SetWeaponItem(e), t;
  }
  SetWeaponLevelData(e, t, n) {
    e = this.UOo.get(e);
    e && (e.SetExp(t), e.SetLevel(n));
  }
  SetWeaponBreachData(e, t) {
    e = this.UOo.get(e);
    e && e.SetBreachLevel(t);
  }
  SetWeaponResonanceData(e, t) {
    e = this.UOo.get(e);
    e && e.SetResonanceLevel(t);
  }
  GetWeaponLevelById(e) {
    e = this.UOo.get(e);
    return e ? e.GetLevel() : 0;
  }
  GetWeaponDataByRoleDataId(e, t = !0) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e, t);
    return t.IsTrialRole() || t.IsOnlineRole()
      ? t.GetWeaponData()
      : (t = this.AOo.get(e))
        ? this.UOo.get(t)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Role", 59, "获取不到武器数据", ["roleDataId", e])
          );
  }
  GetWeaponIdByRoleDataId(e) {
    let t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    return t
      ? t.IsTrialRole()
        ? t.GetWeaponData().GetItemId()
        : (t = this.AOo.get(e))
          ? this.UOo.get(t)?.GetItemId()
          : void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error("Role", 59, "获取不到武器数据", ["roleDataId", e])
            )
      : ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)
          .InitWeaponItemId;
  }
  GetWeaponDataByIncId(e) {
    return this.UOo.get(e);
  }
  WeaponRoleLoadEquip(e) {
    for (const r of e.sort((e, t) => e.DVn - t.DVn)) {
      const t = r.DVn;
      const n = r.AVn;
      this.ChangeWeaponEquip(n, t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EquipWeapon);
  }
  WeaponLevelUpResponse(e) {
    this.SetWeaponLevelData(e.Ykn, e.RVn, e.UVn),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeaponLevelUp),
      this.qNo(e.Vms);
  }
  qNo(e) {
    const t = [];
    for (const r of Object.keys(e)) {
      const n = [{ IncId: 0, ItemId: Number.parseInt(r) }, e[r]];
      t.push(n);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.WeaponLevelUpReceiveItem,
      t,
    );
  }
  ChangeWeaponEquip(e, t) {
    const n = this.UOo.get(e);
    const r = n.GetRoleId();
    r > 0 &&
      (this.AOo.set(r, 0), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Role", 44, "武器设置", ["lastRoleId", r], ["incId", 0]),
      n.SetRoleId(t),
      t > 0 &&
        (this.AOo.set(t, e), Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("Role", 44, "武器设置", ["roleId", t], ["incId", e]);
  }
  GetCurveValue(e, t, n, r) {
    return (
      t *
      ((ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponPropertyGrowthConfig(
        e,
        n,
        r,
      )?.CurveValue ?? 0) /
        WeaponDefine_1.WEAPON_CURVE_RATION)
    );
  }
  GetWeaponListFromReplace(e) {
    const t = [];
    for (const n of ModelManager_1.ModelManager.InventoryModel.GetWeaponItemDataList())
      this.GetWeaponDataByIncId(n.GetUniqueId()).GetWeaponConfig()
        .WeaponType === e && t.push(n);
    return t;
  }
  GetResonanceMaterialList(e) {
    const t = ModelManager_1.ModelManager.InventoryModel;
    let n = this.GetWeaponDataByIncId(e);
    const r = n.GetItemId();
    const o = [];
    for (const a of t.GetItemDataBaseByMainType(2))
      a.GetConfigId() !== r ||
        a.GetUniqueId() === e ||
        this.GetWeaponDataByIncId(a.GetUniqueId()).HasRole() ||
        o.push(a);
    n = n.GetResonanceConfig().AlternativeConsume;
    if (n && n.length > 0)
      for (const i of n)
        for (const s of t.GetItemDataBaseByConfigId(i)) o.push(s);
    return o;
  }
  GetCanChangeMaterialList(e) {
    const t = new Map();
    const n = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.ItemConfig.GetConfigListByItemType(4),
    );
    n.sort(this.xOo);
    let r = e;
    for (const i of n) {
      var o;
      const a =
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(i.Id);
      r >= a.BasicExp &&
        ((o = Math.floor(r / a.BasicExp)), t.set(i.Id, o), (r %= a.BasicExp));
    }
    return t;
  }
  GetResonanceNeedMoney(t, n, r) {
    let o = 0;
    for (let e = n; e < r; e++)
      o += ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
        t,
        e,
      ).GoldConsume;
    return o;
  }
  GetWeaponBreachMaxLevel(e) {
    const t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreachList(e);
    const n = t.length;
    let r = 0;
    for (let e = 0; e < n; e++) {
      const o = t[e];
      o.Level > r && (r = o.Level);
    }
    return r;
  }
  GetWeaponItemBaseExp(e) {
    if (e.GetType() === 4) {
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
    let n;
    const r = [];
    for (const o of e.DescParams)
      o &&
        ((n = t >= o.ArrayString.length ? o.ArrayString.length : t),
        (n = o.ArrayString[n - 1]),
        r.push(n));
    return r;
  }
  GetCurSelectViewName() {
    return this.POo;
  }
  SetCurSelectViewName(e) {
    this.POo = e;
  }
  IsWeaponUsedByUncommonRole(e) {
    e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    if (e) {
      e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
        e.GetRoleId(),
      );
      if (e && e.GetRoleConfig().RoleType !== 1) return !0;
    }
    return !1;
  }
  CanItemUseAsExpItem(e) {
    if (e.GetType() === 2 && e.GetUniqueId() > 0) {
      e = this.GetWeaponDataByIncId(e.GetUniqueId());
      if (e.HasRole() || e.GetItemConfig().QualityId >= 5) return !1;
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
    return e.GetResonanceLevel() > 1;
  }
  GetWeaponItemExp(e, t) {
    return e && e > 0
      ? this.GetWeaponDataByIncId(e).GetMaterialExp()
      : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(t)
          .BasicExp;
  }
  GetWeaponItemExpCost(e, t) {
    return e && e > 0
      ? this.GetWeaponDataByIncId(e).GetMaterialCost()
      : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(t)
          .Cost;
  }
  GetWeaponExpItemListCost(e) {
    let t = 0;
    for (const r of e) {
      if (r[0].ItemId === 0) break;
      const n = this.GetWeaponItemExpCost(r[0].IncId, r[0].ItemId);
      t += n * r[1];
    }
    return t;
  }
  GetWeaponExpItemList(e) {
    const t = [];
    for (const n of ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByMainType(
      2,
    ))
      this.CanItemUseAsExpItem(n) && e !== n.GetUniqueId() && t.push(n);
    return t;
  }
  GetWeaponExpItemListUseToAuto(e) {
    const t = [];
    for (const r of this.GetWeaponExpItemList(e))
      if (!r.GetIsLock()) {
        if (r.GetType() === 2) {
          const n = this.GetWeaponDataByIncId(r.GetUniqueId());
          if (this.IsWeaponHighResonanceLevel(n)) continue;
          if (this.IsWeaponHighLevel(n)) continue;
        }
        t.push(r);
      }
    return this.GetWeaponExpItemListWithSort(t), t;
  }
  GetWeaponExpItemListWithSort(e) {
    const t = new Set();
    return (
      t.add(2),
      t.add(10),
      t.add(8),
      ModelManager_1.ModelManager.SortModel.SortDataByData(e, 2, t, !0),
      e
    );
  }
  AutoAddExpItem(e, t, n, r) {
    let o = e;
    const a = [];
    for (const u of n) {
      if (t <= a.length || o <= 0) break;
      const i = r(u);
      var s = Math.ceil(o / i);
      let f = u.Count - u.SelectedCount;
      var s = u.SelectedCount + Math.min(s, f);
      s > 0 &&
        ((f = {
          IncId: u.IncId,
          ItemId: u.ItemId,
          Count: u.Count,
          SelectedCount: s,
        }),
        a.push(f),
        (o -= s * i));
    }
    return a;
  }
  AutoAddExpItemEx(e, t, n) {
    let r = e;
    for (const s of t) {
      if (r <= 0) break;
      const o = n(s);
      var a = Math.ceil(r / o);
      const i = s.Count - s.SelectedCount;
      var a = s.SelectedCount + Math.min(a, i);
      (s.SelectedCount = a), (r -= a * o);
    }
  }
  GetWeaponAttributeParamList(e) {
    return [
      { PropId: e.FirstPropId, CurveId: e.FirstCurve },
      { PropId: e.SecondPropId, CurveId: e.SecondCurve },
    ];
  }
  GetWeaponBreachState(e) {
    let t;
    let n;
    var e = this.GetWeaponDataByIncId(e);
    const r = e.GetBreachConfig();
    if (
      !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
        r.ConditionId.toString(),
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
    e = r.GoldConsume;
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      ItemDefines_1.EItemId.Gold,
    ) < e
      ? 1
      : 2;
  }
}
exports.WeaponModel = WeaponModel;
// # sourceMappingURL=WeaponModel.js.map
