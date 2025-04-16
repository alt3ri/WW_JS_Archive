"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VideoResUpdate =
    exports.RemoteVideoConfigUpdateTime =
    exports.RemoteVideoConfig =
    exports.RemotePakMapConfig =
    exports.VideoItem =
    exports.VideoResourceInfo =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  BaseDefine_1 = require("../../BaseConfig/BaseDefine"),
  UrlPrefixDownload_1 = require("../../Download/UrlPrefixDownload"),
  UrlPrefixHttpRequest_1 = require("../../Download/UrlPrefixHttpRequest"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherSerialize_1 = require("../../Util/LauncherSerialize"),
  LauncherStorageLib_1 = require("../../Util/LauncherStorageLib"),
  RequireFileInfo_1 = require("../Data/RequireFileInfo"),
  ResPackageInfo_1 = require("../Data/ResPackageInfo"),
  DOWNLOAD_TRY_COUNT = 3;
class VideoResourceInfo {
  constructor(e, o, i, t, a, r, s, d) {
    (this.RemoteRoute = ""),
      (this.LocalPath = ""),
      (this.PakFileName = ""),
      (this.PakSize = 0n),
      (this.PakHash = ""),
      (this.SigFileName = ""),
      (this.SigSize = 0n),
      (this.SigHash = ""),
      (this.RemoteRoute = e),
      (this.LocalPath = o),
      (this.PakFileName = i),
      (this.PakSize = t),
      (this.PakHash = a),
      (this.SigFileName = r),
      (this.SigSize = s),
      (this.SigHash = d);
  }
}
exports.VideoResourceInfo = VideoResourceInfo;
class VideoItem {
  constructor() {
    (this.PakName = ""),
      (this.PakSize = 0n),
      (this.PakHash = ""),
      (this.SigName = ""),
      (this.SigSize = 0n),
      (this.SigHash = "");
  }
}
exports.VideoItem = VideoItem;
class RemotePakMapConfig {
  constructor() {
    this.PakMap = new Map();
  }
}
exports.RemotePakMapConfig = RemotePakMapConfig;
class RemoteVideoConfig {
  constructor() {
    (this.VideoInfos = void 0), (this.UpdateTime = 0);
  }
}
exports.RemoteVideoConfig = RemoteVideoConfig;
class RemoteVideoConfigUpdateTime {
  constructor() {
    (this.UpdateTime = 0), (this.IndexSha1 = "");
  }
}
exports.RemoteVideoConfigUpdateTime = RemoteVideoConfigUpdateTime;
class VideoResUpdate {
  static GetIsSeparateVideo() {
    return VideoResUpdate.Ts1;
  }
  static Init(e, o, i) {
    (VideoResUpdate.KSr = e),
      (VideoResUpdate.Ts1 = o),
      i
        ? (VideoResUpdate.pb1 = i)
        : ((e = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
            LauncherStorageLib_1.ELauncherStorageDeviceKey.IsNewUserSelected,
            0,
          )),
          (VideoResUpdate.pb1 = !(0 < e))),
      LauncherLog_1.LauncherLog.Info(
        "VideoResInit",
        ["isSeparateVideo", o],
        ["IsNewUser", VideoResUpdate.pb1],
      );
  }
  static SetVideoResSize(e, o) {
    VideoResUpdate.vb1.set(e, o);
  }
  static GetIsNewUser() {
    return VideoResUpdate.pb1;
  }
  static GetIsGrayBoxHit() {
    return UE.KuroStaticLibrary.IsModuleLoaded("KuroSDK") &&
      BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK") ===
        BaseDefine_1.USESDK
      ? BaseConfigController_1.BaseConfigController.CheckGrayBoxHitByDeviceId(
          "SeparateVideo",
          UE.KuroSDKManager.GetBasicInfo().DeviceId,
        )
      : (LauncherLog_1.LauncherLog.Info(
          "VideoResUpdate 灰度检查: SDK未启用，灰度命中",
        ),
        !0);
  }
  static GetVideoResSize(e) {
    return VideoResUpdate.vb1.has(e) ? VideoResUpdate.vb1.get(e) : 0n;
  }
  static SetVideoResSavedSize(e, o) {
    VideoResUpdate.yb1.set(e, o);
  }
  static GetVideoResSavedSize(e) {
    return VideoResUpdate.yb1.has(e) ? VideoResUpdate.yb1.get(e) : 0n;
  }
  static SetVideoResPak(e, o) {
    VideoResUpdate.Sb1.set(e, o);
  }
  static GetVideoResPak(e) {
    return VideoResUpdate.Sb1.has(e) ? VideoResUpdate.Sb1.get(e) : [];
  }
  static SetAllSpecialVideoResPak(e, o) {
    VideoResUpdate.VR1.set(e, o);
  }
  static GetAllSpecialVideoResPak(e) {
    return VideoResUpdate.VR1.has(e) ? VideoResUpdate.VR1.get(e) : [];
  }
  static GetIsResPakDownloading(e) {
    if (VideoResUpdate.Sb1.has(e)) {
      var e = VideoResUpdate.Sb1.get(e),
        [, o, i] = VideoResUpdate.AnalyzeRequireFilesByNames(e);
      if (o === i) return !1;
      const t = new Array();
      e.forEach((e) => {
        e.endsWith("2") || t.push(e);
      });
      var [, , o] = VideoResUpdate.AnalyzeRequireFilesByNames(t);
      return 0n < o;
    }
    return !1;
  }
  static AnalyzeRequireFiles() {
    let e = [],
      o = [];
    for (const a of VideoResUpdate.Mb1) {
      var [i, t] = VideoResUpdate.Eb1(a[1]);
      (e = e.concat(i)), (o = o.concat(t));
    }
    return [e, o];
  }
  static GetRequireFiles() {
    let e = [],
      o = [],
      i = 0n,
      t = 0n;
    for (const n of VideoResUpdate.Mb1) {
      var [a, r, s, d] = VideoResUpdate.Eb1(n[1]);
      (e = e.concat(a)), (o = o.concat(r)), (i += s), (t += d);
    }
    return [e, o, i, t];
  }
  static GetPreDownloadRequireFiles() {
    let e = [],
      o = [];
    for (const a of VideoResUpdate.Ib1) {
      var [i, t] = VideoResUpdate.Eb1(a[1]);
      (e = e.concat(i)), (o = o.concat(t));
    }
    return [e, o];
  }
  static Eb1(e) {
    var o = new Array(),
      i = new Array(),
      t = 0n,
      a = 0n,
      r = e.LocalPath + "/" + e.PakFileName,
      s = new RequireFileInfo_1.FileSpace(r, e.PakSize, !0),
      s =
        ((t += s.Size),
        (a += s.SavedSize),
        s.NeedDownload() &&
          (LauncherLog_1.LauncherLog.Info("VideoRes new download file", [
            "res",
            r,
          ]),
          o.push(s),
          i.push(
            new RequireFileInfo_1.RequireFileInfo(
              e.RemoteRoute + "/" + e.PakFileName,
              r,
              e.PakSize,
              e.PakHash,
            ),
          )),
        e.LocalPath + "/" + e.SigFileName),
      r = new RequireFileInfo_1.FileSpace(s, e.SigSize, !0);
    return (
      (t += r.Size),
      (a += r.SavedSize),
      r.NeedDownload() &&
        (LauncherLog_1.LauncherLog.Info("VideoRes new download file", [
          "res",
          s,
        ]),
        o.push(r),
        i.push(
          new RequireFileInfo_1.RequireFileInfo(
            e.RemoteRoute + "/" + e.SigFileName,
            s,
            e.SigSize,
            e.SigHash,
          ),
        )),
      [o, i, t, a]
    );
  }
  static AnalyzeRequireFilesByNames(e) {
    let o = [],
      i = [],
      t = 0n,
      a = 0n;
    for (const u of e) {
      var r,
        s,
        d,
        n = VideoResUpdate.Mb1.get(u);
      n
        ? (([n, r, s, d] = VideoResUpdate.Eb1(n)),
          (t += s),
          (a += d),
          (o = o.concat(n)),
          (i = i.concat(r)))
        : LauncherLog_1.LauncherLog.Warn(
            "VideoRes not find remote video info ",
            ["res", u],
          );
    }
    return [i, t, a];
  }
  static GetFreeSpace() {
    var [, e] = ResPackageInfo_1.ResPackageInfo.GetTotalAndFreeSpace(
      ResPackageInfo_1.ResPackageInfo.GetResSaveDir(),
    );
    return e;
  }
  static IsVideoDirExists() {
    return UE.BlueprintPathsLibrary.DirectoryExists(
      ResPackageInfo_1.ResPackageInfo.GetResSaveDir() + "Video/Paks",
    );
  }
  static MountPaks() {
    for (const o of VideoResUpdate.Mb1) {
      var e = o[1].LocalPath + "/" + o[1].PakFileName;
      UE.KuroLauncherLibrary.GetFileSize(e) === o[1].PakSize &&
        (UE.KuroPakMountStatic.MountPak(e, 4),
        LauncherLog_1.LauncherLog.Info("VideoRes mount pak", [
          "res",
          o[1].PakSize,
        ]));
    }
  }
  static MountPaksByName(e) {
    for (const t of e) {
      var o,
        i = VideoResUpdate.Mb1.get(t);
      i
        ? ((o = i.LocalPath + "/" + i.PakFileName),
          UE.KuroLauncherLibrary.GetFileSize(o) === i.PakSize &&
            (UE.KuroPakMountStatic.MountPak(o, 4),
            LauncherLog_1.LauncherLog.Info("VideoRes mount pak", [
              "res",
              i.PakSize,
            ])))
        : LauncherLog_1.LauncherLog.Warn(
            "VideoRes not find remote video info ",
            ["res", t],
          );
    }
  }
  static async UpdateVideoSource() {
    return (
      await VideoResUpdate.RequestVideoCfg(),
      !!(await VideoResUpdate.RequestVideoCfgManifest()) &&
        VideoResUpdate.ResolveVideoManifests()
    );
  }
  static async RequestVideoCfg() {
    LauncherLog_1.LauncherLog.Info("get VideoCfg");
    var e = UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList(),
      o = `${BaseConfigController_1.BaseConfigController.GetMixUri()}/${this.KSr.GetPlatform()}/VideoConfig.json`,
      i =
        LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
          LauncherStorageLib_1.ELauncherStorageDeviceKey
            .RemoteVideoCfgUpdateTime,
          0,
        ) ?? 0;
    VideoResUpdate.jR1 = void 0;
    for (const r of e) {
      var t = r + o,
        t =
          (LauncherLog_1.LauncherLog.Info("VideoCfg url", ["url", t]),
          await (0, UrlPrefixHttpRequest_1.httpRequest)(t));
      if (200 !== t.Code)
        LauncherLog_1.LauncherLog.Warn("request VideoCfg failed.", [
          "code",
          t.Code,
        ]);
      else if (t.Result && t.Result.trim()) {
        var t = t.Result.trim(),
          a = (0, puerts_1.$ref)(void 0);
        if (!UE.KuroLauncherLibrary.Decrypt(t, a)) return;
        t = LauncherSerialize_1.LauncherJson.Parse((0, puerts_1.$unref)(a));
        void 0 === t.UpdateTime || "number" != typeof t.UpdateTime
          ? LauncherLog_1.LauncherLog.Error("time of VideoCfg is invalid.")
          : t.UpdateTime < i
            ? LauncherLog_1.LauncherLog.Error("VideoCfg is out date.")
            : (!VideoResUpdate.jR1 ||
                t.UpdateTime > VideoResUpdate.jR1.UpdateTime) &&
              (VideoResUpdate.jR1 = t);
      } else LauncherLog_1.LauncherLog.Warn("VideoCfg content is empty.");
    }
    VideoResUpdate.jR1
      ? VideoResUpdate.jR1.UpdateTime > i &&
        (LauncherLog_1.LauncherLog.Info("update local time of VideoCfg."),
        LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
          LauncherStorageLib_1.ELauncherStorageDeviceKey
            .RemoteVideoCfgUpdateTime,
          VideoResUpdate.jR1.UpdateTime,
        ))
      : LauncherLog_1.LauncherLog.Error("VideoCfg is not exist.");
  }
  static async RequestVideoCfgManifest() {
    if (!VideoResUpdate.jR1) return !1;
    var e =
      ResPackageInfo_1.ResPackageInfo.GetResSaveDir() +
      "Video/VideoManifest.json";
    if (
      UE.BlueprintPathsLibrary.FileExists(e) &&
      UE.KuroLauncherLibrary.CheckFileSha1(e, VideoResUpdate.jR1.IndexSha1)
    )
      return (
        LauncherLog_1.LauncherLog.Info("已下载过清单文件", ["manifest", e]), !0
      );
    var o = UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList(),
      i = UE.KuroLauncherLibrary.GetAppVersion(),
      i = `${BaseConfigController_1.BaseConfigController.GetMixUri()}/${this.KSr.GetPlatform()}/${i}/Video/VideoManifest.json`,
      t = new UrlPrefixDownload_1.UrlPrefixDownload(),
      a = new UrlPrefixDownload_1.RequestFileInfo(),
      i =
        ((a.HashString = VideoResUpdate.jR1.IndexSha1),
        (a.Size = 0n),
        (a.bUseDownloadCache = !1),
        (a.Url = i),
        (a.SavePath = e),
        new Array()),
      e = (i.push(a), await t.RequestFilesWithPrefix(i, o, DOWNLOAD_TRY_COUNT));
    return e;
  }
  static ResolveVideoManifests() {
    var e =
        ResPackageInfo_1.ResPackageInfo.GetResSaveDir() +
        "Video/VideoManifest.json",
      o = (0, puerts_1.$ref)(void 0);
    if (!UE.KuroStaticLibrary.LoadFileToString(o, e)) return !1;
    e = (0, puerts_1.$ref)(void 0);
    if (!UE.KuroLauncherLibrary.Decrypt((0, puerts_1.$unref)(o), e)) return !1;
    o = LauncherSerialize_1.LauncherJson.Parse((0, puerts_1.$unref)(e));
    if (!o)
      return LauncherLog_1.LauncherLog.Error("VideoCfg is not exist."), !1;
    const i = `${BaseConfigController_1.BaseConfigController.GetResUri()}/${this.KSr.GetPlatform()}/${UE.KuroLauncherLibrary.GetAppVersion()}/Video`;
    return (
      (VideoResUpdate.Tb1 =
        ResPackageInfo_1.ResPackageInfo.GetResSaveDir() + "Video/Paks"),
      o.VideoInfos.PakMap.forEach((e, o) => {
        e = new VideoResourceInfo(
          i,
          VideoResUpdate.Tb1 + "/" + o,
          e.PakName,
          e.PakSize,
          e.PakHash,
          e.SigName,
          e.SigSize,
          e.SigHash,
        );
        VideoResUpdate.Mb1.set(o, e);
      }),
      !0
    );
  }
  static async RequestPreDownloadVideoCfg() {
    LauncherLog_1.LauncherLog.Info("get pre download VideoCfg config");
    var e = UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList(),
      o = `${BaseConfigController_1.BaseConfigController.GetMixUri()}/${this.KSr.GetPlatform()}/VideoManifest.json`,
      i =
        LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
          LauncherStorageLib_1.ELauncherStorageDeviceKey
            .PreDownloadVideoCfgUpdateTime,
          0,
        ) ?? 0;
    let t = void 0;
    for (const s of e) {
      var a = s + o,
        a =
          (LauncherLog_1.LauncherLog.Info("pre download VideoCfg url", [
            "url",
            a,
          ]),
          await (0, UrlPrefixHttpRequest_1.httpRequest)(a));
      if (200 !== a.Code)
        LauncherLog_1.LauncherLog.Warn(
          "request pre download VideoCfg failed.",
          ["code", a.Code],
        );
      else if (a.Result && a.Result.trim()) {
        var a = a.Result.trim(),
          r = (0, puerts_1.$ref)(void 0);
        if (!UE.KuroLauncherLibrary.Decrypt(a, r)) return;
        a = LauncherSerialize_1.LauncherJson.Parse((0, puerts_1.$unref)(r));
        void 0 === a.UpdateTime || "number" != typeof a.UpdateTime
          ? LauncherLog_1.LauncherLog.Error(
              "time of pre download VideoCfg is invalid.",
            )
          : a.UpdateTime < i
            ? LauncherLog_1.LauncherLog.Error(
                "pre download VideoCfg is out date.",
              )
            : (LauncherLog_1.LauncherLog.Info("get the pre download VideoCfg"),
              (!t || a.UpdateTime > t.UpdateTime) && (t = a));
      } else
        LauncherLog_1.LauncherLog.Warn(
          "pre download VideoCfg content is empty.",
        );
    }
    if (t) {
      t.UpdateTime > i &&
        (LauncherLog_1.LauncherLog.Info(
          "update local time of pre download VideoCfg.",
        ),
        LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
          LauncherStorageLib_1.ELauncherStorageDeviceKey
            .PreDownloadVideoCfgUpdateTime,
          t.UpdateTime,
        ));
      e = t.VideoInfos;
      if (!e) throw new Error("远程版本配置中，没有PakMap的信息");
      const d =
        `${BaseConfigController_1.BaseConfigController.GetResUri()}/${this.KSr.GetPlatform()}/` +
        UE.KuroLauncherLibrary.GetAppVersion();
      (VideoResUpdate.Tb1 =
        ResPackageInfo_1.ResPackageInfo.GetResSaveDir() + "Video/Paks"),
        e.PakMap.forEach((e, o) => {
          e = new VideoResourceInfo(
            d,
            VideoResUpdate.Tb1 + "/" + o,
            e.PakName,
            e.PakSize,
            e.PakHash,
            e.SigName,
            e.SigSize,
            e.SigHash,
          );
          VideoResUpdate.Ib1.set(o, e);
        });
    } else
      LauncherLog_1.LauncherLog.Error("pre download VideoCfg is not exist.");
  }
}
((exports.VideoResUpdate = VideoResUpdate).jR1 = void 0),
  (VideoResUpdate.Mb1 = new Map()),
  (VideoResUpdate.Ib1 = new Map()),
  (VideoResUpdate.vb1 = new Map()),
  (VideoResUpdate.yb1 = new Map()),
  (VideoResUpdate.Sb1 = new Map()),
  (VideoResUpdate.VR1 = new Map()),
  (VideoResUpdate.KSr = void 0),
  (VideoResUpdate.Tb1 = ""),
  (VideoResUpdate.Ts1 = !1),
  (VideoResUpdate.pb1 = !1);
//# sourceMappingURL=VideoResUpdate.js.map
