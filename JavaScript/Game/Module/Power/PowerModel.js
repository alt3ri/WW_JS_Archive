"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PowerModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  PowerData_1 = require("./PowerData"),
  PowerDefines_1 = require("./PowerDefines"),
  OVERPOWERSHOPID = 17;
class PowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.IQs = new Map()),
      (this.CurrentNeedPower = 0),
      (this.PowerItemKeyArray = new Array(
        ItemDefines_1.EItemId.Power,
        ItemDefines_1.EItemId.OverPower,
      )),
      (this.TQs = new Map()),
      (this.roo = void 0),
      (this.InnerConfirmBoxData = void 0),
      (this.voo = 0);
  }
  get PowerItemInfoList() {
    if (void 0 === this.roo) {
      this.roo = [];
      var e = ConfigManager_1.ConfigManager.PowerConfig.GetConfSortRule(),
        t = new Array();
      for (const f of e.keys()) {
        var r = ItemInfoById_1.configItemInfoById.GetConfig(f);
        r && t.push(r);
      }
      for (const h of t) {
        var o = new PowerDefines_1.PowerItemInfo(h.Id);
        (o.ItemName = h.Name),
          (o.IsHideWhenZero = Boolean(e.get(o.ItemId))),
          this.roo.push(o);
      }
      const a = Array.from(e.keys());
      this.roo.sort((e, t) => {
        return a.indexOf(e.ItemId) - a.indexOf(t.ItemId);
      });
    }
    for (const _ of this.roo) {
      var n,
        i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          _.ItemId,
        ),
        i = ((_.StackValue = i || 0), this.Eoo(_.ShopId)),
        s =
          (-1 ===
            i.findIndex((e, t, r) => !e.IsSoldOut() && e.Price.has(_.ItemId)) &&
            ((n = i[i.length - 1]),
            (_.RenewValue =
              _.ItemId === ItemDefines_1.EItemId.OverPower
                ? 0
                : n.StackSize ?? 0),
            (_.CostValue = n.GetPrice(_.ItemId)),
            (_.GoodsId = n.Id),
            (_.RemainCount =
              _.ItemId === ItemDefines_1.EItemId.OverPower ? _.StackValue : 0)),
          (n = i.findIndex(
            (e, t, r) =>
              e.IsUnlocked() && !e.IsSoldOut() && e.Price.has(_.ItemId),
          )),
          i[n]);
      s &&
        ((_.RenewValue =
          _.ItemId === ItemDefines_1.EItemId.OverPower ? 0 : s.StackSize ?? 0),
        (_.CostValue = s.GetPrice(_.ItemId)),
        (_.GoodsId = s.Id),
        (s = s.BuyLimit < 0 ? s.BuyLimit : i.length - n),
        (_.RemainCount = s));
    }
    return this.roo;
  }
  GetPowerItemInfos(e) {
    for (const t of this.PowerItemInfoList) if (t.ItemId === e) return t;
  }
  get NeedUpdateCountDown() {
    return this.GetPowerDataById(
      ItemDefines_1.EItemId.Power,
    ).GetNeedUpdateFlag();
  }
  get PowerCount() {
    return this.GetPowerDataById(ItemDefines_1.EItemId.Power).GetCurrentPower();
  }
  get ConfirmBoxData() {
    return this.InnerConfirmBoxData;
  }
  get PowerShopCount() {
    return this.voo;
  }
  OnInit() {
    return (
      this.IQs.set(10800, ItemDefines_1.EItemId.Power),
      this.IQs.set(
        ItemDefines_1.EItemId.OverPower,
        ItemDefines_1.EItemId.OverPower,
      ),
      !0
    );
  }
  OnClear() {
    return !0;
  }
  UpdatePowerRenewTimer() {
    for (var [, e] of this.TQs) e.CheckPowerUpdate();
  }
  UpdatePowerData(e) {
    if (e) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("PowerModule", 28, "当前体力数据", ["data", e]);
      for (const t of e) this.RefreshPowerInfos(t);
    }
  }
  RefreshPowerInfos(e) {
    var t;
    e && ((t = e.J4n), this.GetPowerDataById(t).Phrase(t, e.IPs, e.TPs));
  }
  CheckItemIfPowerItem(e) {
    return this.PowerItemKeyArray.includes(e);
  }
  GetPowerDataById(e) {
    let t = e,
      r = (this.IQs.has(e) && (t = this.IQs.get(e)), this.TQs.get(t));
    return (
      r ||
        ((r = new (
          e === ItemDefines_1.EItemId.OverPower
            ? PowerData_1.OverPowerData
            : PowerData_1.PowerData
        )()),
        this.TQs.set(t, r)),
      r
    );
  }
  CreateConfirmBoxData(e, t) {
    this.InnerConfirmBoxData = new PowerDefines_1.PowerConfirmBoxData(e, t);
  }
  AddOnePowerShopCount(e) {
    var t = ConfigManager_1.ConfigManager.PowerConfig.GetPowerShopIds();
    this.voo >= t.size ||
      (t.has(e) &&
        ((this.voo += 1), this.voo >= t.size) &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PowerShopReady,
        ));
  }
  ResetPowerShopCount() {
    this.voo = 0;
  }
  Eoo(e) {
    e = ModelManager_1.ModelManager.ShopModel.GetShopItemList(e);
    return e && 0 !== e.length
      ? (e.sort((e, t) => e.Id - t.Id), e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("PowerModule", 50, "体力系统获取商店数据失败"),
        []);
  }
  IsPowerEnough(e) {
    return !e || this.PowerCount >= e;
  }
  GetCurrentNeedPower(e) {
    return !this.IsPowerEnough(e) && e ? e - this.PowerCount : 0;
  }
  GetOverPowerShopConfig() {
    return ConfigManager_1.ConfigManager.ShopConfig.GetShopFixedInfoByItemId(
      PowerDefines_1.EPowerShopType.BuyWithItem,
      OVERPOWERSHOPID,
    );
  }
  ClearConfirmBoxData() {
    this.InnerConfirmBoxData = void 0;
  }
}
exports.PowerModel = PowerModel;
//# sourceMappingURL=PowerModel.js.map
