"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseConfigController = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const UrlPrefixHttpRequest_1 = require("../Download/UrlPrefixHttpRequest");
const RemoteConfig_1 = require("../RemoteConfig");
const AppUtil_1 = require("../Update/AppUtil");
const LauncherLog_1 = require("../Util/LauncherLog");
const LauncherStorageLib_1 = require("../Util/LauncherStorageLib");
const ProcedureUtil_1 = require("../Util/ProcedureUtil");
const BaseConfigModel_1 = require("./BaseConfigModel");
const BaseDefine_1 = require("./BaseDefine");
class BaseConfigController {
  static async RequestBaseData(e) {
    let r = BaseConfigController.GetPublicValue("InternalPrefix").split(";");
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
      !(r = await BaseConfigController.rSr(r, e)))
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
  static async rSr(t, o) {
    let i = void 0;
    if (t.length !== 0)
      return (
        await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(
          async () => {
            for (const r of t) {
              const e = BaseConfigController.Tvi(r);
              if (
                (i = await (0, UrlPrefixHttpRequest_1.httpRequest)(e)).Code ===
                200
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
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.CdnUrl;
  }
  static GetSpeedRatio() {
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.SpeedRatio;
  }
  static GetPriceRatio() {
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.PriceRatio;
  }
  static GetNoticeUrl() {
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.NoticeUrl;
  }
  static GetGARUrl() {
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.GARUrl;
  }
  static GetGmIsOpen() {
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    return !!e && e.GmOpen;
  }
  static GetIosAuditFirstDownloadTip() {
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    return !!e && e.IosAuditFirstDownloadTip;
  }
  static GetMixUri() {
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    return e ? e.MixUri : "";
  }
  static GetResUri() {
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    return e ? e.ResUri : "";
  }
  static GetLoginServers() {
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.LoginServers;
  }
  static GetLoginServerById(r) {
    const t = this.GetLoginServers();
    if (t) {
      const o = t.length;
      for (let e = 0; e < o; e++) if (r === t[e].id) return t[e];
    }
  }
  static GetLoginServerAdditionData() {
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.LoginServerAdditionData;
  }
  static GetGachaUrl() {
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.GachaUrl;
  }
  static GetLoginServerAdditionDataById(r) {
    const t = this.GetLoginServerAdditionData();
    if (t) {
      const o = t.length;
      for (let e = 0; e < o; e++) if (r === t[e].id) return t[e];
    }
  }
  static GetFeedBackUrl() {}
  static GetPrivateServers() {
    const e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.PrivateServers;
  }
  static GetPublicValue(e) {
    const r = UE.BlueprintPathsLibrary.ProjectConfigDir() + "Kuro/SConfig.ini";
    const t = (0, puerts_1.$ref)(void 0);
    const o = (0, puerts_1.$ref)(void 0);
    if (
      void 0 === BaseConfigModel_1.BaseConfigModel.IsGray &&
      UE.BlueprintPathsLibrary.FileExists(r) &&
      UE.KuroStaticLibrary.LoadFileToString(t, r) &&
      UE.KuroLauncherLibrary.Decrypt((0, puerts_1.$unref)(t), o)
    ) {
      LauncherLog_1.LauncherLog.Info("灰度转cdn..."),
        (BaseConfigModel_1.BaseConfigModel.IsGray = !0);
      for (const l of (0, puerts_1.$unref)(o).split(new RegExp(/\n|\r\n/))) {
        let i = l?.trim();
        i &&
          i.length !== 0 &&
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
      const a = UE.KuroStaticLibrary.LoadFileToStringArray(
        BaseDefine_1.BaseDefine.GetPublicConfigPath(),
      );
      for (let e = 0; e < a.Num(); ++e) {
        const n = a.Get(e).split("=");
        BaseConfigModel_1.BaseConfigModel.BaseConfig.set(n[0], n[1]);
      }
      BaseConfigModel_1.BaseConfigModel.PublicConfigLoaded = !0;
    }
    const s = BaseConfigModel_1.BaseConfigModel.BaseConfig.get(e)?.trim();
    return s || "";
  }
  static Tvi(e) {
    var r = BaseConfigController.GetPackageConfigOrDefault("Stream");
    var t =
      UE.KuroLauncherLibrary.GetPlatform() === "Editor"
        ? BaseDefine_1.EDITOR
        : BaseDefine_1.PACK;
    const o = BaseConfigModel_1.BaseConfigModel.IsGray
      ? BaseConfigController.GetPublicValue("AppReleaseType")
      : UE.KuroLauncherLibrary.GetAppReleaseType();
    const i =
      BaseConfigController.GetPublicValue("UseSDK") === BaseDefine_1.USESDK
        ? BaseDefine_1.SDKON
        : BaseDefine_1.SDKOFF;
    const a = UE.KuroLauncherLibrary.GetAppInternalUseType();
    const n = this.nSr();
    var r =
      (LauncherLog_1.LauncherLog.Info(
        "包构建参数",
        ["branch", r],
        ["platform", t],
        ["edition", o],
        ["sdk", i],
        ["internalUseType", a],
        ["version", n],
      ),
      BaseConfigController.GetPublicValue("UrlPath"));
    var t = e + `/${r}/index.json`;
    return LauncherLog_1.LauncherLog.Info("创建的cdn1地址", ["newHttp", t]), t;
  }
  static nSr() {
    return UE.KuroLauncherLibrary.GetAppVersion();
  }
  static GetPackageConfigOrDefault(e, r = void 0) {
    BaseConfigModel_1.BaseConfigModel.ParamsConfigInited ||
      ((t =
        UE.BlueprintPathsLibrary.ProjectConfigDir() +
        "/Package/ParamsConfig.ini"),
      (BaseConfigModel_1.BaseConfigModel.ParamsConfigInited =
        BaseConfigController.sSr(t)),
      BaseConfigModel_1.BaseConfigModel.ParamsConfigInited ||
        LauncherLog_1.LauncherLog.Error("找不到ParamsConfig文件!"),
      BaseConfigController.UpdatePackageConfig(!1));
    var t = BaseConfigModel_1.BaseConfigModel.ParamsConfig.get(e);
    return t || r;
  }
  static UpdatePackageConfig(e) {
    let r;
    UE.KuroLauncherLibrary.GetPlatform() !== "Editor" &&
      ((r =
        UE.BlueprintPathsLibrary.ProjectContentDir() +
        "/Aki/ConfigDB/PackageParams.txt"),
      BaseConfigController.sSr(r),
      (r = BaseConfigController.GetPackageConfigOrDefault("JSDebugId")),
      LauncherLog_1.LauncherLog.SetJsDebugId(r));
  }
  static sSr(e) {
    const r = UE.KuroStaticLibrary.LoadFileToStringArray(e);
    for (let e = 0; e < r.Num(); ++e) {
      const t = r.Get(e);
      const o = t.split("=");
      o && o.length >= 2
        ? BaseConfigModel_1.BaseConfigModel.ParamsConfig.set(
            o[0].trim(),
            o[1].trim(),
          )
        : LauncherLog_1.LauncherLog.Info("无法解析数据", ["param", t]);
    }
    return r.Num() > 0;
  }
  static GetVersionString() {
    let e = "CN";
    BaseConfigController.GetPublicValue("SdkArea") !== "CN" && (e = "OS");
    const r = UE.GameplayStatics.GetPlatformName();
    const t = UE.KuroLauncherLibrary.GetAppReleaseType();
    const o = UE.KuroLauncherLibrary.GetAppChangeList();
    var i = this.GetPackageConfigOrDefault("PatchVersion");
    var a = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.PatchVersion,
    );
    var n = RemoteConfig_1.RemoteInfo?.Config?.ResourceVersion;
    var i = a || n || i;
    var a = this.GetPackageConfigOrDefault("Changelist");
    var n = this.GetPackageConfigOrDefault("AppVersion");
    var s = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.PatchP4Version,
    );
    const l = RemoteConfig_1.RemoteInfo?.Config?.ChangeList;
    var s = s || (l && l.length !== 0 ? l : a);
    return e + `_${r}_${t}_${n}_${o}_${i}_` + s;
  }
}
exports.BaseConfigController = BaseConfigController;
// # sourceMappingURL=BaseConfigController.js.map
