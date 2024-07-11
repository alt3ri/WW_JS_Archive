"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayGiftController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const PayItemController_1 = require("../PayItem/PayItemController");
const PayShopDefine_1 = require("./PayShopDefine");
class PayGiftController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(5162, PayGiftController.h2i);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(5162);
  }
  static OnShopInfoNotify(e) {
    (ModelManager_1.ModelManager.PayGiftModel.Version = e.iUs.o8n),
      ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.iUs.tUs);
  }
  static OnShopInfoReceive(e) {
    e &&
      ((ModelManager_1.ModelManager.PayGiftModel.Version = e.o8n),
      ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.tUs));
  }
  static async SendPayGiftInfoRequestAsync() {
    var e = Protocol_1.Aki.Protocol.Kos.create();
    var e =
      ((e.o8n = ModelManager_1.ModelManager.PayGiftModel.Version),
      await Net_1.Net.CallAsync(12156, e));
    if (
      e &&
      (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          17073,
        ),
      e.o8n) &&
      e.cRs
    ) {
      (ModelManager_1.ModelManager.PayGiftModel.Version = e.o8n),
        ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.cRs);
      var e = ModelManager_1.ModelManager.PayGiftModel.GetDataList();
      const r = new Array();
      for (const o of e) r.push(o.ProductId);
      ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
        r,
      );
    }
  }
  static SendPayGiftInfoRequest() {
    const e = Protocol_1.Aki.Protocol.Kos.create();
    (e.o8n = ModelManager_1.ModelManager.PayGiftModel.Version),
      Net_1.Net.Call(12156, e, (e) => {
        if (
          e &&
          (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              17073,
            ),
          e.o8n) &&
          e.cRs
        ) {
          (ModelManager_1.ModelManager.PayGiftModel.Version = e.o8n),
            ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.cRs);
          var e = ModelManager_1.ModelManager.PayGiftModel.GetDataList();
          const r = new Array();
          for (const o of e) r.push(o.ProductId);
          ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
            r,
          );
        }
      });
  }
  static SendPayGiftRequest(n) {
    let e;
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
          ModelManager_1.ModelManager.PlatformModel.PlatformType === 1 &&
          ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(134)),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          )),
        ((e = Protocol_1.Aki.Protocol.Xos.create()).Ekn = n),
        (e.o8n = ModelManager_1.ModelManager.PayGiftModel.Version),
        Net_1.Net.Call(4104, e, (e) => {
          let r;
          let o;
          const t =
            ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(n);
          e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ((r = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(
                t.GetGoodsData().ItemId,
              )),
              (o = ConfigManager_1.ConfigManager.ItemConfig.GetItemDesc(
                t.GetGoodsData().ItemId,
              )),
              ControllerHolder_1.ControllerHolder.KuroSdkController.SdkPay(
                t.GetGetPayGiftData().PayId,
                e.$Ps,
                r,
                o,
                e.HPs,
              ))
            : e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrPayShopDataChanged
              ? this.SendPayGiftInfoRequest()
              : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.lkn,
                  14867,
                );
        }));
  }
}
(exports.PayGiftController = PayGiftController).h2i = (e) => {
  ControllerHolder_1.ControllerHolder.KuroSdkController.CancelCurrentWaitPayItemTimer();
  const r = {
    PayItemId: e.Ekn,
    OrderId: e.$Ps,
    ItemId: e.G3n,
    ItemCount: e.g5n,
  };
  ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(e.jPs.Ekn).Phrase(
    e.jPs,
  ),
    KuroSdkReport_1.KuroSdkReport.OnPayShopDirectBuy(e.Ekn),
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnPayItemSuccess,
      r,
    );
};
// # sourceMappingURL=PayGiftController.js.map
