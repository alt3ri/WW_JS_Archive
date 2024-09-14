"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayItemConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  PayById_1 = require("../../../Core/Define/ConfigQuery/PayById"),
  PayByPayIdAndRegion_1 = require("../../../Core/Define/ConfigQuery/PayByPayIdAndRegion"),
  PayByRegion_1 = require("../../../Core/Define/ConfigQuery/PayByRegion"),
  PayItemAll_1 = require("../../../Core/Define/ConfigQuery/PayItemAll"),
  PayItemById_1 = require("../../../Core/Define/ConfigQuery/PayItemById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
class PayItemConfig extends ConfigBase_1.ConfigBase {
  GetPayItemList() {
    return PayItemAll_1.configPayItemAll.GetConfigList();
  }
  GetProductIdByPayId(e) {
    return PayById_1.configPayById.GetConfig(e).ProductId;
  }
  GetProductIdByPayItemId(e) {
    e = PayItemById_1.configPayItemById.GetConfig(e)?.PayId;
    if (e) return PayById_1.configPayById.GetConfig(e)?.ProductId;
  }
  GetPayConf(e) {
    var r =
      ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectPayServerName();
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      const a = PayByPayIdAndRegion_1.configPayByPayIdAndRegion.GetConfigList(
        e,
        r,
      );
      if (void 0 !== a && 0 < a.length) return a[0];
    }
    const a = PayByPayIdAndRegion_1.configPayByPayIdAndRegion.GetConfigList(
      e,
      r,
    );
    if (void 0 !== a && 0 < a.length) return a[0];
  }
  GetCurrentRegionPayConfigList() {
    var e =
      ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectPayServerName();
    return PayByRegion_1.configPayByRegion.GetConfigList(e);
  }
  GetPayShowCurrency() {
    return ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
      ? this.GetGlobalCurrencyChar()
      : this.GetMainlandCurrencyChar();
  }
  GetPayShow(e) {
    var r,
      a = ModelManager_1.ModelManager.KuroSdkModel?.GetQueryProductShowPrice(
        e.toString(),
      );
    return (
      a ||
      ((a = new StringBuilder_1.StringBuilder()),
      (r = this.GetPayShowCurrency()),
      a.Append(r),
      (r = ModelManager_1.ModelManager.RechargeModel.GetPayIdAmount(e)),
      a.Append(r),
      a.ToString())
    );
  }
  GetPayIdByPayItemId(e) {
    return PayItemById_1.configPayItemById.GetConfig(e)?.PayId;
  }
  GetPayItem(e) {
    return PayItemById_1.configPayItemById.GetConfig(e);
  }
  GetWaitPaySuccessTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "MaxWaitSuccessTime",
    );
  }
  GetMainlandCurrencyChar() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "MainlandCurrencyChar",
    );
  }
  GetGlobalCurrencyChar() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "GlobalCurrencyChar",
    );
  }
}
exports.PayItemConfig = PayItemConfig;
//# sourceMappingURL=PayItemConfig.js.map
