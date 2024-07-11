"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonExchangeViewData =
    exports.CommonExchangeData =
    exports.ExchangeUnitData =
      void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  ItemExchangeDefine_1 = require("../ItemExchangeDefine");
class ExchangeUnitData {
  constructor() {
    (this.ItemId = 0),
      (this.Name = ""),
      (this.TotalCount = ItemExchangeDefine_1.MAX_COUNT);
  }
  SetDataByItemId(e, t = void 0) {
    ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e) &&
      ((this.ItemId = e),
      (this.Name = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e)),
      (this.TotalCount =
        t ||
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e)));
  }
}
exports.ExchangeUnitData = ExchangeUnitData;
class CommonExchangeData extends UiPopViewData_1.UiPopViewData {
  constructor() {
    super(...arguments),
      (this.IsMultipleView = !0),
      (this.Ugi = new ExchangeUnitData()),
      (this.Agi = new ExchangeUnitData()),
      (this.CancelCallBack = void 0),
      (this.ConfirmNoClose = !1),
      (this.ShowPayGold = !1),
      (this.ConfirmCallBack = void 0);
  }
  InitBySrcAndDestItemId(e, t, i = void 0, a = void 0) {
    this.Ugi.SetDataByItemId(e, i), this.Agi.SetDataByItemId(t, a);
  }
  InitByItemId(e) {
    var t =
      ConfigManager_1.ConfigManager.ItemExchangeConfig.GetFirstExChangeConfigList(
        e,
      );
    e === ItemDefines_1.EItemId.BlackCard && (this.ShowPayGold = !0),
      1 < t.Consume.size &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ItemExchange",
          9,
          "暂不支持消耗数量为1以上的道具兑换, 需要扩展!",
        ),
      this.Ugi.SetDataByItemId(t.Consume.keys().next()?.value),
      this.Agi.SetDataByItemId(t.ItemId);
  }
  GetSrcName() {
    return this.Ugi.Name;
  }
  GetSrcItemId() {
    return this.Ugi.ItemId;
  }
  GetSrcTotalCount() {
    return this.Ugi.TotalCount;
  }
  GetDestName() {
    return this.Agi.Name;
  }
  GetDestItemId() {
    return this.Agi.ItemId;
  }
}
exports.CommonExchangeData = CommonExchangeData;
class CommonExchangeViewData {
  constructor() {
    (this.MaxExchangeTime = 0),
      (this.OwnSrcItemNum = 0),
      (this.ExchangeData = void 0),
      (this.StartSliderValue = 0),
      (this.ShowCurrencyList = []),
      (this.GetConsumeCount = (e, t) => 0),
      (this.GetConsumeTotalCount = (e, t) => 0),
      (this.GetGainCount = (e, t) => 0);
  }
  CreateData(e, t = 0, i = 0) {
    (this.MaxExchangeTime = t),
      (this.OwnSrcItemNum = i),
      (this.ExchangeData = e);
  }
}
exports.CommonExchangeViewData = CommonExchangeViewData;
//# sourceMappingURL=CommonExchangeData.js.map
