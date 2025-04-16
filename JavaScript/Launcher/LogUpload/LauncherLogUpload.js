"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherLogUpload = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  NetworkDefine_1 = require("../NetworkDefine"),
  Platform_1 = require("../Platform/Platform"),
  LauncherLog_1 = require("../Util/LauncherLog");
class LauncherLogUpload {
  static Init() {
    UE.KuroTencentCOSLibrary.EnableAuthorization(!1);
    var e =
      BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
        ?.LogReport;
    e
      ? UE.KuroTencentCOSLibrary.SetSendLogConfig("", "", e.name, e.region)
      : LauncherLog_1.LauncherLog.Error(
          "CDN下发数据未配置腾讯云对象存储相关配置！",
        ),
      UE.KuroTencentCOSLibrary.SetAdmissibleValue(this.$vi),
      UE.KuroTencentCOSLibrary.SetHandleFunc(
        (0, puerts_1.toManualReleaseDelegate)(this.PreSendFiles),
        (0, puerts_1.toManualReleaseDelegate)(this.PostSended),
      ),
      this.Yvi &&
        (Platform_1.Platform.IsPcOrGamepadPlatform() &&
          UE.KuroTencentCOSLibrary.EnableAutoSendWhenExit(),
        Platform_1.Platform.IsMobilePlatform()) &&
        UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
          NetworkDefine_1.ENetworkType.WiFi &&
        UE.KuroTencentCOSLibrary.SendLogToTencentCOS(
          (0, puerts_1.toManualReleaseDelegate)(this.Jvi),
        );
  }
  static SetParams(e) {
    this.dRc = e;
  }
  static zvi(e) {
    return UE.KuroStaticLibrary.DirectoryExists(e);
  }
  static Zvi() {
    this.eMi();
    let e = "";
    "" !== this.ae && (e = this.ae + "-");
    var a = new Date(),
      a =
        `${a.getFullYear()}.${a.getMonth() + 1}.${a.getDate()}-${a.getHours()}.${a.getMinutes()}.` +
        a.getSeconds();
    return "" === this.tMi ? e + a + ".zip" : `${this.tMi}-${e}${a}.zip`;
  }
  static SendLog(e) {
    UE.KuroTencentCOSLibrary.SendLogToTencentCOS(e);
  }
  static eMi() {
    let e = "";
    var a;
    this.dRc.Net.IsServerConnected()
      ? (e = this.dRc.PlayerInfoModel.GetId().toString())
      : void 0 !== (a = this.dRc.LocalStorage.GetRecentlyLoginUid()) &&
        (e = a.toString());
    let r = "0";
    if (this.dRc.KuroSdkController.CanUseSdk()) {
      const e = this.dRc.LoginModel.GetSdkLoginConfigUid();
      r = e ?? "0";
    }
    (this.tMi = r + "-" + e),
      LauncherLog_1.LauncherLog.Info("获取日志上传UID", ["UID", this.tMi]);
  }
}
(exports.LauncherLogUpload = LauncherLogUpload),
  ((_a = LauncherLogUpload).Yvi = !0),
  (LauncherLogUpload.$vi = 5),
  (LauncherLogUpload.dRc = void 0),
  (LauncherLogUpload.ae = ""),
  (LauncherLogUpload.iMi = 20),
  (LauncherLogUpload.tMi = ""),
  (LauncherLogUpload.oMi = "Logs/Sendedlogs.json"),
  (LauncherLogUpload.rMi = void 0),
  (LauncherLogUpload.Jvi = (e, a) => {
    (5 !== e && 4 !== e) || UE.KuroTencentCOSLibrary.SetIsAutoSend(!1);
  }),
  (LauncherLogUpload.PostSended = (a) => {
    _a.rMi || (_a.rMi = { Paths: [] });
    var r = cpp_1.KuroLoggingLibrary.GetLogFilename(),
      t = a.Num();
    for (let e = 0; e < t; e++) {
      var o = a.Get(e);
      o.endsWith(r) || _a.rMi.Paths.includes(o) || _a.rMi.Paths.push(o);
    }
    UE.KuroStaticLibrary.SaveStringToFile(
      JSON.stringify(_a.rMi),
      UE.KuroLauncherLibrary.GameSavedDir() + _a.oMi,
    );
  }),
  (LauncherLogUpload.PreSendFiles = (a) => {
    var r = UE.NewArray(UE.BuiltinString);
    let t = [];
    var o = a.Num();
    for (let e = 0; e < o; e++) {
      var i = a.Get(e);
      if (!_a.zvi(i)) {
        var s = i.split("/"),
          s = s[s.length - 1].toLowerCase(),
          _ = s.split(".");
        let e = void 0;
        1 < _.length && (e = _[_.length - 1]),
          !s.startsWith("client") ||
            s.startsWith("client_") ||
            (!e && "log" !== e) ||
            (s.startsWith("client-") ? t.push(i) : r.Add(i));
      }
    }
    var e,
      n,
      l = UE.KuroLauncherLibrary.GameSavedDir() + _a.oMi;
    UE.KuroStaticLibrary.FileExists(l) &&
      ((n = ((e = ""), puerts_1.$ref)("")),
      UE.KuroStaticLibrary.LoadFileToString(n, l),
      (e = (0, puerts_1.$unref)(n)),
      (_a.rMi = JSON.parse(e)),
      (_a.rMi.Paths = _a.rMi.Paths.filter((e) => t.includes(e)))),
      t.length > _a.iMi && (t.sort(), t.splice(0, t.length - _a.iMi)),
      0 <
        (t = _a.rMi ? t.filter((e) => !_a.rMi.Paths.includes(e)) : t).length &&
        (l = /\d{4}.\d{1,2}.\d{1,2}-\d{1,2}.\d{1,2}.\d{1,2}/.exec(t[0])) &&
        0 < l?.length &&
        (_a.ae = l[0]);
    for (const U of t) r.Add(U);
    UE.KuroTencentCOSLibrary.SetFilesToSend(r),
      UE.KuroTencentCOSLibrary.SetSendLogZipName(_a.Zvi());
  });
//# sourceMappingURL=LauncherLogUpload.js.map
