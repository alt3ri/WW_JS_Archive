"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  GiftType_1 = require("../../../Core/Define/Config/SubType/GiftType"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
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
    Net_1.Net.Register(16585, PayShopController.dFi),
      Net_1.Net.Register(18139, PayShopController.CFi),
      Net_1.Net.Register(18502, PayShopController.gFi),
      Net_1.Net.Register(25931, PayShopController.fFi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16585),
      Net_1.Net.UnRegister(18139),
      Net_1.Net.UnRegister(18502),
      Net_1.Net.UnRegister(25931);
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
      t = Protocol_1.Aki.Protocol.ils.create(),
      t =
        ((t.K7n = ModelManager_1.ModelManager.PayShopModel.Version),
        await Net_1.Net.CallAsync(22097, t));
    return t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
      ? (ModelManager_1.ModelManager.PayShopModel.Version !== t.K7n &&
          ModelManager_1.ModelManager.PayShopModel.ClearData(),
        (o = t.OUs),
        (ModelManager_1.ModelManager.PayShopModel.Version = t.K7n),
        ModelManager_1.ModelManager.PayShopModel.SetPayShopInfoList(o),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Shop",
            28,
            "PayShop:ShopItem 请求商品信息结束",
            ["version", t.K7n],
            ["info", o],
          ),
        ControllerHolder_1.ControllerHolder.PayGiftController.OnShopInfoReceive(
          t?.DBs,
        ),
        !0)
      : (e &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.Q4n,
            26863,
          ),
        !1);
  }
  static SendRequestPayShopUpdate(a, n) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Shop",
        11,
        "PayShop:Root 请求刷新商城数据",
        ["ShopId", a],
        ["IsSwitch", n],
      );
    var e = Protocol_1.Aki.Protocol.ols.create();
    (e.s5n = a),
      Net_1.Net.Call(28448, e, (e) => {
        if (e)
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            const t = e.YVn;
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Shop",
                11,
                "PayShop:Root 请求刷新商城数据成功",
                ["ShopId", a],
                ["IsSwitch", n],
              ),
              ModelManager_1.ModelManager.PayShopModel.SetPayShopInfo(t);
            var o = this.pFi(a);
            const r = () => {
              n
                ? EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.SwitchPayShopView,
                    t.s5n,
                  )
                : EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.RefreshPayShop,
                    t.s5n,
                    !0,
                  );
            };
            0 < o?.length
              ? ControllerHolder_1.ControllerHolder.PayItemController.QueryProductInfoAsync(
                  o,
                ).then(() => {
                  r();
                })
              : r();
          } else
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              28760,
            );
      });
  }
  static pFi(e) {
    var o = new Array();
    if (100 === e)
      for (const t of ModelManager_1.ModelManager.PayItemModel.GetDataList())
        o.push(t.ProductId);
    if (3 === e)
      for (const r of ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataList())
        o.push(r.ProductId);
    return o;
  }
  static SendRequestPayShopItemUpdate(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Shop", 28, "PayShop:ShopItem 请求刷新商品列表", [
        "goodsIdList",
        e,
      ]);
    var o = Protocol_1.Aki.Protocol.sls.create();
    (o.Q7n = e),
      Net_1.Net.Call(15889, o, (e) => {
        var o;
        e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
          ? ((o = e.bMs),
            ModelManager_1.ModelManager.PayShopModel.SetPayShopGoodsList(o))
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              16017,
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
    var a = Protocol_1.Aki.Protocol.hls.create();
    (a.s5n = t),
      (a.m9n = r),
      (a.K7n = ModelManager_1.ModelManager.PayShopModel.Version),
      Net_1.Net.Call(23149, a, (e) => {
        var o;
        e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
          ? ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
              e.s5n,
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
              e.s5n,
              e.m9n,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.PayShopGoodsBuy,
            ))
          : e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrPayShopDataChanged
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
                e.Q4n,
                20193,
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
    if (
      (e.SaveRemindState(TimeUtil_1.TimeUtil.GetServerTime()),
      e.CheckIfMonthCardItem())
    )
      this.OpenGiftDetailsView(e);
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
      ["version", e.K7n],
    );
  var o = e.OUs;
  (ModelManager_1.ModelManager.PayShopModel.Version = e.K7n),
    ModelManager_1.ModelManager.PayShopModel.SetPayShopInfoList(o),
    ControllerHolder_1.ControllerHolder.PayGiftController.OnShopInfoNotify(e);
}),
  (PayShopController.CFi = (e) => {
    e = e.ABs;
    ModelManager_1.ModelManager.PayShopModel.UnLockPayShopGoods(e);
  }),
  (PayShopController.fFi = (e) => {
    e = e.bMs;
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
        ["id", e.PBs],
        ["count", e.n9n],
      ),
      KuroSdkReport_1.KuroSdkReport.OnPayShopDirectBuy(e.PBs),
      void 0 !== e.PBs &&
        0 !== e.PBs &&
        ModelManager_1.ModelManager.PayShopModel.UpdatePayShopGoodsCount(
          e.PBs,
          e.n9n,
        ),
      e.PBs !== PayShopDefine_1.MONTH_CARD_SHOP_ID &&
        e.PBs !== PayShopDefine_1.BATTLE_PASS_PRIMARY_ID &&
        e.PBs !== PayShopDefine_1.BATTLE_PASS_HIGH_ID &&
        (e.PBs, PayShopDefine_1.BATTLE_PASS_PRIMARY_TO_HIGH_ID),
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
