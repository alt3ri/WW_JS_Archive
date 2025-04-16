"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseDiffPatchProcedure = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  BaseDefine_1 = require("../../BaseConfig/BaseDefine"),
  UrlPrefixDownload_1 = require("../../Download/UrlPrefixDownload"),
  UrlPrefixHttpRequest_1 = require("../../Download/UrlPrefixHttpRequest"),
  HotPatchLogReport_1 = require("../../HotPatchLogReport"),
  RemoteConfig_1 = require("../../RemoteConfig"),
  HotFixManager_1 = require("../../Ui/HotFix/HotFixManager"),
  AppUtil_1 = require("../../Update/AppUtil"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherSerialize_1 = require("../../Util/LauncherSerialize"),
  LauncherStorageLib_1 = require("../../Util/LauncherStorageLib"),
  LauncherTextLib_1 = require("../../Util/LauncherTextLib"),
  ProcedureUtil_1 = require("../../Util/ProcedureUtil"),
  VideoResUpdate_1 = require("../Update/VideoResUpdate");
class BaseDiffPatchProcedure {
  constructor(e, t) {
    (this.jSr = !1),
      (this.WSr = void 0),
      (this.KSr = void 0),
      (this.ViewMgr = void 0),
      (this.KSr = e),
      (this.ViewMgr = t);
  }
  async Start() {
    return (
      await this.ViewMgr.ShowInfo(!1, "StartHotFix"),
      await this.ViewMgr.WaitFrame(),
      (this.WSr = UE.KuroLauncherLibrary.GetAppVersion()),
      !0
    );
  }
  async GetRemoteVersionConfig() {
    await this.ViewMgr.ShowInfo(!1, "GetRemoteVersion");
    let r = !1,
      t = 0;
    return (
      await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(
        async () => {
          var e = 3 === t || 2 === t;
          return (t = await this.QSr(e)), { Success: (r = 4 === t) };
        },
        async (e, t) => {
          let o = !1;
          return (o =
            1 === e
              ? await this.ViewMgr.ShowDialog(
                  !0,
                  "HotFixTipsTitle",
                  "UpdateRecordFailed",
                  "HotFixQuit",
                  "HotFixRetry",
                  void 0,
                ).catch((e) => {
                  LauncherLog_1.LauncherLog.ErrorWithStack(
                    "弹窗提示远程配置获取失败异常",
                    e,
                  );
                })
              : 3 === e
                ? await this.ViewMgr.ShowDialog(
                    !0,
                    "HotFixTipsTitle",
                    "ConfigValueError",
                    "HotFixQuit",
                    "HotFixRetry",
                    void 0,
                  ).catch((e) => {
                    LauncherLog_1.LauncherLog.ErrorWithStack(
                      "弹窗提示远程配置获取失败异常",
                      e,
                    );
                  })
                : 2 === e
                  ? await this.ViewMgr.ShowDialog(
                      !0,
                      "HotFixTipsTitle",
                      "CDNNotRefreshed",
                      "HotFixQuit",
                      "HotFixRetry",
                      void 0,
                    ).catch((e) => {
                      LauncherLog_1.LauncherLog.ErrorWithStack(
                        "弹窗提示远程配置获取失败异常",
                        e,
                      );
                    })
                  : await this.ViewMgr.ShowDialog(
                      !0,
                      "HotFixTipsTitle",
                      "GetRemoteVersionFailed",
                      "HotFixQuit",
                      "HotFixRetry",
                      void 0,
                    ).catch((e) => {
                      LauncherLog_1.LauncherLog.ErrorWithStack(
                        "弹窗提示远程配置获取失败异常",
                        e,
                      );
                    }))
            ? t()
            : ((r = !1),
              AppUtil_1.AppUtil.QuitGame("GetRemoteVersionConfig failed"),
              await this.ViewMgr.WaitFrame(),
              { Success: !0 });
        },
      ),
      r
    );
  }
  async IsAppVersionChange() {
    return (
      await this.ViewMgr.ShowInfo(!1, "CheckAppUpdate"),
      !(this.WSr === RemoteConfig_1.RemoteInfo.NewConfig.PackageVersion)
    );
  }
  async UpdateResource(e, r, i) {
    let a = !0;
    try {
      var n = await r.HasContentOnRemote();
      (a = await r.DownloadManifests(n)), (a = await r.ResolveManifests());
      let t = [],
        o = [];
      if (i)
        if (await VideoResUpdate_1.VideoResUpdate.UpdateVideoSource()) {
          var [c, s, _, u] = VideoResUpdate_1.VideoResUpdate.GetRequireFiles(),
            [h] = r.CalcNeedSizeInfo(),
            L = h + _ - u,
            g =
              (VideoResUpdate_1.VideoResUpdate.SetVideoResSize(1, L),
              VideoResUpdate_1.VideoResUpdate.SetVideoResSize(2, h),
              LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
                LauncherStorageLib_1.ELauncherStorageDeviceKey
                  .UserSelectedVideoUpdate,
                0,
              ));
          let e = g;
          VideoResUpdate_1.VideoResUpdate.GetIsGrayBoxHit()
            ? VideoResUpdate_1.VideoResUpdate.GetIsNewUser()
              ? ((HotFixManager_1.HotFixManager.DownLoadViewChosePromise =
                  new Promise((e) => {
                    HotFixManager_1.HotFixManager.DownLoadViewChoseDoneCallBack =
                      e;
                  })),
                this.ViewMgr.SetDownLoadActive(!0),
                await HotFixManager_1.HotFixManager.DownLoadViewChosePromise,
                (e = HotFixManager_1.HotFixManager.DownLoadType),
                LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
                  LauncherStorageLib_1.ELauncherStorageDeviceKey
                    .IsNewUserSelected,
                  1,
                ))
              : 0 === g && (e = 1)
            : (e = 1),
            e !== g &&
              LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
                LauncherStorageLib_1.ELauncherStorageDeviceKey
                  .UserSelectedVideoUpdate,
                e,
              ),
            1 === e && ((t = c), (o = s));
        }
      var [, l, d] = await r.AnalyzeRequireFiles(t, o),
        [p, f, R] = (await r.DownloadFiles(l, d, !1), await r.ExecutePatch());
      await r.DownloadMissFiles(f, R, p, !1),
        await r.MoveSameFiles(),
        r.ProcessRecord();
    } catch (e) {
      (a = !1),
        e instanceof Error
          ? LauncherLog_1.LauncherLog.ErrorWithStack("下载资源出异常", e)
          : LauncherLog_1.LauncherLog.Error("下载资源出异常", ["error", e]);
    }
    return a;
  }
  async CheckResourceVersion(e) {
    return Promise.resolve(!0);
  }
  async DownloadIndexFile(e) {
    return Promise.resolve(!0);
  }
  async ResolveIndexFile(e) {
    return Promise.resolve(!0);
  }
  async CheckResourceFiles(e) {
    return Promise.resolve(!0);
  }
  async DoesSavedDirHaveEnoughSpace(e) {
    do {
      var t = UE.KuroLauncherLibrary.DoesDiskHaveEnoughSpace(
          UE.KuroLauncherLibrary.GameSavedDir(),
          e,
        ),
        o = new HotPatchLogReport_1.HotPatchLog(),
        r =
          ((o.s_step_id = "check_have_enough_space"),
          {
            IsEnough: t,
            Path: UE.KuroLauncherLibrary.GameSavedDir(),
            NeedSize: e.toString(),
          });
      if (
        ((o.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r)),
        HotPatchLogReport_1.HotPatchLogReport.Report(o),
        !t)
      )
        if (
          !(await this.ViewMgr.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "HotFixNotEnoughSpace",
            "HotFixCancel",
            "HotFixContinue",
            void 0,
            LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(e),
          ))
        )
          return (
            AppUtil_1.AppUtil.QuitGame("DoesSavedDirHaveEnoughSpace failed"),
            await this.ViewMgr.WaitFrame(),
            !1
          );
    } while (!t);
    return !0;
  }
  async DownloadFiles(e, t) {
    return Promise.resolve(!0);
  }
  async CheckNeedRestartApp(e) {
    return Promise.resolve(!0);
  }
  NeedRestart(e) {
    return !0;
  }
  async MountPak(e) {
    return Promise.resolve(!0);
  }
  PreComplete() {
    var e = RemoteConfig_1.RemoteInfo?.NewConfig?.ResVersions.get("launcher"),
      e =
        (e &&
          LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
            LauncherStorageLib_1.ELauncherStorageDeviceKey.LauncherPatchVersion,
            e.Version,
          ),
        RemoteConfig_1.RemoteInfo?.NewConfig?.ResVersions.get("resource"));
    e &&
      LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
        LauncherStorageLib_1.ELauncherStorageDeviceKey.PatchVersion,
        e.Version,
      ),
      RemoteConfig_1.RemoteInfo?.NewConfig?.ChangeList &&
        0 < RemoteConfig_1.RemoteInfo?.NewConfig?.ChangeList.length &&
        LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
          LauncherStorageLib_1.ELauncherStorageDeviceKey.PatchP4Version,
          RemoteConfig_1.RemoteInfo?.NewConfig?.ChangeList,
        );
  }
  async Complete() {
    var e,
      t = new HotPatchLogReport_1.HotPatchLog(),
      o =
        ((t.s_step_id = "complete_hot_patch"),
        HotPatchLogReport_1.HotPatchLogReport.Report(t),
        await this.ViewMgr.ShowInfo(!1, "CompleteHotFix"),
        await this.ViewMgr.WaitFrame(),
        UE.KuroLauncherLibrary.GetAppVersion()),
      r = UE.KuroLauncherLibrary.GameSavedDir() + "Resources/",
      i = UE.KuroStaticLibrary.GetDirectories(r);
    let a = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
      LauncherStorageLib_1.ELauncherStorageDeviceKey.PreDownloadConfig,
      "",
    );
    LauncherLog_1.LauncherLog.Info("pre download record", ["preVer", a]),
      a &&
        (([, t] = BaseDefine_1.VersionInfo.TryParse(o)),
        ([, e] = BaseDefine_1.VersionInfo.TryParse(a)),
        BaseDefine_1.VersionInfo.LessThanOrEqual(e, t)) &&
        ((a = ""),
        LauncherLog_1.LauncherLog.Info(
          "pre download record is <= appVer, preVer reset.",
          ["appVer", o],
          ["preVer", a],
        ));
    var n = i.Num();
    for (let e = 0; e < n; e++) {
      var c = i.Get(e);
      c === o ||
        "Video" === c ||
        (a && c === a) ||
        UE.KuroLauncherLibrary.DeleteDirectory(r + c);
    }
    return !0;
  }
  async yza(e, t, o) {
    let r = void 0;
    var i = new HotPatchLogReport_1.HotPatchLog();
    i.s_step_id = "check_remote_config";
    for (const _ of e) {
      LauncherLog_1.LauncherLog.Info(
        "开始获取远程配置文件",
        ["prefix", _],
        ["configUrl", t],
      );
      var a,
        n = await (0, UrlPrefixHttpRequest_1.httpRequest)(_ + t),
        c = new HotPatchLogReport_1.HotPatchLog(),
        s =
          ((c.s_url_prefix = _),
          (c.s_step_id = "request_remote_config"),
          { success: !0 });
      200 !== n.Code
        ? (LauncherLog_1.LauncherLog.Error(
            "获取远程配置失败",
            ["reason", n.Result],
            ["errorCode", n.Code],
          ),
          (a = { Success: "failed", Reason: n.Result, HttpCode: n.Code }),
          (s.success = !1),
          (s.info = a),
          (c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(s)),
          HotPatchLogReport_1.HotPatchLogReport.Report(c))
        : (LauncherLog_1.LauncherLog.Info("获取远程配置文件成功"),
          (c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(s)),
          HotPatchLogReport_1.HotPatchLogReport.Report(c),
          (a = (0, puerts_1.$ref)(void 0)),
          UE.KuroLauncherLibrary.Decrypt(n.Result, a)
            ? ((n = new RemoteConfig_1.RemoteVersionConfig(
                JSON.parse((0, puerts_1.$unref)(a)),
              )),
              (s.success = !0),
              (c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(s)),
              HotPatchLogReport_1.HotPatchLogReport.Report(c),
              o.set(_, n),
              void 0 !== n.UpdateTime &&
                "number" == typeof n.UpdateTime &&
                (void 0 === r || r.UpdateTime < n.UpdateTime) &&
                (r = n))
            : (LauncherLog_1.LauncherLog.Error("远程配置文件内容无法解析！"),
              (s.success = !1),
              (s.info = "failed, can not decrypt file"),
              (c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(s)),
              HotPatchLogReport_1.HotPatchLogReport.Report(c),
              (i.s_url_prefix = _),
              (i.s_step_result = "decrypt config failed"),
              HotPatchLogReport_1.HotPatchLogReport.Report(i)));
    }
    return r;
  }
  Eza(e, t, o, r) {
    var i = new HotPatchLogReport_1.HotPatchLog(),
      a = { success: !0 },
      n =
        ((i.s_step_id = "end_download_remote_config"),
        new HotPatchLogReport_1.HotPatchLog());
    n.s_step_id = "check_remote_config";
    let c = t;
    var s,
      _,
      u = void 0 === c || e > c.UpdateTime ? e : c.UpdateTime;
    let h = 0,
      L = 0;
    for ([s, _] of o)
      void 0 === _.UpdateTime || "number" != typeof _.UpdateTime
        ? (LauncherLog_1.LauncherLog.Error("远程配置文件UpdateTime字段非法！"),
          (n.s_url_prefix = s),
          (n.s_step_result =
            "remote config field is illegal. field: UpdateTime"),
          HotPatchLogReport_1.HotPatchLogReport.Report(n),
          L++)
        : _.UpdateTime < u &&
          (LauncherLog_1.LauncherLog.Error("远程配置文件已过时！", [
            "prefix",
            s,
          ]),
          (n.s_url_prefix = s),
          (n.s_step_result = "out date"),
          (n.i_latest_time = u),
          (n.i_out_date_time = _.UpdateTime),
          HotPatchLogReport_1.HotPatchLogReport.Report(n),
          h++);
    if (!c) {
      if (h <= 0 && L <= 0)
        return (
          (a.success = !1),
          (a.info = "failed, get all remote configs failed."),
          (i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(a)),
          HotPatchLogReport_1.HotPatchLogReport.Report(i),
          0
        );
      if (!r)
        return h > L
          ? ((a.success = !1),
            (a.info = "failed, the most of remote configs is out of date."),
            (i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(a)),
            HotPatchLogReport_1.HotPatchLogReport.Report(i),
            2)
          : ((a.success = !1),
            (a.info = "failed, the most of remote config field is illegal."),
            (i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(a)),
            HotPatchLogReport_1.HotPatchLogReport.Report(i),
            3);
      if (
        (LauncherLog_1.LauncherLog.Info(
          "所有远程配置更新时间戳字段都不可用，强行设置一个远程配置",
          ["configCount", o.size],
        ),
        o.size <= 0)
      )
        return (
          LauncherLog_1.LauncherLog.Error(
            "所有远程配置更新时间戳字段都不可用，并且没有获取到有效的配置个数。",
          ),
          (a.success = !1),
          (a.info = "failed, can not assign a valid remote config."),
          (i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(a)),
          HotPatchLogReport_1.HotPatchLogReport.Report(i),
          0
        );
      for (var [, g] of o) {
        c = g;
        break;
      }
    }
    return (
      (a.success = !0),
      (a.info = "success"),
      (i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(a)),
      HotPatchLogReport_1.HotPatchLogReport.Report(i),
      (RemoteConfig_1.RemoteInfo.NewConfig = c),
      !r &&
        RemoteConfig_1.RemoteInfo.NewConfig.UpdateTime > e &&
        LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
          LauncherStorageLib_1.ELauncherStorageDeviceKey.RemoteVersionUpdate,
          RemoteConfig_1.RemoteInfo.NewConfig.UpdateTime,
        ),
      4
    );
  }
  async QSr(e = !1) {
    var t,
      o,
      r = UE.BlueprintPathsLibrary.ProjectConfigDir() + "Kuro/RConfig.ini",
      i = (0, puerts_1.$ref)(void 0),
      a = (0, puerts_1.$ref)(void 0);
    return UE.BlueprintPathsLibrary.FileExists(r) &&
      UE.KuroStaticLibrary.LoadFileToString(i, r) &&
      UE.KuroLauncherLibrary.Decrypt((0, puerts_1.$unref)(i), a)
      ? (LauncherLog_1.LauncherLog.Info("灰度转版本..."),
        (RemoteConfig_1.RemoteInfo.NewConfig = JSON.parse(
          (0, puerts_1.$unref)(a),
        )),
        4)
      : ((r = `${BaseConfigController_1.BaseConfigController.GetMixUri()}/${this.KSr.GetPlatform()}/config.json`),
        UrlPrefixDownload_1.UrlPrefixSelector.Init(),
        this.jSr ||
          (UrlPrefixDownload_1.UrlPrefixSelector.Reset(), (this.jSr = !0)),
        (i = UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList()),
        ((a = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
          "start_download_remote_config"),
        HotPatchLogReport_1.HotPatchLogReport.Report(a),
        (a = { success: !0 }),
        ((o = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
          "end_download_remote_config"),
        void 0 ===
        (t = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
          LauncherStorageLib_1.ELauncherStorageDeviceKey.RemoteVersionUpdate,
          0,
        ))
          ? (LauncherLog_1.LauncherLog.Info(
              "获取远程配置上次更新的本地记录失败！",
            ),
            (a.success = !1),
            (a.info =
              "failed, can not get the last remote config update time from local record."),
            (o.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(a)),
            HotPatchLogReport_1.HotPatchLogReport.Report(o),
            1)
          : ((a = new Map()),
            (o = await this.yza(i, r, a)),
            this.Eza(t, o, a, e)));
  }
}
exports.BaseDiffPatchProcedure = BaseDiffPatchProcedure;
//# sourceMappingURL=BaseDiffPatchProcedure.js.map
