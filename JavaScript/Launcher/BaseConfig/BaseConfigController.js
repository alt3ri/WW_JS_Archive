"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseConfigController = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherEnum_1 = require("../Define/LauncherEnum"),
  UrlPrefixHttpRequest_1 = require("../Download/UrlPrefixHttpRequest"),
  Platform_1 = require("../Platform/Platform"),
  RemoteConfig_1 = require("../RemoteConfig"),
  AppUtil_1 = require("../Update/AppUtil"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherSerialize_1 = require("../Util/LauncherSerialize"),
  LauncherStorageLib_1 = require("../Util/LauncherStorageLib"),
  ProcedureUtil_1 = require("../Util/ProcedureUtil"),
  BaseConfigModel_1 = require("./BaseConfigModel"),
  BaseDefine_1 = require("./BaseDefine"),
  BUILD_INFO_BASE_PACKAGE = "/Package/ParamsConfig.ini",
  BUILD_INFO_PATCH_OVERRIDE_OLD = "/Aki/ConfigDB/PackageParams.txt",
  BUILD_INFO_PATCH_OVERRIDE = "/Aki/ConfigDB/Misc/BuildInfo.txt",
  CONFIG_VERSION_PATCH_OVERRIDE = "/Aki/ConfigDB/Misc/ConfigVersion.txt";
class BaseConfigController {
  static async RequestBaseData(e) {
    var r = BaseConfigController.GetPublicValue("InternalPrefix").split(";"),
      t = new Array(),
      i = cpp_1.KuroApplication.IsBuildShipping();
    for (const l of r)
      (!i && l.startsWith("http://")) || l.startsWith("https://")
        ? t.push(l)
        : LauncherLog_1.LauncherLog.Error("包内无效前缀", ["prefix", l]);
    if (t.length < 3)
      return (
        LauncherLog_1.LauncherLog.Error(
          "获取远程基础配置失败，原因：应用内置cdn前缀有效数量少于3个！",
        ),
        !1
      );
    (0, ProcedureUtil_1.randomArray)(t);
    r = "1" === BaseConfigController.GetPublicValue("CheckEntryTime");
    let o = void 0;
    const a = r
      ? (LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
          LauncherStorageLib_1.ELauncherStorageDeviceKey.EntryModifyTime,
          0,
        ) ?? 0)
      : 0;
    let n = 0;
    const s = (0, puerts_1.$ref)(void 0);
    e = await BaseConfigController.DoRequest(
      t,
      (e) => BaseConfigController.TMi(e),
      e,
      r
        ? (e, r) => {
            return UE.KuroLauncherLibrary.Decrypt(r.Result, s)
              ? "number" !=
                typeof (r = LauncherSerialize_1.LauncherJson.Parse(
                  (0, puerts_1.$unref)(s),
                )).ModifyTime
                ? [!0, void 0 !== o]
                : r.ModifyTime < a
                  ? (LauncherLog_1.LauncherLog.Error("远程入口配置过期", [
                      "http",
                      e,
                    ]),
                    [!0, void 0 !== o])
                  : (r.ModifyTime > n && ((o = r), (n = r.ModifyTime)),
                    [!1, void 0 !== o])
              : (LauncherLog_1.LauncherLog.Error(
                  "解析启动配置内容失败，异常流程",
                  ["http", e],
                ),
                [!0, void 0 !== o]);
          }
        : void 0,
    );
    if (r) {
      if (
        (n > a &&
          LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
            LauncherStorageLib_1.ELauncherStorageDeviceKey.EntryModifyTime,
            n,
          ),
        !o)
      )
        return LauncherLog_1.LauncherLog.Error("获取CDN数据失败，异常流程"), !1;
    } else {
      if (!e)
        return LauncherLog_1.LauncherLog.Error("获取CDN数据失败，异常流程"), !1;
      if (!UE.KuroLauncherLibrary.Decrypt(e.Result, s))
        return (
          LauncherLog_1.LauncherLog.Error("解析启动配置内容失败，异常流程"), !1
        );
      o = LauncherSerialize_1.LauncherJson.Parse((0, puerts_1.$unref)(s));
    }
    r = UE.KuroLauncherLibrary.GetAppParallel();
    return (
      (0, BaseConfigModel_1.parseClientEntryJson)(r, o),
      BaseConfigController.Kka(),
      UE.KuroNetworkDetection.SetCDNConfig((0, puerts_1.$unref)(s)),
      !0
    );
  }
  static Kka() {
    var e = BaseConfigController.GetCdnReturnConfigInfo().GrayBox;
    if (e)
      if (e.Items?.length)
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
                for (const i of t.Ids) r.PlayerIds.add(i);
              }
              BaseConfigModel_1.BaseConfigModel.GrayBoxConfigMap.set(t.Name, r),
                LauncherLog_1.LauncherLog.Debug("ParseGrayBox: 添加灰度配置", [
                  "Name",
                  t.Name,
                ]);
            }
          else
            LauncherLog_1.LauncherLog.Error(
              "Name参数无效",
              ["Name", t.Name],
              ["Content", JSON.stringify(t)],
            );
      else LauncherLog_1.LauncherLog.Error("ParseGrayBox: 灰度配置为空");
    else LauncherLog_1.LauncherLog.Debug("ParseGrayBox: 没有灰度配置");
  }
  static async DoRequest(o, a, t, n = void 0) {
    let s = void 0;
    if (0 !== o.length) {
      let e = void 0;
      e = Platform_1.Platform.IsPs5Platform()
        ? async (e, r) =>
            t
              ? (await t.ShowDialog(
                  !1,
                  "HotFixTipsTitle",
                  "GetRemoteConfigFailed",
                  void 0,
                  void 0,
                  "HotFixRetry",
                ),
                r())
              : { Success: !(s = void 0) }
        : async (e, r) => {
            return t
              ? (await t.ShowDialog(
                  !0,
                  "HotFixTipsTitle",
                  "GetRemoteConfigFailed",
                  "HotFixQuit",
                  "HotFixRetry",
                  void 0,
                ))
                ? r()
                : (AppUtil_1.AppUtil.QuitGame("BaseConfig"),
                  await t.WaitFrame(),
                  { Success: !0 })
              : { Success: !(s = void 0) };
          };
      return (
        await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(async () => {
          let e = !1;
          for (const i of o) {
            var r = a(i),
              t = await (0, UrlPrefixHttpRequest_1.httpRequest)(r);
            if (200 !== t.Code)
              LauncherLog_1.LauncherLog.Warn(
                "从CDN获取配置失败",
                ["reason", t.Result],
                ["errorCode", t.Code],
                ["http", r],
              );
            else {
              if (!n) return (s = t), { Success: !0 };
              var [r, t] = n(r, t);
              r || (e = t);
            }
          }
          return { Success: e };
        }, e),
        s
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
            var i = r % t.Divisor;
            if (i >= t.Left && i < t.Right)
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
  static CheckGrayBoxHitByDeviceId(e, r) {
    if (e?.length)
      if (r?.length) {
        var t = BaseConfigModel_1.BaseConfigModel.BoxResultMap.get(e);
        if (t) return 1 === t;
        t = BaseConfigModel_1.BaseConfigModel.GrayBoxConfigMap.get(e);
        if (t) {
          if (t.Divisor) {
            var i = UE.KuroStaticLibrary.HashStringWithSHA1(r).substring(0, 8),
              i = BigInt("0x" + i),
              i = Number(i % BigInt(t.Divisor));
            if (i >= t.Left && i < t.Right)
              return (
                BaseConfigModel_1.BaseConfigModel.BoxResultMap.set(e, 1),
                LauncherLog_1.LauncherLog.Info(
                  "灰度检查: 命中",
                  ["Name", e],
                  ["DeviceId", r],
                  ["Mod", i],
                  ["Range", [t.Left, t.Right]],
                ),
                !0
              );
            LauncherLog_1.LauncherLog.Info(
              "灰度检查: 未命中",
              ["Name", e],
              ["DeviceId", r],
              ["Mod", i],
              ["Range", [t.Left, t.Right]],
            );
          }
          BaseConfigModel_1.BaseConfigModel.BoxResultMap.set(e, 2);
        } else
          LauncherLog_1.LauncherLog.Error("灰度检查: 不存在GrayBox数据", [
            "Name",
            e,
          ]);
      } else
        LauncherLog_1.LauncherLog.Error(
          "灰度检查: deviceId参数无效",
          ["Name", e],
          ["DeviceId", r],
        );
    else
      LauncherLog_1.LauncherLog.Error(
        "灰度检查: name参数无效",
        ["Name", e],
        ["DeviceId", r],
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
  static GetRptIsOpen() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    return !e || e.RptOpen;
  }
  static IsUseThreadCheck() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    return !!e && e.AsyncCheck;
  }
  static IsUseNewHttpTimer() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    return !!e && e.NewHttpTimer;
  }
  static IsUseNewHttpApi() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    return !!e && e.NewHttpApi;
  }
  static GetIosAuditFirstDownloadTip() {
    var e = cpp_1.KuroApplication.IniPlatformName();
    return (
      ("IOS" === e || "Mac" === e) &&
      !!(e = BaseConfigController.GetCdnReturnConfigInfo()) &&
      e.IosAuditFirstDownloadTip
    );
  }
  static GetIosAuditFirstDownloadTipWithSkip() {
    var e = cpp_1.KuroApplication.IniPlatformName();
    return (
      ("IOS" === e || "Mac" === e) &&
      ((e = (0, puerts_1.$ref)(void 0)),
      UE.KuroVariableFunctionLibrary.GetBoolValue("IosAuditNeedHotPatch", e),
      !(0, puerts_1.$unref)(e)) &&
      BaseConfigController.GetIosAuditFirstDownloadTip()
    );
  }
  static GetSdkEnvironment() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.SDKEnvironment;
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
      var i = t.length;
      for (let e = 0; e < i; e++) if (r === t[e].id) return t[e];
    }
  }
  static GetGachaUrl() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.GachaUrl;
  }
  static GetFeedBackUrl() {}
  static GetPrivateServers() {
    var e = BaseConfigController.GetCdnReturnConfigInfo();
    if (e) return e.PrivateServers;
  }
  static GetPublicValue(e) {
    if (!BaseConfigModel_1.BaseConfigModel.PublicConfigLoaded) {
      var r = UE.KuroStaticLibrary.LoadFileToStringArray(
        BaseDefine_1.BaseDefine.GetPublicConfigPath(),
      );
      for (let e = 0; e < r.Num(); ++e) {
        var t = r.Get(e).split("=");
        BaseConfigModel_1.BaseConfigModel.BaseConfig.set(t[0], t[1]);
      }
      BaseConfigModel_1.BaseConfigModel.PublicConfigLoaded = !0;
    }
    e = BaseConfigModel_1.BaseConfigModel.BaseConfig.get(e)?.trim();
    return e || "";
  }
  static TMi(e) {
    var r = BaseConfigController.GetPackageConfigOrDefault("Stream"),
      t = cpp_1.KuroApplication.IsWithEditor()
        ? BaseDefine_1.EDITOR
        : BaseDefine_1.PACK,
      i = cpp_1.KuroApplication.GetAppReleaseType(),
      o =
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
          ["edition", i],
          ["sdk", o],
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
        "" +
        UE.BlueprintPathsLibrary.ProjectConfigDir() +
        BUILD_INFO_BASE_PACKAGE),
      (BaseConfigModel_1.BaseConfigModel.ParamsConfigInited =
        BaseConfigController.fJl(t)),
      BaseConfigModel_1.BaseConfigModel.ParamsConfigInited ||
        LauncherLog_1.LauncherLog.Error("找不到ParamsConfig文件!"),
      BaseConfigController.LoadConfigVersion(),
      BaseConfigController.LoadPatchBuildInfo(!1));
    var t = BaseConfigModel_1.BaseConfigModel.BuildInfoMap.get(e);
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
  static LoadPatchBuildInfo(e) {
    var r;
    cpp_1.KuroApplication.IsWithEditor() ||
      ((r =
        "" +
        UE.BlueprintPathsLibrary.ProjectContentDir() +
        BUILD_INFO_PATCH_OVERRIDE),
      BaseConfigController.fJl(r) ||
        ((r =
          "" +
          UE.BlueprintPathsLibrary.ProjectContentDir() +
          BUILD_INFO_PATCH_OVERRIDE_OLD),
        BaseConfigController.fJl(r)),
      (r = BaseConfigController.GetPackageConfigOrDefault("JSDebugId")),
      LauncherLog_1.LauncherLog.SetJsDebugId(r));
  }
  static fJl(e) {
    var r = UE.KuroStaticLibrary.LoadFileToStringArray(e);
    for (let e = 0; e < r.Num(); ++e) {
      var t = r.Get(e),
        i = t.split("=");
      i && 2 <= i.length
        ? BaseConfigModel_1.BaseConfigModel.BuildInfoMap.set(
            i[0].trim(),
            i[1].trim(),
          )
        : LauncherLog_1.LauncherLog.Info("无法解析数据", ["param", t]);
    }
    return 0 < r.Num();
  }
  static LoadConfigVersion() {
    var e =
      "" +
      UE.BlueprintPathsLibrary.ProjectContentDir() +
      CONFIG_VERSION_PATCH_OVERRIDE;
    BaseConfigController.CX_(e);
  }
  static CX_(e) {
    var r = UE.KuroStaticLibrary.LoadFileToStringArray(e);
    for (let e = 0; e < r.Num(); ++e) {
      var t = r.Get(e),
        i = t.split("=");
      i && 2 <= i.length
        ? BaseConfigModel_1.BaseConfigModel.ConfigVersionMap.set(
            i[0].trim(),
            i[1].trim(),
          )
        : LauncherLog_1.LauncherLog.Info("无法解析数据", ["param", t]);
    }
    return 0 < r.Num();
  }
  static GetConfigVersion(e) {
    return BaseConfigModel_1.BaseConfigModel.ConfigVersionMap.get(e) ?? "";
  }
  static GetP4Version() {
    var e = this.GetPackageConfigOrDefault("Changelist"),
      r = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
        LauncherStorageLib_1.ELauncherStorageDeviceKey.PatchP4Version,
      ),
      t = (
        LauncherEnum_1.IS_DIFF_PATCH
          ? RemoteConfig_1.RemoteInfo?.NewConfig
          : RemoteConfig_1.RemoteInfo?.Config
      )?.ChangeList;
    return r || (t && 0 !== t.length ? t : e);
  }
  static GetVersionString() {
    let e = "CN";
    "CN" !== BaseConfigController.GetPublicValue("SdkArea") && (e = "OS");
    var r = cpp_1.KuroApplication.IniPlatformName(),
      t = cpp_1.KuroApplication.GetAppReleaseType(),
      i = UE.KuroLauncherLibrary.GetAppChangeList(),
      o = this.GetPackageConfigOrDefault("PatchVersion"),
      a = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
        LauncherStorageLib_1.ELauncherStorageDeviceKey.PatchVersion,
      ),
      n = LauncherEnum_1.IS_DIFF_PATCH
        ? RemoteConfig_1.RemoteInfo?.NewConfig?.ResVersions?.get("resource")
            ?.Version
        : RemoteConfig_1.RemoteInfo?.Config?.ResourceVersion,
      o = a || n || o,
      a = UE.KuroLauncherLibrary.GetAppVersion(),
      n = this.GetP4Version();
    return e + `_${r}_${t}_${a}_${i}_${o}_` + n;
  }
}
exports.BaseConfigController = BaseConfigController;
//# sourceMappingURL=BaseConfigController.js.map
