"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayGiftController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
  SdkViewData_1 = require("../../KuroSdk/View/SdkViewData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  PayItemController_1 = require("../PayItem/PayItemController"),
  PayShopDefine_1 = require("./PayShopDefine");
class PayGiftController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19970, PayGiftController.hFi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19970);
  }
  static OnShopInfoNotify(e) {
    (ModelManager_1.ModelManager.PayGiftModel.Version = e.DBs.K7n),
      ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.DBs.RBs);
  }
  static OnShopInfoReceive(e) {
    e &&
      ((ModelManager_1.ModelManager.PayGiftModel.Version = e.K7n),
      ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.RBs));
  }
  static async QueryPayGiftInfoAsync() {
    var e = ModelManager_1.ModelManager.PayGiftModel.GetDataList(),
      r = new Array();
    for (const o of e) r.push(o.ProductId);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Pay", 28, "QueryProductInfoAsync", [
        "resultArray",
        e.length,
      ]),
      await PayItemController_1.PayItemController.QueryProductInfoAsync(r);
  }
  static async SendPayGiftInfoRequestAsync() {
    var e = Protocol_1.Aki.Protocol.Yhs.create(),
      e =
        ((e.K7n = ModelManager_1.ModelManager.PayGiftModel.Version),
        await Net_1.Net.CallAsync(23556, e));
    return !(
      !e ||
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          21666,
        ),
      !e.K7n) ||
      !e.OUs ||
      ((ModelManager_1.ModelManager.PayGiftModel.Version = e.K7n),
      ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.OUs),
      0)
    );
  }
  static SendPayGiftInfoRequest() {
    var e = Protocol_1.Aki.Protocol.Yhs.create();
    (e.K7n = ModelManager_1.ModelManager.PayGiftModel.Version),
      Net_1.Net.Call(23556, e, (e) => {
        if (
          e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              21666,
            ),
          e.K7n) &&
          e.OUs
        ) {
          (ModelManager_1.ModelManager.PayGiftModel.Version = e.K7n),
            ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.OUs);
          var e = ModelManager_1.ModelManager.PayGiftModel.GetDataList(),
            r = new Array();
          for (const o of e) r.push(o.ProductId);
          ControllerHolder_1.ControllerHolder.PayItemController.QueryProductInfoAsync(
            r,
          );
        }
      });
  }
  static _ka(n) {
    var e = Protocol_1.Aki.Protocol.zhs.create();
    (e.s5n = n),
      (e.K7n = ModelManager_1.ModelManager.PayGiftModel.Version),
      Net_1.Net.Call(18906, e, (e) => {
        var r,
          o,
          t,
          a = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(n);
        e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
          ? ((r = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(
              a.GetGoodsData().ItemId,
            )),
            (o = ConfigManager_1.ConfigManager.ItemConfig.GetItemDesc(
              a.GetGoodsData().ItemId,
            )),
            ((t =
              new LogReportDefine_1.SdkPayGetServerBillEvent()).s_sdk_pay_order =
              e.CBs),
            ControllerHolder_1.ControllerHolder.LogReportController.LogReport(
              t,
            ),
            ControllerHolder_1.ControllerHolder.KuroSdkController.SdkPay(
              a.GetGetPayGiftData().PayId,
              e.CBs,
              r,
              o,
              e.gBs,
            ))
          : e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrPayShopDataChanged
            ? this.SendPayGiftInfoRequest()
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                24032,
              );
      });
  }
  static SdkPay(e) {
    var r, o;
    if (
      PayItemController_1.PayItemController.CurrentBlockBetaState &&
      ConfigManager_1.ConfigManager.CommonConfig?.GetBetaBlockRecharge()
    )
      return (
        (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
        void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          r,
        )
      );
    FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check() &&
    e === PayShopDefine_1.MONTH_CARD_SHOP_ID
      ? ((r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          r,
        ))
      : (PayItemController_1.PayItemController.CurrentBlockIosPayState &&
          1 === Info_1.Info.PlatformType &&
          ((r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(134)),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            r,
          )),
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
          ? (r =
              ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
                e,
              )?.GetGetPayGiftData()?.ProductId)
            ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowSdkProductInfoBeforePay()
              ? ((o =
                  ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(
                    r,
                  )),
                (o = SdkViewData_1.SdkPayProductInformationViewData.Create(
                  o.Name,
                  o.Desc,
                  r,
                  function (e) {
                    PayItemController_1.PayItemController.SdkPayNew(e);
                  },
                )),
                UiManager_1.UiManager.OpenView(
                  "SdkPayProductInformationView",
                  o,
                ))
              : PayItemController_1.PayItemController.SdkPayNew(r)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Pay",
                17,
                "PayGiftController SdkPay failed, productId is null",
              )
          : this._ka(e));
  }
}
(exports.PayGiftController = PayGiftController).hFi = (e) => {
  ControllerHolder_1.ControllerHolder.KuroSdkController.CancelCurrentWaitPayItemTimer();
  var r = { PayItemId: e.s5n, OrderId: e.CBs, ItemId: e.L8n, ItemCount: e.n9n };
  ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(e.fBs.s5n).Phrase(
    e.fBs,
  ),
    KuroSdkReport_1.KuroSdkReport.OnPayShopDirectBuy(e.s5n),
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnPayItemSuccess,
      r,
    );
};
//# sourceMappingURL=PayGiftController.js.map
