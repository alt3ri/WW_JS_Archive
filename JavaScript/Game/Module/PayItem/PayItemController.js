"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayItemController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
class PayItemController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(5235, (e) => {
      e = { PayItemId: e.J4n, OrderId: e.hBs, ItemId: e.f8n, ItemCount: e.YVn };
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPayItemSuccess,
        e,
      ),
        PayItemController.KOi(),
        ModelManager_1.ModelManager.PayItemModel.CleanPayingItemName();
    }),
      Net_1.Net.Register(27561, PayItemController.QOi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27561), Net_1.Net.UnRegister(5235);
  }
  static OnClear() {
    return this.KOi(), !0;
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
    if (this.CurrentBlockIosPayState && 1 === Info_1.Info.PlatformType)
      return (
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(134)),
        void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        )
      );
    var e = Protocol_1.Aki.Protocol.khs.create();
    (e.J4n = r),
      (e.G7n = ModelManager_1.ModelManager.PayItemModel.Version),
      ModelManager_1.ModelManager.PayItemModel.UpdatePayingItemName(r),
      Net_1.Net.Call(23357, e, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              9045,
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
              e.hBs,
              e.lBs,
            )),
            ControllerHolder_1.ControllerHolder.KuroSdkController.SdkPay(e));
      });
  }
  static KOi() {
    ControllerHolder_1.ControllerHolder.KuroSdkController.CancelCurrentWaitPayItemTimer();
  }
  static SendPayItemInfoRequest() {
    var e = Protocol_1.Aki.Protocol.Ghs.create();
    (e.G7n = ModelManager_1.ModelManager.PayItemModel.Version),
      Net_1.Net.Call(4046, e, (e) => {
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
          (ModelManager_1.ModelManager.PayItemModel.Version = e.G7n),
            ModelManager_1.ModelManager.PayItemModel.InitDataListByServer(
              e.UUs,
            );
          var e = ModelManager_1.ModelManager.PayItemModel.GetDataList(),
            r = new Array();
          for (const t of e) {
            var o = ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(
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
  (PayItemController.QOi = (e) => {
    ModelManager_1.ModelManager.PayItemModel.ResetSpecialBonus(e.IVn);
  });
//# sourceMappingURL=PayItemController.js.map
