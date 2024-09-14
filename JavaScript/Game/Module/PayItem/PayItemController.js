"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayItemController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  SdkViewData_1 = require("../../KuroSdk/View/SdkViewData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  ReconnectDefine_1 = require("../ReConnect/ReconnectDefine");
class PayItemController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20497, (e) => {
      e = { PayItemId: e.s5n, OrderId: e.CBs, ItemId: e.L8n, ItemCount: e.n9n };
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPayItemSuccess,
        e,
      ),
        PayItemController.KOi(),
        ModelManager_1.ModelManager.PayItemModel.CleanPayingItemName();
    }),
      Net_1.Net.Register(24533, PayItemController.QOi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24533), Net_1.Net.UnRegister(20497);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      this.gSe,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      this.gSe,
    );
  }
  static OnClear() {
    return this.KOi(), !0;
  }
  static aka(t) {
    var e = Protocol_1.Aki.Protocol.Whs.create();
    (e.s5n = t),
      (e.K7n = ModelManager_1.ModelManager.PayItemModel.Version),
      ModelManager_1.ModelManager.PayItemModel.UpdatePayingItemName(t),
      Net_1.Net.Call(27232, e, (e) => {
        var r, o;
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              27626,
            )
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Shop",
                11,
                "PayShop:ShopItem 充值请求成功,调用SDK接口",
                ["Id", t],
              ),
            (r = ModelManager_1.ModelManager.PayItemModel.CreateSdkPayment(
              t,
              e.CBs,
              e.gBs,
            )),
            ((o =
              new LogReportDefine_1.SdkPayGetServerBillEvent()).s_sdk_pay_order =
              e.CBs),
            ControllerHolder_1.ControllerHolder.LogReportController.LogReport(
              o,
            ),
            ControllerHolder_1.ControllerHolder.KuroSdkController.SdkPay(r));
      });
  }
  static KOi() {
    ControllerHolder_1.ControllerHolder.KuroSdkController.CancelCurrentWaitPayItemTimer();
  }
  static async SendPayItemInfoRequestAsync() {
    var e = Protocol_1.Aki.Protocol.Hhs.create(),
      e =
        ((e.K7n = ModelManager_1.ModelManager.PayItemModel.Version),
        await Net_1.Net.CallAsync(24911, e));
    if (!e) return !1;
    if (
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          21666,
        ),
      !e.K7n || !e.OUs)
    )
      return !1;
    (ModelManager_1.ModelManager.PayItemModel.Version = e.K7n),
      ModelManager_1.ModelManager.PayItemModel.InitDataListByServer(e.OUs);
    var e = ModelManager_1.ModelManager.PayItemModel.GetDataList(),
      r = new Array();
    for (const t of e) {
      var o =
        ConfigManager_1.ConfigManager.PayItemConfig.GetProductIdByPayItemId(
          t.PayItemId,
        );
      o && r.push(o);
    }
    return await this.QueryProductInfoAsync(r), !0;
  }
  static async QueryProductInfoAsync(e) {
    if (0 === e.length)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Pay",
            17,
            "QueryProductInfoAsync failed, productIds is null",
          ),
        !1
      );
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      var r,
        o =
          await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().QueryProductInfo(
            e,
          );
      if (!o.DataList)
        return (
          o.NeedReLogin
            ? ((r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(42)).SetTextArgs(
                o.FailReason,
              ),
              r.SetCloseFunction(() => {
                ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
                  ReconnectDefine_1.ELogoutReason.SdkRenewAccessTokenFailed,
                );
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
                r,
              ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Pay",
                17,
                "QueryProductInfoAsync failed, data is null",
              ),
          !1
        );
      ModelManager_1.ModelManager.PayItemModel.UpdateProductInfoMap(o.DataList);
    } else
      await ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
        e,
      ),
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ShowPlayStationStoreIcon(
          0,
        );
    return (
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnQueryProductInfo,
      ),
      !0
    );
  }
  static SdkPayNew(e) {
    var r;
    this.hka
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Pay", 17, "SdkPayNew failed, duplicate pay request")
      : (e =
            ModelManager_1.ModelManager.PayItemModel.GetProductLabelByGoodsId(
              e,
            ))
        ? (r =
            PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenCheckoutDialog(
              e,
            ))
          ? (this.hka = TimerSystem_1.TimerSystem.Forever(() => {
              switch (
                PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().PollCheckoutDialogResult()
              ) {
                case 2:
                  this.RequestSdkCheckout(),
                    TimerSystem_1.TimerSystem.Remove(this.hka),
                    (this.hka = void 0),
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.SdkPayEnd,
                      2,
                    );
                  break;
                case 1:
                  break;
                default:
                  TimerSystem_1.TimerSystem.Remove(this.hka),
                    (this.hka = void 0),
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.SdkPayEnd,
                      0,
                    );
              }
            }, 500))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Pay",
              17,
              "SdkPayNew failed, OpenCheckoutDialog failed",
              ["psnProductId", e],
              ["result", r],
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Pay",
            17,
            "SdkPayNew failed, psnProductLabel is null",
          );
  }
  static SdkPay(e) {
    var r, o;
    if (
      this.CurrentBlockBetaState &&
      FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()
    )
      return (
        (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
        void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          r,
        )
      );
    if (this.CurrentBlockIosPayState && 1 === Info_1.Info.PlatformType)
      return (
        (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(134)),
        void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          r,
        )
      );
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? (r =
          ConfigManager_1.ConfigManager.PayItemConfig.GetProductIdByPayItemId(
            e,
          ))
        ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowSdkProductInfoBeforePay()
          ? ((o =
              ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(
                r,
              )),
            (o = SdkViewData_1.SdkPayProductInformationViewData.Create(
              o.Name,
              o.Desc,
              r,
              function (e) {
                PayItemController.SdkPayNew(e);
              },
            )),
            UiManager_1.UiManager.OpenView("SdkPayProductInformationView", o))
          : this.SdkPayNew(r)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Pay", 17, "SdkPay failed, productId is null")
      : this.aka(e);
  }
  static ISe() {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId()
      ? ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString()
      : ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId()
        ? ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId().toString()
        : "";
  }
  static RequestSdkCheckout() {
    var e;
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
      ((e = {
        AccessToken: ModelManager_1.ModelManager.LoginModel.SdkAccessToken,
        ServerId: ModelManager_1.ModelManager.LoginModel.GetServerId(),
        ServerName: ModelManager_1.ModelManager.LoginModel.GetServerName(),
        RoleId: this.ISe().toString(),
        RoleName: ModelManager_1.ModelManager.FunctionModel.GetPlayerName(),
      }),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Pay", 17, "RequestSdkCheckout SDK销单", ["param", e]),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().RequestCheckoutProduct(
        e,
        (e, r, o) => {
          o ||
            (r
              ? ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(42)).SetTextArgs(
                  e,
                ),
                o.SetCloseFunction(() => {
                  ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
                    ReconnectDefine_1.ELogoutReason.SdkRenewAccessTokenFailed,
                  );
                }),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
                  o,
                ))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Pay", 17, "RequestSdkCheckout SDK销单", [
                  "msg",
                  e,
                ]));
        },
      ));
  }
}
(exports.PayItemController = PayItemController),
  ((_a = PayItemController).CurrentBlockIosPayState = !1),
  (PayItemController.CurrentBlockBetaState = !0),
  (PayItemController.gSe = () => {
    _a.RequestSdkCheckout();
  }),
  (PayItemController.QOi = (e) => {
    ModelManager_1.ModelManager.PayItemModel.ResetSpecialBonus(e.BVn);
  }),
  (PayItemController.hka = void 0);
//# sourceMappingURL=PayItemController.js.map
