"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DiffUpdate = exports.EUpdateType = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  DownloadDefine_1 = require("../../Download/DownloadDefine"),
  UrlPrefixDownload_1 = require("../../Download/UrlPrefixDownload"),
  HotPatchLogReport_1 = require("../../HotPatchLogReport"),
  NetworkDefine_1 = require("../../NetworkDefine"),
  LauncherNoticeUtils_1 = require("../../Notice/LauncherNoticeUtils"),
  AppUtil_1 = require("../../Update/AppUtil"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherSerialize_1 = require("../../Util/LauncherSerialize"),
  LauncherTextLib_1 = require("../../Util/LauncherTextLib"),
  ProcedureUtil_1 = require("../../Util/ProcedureUtil"),
  RequireFileInfo_1 = require("../Data/RequireFileInfo"),
  ResPackageInfo_1 = require("../Data/ResPackageInfo"),
  TsPatchApi_1 = require("../Data/TsPatchApi");
var EUpdateType;
!(function (e) {
  (e[(e.NormalUpdate = 0)] = "NormalUpdate"),
    (e[(e.PreDownload = 1)] = "PreDownload"),
    (e[(e.IndependentLang = 2)] = "IndependentLang");
})((EUpdateType = exports.EUpdateType || (exports.EUpdateType = {})));
class DiffUpdate {
  constructor(e, t, i, a, o = !1, s = EUpdateType.NormalUpdate) {
    (this.LIc = e),
      (this.wIc = t),
      (this.RIc = i),
      (this.AIc = a),
      (this.T1a = o),
      (this.ckc = s),
      (this.ZSr = !1),
      (this.eyr = !1),
      (this.zSr = NetworkDefine_1.ENetworkType.None),
      (this.oyr = !1),
      (this.JSr = void 0),
      (this.kso = void 0),
      (this.tyr = void 0),
      (this.iyr = void 0),
      (this.PIc = !1);
  }
  get NetworkListener() {
    return this.kso || (this.kso = new UE.KuroNetworkChange()), this.kso;
  }
  xIc(e, t, i) {
    if (void 0 !== t && 0 !== t.length) {
      var a;
      if (!UE.KuroLauncherLibrary.CheckFileSha1(e, t))
        return (
          UE.BlueprintPathsLibrary.FileExists(e) &&
            UE.KuroLauncherLibrary.DeleteFile(e),
          ((a = new UrlPrefixDownload_1.RequestFileInfo()).HashString = t),
          (a.Size = 0n),
          (a.bUseDownloadCache = !1),
          (a.Url = "" + i),
          (a.SavePath = e),
          a
        );
      LauncherLog_1.LauncherLog.Info("已下载过清单文件", ["manifest", e]);
    }
  }
  async HasContentOnRemote() {
    LauncherLog_1.LauncherLog.Info(
      "check has content on remote",
      ["forceUpdate", this.T1a],
      ["updateType", EUpdateType[this.ckc]],
    );
    var e,
      t = "diffUpdate_checkContentOnRemote",
      i =
        (this.AIc &&
          (((e = new HotPatchLogReport_1.HotPatchLog()).s_step_id = t),
          this.AIc.Start(e)),
        await this.RIc?.ShowInfo(!1, "CheckResourceVersion", !0),
        await this.RIc?.WaitFrame(),
        new Array());
    for (const r of this.LIc) {
      var a = r.GetManifestHash(),
        o = r.GetManifestSavePath(),
        s = r.GetRemoteManifestRoute(),
        o = this.xIc(o, a, s);
      o && i.push(o),
        r.MustRevertVersion() &&
          ((a = r.GetRevertManifestHash()),
          (s = r.GetRevertManifestPath()),
          (o = r.GetRemoteRevertManifestRoute()),
          (s = this.xIc(s, a, o))) &&
          i.push(s);
    }
    return (
      this.AIc &&
        (((e = new HotPatchLogReport_1.HotPatchLog()).s_step_id = t),
        this.AIc.End(e)),
      i
    );
  }
  async DownloadManifests(t) {
    LauncherLog_1.LauncherLog.Info(
      "download remote manifests",
      ["forceUpdate", this.T1a],
      ["updateType", EUpdateType[this.ckc]],
    );
    var e = "diffUpdate_downloadManifests",
      i = new HotPatchLogReport_1.HotPatchLog(),
      a = ((i.s_step_id = e), new HotPatchLogReport_1.HotPatchLog());
    if (((a.s_step_id = e), this.AIc?.Start(i), t.length <= 0))
      return this.AIc?.End(a), !0;
    let o = !0;
    e = BigInt(10485760);
    return (
      !!(await this.DoesSavedDirHaveEnoughSpace(e)) &&
      (((i = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
        "diffUpdate_downloadManifests_spaceEnough"),
      this.AIc?.Event(i),
      await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(
        async () => {
          var e = await this.wIc.RequestFiles(t, !0, 3);
          return { Success: e.Success, Others: e };
        },
        async (e, t) => {
          let i = DownloadDefine_1.EDownloadState.None,
            a = 0;
          e && ((e = e), (i = e.DownloadState || i), (a = e.HttpCode || a));
          e =
            i === DownloadDefine_1.EDownloadState.HttpError
              ? LauncherTextLib_1.LauncherTextLib.DownloadStateFormat(i) +
                `(http code: ${a})`
              : LauncherTextLib_1.LauncherTextLib.DownloadStateFormat(i);
          return (await this.RIc?.ShowDialog(
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
            : ((o = !1),
              this.ckc === EUpdateType.NormalUpdate &&
                AppUtil_1.AppUtil.QuitGame("DownloadIndexFile failed"),
              await this.RIc?.WaitFrame(),
              { Success: !0 });
        },
        this.ckc !== EUpdateType.NormalUpdate,
      ),
      this.AIc?.End(a),
      o)
    );
  }
  UIc(e) {
    var t,
      i = (0, puerts_1.$ref)(void 0);
    return UE.KuroStaticLibrary.LoadFileToString(i, e)
      ? ((t = (0, puerts_1.$ref)(void 0)),
        UE.KuroLauncherLibrary.Decrypt((0, puerts_1.$unref)(i), t)
          ? [!0, (0, puerts_1.$unref)(t).trim()]
          : (LauncherLog_1.LauncherLog.Warn("index文件内容无法解析", [
              "file",
              e,
            ]),
            [!1, ""]))
      : (LauncherLog_1.LauncherLog.Warn("index文件不存在", ["file", e]),
        [!1, ""]);
  }
  async ResolveManifests() {
    LauncherLog_1.LauncherLog.Info(
      "get remote manifests content",
      ["forceUpdate", this.T1a],
      ["updateType", EUpdateType[this.ckc]],
    );
    var e = "diffUpdate_resolveManifests",
      t = new HotPatchLogReport_1.HotPatchLog();
    (t.s_step_id = e),
      this.AIc?.Start(t),
      await this.RIc?.ShowInfo(!1, "ResolveIndexFile"),
      await this.RIc?.WaitFrame();
    for (const s of this.LIc)
      if (s.NeedProcessUpdate(this.T1a)) {
        var i = !1;
        let e = "";
        if (s.GetManifestHash()) {
          var a = s.GetManifestSavePath();
          if ((([i, e] = this.UIc(a)), !i)) return !1;
        }
        let t = void 0;
        var o,
          a = !1;
        if (s.MustRevertVersion()) {
          if ((([a, t] = this.UIc(s.GetRevertManifestPath())), !a)) return !1;
          if (!t || t.length <= 0) continue;
        }
        !e ||
          e.length <= 0 ||
          ((i = LauncherSerialize_1.LauncherJson.Parse(e)),
          (o =
            t && 0 < t.length
              ? LauncherSerialize_1.LauncherJson.Parse(t)
              : void 0),
          s.SetManifest(i, o));
      }
    t = new HotPatchLogReport_1.HotPatchLog();
    return (t.s_step_id = e), this.AIc?.End(t), !0;
  }
  async AnalyzeRequireFiles(e, t) {
    LauncherLog_1.LauncherLog.Info(
      "analyze all resource files",
      ["forceUpdate", this.T1a],
      ["updateType", EUpdateType[this.ckc]],
    );
    var i,
      a,
      o = "diffUpdate_analyze_res_files",
      s = new HotPatchLogReport_1.HotPatchLog(),
      s =
        ((s.s_step_id = o),
        this.AIc?.Start(s),
        new HotPatchLogReport_1.HotPatchLog());
    (s.s_step_id = o),
      await this.RIc?.ShowInfo(!0, void 0),
      await this.RIc?.WaitFrame();
    let r = [],
      n = [];
    for (const w of this.LIc)
      w.NeedProcessUpdate(this.T1a) &&
        (([i, a] = w.AnalyzeRequireFiles()),
        (r = r.concat(i)),
        (n = n.concat(a)));
    (r = r.concat(e)), (n = n.concat(t));
    let h = 0n,
      c = 0n;
    for (const L of r) (h += L.Size), (c += L.SavedSize);
    var o = ResPackageInfo_1.ResPackageInfo.GetResSaveDir(),
      [p, u] = ResPackageInfo_1.ResPackageInfo.GetTotalAndFreeSpace(o),
      d = h - c + 10n * 1024n * 1024n;
    if (d < u) return this.AIc?.End(s), [!0, n, d];
    LauncherLog_1.LauncherLog.Info(
      "re analyze all resource files, because space not enough.",
      ["path", o],
      ["totalSpace", p],
      ["freeSpace", u],
      ["needSpace", d],
      ["forceUpdate", this.T1a],
      ["updateType", EUpdateType[this.ckc]],
    );
    var l,
      _,
      f = new HotPatchLogReport_1.HotPatchLog();
    (f.s_step_id = "diffUpdate_reanalyze_res_files"),
      (f.s_step_result = LauncherSerialize_1.LauncherJson.Stringify({
        Path: o,
        TotalSpace: p,
        FreeSpace: u,
        NeedSpace: d,
      })),
      this.AIc?.Event(f),
      (r.length = 0),
      (n.length = 0);
    for (const g of this.LIc)
      g.NeedProcessUpdate(this.T1a) &&
        (([l, _] = g.AnalyzeRequireFiles(!0)),
        (r = r.concat(l)),
        (n = n.concat(_)));
    return (
      (r = r.concat(e)),
      (n = n.concat(t)),
      ([p, u] = ResPackageInfo_1.ResPackageInfo.GetTotalAndFreeSpace(o)),
      (f = (d = h - c + 10n * 1024n * 1024n) < u),
      LauncherLog_1.LauncherLog.Info(
        "analyze space of all resource files is not enough.",
        ["path", o],
        ["totalSpace", p],
        ["freeSpace", u],
        ["needSpace", d],
        ["forceUpdate", this.T1a],
        ["updateType", EUpdateType[this.ckc]],
      ),
      this.AIc?.End(s),
      [f, n, d]
    );
  }
  async DownloadFiles(e, t, i = !1) {
    LauncherLog_1.LauncherLog.Info(
      "begin download files.",
      ["fileCount", e.length],
      ["bgDownload", i],
      ["forceUpdate", this.T1a],
      ["updateType", EUpdateType[this.ckc]],
    );
    var a = "diffUpdate_download_files",
      o = new HotPatchLogReport_1.HotPatchLog(),
      o =
        ((o.s_step_id = a),
        this.AIc?.Start(o),
        new HotPatchLogReport_1.HotPatchLog());
    return (
      (o.s_step_id = a),
      e.length <= 0
        ? (this.AIc?.End(o), !0)
        : !!(await this.DoesSavedDirHaveEnoughSpace(t)) &&
          (((a = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
            "diffUpdate_download_files_spaceEnough"),
          this.AIc?.Event(a),
          await this.RIc?.ShowInfo(!0, void 0),
          void 0 !== this.RIc?.ShouldShowNoticeWindow &&
            (this.RIc.ShouldShowNoticeWindow =
              t >=
              LauncherNoticeUtils_1.LauncherNoticeUtils
                .NoticeOpenDownloadSizeThreshold *
                LauncherTextLib_1.NUMBER_MB),
          i
            ? ((a = await this.DIc(e)),
              await this.RIc?.WaitFrame(),
              this.AIc?.End(o),
              a)
            : ((t = await this.BIc(e)),
              await this.RIc?.WaitFrame(),
              this.AIc?.End(o),
              t))
    );
  }
  async ExecutePatch() {
    LauncherLog_1.LauncherLog.Info(
      "begin to execute patch res.",
      ["forceUpdate", this.T1a],
      ["updateType", EUpdateType[this.ckc]],
    );
    var e = "diffUpdate_bin_patch",
      t = new HotPatchLogReport_1.HotPatchLog();
    (t.s_step_id = e), this.AIc?.Start(t);
    let i = !0,
      a = 0n,
      o = [],
      s = !1;
    for (const f of this.LIc)
      f.NeedProcessUpdate(this.T1a) &&
        f.NeedPatch() &&
        (s || (await this.RIc?.ShowInfo(!0, void 0), (s = !0)),
        (a += f.PatchTotalSize()));
    let r = !0,
      n = 0n,
      h = 0n;
    const c = (e) => {
      e < h && r && (n += h), (h = e);
      var e = +Number(n + h) / Number(a),
        t =
          (LauncherLog_1.LauncherLog.Debug("patch 进度", ["progress", e]),
          "" + (100 * e).toFixed(0));
      this.RIc?.UpdateProgress(!0, e, "BinPatchProgress", t),
        this.RIc?.IsCompatible() &&
          this.RIc?.UpdatePatchProgress(0n, n + h, a, 0n);
    };
    var p = async (e, t) => {
      return (await this.RIc?.ShowDialog(
        !0,
        "HotFixTipsTitle",
        "BinPatchFailed",
        "HotFixQuit",
        "HotFixRetry",
        void 0,
        "" + TsPatchApi_1.EKuroPatchResult[e],
      ).catch((e) => {
        LauncherLog_1.LauncherLog.ErrorWithStack(
          "弹窗异常（二进制Patch失败）",
          e,
        );
      }))
        ? ((r = !1), t())
        : ((i = !1),
          this.ckc === EUpdateType.NormalUpdate &&
            AppUtil_1.AppUtil.QuitGame("bin patch failed"),
          await this.RIc?.WaitFrame(),
          { Success: !0 });
    };
    for (const w of this.LIc)
      w.NeedProcessUpdate(this.T1a) &&
        w.NeedPatch() &&
        ((r = !0),
        await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(
          async () => {
            var [e, t, i] = await w.ExecutePatch(c);
            return e && (o = o.concat(i)), { Success: e, Others: t };
          },
          p,
          this.ckc !== EUpdateType.NormalUpdate,
        ));
    await this.RIc?.WaitFrame(),
      0 < o.length &&
        LauncherLog_1.LauncherLog.Info(
          "has miss files after patch.",
          ["forceUpdate", this.T1a],
          ["updateType", EUpdateType[this.ckc]],
        );
    let u = 0n,
      d = 0n;
    for (const L of o) {
      var l = new RequireFileInfo_1.FileSpace(L.LocalPath, L.Size, !0);
      (d += l.SavedSize), (u += l.Size);
    }
    var t = u - d + 10n * 1024n * 1024n,
      _ = new HotPatchLogReport_1.HotPatchLog();
    return (_.s_step_id = e), this.AIc?.End(_), [i, o, t];
  }
  async DownloadMissFiles(e, t, i, a = !1) {
    LauncherLog_1.LauncherLog.Info(
      "will download miss files.",
      ["fileCount", e],
      ["bgDownload", a],
      ["forceUpdate", this.T1a],
      ["updateType", EUpdateType[this.ckc]],
    );
    var o = "diffUpdate_download_missing_files",
      s = new HotPatchLogReport_1.HotPatchLog(),
      s =
        ((s.s_step_id = o),
        this.AIc?.Start(s),
        new HotPatchLogReport_1.HotPatchLog());
    if (((s.s_step_id = o), !i)) return this.AIc?.End(s), !0;
    if (e.length <= 0) return this.AIc?.End(s), !0;
    if (!(await this.DoesSavedDirHaveEnoughSpace(t))) return !1;
    o = new HotPatchLogReport_1.HotPatchLog();
    (o.s_step_id = "diffUpdate_download_missing_files_spaceEnough"),
      this.AIc?.Event(o),
      await this.RIc?.ShowInfo(!0, void 0),
      void 0 !== this.RIc?.ShouldShowNoticeWindow &&
        (this.RIc.ShouldShowNoticeWindow =
          t >=
          LauncherNoticeUtils_1.LauncherNoticeUtils
            .NoticeOpenDownloadSizeThreshold *
            LauncherTextLib_1.NUMBER_MB);
    let r = !0;
    return (
      a
        ? ((r = await this.DIc(e)),
          await this.RIc?.WaitFrame(),
          this.AIc?.End(s))
        : ((r = await this.BIc(e)),
          await this.RIc?.WaitFrame(),
          this.AIc?.End(s)),
      r
    );
  }
  async MoveSameFiles() {
    LauncherLog_1.LauncherLog.Info(
      "will move or copy files after patch.",
      ["forceUpdate", this.T1a],
      ["updateType", EUpdateType[this.ckc]],
    );
    var e = "diffUpdate_move_files",
      t = new HotPatchLogReport_1.HotPatchLog(),
      i =
        ((t.s_step_id = e),
        this.AIc?.Start(t),
        new HotPatchLogReport_1.HotPatchLog());
    i.s_step_id = e;
    let a = !0;
    var o = async (e, t) => {
      return (await this.RIc?.ShowDialog(
        !0,
        "HotFixTipsTitle",
        "MoveFilesFailed",
        "HotFixQuit",
        "HotFixRetry",
        void 0,
      ).catch((e) => {
        LauncherLog_1.LauncherLog.ErrorWithStack("弹窗异常（移动文件失败）", e);
      }))
        ? t()
        : ((a = !1),
          this.ckc === EUpdateType.NormalUpdate &&
            AppUtil_1.AppUtil.QuitGame("move file failed"),
          await this.RIc?.WaitFrame(),
          { Success: !0 });
    };
    for (const s of this.LIc)
      if (
        s.NeedProcessUpdate(this.T1a) &&
        (await (0, ProcedureUtil_1.whetherRepeatDoOnFailed)(
          () => ({ Success: (a = s.MoveFiles()) }),
          o,
          this.ckc !== EUpdateType.NormalUpdate,
        ),
        !a)
      )
        return this.AIc?.End(i), !1;
    return this.AIc?.End(i), a;
  }
  ProcessRecord() {
    LauncherLog_1.LauncherLog.Info(
      "res updated and update record.",
      ["forceUpdate", this.T1a],
      ["updateType", EUpdateType[this.ckc]],
    );
    var e = "diffUpdate_update_record",
      t = new HotPatchLogReport_1.HotPatchLog();
    (t.s_step_id = e), this.AIc?.Start(t);
    for (const i of this.LIc) i.NeedProcessUpdate(this.T1a) && i.UpdateRecord();
    t = new HotPatchLogReport_1.HotPatchLog();
    return (t.s_step_id = e), this.AIc?.End(t), !0;
  }
  NeedReboot() {
    for (const e of this.LIc)
      if (e.NeedProcessUpdate(this.T1a) && e.NeedRebootModuleOrApp()) return !0;
    return !1;
  }
  IsHotFixOrNot() {
    for (const e of this.LIc)
      if (e.NeedProcessUpdate(this.T1a) && e.IsHotFixOrNot()) return !0;
    return !1;
  }
  MountFiles() {
    LauncherLog_1.LauncherLog.Info(
      "will mount the res files.",
      ["forceUpdate", this.T1a],
      ["updateType", EUpdateType[this.ckc]],
    ),
      this.RIc?.ShowInfo(!1, "MountPak");
    for (const a of this.LIc)
      if (a.NeedProcessUpdate(this.T1a)) {
        var [e, t, i] = a.GetMountInfos();
        for (const o of e) UE.KuroPakMountStatic.UnmountPak(o);
        for (const s of t) UE.KuroPakMountStatic.MountPak(s, i);
      }
  }
  CalcNeedSizeInfo() {
    let e = [],
      t = [];
    for (const n of this.LIc) {
      var i, a;
      n.NeedProcessUpdate(this.T1a) &&
        (([i, a] = n.AnalyzeRequireFiles()),
        (e = e.concat(i)),
        (t = t.concat(a)));
    }
    let o = 0n,
      s = 0n;
    for (const h of e) (o += h.Size), (s += h.SavedSize);
    var r = ResPackageInfo_1.ResPackageInfo.GetResSaveDir(),
      [, r] = ResPackageInfo_1.ResPackageInfo.GetTotalAndFreeSpace(r);
    return [o - s + 10n * 1024n * 1024n, r];
  }
  Stop() {
    (this.PIc = !0), this.wIc?.CancelDownload(), this.JSr?.Cancel();
  }
  Resume() {
    this.PIc = !1;
  }
  async PromptNetwork(e) {
    if (
      UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
        NetworkDefine_1.ENetworkType.Cell &&
      e > 10n * LauncherTextLib_1.bigIntMb
    ) {
      if (
        !(await this.RIc?.ShowDialog(
          !0,
          "HotFixTipsTitle",
          "HotFixNewPatch",
          "HotFixCancel",
          "HotFixUseNetworkDownload",
          void 0,
          LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(e),
        ))
      )
        return (
          this.ckc === EUpdateType.NormalUpdate &&
            AppUtil_1.AppUtil.QuitGame("用户取消下载"),
          await this.RIc?.WaitFrame(),
          !1
        );
      this.oyr = !0;
    }
    return !0;
  }
  async BIc(e) {
    let h = 0n;
    const i = [];
    for (const r of e) {
      var t = new UrlPrefixDownload_1.RequestFileInfo(),
        t =
          ((t.FileName = r.LocalPath),
          (t.SavePath = r.LocalPath),
          (t.HashString = r.Hash),
          (t.Size = r.Size),
          (t.Url = r.RemoteRoute),
          (t.bUseDownloadCache = !0),
          i.push(t),
          t.SavePath.substring(0, t.SavePath.lastIndexOf("/")));
      UE.BlueprintPathsLibrary.DirectoryExists(t) ||
        UE.KuroLauncherLibrary.MakeDirectory(t),
        (h += r.Size);
    }
    const c = 0n;
    let p = 0,
      u = 0,
      d = 0n,
      l = -1,
      _ = 0n;
    const f = new Map(),
      a = (e, t, i, a, o) => {
        f.set(e, o);
        let s = 0n;
        for (var [r, n] of f) s += n;
        _ += i;
        var e = new Date().getTime(),
          o = e - u;
        (l -= o) < 0 &&
          e !== p &&
          ((l = 500),
          (d = (1000n * _) / (BigInt(e) - BigInt(p))),
          (_ = 0n),
          (p = e)),
          (u = e),
          this.RIc &&
            ((e = (100n * (o = c + s)) / h),
            (e = Number(e) / 100),
            this.RIc.UpdatePatchDownProgress(
              !1,
              e,
              t,
              LauncherTextLib_1.LauncherTextLib.DownloadSpeedFormat(d),
              LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(o),
              LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(h),
            ),
            this.RIc.IsCompatible() && this.RIc.UpdatePatchProgress(i, s, h, d),
            this.RIc?.TryShowNoticeWindowOnce) &&
            this.RIc.TryShowNoticeWindowOnce();
      };
    e = new Date();
    (p = e.getTime()), (u = p);
    let o = !0;
    const s = new HotPatchLogReport_1.HotPatchLog();
    return (
      (s.s_step_id = "download_files_failed"),
      await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(
        async () => {
          var e,
            t = await this.wIc.RequestFiles(i, !1, 3, a, !0);
          return (
            (o = t.Success),
            t.Success ||
              ((e = LauncherSerialize_1.LauncherJson.Stringify(t)),
              LauncherLog_1.LauncherLog.Error("下载补丁文件失败!", ["err", e]),
              (s.s_step_result = e),
              this.AIc?.Event(s)),
            { Success: t.Success, Others: t }
          );
        },
        async (e, t) => {
          if (this.ckc !== EUpdateType.NormalUpdate && this.PIc)
            return { Success: !(o = !1) };
          let i = DownloadDefine_1.EDownloadState.None,
            a = 0;
          e && ((e = e), (i = e.DownloadState || i), (a = e.HttpCode || a));
          e =
            i === DownloadDefine_1.EDownloadState.HttpError
              ? LauncherTextLib_1.LauncherTextLib.DownloadStateFormat(i) +
                `(http code: ${a})`
              : LauncherTextLib_1.LauncherTextLib.DownloadStateFormat(i);
          return (await this.RIc?.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "DownloadResourcePatchFailed",
            "HotFixQuit",
            "HotFixRetry",
            void 0,
            e,
          ).catch((e) => {
            LauncherLog_1.LauncherLog.ErrorWithStack(
              "弹窗异常（下载资源文件失败）",
              e,
            );
          }))
            ? t()
            : ((o = !1),
              this.ckc === EUpdateType.NormalUpdate &&
                AppUtil_1.AppUtil.QuitGame("DownloadResFiles failed"),
              await this.RIc?.WaitFrame(),
              { Success: !0 });
        },
        this.ckc !== EUpdateType.NormalUpdate,
      ),
      o
    );
  }
  async DIc(e) {
    (this.wIc = void 0),
      (this.ZSr = !1),
      (this.eyr = !1),
      (this.zSr = NetworkDefine_1.ENetworkType.None),
      (this.tyr = (e) => {
        LauncherLog_1.LauncherLog.Info("原始等待(promise1)被调用！");
      }),
      (this.iyr = (e) => {
        LauncherLog_1.LauncherLog.Info("监听到切换网络", [
          "state",
          NetworkDefine_1.ENetworkType[e],
        ]),
          this.oyr ||
            this.zSr === NetworkDefine_1.ENetworkType.Cell ||
            e !== NetworkDefine_1.ENetworkType.Cell ||
            this.ZSr ||
            (LauncherLog_1.LauncherLog.Info(
              "因网络切换为蜂窝数据，自动取消了下载，并弹窗提示玩家！",
            ),
            (this.ZSr = !0),
            (this.eyr = !1),
            this.JSr?.Cancel(),
            this.wIc?.CancelDownload(),
            this.RIc?.ShowDialog(
              !0,
              "HotFixTipsTitle",
              "HotFixNetworkChange",
              "HotFixQuit",
              "HotFixUseNetworkDownload",
              void 0,
            )
              .then((e) => {
                LauncherLog_1.LauncherLog.Info(
                  "用户确认了网络切为蜂窝数据确认框",
                  ["result", e],
                ),
                  (this.eyr = !0),
                  (this.oyr = this.oyr || e),
                  this.tyr(e);
              })
              .catch((e) => {
                LauncherLog_1.LauncherLog.ErrorWithStack(
                  "ui弹窗提示网络切换出现异常",
                  e,
                );
              }));
      }),
      this.NetworkListener.NetworkChangeDelegate.Add(this.iyr);
    var t = "hotpatch_mobile_procedure_evaluate",
      i = new HotPatchLogReport_1.HotPatchLog();
    (i.s_step_id = t), this.AIc?.Start(i);
    const o = new Array();
    let n = 0n;
    for (const D of e) {
      var a = new UrlPrefixDownload_1.RequestFileInfo(),
        a =
          ((a.FileName = D.LocalPath),
          (a.SavePath = D.LocalPath),
          (a.Url = D.RemoteRoute),
          (a.Size = D.Size),
          (a.HashString = D.Hash),
          (a.bUseDownloadCache = !0),
          (n += D.Size),
          o.push(a),
          a.SavePath.substring(0, a.SavePath.lastIndexOf("/")));
      UE.BlueprintPathsLibrary.DirectoryExists(a) ||
        UE.KuroLauncherLibrary.MakeDirectory(a);
    }
    let h = 0n,
      c = 0n;
    const p = new Map();
    let u = new Date().getTime(),
      d = 0,
      l = 0n,
      _ = -1,
      f = 0n;
    const s = (e, t, i, a, o) => {
      p.set(e, o), (c = 0n);
      for (var [s, r] of p) c += r;
      (h = c), (f += i);
      (e = new Date().getTime()),
        (o = e - d),
        (_ -= o) < 0 &&
          e !== u &&
          ((_ = 500),
          (l = (1000n * f) / (BigInt(e) - BigInt(u))),
          (f = 0n),
          (u = e)),
        (d = e),
        (i = (100n * c) / n),
        (o = Number(i) / 100);
      this.RIc?.UpdatePatchDownProgress(
        !1,
        o,
        t,
        LauncherTextLib_1.LauncherTextLib.DownloadSpeedFormat(l),
        LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(c),
        LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(n),
      ).catch((e) => {
        LauncherLog_1.LauncherLog.ErrorWithStack("ui显示评估进度出现异常", e);
      });
    };
    let r = !1,
      w = !1,
      L = 0;
    if (
      ((this.tyr = (e) => {
        LauncherLog_1.LauncherLog.Info("原始等待(promise2)被调用！");
      }),
      (i = await this.ryr(
        async () => {
          this.wIc = new UrlPrefixDownload_1.UrlPrefixDownload();
          var e = await this.wIc.StartEvaluatePrefix(o, !0, s);
          return (
            (r = e.Complete),
            (L = e.FileIndex),
            LauncherLog_1.LauncherLog.Info(
              "评估结束",
              ["completeEvaluate", r],
              ["startIndex", L],
              ["fileCount", o.length],
            ),
            L >= o.length
              ? {
                  Success: (w = !0),
                  DownloadState: DownloadDefine_1.EDownloadState.Success,
                  HttpCode: 0,
                }
              : {
                  Success: e.Complete,
                  DownloadState: e.DownloadState,
                  HttpCode: e.HttpCode,
                }
          );
        },
        async (e = "") =>
          (this.wIc = void 0) !== this.RIc &&
          this.RIc.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "EvaluateDownloadResourcePatchFailed",
            "HotFixQuit",
            "HotFixRetry",
            void 0,
            e,
          ),
      )),
      (this.wIc = void 0),
      !i)
    )
      return this.NetworkListener.NetworkChangeDelegate.Remove(this.iyr), !1;
    e = new HotPatchLogReport_1.HotPatchLog();
    if (((e.s_step_id = t), this.AIc?.End(e), w))
      return this.NetworkListener.NetworkChangeDelegate.Remove(this.iyr), !0;
    var g,
      t = "hotpatch_mobile_procedure_bg_download",
      e = new HotPatchLogReport_1.HotPatchLog();
    (e.s_step_id = t), this.AIc?.Start(e);
    const U = UE.NewArray(UE.BuiltinString);
    for (const x of UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList(!0))
      U.Add(x);
    const v = UE.NewArray(UE.KuroRequestDownloadInfo);
    let T = 0;
    h = 0n;
    for (const P of o)
      ++T < L
        ? (h += P.Size)
        : T === L && c - h === P.Size
          ? (h += P.Size)
          : (((g = new UE.KuroRequestDownloadInfo()).FileName = P.FileName),
            (g.HashString = P.HashString),
            (g.SavePath = P.SavePath),
            (g.Size = P.Size),
            (g.Url = P.Url),
            v.Add(g));
    this.JSr = void 0;
    const y = (e, t) => {
      var i,
        a = o[e]?.FileName;
      a &&
        ((a = cpp_1.KuroApplication.IsBuildShipping() ? o[e]?.HashString : a),
        (i = (e = new Date().getTime()) - d),
        (_ -= i) < 0 && ((_ = 500), (l = BigInt(this.JSr.GetBpsSpeed()))),
        (d = e),
        (i = (100n * (c = h + t)) / n),
        (e = Number(i) / 100),
        this.RIc?.UpdatePatchDownProgress(
          !1,
          e,
          a,
          LauncherTextLib_1.LauncherTextLib.DownloadSpeedFormat(l),
          LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(c),
          LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(n),
        ).catch((e) => {
          LauncherLog_1.LauncherLog.ErrorWithStack("ui显示下载进度出现异常", e);
        }),
        this.RIc?.TryShowNoticeWindowOnce) &&
        this.RIc.TryShowNoticeWindowOnce();
    };
    (this.tyr = (e) => {
      LauncherLog_1.LauncherLog.Info("原始等待(promise3)被调用！");
    }),
      (i = await this.ryr(
        async (e) => {
          this.JSr = e ? this.JSr : new UE.KuroBgPrefixDownload();
          var [e, t] = await this.nyr(this.JSr, U, v, y, e);
          return (
            LauncherLog_1.LauncherLog.Info(
              "后台下载结束",
              ["state", DownloadDefine_1.EDownloadState[e]],
              ["httpCode", t],
            ),
            { Success: 7 === e, DownloadState: e, HttpCode: t }
          );
        },
        async (e = "") =>
          void 0 !== this.RIc &&
          this.RIc.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "DownloadResourcePatchFailed",
            "HotFixQuit",
            "HotFixRetry",
            void 0,
            e,
          ),
      )),
      this.NetworkListener.NetworkChangeDelegate.Remove(this.iyr);
    e = new HotPatchLogReport_1.HotPatchLog();
    return (e.s_step_id = t), this.AIc?.End(e), i;
  }
  async ryr(i, s) {
    let r = !1,
      n = !1;
    return (
      await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(
        async () => {
          var e = AppUtil_1.AppUtil.GetNetworkConnectionType();
          if (
            (e === NetworkDefine_1.ENetworkType.Cell &&
              this.zSr !== e &&
              this.iyr(e),
            (this.zSr = e),
            this.zSr === NetworkDefine_1.ENetworkType.Cell && !this.oyr)
          ) {
            const t = this.eyr
              ? this.oyr
              : await new Promise((e) => {
                  LauncherLog_1.LauncherLog.Info(
                    "等待用户做出选择(doDownload promise)...",
                  ),
                    (this.tyr = e);
                });
            if (!t)
              return (
                (r = !1),
                this.ckc === EUpdateType.NormalUpdate &&
                  (LauncherLog_1.LauncherLog.Info("退出应用"),
                  AppUtil_1.AppUtil.QuitGame("Download failed")),
                await this.RIc?.WaitFrame(),
                { Success: !1 }
              );
          }
          this.ZSr = !1;
          const t = await i(n);
          return (r = t.Success), { Success: t.Success, Others: t };
        },
        async (e, t) => {
          if (this.ckc !== EUpdateType.NormalUpdate && this.PIc)
            return { Success: !(r = !1) };
          if (
            (LauncherLog_1.LauncherLog.Info("下载失败，进入处理重试逻辑"),
            this.ZSr)
          ) {
            LauncherLog_1.LauncherLog.Info(
              "切换网络导致的下载中断",
              ["userAnsweredDialog", this.eyr],
              ["allowCellDownload", this.oyr],
            );
            const o = this.eyr
              ? this.oyr
              : await new Promise((e) => {
                  LauncherLog_1.LauncherLog.Info(
                    "等待用户做出选择(failedToRetry promise)...",
                  ),
                    (this.tyr = e);
                });
            return o
              ? ((n = !0), LauncherLog_1.LauncherLog.Info("重试下载"), t())
              : ((r = !1),
                this.ckc === EUpdateType.NormalUpdate &&
                  (LauncherLog_1.LauncherLog.Info("退出应用"),
                  AppUtil_1.AppUtil.QuitGame("Download failed")),
                await this.RIc?.WaitFrame(),
                { Success: !0 });
          }
          LauncherLog_1.LauncherLog.Info("非网络切换导致的下载失败");
          let i = DownloadDefine_1.EDownloadState.None,
            a = 0;
          e && ((e = e), (i = e.DownloadState || i), (a = e.HttpCode || a));
          e =
            i === DownloadDefine_1.EDownloadState.HttpError
              ? LauncherTextLib_1.LauncherTextLib.DownloadStateFormat(i) +
                `(http code: ${a})`
              : LauncherTextLib_1.LauncherTextLib.DownloadStateFormat(i);
          const o = await s(e).catch((e) => {
            LauncherLog_1.LauncherLog.ErrorWithStack("弹窗提示失败异常", e);
          });
          return o
            ? ((n = !0), t())
            : ((r = !1),
              this.ckc === EUpdateType.NormalUpdate &&
                AppUtil_1.AppUtil.QuitGame("Download failed"),
              await this.RIc?.WaitFrame(),
              { Success: !0 });
        },
        this.ckc !== EUpdateType.NormalUpdate,
      ),
      r
    );
  }
  async nyr(e, t, a, o, s = !1) {
    return new Promise((i) => {
      e.ProgressDelegateNew.Clear(),
        e.AllCompleteDelegate.Clear(),
        e.ProgressDelegateNew.Add((e, t) => {
          o(e, t);
        }),
        e.AllCompleteDelegate.Add((e, t) => {
          i([e, t]);
        }),
        s
          ? (LauncherLog_1.LauncherLog.Info(
              "-----\x3e> ts continue bg download.",
            ),
            e.Continue())
          : (LauncherLog_1.LauncherLog.Info("-----\x3e> ts start bg download."),
            e.Start(
              ".download",
              t,
              a,
              3,
              3,
              BaseConfigController_1.BaseConfigController.IsUseNewHttpApi(),
            ));
    });
  }
  async DoesSavedDirHaveEnoughSpace(t) {
    do {
      var i = UE.KuroLauncherLibrary.GameSavedDir(),
        a = (0, puerts_1.$ref)(0n),
        o = UE.KuroLauncherLibrary.GetTotalAndFreeSpace(i, a),
        a = (0, puerts_1.$unref)(a),
        e = t <= a,
        s = new HotPatchLogReport_1.HotPatchLog(),
        r =
          ((s.s_step_id = "check_have_enough_space"),
          {
            IsEnough: e,
            Path: i,
            NeedSize: t.toString(),
            TotalSize: o.toString(),
            FreeSize: a.toString(),
          });
      if (
        ((s.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r)),
        this.AIc?.Event(s),
        !e)
      ) {
        if (!this.RIc)
          throw new Error(
            `磁盘空间不足！path:${i}, total:${o}, free:${a}, need:` + t,
          );
        let e = !1;
        if (
          !(e = this.RIc.IsCompatible()
            ? await this.RIc.ShowNotEnoughSpaceConfirmation(t)
            : await this.RIc.ShowDialog(
                !0,
                "HotFixTipsTitle",
                "HotFixNotEnoughSpace",
                "HotFixCancel",
                "HotFixContinue",
                void 0,
                LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(t),
              ))
        )
          return (
            this.ckc === EUpdateType.NormalUpdate &&
              AppUtil_1.AppUtil.QuitGame("DoesSavedDirHaveEnoughSpace failed"),
            await this.RIc.WaitFrame(),
            !1
          );
      }
    } while (!e);
    return !0;
  }
}
exports.DiffUpdate = DiffUpdate;
//# sourceMappingURL=DiffUpdate.js.map
