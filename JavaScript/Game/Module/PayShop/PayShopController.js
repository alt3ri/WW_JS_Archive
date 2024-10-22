"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  GiftType_1 = require("../../../Core/Define/Config/SubType/GiftType"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  PayItemController_1 = require("../PayItem/PayItemController"),
  PayShopViewData_1 = require("./PayShopData/PayShopViewData"),
  PayShopDefine_1 = require("./PayShopDefine"),
  ExchangePopData_1 = require("./PopView/Exchange/ExchangePopData");
class PayShopController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(21842, PayShopController.dFi),
      Net_1.Net.Register(4308, PayShopController.CFi),
      Net_1.Net.Register(10690, PayShopController.gFi),
      Net_1.Net.Register(21989, PayShopController.fFi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21842),
      Net_1.Net.UnRegister(4308),
      Net_1.Net.UnRegister(10690),
      Net_1.Net.UnRegister(21989);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.nye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      );
  }
  static async SendRequestPayShopInfo(e = !0) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Shop", 28, "PayShop:ShopItem 请求商品信息");
    var o,
      t = Protocol_1.Aki.Protocol.Xhs.create(),
      t =
        ((t.G7n = ModelManager_1.ModelManager.PayShopModel.Version),
        await Net_1.Net.CallAsync(8315, t));
    return t.O4n === Protocol_1.Aki.Protocol.O4n.NRs
      ? (ModelManager_1.ModelManager.PayShopModel.Version !== t.G7n &&
          ModelManager_1.ModelManager.PayShopModel.ClearData(),
        (o = t.UUs),
        (ModelManager_1.ModelManager.PayShopModel.Version = t.G7n),
        ModelManager_1.ModelManager.PayShopModel.SetPayShopInfoList(o),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Shop",
            28,
            "PayShop:ShopItem 请求商品信息结束",
            ["version", t.G7n],
            ["info", o],
          ),
        ControllerHolder_1.ControllerHolder.PayGiftController.OnShopInfoReceive(
          t?.SBs,
        ),
        !0)
      : (e &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.O4n,
            25610,
          ),
        !1);
  }
  static SendRequestPayShopUpdate(t, r) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Shop",
        11,
        "PayShop:Root 请求刷新商城数据",
        ["ShopId", t],
        ["IsSwitch", r],
      );
    var e = Protocol_1.Aki.Protocol.Jhs.create();
    (e.J4n = t),
      Net_1.Net.Call(9183, e, (e) => {
        var o;
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ((o = e.FVn),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Shop",
                  11,
                  "PayShop:Root 请求刷新商城数据成功",
                  ["ShopId", t],
                  ["IsSwitch", r],
                ),
              ModelManager_1.ModelManager.PayShopModel.SetPayShopInfo(o, r),
              (o = this.pFi(t)),
              ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
                o,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                9081,
              ));
      });
  }
  static pFi(e) {
    var o = new Array();
    if (100 === e)
      for (const r of ModelManager_1.ModelManager.PayItemModel.GetDataList()) {
        var t = ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(
          r.PayItemId,
        );
        o.push(t.PayId.toString());
      }
    if (3 === e)
      for (const a of ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataList())
        o.push(a.ProductId);
    return o;
  }
  static SendRequestPayShopItemUpdate(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Shop", 28, "PayShop:ShopItem 请求刷新商品列表", [
        "goodsIdList",
        e,
      ]);
    var o = Protocol_1.Aki.Protocol.Zhs.create();
    (o.O7n = e),
      Net_1.Net.Call(24543, o, (e) => {
        var o;
        e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
          ? ((o = e.RMs),
            ModelManager_1.ModelManager.PayShopModel.SetPayShopGoodsList(o))
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              1477,
            );
      });
  }
  static SendRequestPayShopBuy(e, o = 1) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Shop",
        11,
        "PayShop:ShopItem 请求购买商品",
        ["Id", e],
        ["Count", o],
      );
    var t =
      ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(
        e,
      ).GetGoodsData();
    PayShopController.SendRequestPayShopNormalBuy(e, t.ItemId, t.ItemCount, o);
  }
  static SendRequestPayShopNormalBuy(t, e, o, r) {
    var a = Protocol_1.Aki.Protocol.tls.create();
    (a.J4n = t),
      (a.o9n = r),
      (a.G7n = ModelManager_1.ModelManager.PayShopModel.Version),
      Net_1.Net.Call(18073, a, (e) => {
        var o;
        e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
          ? ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
              e.J4n,
            ) &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Shop",
                11,
                "PayShop:ShopItem 购买商品成功",
                ["Id", t],
                ["Count", r],
              ),
            ModelManager_1.ModelManager.PayShopModel.UpdatePayShopGoodsCount(
              e.J4n,
              e.o9n,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.PayShopGoodsBuy,
            ))
          : e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrPayShopDataChanged
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Shop",
                  11,
                  "PayShop:ShopItem 商品数据不同步,通知versioncode变化",
                  ["Id", t],
                  ["Count", r],
                ),
              (o =
                ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
                  t,
                )),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshPayShop,
                o.ShopId,
                !1,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ShopVersionCodeChange,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                15219,
              );
      });
  }
  static OpenGiftDetailsView(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Shop", 11, "PayShop:ShopItem 打开礼包界面");
    var o = new ExchangePopData_1.ExchangePopData();
    (o.PayShopGoods = e),
      (o.ShopItemResource = "UiItem_ShopItem"),
      UiManager_1.UiManager.OpenView("GiftPackageDetailsView", o);
  }
  static OpenExchangePopView(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Shop", 11, "PayShop:ShopItem 打开兑换界面");
    var o = new ExchangePopData_1.ExchangePopData(),
      e = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(e);
    (o.PayShopGoods = e),
      (o.ShopItemResource = "UiItem_ShopItem"),
      UiManager_1.UiManager.OpenView("ExchangePopView", o);
  }
  static OpenBuyViewByGoodsId(e) {
    var o = e.GetGoodsData().Id;
    if (e.CheckIfMonthCardItem()) this.OpenGiftDetailsView(e);
    else {
      if (11 === e.GetGoodsData().GetRewardItemType()) {
        var t = e.GetGoodsData().GetGiftId();
        if (
          t &&
          ConfigManager_1.ConfigManager.GiftPackageConfig?.GetGiftPackageConfig(
            t,
          )?.Type === GiftType_1.GiftType.Fixed
        )
          return void this.OpenGiftDetailsView(e);
      }
      this.OpenExchangePopView(o);
    }
  }
  static OpenPayShopView(e = void 0, o = void 0) {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10010)
      ? PayShopController.SendRequestPayShopInfo().then(() => {
          UiManager_1.UiManager.OpenView("PayShopRootView", e, o);
        })
      : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FunctionDisable",
        );
  }
  static OpenPayShopViewWithTab(e, o) {
    var t;
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10010)
      ? UiManager_1.UiManager.IsViewOpen("PayShopRootView")
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SwitchPayShopTabItem,
            e,
            o,
          )
        : (((t = new PayShopViewData_1.PayShopViewData()).PayShopId = e),
          (t.SwitchId = o),
          this.OpenPayShopView(t))
      : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FunctionDisable",
        );
  }
  static OpenPayShopViewToRecharge() {
    var e;
    if (
      PayItemController_1.PayItemController.CurrentBlockBetaState &&
      FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()
    )
      return (
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
        void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        )
      );
    UiManager_1.UiManager.IsViewShow("PayShopRootView")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SwitchPayShopTabItem,
          100,
          1,
        )
      : (((e = new PayShopViewData_1.PayShopViewData()).PayShopId = 100),
        PayShopController.OpenPayShopView(e));
  }
  static ClosePayShopGoodDetailPopView() {
    for (const e of ["ExchangePopView", "GiftPackageDetailsView"])
      UiManager_1.UiManager.IsViewOpen(e) && UiManager_1.UiManager.CloseView(e);
  }
}
((exports.PayShopController = PayShopController).dFi = (e) => {
  Log_1.Log.CheckInfo() &&
    Log_1.Log.Info(
      "Shop",
      28,
      "PayShop:ShopItem NotifyPayShopInfo 接收到商品信息更新",
      ["version", e.G7n],
      ["payShopInfoList", e.UUs],
    );
  var o = e.UUs;
  (ModelManager_1.ModelManager.PayShopModel.Version = e.G7n),
    ModelManager_1.ModelManager.PayShopModel.SetPayShopInfoList(o),
    ControllerHolder_1.ControllerHolder.PayGiftController.OnShopInfoNotify(e);
}),
  (PayShopController.CFi = (e) => {
    e = e.EBs;
    ModelManager_1.ModelManager.PayShopModel.UnLockPayShopGoods(e);
  }),
  (PayShopController.fFi = (e) => {
    e = e.RMs;
    ModelManager_1.ModelManager.PayShopModel.SetPayShopGoodsList(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Shop",
          28,
          "PayShop:ShopItem NotifyPayShopConditionFinish 接收到商品信息更新",
        );
  }),
  (PayShopController.gFi = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Shop",
        28,
        "PayShop:ShopItem NotifyPayShopDirectBuy 接收到直购结构",
        ["id", e.yBs],
        ["count", e.YVn],
      ),
      KuroSdkReport_1.KuroSdkReport.OnPayShopDirectBuy(e.yBs),
      void 0 !== e.yBs &&
        0 !== e.yBs &&
        ModelManager_1.ModelManager.PayShopModel.UpdatePayShopGoodsCount(
          e.yBs,
          e.YVn,
        ),
      e.yBs !== PayShopDefine_1.MONTH_CARD_SHOP_ID &&
        e.yBs !== PayShopDefine_1.BATTLE_PASS_PRIMARY_ID &&
        e.yBs !== PayShopDefine_1.BATTLE_PASS_HIGH_ID &&
        (e.yBs, PayShopDefine_1.BATTLE_PASS_PRIMARY_TO_HIGH_ID),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PayShopGoodsBuy);
  }),
  (PayShopController.nye = () => {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10010) &&
      PayShopController.SendRequestPayShopInfo(!1);
  }),
  (PayShopController.RQe = (e, o) => {
    10010 === e && o && PayShopController.SendRequestPayShopInfo(!1);
  });
//# sourceMappingURL=PayShopController.js.map
