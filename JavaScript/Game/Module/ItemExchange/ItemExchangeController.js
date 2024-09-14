"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemExchangeController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  LoginDefine_1 = require("../Login/Data/LoginDefine"),
  CommonExchangeData_1 = require("./View/CommonExchangeData");
class ItemExchangeController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.Igi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        this.Tgi,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.Igi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDay,
        this.Tgi,
      );
  }
  static get NeedPop() {
    return this.Lgi;
  }
  static OpenExchangeViewByItemId(e, n = void 0, t = !1) {
    var o = new CommonExchangeData_1.CommonExchangeData();
    o.InitByItemId(e),
      (o.ConfirmNoClose = t),
      (o.ConfirmCallBack = n),
      o.ConfirmCallBack ||
        (o.ConfirmCallBack = ItemExchangeController.ItemExchangeRequest),
      ItemExchangeController.OpenExchangeViewByData(o);
  }
  static OpenExchangeViewByData(e) {
    var n = new CommonExchangeData_1.CommonExchangeViewData(),
      t = ModelManager_1.ModelManager.ItemExchangeModel.GetMaxExChangeTime(
        e.GetDestItemId(),
      ),
      o = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        e.GetSrcItemId(),
      );
    (n.GetGainCount = (e, n) => {
      return ModelManager_1.ModelManager.ItemExchangeModel.GetCurExchangeInfo(
        e,
        n,
      ).GainCount;
    }),
      (n.GetConsumeCount = (e, n) => {
        return ModelManager_1.ModelManager.ItemExchangeModel.GetCurExchangeInfo(
          e,
          n,
        ).ConsumeCount;
      }),
      (n.GetConsumeTotalCount = (e, n) => e * n),
      n.CreateData(e, t, o),
      UiManager_1.UiManager.OpenView("CommonExchangeView", n);
  }
}
(exports.ItemExchangeController = ItemExchangeController),
  ((_a = ItemExchangeController).Tgi = () => {
    var e = ModelManager_1.ModelManager.LoginModel.GetLoginStatus();
    e < LoginDefine_1.ELoginStatus.EnterGameRet
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "ItemExchange",
          9,
          "登录状态错误, 无法请求物品兑换数据",
          ["loginStatus", e],
        )
      : ItemExchangeController.Igi();
  }),
  (ItemExchangeController.Igi = () => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("ItemExchange", 9, "请求物品兑换数据");
    var e = Protocol_1.Aki.Protocol.Fns.create();
    Net_1.Net.Call(28765, e, (e) => {
      ModelManager_1.ModelManager.ItemExchangeModel.InitItemExchangeTimeInfo(
        e.Ixs,
      );
    });
  }),
  (ItemExchangeController.Lgi = !0),
  (ItemExchangeController.ItemExchangeRequest = (n, t, e = !0, o = void 0) => {
    0 !== t &&
      ((_a.Lgi = e),
      ((e = Protocol_1.Aki.Protocol.$ns.create()).L8n = n),
      (e.j9n = t),
      Net_1.Net.Call(29011, e, (e) => {
        (_a.Lgi = !0),
          e &&
            (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Q4n,
                  20145,
                )
              : (ModelManager_1.ModelManager.ItemExchangeModel.AddExchangeTime(
                  n,
                  t,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.ItemExChangeResponse,
                  e.L8n,
                  e.n9n,
                ),
                o && o(e.L8n, e.n9n)));
      }));
  });
//# sourceMappingURL=ItemExchangeController.js.map
