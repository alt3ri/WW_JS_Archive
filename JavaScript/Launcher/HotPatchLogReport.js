"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotPatchLogReport =
    exports.LoginLogEventDefine =
    exports.AppLinksLog =
    exports.LoginLogEvent =
    exports.HotPatchLog =
      void 0);
const UE = require("ue"),
  BaseConfigController_1 = require("./BaseConfig/BaseConfigController"),
  NetworkDefine_1 = require("./NetworkDefine"),
  ThinkDataLaunchReporter_1 = require("./ThinkDataReport/ThinkDataLaunchReporter");
class HotPatchLog {
  constructor() {
    (this.event_id = "2"),
      (this.s_client_version = ""),
      (this.event_time = ""),
      (this.s_step_id = ""),
      (this.client_platform = ""),
      (this.net_status = ""),
      (this.s_version = "");
  }
}
exports.HotPatchLog = HotPatchLog;
class LoginLogEvent {
  constructor() {
    this.event_id = "12";
  }
}
exports.LoginLogEvent = LoginLogEvent;
class AppLinksLog {
  constructor() {
    (this.event_id = "16"),
      (this.event_time = ""),
      (this.s_step_id = ""),
      (this.client_platform = ""),
      (this.s_client_version = "");
  }
}
exports.AppLinksLog = AppLinksLog;
class LoginLogEventDefine {}
((exports.LoginLogEventDefine = LoginLogEventDefine).Splash = 2),
  (LoginLogEventDefine.Update = 3),
  (LoginLogEventDefine.SdkLogin = 5),
  (LoginLogEventDefine.EnterGame = 7);
class HotPatchLogReport {
  static set World(t) {
    HotPatchLogReport.HSr = t;
    var o,
      t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
        t,
        UE.KuroPlayerPrefsSystem.StaticClass(),
      );
    t?.IsValid() &&
      ((o = t.GetString(
        "LoginDeviceId",
        UE.KismetGuidLibrary.NewGuid().ToString(),
      )),
      t.SetString("LoginDeviceId", o),
      (HotPatchLogReport.jSr = o),
      t.Save()),
      (HotPatchLogReport.Qre = `${UE.KuroLauncherLibrary.GetAppVersion()}(${BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault("Changelist")})`),
      (HotPatchLogReport.rxi = UE.GameplayStatics.GetPlatformName());
  }
  static get World() {
    return HotPatchLogReport.HSr;
  }
  static Init() {}
  static WSr() {
    var t;
    return "Android" === HotPatchLogReport.rxi ||
      "IOS" === HotPatchLogReport.rxi
      ? (t = UE.KuroLauncherLibrary.GetNetworkConnectionType()) ===
        NetworkDefine_1.ENetworkType.WiFi
        ? "Wifi"
        : t === NetworkDefine_1.ENetworkType.Cell
          ? "Stream"
          : "Other"
      : "Windows" === HotPatchLogReport.rxi ||
          "Mac" === HotPatchLogReport.rxi ||
          "Linux" === HotPatchLogReport.rxi
        ? "Wired"
        : "Other";
  }
  static Report(t) {
    t &&
      ((t.device_id = HotPatchLogReport.jSr),
      (t.event_time = Math.round(new Date().getTime() / 1e3).toString()),
      (t.s_version = HotPatchLogReport.Qre),
      (t.net_status = HotPatchLogReport.WSr()),
      (t.client_platform = HotPatchLogReport.rxi),
      (t.s_client_version =
        ThinkDataLaunchReporter_1.ThinkDataLaunchReporter.ClientVersion),
      ThinkDataLaunchReporter_1.ThinkDataLaunchReporter.Report(
        "c" + t.event_id,
        JSON.stringify(t),
      ));
  }
  static ReportLogin(t, o) {
    var e = new LoginLogEvent();
    (e.i_step_id = t.toString()),
      (e.s_step_result = o),
      (e.f_time = UE.GameplayStatics.GetTimeSeconds(
        HotPatchLogReport.World,
      ).toString()),
      (e.event_time = Math.round(new Date().getTime() / 1e3).toString()),
      (e.device_id = HotPatchLogReport.jSr),
      (e.s_tag = HotPatchLogReport.RIt),
      (e.s_client_version =
        ThinkDataLaunchReporter_1.ThinkDataLaunchReporter.ClientVersion),
      ThinkDataLaunchReporter_1.ThinkDataLaunchReporter.Report(
        "c" + e.event_id,
        JSON.stringify(e),
      );
  }
  static ReportAppLinksEvent(t, o) {
    var e = new AppLinksLog();
    (e.s_step_id = "launch_by_deeplink"),
      (e.s_deepvalue = t),
      (e.s_source = o),
      (e.event_time = Math.round(new Date().getTime() / 1e3).toString()),
      (e.device_id = HotPatchLogReport.jSr),
      (e.s_client_version =
        ThinkDataLaunchReporter_1.ThinkDataLaunchReporter.ClientVersion),
      (e.client_platform = HotPatchLogReport.rxi),
      ThinkDataLaunchReporter_1.ThinkDataLaunchReporter.Report(
        "c" + e.event_id,
        JSON.stringify(e),
      );
  }
}
((exports.HotPatchLogReport = HotPatchLogReport).RIt = void 0),
  (HotPatchLogReport.jSr = void 0),
  (HotPatchLogReport.Qre = void 0),
  (HotPatchLogReport.rxi = void 0),
  (HotPatchLogReport.HSr = void 0);
//# sourceMappingURL=HotPatchLogReport.js.map
