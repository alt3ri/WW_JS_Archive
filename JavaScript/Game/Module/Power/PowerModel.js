"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PowerModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PowerDefines_1 = require("./PowerDefines");
class PowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Cce = 0),
      (this.gio = 0),
      (this.pio = 0),
      (this.G6s = 0),
      (this.vio = !1),
      (this.Mio = 0),
      (this.Sio = 0),
      (this.Eio = 0),
      (this.InnerConfirmBoxData = void 0),
      (this.yio = 0);
  }
  get NeedUpdateCountDown() {
    return this.vio;
  }
  get RestTime() {
    return this.Mio;
  }
  get PowerCount() {
    return this.Eio;
  }
  get ConfirmBoxData() {
    return this.InnerConfirmBoxData;
  }
  get PowerShopCount() {
    return this.yio;
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  UpdatePowerRenewTimer() {
    let e;
    this.vio &&
      ((this.Cce = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
      (e = this.pio - this.Cce),
      (this.Mio = e * TimeUtil_1.TimeUtil.Millisecond),
      this.Cce > this.G6s
        ? (this.Iio(this.Eio + 1),
          (this.G6s =
            this.Cce +
            ConfigManager_1.ConfigManager.PowerConfig.GetPowerIncreaseSpan() *
              TimeUtil_1.TimeUtil.InverseMillisecond),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("PowerModule", 5, "体力本地自增: " + this.Eio))
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPowerCountDownChanged,
          ));
  }
  RefreshPowerInfos(e, t) {
    this.Iio(t), (this.Sio = e * TimeUtil_1.TimeUtil.InverseMillisecond);
    t =
      ConfigManager_1.ConfigManager.PowerConfig.GetPowerIncreaseSpan() *
      TimeUtil_1.TimeUtil.InverseMillisecond;
    (this.G6s = this.Sio + t),
      (this.gio =
        (ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit() -
          this.Eio) *
        t),
      (this.pio = this.Sio + this.gio);
  }
  CreateConfirmBoxData(e, t) {
    this.InnerConfirmBoxData = new PowerDefines_1.PowerConfirmBoxData(e, t);
  }
  Iio(e) {
    (this.Eio = e),
      this.Eio >=
      ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit()
        ? (this.vio = !1)
        : (this.vio = !0),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPowerChanged);
  }
  AddOnePowerShopCount(e) {
    const t = ConfigManager_1.ConfigManager.PowerConfig.GetPowerShopIds();
    this.yio >= t.size ||
      (t.has(e) &&
        ((this.yio += 1), this.yio >= t.size) &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PowerShopReady,
        ));
  }
  ResetPowerShopCount() {
    this.yio = 0;
  }
  UpdatePowerItemWhenBuy() {
    for (const r of ConfigManager_1.ConfigManager.PowerConfig
      .PowerItemInfoList) {
      let e = 0;
      r.ItemId <= PowerDefines_1.PowerConst.MaxVirtualItemId
        ? (e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(3))
        : (e =
              ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
                r.ItemId,
              )) === 0
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRemoveItem,
              r.ItemId,
            )
          : e !== r.StackValue &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRefreshItem,
              r.ItemId,
              !1,
            ),
        (r.StackValue = e || 0);
      let t = this.Tio(r.ShopId);
      t.findIndex((e, t, i) => !e.IsSoldOut() && e.Price.has(r.ItemId)) ===
        -1 &&
        ((t = t[t.length - 1]),
        (r.RenewValue = t.StackSize ?? 0),
        (r.CostValue = t.GetPrice(r.ItemId)),
        (r.GoodsId = t.Id),
        (r.RemainCount = 0));
    }
  }
  Tio(e) {
    e = ModelManager_1.ModelManager.ShopModel.GetShopItemList(e);
    return e && e.length !== 0
      ? (e.sort((e, t) => e.Id - t.Id), e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("PowerModule", 50, "体力系统获取商店数据失败"),
        []);
  }
  UpdatePowerItemWhenGoodUnlock() {
    for (const r of ConfigManager_1.ConfigManager.PowerConfig
      .PowerItemInfoList) {
      const e = this.Tio(r.ShopId);
      const t = e.findIndex(
        (e, t, i) => e.IsUnlocked() && !e.IsSoldOut() && e.Price.has(r.ItemId),
      );
      let i = e[t];
      i &&
        ((r.RenewValue = i.StackSize ?? 0),
        (r.CostValue = i.GetPrice(r.ItemId)),
        (r.GoodsId = i.Id),
        (i = i.BuyLimit < 0 ? i.BuyLimit : e.length - t),
        (r.RemainCount = i));
    }
  }
  IsPowerEnough(e) {
    return !e || this.PowerCount >= e;
  }
}
exports.PowerModel = PowerModel;
// # sourceMappingURL=PowerModel.js.map
