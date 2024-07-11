"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayGiftController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  PayItemController_1 = require("../PayItem/PayItemController"),
  PayShopDefine_1 = require("./PayShopDefine");
class PayGiftController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(16212, PayGiftController.hFi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16212);
  }
  static OnShopInfoNotify(e) {
    (ModelManager_1.ModelManager.PayGiftModel.Version = e.SBs.G7n),
      ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.SBs.MBs);
  }
  static OnShopInfoReceive(e) {
    e &&
      ((ModelManager_1.ModelManager.PayGiftModel.Version = e.G7n),
      ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.MBs));
  }
  static async SendPayGiftInfoRequestAsync() {
    var e = Protocol_1.Aki.Protocol.$hs.create(),
      e =
        ((e.G7n = ModelManager_1.ModelManager.PayGiftModel.Version),
        await Net_1.Net.CallAsync(13863, e));
    if (
      e &&
      (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          1708,
        ),
      e.G7n) &&
      e.UUs
    ) {
      (ModelManager_1.ModelManager.PayGiftModel.Version = e.G7n),
        ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.UUs);
      var e = ModelManager_1.ModelManager.PayGiftModel.GetDataList(),
        o = new Array();
      for (const r of e) o.push(r.ProductId);
      ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
        o,
      );
    }
  }
  static SendPayGiftInfoRequest() {
    var e = Protocol_1.Aki.Protocol.$hs.create();
    (e.G7n = ModelManager_1.ModelManager.PayGiftModel.Version),
      Net_1.Net.Call(13863, e, (e) => {
        if (
          e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              1708,
            ),
          e.G7n) &&
          e.UUs
        ) {
          (ModelManager_1.ModelManager.PayGiftModel.Version = e.G7n),
            ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.UUs);
          var e = ModelManager_1.ModelManager.PayGiftModel.GetDataList(),
            o = new Array();
          for (const r of e) o.push(r.ProductId);
          ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
            o,
          );
        }
      });
  }
  static SendPayGiftRequest(n) {
    var e;
    if (
      PayItemController_1.PayItemController.CurrentBlockBetaState &&
      ConfigManager_1.ConfigManager.CommonConfig?.GetBetaBlockRecharge()
    )
      return (
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
        void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        )
      );
    FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check() &&
    n === PayShopDefine_1.MONTH_CARD_SHOP_ID
      ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        ))
      : (PayItemController_1.PayItemController.CurrentBlockIosPayState &&
          1 === Info_1.Info.PlatformType &&
          ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(134)),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          )),
        ((e = Protocol_1.Aki.Protocol.jhs.create()).J4n = n),
        (e.G7n = ModelManager_1.ModelManager.PayGiftModel.Version),
        Net_1.Net.Call(10370, e, (e) => {
          var o,
            r,
            t = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(n);
          e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ((o = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(
                t.GetGoodsData().ItemId,
              )),
              (r = ConfigManager_1.ConfigManager.ItemConfig.GetItemDesc(
                t.GetGoodsData().ItemId,
              )),
              ControllerHolder_1.ControllerHolder.KuroSdkController.SdkPay(
                t.GetGetPayGiftData().PayId,
                e.hBs,
                o,
                r,
                e.lBs,
              ))
            : e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrPayShopDataChanged
              ? this.SendPayGiftInfoRequest()
              : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.O4n,
                  28176,
                );
        }));
  }
}
(exports.PayGiftController = PayGiftController).hFi = (e) => {
  ControllerHolder_1.ControllerHolder.KuroSdkController.CancelCurrentWaitPayItemTimer();
  var o = { PayItemId: e.J4n, OrderId: e.hBs, ItemId: e.f8n, ItemCount: e.YVn };
  ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(e._Bs.J4n).Phrase(
    e._Bs,
  ),
    KuroSdkReport_1.KuroSdkReport.OnPayShopDirectBuy(e.J4n),
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnPayItemSuccess,
      o,
    );
};
//# sourceMappingURL=PayGiftController.js.map
