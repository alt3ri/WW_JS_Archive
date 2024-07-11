"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LanguageUpdateManager = exports.LanguageUpdater = void 0);
const UE = require("ue"),
  UrlPrefixDownload_1 = require("../Download/UrlPrefixDownload"),
  LauncherLanguageLib_1 = require("../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  AppPathMisc_1 = require("./AppPathMisc"),
  AppUtil_1 = require("./AppUtil"),
  AppVersionMisc_1 = require("./AppVersionMisc"),
  ResourceUpdate_1 = require("./ResourceUpdate");
class LanguageUpdateViewAgent {
  constructor() {
    this.mIr = void 0;
  }
  async ShowNotEnoughSpaceConfirmation(e) {
    return new Promise((e) => {
      e(!0);
    });
  }
  UpdatePatchProgress(e, t, a, i) {
    this.mIr && this.mIr.UpdatePatchProgress(e, t, a, i);
  }
  SetImplement(e) {
    this.mIr = e;
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
      (this.VersionMisc = void 0),
      (this.UpdateView = void 0);
  }
  Init(e) {
    this.VersionMisc.Init(e),
      (this.UpdateView = new LanguageUpdateViewAgent()),
      this.CalculateDownloadStatus();
  }
  Delete(e) {
    var t = this.VersionMisc.GetMountFilePath(),
      t = (LanguageUpdater.dIr(t), this.VersionMisc.ReadPatchFileInfoList());
    for (const i of t) {
      var a = i.SavePath + ".pak";
      UE.KuroPakMountStatic.UnmountPak(a),
        LauncherLog_1.LauncherLog.Info(
          "UnMountPak in LanguageUpdater.Delete()",
          ["path", a],
        ),
        LanguageUpdater.dIr(i.SavePath + ".pak"),
        LanguageUpdater.dIr(i.SavePath + ".sig"),
        LanguageUpdater.dIr(i.SavePath + ".utoc"),
        LanguageUpdater.dIr(i.SavePath + ".ucas");
    }
    this.VersionMisc.DeleteSavedVersion(e),
      this.CalculateDownloadStatus(),
      (this.Status = 0);
  }
  async Update(t, a) {
    if (
      (this.UpdateView.SetImplement(t),
      (this.IsDownloading = !0),
      this.Updater.ResetWorldContext(a),
      this.Updater.CheckResourceVersion())
    ) {
      if (
        !(
          !!(t = await this.Updater.DownloadIndexFile().catch((e) => {
            LauncherLog_1.LauncherLog.ErrorWithStack("下载Index文件出异常", e);
          })) && t.Success
        )
      )
        throw new Error("下载Index文件失败！");
      if (
        this.Updater.ResolveIndexFile() &&
        (await this.Updater.CheckResourceFiles(void 0).catch((e) => {
          LauncherLog_1.LauncherLog.ErrorWithStack("校验资源文件出异常", e);
        }))
      ) {
        a = this.Updater.GetUpdateSize();
        if (!(a <= 0n)) {
          var i = this.Updater.GetNeedSpace();
          let e = !1;
          do {
            if (
              !(e = UE.KuroLauncherLibrary.DoesDiskHaveEnoughSpace(
                UE.BlueprintPathsLibrary.ProjectSavedDir(),
                i,
              ))
            )
              if (!(await this.UpdateView.ShowNotEnoughSpaceConfirmation(i))) {
                AppUtil_1.AppUtil.QuitGame();
                break;
              }
          } while (!e);
          if (!e) throw new Error("磁盘空间不足");
          if (
            !(
              !!(t = await this.Updater.DownloadResourceFiles(
                void 0,
                (e, t, a, i) => {
                  this.UpdateView.UpdatePatchProgress(e, t, a, i);
                },
              ).catch((e) => {
                LauncherLog_1.LauncherLog.ErrorWithStack(
                  "下载语音资源出异常",
                  e,
                );
              })) && t.Success
            )
          )
            throw new Error("下载语音包资源失败");
          if (!(a = this.Updater.CheckNeedRestartApp()))
            throw new Error("检测使用语音包是否需要重启app失败");
          this.IsDownloading = !1;
          var t = this.Updater.GetNeedRemount(),
            r = this.Updater.GetPakList();
          if (t && r) {
            for (const s of r)
              UE.KuroPakMountStatic.MountPak(s.SavePath + ".pak", s.MountOrder);
            this.CalculateDownloadStatus();
          }
          if (!a) throw new Error("热更语音包资源失败");
        }
      }
    }
  }
  Pause() {
    LauncherLog_1.LauncherLog.Info("Pause Language Downloading."),
      this.Downloader.CancelDownload(),
      (this.IsDownloading = !1),
      this.CalculateDownloadStatus();
  }
  CalculateDownloadStatus() {
    var [e, t] = this.VersionMisc.CalculateLocalSize();
    ((this.LocalDiskSize = e) === (this.TotalDiskSize = t) &&
      this.VersionMisc.HasMountFile()) ||
    !UE.KuroLauncherLibrary.NeedHotPatch()
      ? ((this.Status = 2), (this.IsDownloading = !1))
      : 0 < e && e !== t && (this.Status = 1);
  }
  static dIr(e) {
    var t;
    LauncherLog_1.LauncherLog.Info("SafeDeleteFile", ["path", e]),
      UE.BlueprintPathsLibrary.FileExists(e) &&
        ((t = UE.KuroLauncherLibrary.DeleteFile(e)),
        LauncherLog_1.LauncherLog.Info(
          "SafeDeleteFile",
          ["path", e],
          ["result", t],
        ));
  }
}
exports.LanguageUpdater = LanguageUpdater;
class LanguageUpdateManager {
  static Init(e) {
    if (!this.S_e) {
      var t,
        a = new AppPathMisc_1.AppPathMisc();
      for (const i of LauncherLanguageLib_1.LauncherLanguageLib.GetAllLanguageDefines())
        this.CIr.has(i.AudioCode) ||
          (((t = new LanguageUpdater()).LanguageCode = i.AudioCode),
          (t.Downloader = new UrlPrefixDownload_1.UrlPrefixDownload()),
          (t.VersionMisc = new AppVersionMisc_1.LanguageVersionMisc(
            t.LanguageCode,
          )),
          (t.Updater = new ResourceUpdate_1.ResourceUpdate(
            e,
            t.Downloader,
            t.VersionMisc,
            a,
          )),
          this.CIr.set(t.LanguageCode, t),
          t.Init(e),
          this.gIr.push(i.LanguageType));
      this.S_e = !0;
    }
  }
  static GetAllLanguageTypeForAudio() {
    return this.gIr;
  }
  static GetAllLanguagesVersionMisc() {
    var e,
      t = [];
    for ([, e] of this.CIr) t.push(e.VersionMisc);
    return t;
  }
  static GetUpdater(e) {
    return this.CIr.get(e);
  }
  static StopAllDownload() {
    for (var [, e] of LanguageUpdateManager.CIr) e.Pause();
  }
}
((exports.LanguageUpdateManager = LanguageUpdateManager).S_e = !1),
  (LanguageUpdateManager.CIr = new Map()),
  (LanguageUpdateManager.gIr = []);
//# sourceMappingURL=LanguageUpdateManager.js.map
