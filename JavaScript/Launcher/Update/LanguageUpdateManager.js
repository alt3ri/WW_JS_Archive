"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LanguageUpdateManager =
    exports.LanguageUpdater =
    exports.LanguageUpdateUiEvent =
      void 0);
const UE = require("ue"),
  LauncherEnum_1 = require("../Define/LauncherEnum"),
  ResPackageInfo_1 = require("../DiffPatch/Data/ResPackageInfo"),
  DiffUpdate_1 = require("../DiffPatch/Update/DiffUpdate"),
  UpdateEvent_1 = require("../DiffPatch/Update/UpdateEvent"),
  UrlPrefixDownload_1 = require("../Download/UrlPrefixDownload"),
  Platform_1 = require("../Platform/Platform"),
  LauncherLanguageLib_1 = require("../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  AppPathMisc_1 = require("./AppPathMisc"),
  AppUtil_1 = require("./AppUtil"),
  AppVersionMisc_1 = require("./AppVersionMisc"),
  ResourceUpdate_1 = require("./ResourceUpdate");
class LanguageUpdateUiEvent {
  constructor() {
    this.HIc = void 0;
  }
  IsCompatible() {
    return !0;
  }
  async ShowNotEnoughSpaceConfirmation(a) {
    return this.HIc?.ShowNotEnoughSpaceConfirmation(a);
  }
  UpdatePatchProgress(a, t, e, i) {
    this.HIc?.UpdatePatchProgress(a, t, e, i);
  }
  InitEvent(a) {
    this.HIc = a;
  }
  async WaitFrame(a) {
    await Promise.resolve();
  }
  async ShowInfo(a, t, e = 0) {
    await Promise.resolve();
  }
  async UpdateProgress(a, t, e) {
    await Promise.resolve();
  }
  async UpdatePatchDownProgress(a, t, e, i, r, s) {
    await Promise.resolve();
  }
  async ShowDialog(a, t, e, i, r, s) {
    throw (
      (await Promise.resolve(),
      new Error("语言下载不实现，弹对话框。需要弹对话框，即失败！"))
    );
  }
}
exports.LanguageUpdateUiEvent = LanguageUpdateUiEvent;
class LanguageUpdateViewAgent {
  constructor() {
    this.mIr = void 0;
  }
  async ShowNotEnoughSpaceConfirmation(a) {
    return new Promise((a) => {
      a(!0);
    });
  }
  UpdatePatchProgress(a, t, e, i) {
    this.mIr && this.mIr.UpdatePatchProgress(a, t, e, i);
  }
  SetImplement(a) {
    this.mIr = a;
  }
}
class LanguageUpdater {
  constructor() {
    (this.Status = 0),
      (this.IsDownloading = !1),
      (this.LocalDiskSize = BigInt(0)),
      (this.TotalDiskSize = BigInt(0)),
      (this.LanguageCode = ""),
      (this.Downloader = void 0),
      (this.Updater = void 0),
      (this.DiffUpdater = void 0),
      (this.VersionMisc = void 0),
      (this.DiffResInfo = void 0),
      (this.UpdateView = void 0);
  }
  Init(a, t) {
    this.VersionMisc.Init(a),
      (this.UpdateView = new LanguageUpdateViewAgent()),
      LauncherEnum_1.IS_DIFF_PATCH && t && t.InitEvent(this.UpdateView),
      this.CalculateDownloadStatus("LanguageUpdater Init");
  }
  Delete(a) {
    var t = this.VersionMisc.GetMountFilePath(),
      t = (LanguageUpdater.dIr(t), this.VersionMisc.ReadPatchFileInfoList());
    if (LauncherEnum_1.IS_DIFF_PATCH) this.DiffResInfo?.DeleteLocalFiles();
    else {
      for (const i of t) {
        var e = i.SavePath + ".pak";
        UE.KuroPakMountStatic.UnmountPak(e),
          LauncherLog_1.LauncherLog.Info(
            "UnMountPak in LanguageUpdater.Delete()",
            ["path", e],
          ),
          LanguageUpdater.dIr(i.SavePath + ".pak"),
          LanguageUpdater.dIr(i.SavePath + ".sig"),
          LanguageUpdater.dIr(i.SavePath + ".utoc"),
          LanguageUpdater.dIr(i.SavePath + ".ucas");
      }
      this.VersionMisc.DeleteSavedVersion(a);
    }
    this.CalculateDownloadStatus("LanguageUpdater Delete"), (this.Status = 0);
  }
  async Update(a, t) {
    return LauncherEnum_1.IS_DIFF_PATCH ? this.YIc(a, t) : this.zIc(a, t);
  }
  async zIc(t, e) {
    if (
      (this.UpdateView.SetImplement(t),
      (this.IsDownloading = !0),
      this.Updater.ResetWorldContext(e),
      this.Updater.CheckResourceVersion())
    ) {
      if (
        !(
          !!(t = await this.Updater.DownloadIndexFile().catch((a) => {
            LauncherLog_1.LauncherLog.ErrorWithStack("下载Index文件出异常", a);
          })) && t.Success
        )
      )
        throw new Error("下载Index文件失败！");
      if (
        this.Updater.ResolveIndexFile() &&
        (await this.Updater.CheckResourceFiles(void 0).catch((a) => {
          LauncherLog_1.LauncherLog.ErrorWithStack("校验资源文件出异常", a);
        }))
      ) {
        e = this.Updater.GetUpdateSize();
        if (!(e <= 0n)) {
          var i = this.Updater.GetNeedSpace();
          let a = !1;
          do {
            if (
              !(a = UE.KuroLauncherLibrary.DoesDiskHaveEnoughSpace(
                UE.KuroLauncherLibrary.GameSavedDir(),
                i,
              ))
            )
              if (!(await this.UpdateView.ShowNotEnoughSpaceConfirmation(i))) {
                AppUtil_1.AppUtil.QuitGame("NotEnoughSpace");
                break;
              }
          } while (!a);
          if (!a) throw new Error("磁盘空间不足");
          if (
            !(
              !!(t = await this.Updater.DownloadResourceFiles(
                void 0,
                (a, t, e, i) => {
                  this.UpdateView.UpdatePatchProgress(a, t, e, i);
                },
              ).catch((a) => {
                LauncherLog_1.LauncherLog.ErrorWithStack(
                  "下载语音资源出异常",
                  a,
                );
              })) && t.Success
            )
          )
            throw new Error("下载语音包资源失败");
          if (!(e = this.Updater.CheckNeedRestartApp()))
            throw new Error("检测使用语音包是否需要重启app失败");
          this.IsDownloading = !1;
          var t = this.Updater.GetNeedRemount(),
            r = this.Updater.GetPakList();
          if (t && r) {
            for (const n of r) {
              var s = n.SavePath + ".pak";
              UE.KuroPakMountStatic.MountPak(s, n.MountOrder),
                Platform_1.Platform.IsCloudGame() ||
                  UE.KuroPakMountStatic.AddSha1Check(s, n.PakSha1);
            }
            this.CalculateDownloadStatus("LanguageUpdater Update"),
              Platform_1.Platform.IsCloudGame() ||
                UE.KuroPakMountStatic.StartSha1Check();
          }
          if (!e) throw new Error("热更语音包资源失败");
        }
      }
    }
  }
  async YIc(a, t) {
    this.UpdateView.SetImplement(a);
    let e = (this.IsDownloading = !0);
    try {
      var i,
        r,
        s,
        n,
        o,
        h,
        u = await this.DiffUpdater.HasContentOnRemote();
      (e = await this.DiffUpdater.DownloadManifests(u))
        ? (e = await this.DiffUpdater.ResolveManifests())
          ? (([i, r, s] = await this.DiffUpdater.AnalyzeRequireFiles([], [])),
            i
              ? (e = await this.DiffUpdater.DownloadFiles(r, s))
                ? (([n, o, h] = await this.DiffUpdater.ExecutePatch()),
                  n
                    ? (e = await this.DiffUpdater.DownloadMissFiles(o, h, n))
                      ? (e = await this.DiffUpdater.MoveSameFiles())
                        ? (e = this.DiffUpdater.ProcessRecord())
                          ? (this.DiffUpdater.MountFiles(),
                            this.CalculateDownloadStatus(
                              "LanguageUpdater Update",
                            ),
                            Platform_1.Platform.IsCloudGame() ||
                              UE.KuroPakMountStatic.StartSha1Check())
                          : LauncherLog_1.LauncherLog.Error(
                              "保存语言资源版本记录失败！",
                            )
                        : LauncherLog_1.LauncherLog.Error("移动语言资源失败！")
                      : LauncherLog_1.LauncherLog.Error(
                          "下载缺失的语言资源失败！",
                        )
                    : ((e = !1),
                      LauncherLog_1.LauncherLog.Error("合并语言资源失败！")))
                : LauncherLog_1.LauncherLog.Error("下载语言资源失败！")
              : ((e = !1),
                LauncherLog_1.LauncherLog.Error("分析语言资源失败！")))
          : LauncherLog_1.LauncherLog.Error("解析语言资源清单失败！")
        : LauncherLog_1.LauncherLog.Error("下载语言资源清单失败！");
    } catch (a) {
      a instanceof Error
        ? LauncherLog_1.LauncherLog.ErrorWithStack("下载语音资源出异常", a)
        : LauncherLog_1.LauncherLog.Error("下载语音资源出异常", ["error", a]);
    } finally {
      if (!e) throw new Error("热更语音包资源失败");
    }
  }
  Pause() {
    LauncherLog_1.LauncherLog.Info("Pause Language Downloading."),
      this.Downloader.CancelDownload(),
      (this.IsDownloading = !1),
      this.CalculateDownloadStatus("LanguageUpdater Pause");
  }
  CalculateDownloadStatus(a) {
    var t, e;
    UE.KuroLauncherLibrary.NeedHotPatch()
      ? LauncherEnum_1.IS_DIFF_PATCH
        ? this.DiffResInfo
          ? (([t, e] = this.DiffResInfo.CalculateSavedSizeAndTotalSize()),
            ((this.LocalDiskSize = t) === (this.TotalDiskSize = e) &&
              this.DiffResInfo.IsCompleteUpdate()) ||
            !UE.KuroLauncherLibrary.NeedHotPatch() ||
            Platform_1.Platform.IsPs5Platform() ||
            Platform_1.Platform.IsMacPlatform()
              ? ((this.Status = 2), (this.IsDownloading = !1))
              : 0 < t && t !== e && (this.Status = 1),
            LauncherLog_1.LauncherLog.Info(
              "CalculateDownloadStatus",
              ["LocalDiskSize", t],
              ["TotalDiskSize", e],
              ["IsCompleteUpdate", this.DiffResInfo.IsCompleteUpdate()],
              ["NeedHotPatch", UE.KuroLauncherLibrary.NeedHotPatch()],
              ["Status", this.Status],
              ["reason", a],
            ))
          : LauncherLog_1.LauncherLog.Error("language res info is undefined", [
              "reason",
              a,
            ])
        : (([t, e] = this.VersionMisc.CalculateLocalSize()),
          ((this.LocalDiskSize = t) === (this.TotalDiskSize = e) &&
            this.VersionMisc.HasMountFile()) ||
          !UE.KuroLauncherLibrary.NeedHotPatch() ||
          Platform_1.Platform.IsPs5Platform() ||
          Platform_1.Platform.IsMacPlatform()
            ? ((this.Status = 2),
              (this.IsDownloading = !1),
              this.VersionMisc.SetUseLanguagePackage())
            : 0 < t && t !== e && (this.Status = 1),
          LauncherLog_1.LauncherLog.Info(
            "CalculateDownloadStatus",
            ["LocalDiskSize", t],
            ["TotalDiskSize", e],
            ["HasMountFile", this.VersionMisc.HasMountFile()],
            ["NeedHotPatch", UE.KuroLauncherLibrary.NeedHotPatch()],
            ["Status", this.Status],
            ["reason", a],
          ))
      : ((this.Status = 2),
        (this.IsDownloading = !1),
        LauncherLog_1.LauncherLog.Info(
          "CalculateDownloadStatus",
          ["NeedHotPatch", UE.KuroLauncherLibrary.NeedHotPatch()],
          ["Status", this.Status],
          ["reason", a],
        ));
  }
  static dIr(a) {
    var t;
    LauncherLog_1.LauncherLog.Info("SafeDeleteFile", ["path", a]),
      UE.BlueprintPathsLibrary.FileExists(a) &&
        ((t = UE.KuroLauncherLibrary.DeleteFile(a)),
        LauncherLog_1.LauncherLog.Info(
          "SafeDeleteFile",
          ["path", a],
          ["result", t],
        ));
  }
}
exports.LanguageUpdater = LanguageUpdater;
class LanguageUpdateManager {
  static Init(t) {
    if (!this.S_e) {
      var e = new AppPathMisc_1.AppPathMisc();
      for (const s of LauncherLanguageLib_1.LauncherLanguageLib.GetAllLanguageDefines())
        if (!this.CIr.has(s.AudioCode)) {
          var i,
            r = new LanguageUpdater();
          (r.LanguageCode = s.AudioCode),
            (r.Downloader = new UrlPrefixDownload_1.UrlPrefixDownload()),
            (r.VersionMisc = new AppVersionMisc_1.LanguageVersionMisc(
              r.LanguageCode,
            ));
          let a = void 0;
          LauncherEnum_1.IS_DIFF_PATCH
            ? ((i = "in-game-" + r.LanguageCode),
              (i = new UpdateEvent_1.UpdateReportEvent(i)),
              (a = new LanguageUpdateUiEvent()),
              (r.DiffResInfo = ResPackageInfo_1.ResPackageInfo.GetLanguageInfo(
                r.LanguageCode,
              )),
              (r.DiffUpdater = new DiffUpdate_1.DiffUpdate(
                [
                  ResPackageInfo_1.ResPackageInfo.GetLanguageInfo(
                    r.LanguageCode,
                  ),
                ],
                r.Downloader,
                a,
                i,
                !0,
                DiffUpdate_1.EUpdateType.IndependentLang,
              )))
            : (r.Updater = new ResourceUpdate_1.ResourceUpdate(
                t,
                r.Downloader,
                r.VersionMisc,
                e,
              )),
            this.CIr.set(r.LanguageCode, r),
            r.Init(t, a),
            this.gIr.push(s.LanguageType);
        }
      this.S_e = !0;
    }
  }
  static GetAllLanguageTypeForAudio() {
    return this.gIr;
  }
  static GetAllLanguagesVersionMisc() {
    var a,
      t = [];
    for ([, a] of this.CIr) t.push(a.VersionMisc);
    return t;
  }
  static GetUpdater(a) {
    return this.CIr.get(a);
  }
  static StopAllDownload() {
    for (var [, a] of LanguageUpdateManager.CIr) a.Pause();
  }
}
((exports.LanguageUpdateManager = LanguageUpdateManager).S_e = !1),
  (LanguageUpdateManager.CIr = new Map()),
  (LanguageUpdateManager.gIr = []);
//# sourceMappingURL=LanguageUpdateManager.js.map
