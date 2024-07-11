"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonExchangeData = exports.ExchangeUnitData = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ItemExchangeDefine_1 = require("../ItemExchangeDefine");
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
      (this.UCi = new ExchangeUnitData()),
      (this.ACi = new ExchangeUnitData()),
      (this.CancelCallBack = void 0),
      (this.ConfirmNoClose = !1),
      (this.ShowPayGold = !1),
      (this.ConfirmCallBack = void 0);
  }
  InitByItemId(e) {
    const t =
      ConfigManager_1.ConfigManager.ItemExchangeConfig.GetFirstExChangeConfigList(
        e,
      );
    e === ItemDefines_1.EItemId.BlackCard && (this.ShowPayGold = !0),
      t.Consume.size > 1 &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ItemExchange",
          9,
          "暂不支持消耗数量为1以上的道具兑换, 需要扩展!",
        ),
      this.UCi.SetDataByItemId(t.Consume.keys().next()?.value),
      this.ACi.SetDataByItemId(t.ItemId);
  }
  GetSrcName() {
    return this.UCi.Name;
  }
  GetSrcItemId() {
    return this.UCi.ItemId;
  }
  GetSrcTotalCount() {
    return this.UCi.TotalCount;
  }
  GetDestName() {
    return this.ACi.Name;
  }
  GetDestItemId() {
    return this.ACi.ItemId;
  }
}
exports.CommonExchangeData = CommonExchangeData;
// # sourceMappingURL=CommonExchangeData.js.map
