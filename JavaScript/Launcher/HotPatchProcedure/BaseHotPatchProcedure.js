"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseHotPatchProcedure = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  DownloadDefine_1 = require("../Download/DownloadDefine"),
  UrlPrefixDownload_1 = require("../Download/UrlPrefixDownload"),
  UrlPrefixHttpRequest_1 = require("../Download/UrlPrefixHttpRequest"),
  HotPatchLogReport_1 = require("../HotPatchLogReport"),
  RemoteConfig_1 = require("../RemoteConfig"),
  AppUtil_1 = require("../Update/AppUtil"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherSerialize_1 = require("../Util/LauncherSerialize"),
  LauncherStorageLib_1 = require("../Util/LauncherStorageLib"),
  LauncherTextLib_1 = require("../Util/LauncherTextLib"),
  ProcedureUtil_1 = require("../Util/ProcedureUtil");
class BaseHotPatchProcedure {
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
      !(this.WSr === RemoteConfig_1.RemoteInfo.Config.PackageVersion)
    );
  }
  async UpdateResource(e, ...t) {
    var o = new HotPatchLogReport_1.HotPatchLog();
    (o.s_step_id = "hotpatch_procedure_update_res_start"),
      HotPatchLogReport_1.HotPatchLogReport.Report(o);
    let r = !0;
    for (const c of t) {
      var i = new HotPatchLogReport_1.HotPatchLog(),
        i =
          ((i.s_step_id = "hotpatch_procedure_check_version"),
          HotPatchLogReport_1.HotPatchLogReport.Report(i),
          await this.CheckResourceVersion(c));
      if (i) {
        i = new HotPatchLogReport_1.HotPatchLog();
        if (
          ((i.s_step_id = "hotpatch_procedure_download_index"),
          HotPatchLogReport_1.HotPatchLogReport.Report(i),
          !(r = await this.DownloadIndexFile(c)))
        )
          return !1;
        i = new HotPatchLogReport_1.HotPatchLog();
        if (
          ((i.s_step_id = "hotpatch_procedure_resolve_index"),
          HotPatchLogReport_1.HotPatchLogReport.Report(i),
          !(r = await this.ResolveIndexFile(c)))
        )
          return !1;
        i = new HotPatchLogReport_1.HotPatchLog();
        if (
          ((i.s_step_id = "hotpatch_procedure_check_resource_file"),
          HotPatchLogReport_1.HotPatchLogReport.Report(i),
          !(r = await this.CheckResourceFiles(c)))
        )
          return !1;
        var i = new HotPatchLogReport_1.HotPatchLog(),
          i =
            ((i.s_step_id = "hotpatch_procedure_check_resource_complete"),
            HotPatchLogReport_1.HotPatchLogReport.Report(i),
            c.GetUpdateSize()),
          a = c.GetNeedSpace();
        if (0n < i) {
          i = new HotPatchLogReport_1.HotPatchLog();
          if (
            ((i.s_step_id = "hotpatch_procedure_check_space"),
            HotPatchLogReport_1.HotPatchLogReport.Report(i),
            !(r = await this.DoesSavedDirHaveEnoughSpace(a)))
          )
            return !1;
          i = new HotPatchLogReport_1.HotPatchLog();
          if (
            ((i.s_step_id = "hotpatch_procedure_download_file"),
            HotPatchLogReport_1.HotPatchLogReport.Report(i),
            !(r = await this.DownloadFiles(e, c)))
          )
            return !1;
          a = new HotPatchLogReport_1.HotPatchLog();
          if (
            ((a.s_step_id = "hotpatch_procedure_check_need_restart"),
            HotPatchLogReport_1.HotPatchLogReport.Report(a),
            !(r = await this.CheckNeedRestartApp(c)))
          )
            return (
              ((i = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                "hotpatch_procedure_check_need_restart_false"),
              HotPatchLogReport_1.HotPatchLogReport.Report(i),
              !1
            );
          a = new HotPatchLogReport_1.HotPatchLog();
          (a.s_step_id = "hotpatch_procedure_download_complete"),
            HotPatchLogReport_1.HotPatchLogReport.Report(a);
        }
      } else {
        i = new HotPatchLogReport_1.HotPatchLog();
        (i.s_step_id = "hotpatch_procedure_check_version_continue"),
          HotPatchLogReport_1.HotPatchLogReport.Report(i);
      }
    }
    o = new HotPatchLogReport_1.HotPatchLog();
    return (
      (o.s_step_id = "hotpatch_procedure_update_res_end"),
      HotPatchLogReport_1.HotPatchLogReport.Report(o),
      r
    );
  }
  async CheckResourceVersion(e) {
    return (
      await this.ViewMgr.ShowInfo(!1, "CheckResourceVersion", e.GetResType()),
      e.CheckResourceVersion()
    );
  }
  async DownloadIndexFile(t) {
    let i = !1;
    var e = BigInt(1048576);
    return (
      !!(i = await this.DoesSavedDirHaveEnoughSpace(e)) &&
      (await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(
        async () => {
          var e = await t.DownloadIndexFile();
          return { Success: e.Success, Others: e };
        },
        async (e, t) => {
          let o = DownloadDefine_1.EDownloadState.None,
            r = 0;
          e && ((e = e), (o = e.DownloadState || o), (r = e.HttpCode || r));
          e =
            o === DownloadDefine_1.EDownloadState.HttpError
              ? LauncherTextLib_1.LauncherTextLib.DownloadStateFormat(o) +
                `(http code: ${r})`
              : LauncherTextLib_1.LauncherTextLib.DownloadStateFormat(o);
          return (await this.ViewMgr.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "DownloadIndexFileFailed",
            "HotFixQuit",
            "HotFixRetry",
            void 0,
            e,
          ).catch((e) => {
            LauncherLog_1.LauncherLog.ErrorWithStack(
              "弹窗异常（下载Index文件失败）",
              e,
            );
          }))
            ? t()
            : ((i = !1),
              AppUtil_1.AppUtil.QuitGame("DownloadIndexFile failed"),
              await this.ViewMgr.WaitFrame(),
              { Success: !0 });
        },
      ),
      i)
    );
  }
  async ResolveIndexFile(e) {
    await this.ViewMgr.ShowInfo(!1, "ResolveIndexFile");
    let o = !1;
    return (
      await (0, ProcedureUtil_1.whetherRepeatDoOnFailed)(
        () => ({ Success: (o = e.ResolveIndexFile()) }),
        async (e, t) => {
          return (await this.ViewMgr.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "ResolveIndexFileFailed",
            "HotFixQuit",
            "HotFixRetry",
            void 0,
          ).catch((e) => {
            LauncherLog_1.LauncherLog.ErrorWithStack(
              "弹窗异常（解析补丁列表失败）",
              e,
            );
          }))
            ? t()
            : ((o = !1),
              AppUtil_1.AppUtil.QuitGame("ResolveIndexFile failed"),
              await this.ViewMgr.WaitFrame(),
              { Success: !0 });
        },
      ),
      o
    );
  }
  async CheckResourceFiles(e) {
    await this.ViewMgr.ShowInfo(!0, void 0);
    let o = !1;
    const t = async (e) => {
      var t = 100 * e;
      await this.ViewMgr.UpdateProgress(!0, e, "CheckIntegrity", t.toFixed(0));
    };
    return (
      await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(
        async () => ({ Success: (o = await e.CheckResourceFiles(t)) }),
        async (e, t) => {
          return (await this.ViewMgr.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "ValidateResourceFailed",
            "HotFixQuit",
            "HotFixRetry",
            void 0,
          ).catch((e) => {
            LauncherLog_1.LauncherLog.ErrorWithStack(
              "弹窗异常（检验资源文件失败）",
              e,
            );
          }))
            ? t()
            : ((o = !1),
              AppUtil_1.AppUtil.QuitGame("CheckResourceFiles failed"),
              await this.ViewMgr.WaitFrame(),
              { Success: !0 });
        },
      ),
      o
    );
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
  async DownloadFiles(e, ...t) {
    var o = new HotPatchLogReport_1.HotPatchLog();
    (o.s_step_id = "hotpatch_procedure_download_file_start"),
      HotPatchLogReport_1.HotPatchLogReport.Report(o),
      await this.ViewMgr.ShowInfo(!0, void 0);
    let a = 0n;
    for (const _ of t) a += _.GetUpdateSize();
    let c = 0n,
      i = !0;
    const r = (e, t, o, r) => {
      var o = c + o,
        i = (100n * o) / a,
        i = Number(i) / 100;
      this.ViewMgr.UpdatePatchDownProgress(
        !1,
        i,
        e,
        LauncherTextLib_1.LauncherTextLib.DownloadSpeedFormat(t),
        LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(o),
        LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(a),
      );
    };
    var n = async (e, t) => {
      let o = DownloadDefine_1.EDownloadState.None,
        r = 0;
      e && ((e = e), (o = e.DownloadState || o), (r = e.HttpCode || r));
      e =
        o === DownloadDefine_1.EDownloadState.HttpError
          ? LauncherTextLib_1.LauncherTextLib.DownloadStateFormat(o) +
            `(http code: ${r})`
          : LauncherTextLib_1.LauncherTextLib.DownloadStateFormat(o);
      return (await this.ViewMgr.ShowDialog(
        !0,
        "HotFixTipsTitle",
        "DownloadResourcePatchFailed",
        "HotFixQuit",
        "HotFixRetry",
        void 0,
        e,
      ).catch((e) => {
        LauncherLog_1.LauncherLog.ErrorWithStack(
          "弹窗异常（下载资源补丁失败）",
          e,
        );
      }))
        ? t()
        : ((i = !1),
          AppUtil_1.AppUtil.QuitGame("DownloadFiles failed"),
          await this.ViewMgr.WaitFrame(),
          { Success: !0 });
    };
    for (const h of t) {
      if (
        (await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(async () => {
          var e = await h.DownloadResourceFiles(r);
          return { Success: e.Success, Others: e };
        }, n),
        !i)
      )
        return !1;
      c += h.GetUpdateSize();
    }
    await this.ViewMgr.WaitFrame();
    o = new HotPatchLogReport_1.HotPatchLog();
    return (
      (o.s_step_id = "hotpatch_procedure_download_file_end"),
      HotPatchLogReport_1.HotPatchLogReport.Report(o),
      !0
    );
  }
  async CheckNeedRestartApp(e) {
    let o = !1;
    return (
      await (0, ProcedureUtil_1.whetherRepeatDoOnFailed)(
        () => ({ Success: (o = e.CheckNeedRestartApp()) }),
        async (e, t) => {
          return (await this.ViewMgr.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "GetResourceInfoFailed",
            "HotFixQuit",
            "HotFixRetry",
            void 0,
          ).catch((e) => {
            LauncherLog_1.LauncherLog.ErrorWithStack(
              "弹窗异常（分析资源补丁类型失败）",
              e,
            );
          }))
            ? t()
            : ((o = !1),
              AppUtil_1.AppUtil.QuitGame("CheckNeedRestartApp failed"),
              await this.ViewMgr.WaitFrame(),
              { Success: !0 });
        },
      ),
      o
    );
  }
  NeedRestart(...e) {
    for (const t of e) if (t.GetNeedRestart()) return !0;
    return !1;
  }
  async MountPak(...e) {
    var t = new HotPatchLogReport_1.HotPatchLog();
    (t.s_step_id = "mount_update_paks"),
      HotPatchLogReport_1.HotPatchLogReport.Report(t),
      await this.ViewMgr.ShowInfo(!1, "MountPak");
    for (const i of e) {
      var o = i.GetPakList();
      if (o)
        for (const a of o) {
          var r = a.SavePath + ".pak";
          UE.KuroPakMountStatic.MountPak(r, a.MountOrder),
            UE.KuroPakMountStatic.AddSha1Check(r, a.PakSha1);
        }
    }
    return UE.KuroPakMountStatic.StartSha1Check(), !0;
  }
  PreComplete() {
    RemoteConfig_1.RemoteInfo?.Config?.LauncherVersion &&
      LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.LauncherPatchVersion,
        RemoteConfig_1.RemoteInfo?.Config?.LauncherVersion,
      ),
      RemoteConfig_1.RemoteInfo?.Config?.ResourceVersion &&
        LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
          LauncherStorageLib_1.ELauncherStorageGlobalKey.PatchVersion,
          RemoteConfig_1.RemoteInfo?.Config?.ResourceVersion,
        ),
      RemoteConfig_1.RemoteInfo?.Config?.ChangeList &&
        0 < RemoteConfig_1.RemoteInfo?.Config?.ChangeList.length &&
        LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
          LauncherStorageLib_1.ELauncherStorageGlobalKey.PatchP4Version,
          RemoteConfig_1.RemoteInfo?.Config?.ChangeList,
        );
  }
  async Complete() {
    var e = new HotPatchLogReport_1.HotPatchLog();
    return (
      (e.s_step_id = "complete_hot_patch"),
      HotPatchLogReport_1.HotPatchLogReport.Report(e),
      await this.ViewMgr.ShowInfo(!1, "CompleteHotFix"),
      !0
    );
  }
  async zKa(e, t, o) {
    let r = void 0;
    var i = new HotPatchLogReport_1.HotPatchLog();
    i.s_step_id = "check_remote_config";
    for (const h of e) {
      LauncherLog_1.LauncherLog.Info(
        "开始获取远程配置文件",
        ["prefix", h],
        ["configUrl", t],
      );
      var a,
        c = await (0, UrlPrefixHttpRequest_1.httpRequest)(h + t),
        n = new HotPatchLogReport_1.HotPatchLog(),
        _ =
          ((n.s_url_prefix = h),
          (n.s_step_id = "request_remote_config"),
          { success: !0 });
      200 !== c.Code
        ? (LauncherLog_1.LauncherLog.Error(
            "获取远程配置失败",
            ["reason", c.Result],
            ["errorCode", c.Code],
          ),
          (a = { Success: "failed", Reason: c.Result, HttpCode: c.Code }),
          (_.success = !1),
          (_.info = a),
          (n.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(_)),
          HotPatchLogReport_1.HotPatchLogReport.Report(n))
        : (LauncherLog_1.LauncherLog.Info("获取远程配置文件成功"),
          (n.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(_)),
          HotPatchLogReport_1.HotPatchLogReport.Report(n),
          (a = (0, puerts_1.$ref)(void 0)),
          UE.KuroLauncherLibrary.Decrypt(c.Result, a)
            ? ((c = new RemoteConfig_1.RemoteConfig(
                JSON.parse((0, puerts_1.$unref)(a)),
              )),
              (_.success = !0),
              (n.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(_)),
              HotPatchLogReport_1.HotPatchLogReport.Report(n),
              o.set(h, c),
              void 0 !== c.UpdateTime &&
                "number" == typeof c.UpdateTime &&
                (void 0 === r || r.UpdateTime < c.UpdateTime) &&
                (r = c))
            : (LauncherLog_1.LauncherLog.Error("远程配置文件内容无法解析！"),
              (_.success = !1),
              (_.info = "failed, can not decrypt file"),
              (n.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(_)),
              HotPatchLogReport_1.HotPatchLogReport.Report(n),
              (i.s_url_prefix = h),
              (i.s_step_result = "decrypt config failed"),
              HotPatchLogReport_1.HotPatchLogReport.Report(i)));
    }
    return r;
  }
  JKa(e, t, o, r) {
    var i = new HotPatchLogReport_1.HotPatchLog(),
      a = { success: !0 },
      c =
        ((i.s_step_id = "end_download_remote_config"),
        new HotPatchLogReport_1.HotPatchLog());
    c.s_step_id = "check_remote_config";
    let n = t;
    var _,
      h,
      s = void 0 === n || e > n.UpdateTime ? e : n.UpdateTime;
    let u = 0,
      l = 0;
    for ([_, h] of o)
      void 0 === h.UpdateTime || "number" != typeof h.UpdateTime
        ? (LauncherLog_1.LauncherLog.Error("远程配置文件UpdateTime字段非法！"),
          (c.s_url_prefix = _),
          (c.s_step_result =
            "remote config field is illegal. field: UpdateTime"),
          HotPatchLogReport_1.HotPatchLogReport.Report(c),
          l++)
        : h.UpdateTime < s &&
          (LauncherLog_1.LauncherLog.Error("远程配置文件已过时！", [
            "prefix",
            _,
          ]),
          (c.s_url_prefix = _),
          (c.s_step_result = "out date"),
          HotPatchLogReport_1.HotPatchLogReport.Report(c),
          u++);
    if (!n) {
      if (u <= 0 && l <= 0)
        return (
          (a.success = !1),
          (a.info = "failed, get all remote configs failed."),
          (i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(a)),
          HotPatchLogReport_1.HotPatchLogReport.Report(i),
          0
        );
      if (!r)
        return u > l
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
      for (var [, p] of o) {
        n = p;
        break;
      }
    }
    return (
      (a.success = !0),
      (a.info = "success"),
      (i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(a)),
      HotPatchLogReport_1.HotPatchLogReport.Report(i),
      (RemoteConfig_1.RemoteInfo.Config = n),
      !r &&
        RemoteConfig_1.RemoteInfo.Config.UpdateTime > e &&
        LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
          LauncherStorageLib_1.ELauncherStorageGlobalKey.RemoteVersionUpdate,
          RemoteConfig_1.RemoteInfo.Config.UpdateTime,
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
        (RemoteConfig_1.RemoteInfo.Config = JSON.parse(
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
        (t = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
          LauncherStorageLib_1.ELauncherStorageGlobalKey.RemoteVersionUpdate,
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
            (o = await this.zKa(i, r, a)),
            this.JKa(t, o, a, e)));
  }
}
exports.BaseHotPatchProcedure = BaseHotPatchProcedure;
//# sourceMappingURL=BaseHotPatchProcedure.js.map
