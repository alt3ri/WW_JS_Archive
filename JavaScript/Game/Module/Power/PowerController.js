"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PowerController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  CommonExchangeData_1 = require("../ItemExchange/View/CommonExchangeData"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  ShopController_1 = require("../Shop/ShopController"),
  PowerDefines_1 = require("./PowerDefines"),
  DEFAULTEXCHANGETIME = 60,
  REQUESTPOWERGAP = 1,
  CHECKPOWERGAP = 500;
class PowerController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(3663, (e) => {
      ModelManager_1.ModelManager.PowerModel.UpdatePowerData(e.I$s);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(3663);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ShopUpdate,
      this.aoo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PowerShopReady,
        this.Pdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnShopInfoResponded,
        this.hoo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BackLoginView,
        this.loo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.xkt,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ShopUpdate,
      this.aoo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PowerShopReady,
        this.Pdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnShopInfoResponded,
        this.hoo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BackLoginView,
        this.loo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.xkt,
      );
  }
  static OpenPowerView(e = 2, r = 0) {
    ModelManager_1.ModelManager.PowerModel.ResetPowerShopCount(),
      (ModelManager_1.ModelManager.PowerModel.CurrentNeedPower =
        0 < r ? r : DEFAULTEXCHANGETIME),
      ModelManager_1.ModelManager.PowerModel.CreateConfirmBoxData(e, r),
      ModelManager_1.ModelManager.FunctionModel.IsOpen(10017) &&
        !UiManager_1.UiManager.IsViewOpen("PowerView") &&
        this._oo();
  }
  static RequestPowerViewData() {
    ModelManager_1.ModelManager.PowerModel.ResetPowerShopCount(),
      ModelManager_1.ModelManager.FunctionModel.IsOpen(10017)
        ? this._oo()
        : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
            "Function_notopen_tili",
          );
  }
  static R6t() {
    void 0 !== PowerController.yzs &&
      (TimerSystem_1.TimerSystem.Remove(PowerController.yzs),
      (PowerController.yzs = void 0));
  }
  static GetIfCanRequestNewPower() {
    return TimeUtil_1.TimeUtil.GetServerTime() - this.Izs > REQUESTPOWERGAP;
  }
  static OpenOverPowerExchangeView() {
    var r = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
        ItemDefines_1.EItemId.Power,
      ),
      o = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
        ItemDefines_1.EItemId.OverPower,
      ),
      n =
        ConfigManager_1.ConfigManager.PowerConfig.GetPowerChargeLimit() -
        r.GetCurrentPower();
    if (0 == n)
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "PowerMaxCannotExchange",
        ),
      );
    else if (0 === o.GetCurrentPower())
      (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        ItemInfoById_1.configItemInfoById.GetConfig(
          ItemDefines_1.EItemId.OverPower,
        ).Name,
      )),
        (t = StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "PowerPropsCannotExchange",
          ),
          t,
        )),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
    else {
      var t = new CommonExchangeData_1.CommonExchangeData(),
        r =
          (t.InitBySrcAndDestItemId(
            ItemDefines_1.EItemId.OverPower,
            ItemDefines_1.EItemId.Power,
            o.GetCurrentPower(),
            r.GetCurrentPower(),
          ),
          (t.ConfirmCallBack = (e, r) => {
            var o =
                ModelManager_1.ModelManager.PowerModel.GetOverPowerShopConfig(),
              n = o?.Price;
            let t = ItemDefines_1.EItemId.OverPower;
            if (n)
              for (var [i] of n) {
                t = i;
                break;
              }
            ShopController_1.ShopController.SendShopBuyRequest(
              o.ShopId,
              o.Id,
              t,
              r,
              () => {
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "PowerBuySucceed",
                  r,
                );
              },
            );
          }),
          new CommonExchangeData_1.CommonExchangeViewData()),
        i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          t.GetSrcItemId(),
        );
      (r.GetGainCount = (e, r) => r),
        (r.GetConsumeCount = (e, r) => r),
        (r.GetConsumeTotalCount = (e, r) => r),
        (r.ShowCurrencyList = [
          ItemDefines_1.EItemId.OverPower,
          ItemDefines_1.EItemId.Power,
        ]),
        0 < ModelManager_1.ModelManager.PowerModel.CurrentNeedPower &&
          (r.StartSliderValue =
            ModelManager_1.ModelManager.PowerModel.CurrentNeedPower <=
            o.GetCurrentPower()
              ? ModelManager_1.ModelManager.PowerModel.CurrentNeedPower
              : o.GetCurrentPower());
      let e =
        ConfigManager_1.ConfigManager.PowerConfig.GetSingleTimeExchangePowerLimit();
      (e =
        n <
        ConfigManager_1.ConfigManager.PowerConfig.GetSingleTimeExchangePowerLimit()
          ? n
          : e) > o.GetCurrentPower() && (e = o.GetCurrentPower()),
        (r.StartSliderValue = r.StartSliderValue > e ? e : r.StartSliderValue),
        r.CreateData(t, e, i),
        UiManager_1.UiManager.OpenView("CommonExchangeView", r);
    }
  }
  static ExchangePower(e, r) {
    e.ItemId === ItemDefines_1.EItemId.OverPower
      ? this.OpenOverPowerExchangeView()
      : ShopController_1.ShopController.SendShopBuyRequest(
          e.ShopId,
          e.GoodsId,
          e.ItemId,
          r,
        );
  }
  static _oo() {
    ShopController_1.ShopController.SendShopInfoRequest(
      ModelManager_1.ModelManager.ShopModel.VersionId,
    );
  }
  static Clear() {
    return this.R6t(), super.Clear();
  }
}
(exports.PowerController = PowerController),
  ((_a = PowerController).IsTickEvenPausedInternal = !0),
  (PowerController.yzs = void 0),
  (PowerController.Izs = 0),
  (PowerController.loo = () => {
    UiManager_1.UiManager.IsViewShow("PowerView") &&
      UiManager_1.UiManager.CloseView("PowerView");
  }),
  (PowerController.hoo = () => {
    var e = ConfigManager_1.ConfigManager.PowerConfig.GetPowerShopIds().size;
    if (!(ModelManager_1.ModelManager.PowerModel.PowerShopCount >= e))
      for (const r of ConfigManager_1.ConfigManager.PowerConfig.GetPowerShopIds())
        ShopController_1.ShopController.SendShopUpdateRequest(r);
  }),
  (PowerController.aoo = (e) => {
    ModelManager_1.ModelManager.PowerModel.AddOnePowerShopCount(e);
  }),
  (PowerController.Pdi = () => {
    var e;
    UiManager_1.UiManager.IsViewShow("InventoryView") ||
      (ModelManager_1.ModelManager.PowerModel.ConfirmBoxData &&
        ((e = new PowerDefines_1.PowerViewData()),
        UiManager_1.UiManager.OpenView("PowerView", e)));
  }),
  (PowerController.xkt = () => {
    _a.SendUpdatePowerRequest(
      ModelManager_1.ModelManager.PowerModel.PowerItemKeyArray,
    ),
      _a.R6t(),
      (PowerController.yzs = TimerSystem_1.TimerSystem.Forever(
        PowerController.Tzs,
        CHECKPOWERGAP,
      ));
  }),
  (PowerController.Tzs = () => {
    ModelManager_1.ModelManager.PowerModel.UpdatePowerRenewTimer();
  }),
  (PowerController.SendUpdatePowerRequest = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("PowerModule", 28, "体力拉取", ["itemList", e]);
    var r = Protocol_1.Aki.Protocol.$Zn.create();
    (r.IVn = e),
      (_a.Izs = TimeUtil_1.TimeUtil.GetServerTime()),
      Net_1.Net.Call(17898, r, (e) => {
        e &&
          (e.A9n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.PowerModel.UpdatePowerData(e.T$s)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.A9n,
                14608,
              ));
      });
  });
//# sourceMappingURL=PowerController.js.map
