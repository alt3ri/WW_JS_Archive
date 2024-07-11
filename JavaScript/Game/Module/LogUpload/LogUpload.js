"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogUpload = void 0);
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Net_1 = require("../../../Core/Net/Net");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const NetworkDefine_1 = require("../../../Launcher/NetworkDefine");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class LogUpload {
  static Init() {
    UE.KuroTencentCOSLibrary.EnableAuthorization(!1);
    const e =
      BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
        ?.LogReport;
    e
      ? UE.KuroTencentCOSLibrary.SetSendLogConfig("", "", e.name, e.region)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LogUpload",
          10,
          "CDN下发数据未配置腾讯云对象存储相关配置！",
        ),
      UE.KuroTencentCOSLibrary.SetAdmissibleValue(this.$pi),
      UE.KuroTencentCOSLibrary.SetHandleFunc(
        (0, puerts_1.toManualReleaseDelegate)(this.PreSendFiles),
        (0, puerts_1.toManualReleaseDelegate)(this.PostSended),
      ),
      this.Ypi &&
        (Info_1.Info.IsPc() &&
          UE.KuroTencentCOSLibrary.EnableAutoSendWhenExit(),
        Info_1.Info.IsMobile()) &&
        UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
          NetworkDefine_1.ENetworkType.WiFi &&
        UE.KuroTencentCOSLibrary.SendLogToTencentCOS(
          (0, puerts_1.toManualReleaseDelegate)(this.Jpi),
        );
  }
  static zpi(e) {
    return UE.KuroStaticLibrary.DirectoryExists(e);
  }
  static Zpi() {
    this.evi();
    let e = "";
    this.ae !== "" && (e = this.ae + "-");
    var o = new Date();
    var o =
      `${o.getFullYear()}.${o.getMonth() + 1}.${o.getDate()}-${o.getHours()}.${o.getMinutes()}.` +
      o.getSeconds();
    return this.tvi === "" ? e + o + ".zip" : `${this.tvi}-${e}${o}.zip`;
  }
  static SendLog(e) {
    UE.KuroTencentCOSLibrary.SendLogToTencentCOS(e);
  }
  static evi() {
    let e = "";
    let o;
    Net_1.Net.IsServerConnected()
      ? (e = ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString())
      : void 0 !==
          (o = LocalStorage_1.LocalStorage.GetGlobal(
            LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyLoginUID,
          )) && (e = o.toString());
    let r = "0";
    ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
      (r = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid),
      (this.tvi = r + "-" + e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Log", 38, "获取日志上传UID", ["UID", this.tvi]);
  }
}
(exports.LogUpload = LogUpload),
  ((_a = LogUpload).Ypi = !0),
  (LogUpload.$pi = 5),
  (LogUpload.ae = ""),
  (LogUpload.ivi = 20),
  (LogUpload.tvi = ""),
  (LogUpload.ovi = "Logs/Sendedlogs.json"),
  (LogUpload.rvi = void 0),
  (LogUpload.Jpi = (e, o) => {
    (e !== 5 && e !== 4) || UE.KuroTencentCOSLibrary.SetIsAutoSend(!1);
  }),
  (LogUpload.PostSended = (o) => {
    _a.rvi || (_a.rvi = { Paths: [] });
    const r = cpp_1.KuroLoggingLibrary.GetLogFilename();
    const a = o.Num();
    for (let e = 0; e < a; e++) {
      const t = o.Get(e);
      t.endsWith(r) || _a.rvi.Paths.includes(t) || _a.rvi.Paths.push(t);
    }
    UE.KuroStaticLibrary.SaveStringToFile(
      JSON.stringify(_a.rvi),
      UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.ovi,
    );
  }),
  (LogUpload.PreSendFiles = (o) => {
    const r = UE.NewArray(UE.BuiltinString);
    let a = [];
    const t = o.Num();
    for (let e = 0; e < t; e++) {
      const _ = o.Get(e);
      if (!_a.zpi(_)) {
        var i = _.split("/");
        var i = i[i.length - 1];
        const l = i.split(".");
        let e = void 0;
        l.length > 1 && (e = l[l.length - 1]),
          !i.startsWith("Client") ||
            i.startsWith("Client_") ||
            (!e && e !== "log") ||
            (i.startsWith("Client-") ? a.push(_) : r.Add(_));
      }
    }
    let e;
    let n;
    let s = UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.ovi;
    UE.KuroStaticLibrary.FileExists(
      UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.ovi,
    ) &&
      ((n = ((e = ""), puerts_1.$ref)("")),
      UE.KuroStaticLibrary.LoadFileToString(n, s),
      (e = (0, puerts_1.$unref)(n)),
      (_a.rvi = JSON.parse(e)),
      (_a.rvi.Paths = _a.rvi.Paths.filter((e) => a.includes(e)))),
      a.length > _a.ivi && (a.sort(), a.splice(0, a.length - _a.ivi)),
      (a = _a.rvi ? a.filter((e) => !_a.rvi.Paths.includes(e)) : a).length >
        0 &&
        (s = /\d{4}.\d{1,2}.\d{1,2}-\d{1,2}.\d{1,2}.\d{1,2}/.exec(a[0])) &&
        s?.length > 0 &&
        (_a.ae = s[0]);
    for (const g of a) r.Add(g);
    UE.KuroTencentCOSLibrary.SetFilesToSend(r),
      UE.KuroTencentCOSLibrary.SetSendLogZipName(_a.Zpi());
  });
// # sourceMappingURL=LogUpload.js.map
