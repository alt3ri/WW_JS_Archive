"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShopController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class ShopController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDay, this.mvo);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CrossDay,
      this.mvo,
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(2066, (e) => {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Shop", 19, "Receive ShopInfoNotify"),
        (ModelManager_1.ModelManager.ShopModel.VersionId = e.dVn),
        ModelManager_1.ModelManager.ShopModel.UpdateShopListData(e.Axs);
    }),
      Net_1.Net.Register(7016, (e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Shop", 19, "Receive ShopUnlockNotify", [
            "unlockList",
            e.rUs,
          ]),
          this.OnShopUnlockNotify(e);
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(2066), Net_1.Net.UnRegister(7016);
  }
  static OpenShop(e, o) {
    if (ModelManager_1.ModelManager.ShopModel.IsOpen(e)) {
      if (!UiManager_1.UiManager.IsViewShow("ShopView"))
        return UiManager_1.UiManager.OpenView("ShopView", e, o), !0;
    } else
      GlobalData_1.GlobalData.World &&
        (o = ConfigManager_1.ConfigManager.ShopConfig.GetShopName(
          ModelManager_1.ModelManager.ShopModel.GetShopConfig(e).ShopName,
        )) &&
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "ShopNotOpenTip",
          o,
        );
    return !1;
  }
  static SendShopBuyRequest(o, t, e, r, n) {
    e = Protocol_1.Aki.Protocol.N_s.create({
      dVn: ModelManager_1.ModelManager.ShopModel.VersionId,
      CVn: o,
      Ekn: t,
      gVn: e,
      O3n: r,
      N4n:
        ModelManager_1.ModelManager.ShopModel
          .CurrentInteractCreatureDataLongId ?? 0,
    });
    Net_1.Net.Call(24075, e, (e) => {
      e &&
        (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
          ? (ModelManager_1.ModelManager.ShopModel.UpdateItemData(e),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Shop",
                28,
                "购买物品成功",
                ["id", e.Ekn],
                ["buyCount", e.s8n],
                ["response", e],
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BoughtItem,
              o,
              t,
            ),
            n && n())
          : ((e =
              ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
                e.lkn,
              )),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BoughtItem,
              0,
              0,
            )));
    });
  }
  static async SendShopInfoRequest(e) {
    (e = Protocol_1.Aki.Protocol.G_s.create({ dVn: e })),
      (e = await Net_1.Net.CallAsync(27883, e));
    return (
      !!e &&
      (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
        ? ((ModelManager_1.ModelManager.ShopModel.VersionId = e.dVn),
          ModelManager_1.ModelManager.ShopModel.UpdateShopListData(e.Axs),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnShopInfoResponded,
          ))
        : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            14783,
          ),
      !0)
    );
  }
  static SendShopUpdateRequest(e) {
    e = Protocol_1.Aki.Protocol.V_s.create({ CVn: e });
    Net_1.Net.Call(16470, e, (e) => {
      e &&
        (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
          ? ModelManager_1.ModelManager.ShopModel.UpdateShopData(e.a5n)
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              9541,
            ));
    });
  }
  static OnShopUnlockNotify(e) {
    for (const t of e.rUs) {
      var o;
      ModelManager_1.ModelManager.ShopModel.GetShopInfo(t.CVn) &&
        (o = ModelManager_1.ModelManager.ShopModel.GetShopItem(t.CVn, t.Ekn)) &&
        ((o.h3n = !1),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGoodUnlock),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Shop",
            28,
            "新商品解锁",
            ["id", t.Ekn],
            ["buyCount", t.CVn],
          ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ShopUpdate,
          t.CVn,
        ));
    }
  }
}
(exports.ShopController = ShopController),
  ((_a = ShopController).mvo = () => {
    _a.SendShopInfoRequest(
      ModelManager_1.ModelManager.ShopModel.VersionId,
    ).then((e) => {
      e &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ShopUpdate,
          ModelManager_1.ModelManager.ShopModel.OpenItemInfo?.ShopId,
        );
    });
  });
//# sourceMappingURL=ShopController.js.map
