"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MobileHotPatchProcedure = void 0);
const UE = require("ue"),
  DownloadDefine_1 = require("../Download/DownloadDefine"),
  UrlPrefixDownload_1 = require("../Download/UrlPrefixDownload"),
  NetworkDefine_1 = require("../NetworkDefine"),
  AppUtil_1 = require("../Update/AppUtil"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherTextLib_1 = require("../Util/LauncherTextLib"),
  ProcedureUtil_1 = require("../Util/ProcedureUtil"),
  BaseHotPatchProcedure_1 = require("./BaseHotPatchProcedure"),
  HotPatchLogReport_1 = require("../HotPatchLogReport"),
  LauncherSerialize_1 = require("../Util/LauncherSerialize");
class MobileHotPatchProcedure extends BaseHotPatchProcedure_1.BaseHotPatchProcedure {
  constructor(t, e) {
    super(t, e),
      (this.UpdateSize = void 0),
      (this.XSr = void 0),
      (this.$Sr = void 0),
      (this.YSr = void 0),
      (this.JSr = void 0),
      (this.kso = void 0),
      (this.zSr = NetworkDefine_1.ENetworkType.None),
      (this.ZSr = !1),
      (this.eyr = !1),
      (this.tyr = void 0),
      (this.iyr = void 0),
      (this.oyr = !1);
  }
  get NetworkListener() {
    return this.kso || (this.kso = new UE.KuroNetworkChange()), this.kso;
  }
  async UpdateResource(t, ...e) {
    if (!t) return super.UpdateResource(t, ...e);
    var o = new HotPatchLogReport_1.HotPatchLog();
    (o.s_step_id = "hotpatch_mobile_procedure_update_res_start"),
      HotPatchLogReport_1.HotPatchLogReport.Report(o),
      (this.UpdateSize = 0n),
      (this.XSr = 0n),
      (this.$Sr = 0n);
    let r = !0;
    for (const h of e) {
      var i = new HotPatchLogReport_1.HotPatchLog(),
        i =
          ((i.s_step_id = "hotpatch_mobile_procedure_check_version"),
          HotPatchLogReport_1.HotPatchLogReport.Report(i),
          await this.CheckResourceVersion(h));
      if (i) {
        i = new HotPatchLogReport_1.HotPatchLog();
        if (
          ((i.s_step_id = "hotpatch_mobile_procedure_download_index"),
          HotPatchLogReport_1.HotPatchLogReport.Report(i),
          !(r = await this.DownloadIndexFile(h)))
        )
          return !1;
        i = new HotPatchLogReport_1.HotPatchLog();
        if (
          ((i.s_step_id = "hotpatch_mobile_procedure_resolve_index"),
          HotPatchLogReport_1.HotPatchLogReport.Report(i),
          !(r = await this.ResolveIndexFile(h)))
        )
          return !1;
        i = new HotPatchLogReport_1.HotPatchLog();
        if (
          ((i.s_step_id = "hotpatch_mobile_procedure_check_resource_file"),
          HotPatchLogReport_1.HotPatchLogReport.Report(i),
          !(r = await this.CheckResourceFiles(h)))
        )
          return !1;
        i = new HotPatchLogReport_1.HotPatchLog();
        (i.s_step_id = "hotpatch_mobile_procedure_check_resource_complete"),
          HotPatchLogReport_1.HotPatchLogReport.Report(i),
          (this.UpdateSize += h.GetUpdateSize()),
          (this.$Sr += h.GetNeedSpace());
      } else {
        i = new HotPatchLogReport_1.HotPatchLog();
        (i.s_step_id = "hotpatch_mobile_procedure_check_version_continue"),
          HotPatchLogReport_1.HotPatchLogReport.Report(i);
      }
    }
    if (0n < this.UpdateSize) {
      o = new HotPatchLogReport_1.HotPatchLog();
      if (
        ((o.s_step_id = "hotpatch_mobile_procedure_check_space"),
        HotPatchLogReport_1.HotPatchLogReport.Report(o),
        !(r = await this.DoesSavedDirHaveEnoughSpace(this.$Sr)))
      )
        return !1;
      o = new HotPatchLogReport_1.HotPatchLog();
      if (
        ((o.s_step_id = "hotpatch_mobile_procedure_download_file"),
        HotPatchLogReport_1.HotPatchLogReport.Report(o),
        !(r = await this.DownloadFiles(t, ...e)))
      )
        return !1;
      var a,
        o = new HotPatchLogReport_1.HotPatchLog();
      (o.s_step_id = "hotpatch_mobile_procedure_check_need_restart"),
        HotPatchLogReport_1.HotPatchLogReport.Report(o);
      for (const c of e)
        if (!(c.GetUpdateSize() <= 0n))
          if (!(r = await this.CheckNeedRestartApp(c)))
            return (
              ((a = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                "hotpatch_mobile_procedure_check_need_restart_false"),
              HotPatchLogReport_1.HotPatchLogReport.Report(a),
              !1
            );
      t = new HotPatchLogReport_1.HotPatchLog();
      (t.s_step_id = "hotpatch_mobile_procedure_download_complete"),
        HotPatchLogReport_1.HotPatchLogReport.Report(t);
    }
    o = new HotPatchLogReport_1.HotPatchLog();
    return (
      (o.s_step_id = "hotpatch_mobile_procedure_update_res_end"),
      HotPatchLogReport_1.HotPatchLogReport.Report(o),
      r
    );
  }
  async DownloadFiles(t, ...e) {
    var o = new HotPatchLogReport_1.HotPatchLog(),
      r =
        ((o.s_step_id = "hotpatch_mobile_procedure_download_file_start"),
        new HotPatchLogReport_1.HotPatchLog()),
      o =
        ((r.s_step_id = "hotpatch_mobile_procedure_download_file_end"),
        HotPatchLogReport_1.HotPatchLogReport.Report(o),
        UE.KuroLauncherLibrary.GetNetworkConnectionType());
    if (
      o === NetworkDefine_1.ENetworkType.Cell &&
      this.UpdateSize > 10n * LauncherTextLib_1.bigIntMb &&
      !(await this.ViewMgr.ShowDialog(
        !0,
        "HotFixTipsTitle",
        "HotFixNewPatch",
        "HotFixCancel",
        "HotFixUseNetworkDownload",
        void 0,
        LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(this.UpdateSize),
      ))
    )
      return AppUtil_1.AppUtil.QuitGame(), await this.ViewMgr.WaitFrame(), !1;
    o = new HotPatchLogReport_1.HotPatchLog();
    if (
      ((o.s_step_id = "hotpatch_mobile_procedure_check_use_bgdownload"),
      HotPatchLogReport_1.HotPatchLogReport.Report(o),
      !t)
    )
      return super.DownloadFiles(t, ...e);
    (o = new HotPatchLogReport_1.HotPatchLog()),
      (o.s_step_id = "hotpatch_mobile_procedure_use_bgdownload"),
      HotPatchLogReport_1.HotPatchLogReport.Report(o),
      (this.YSr = void 0),
      (this.ZSr = !1),
      (this.eyr = !1),
      (this.zSr = NetworkDefine_1.ENetworkType.None),
      (this.tyr = (t) => {
        LauncherLog_1.LauncherLog.Info("原始等待(promise1)被调用！");
      }),
      (this.iyr = (t) => {
        LauncherLog_1.LauncherLog.Info("监听到切换网络", [
          "state",
          NetworkDefine_1.ENetworkType[t],
        ]),
          this.oyr ||
            this.zSr === NetworkDefine_1.ENetworkType.Cell ||
            t !== NetworkDefine_1.ENetworkType.Cell ||
            this.ZSr ||
            (LauncherLog_1.LauncherLog.Info(
              "因网络切换为蜂窝数据，自动取消了下载，并弹窗提示玩家！",
            ),
            (this.ZSr = !0),
            (this.eyr = !1),
            this.JSr?.Cancel(),
            this.YSr?.CancelDownload(),
            this.ViewMgr.ShowDialog(
              !0,
              "HotFixTipsTitle",
              "HotFixNetworkChange",
              "HotFixQuit",
              "HotFixUseNetworkDownload",
              void 0,
            )
              .then((t) => {
                LauncherLog_1.LauncherLog.Info(
                  "用户确认了网络切为蜂窝数据确认框",
                  ["result", t],
                ),
                  (this.eyr = !0),
                  (this.oyr = this.oyr || t),
                  this.tyr(t);
              })
              .catch((t) => {
                LauncherLog_1.LauncherLog.ErrorWithStack(
                  "ui弹窗提示网络切换出现异常",
                  t,
                );
              }));
      }),
      this.NetworkListener.NetworkChangeDelegate.Add(this.iyr),
      (t = new HotPatchLogReport_1.HotPatchLog());
    (t.s_step_id = "hotpatch_mobile_procedure_evaluate"),
      HotPatchLogReport_1.HotPatchLogReport.Report(t);
    const n = new Map();
    let i = new Array();
    for (const b of e) {
      var a = b.GetViewInfoList();
      if (a) {
        for (var [h, c] of a) n.set(h, c);
        a = b.GetRequestList();
        i = i.concat(a);
      }
    }
    let _ = new Date().getTime(),
      s = 0,
      u = 0n,
      l = -1,
      p = 0n;
    const d = (t, e, o, r, i) => {
      var a,
        h,
        t = n.get(t);
      t && (t.SavedSize = i);
      let c = 0n;
      for ([a, h] of n) c += h.SavedSize;
      p += o;
      (t = new Date().getTime()),
        (i = t - s),
        (l -= i) < 0 &&
          t !== _ &&
          ((l = 500),
          (u = (1000n * p) / (BigInt(t) - BigInt(_))),
          (p = 0n),
          (_ = t)),
        (s = t),
        (o = (100n * c) / this.UpdateSize),
        (i = Number(o) / 100);
      this.ViewMgr.UpdatePatchDownProgress(
        !1,
        i,
        e,
        LauncherTextLib_1.LauncherTextLib.DownloadSpeedFormat(u),
        LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(c),
        LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(this.UpdateSize),
      ).catch((t) => {
        LauncherLog_1.LauncherLog.ErrorWithStack("ui显示评估进度出现异常", t);
      });
    };
    let L = !1,
      w = !1,
      g = 0;
    if (
      ((this.tyr = (t) => {
        LauncherLog_1.LauncherLog.Info("原始等待(promise2)被调用！");
      }),
      (o = await this.ryr(
        async () => {
          this.YSr = new UrlPrefixDownload_1.UrlPrefixDownload();
          var t = await this.YSr.StartEvaluatePrefix(i, !0, d);
          return (
            (L = t.Complete),
            (g = t.FileIndex),
            LauncherLog_1.LauncherLog.Info(
              "评估结束",
              ["completeEvaluate", L],
              ["startIndex", g],
              ["fileCount", i.length],
            ),
            g >= i.length
              ? {
                  Success: (w = !0),
                  DownloadState: DownloadDefine_1.EDownloadState.Success,
                  HttpCode: 0,
                }
              : {
                  Success: t.Complete,
                  DownloadState: t.DownloadState,
                  HttpCode: t.HttpCode,
                }
          );
        },
        async (t = "") => (
          (this.YSr = void 0),
          this.ViewMgr.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "EvaluateDownloadResourcePatchFailed",
            "HotFixQuit",
            "HotFixRetry",
            void 0,
            t,
          )
        ),
      )),
      (this.YSr = void 0),
      !o)
    )
      return this.NetworkListener.NetworkChangeDelegate.Remove(this.iyr), !1;
    t = new HotPatchLogReport_1.HotPatchLog();
    if (
      ((t.s_step_id = "hotpatch_mobile_procedure_evaluate_complete"),
      HotPatchLogReport_1.HotPatchLogReport.Report(t),
      w)
    )
      return (
        this.NetworkListener.NetworkChangeDelegate.Remove(this.iyr),
        HotPatchLogReport_1.HotPatchLogReport.Report(r),
        !0
      );
    var P,
      e = new HotPatchLogReport_1.HotPatchLog();
    (e.s_step_id = "hotpatch_mobile_procedure_bg_download"),
      HotPatchLogReport_1.HotPatchLogReport.Report(e);
    const H = UE.NewArray(UE.BuiltinString);
    for (const v of UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList(!0))
      H.Add(v);
    const f = UE.NewArray(UE.KuroRequestDownloadInfo);
    let R = 0;
    for (const x of i)
      ++R <= g
        ? (this.XSr += x.Size)
        : (((P = new UE.KuroRequestDownloadInfo()).FileName = x.FileName),
          (P.HashString = x.HashString),
          (P.SavePath = x.SavePath),
          (P.Size = x.Size),
          (P.Url = x.Url),
          f.Add(P));
    this.JSr = void 0;
    const D = (t, e) => {
      var o,
        r = i[t]?.FileName;
      r &&
        ((r = UE.KuroStaticLibrary.IsBuildShipping() ? i[t]?.HashString : r),
        (o = (t = new Date().getTime()) - s),
        (l -= o) < 0 && ((l = 500), (u = BigInt(this.JSr.GetBpsSpeed()))),
        (s = t),
        (t = (100n * (o = this.XSr + e)) / this.UpdateSize),
        (e = Number(t) / 100),
        this.ViewMgr.UpdatePatchDownProgress(
          !1,
          e,
          r,
          LauncherTextLib_1.LauncherTextLib.DownloadSpeedFormat(u),
          LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(o),
          LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(this.UpdateSize),
        ).catch((t) => {
          LauncherLog_1.LauncherLog.ErrorWithStack("ui显示下载进度出现异常", t);
        }));
    };
    return (
      (this.tyr = (t) => {
        LauncherLog_1.LauncherLog.Info("原始等待(promise3)被调用！");
      }),
      (o = await this.ryr(
        async (t) => {
          this.JSr = t ? this.JSr : new UE.KuroBgPrefixDownload();
          var [t, e] = await this.nyr(this.JSr, H, f, D, t);
          return (
            LauncherLog_1.LauncherLog.Info(
              "后台下载结束",
              ["state", DownloadDefine_1.EDownloadState[t]],
              ["httpCode", e],
            ),
            { Success: 7 === t, DownloadState: t, HttpCode: e }
          );
        },
        async (t = "") =>
          this.ViewMgr.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "DownloadResourcePatchFailed",
            "HotFixQuit",
            "HotFixRetry",
            void 0,
            t,
          ),
      )),
      this.NetworkListener.NetworkChangeDelegate.Remove(this.iyr),
      HotPatchLogReport_1.HotPatchLogReport.Report(r),
      o
    );
  }
  async ryr(o, c) {
    let n = !1,
      _ = !1;
    return (
      await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(
        async () => {
          var t = AppUtil_1.AppUtil.GetNetworkConnectionType();
          if (
            (t === NetworkDefine_1.ENetworkType.Cell &&
              this.zSr !== t &&
              this.iyr(t),
            (this.zSr = t),
            this.zSr === NetworkDefine_1.ENetworkType.Cell && !this.oyr)
          ) {
            t = new HotPatchLogReport_1.HotPatchLog();
            (t.s_step_id = "mobile_do_download"),
              (t.s_step_result =
                "network is cell, and user do not allow cell download."),
              HotPatchLogReport_1.HotPatchLogReport.Report(t);
            const e = this.eyr
              ? this.oyr
              : await new Promise((t) => {
                  LauncherLog_1.LauncherLog.Info(
                    "等待用户做出选择(doDownload promise)...",
                  ),
                    (this.tyr = t);
                });
            if (!e)
              return (
                LauncherLog_1.LauncherLog.Info("退出应用"),
                (n = !1),
                AppUtil_1.AppUtil.QuitGame(),
                await this.ViewMgr.WaitFrame(),
                { Success: !1 }
              );
          }
          this.ZSr = !1;
          const e = await o(_);
          return (n = e.Success), { Success: e.Success, Others: e };
        },
        async (t, e) => {
          if (
            (LauncherLog_1.LauncherLog.Info("下载失败，进入处理重试逻辑"),
            this.ZSr)
          ) {
            LauncherLog_1.LauncherLog.Info(
              "切换网络导致的下载中断",
              ["userAnsweredDialog", this.eyr],
              ["allowCellDownload", this.oyr],
            );
            var o = new HotPatchLogReport_1.HotPatchLog(),
              r =
                ((o.s_step_id = "mobile_failed_retry"),
                { userAnsweredDialog: this.eyr, allowCellDownload: this.oyr });
            (o.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r)),
              HotPatchLogReport_1.HotPatchLogReport.Report(o);
            const h = this.eyr
              ? this.oyr
              : await new Promise((t) => {
                  LauncherLog_1.LauncherLog.Info(
                    "等待用户做出选择(failedToRetry promise)...",
                  ),
                    (this.tyr = t);
                });
            return h
              ? ((_ = !0), LauncherLog_1.LauncherLog.Info("重试下载"), e())
              : (LauncherLog_1.LauncherLog.Info("退出应用"),
                (n = !1),
                AppUtil_1.AppUtil.QuitGame(),
                await this.ViewMgr.WaitFrame(),
                { Success: !0 });
          }
          LauncherLog_1.LauncherLog.Info("非网络切换导致的下载失败");
          let i = DownloadDefine_1.EDownloadState.None,
            a = 0;
          t && ((r = t), (i = r.DownloadState || i), (a = r.HttpCode || a));
          o =
            i === DownloadDefine_1.EDownloadState.HttpError
              ? LauncherTextLib_1.LauncherTextLib.DownloadStateFormat(i) +
                `(http code: ${a})`
              : LauncherTextLib_1.LauncherTextLib.DownloadStateFormat(i);
          const h = await c(o).catch((t) => {
            LauncherLog_1.LauncherLog.ErrorWithStack("弹窗提示失败异常", t);
          });
          return h
            ? ((_ = !0), e())
            : ((n = !1),
              AppUtil_1.AppUtil.QuitGame(),
              await this.ViewMgr.WaitFrame(),
              { Success: !0 });
        },
      ),
      n
    );
  }
  async nyr(t, e, r, i, a = !1) {
    return new Promise((o) => {
      t.ProgressDelegateNew.Clear(),
        t.AllCompleteDelegate.Clear(),
        t.ProgressDelegateNew.Add((t, e) => {
          i(t, e);
        }),
        t.AllCompleteDelegate.Add((t, e) => {
          o([t, e]);
        }),
        a
          ? (LauncherLog_1.LauncherLog.Info(
              "-----\x3e> ts continue bg download.",
            ),
            t.Continue())
          : (LauncherLog_1.LauncherLog.Info("-----\x3e> ts start bg download."),
            t.Start(".download", e, r, 3, 3));
    });
  }
}
exports.MobileHotPatchProcedure = MobileHotPatchProcedure;
//# sourceMappingURL=MobileHotPatchProcedure.js.map
