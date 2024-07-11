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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDay, this._Mo);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CrossDay,
      this._Mo,
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(8572, (e) => {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Shop", 19, "Receive ShopInfoNotify"),
        (ModelManager_1.ModelManager.ShopModel.VersionId = e.WHn),
        ModelManager_1.ModelManager.ShopModel.UpdateShopListData(e.Qqs);
    }),
      Net_1.Net.Register(6269, (e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Shop", 19, "Receive ShopUnlockNotify", [
            "unlockList",
            e.EBs,
          ]),
          this.OnShopUnlockNotify(e);
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(8572), Net_1.Net.UnRegister(6269);
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
    e = Protocol_1.Aki.Protocol.Bms.create({
      WHn: ModelManager_1.ModelManager.ShopModel.VersionId,
      KHn: o,
      J4n: t,
      QHn: e,
      p8n: r,
      vVn:
        ModelManager_1.ModelManager.ShopModel
          .CurrentInteractCreatureDataLongId ?? 0,
    });
    Net_1.Net.Call(4664, e, (e) => {
      e &&
        (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
          ? (ModelManager_1.ModelManager.ShopModel.UpdateItemData(e),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Shop",
                28,
                "购买物品成功",
                ["id", e.J4n],
                ["buyCount", e.N7n],
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
                e.O4n,
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
    (e = Protocol_1.Aki.Protocol.wms.create({ WHn: e })),
      (e = await Net_1.Net.CallAsync(28323, e));
    return (
      !!e &&
      (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
        ? ((ModelManager_1.ModelManager.ShopModel.VersionId = e.WHn),
          ModelManager_1.ModelManager.ShopModel.UpdateShopListData(e.Qqs),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnShopInfoResponded,
          ))
        : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            6938,
          ),
      !0)
    );
  }
  static SendShopUpdateRequest(e) {
    e = Protocol_1.Aki.Protocol.Gms.create({ KHn: e });
    Net_1.Net.Call(25502, e, (e) => {
      e &&
        (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
          ? ModelManager_1.ModelManager.ShopModel.UpdateShopData(e.FVn)
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              11067,
            ));
    });
  }
  static OnShopUnlockNotify(e) {
    for (const t of e.EBs) {
      var o;
      ModelManager_1.ModelManager.ShopModel.GetShopInfo(t.KHn) &&
        (o = ModelManager_1.ModelManager.ShopModel.GetShopItem(t.KHn, t.J4n)) &&
        ((o.j6n = !1),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGoodUnlock),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Shop",
            28,
            "新商品解锁",
            ["id", t.J4n],
            ["buyCount", t.KHn],
          ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ShopUpdate,
          t.KHn,
        ));
    }
  }
}
(exports.ShopController = ShopController),
  ((_a = ShopController)._Mo = () => {
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
