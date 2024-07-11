"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginServerController = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const Http_1 = require("../../../Core/Http/Http");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const LoginServerModel_1 = require("./LoginServerModel");
const ICMP_TIME_OUT = 2;
class LoginServerController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      LoginServerController.yMi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        LoginServerController.IMi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerLevelChanged,
        LoginServerController.TMi,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      LoginServerController.yMi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        LoginServerController.IMi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerLevelChanged,
        LoginServerController.TMi,
      );
  }
  static OnInit() {
    return (
      (LoginServerController.IcmpPingCallBack = (0,
      puerts_1.toManualReleaseDelegate)(LoginServerController.LFt)),
      !0
    );
  }
  static PingAllRegion() {
    let e;
    ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
      ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() &&
      ((e =
        BaseConfigController_1.BaseConfigController.GetLoginServers()).forEach(
        (e) => {
          ModelManager_1.ModelManager.LoginServerModel.AddRegionPingValue(
            e,
            LoginServerModel_1.DEFAULTPING,
          );
        },
      ),
      e.forEach((e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 28, "尝试ping", ["ipAddress", e.PingUrl]),
          UE.KuroStaticLibrary.IcmpPing(
            e.PingUrl,
            ICMP_TIME_OUT,
            LoginServerController.IcmpPingCallBack,
          );
      }));
  }
  static GetLoginPlayerInfo(e, r, o, n, t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 28, "获得GetLoginPlayerInfo");
    e = PublicUtil_1.PublicUtil.GetGARUrl(e, r, o, n, t);
    e
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Login", 9, "获得登录玩家数据", ["http", e]),
        Http_1.Http.Get(e, void 0, this.LMi))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("KuroSdk", 28, "没有GetLoginPlayerInfo");
  }
  static OnClear() {
    return (
      LoginServerController.IcmpPingCallBack &&
        ((0, puerts_1.releaseManualReleaseDelegate)(LoginServerController.LFt),
        (LoginServerController.IcmpPingCallBack = void 0)),
      !0
    );
  }
}
((exports.LoginServerController = LoginServerController).IcmpPingCallBack =
  void 0),
  (LoginServerController.yMi = () => {
    ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData &&
      ModelManager_1.ModelManager.LoginServerModel.SaveFirstLogin(
        ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid ?? "",
        ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData,
      );
  }),
  (LoginServerController.IMi = () => {
    ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData &&
      ModelManager_1.ModelManager.LoginServerModel.SaveLocalRegionLevel(
        ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid ?? "",
        ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData
          .Region,
        ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel(),
      );
  }),
  (LoginServerController.TMi = (e, r, o, n, t, l, i) => {
    ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData &&
      ModelManager_1.ModelManager.LoginServerModel.SaveLocalRegionLevel(
        ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid ?? "",
        ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData
          .Region,
        r,
      );
  }),
  (LoginServerController.LFt = (e, r) => {
    ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() &&
      ModelManager_1.ModelManager.LoginServerModel.RefreshIpPing(e, r),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "KuroSdk",
          28,
          "IcmpCallBack",
          ["ipAddress", e],
          ["time", r],
        );
  }),
  (LoginServerController.LMi = (e, r, o) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Login", 28, "获取SetLoginPlayerInfoData", ["data", o]),
      r === 200 &&
        (r = Json_1.Json.Parse(o)) &&
        (r.Code !== 0
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Login", 28, "SetLoginPlayerInfoData Code失败", [
              "Code id",
              r.Code,
            ])
          : r.SdkLoginCode !== 0
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Login",
                28,
                "SetLoginPlayerInfoData SdkLoginCode失败",
                ["SdkLoginCode id", r.SdkLoginCode],
              )
            : (ModelManager_1.ModelManager.LoginServerModel.SetPlayerLoginInfo(
                r.UserId,
                r,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnGetLoginPlayerInfo,
              )));
  });
// # sourceMappingURL=LoginServerController.js.map
