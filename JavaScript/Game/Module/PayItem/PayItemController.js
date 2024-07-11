"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayItemController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
class PayItemController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(3901, (e) => {
      e = { PayItemId: e.Ekn, OrderId: e.$Ps, ItemId: e.G3n, ItemCount: e.g5n };
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPayItemSuccess,
        e,
      ),
        PayItemController.KNi(),
        ModelManager_1.ModelManager.PayItemModel.CleanPayingItemName();
    }),
      Net_1.Net.Register(15810, PayItemController.QNi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15810), Net_1.Net.UnRegister(3901);
  }
  static OnClear() {
    return this.KNi(), !0;
  }
  static SendBuyPayItemRequest(r) {
    if (
      this.CurrentBlockBetaState &&
      FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()
    )
      return (
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
        void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        )
      );
    if (
      this.CurrentBlockIosPayState &&
      ModelManager_1.ModelManager.PlatformModel.PlatformType === 1
    )
      return (
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(134)),
        void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        )
      );
    var e = Protocol_1.Aki.Protocol.$os.create();
    (e.Ekn = r),
      (e.o8n = ModelManager_1.ModelManager.PayItemModel.Version),
      ModelManager_1.ModelManager.PayItemModel.UpdatePayingItemName(r),
      Net_1.Net.Call(21780, e, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              19142,
            )
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Shop",
                11,
                "PayShop:ShopItem 充值请求成功,调用SDK接口",
                ["Id", r],
              ),
            (e = ModelManager_1.ModelManager.PayItemModel.CreateSdkPayment(
              r,
              e.$Ps,
              e.HPs,
            )),
            ControllerHolder_1.ControllerHolder.KuroSdkController.SdkPay(e));
      });
  }
  static KNi() {
    ControllerHolder_1.ControllerHolder.KuroSdkController.CancelCurrentWaitPayItemTimer();
  }
  static SendPayItemInfoRequest() {
    const e = Protocol_1.Aki.Protocol.Fos.create();
    (e.o8n = ModelManager_1.ModelManager.PayItemModel.Version),
      Net_1.Net.Call(10022, e, (e) => {
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
          (ModelManager_1.ModelManager.PayItemModel.Version = e.o8n),
            ModelManager_1.ModelManager.PayItemModel.InitDataListByServer(
              e.cRs,
            );
          var e = ModelManager_1.ModelManager.PayItemModel.GetDataList();
          const r = new Array();
          for (const t of e) {
            const o = ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(
              t.PayItemId,
            );
            r.push(o.PayId.toString());
          }
          ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProduct(r);
        }
      });
  }
}
((exports.PayItemController = PayItemController).CurrentBlockIosPayState = !1),
  (PayItemController.CurrentBlockBetaState = !0),
  (PayItemController.QNi = (e) => {
    ModelManager_1.ModelManager.PayItemModel.ResetSpecialBonus(e.j4n);
  });
// # sourceMappingURL=PayItemController.js.map
