"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VideoUpdateManager =
    exports.VideoUpdater =
    exports.VideoUpdateUiEvent =
      void 0);
const UE = require("ue"),
  ResPackageInfo_1 = require("../DiffPatch/Data/ResPackageInfo"),
  DiffUpdate_1 = require("../DiffPatch/Update/DiffUpdate"),
  UpdateEvent_1 = require("../DiffPatch/Update/UpdateEvent"),
  VideoResUpdate_1 = require("../DiffPatch/Update/VideoResUpdate"),
  UrlPrefixDownload_1 = require("../Download/UrlPrefixDownload"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherStorageLib_1 = require("../Util/LauncherStorageLib");
class VideoUpdateUiEvent {
  constructor() {
    this.HIc = void 0;
  }
  IsCompatible() {
    return !0;
  }
  async ShowNotEnoughSpaceConfirmation(e) {
    return this.HIc?.ShowNotEnoughSpaceConfirmation(e);
  }
  UpdatePatchProgress(e, t, i, a) {
    this.HIc?.UpdatePatchProgress(e, t, i, a);
  }
  InitEvent(e) {
    this.HIc = e;
  }
  async WaitFrame(e) {
    await Promise.resolve();
  }
  async ShowInfo(e, t, i = 0) {
    await Promise.resolve();
  }
  async UpdateProgress(e, t, i) {
    await Promise.resolve();
  }
  async UpdatePatchDownProgress(e, t, i, a, s, o) {
    await Promise.resolve();
  }
  async ShowDialog(e, t, i, a, s, o) {
    throw (
      (await Promise.resolve(),
      new Error("语言下载不实现，弹对话框。需要弹对话框，即失败！"))
    );
  }
}
exports.VideoUpdateUiEvent = VideoUpdateUiEvent;
class VideoUpdateViewAgent {
  constructor() {
    (this.ReceiveSize = BigInt(0)),
      (this.CurProgress = BigInt(0)),
      (this.TotalProgress = BigInt(0)),
      (this.DownloadSpeed = BigInt(0));
  }
  async ShowNotEnoughSpaceConfirmation(e) {
    return new Promise((e) => {
      e(!0);
    });
  }
  UpdatePatchProgress(e, t, i, a) {
    (this.ReceiveSize = e),
      (this.CurProgress = t),
      (this.TotalProgress = i),
      (this.DownloadSpeed = a);
  }
}
class VideoUpdater {
  constructor() {
    (this.DIe = 0),
      (this.kb1 = void 0),
      (this.Ob1 = void 0),
      (this.Downloader = void 0),
      (this.DiffUpdater = void 0),
      (this.DiffResInfo = void 0),
      (this.UpdateView = void 0),
      (this.ToDoList = []),
      (this.TodoResSizeType = 0),
      (this.qb1 = 0n);
  }
  Init(e) {
    (this.UpdateView = new VideoUpdateViewAgent()),
      e && e.InitEvent(this.UpdateView);
  }
  async Update(t) {
    var i = VideoResUpdate_1.VideoResUpdate.GetVideoResPak(t);
    if (0 === i.length) LauncherLog_1.LauncherLog.Error("下载视频列表为空！");
    else {
      (this.ToDoList = i), (this.TodoResSizeType = t);
      let e = !0;
      try {
        var [a, s, o] =
          VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames(
            this.ToDoList,
          );
        (this.qb1 = o),
          (this.UpdateView.CurProgress = 0n),
          (this.UpdateView.TotalProgress = s - o),
          this.CalculateDownloadStatus("VideoUpdater BeforeUpdate"),
          void 0 !== this.kb1 && this.kb1(this.DIe),
          (e = await this.DiffUpdater.DownloadFiles(a, s - o))
            ? (this.CalculateDownloadStatus("VideoUpdater Update"),
              3 === this.DIe
                ? (this.ResetDownLoadProgress(),
                  void 0 !== this.kb1 && this.kb1(this.DIe),
                  void 0 !== this.Ob1 && this.Ob1(t),
                  this.UpdateDeviceSave(t),
                  VideoResUpdate_1.VideoResUpdate.MountPaksByName(
                    this.ToDoList,
                  ))
                : LauncherLog_1.LauncherLog.Error(
                    "下载视频资源出异常,下载完成,但是本地Size不足",
                  ))
            : LauncherLog_1.LauncherLog.Error("下载视频资源失败！");
      } catch (e) {
        e instanceof Error
          ? LauncherLog_1.LauncherLog.ErrorWithStack("下载视频资源出异常", e)
          : LauncherLog_1.LauncherLog.Error("下载视频资源出异常", ["error", e]);
      } finally {
        if (!e) throw new Error("热更视频资源包资源失败");
      }
    }
  }
  GetDownLoadState() {
    return this.DIe;
  }
  SetDownLoadStateChangeCallBack(e) {
    this.kb1 = e;
  }
  SetDownloadFinishCallBack(e) {
    this.Ob1 = e;
  }
  GetDownLoadProgress() {
    return [
      this.UpdateView.ReceiveSize + this.qb1,
      this.UpdateView.CurProgress + this.qb1,
      this.UpdateView.TotalProgress + this.qb1,
      this.UpdateView.DownloadSpeed,
    ];
  }
  ResetDownLoadProgress() {
    (this.qb1 = 0n),
      (this.UpdateView.ReceiveSize = 0n),
      (this.UpdateView.CurProgress = 0n),
      (this.UpdateView.TotalProgress = 0n),
      (this.UpdateView.DownloadSpeed = 0n);
  }
  ResetDownLoadState() {
    (this.DIe = 0), this.ResetDownLoadProgress();
  }
  Pause() {
    LauncherLog_1.LauncherLog.Info("Pause Language Downloading."),
      this.Downloader.CancelDownload(),
      (this.DIe = 2),
      void 0 !== this.kb1 && this.kb1(this.DIe);
  }
  CancelDownload() {
    LauncherLog_1.LauncherLog.Info("Cancel Video Downloading."),
      this.Downloader.CancelDownload();
    var e = VideoResUpdate_1.VideoResUpdate.GetAllSpecialVideoResPak(
      this.TodoResSizeType,
    );
    const t = ResPackageInfo_1.ResPackageInfo.GetResSaveDir() + "Video/Paks/";
    e.forEach((e) => {
      e = t + e;
      UE.BlueprintPathsLibrary.DirectoryExists(e) &&
        UE.KuroLauncherLibrary.DeleteDirectory(e);
    }),
      this.ResetDownLoadProgress(),
      (this.TodoResSizeType = 0),
      void (this.DIe = 0) !== this.kb1 && this.kb1(this.DIe);
  }
  CalculateDownloadStatus(e) {
    var [, t, i] = VideoResUpdate_1.VideoResUpdate.AnalyzeRequireFilesByNames(
      this.ToDoList,
    );
    t === i ? (this.DIe = 3) : 0 < t && t !== i && (this.DIe = 1),
      LauncherLog_1.LauncherLog.Info(
        "CalculateDownloadStatus",
        ["needSave", t],
        ["savedSize", i],
        ["Status", this.DIe],
        ["reason", e],
      );
  }
  UpdateDeviceSave(t) {
    if (3 === this.DIe) {
      var i = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
        LauncherStorageLib_1.ELauncherStorageDeviceKey.UserSelectedVideoUpdate,
        0,
      );
      let e = i;
      2 === i && 3 === t
        ? (e = 3)
        : 2 === i && 4 === t
          ? (e = 4)
          : (4 === i && 3 === t) || (3 === i && 4 === t)
            ? (e = 1)
            : LauncherLog_1.LauncherLog.Error(
                "视频下载类型和设备存储类型对不上",
                ["userSelectedDownload", i],
                ["videoResSizeType", t],
              ),
        LauncherLog_1.LauncherLog.Info(
          "保存新下载类型",
          ["userSelectedDownload", i],
          ["newUserSelectedDownload", e],
        ),
        LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
          LauncherStorageLib_1.ELauncherStorageDeviceKey
            .UserSelectedVideoUpdate,
          e,
        );
    }
  }
}
exports.VideoUpdater = VideoUpdater;
class VideoUpdateManager {
  static Gb1(e) {
    var t = new VideoUpdater(),
      e =
        ((t.Downloader = new UrlPrefixDownload_1.UrlPrefixDownload()),
        new UpdateEvent_1.UpdateReportEvent(e)),
      i = new VideoUpdateUiEvent();
    return (
      (t.DiffUpdater = new DiffUpdate_1.DiffUpdate(
        [],
        t.Downloader,
        i,
        e,
        !0,
        DiffUpdate_1.EUpdateType.IndependentLang,
      )),
      t.Init(i),
      t
    );
  }
  static GetInGameUpdater() {
    return this.Fb1 || (this.Fb1 = VideoUpdateManager.Gb1("in-game")), this.Fb1;
  }
  static GetVideoUpdater(e) {
    var t;
    return this.yL1.has(e)
      ? this.yL1.get(e)
      : ((t = VideoUpdateManager.Gb1("" + e)), this.yL1.set(e, t), t);
  }
  static GetLoginLoadingUpdater() {
    return (
      this.Nb1 || (this.Nb1 = VideoUpdateManager.Gb1("login-loading")), this.Nb1
    );
  }
  static StopAllDownload() {
    this.Fb1.Pause();
  }
}
((exports.VideoUpdateManager = VideoUpdateManager).Nb1 = void 0),
  (VideoUpdateManager.Fb1 = void 0),
  (VideoUpdateManager.yL1 = new Map());
//# sourceMappingURL=VideoUpdateManager.js.map
