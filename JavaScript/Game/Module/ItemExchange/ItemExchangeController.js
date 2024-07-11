"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemExchangeController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const LoginDefine_1 = require("../Login/Data/LoginDefine");
const CommonExchangeData_1 = require("./View/CommonExchangeData");
class ItemExchangeController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.ICi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        this.TCi,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.ICi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDay,
        this.TCi,
      );
  }
  static get NeedPop() {
    return this.LCi;
  }
  static OpenExchangeViewByItemId(e, t = void 0, n = !1) {
    const o = new CommonExchangeData_1.CommonExchangeData();
    o.InitByItemId(e),
      (o.ConfirmNoClose = n),
      (o.ConfirmCallBack = t),
      o.ConfirmCallBack ||
        (o.ConfirmCallBack = ItemExchangeController.ItemExchangeRequest),
      ItemExchangeController.OpenExchangeViewByData(o);
  }
  static OpenExchangeViewByData(e) {
    UiManager_1.UiManager.OpenView("CommonExchangeView", e);
  }
}
(exports.ItemExchangeController = ItemExchangeController),
  ((_a = ItemExchangeController).TCi = () => {
    const e = ModelManager_1.ModelManager.LoginModel.GetLoginStatus();
    e < LoginDefine_1.ELoginStatus.EnterGameRet
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "ItemExchange",
          9,
          "登录状态错误, 无法请求物品兑换数据",
          ["loginStatus", e],
        )
      : ItemExchangeController.ICi();
  }),
  (ItemExchangeController.ICi = () => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("ItemExchange", 9, "请求物品兑换数据");
    const e = Protocol_1.Aki.Protocol.Ots.create();
    Net_1.Net.Call(16460, e, (e) => {
      ModelManager_1.ModelManager.ItemExchangeModel.InitItemExchangeTimeInfo(
        e.zDs,
      );
    });
  }),
  (ItemExchangeController.LCi = !0),
  (ItemExchangeController.ItemExchangeRequest = (t, n, e = !0, o = void 0) => {
    n !== 0 &&
      ((_a.LCi = e),
      ((e = Protocol_1.Aki.Protocol.Nts.create()).G3n = t),
      (e.i6n = n),
      Net_1.Net.Call(14071, e, (e) => {
        (_a.LCi = !0),
          e &&
            (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.lkn,
                  29039,
                )
              : (ModelManager_1.ModelManager.ItemExchangeModel.AddExchangeTime(
                  t,
                  n,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.ItemExChangeResponse,
                  e.G3n,
                  e.g5n,
                ),
                o && o(e.G3n, e.g5n)));
      }));
  });
// # sourceMappingURL=ItemExchangeController.js.map
