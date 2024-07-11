"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  CommonItemData_1 = require("./ItemData/CommonItemData"),
  PhantomItemData_1 = require("./ItemData/PhantomItemData"),
  WeaponItemData_1 = require("./ItemData/WeaponItemData"),
  ItemMainTypeMapping_1 = require("./ItemMainTypeMapping"),
  CD_TIME_REASON = "限时物品主动添加倒计时 [ConfigId:{0}, UniqueId:{1}]";
class InventoryModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Hci = 0),
      (this.jci = void 0),
      (this.Wci = 0),
      (this.Kci = void 0),
      (this.Qci = void 0),
      (this.Xci = new Map()),
      (this.dWt = new Map()),
      (this.$ci = new Map()),
      (this.Yci = new Map()),
      (this.Jci = new Map()),
      (this.Zci = void 0),
      (this.emi = new Set()),
      (this.tmi = new Map()),
      (this.IsConfirmDestruction = !1);
  }
  OnInit() {
    return !(
      ConfigManager_1.ConfigManager.InventoryConfig.GetAllMainTypeConfig()
        .length <= 0 || (this.SetSelectedTypeIndex(0), 0)
    );
  }
  OnClear() {
    this.ClearAllItemData();
    for (const e of this.tmi.values())
      TimerSystem_1.RealTimeTimerSystem.Remove(e);
    return this.tmi.clear(), !0;
  }
  RefreshItemRedDotSet() {
    var t = ModelManager_1.ModelManager.NewFlagModel,
      r = t.GetNewFlagSet(
        LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
      );
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Inventory",
          8,
          "[InventoryRedDot]当前本地保存的常规道具红点",
          ["commonItemRedDotSet", r],
        ),
      r)
    ) {
      let e = !1;
      for (const a of r)
        this.GetCommonItemCount(a) <= 0 &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Inventory",
              8,
              "[InventoryRedDot]消除常规道具红点",
              ["configId", a],
            ),
          t.RemoveNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey
              .InventoryCommonItemRedDot,
            a,
          ),
          (e = !0));
      e && this.SaveRedDotCommonItemConfigIdList();
    }
    r = t.GetNewFlagSet(
      LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot,
    );
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Inventory",
          8,
          "[InventoryRedDot]当前本地保存的属性道具红点",
          ["attributeItemRedDotSet", r],
        ),
      r)
    ) {
      let e = !1;
      for (const n of r) {
        var o = this.GetAttributeItemData(n);
        o
          ? o?.GetCount() <= 0 &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Inventory",
                8,
                "[InventoryRedDot]消除属性道具红点",
                ["uniqueId", n],
              ),
            t.RemoveNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey
                .InventoryAttributeItemRedDot,
              n,
            ),
            (e = !0))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Inventory",
                8,
                "[InventoryRedDot]消除属性道具红点",
                ["uniqueId", n],
              ),
            t.RemoveNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey
                .InventoryAttributeItemRedDot,
              n,
            ),
            (e = !0));
      }
      e && this.SaveRedDotAttributeItemUniqueIdList();
    }
  }
  SetInventoryTabOpenIdList(e) {
    var t = e.indexOf(0);
    -1 < t && e.splice(t, 1), (this.Qci = e);
  }
  GetOpenIdMainTypeConfig() {
    var e = [];
    for (const r of this.Qci) {
      var t =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(r);
      e.push(t);
    }
    return e;
  }
  imi(e) {
    var t = e.GetType();
    let r = this.Yci.get(t);
    r || ((r = new Set()), this.Yci.set(t, r)), r.add(e);
  }
  omi(e) {
    var t = e.GetType(),
      t = this.Yci.get(t);
    t && t.delete(e);
  }
  rmi(e) {
    this.Yci.delete(e);
  }
  nmi(e) {
    var t = e.GetMainType();
    let r = this.Jci.get(t);
    r ||
      ((r = new ItemMainTypeMapping_1.ItemMainTypeMapping(t)),
      this.Jci.set(t, r)),
      r.Add(e);
  }
  smi(e) {
    var t = e.GetMainType(),
      t = this.Jci.get(t);
    t && t.Remove(e);
  }
  ami(e) {
    this.Jci.delete(e);
  }
  NewCommonItemData(e, t, r = 0, o) {
    t = new CommonItemData_1.CommonItemData(e, r, t, 0, o);
    let a = this.Xci.get(e);
    (a = a || new Map()).set(r, t),
      this.Xci.set(e, a),
      this.imi(t),
      this.nmi(t),
      this.hmi(t);
  }
  RemoveCommonItemData(e, t = 0) {
    var r,
      o = this.Xci.get(e);
    o &&
      (r = o.get(t)) &&
      (o.delete(t),
      0 === o.size && this.Xci.delete(e),
      this.omi(r),
      this.smi(r));
  }
  RemoveCommonItemDataAndSaveNewList(e) {
    for (const t of e)
      this.RemoveCommonItemData(t.ItemId, t.IncId),
        this.RemoveNewCommonItem(t.ItemId, t.IncId),
        this.RemoveRedDotCommonItem(t.ItemId, t.IncId);
    this.SaveNewCommonItemConfigIdList(),
      this.SaveNewAttributeItemUniqueIdList(),
      this.SaveRedDotCommonItemConfigIdList(),
      this.SaveRedDotAttributeItemUniqueIdList();
  }
  hmi(e) {
    if (0 < e.GetEndTime())
      if (e.IsOverTime())
        ControllerHolder_1.ControllerHolder.InventoryController.InvalidItemRemoveRequest();
      else {
        const r = e.GetEndTime();
        var t;
        this.emi.has(r) ||
          ((t = Math.max(
            r - TimeUtil_1.TimeUtil.GetServerTimeStamp(),
            TimerSystem_1.MIN_TIME,
          )),
          (e = StringUtils_1.StringUtils.Format(
            CD_TIME_REASON,
            e.GetConfigId().toString(),
            e.GetUniqueId().toString(),
          )),
          (t = TimerSystem_1.RealTimeTimerSystem.Delay(
            () => {
              this.lmi(r);
            },
            t,
            void 0,
            e,
          )) && (this.emi.add(r), this.tmi.set(r, t)));
      }
  }
  lmi(e) {
    ControllerHolder_1.ControllerHolder.InventoryController.InvalidItemRemoveRequest();
    var t = this.tmi.get(e);
    t && (TimerSystem_1.RealTimeTimerSystem.Remove(t), this.tmi.delete(e)),
      this.emi.delete(e);
  }
  GetCommonItemData(e, t = 0) {
    e = this.Xci.get(e);
    if (e) {
      e = e.get(t);
      if (!e || e.IsValid()) return e;
    }
  }
  GetAllCommonItemDataByConfigId(e) {
    var t = [],
      e = this.Xci.get(e);
    if (e) for (const r of Array.from(e.values())) r.IsValid() && t.push(r);
    return t;
  }
  GetItemDataBaseByConfigId(e) {
    switch (
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e)
    ) {
      case 2:
        return this.GetAllWeaponItemDataByConfigId(e);
      case 3:
        return this.GetAllPhantomItemDataByConfigId(e);
      default:
        return this.GetAllCommonItemDataByConfigId(e);
    }
  }
  GetAllPhantomItemDataByConfigId(e) {
    var t = [];
    for (const r of this.GetAllPhantomItemDataIterator())
      r.GetConfigId() === e && t.push(r);
    return t;
  }
  GetAllWeaponItemDataByConfigId(e) {
    var t = [];
    for (const r of this.GetWeaponItemDataList())
      r.GetConfigId() === e && t.push(r);
    return t;
  }
  GetAllWeaponItemDataByQualityAndType(e, t) {
    var r = [];
    for (const o of this.GetWeaponItemDataList())
      (0 !== e && o.GetQuality() !== e) ||
        (0 !== t && o.GetConfig().WeaponType !== t) ||
        r.push(o);
    return r;
  }
  GetCommonItemCount(e, t = 0) {
    e = this.GetCommonItemData(e, t);
    return e ? e.GetCount() : 0;
  }
  NewWeaponItemData(e, t, r) {
    e = new WeaponItemData_1.WeaponItemData(e, t, r, 2);
    this.dWt.set(t, e), this.imi(e), this.nmi(e);
  }
  RemoveWeaponItemData(e) {
    var t = this.dWt.get(e);
    t && (this.dWt.delete(e), this.omi(t), this.smi(t));
  }
  RemoveWeaponItemDataAndSaveNewList(e) {
    for (const t of e)
      this.RemoveWeaponItemData(t),
        this.RemoveNewAttributeItem(t),
        this.RemoveRedDotAttributeItem(t);
    this.SaveNewAttributeItemUniqueIdList(),
      this.SaveRedDotAttributeItemUniqueIdList();
  }
  GetWeaponItemData(e) {
    return this.dWt.get(e);
  }
  NewPhantomItemData(e, t, r) {
    e = new PhantomItemData_1.PhantomItemData(e, t, r, 3);
    this.$ci.set(t, e), this.imi(e), this.nmi(e);
  }
  RemovePhantomItemData(e) {
    var t = this.$ci.get(e);
    t && (this.$ci.delete(e), this.omi(t), this.smi(t));
  }
  RemovePhantomItemDataAndSaveNewList(e) {
    for (const t of e)
      this.RemovePhantomItemData(t),
        this.RemoveNewAttributeItem(t),
        this.RemoveRedDotAttributeItem(t);
    this.SaveNewAttributeItemUniqueIdList(),
      this.SaveRedDotAttributeItemUniqueIdList();
  }
  GetPhantomItemData(e) {
    return this.$ci.get(e);
  }
  ClearCommonItemData() {
    for (const r of this.Xci.values())
      for (const o of r.values()) {
        var e = o.GetMainType(),
          t = o.GetType();
        this.ami(e), this.rmi(t);
      }
    this.Xci.clear();
  }
  ClearWeaponItemData() {
    for (const r of this.dWt.values()) {
      var e = r.GetMainType(),
        t = r.GetType();
      this.ami(e), this.rmi(t);
    }
    this.dWt.clear();
  }
  ClearPhantomItemData() {
    for (const r of this.$ci.values()) {
      var e = r.GetMainType(),
        t = r.GetType();
      this.ami(e), this.rmi(t);
    }
    this.$ci.clear();
  }
  ClearAllItemData() {
    this.ClearCommonItemData(),
      this.ClearWeaponItemData(),
      this.ClearPhantomItemData(),
      this.Yci.clear(),
      this.Jci.clear();
  }
  GetAttributeItemData(e) {
    let t = this.GetWeaponItemData(e);
    return (t = t || this.GetPhantomItemData(e));
  }
  GetWeaponItemDataList() {
    var e = [];
    for (const t of this._mi())
      ModelManager_1.ModelManager.WeaponModel.IsWeaponUsedByUncommonRole(
        t.GetUniqueId(),
      ) || e.push(t);
    return e;
  }
  GetPhantomItemDataList() {
    var e = [];
    for (const t of this.$ci.values()) e.push(t);
    return e;
  }
  GetUnEquipPhantomItemDataList() {
    var e = this.GetPhantomItemDataList();
    const t = [];
    return (
      e.forEach((e) => {
        ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
          e.GetUniqueId(),
        ) || t.push(e);
      }),
      t
    );
  }
  GetPhantomItemDataListByPhantomItemId(e) {
    var t = [];
    for (const r of this.$ci.values()) r.GetConfigId() === e && t.push(r);
    return t;
  }
  GetPhantomItemDataListByPhantomItem(e) {
    const t = [];
    return (
      e.forEach((e) => {
        e = new PhantomItemData_1.PhantomItemData(e.J4n, e.L9n, e.Bws, 3);
        t.push(e);
      }),
      t
    );
  }
  GetPhantomItemDataListByAddCountItemInfo(e) {
    const t = [];
    return (
      e.forEach((e) => {
        e = new PhantomItemData_1.PhantomItemData(e.J4n, e.L9n, 0, 3);
        t.push(e);
      }),
      t
    );
  }
  GetCommonItemDataList() {
    var e = [];
    for (const t of this.Xci.values())
      for (const r of t.values()) r.IsValid() && e.push(r);
    return e;
  }
  GetCommonItemByItemType(e) {
    var t = [];
    for (const r of this.Xci.values())
      for (const o of r.values()) o.GetType() === e && o.IsValid() && t.push(o);
    return t;
  }
  GetCommonItemByShowType(e) {
    var t = [];
    for (const r of this.Xci.values())
      for (const o of r.values())
        o.GetShowTypeList().includes(e) && o.IsValid() && t.push(o);
    return t;
  }
  GetWeaponItemByItemType(e) {
    var t = [];
    for (const r of this.GetWeaponItemDataList())
      r.GetType() === e && t.push(r);
    return t;
  }
  GetPhantomItemByItemType(e) {
    var t = [];
    for (const r of this.$ci.values()) r.GetType() === e && t.push(r);
    return t;
  }
  GetItemDataBase(e) {
    var t = e.IncId;
    return 0 < t
      ? [this.GetAttributeItemData(t)]
      : this.GetItemDataBaseByConfigId(e.ItemId);
  }
  GetItemMainTypeMapping(e) {
    return this.Jci.get(e);
  }
  GetItemDataBaseByMainType(e) {
    var t = new Set(),
      e = this.Jci.get(e);
    if (e) for (const r of e.GetSet()) r.IsValid() && t.add(r);
    return t;
  }
  GetInventoryItemGridCountByMainType(e) {
    var t;
    let r = 0;
    for (const o of this.GetItemDataBaseByMainType(e))
      0 !== o.GetType() &&
        (o instanceof CommonItemData_1.CommonItemData
          ? (t = o.GetMaxStackCount()) <= 0 ||
            (r += Math.ceil(o.GetCount() / t))
          : (r += 1));
    return r;
  }
  GetItemDataBaseByItemType(e) {
    var t = new Set(),
      e = this.Yci.get(e);
    if (e) for (const r of e) r.IsValid() && t.add(r);
    return t;
  }
  _mi() {
    return this.dWt.values();
  }
  GetAllPhantomItemDataIterator() {
    return this.$ci.values();
  }
  SetSelectedItemViewData(e) {
    this.Kci = e;
  }
  SetCurrentLockItemUniqueId(e) {
    this.Wci = e;
  }
  GetSelectedItemData() {
    return this.Kci;
  }
  get GetCurrentLockItemUniqueId() {
    return this.Wci;
  }
  SetSelectedTypeIndex(e) {
    this.Hci = e;
  }
  GetSelectedTypeIndex() {
    return this.Hci;
  }
  SetOutsideUniqueId(e) {
    this.jci = e;
  }
  GetOutsideUniqueId() {
    return this.jci;
  }
  ClearOutsideUniqueId() {
    this.jci = void 0;
  }
  GetItemCountByConfigId(e, t = 0) {
    if (e in ItemDefines_1.EItemId)
      return ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(e);
    switch (
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e)
    ) {
      case 2:
        return this.umi(e);
      case 3:
        return this.cmi(e);
      case 6:
        return this.mmi(e);
      case 8:
        return this.dmi(e);
      default:
        return this.GetCommonItemCount(e, t);
    }
  }
  umi(e) {
    let t = 0;
    for (const r of this.GetWeaponItemDataList()) r.GetConfigId() === e && t++;
    return t;
  }
  dmi(e) {
    return (
      ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeCurrency(e) ?? 0
    );
  }
  cmi(e) {
    let t = 0;
    for (const r of this.GetAllPhantomItemDataIterator())
      r.GetConfigId() === e && t++;
    return t;
  }
  mmi(t) {
    var r = ModelManager_1.ModelManager.PersonalModel.GetCardDataList(),
      o = r.length;
    for (let e = 0; e < o; e++) {
      var a = r[e];
      if (a.CardId === t && a.IsUnLock) return 1;
    }
    return 0;
  }
  TryAddNewCommonItem(e, t = 0) {
    return 0 !== t
      ? this.TryAddNewAttributeItem(t)
      : !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
          e,
        ) &&
          (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
            e,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnGetNewItem,
            e,
          ),
          !0);
  }
  TryAddNewAttributeItem(e) {
    return (
      !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
        e,
      ) &&
      (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
        e,
      ),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetNewItem, e),
      !0)
    );
  }
  RemoveNewCommonItem(e, t = 0) {
    return 0 !== t
      ? this.RemoveNewAttributeItem(t)
      : ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
          e,
        );
  }
  RemoveNewAttributeItem(e) {
    return ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
      LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
      e,
    );
  }
  SaveNewCommonItemConfigIdList() {
    return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
      LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
    );
  }
  SaveNewAttributeItemUniqueIdList() {
    return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
      LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
    );
  }
  IsNewCommonItem(e, t = 0) {
    return 0 !== t
      ? this.IsNewAttributeItem(t)
      : ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
          e,
        );
  }
  IsNewAttributeItem(e) {
    return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
      LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
      e,
    );
  }
  GetNewAttributeItemUniqueIdList() {
    return ModelManager_1.ModelManager.NewFlagModel.GetNewFlagSet(
      LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
    );
  }
  TryAddRedDotCommonItem(e, t = 0) {
    var r;
    return (
      !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
        e,
      ) &&
      !!(r = this.GetCommonItemData(e, t)) &&
      0 !== r.GetRedDotDisableRule() &&
      (0 !== t
        ? ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey
              .InventoryAttributeItemRedDot,
            t,
          )
        : ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey
              .InventoryCommonItemRedDot,
            e,
          ),
      !0)
    );
  }
  TryAddRedDotAttributeItem(e) {
    var t;
    return (
      !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .InventoryAttributeItemRedDot,
        e,
      ) &&
      !!(t = this.GetAttributeItemData(e)) &&
      0 !== t.GetRedDotDisableRule() &&
      (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .InventoryAttributeItemRedDot,
        e,
      ),
      !0)
    );
  }
  HasRedDot() {
    var e = ModelManager_1.ModelManager.NewFlagModel,
      t = e.GetNewFlagSet(
        LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
      );
    let r = 0,
      o = (t && (r = t.size), 0);
    t = e.GetNewFlagSet(
      LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot,
    );
    return t && (o = t.size), 0 < r || 0 < o;
  }
  IsMainTypeHasRedDot(e) {
    return this.GetItemMainTypeMapping(e)?.HasRedDot() ?? !1;
  }
  IsCommonItemHasRedDot(e, t = 0) {
    return 0 !== t
      ? this.IsAttributeItemHasRedDot(t)
      : ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
          e,
        );
  }
  IsAttributeItemHasRedDot(e) {
    return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
      LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot,
      e,
    );
  }
  RemoveRedDotCommonItem(e, t = 0) {
    return 0 !== t
      ? this.RemoveRedDotAttributeItem(t)
      : !!ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
          e,
        ) &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRemoveItemRedDot,
          ),
          !0);
  }
  RemoveRedDotAttributeItem(e) {
    return (
      !!ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .InventoryAttributeItemRedDot,
        e,
      ) &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRemoveItemRedDot,
      ),
      !0)
    );
  }
  SaveRedDotCommonItemConfigIdList() {
    return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
      LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
    );
  }
  SaveRedDotAttributeItemUniqueIdList() {
    return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
      LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot,
    );
  }
  SetAcquireData(e) {
    this.Zci = e;
  }
  GetAcquireData() {
    return this.Zci;
  }
  CheckIsCoinEnough(e, t) {
    for (const r of t)
      if (r.ItemId === e)
        return (
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            e,
          ) >= r.Count
        );
    return !0;
  }
}
exports.InventoryModel = InventoryModel;
//# sourceMappingURL=InventoryModel.js.map
