"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PowerModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  PowerData_1 = require("./PowerData"),
  PowerDefines_1 = require("./PowerDefines"),
  OVERPOWERSHOPID = 17;
class PowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.VXs = new Map()),
      (this.CurrentNeedPower = 0),
      (this.PowerItemKeyArray = new Array(
        ItemDefines_1.EItemId.Power,
        ItemDefines_1.EItemId.OverPower,
      )),
      (this.HXs = new Map()),
      (this.roo = void 0),
      (this.v_l = !0),
      (this.InnerConfirmBoxData = void 0);
  }
  get PowerItemInfoList() {
    if (void 0 === this.roo) {
      this.roo = [];
      var e = ConfigManager_1.ConfigManager.PowerConfig.GetConfSortRule(),
        r = new Array();
      for (const f of e.keys()) {
        var t = ItemInfoById_1.configItemInfoById.GetConfig(f);
        t && r.push(t);
      }
      for (const h of r) {
        var o = new PowerDefines_1.PowerItemInfo(h.Id);
        (o.ItemName = h.Name),
          (o.IsHideWhenZero = Boolean(e.get(o.ItemId))),
          this.roo.push(o);
      }
      const a = Array.from(e.keys());
      this.roo.sort((e, r) => {
        return a.indexOf(e.ItemId) - a.indexOf(r.ItemId);
      });
    }
    for (const I of this.roo) {
      var n,
        i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          I.ItemId,
        ),
        i = ((I.StackValue = i || 0), this.Eoo(I.ShopId)),
        s =
          (-1 ===
            i.findIndex((e, r, t) => !e.IsSoldOut() && e.Price.has(I.ItemId)) &&
            ((n = i[i.length - 1]),
            (I.RenewValue =
              I.ItemId === ItemDefines_1.EItemId.OverPower
                ? 0
                : (n.StackSize ?? 0)),
            (I.CostValue = n.GetPrice(I.ItemId)),
            (I.GoodsId = n.Id),
            (I.RemainCount =
              I.ItemId === ItemDefines_1.EItemId.OverPower ? I.StackValue : 0)),
          (n = i.findIndex(
            (e, r, t) =>
              e.IsUnlocked() && !e.IsSoldOut() && e.Price.has(I.ItemId),
          )),
          i[n]);
      s &&
        ((I.RenewValue =
          I.ItemId === ItemDefines_1.EItemId.OverPower
            ? 0
            : (s.StackSize ?? 0)),
        (I.CostValue = s.GetPrice(I.ItemId)),
        (I.GoodsId = s.Id),
        (s = s.BuyLimit < 0 ? s.BuyLimit : i.length - n),
        (I.RemainCount = s));
    }
    return this.roo;
  }
  GetPowerItemInfos(e) {
    for (const r of this.PowerItemInfoList) if (r.ItemId === e) return r;
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
  OnInit() {
    return (
      this.VXs.set(10800, ItemDefines_1.EItemId.Power),
      this.VXs.set(
        ItemDefines_1.EItemId.OverPower,
        ItemDefines_1.EItemId.OverPower,
      ),
      (this.v_l = !0)
    );
  }
  OnClear() {
    return !(this.v_l = !1);
  }
  UpdatePowerRenewTimer() {
    for (var [, e] of this.HXs) e.CheckPowerUpdate();
  }
  UpdatePowerData(e) {
    if (e) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("PowerModule", 27, "当前体力数据", ["data", e]);
      for (const r of e) this.RefreshPowerInfos(r);
    }
  }
  RefreshPowerInfos(e) {
    var r;
    e && ((r = e.s5n), this.GetPowerDataById(r).Phrase(r, e.UPs, e.wPs));
  }
  CheckItemIfPowerItem(e) {
    return this.PowerItemKeyArray.includes(e);
  }
  GetPowerDataById(e) {
    let r = e,
      t = (this.VXs.has(e) && (r = this.VXs.get(e)), this.HXs.get(r));
    return (
      t ||
        ((t = new (
          e === ItemDefines_1.EItemId.OverPower
            ? PowerData_1.OverPowerData
            : PowerData_1.PowerData
        )()),
        this.HXs.set(r, t)),
      t
    );
  }
  CreateConfirmBoxData(e, r) {
    this.InnerConfirmBoxData = new PowerDefines_1.PowerConfirmBoxData(e, r);
  }
  Eoo(e) {
    e = ModelManager_1.ModelManager.ShopModel.GetShopItemList(e);
    return e && 0 !== e.length
      ? (e.sort((e, r) => e.Id - r.Id), e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("PowerModule", 49, "体力系统获取商店数据失败"),
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
  GetCanShowPowerTip() {
    return this.v_l;
  }
  SetCanShowPowerTip(e) {
    this.v_l = e;
  }
}
exports.PowerModel = PowerModel;
//# sourceMappingURL=PowerModel.js.map
