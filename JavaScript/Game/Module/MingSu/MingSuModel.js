"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MingSuModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  DragonPoolAll_1 = require("../../../Core/Define/ConfigQuery/DragonPoolAll"),
  ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  MingSuInstance_1 = require("./MingSuInstance");
class MingSuModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.wbi = new Map()),
      (this.Bbi = void 0),
      (this.bbi = 0),
      (this.UpgradeFlow = void 0),
      (this.CurrentPreviewLevel = 0),
      (this.qAr = 0),
      (this.CurrentInteractCreatureDataLongId = void 0),
      (this.qbi = 0);
  }
  OnInit() {
    return this.InitData(), !0;
  }
  InitData() {
    this.InitMingSuMap();
  }
  SetCurrentDragonPoolId(e) {
    this.bbi = e;
  }
  GetCurrentDragonPoolId() {
    return this.bbi;
  }
  SetCollectItemConfigId(e) {
    this.qAr = e;
  }
  GetCollectItemConfigId() {
    return this.qAr;
  }
  RefreshDragonPoolActiveStatus(e, t) {
    e = this.wbi.get(e);
    e && e.SetDragonPoolState(t);
  }
  RefreshDragonPoolDropItems(e, t) {
    e = this.wbi.get(e);
    e && e.SetDropItemList(t);
  }
  RefreshDragonPoolLevel(e, t) {
    e = this.wbi.get(e);
    e && e.SetDragonPoolLevel(t);
  }
  RefreshDragonPoolHadCoreCount(e, t) {
    e = this.wbi.get(e);
    e && e.SetHadCoreCount(t);
  }
  UpdateDragonPoolInfoMap(e) {
    for (const t of e) this.DoUpdateDragonPoolInfoMap(t);
  }
  DoUpdateDragonPoolInfoMap(e) {
    this.RefreshDragonPoolActiveStatus(e.x7n, e.kSs),
      this.RefreshDragonPoolLevel(e.x7n, e.P6n),
      this.RefreshDragonPoolHadCoreCount(e.x7n, e.NSs);
  }
  InitMingSuMap() {
    var e = DragonPoolAll_1.configDragonPoolAll.GetConfigList();
    if (e)
      for (const r of e) {
        var t = new MingSuInstance_1.MingSuInstance(r.Id);
        this.wbi.set(r.Id, t);
      }
    else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("MingSuTi", 8, "龙池配置读取失败", [
          "dragonPoolConfigList",
          e,
        ]);
  }
  GetDragonPoolInstanceById(e) {
    return this.wbi.get(e);
  }
  GetTargetDragonPoolLevelById(e) {
    e = this.GetDragonPoolInstanceById(e);
    return e ? e.GetDragonPoolLevel() : 0;
  }
  GetTargetDragonPoolMaxLevelById(e) {
    e = this.GetDragonPoolInstanceById(e);
    return e ? e.GetDragonPoolMaxLevel() : 0;
  }
  GetTargetDragonPoolCoreCountById(e) {
    e = this.GetDragonPoolInstanceById(e);
    return e ? e.GetHadCoreCount() : 0;
  }
  GetTargetDragonPoolLevelNeedCoreById(e, t) {
    e = this.GetDragonPoolInstanceById(e);
    return e ? e.GetNeedCoreCount(t) : 0;
  }
  GetTargetDragonPoolLevelRewardById(e, t) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      e = e.GetDropItemList();
      if (e && e.length > t) {
        e = e[t].RMs;
        if (!e) return;
        var r = new Array();
        for (const n of e) {
          var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(n.f8n);
          r.push({ ItemInfo: o, Count: n.YVn });
        }
        return r;
      }
    }
  }
  GetTargetDragonPoolLevelRewardByIdEx(e, t) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      e = e.GetDropItemList();
      if (e && e.length > t) {
        e = e[t].RMs;
        if (!e) return;
        var r = new Array();
        for (const o of e) r.push([{ ItemId: o.f8n, IncId: 0 }, o.YVn]);
        return r;
      }
    }
  }
  GetTargetDragonPoolCoreById(e) {
    e = this.GetDragonPoolInstanceById(e);
    return e ? e.GetCoreId() : 0;
  }
  GetTargetDragonPoolActiveById(e) {
    e = this.GetDragonPoolInstanceById(e);
    return e ? e.GetDragonPoolState() : 0;
  }
  GetItemCount(e) {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
  }
  GetItemInfoById(e) {
    return ItemInfoById_1.configItemInfoById.GetConfig(e);
  }
  CheckUp(e) {
    let t = this.GetTargetDragonPoolLevelById(e);
    var r = this.GetDragonPoolInstanceById(e).GetGoalList(),
      o = this.GetTargetDragonPoolMaxLevelById(e),
      n = this.GetTargetDragonPoolCoreCountById(e);
    let i = 0;
    for (; t < o; t++) {
      var a = r[t];
      i += a;
    }
    i -= n;
    var n = this.GetTargetDragonPoolCoreById(e),
      e = this.GetItemCount(n),
      n = this.GetItemInfoById(n);
    return (
      0 !== e &&
      ((n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name)),
      this.Gbi({ UseCoreCount: e >= i ? i : e, CoreName: n ?? "" }),
      !0)
    );
  }
  CanLevelUp(e) {
    var t = this.GetTargetDragonPoolLevelById(e),
      e = this.GetDragonPoolInstanceById(e);
    return (
      !!e &&
      e.GetNeedCoreCount(t) <=
        e.GetHadCoreCount() + this.GetItemCount(e.GetCoreId())
    );
  }
  GetCanUpPoolId() {
    let e = 0;
    for (var [t, r] of this.wbi) {
      var o = r.GetDragonPoolLevel(),
        o = r.GetNeedCoreCount(o) - r.GetHadCoreCount(),
        r = this.GetTargetDragonPoolCoreById(t);
      if (o <= this.GetItemCount(r)) {
        e = t;
        break;
      }
    }
    return e;
  }
  Gbi(e) {
    var t = [];
    t.push(e.CoreName, e.UseCoreCount.toString()),
      (this.Bbi = new ConfirmBoxDefine_1.ConfirmBoxDataNew(9)),
      this.Bbi.SetTextArgs(...t);
  }
  GetUpData() {
    return this.Bbi;
  }
  set MingSuLastLevel(e) {
    this.qbi = e;
  }
  get MingSuLastLevel() {
    return this.qbi;
  }
}
exports.MingSuModel = MingSuModel;
//# sourceMappingURL=MingSuModel.js.map
