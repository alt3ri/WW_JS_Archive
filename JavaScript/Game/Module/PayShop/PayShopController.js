"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const GiftType_1 = require("../../../Core/Define/Config/SubType/GiftType");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const PayItemController_1 = require("../PayItem/PayItemController");
const PayShopViewData_1 = require("./PayShopData/PayShopViewData");
const PayShopDefine_1 = require("./PayShopDefine");
const ExchangePopData_1 = require("./PopView/Exchange/ExchangePopData");
class PayShopController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19949, PayShopController.d2i),
      Net_1.Net.Register(18469, PayShopController.C2i),
      Net_1.Net.Register(28135, PayShopController.g2i),
      Net_1.Net.Register(21342, PayShopController.f2i);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19949),
      Net_1.Net.UnRegister(18469),
      Net_1.Net.UnRegister(28135),
      Net_1.Net.UnRegister(21342);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.gKe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.nye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.gKe,
      );
  }
  static async SendRequestPayShopInfo(e = !0) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Shop", 28, "PayShop:ShopItem 请求商品信息");
    let o;
    var t = Protocol_1.Aki.Protocol.Zos.create();
    var t =
      ((t.o8n = ModelManager_1.ModelManager.PayShopModel.Version),
      await Net_1.Net.CallAsync(16248, t));
    return t.lkn === Protocol_1.Aki.Protocol.lkn.Sys
      ? (ModelManager_1.ModelManager.PayShopModel.Version !== t.o8n &&
          ModelManager_1.ModelManager.PayShopModel.ClearData(),
        (o = t.cRs),
        (ModelManager_1.ModelManager.PayShopModel.Version = t.o8n),
        ModelManager_1.ModelManager.PayShopModel.SetPayShopInfoList(o),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Shop",
            28,
            "PayShop:ShopItem 请求商品信息结束",
            ["version", t.o8n],
            ["info", o],
          ),
        ControllerHolder_1.ControllerHolder.PayGiftController.OnShopInfoReceive(
          t?.iUs,
        ),
        !0)
      : (e &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.lkn,
            1124,
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
    const e = Protocol_1.Aki.Protocol.tns.create();
    (e.Ekn = t),
      Net_1.Net.Call(17541, e, (e) => {
        let o;
        e &&
          (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ((o = e.a5n),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Shop",
                  11,
                  "PayShop:Root 请求刷新商城数据成功",
                  ["ShopId", t],
                  ["IsSwitch", r],
                ),
              ModelManager_1.ModelManager.PayShopModel.SetPayShopInfo(o, r),
              (o = this.p2i(t)),
              ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
                o,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                5433,
              ));
      });
  }
  static p2i(e) {
    const o = new Array();
    if (e === 100)
      for (const r of ModelManager_1.ModelManager.PayItemModel.GetDataList()) {
        const t = ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(
          r.PayItemId,
        );
        o.push(t.PayId.toString());
      }
    if (e === 3)
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
    const o = Protocol_1.Aki.Protocol.rns.create();
    (o.n8n = e),
      Net_1.Net.Call(27780, o, (e) => {
        let o;
        e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
          ? ((o = e._gs),
            ModelManager_1.ModelManager.PayShopModel.SetPayShopGoodsList(o))
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              21744,
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
    const t =
      ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(
        e,
      ).GetGoodsData();
    PayShopController.SendRequestPayShopNormalBuy(e, t.ItemId, t.ItemCount, o);
  }
  static SendRequestPayShopNormalBuy(t, e, o, r) {
    const a = Protocol_1.Aki.Protocol.nns.create();
    (a.Ekn = t),
      (a.I5n = r),
      (a.o8n = ModelManager_1.ModelManager.PayShopModel.Version),
      Net_1.Net.Call(27482, a, (e) => {
        let o;
        e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
          ? ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
              e.Ekn,
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
              e.Ekn,
              e.I5n,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.PayShopGoodsBuy,
            ))
          : e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrPayShopDataChanged
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
                e.lkn,
                15214,
              );
      });
  }
  static OpenGiftDetailsView(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Shop", 11, "PayShop:ShopItem 打开礼包界面");
    const o = new ExchangePopData_1.ExchangePopData();
    (o.PayShopGoods = e),
      (o.ShopItemResource = "UiItem_ShopItem"),
      UiManager_1.UiManager.OpenView("GiftPackageDetailsView", o);
  }
  static OpenExchangePopView(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Shop", 11, "PayShop:ShopItem 打开兑换界面");
    const o = new ExchangePopData_1.ExchangePopData();
    var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(e);
    (o.PayShopGoods = e),
      (o.ShopItemResource = "UiItem_ShopItem"),
      UiManager_1.UiManager.OpenView("ExchangePopView", o);
  }
  static OpenBuyViewByGoodsId(e) {
    const o = e.GetGoodsData().Id;
    if (e.CheckIfMonthCardItem()) this.OpenGiftDetailsView(e);
    else {
      if (e.GetGoodsData().GetRewardItemType() === 11) {
        const t = e.GetGoodsData().GetGiftId();
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
    let t;
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
    let e;
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
((exports.PayShopController = PayShopController).d2i = (e) => {
  Log_1.Log.CheckInfo() &&
    Log_1.Log.Info(
      "Shop",
      28,
      "PayShop:ShopItem NotifyPayShopInfo 接收到商品信息更新",
      ["version", e.o8n],
      ["payShopInfoList", e.cRs],
    );
  const o = e.cRs;
  (ModelManager_1.ModelManager.PayShopModel.Version = e.o8n),
    ModelManager_1.ModelManager.PayShopModel.SetPayShopInfoList(o),
    ControllerHolder_1.ControllerHolder.PayGiftController.OnShopInfoNotify(e);
}),
  (PayShopController.C2i = (e) => {
    e = e.rUs;
    ModelManager_1.ModelManager.PayShopModel.UnLockPayShopGoods(e);
  }),
  (PayShopController.f2i = (e) => {
    e = e._gs;
    ModelManager_1.ModelManager.PayShopModel.SetPayShopGoodsList(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Shop",
          28,
          "PayShop:ShopItem NotifyPayShopConditionFinish 接收到商品信息更新",
        );
  }),
  (PayShopController.g2i = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Shop",
        28,
        "PayShop:ShopItem NotifyPayShopDirectBuy 接收到直购结构",
        ["id", e.oUs],
        ["count", e.g5n],
      ),
      KuroSdkReport_1.KuroSdkReport.OnPayShopDirectBuy(e.oUs),
      void 0 !== e.oUs &&
        e.oUs !== 0 &&
        ModelManager_1.ModelManager.PayShopModel.UpdatePayShopGoodsCount(
          e.oUs,
          e.g5n,
        ),
      e.oUs !== PayShopDefine_1.MONTH_CARD_SHOP_ID &&
        e.oUs !== PayShopDefine_1.BATTLE_PASS_PRIMARY_ID &&
        e.oUs !== PayShopDefine_1.BATTLE_PASS_HIGH_ID &&
        (e.oUs, PayShopDefine_1.BATTLE_PASS_PRIMARY_TO_HIGH_ID),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PayShopGoodsBuy);
  }),
  (PayShopController.nye = () => {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10010) &&
      PayShopController.SendRequestPayShopInfo(!1);
  }),
  (PayShopController.gKe = (e, o) => {
    e === 10010 && o && PayShopController.SendRequestPayShopInfo(!1);
  });
// # sourceMappingURL=PayShopController.js.map
