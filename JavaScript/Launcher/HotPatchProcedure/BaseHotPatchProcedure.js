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
  LauncherStorageLib_1 = require("../Util/LauncherStorageLib"),
  LauncherTextLib_1 = require("../Util/LauncherTextLib"),
  ProcedureUtil_1 = require("../Util/ProcedureUtil"),
  LauncherSerialize_1 = require("../Util/LauncherSerialize"),
  DEFAULT_CONFIG_TRY_COUNT = 3;
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
    let o = !1;
    return (
      await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(
        async () => ({ Success: (o = await this.QSr()) }),
        async (e, t) => {
          return (await this.ViewMgr.ShowDialog(
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
            : ((o = !1),
              AppUtil_1.AppUtil.QuitGame(),
              await this.ViewMgr.WaitFrame(),
              { Success: !0 });
        },
      ),
      o
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
      var a = new HotPatchLogReport_1.HotPatchLog(),
        a =
          ((a.s_step_id = "hotpatch_procedure_check_version"),
          HotPatchLogReport_1.HotPatchLogReport.Report(a),
          await this.CheckResourceVersion(c));
      if (a) {
        a = new HotPatchLogReport_1.HotPatchLog();
        if (
          ((a.s_step_id = "hotpatch_procedure_download_index"),
          HotPatchLogReport_1.HotPatchLogReport.Report(a),
          !(r = await this.DownloadIndexFile(c)))
        )
          return !1;
        a = new HotPatchLogReport_1.HotPatchLog();
        if (
          ((a.s_step_id = "hotpatch_procedure_resolve_index"),
          HotPatchLogReport_1.HotPatchLogReport.Report(a),
          !(r = await this.ResolveIndexFile(c)))
        )
          return !1;
        a = new HotPatchLogReport_1.HotPatchLog();
        if (
          ((a.s_step_id = "hotpatch_procedure_check_resource_file"),
          HotPatchLogReport_1.HotPatchLogReport.Report(a),
          !(r = await this.CheckResourceFiles(c)))
        )
          return !1;
        var a = new HotPatchLogReport_1.HotPatchLog(),
          a =
            ((a.s_step_id = "hotpatch_procedure_check_resource_complete"),
            HotPatchLogReport_1.HotPatchLogReport.Report(a),
            c.GetUpdateSize()),
          i = c.GetNeedSpace();
        if (0n < a) {
          a = new HotPatchLogReport_1.HotPatchLog();
          if (
            ((a.s_step_id = "hotpatch_procedure_check_space"),
            HotPatchLogReport_1.HotPatchLogReport.Report(a),
            !(r = await this.DoesSavedDirHaveEnoughSpace(i)))
          )
            return !1;
          a = new HotPatchLogReport_1.HotPatchLog();
          if (
            ((a.s_step_id = "hotpatch_procedure_download_file"),
            HotPatchLogReport_1.HotPatchLogReport.Report(a),
            !(r = await this.DownloadFiles(e, c)))
          )
            return !1;
          i = new HotPatchLogReport_1.HotPatchLog();
          if (
            ((i.s_step_id = "hotpatch_procedure_check_need_restart"),
            HotPatchLogReport_1.HotPatchLogReport.Report(i),
            !(r = await this.CheckNeedRestartApp(c)))
          )
            return (
              ((a = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                "hotpatch_procedure_check_need_restart_false"),
              HotPatchLogReport_1.HotPatchLogReport.Report(a),
              !1
            );
          i = new HotPatchLogReport_1.HotPatchLog();
          (i.s_step_id = "hotpatch_procedure_download_complete"),
            HotPatchLogReport_1.HotPatchLogReport.Report(i);
        }
      } else {
        a = new HotPatchLogReport_1.HotPatchLog();
        (a.s_step_id = "hotpatch_procedure_check_version_continue"),
          HotPatchLogReport_1.HotPatchLogReport.Report(a);
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
    let a = !1;
    var e = BigInt(1048576);
    return (
      !!(a = await this.DoesSavedDirHaveEnoughSpace(e)) &&
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
            : ((a = !1),
              AppUtil_1.AppUtil.QuitGame(),
              await this.ViewMgr.WaitFrame(),
              { Success: !0 });
        },
      ),
      a)
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
              AppUtil_1.AppUtil.QuitGame(),
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
              AppUtil_1.AppUtil.QuitGame(),
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
          UE.BlueprintPathsLibrary.ProjectSavedDir(),
          e,
        ),
        o = new HotPatchLogReport_1.HotPatchLog(),
        r =
          ((o.s_step_id = "check_have_enough_space"),
          {
            IsEnough: t,
            Path: UE.BlueprintPathsLibrary.ProjectSavedDir(),
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
            AppUtil_1.AppUtil.QuitGame(), await this.ViewMgr.WaitFrame(), !1
          );
    } while (!t);
    return !0;
  }
  async DownloadFiles(e, ...t) {
    var o = new HotPatchLogReport_1.HotPatchLog();
    (o.s_step_id = "hotpatch_procedure_download_file_start"),
      HotPatchLogReport_1.HotPatchLogReport.Report(o),
      await this.ViewMgr.ShowInfo(!0, void 0);
    let i = 0n;
    for (const _ of t) i += _.GetUpdateSize();
    let c = 0n,
      a = !0;
    const r = (e, t, o, r) => {
      var o = c + o,
        a = (100n * o) / i,
        a = Number(a) / 100;
      this.ViewMgr.UpdatePatchDownProgress(
        !1,
        a,
        e,
        LauncherTextLib_1.LauncherTextLib.DownloadSpeedFormat(t),
        LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(o),
        LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(i),
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
        : ((a = !1),
          AppUtil_1.AppUtil.QuitGame(),
          await this.ViewMgr.WaitFrame(),
          { Success: !0 });
    };
    for (const h of t) {
      if (
        (await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(async () => {
          var e = await h.DownloadResourceFiles(r);
          return { Success: e.Success, Others: e };
        }, n),
        !a)
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
              AppUtil_1.AppUtil.QuitGame(),
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
    for (const r of e) {
      var o = r.GetPakList();
      if (o)
        for (const a of o)
          UE.KuroPakMountStatic.MountPak(a.SavePath + ".pak", a.MountOrder);
    }
    return !0;
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
  async QSr() {
    var e = UE.BlueprintPathsLibrary.ProjectConfigDir() + "Kuro/RConfig.ini",
      r = (0, puerts_1.$ref)(void 0),
      a = (0, puerts_1.$ref)(void 0);
    if (
      UE.BlueprintPathsLibrary.FileExists(e) &&
      UE.KuroStaticLibrary.LoadFileToString(r, e) &&
      UE.KuroLauncherLibrary.Decrypt((0, puerts_1.$unref)(r), a)
    )
      LauncherLog_1.LauncherLog.Info("灰度转版本..."),
        (RemoteConfig_1.RemoteInfo.Config = JSON.parse(
          (0, puerts_1.$unref)(a),
        ));
    else {
      var i = `${BaseConfigController_1.BaseConfigController.GetMixUri()}/${this.KSr.GetPlatform()}/config.json`;
      UrlPrefixDownload_1.UrlPrefixSelector.Init(),
        this.jSr ||
          (UrlPrefixDownload_1.UrlPrefixSelector.Reset(), (this.jSr = !0));
      let t = !1,
        o = void 0;
      (e = UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList()),
        (r = new HotPatchLogReport_1.HotPatchLog());
      (r.s_step_id = "start_download_remote_config"),
        HotPatchLogReport_1.HotPatchLogReport.Report(r);
      for (const h of e) {
        let e = 0;
        for (; e < DEFAULT_CONFIG_TRY_COUNT; ) {
          e++,
            LauncherLog_1.LauncherLog.Info(
              "开始获取远程配置文件",
              ["prefix", h],
              ["configUrl", i],
              ["tryCount", e],
            );
          var c = await (0, UrlPrefixHttpRequest_1.httpRequest)(h + i),
            n = new HotPatchLogReport_1.HotPatchLog(),
            _ =
              ((n.s_url_prefix = h),
              (n.s_step_id = "request_remote_config"),
              (n.i_try_count = e.toString()),
              { success: !0 });
          if (200 === c.Code) {
            LauncherLog_1.LauncherLog.Info("获取远程配置文件成功"),
              (n.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(_)),
              HotPatchLogReport_1.HotPatchLogReport.Report(n),
              (t = !0),
              (o = c.Result);
            break;
          }
          LauncherLog_1.LauncherLog.Error(
            "获取远程配置失败",
            ["reason", c.Result],
            ["errorCode", c.Code],
            ["tryCount", e],
          );
          c = { Success: "failed", Reason: c.Result, HttpCode: c.Code };
          (_.success = !1),
            (_.info = c),
            (n.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(_)),
            HotPatchLogReport_1.HotPatchLogReport.Report(n);
        }
        if (t) break;
      }
      (a = new HotPatchLogReport_1.HotPatchLog()), (r = { success: !0 });
      if (((a.s_step_id = "end_download_remote_config"), !t))
        return (
          LauncherLog_1.LauncherLog.Error(
            "远程配置文件url前缀获取失败！无法下载远程配置！",
          ),
          (r.success = !1),
          (r.info = "failed, can not get file."),
          (a.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r)),
          HotPatchLogReport_1.HotPatchLogReport.Report(a),
          !1
        );
      e = (0, puerts_1.$ref)(void 0);
      if (!UE.KuroLauncherLibrary.Decrypt(o, e))
        return (
          LauncherLog_1.LauncherLog.Error("远程配置文件内容无法解析！"),
          (r.success = !1),
          (r.info = "failed, can not decrypt file"),
          (a.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r)),
          HotPatchLogReport_1.HotPatchLogReport.Report(a),
          !1
        );
      (r.success = !0),
        (a.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r)),
        HotPatchLogReport_1.HotPatchLogReport.Report(a),
        (RemoteConfig_1.RemoteInfo.Config = new RemoteConfig_1.RemoteConfig(
          JSON.parse((0, puerts_1.$unref)(e)),
        ));
    }
    return !0;
  }
}
exports.BaseHotPatchProcedure = BaseHotPatchProcedure;
//# sourceMappingURL=BaseHotPatchProcedure.js.map
