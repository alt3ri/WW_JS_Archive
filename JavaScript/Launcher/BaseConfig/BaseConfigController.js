"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseConfigController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  UrlPrefixHttpRequest_1 = require("../Download/UrlPrefixHttpRequest"),
  RemoteConfig_1 = require("../RemoteConfig"),
  AppUtil_1 = require("../Update/AppUtil"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherStorageLib_1 = require("../Util/LauncherStorageLib"),
  ProcedureUtil_1 = require("../Util/ProcedureUtil"),
  BaseConfigModel_1 = require("./BaseConfigModel"),
  BaseDefine_1 = require("./BaseDefine");
class BaseConfigController {
  static async RequestBaseData(e) {
    var r = BaseConfigController.GetPublicValue("InternalPrefix").split(";");
    let t = 0;
    for (const o of r)
      (o.startsWith("http://") || o.startsWith("https://")) && t++;
    if (t < 3)
      return (
        LauncherLog_1.LauncherLog.Error(
          "获取远程基础配置失败，原因：应用内置cdn前缀有效数量少于3个！",
        ),
        !1
      );
    if (
      ((0, ProcedureUtil_1.randomArray)(r),
      !(r = await BaseConfigController.tSr(r, e)))
    )
      return LauncherLog_1.LauncherLog.Error("获取CDN数据失败，异常流程"), !1;
    e = (0, puerts_1.$ref)(void 0);
    if (!UE.KuroLauncherLibrary.Decrypt(r.Result, e))
      return (
        LauncherLog_1.LauncherLog.Error("解析启动配置内容失败，异常流程"), !1
      );
    LauncherLog_1.LauncherLog.Info("获取到CDN数据");
    r = UE.KuroLauncherLibrary.GetAppParallel();
    return (
      (0, BaseConfigModel_1.parseClientEntryJson)(
        r,
        JSON.parse((0, puerts_1.$unref)(e)),
      ),
      !0
    );
  }
  static async tSr(t, o) {
    let i = void 0;
    if (0 !== t.length)
      return (
        await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(
          async () => {
            for (const r of t) {
              var e = BaseConfigController.TMi(r);
              if (
                200 ===
                (i = await (0, UrlPrefixHttpRequest_1.httpRequest)(e)).Code
              )
                return { Success: !0 };
              LauncherLog_1.LauncherLog.Warn(
                "从CDN获取配置失败",
                ["reason", i.Result],
                ["errorCode", i.Code],
                ["http", e],
              );
            }
            return { Success: !1, Others: i };
          },
          async (e, r) => {
            return o
              ? (await o.ShowDialog(
                  !0,
                  "HotFixTipsTitle",
                  "GetRemoteConfigFailed",
                  "HotFixQuit",
                  "HotFixRetry",
                  void 0,
                ))
                ? r()
                : (AppUtil_1.AppUtil.QuitGame(),
                  await o.WaitFrame(),
                  { Success: !0 })
              : { Success: !(i = void 0) };
          },
        ),
        i
      );
    LauncherLog_1.LauncherLog.Error("CDN地址数量为0,请检查配置是否正确");
  }
  static GetCdnReturnConfigInfo() {
    return BaseConfigModel_1.BaseConfigModel.EntryJson;
  }
  static GetCdnUrl() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.CdnUrl;
  }
  static GetSpeedRatio() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.SpeedRatio;
  }
  static GetPriceRatio() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.PriceRatio;
  }
  static GetNoticeUrl() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.NoticeUrl;
  }
  static GetGARUrl() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.GARUrl;
  }
  static GetGmIsOpen() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    return !!e && e.GmOpen;
  }
  static IsUseThreadCheck() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    return !!e && e.AsyncCheck;
  }
  static GetIosAuditFirstDownloadTip() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    return !!e && e.IosAuditFirstDownloadTip;
  }
  static GetMixUri() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    return e ? e.MixUri : "";
  }
  static GetResUri() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    return e ? e.ResUri : "";
  }
  static GetLoginServers() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.LoginServers;
  }
  static GetLoginServerById(r) {
    var t = this.GetLoginServers();
    if (t) {
      var o = t.length;
      for (let e = 0; e < o; e++) if (r === t[e].id) return t[e];
    }
  }
  static GetLoginServerAdditionData() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.LoginServerAdditionData;
  }
  static GetGachaUrl() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.GachaUrl;
  }
  static GetLoginServerAdditionDataById(r) {
    var t = this.GetLoginServerAdditionData();
    if (t) {
      var o = t.length;
      for (let e = 0; e < o; e++) if (r === t[e].id) return t[e];
    }
  }
  static GetFeedBackUrl() {}
  static GetPrivateServers() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.PrivateServers;
  }
  static GetPublicValue(e) {
    var r = UE.BlueprintPathsLibrary.ProjectConfigDir() + "Kuro/SConfig.ini",
      t = (0, puerts_1.$ref)(void 0),
      o = (0, puerts_1.$ref)(void 0);
    if (
      void 0 === BaseConfigModel_1.BaseConfigModel.IsGray &&
      UE.BlueprintPathsLibrary.FileExists(r) &&
      UE.KuroStaticLibrary.LoadFileToString(t, r) &&
      UE.KuroLauncherLibrary.Decrypt((0, puerts_1.$unref)(t), o)
    ) {
      LauncherLog_1.LauncherLog.Info("灰度转cdn..."),
        (BaseConfigModel_1.BaseConfigModel.IsGray = !0);
      for (const l of (0, puerts_1.$unref)(o).split(new RegExp(/\n|\r\n/))) {
        var i = l?.trim();
        i &&
          0 !== i.length &&
          ((i = i.split("=")),
          BaseConfigModel_1.BaseConfigModel.BaseConfig.set(i[0], i[1]));
      }
      const s = BaseConfigModel_1.BaseConfigModel.BaseConfig.get(e)?.trim();
      return s || "";
    }
    if (
      ((BaseConfigModel_1.BaseConfigModel.IsGray =
        void 0 !== BaseConfigModel_1.BaseConfigModel.IsGray &&
        BaseConfigModel_1.BaseConfigModel.IsGray),
      !BaseConfigModel_1.BaseConfigModel.PublicConfigLoaded)
    ) {
      var a = UE.KuroStaticLibrary.LoadFileToStringArray(
        BaseDefine_1.BaseDefine.GetPublicConfigPath(),
      );
      for (let e = 0; e < a.Num(); ++e) {
        var n = a.Get(e).split("=");
        BaseConfigModel_1.BaseConfigModel.BaseConfig.set(n[0], n[1]);
      }
      BaseConfigModel_1.BaseConfigModel.PublicConfigLoaded = !0;
    }
    const s = BaseConfigModel_1.BaseConfigModel.BaseConfig.get(e)?.trim();
    return s || "";
  }
  static TMi(e) {
    var r = BaseConfigController.GetPackageConfigOrDefault("Stream"),
      t =
        "Editor" === UE.KuroLauncherLibrary.GetPlatform()
          ? BaseDefine_1.EDITOR
          : BaseDefine_1.PACK,
      o = BaseConfigModel_1.BaseConfigModel.IsGray
        ? BaseConfigController.GetPublicValue("AppReleaseType")
        : UE.KuroLauncherLibrary.GetAppReleaseType(),
      i =
        BaseConfigController.GetPublicValue("UseSDK") === BaseDefine_1.USESDK
          ? BaseDefine_1.SDKON
          : BaseDefine_1.SDKOFF,
      a = UE.KuroLauncherLibrary.GetAppInternalUseType(),
      n = this.iSr(),
      r =
        (LauncherLog_1.LauncherLog.Info(
          "包构建参数",
          ["branch", r],
          ["platform", t],
          ["edition", o],
          ["sdk", i],
          ["internalUseType", a],
          ["version", n],
        ),
        BaseConfigController.GetPublicValue("UrlPath")),
      t = e + `/${r}/index.json`;
    return LauncherLog_1.LauncherLog.Info("创建的cdn1地址", ["newHttp", t]), t;
  }
  static iSr() {
    return UE.KuroLauncherLibrary.GetAppVersion();
  }
  static GetPackageConfigOrDefault(e, r = void 0) {
    BaseConfigModel_1.BaseConfigModel.ParamsConfigInited ||
      ((t =
        UE.BlueprintPathsLibrary.ProjectConfigDir() +
        "/Package/ParamsConfig.ini"),
      (BaseConfigModel_1.BaseConfigModel.ParamsConfigInited =
        BaseConfigController.oSr(t)),
      BaseConfigModel_1.BaseConfigModel.ParamsConfigInited ||
        LauncherLog_1.LauncherLog.Error("找不到ParamsConfig文件!"),
      BaseConfigController.UpdatePackageConfig(!1));
    var t = BaseConfigModel_1.BaseConfigModel.ParamsConfig.get(e);
    return t || r;
  }
  static UpdatePackageConfig(e) {
    var r;
    "Editor" !== UE.KuroLauncherLibrary.GetPlatform() &&
      ((r =
        UE.BlueprintPathsLibrary.ProjectContentDir() +
        "/Aki/ConfigDB/PackageParams.txt"),
      BaseConfigController.oSr(r),
      (r = BaseConfigController.GetPackageConfigOrDefault("JSDebugId")),
      LauncherLog_1.LauncherLog.SetJsDebugId(r));
  }
  static oSr(e) {
    var r = UE.KuroStaticLibrary.LoadFileToStringArray(e);
    for (let e = 0; e < r.Num(); ++e) {
      var t = r.Get(e),
        o = t.split("=");
      o && 2 <= o.length
        ? BaseConfigModel_1.BaseConfigModel.ParamsConfig.set(
            o[0].trim(),
            o[1].trim(),
          )
        : LauncherLog_1.LauncherLog.Info("无法解析数据", ["param", t]);
    }
    return 0 < r.Num();
  }
  static GetVersionString() {
    let e = "CN";
    "CN" !== BaseConfigController.GetPublicValue("SdkArea") && (e = "OS");
    var r = UE.GameplayStatics.GetPlatformName(),
      t = UE.KuroLauncherLibrary.GetAppReleaseType(),
      o = UE.KuroLauncherLibrary.GetAppChangeList(),
      i = this.GetPackageConfigOrDefault("PatchVersion"),
      a = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.PatchVersion,
      ),
      n = RemoteConfig_1.RemoteInfo?.Config?.ResourceVersion,
      i = a || n || i,
      a = this.GetPackageConfigOrDefault("Changelist"),
      n = this.GetPackageConfigOrDefault("AppVersion"),
      s = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.PatchP4Version,
      ),
      l = RemoteConfig_1.RemoteInfo?.Config?.ChangeList,
      s = s || (l && 0 !== l.length ? l : a);
    return e + `_${r}_${t}_${n}_${o}_${i}_` + s;
  }
}
exports.BaseConfigController = BaseConfigController;
//# sourceMappingURL=BaseConfigController.js.map
