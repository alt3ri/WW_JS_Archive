"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformCloudSdkWeb = void 0);
const Json_1 = require("../../../Core/Common/Json"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  CloudGameManager_1 = require("../../Manager/CloudGameManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  KuroSdkData_1 = require("../KuroSdkData"),
  PlatformCloudSdkBase_1 = require("./PlatformCloudSdkBase");
class PlatformCloudSdkWeb extends PlatformCloudSdkBase_1.PlatformCloudSdkBase {
  constructor() {
    super(...arguments),
      (this.AnnounceRedPointCallBack = (e) => {
        e.includes("showRed") && (e.includes("1") || e.includes("YES"))
          ? ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(
              !0,
            )
          : ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(
              !1,
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
          );
      });
  }
  BindSpecialEvent() {
    CloudGameManager_1.CloudGameManager.BindFunction(
      "OnPostRedDotRefresh",
      this.AnnounceRedPointCallBack,
    ),
      CloudGameManager_1.CloudGameManager.BindFunction(
        "OnCustomerRedDotRefresh",
        this.CustomerServiceResultCallBack,
      );
  }
  OpenCustomerService(e) {
    var o = ModelManager_1.ModelManager.LoginModel,
      r = ModelManager_1.ModelManager.PlayerInfoModel,
      a = new KuroSdkData_1.OpenCustomerServiceParamIos(),
      e =
        ((a.islogin = o.IsSdkLoggedIn() ? 1 : 0),
        (a.from = e),
        (a.RoleId = this.GetCustomServerRoleId()),
        (a.RoleName = r.GetAccountName()),
        (a.ServerId = o.GetServerId()),
        (a.ServerName = o.GetServerName()),
        (a.RoleLevel = r.GetPlayerLevel()),
        Json_1.Json.Stringify(a));
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("CloudGame", 58, "WebCustomerService", ["json", e]),
      CloudGameManager_1.CloudGameManager.SendDataByKey(
        "OpenCustomerService",
        e ?? "",
      );
  }
  SdkPay(e) {
    var o = KuroSdkData_1.KuroSdkControllerTool.GetSdkPayRoleInfo(),
      e = KuroSdkData_1.KuroSdkControllerTool.GetPaymentInfo(e, o);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("CloudGame", 58, "WebPayment", ["json", e]),
      CloudGameManager_1.CloudGameManager.SendDataByKey("SDKPay", e);
  }
  InitializePostWebView() {
    var e = this.GetCurrentSelectServerId(),
      o = new KuroSdkData_1.InitializePostWebViewParam(),
      e =
        ((o.language = LanguageSystem_1.LanguageSystem.PackageLanguage),
        (o.serverId = e),
        (o.cdn = [
          `${PublicUtil_1.PublicUtil.GetNoticeBaseUrl()}/gamenotice/${PublicUtil_1.PublicUtil.GetGameId()}/`,
        ]),
        Json_1.Json.Stringify(o));
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("CloudGame", 58, "初始化公告", ["json", e]),
      CloudGameManager_1.CloudGameManager.SendDataByKey("InitPostWebView", e);
  }
}
exports.PlatformCloudSdkWeb = PlatformCloudSdkWeb;
//# sourceMappingURL=PlatformCloudSdkWeb.js.map
