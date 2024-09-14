"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseConfigController = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  UrlPrefixHttpRequest_1 = require("../Download/UrlPrefixHttpRequest"),
  Platform_1 = require("../Platform/Platform"),
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
      BaseConfigController.WOa(),
      !0
    );
  }
  static WOa() {
    var e = BaseConfigController.GetCdnReturnConfigInfo().GrayBox;
    if (e && e.Items?.length)
      for (const t of e.Items)
        if (t.Name?.length)
          if (BaseConfigModel_1.BaseConfigModel.GrayBoxConfigMap.has(t.Name))
            LauncherLog_1.LauncherLog.Error(
              "存在相同的Name",
              ["Name", t.Name],
              ["Content", JSON.stringify(t)],
            );
          else {
            if (void 0 !== t.Divisor) {
              if (t.Divisor <= 1) {
                LauncherLog_1.LauncherLog.Error(
                  "Divisor必须大于1",
                  ["Name", t.Name],
                  ["Divisor", t.Divisor],
                );
                continue;
              }
              if (void 0 === t.Left) {
                LauncherLog_1.LauncherLog.Error(
                  "Left参数无效",
                  ["Name", t.Name],
                  ["Left", t.Left],
                );
                continue;
              }
              if (void 0 === t.Right) {
                LauncherLog_1.LauncherLog.Error(
                  "Right参数无效",
                  ["Name", t.Name],
                  ["Right", t.Right],
                );
                continue;
              }
              if (t.Left >= t.Right) {
                LauncherLog_1.LauncherLog.Error(
                  "Left必须小于Right的值",
                  ["Name", t.Name],
                  ["Left", t.Left],
                  ["Right", t.Right],
                );
                continue;
              }
              if (t.Right > t.Divisor) {
                LauncherLog_1.LauncherLog.Error(
                  "Right必须小于等于Divisor的值",
                  ["Name", t.Name],
                  ["Right", t.Right],
                  ["Divisor", t.Divisor],
                );
                continue;
              }
            }
            var r = { Divisor: t.Divisor, Left: t.Left, Right: t.Right };
            if (t.Ids?.length) {
              r.PlayerIds = new Set();
              for (const o of t.Ids) r.PlayerIds.add(o);
            }
            BaseConfigModel_1.BaseConfigModel.GrayBoxConfigMap.set(t.Name, r);
          }
        else
          LauncherLog_1.LauncherLog.Error(
            "Name参数无效",
            ["Name", t.Name],
            ["Content", JSON.stringify(t)],
          );
  }
  static async tSr(t, o) {
    let i = void 0;
    if (0 !== t.length) {
      let e = void 0;
      e = Platform_1.Platform.IsPs5Platform()
        ? async (e, r) =>
            o
              ? (await o.ShowDialog(
                  !1,
                  "HotFixTipsTitle",
                  "GetRemoteConfigFailed",
                  void 0,
                  void 0,
                  "HotFixRetry",
                ),
                r())
              : { Success: !(i = void 0) }
        : async (e, r) => {
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
                : (AppUtil_1.AppUtil.QuitGame("BaseConfig"),
                  await o.WaitFrame(),
                  { Success: !0 })
              : { Success: !(i = void 0) };
          };
      return (
        await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(async () => {
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
        }, e),
        i
      );
    }
    LauncherLog_1.LauncherLog.Error("CDN地址数量为0,请检查配置是否正确");
  }
  static CheckGrayBoxHit(e, r) {
    if (e?.length)
      if (r) {
        var t = BaseConfigModel_1.BaseConfigModel.BoxResultMap.get(e);
        if (t) return 1 === t;
        t = BaseConfigModel_1.BaseConfigModel.GrayBoxConfigMap.get(e);
        if (t) {
          if (t.Divisor) {
            var o = r % t.Divisor;
            if (o >= t.Left && o < t.Right)
              return (
                BaseConfigModel_1.BaseConfigModel.BoxResultMap.set(e, 1), !0
              );
          }
          if (t.PlayerIds?.size && t.PlayerIds.has(r))
            return BaseConfigModel_1.BaseConfigModel.BoxResultMap.set(e, 1), !0;
          BaseConfigModel_1.BaseConfigModel.BoxResultMap.set(e, 2);
        } else
          LauncherLog_1.LauncherLog.Error(
            "不存在GrayBox数据",
            ["Name", e],
            ["PlayerId", r],
          );
      } else
        LauncherLog_1.LauncherLog.Error(
          "playerId参数无效",
          ["Name", e],
          ["PlayerId", r],
        );
    else
      LauncherLog_1.LauncherLog.Error(
        "name参数无效",
        ["Name", e],
        ["PlayerId", r],
      );
    return !1;
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
      for (const f of (0, puerts_1.$unref)(o).split(new RegExp(/\n|\r\n/))) {
        var i = f?.trim();
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
  static GetPackageClientFightConfig() {
    var e =
        UE.BlueprintPathsLibrary.ProjectContentDir() +
        "/Aki/Config/Json/CompareFightData/ClientFightDataInfo.json",
      r = (0, puerts_1.$ref)(""),
      r =
        (UE.KuroStaticLibrary.LoadFileToString(r, e),
        (e = (0, puerts_1.$unref)(r)),
        JSON.parse(e));
    return r ? r.clientMd5 : "";
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
    var r = cpp_1.KuroApplication.IniPlatformName(),
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
      f = RemoteConfig_1.RemoteInfo?.Config?.ChangeList,
      s = s || (f && 0 !== f.length ? f : a);
    return e + `_${r}_${t}_${n}_${o}_${i}_` + s;
  }
}
exports.BaseConfigController = BaseConfigController;
//# sourceMappingURL=BaseConfigController.js.map
