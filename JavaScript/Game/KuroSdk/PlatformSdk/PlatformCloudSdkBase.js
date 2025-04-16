"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformCloudSdkBase = void 0);
const Json_1 = require("../../../Core/Common/Json"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  CloudGameManagerLauncher_1 = require("../../../Launcher/Platform/CloudGameManagerLauncher"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  CloudGameManager_1 = require("../../Manager/CloudGameManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine"),
  KuroSdkData_1 = require("../KuroSdkData"),
  KuroSdkReport_1 = require("../KuroSdkReport"),
  PlatformSdkWindows_1 = require("./PlatformSdkWindows"),
  WEBVIEWCD = 5e3;
class PlatformCloudSdkBase extends PlatformSdkWindows_1.PlatformSdkWindows {
  constructor() {
    super(...arguments),
      (this.CustomerServiceResultCallBack = (e) => {
        var o = Json_1.Json.Parse(e);
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("CloudGame", 58, "当前客服红点数量", ["num", e]),
          o &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("CloudGame", 58, "当前客服红点数量", [
                "num",
                o.isredot,
              ]),
            (this.CurrentCustomerShowState = 0 < o.isredot)),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SdkCustomerRedPointRefresh,
          );
      }),
      (this.Ou_ = (e) => {
        0 === Json_1.Json.Decode(e).ErrorCode
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnShareResult,
              !0,
            )
          : EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnShareResult,
              !1,
            );
      }),
      (this.Gu_ = (e) => {
        var o,
          e = Json_1.Json.Decode(e);
        ControllerHolder_1.ControllerHolder.KuroSdkController.OnSdkPayEnd(
          1 === e.paymentType,
          "",
        ),
          1 === e.paymentType
            ? (((o =
                new LogReportDefine_1.SuccessSdkPayEvent()).s_sdk_pay_order =
                ModelManager_1.ModelManager.KuroSdkModel.CurrentPayingOrderId),
              ControllerHolder_1.ControllerHolder.LogReportController.LogReport(
                o,
              ))
            : (((o = new LogReportDefine_1.FailSdkPayEvent()).s_sdk_pay_order =
                ModelManager_1.ModelManager.KuroSdkModel.CurrentPayingOrderId),
              (o.s_reason = 3 === e.paymentType ? "cancel" : "fail"),
              ControllerHolder_1.ControllerHolder.LogReportController.LogReport(
                o,
              )),
          KuroSdkReport_1.KuroSdkReport.OnSdkPay();
      }),
      (this.oR1 = (e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("KuroSdk", 27, "Cloud KuroGameWinStateBindFunction", [
            "data",
            e,
          ]);
        e = Json_1.Json.Parse(e);
        let o = !1;
        e && "0" === e.status && (o = !0),
          ModelManager_1.ModelManager.KuroSdkModel.OnSdkFocusChange(o);
      });
  }
  BindProtocolListener() {}
  BindShareResultListener() {
    CloudGameManager_1.CloudGameManager.BindFunction("OnShareResult", this.Ou_),
      CloudGameManager_1.CloudGameManager.BindFunction(
        "OnSDKPayResult",
        this.Gu_,
      );
  }
  KuroSdkBindRedPointFunction(e) {}
  KuroSdkExitBindFunction() {}
  KuroSdkQueryProductBindFunction() {}
  KuroDeepLinkBindFunction() {}
  KuroGameWinStateBindFunction() {
    CloudGameManager_1.CloudGameManager.BindFunction(
      "OnGameWindowStatusChanged",
      this.oR1,
    );
  }
  SdkLogout() {}
  SdkLogin() {
    CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "CloudGame",
          16,
          "请求下发缓存的SDK登录信息 预启动跳过重复流程",
        )
      : (CloudGameManager_1.CloudGameManager.SendData("RequestLogin"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("CloudGame", 58, "请求下发缓存的SDK登录信息"));
  }
  SdkCreateRole() {
    var e;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 16, "云游戏上报创建新角色"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ((e = KuroSdkData_1.KuroSdkControllerTool.GetCreateRoleInfo()),
        CloudGameManager_1.CloudGameManager.SendDataByKey("SDKCreateRole", e));
  }
  SdkSelectRole() {
    var e;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 16, "云游戏上报选择新角色"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ((e = KuroSdkData_1.KuroSdkControllerTool.GetRoleInfo()),
        CloudGameManager_1.CloudGameManager.SendDataByKey("SDKSelectRole", e));
  }
  SdkLevelUpRole() {
    var e;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 16, "云游戏上报角色升级"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ((e = KuroSdkData_1.KuroSdkControllerTool.GetRoleInfo()),
        CloudGameManager_1.CloudGameManager.SendDataByKey("SDKLevelUpRole", e));
  }
  SdkOpenLoginWnd() {
    CloudGameManager_1.CloudGameManager.SendData("RequestLogin"),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("CloudGame", 58, "请求重新下发缓存的SDK登录信息");
  }
  OpenUserCenter() {
    CloudGameManager_1.CloudGameManager.SendData("OpenUserCenter");
  }
  ShowAgreement() {
    CloudGameManager_1.CloudGameManager.SendData("OpenAgreement");
  }
  KuroOpenPrivacyClauseWnd() {
    CloudGameManager_1.CloudGameManager.SendData("OpenPrivacyClause");
  }
  OpenPostWebView() {
    if (
      0 !== this.LastOpenPostViewTime &&
      Time_1.Time.Now - this.LastOpenPostViewTime <= WEBVIEWCD
    )
      return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "InDisplayCd",
      );
    (this.LastOpenPostViewTime = Time_1.Time.Now),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("CloudGame", 58, "打开公告");
    var e = ModelManager_1.ModelManager.FunctionModel,
      o = ModelManager_1.ModelManager.PlayerInfoModel,
      r = ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
        ? "global"
        : "cn",
      a = new KuroSdkData_1.OpenPostWebViewParam(),
      o =
        ((a.playerId = void 0 === o.GetId() ? "0" : o.GetId().toString()),
        (a.playerLevel = e.GetPlayerLevel()
          ? e.GetPlayerLevel().toString()
          : "1"),
        (a.language = LanguageSystem_1.LanguageSystem.PackageLanguage),
        (a.extend = "extend"),
        (a.gameOrientation = "2"),
        (a.type = r),
        Json_1.Json.Stringify(a));
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("CloudGame", 58, "云游戏OpenPostWebView", ["data", o]),
      CloudGameManager_1.CloudGameManager.SendDataByKey("OpenPostWebView", o);
  }
  OpenWebView(e, o, r, a, n) {
    if (
      0 !== this.LastOpenTime &&
      Time_1.Time.Now - this.LastOpenTime <= WEBVIEWCD
    )
      return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "InDisplayCd",
      );
    this.LastOpenTime = Time_1.Time.Now;
    var t = new KuroSdkData_1.OpenWebViewParamCloudGame(),
      e =
        ((t.title = e),
        (t.url = o),
        (t.transparent = a),
        (t.webAccelerated = n),
        (t.isLandscape = r),
        Json_1.Json.Stringify(t));
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("CloudGame", 58, "OpenWebView", ["sdkJson", e ?? ""]),
      CloudGameManager_1.CloudGameManager.SendDataByKey("OpenWebView", e);
  }
  SdkOpenUrlWnd(e, o, r, a, n = !0) {
    this.OpenWebView(e, o, r, a, n);
  }
  RecoverSdkData() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("CloudGame", 58, "PlatformCloudSdkBase.RecoverSdkData"),
      CloudGameManager_1.CloudGameManager.TryRequestGamePadDevice();
  }
}
exports.PlatformCloudSdkBase = PlatformCloudSdkBase;
//# sourceMappingURL=PlatformCloudSdkBase.js.map
