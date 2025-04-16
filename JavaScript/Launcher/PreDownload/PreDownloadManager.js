"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreDownloadManager = exports.getLocalText = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  BaseDefine_1 = require("../BaseConfig/BaseDefine"),
  LauncherConfigLib_1 = require("../Define/LauncherConfigLib"),
  ResPackageInfo_1 = require("../DiffPatch/Data/ResPackageInfo"),
  ResVersionInfo_1 = require("../DiffPatch/Data/ResVersionInfo"),
  DiffUpdate_1 = require("../DiffPatch/Update/DiffUpdate"),
  UpdateEvent_1 = require("../DiffPatch/Update/UpdateEvent"),
  UrlPrefixDownload_1 = require("../Download/UrlPrefixDownload"),
  UrlPrefixHttpRequest_1 = require("../Download/UrlPrefixHttpRequest"),
  RemoteConfig_1 = require("../RemoteConfig"),
  LauncherLanguageLib_1 = require("../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherStorageLib_1 = require("../Util/LauncherStorageLib");
class PreDownloadConfig {
  constructor() {
    (this.MixUri = ""), (this.ResUri = ""), (this.ModifyTime = 0);
  }
}
function getLocalText(e, ...o) {
  e = LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(e);
  if (void 0 === e) return "";
  let t = e;
  if (o)
    for (let e = 0; e < o.length; e++) {
      var i = o[e],
        r = `{${e}}`;
      t = t.split(r).join(i);
    }
  return t;
}
exports.getLocalText = getLocalText;
class PreDownloadUiEvent {
  constructor() {
    this.qIc = void 0;
  }
  SetView(e) {
    this.qIc = e;
  }
  ClearView() {
    this.qIc = void 0;
  }
  async WaitFrame(e) {}
  async ShowInfo(e, o, t) {}
  async UpdateProgress(e, o, t, ...i) {
    await this.qIc?.BinPatchProgress(e, o, t, ...i);
  }
  async UpdatePatchDownProgress(e, o, t, i, r, a) {
    await this.qIc?.UpdatePatchDownProgress(e, o, "", i, r, a);
  }
  async ShowDialog(e, o, t, i, r, a, ...n) {
    return !!this.qIc && this.qIc.ShowDialog(e, o, t, i, r, a, ...n);
  }
  IsCompatible() {
    return !1;
  }
  async ShowNotEnoughSpaceConfirmation(e) {
    return Promise.resolve(!0);
  }
  UpdatePatchProgress(e, o, t, i) {}
}
class NullPreDownload {
  constructor() {
    (this.IsPreDownloadEnabled = () => !1),
      (this.CheckEnabledWithTick = () => !1),
      (this.AddEnabledEvent = () => {}),
      (this.RemoveEnabledEvent = () => {}),
      (this.AddCompleteEvent = () => {}),
      (this.RemoveCompleteEvent = () => {}),
      (this.SetView = () => {}),
      (this.ClearView = () => {}),
      (this.GetDownloadSize = () => 0n),
      (this.GetNeedSpace = () => 0n),
      (this.Start = () => {}),
      (this.Stop = () => {}),
      (this.Resume = () => {}),
      (this.IsDownloading = () => !1),
      (this.IsComplete = () => !1),
      (this.GetState = () => 0);
  }
}
const TICK_INTERVAL_S = 600;
class PreDownloadManager {
  constructor() {
    (this.rwi = ""),
      (this.GIc = 0),
      (this.Lo = void 0),
      (this.FIc = new Set()),
      (this.NIc = new Set()),
      (this.VIc = void 0),
      (this.jIc = void 0),
      (this.ZZt = 0),
      (this.HIc = void 0),
      (this.$Ic = !1),
      (this.WIc = void 0),
      (this._Ic = []),
      (this.Nv1 = 0n),
      (this.$Sr = 0n);
  }
  static Get() {
    var e, o;
    return (
      PreDownloadManager.QIc ||
        ("Android" ===
          (e = cpp_1.KuroApplication.IniPlatformNameIncludeEditor()) ||
        "IOS" === e
          ? ((o = new PreDownloadManager()),
            (PreDownloadManager.QIc = o).Init(e))
          : (PreDownloadManager.QIc = new NullPreDownload())),
      PreDownloadManager.QIc
    );
  }
  async Init(e) {
    LauncherLog_1.LauncherLog.Info("PreDownloadManager Init", ["platform", e]),
      (this.rwi = e),
      await this.CheckPreDownloadConfig(),
      this.KIc() &&
        (LauncherLog_1.LauncherLog.Info(
          "PreDownloadManager Init, exist preDownload config, check resource",
        ),
        await this.CheckResource());
  }
  CheckEnabledWithTick() {
    LauncherLog_1.LauncherLog.Info(
      "PreDownloadManager add tick to check preDownload config",
    ),
      this.IsPreDownloadEnabled() || this.AddTick();
  }
  AddTick() {
    var e;
    (this.VIc && this.VIc.IsValid()) ||
      ((e = puerts_1.argv.getByName("GameInstance")),
      (this.VIc = new UE.KuroTickManager(e)),
      (this.jIc = (e) => {
        this.Tick(e);
      }),
      (this.ZZt = 0),
      this.VIc.AddTick(0, (0, puerts_1.toManualReleaseDelegate)(this.jIc)));
  }
  RemoveTick() {
    this.jIc &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.jIc),
      (this.jIc = void 0)),
      this.VIc && (this.VIc.RemoveTick(0), (this.VIc = void 0)),
      (this.ZZt = 0);
  }
  async Tick(e) {
    (this.ZZt += e),
      this.ZZt >= TICK_INTERVAL_S &&
        ((this.ZZt -= TICK_INTERVAL_S),
        await this.CheckPreDownloadConfig(),
        this.KIc()) &&
        (await this.CheckResource());
  }
  async CheckPreDownloadConfig() {
    LauncherLog_1.LauncherLog.Info("check remote preDownload config");
    var e =
      LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
        LauncherStorageLib_1.ELauncherStorageDeviceKey.PreDownloadUpdateTime,
        0,
      ) ?? 0;
    let o = e;
    var t = UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList(),
      i = `${BaseConfigController_1.BaseConfigController.GetMixUri()}/${this.rwi}/PreDownload.json`;
    for (const s of t) {
      var r = s + i,
        a =
          (LauncherLog_1.LauncherLog.Info("pre download url", ["url", r]),
          await (0, UrlPrefixHttpRequest_1.httpRequest)(r));
      if (200 !== a.Code)
        LauncherLog_1.LauncherLog.Warn("url request failed.", ["code", a.Code]);
      else if (a.Result && a.Result.trim()) {
        var a = a.Result.trim(),
          n = (0, puerts_1.$ref)(void 0);
        if (!UE.KuroLauncherLibrary.Decrypt(a, n)) return;
        a = JSON.parse((0, puerts_1.$unref)(n));
        a.ModifyTime && "number" == typeof a.ModifyTime
          ? a.ModifyTime < e
            ? LauncherLog_1.LauncherLog.Error("pre download is out date.")
            : (LauncherLog_1.LauncherLog.Info("begin set pre download info."),
              ((!this.Lo && a.ResUri && a.MixUri) ||
                (a.ModifyTime > o && a.ResUri && a.MixUri)) &&
                (LauncherLog_1.LauncherLog.Info("set pre download info."),
                (this.Lo = a)),
              a.ModifyTime > o &&
                (LauncherLog_1.LauncherLog.Info("update pre download time."),
                (o = a.ModifyTime)))
          : LauncherLog_1.LauncherLog.Error("pre download time invalid.");
      } else
        LauncherLog_1.LauncherLog.Warn("pre download content is empty.", [
          "url",
          r,
        ]);
    }
    o > e &&
      (LauncherLog_1.LauncherLog.Info("update pre download local time."),
      LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
        LauncherStorageLib_1.ELauncherStorageDeviceKey.PreDownloadUpdateTime,
        o,
      )),
      this.Lo &&
        (LauncherLog_1.LauncherLog.Info("remote exist preDownload config"),
        this.RemoveTick());
  }
  AddEnabledEvent(e) {
    this.KIc() ? e() : "function" == typeof e && this.FIc.add(e);
  }
  RemoveEnabledEvent(e) {
    "function" == typeof e && this.FIc.delete(e);
  }
  AddCompleteEvent(e) {
    "function" == typeof e && this.NIc.add(e);
  }
  RemoveCompleteEvent(e) {
    "function" == typeof e && this.NIc.delete(e);
  }
  KIc() {
    return void 0 !== this.Lo;
  }
  IsPreDownloadEnabled() {
    return this.KIc() && this.$Ic;
  }
  SetView(e) {
    this.HIc && this.HIc.SetView(e);
  }
  ClearView() {
    this.HIc && this.HIc.ClearView();
  }
  async GetPreDownloadVersionCfg() {
    LauncherLog_1.LauncherLog.Info("get pre download version config");
    var e = `${this.Lo.MixUri}/${this.rwi}/config.json`,
      o = UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList(),
      t =
        LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
          LauncherStorageLib_1.ELauncherStorageDeviceKey
            .PreDownloadVerCfgUpdateTime,
          0,
        ) ?? 0;
    let i = void 0;
    for (const n of o) {
      var r = n + e,
        r =
          (LauncherLog_1.LauncherLog.Info("pre download version url", [
            "url",
            r,
          ]),
          await (0, UrlPrefixHttpRequest_1.httpRequest)(r));
      if (200 !== r.Code)
        LauncherLog_1.LauncherLog.Warn("request pre download version failed.", [
          "code",
          r.Code,
        ]);
      else if (r.Result && r.Result.trim()) {
        var r = r.Result.trim(),
          a = (0, puerts_1.$ref)(void 0);
        if (!UE.KuroLauncherLibrary.Decrypt(r, a)) return;
        r = new RemoteConfig_1.RemoteVersionConfig(
          JSON.parse((0, puerts_1.$unref)(a)),
        );
        void 0 === r.UpdateTime || "number" != typeof r.UpdateTime
          ? LauncherLog_1.LauncherLog.Error(
              "time of pre download version is invalid.",
            )
          : r.UpdateTime < t
            ? LauncherLog_1.LauncherLog.Error(
                "pre download version is out date.",
              )
            : (LauncherLog_1.LauncherLog.Info("get the pre download version"),
              (!i || r.UpdateTime > i.UpdateTime) && (i = r));
      } else
        LauncherLog_1.LauncherLog.Warn(
          "pre download version content is empty.",
        );
    }
    i
      ? (i.UpdateTime > t &&
          (LauncherLog_1.LauncherLog.Info(
            "update local time of pre download version.",
          ),
          LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
            LauncherStorageLib_1.ELauncherStorageDeviceKey
              .PreDownloadVerCfgUpdateTime,
            i.UpdateTime,
          )),
        LauncherLog_1.LauncherLog.Info("set pre download version"),
        (RemoteConfig_1.RemoteInfo.PreVerConfig = i),
        LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
          LauncherStorageLib_1.ELauncherStorageDeviceKey.PreDownloadConfig,
          "",
        ) !== RemoteConfig_1.RemoteInfo.PreVerConfig.PackageVersion &&
          LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
            LauncherStorageLib_1.ELauncherStorageDeviceKey.PreDownloadConfig,
            RemoteConfig_1.RemoteInfo.PreVerConfig.PackageVersion,
          ))
      : LauncherLog_1.LauncherLog.Error("pre download version is not exist.");
  }
  InitPreDownloadVersion() {
    if (RemoteConfig_1.RemoteInfo.PreVerConfig) {
      LauncherLog_1.LauncherLog.Info("init pre download version config");
      var e = new Array(),
        o = RemoteConfig_1.RemoteInfo.PreVerConfig.PackageVersion,
        t = UE.KuroLauncherLibrary.GetAppVersion(),
        [i, r] = BaseDefine_1.VersionInfo.TryParse(o),
        [a, n] = BaseDefine_1.VersionInfo.TryParse(t);
      if (i && a)
        if (BaseDefine_1.VersionInfo.LessThanOrEqual(r, n))
          LauncherLog_1.LauncherLog.Error(
            "next app version is invalid",
            ["appVer", t],
            ["nextAppVersion", o],
          );
        else {
          i =
            RemoteConfig_1.RemoteInfo.PreVerConfig.ResVersions.get("resource");
          if (!i) throw new Error("预下载远程版本配置中，没有resource的信息");
          var s = this.Lo.MixUri,
            a = new ResPackageInfo_1.ResPackageInfo(
              s,
              new ResVersionInfo_1.ResourceVersionInfo(o, o, i.IndexSha1),
              !0,
            ),
            h = (e.push(a), new Set());
          for (const d of LauncherLanguageLib_1.LauncherLanguageLib.GetAllLanguageDefines())
            if (!h.has(d.AudioCode)) {
              var c = RemoteConfig_1.RemoteInfo.PreVerConfig.ResVersions.get(
                d.AudioCode,
              );
              if (!c)
                throw new Error(
                  `预下载远程版本配置中，没有多语言${d.AudioCode}的信息`,
                );
              c = new ResPackageInfo_1.ResPackageInfo(
                s,
                new ResVersionInfo_1.LanguageVersionInfo(
                  o,
                  o,
                  c.IndexSha1,
                  d.AudioCode,
                ),
                !0,
              );
              h.add(d.AudioCode), e.push(c);
            }
          (r = new UrlPrefixDownload_1.UrlPrefixDownload()),
            (n = new UpdateEvent_1.UpdateReportEvent("PreDownload"));
          (this.HIc = new PreDownloadUiEvent()),
            (this.WIc = new DiffUpdate_1.DiffUpdate(
              e,
              r,
              this.HIc,
              n,
              !1,
              DiffUpdate_1.EUpdateType.PreDownload,
            ));
        }
      else
        LauncherLog_1.LauncherLog.Error(
          "app version is invalid",
          ["appVer", t],
          ["nextAppVersion", o],
        );
    } else LauncherLog_1.LauncherLog.Error("pre download version is not exist");
  }
  async CheckResource() {
    LauncherLog_1.LauncherLog.Info("analyze pre download resources.");
    try {
      if (
        (await this.GetPreDownloadVersionCfg(),
        this.InitPreDownloadVersion(),
        this.WIc)
      ) {
        var e = await this.WIc.HasContentOnRemote();
        if (await this.WIc.DownloadManifests(e))
          if (await this.WIc.ResolveManifests()) {
            var [, o, t] = await this.WIc.AnalyzeRequireFiles([], []);
            (this._Ic = o), (this.$Sr = t), (this.$Ic = !0), (this.Nv1 = 0n);
            for (const r of o) this.Nv1 += r.Size;
            LauncherLog_1.LauncherLog.Info("pre download is enabled."),
              (this.GIc = 1);
            var i = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
              LauncherStorageLib_1.ELauncherStorageDeviceKey.PreDownloadRecord,
              "",
            );
            if (i === RemoteConfig_1.RemoteInfo.PreVerConfig.PackageVersion) {
              LauncherLog_1.LauncherLog.Info("pre download is Finished."),
                (this.GIc = 4);
              for (const a of this.NIc) a();
              this.NIc.clear();
            } else
              i &&
                LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
                  LauncherStorageLib_1.ELauncherStorageDeviceKey
                    .PreDownloadRecord,
                  "",
                );
            for (const n of this.FIc) n();
            this.FIc.clear();
          } else
            LauncherLog_1.LauncherLog.Error(
              "analyze pre download manifest failed.",
            );
        else
          LauncherLog_1.LauncherLog.Error("get pre download manifest failed.");
      } else
        LauncherLog_1.LauncherLog.Error("pre download updater is not exist.");
    } catch (e) {
      e instanceof Error &&
        LauncherLog_1.LauncherLog.ErrorWithStack("预下载检测资源失败", e);
    }
  }
  async DownloadPreResources() {
    if ((LauncherLog_1.LauncherLog.Info("download next ver res."), this.WIc))
      if (4 === this.GIc || 2 === this.GIc)
        LauncherLog_1.LauncherLog.Warn("cause of pre download state", [
          "state",
          this.GIc,
        ]);
      else {
        LauncherLog_1.LauncherLog.Info("pre download begin ...");
        this.GIc = 2;
        try {
          if (await this.WIc.DownloadFiles(this._Ic, this.$Sr, !0)) {
            var [e, o, t] = await this.WIc.ExecutePatch();
            if (e)
              if (await this.WIc.DownloadMissFiles(o, t, e, !0)) {
                if (
                  (LauncherLog_1.LauncherLog.Info("pre download complete."),
                  LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
                    LauncherStorageLib_1.ELauncherStorageDeviceKey
                      .PreDownloadRecord,
                    RemoteConfig_1.RemoteInfo.PreVerConfig.PackageVersion,
                  ))
                ) {
                  LauncherLog_1.LauncherLog.Info(
                    "notify pre download complete.",
                  ),
                    (this.GIc = 4);
                  for (const i of this.NIc) i();
                  this.NIc.clear();
                }
              } else
                LauncherLog_1.LauncherLog.Error(
                  "pre download miss files failed.",
                ),
                  (this.GIc = 1);
            else
              LauncherLog_1.LauncherLog.Error("pre download patch failed."),
                (this.GIc = 1);
          } else
            LauncherLog_1.LauncherLog.Error("pre download failed."),
              (this.GIc = 1);
        } catch (e) {
          LauncherLog_1.LauncherLog.Info("notify pre catch err."),
            (this.GIc = 1),
            e instanceof Error &&
              LauncherLog_1.LauncherLog.ErrorWithStack("预下载资源失败", e);
        }
      }
    else LauncherLog_1.LauncherLog.Error("pre download updater is not exist");
  }
  GetDownloadSize() {
    return this.Nv1;
  }
  GetNeedSpace() {
    return this.$Sr;
  }
  Start(e) {
    LauncherLog_1.LauncherLog.Info("start pre download.", ["mode", e]),
      this.DownloadPreResources();
  }
  Stop() {
    LauncherLog_1.LauncherLog.Info("stop pre download."),
      this.WIc && this.WIc.Stop(),
      (this.GIc = 3);
  }
  Resume() {
    LauncherLog_1.LauncherLog.Info("resume pre download."),
      this.WIc && this.WIc.Resume(),
      this.DownloadPreResources();
  }
  IsDownloading() {
    return 2 === this.GIc;
  }
  IsComplete() {
    return 4 === this.GIc;
  }
  GetState() {
    return this.GIc;
  }
}
(exports.PreDownloadManager = PreDownloadManager).QIc = void 0;
//# sourceMappingURL=PreDownloadManager.js.map
