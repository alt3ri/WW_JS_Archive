"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResourceUpdate =
    exports.PatchFileInfo =
    exports.DownloadViewInfo =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  DownloadDefine_1 = require("../Download/DownloadDefine"),
  UrlPrefixDownload_1 = require("../Download/UrlPrefixDownload"),
  HotPatchLogReport_1 = require("../HotPatchLogReport"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherSerialize_1 = require("../Util/LauncherSerialize"),
  HUNDRED_PERCENT = 1;
class DownloadViewInfo {
  constructor() {
    (this.Name = ""), (this.Size = void 0), (this.SavedSize = void 0);
  }
}
var EKuroCheckResult;
(exports.DownloadViewInfo = DownloadViewInfo),
  (function (e) {
    (e[(e.None = -1)] = "None"),
      (e[(e.Success = 0)] = "Success"),
      (e[(e.Continue = 1)] = "Continue"),
      (e[(e.Rename = 2)] = "Rename"),
      (e[(e.DeleteTemp = 3)] = "DeleteTemp"),
      (e[(e.Fail = 4)] = "Fail");
  })((EKuroCheckResult = EKuroCheckResult || {}));
class PatchFileInfo {
  constructor() {
    (this.Name = ""),
      (this.FileUrl = ""),
      (this.SavePath = ""),
      (this.NeedRestart = !1),
      (this.MountType = 0),
      (this.PakSize = void 0),
      (this.PakSha1 = ""),
      (this.MountOrder = 0),
      (this.UtocSize = void 0),
      (this.UtocSha1 = ""),
      (this.UcasSize = void 0),
      (this.UcasSha1 = ""),
      (this.SigSize = void 0),
      (this.SigSha1 = "");
  }
}
exports.PatchFileInfo = PatchFileInfo;
class ResourceUpdate {
  constructor(e = void 0, t = void 0, i = void 0, s = void 0, r = !1) {
    (this.SIr = ""),
      (this.yIr = !1),
      (this.IIr = void 0),
      (this.TIr = !1),
      (this.LIr = void 0),
      (this.DIr = void 0),
      (this.RIr = void 0),
      (this.UIr = 0n),
      (this.$Sr = 0n),
      (this.RSr = e),
      (this.AIr = t),
      (this.PIr = i),
      (this.KSr = s),
      (this.xIr = r),
      (this.SIr = i.GetResType());
  }
  ResetWorldContext(e) {
    this.RSr = e;
  }
  static ReadPatchInfoList(t, i, s, r) {
    var o = [];
    if (!t || !i || t.length !== i.length)
      return (
        LauncherLog_1.LauncherLog.Warn(
          "index列表参数，或versions列表参数不匹配",
          ["indexPathsLength", t?.length],
          ["versionsLength", i?.length],
        ),
        [!1, o]
      );
    for (let e = 0; e < t.length; e++) {
      var n = t[e],
        a = i[e],
        h = (0, puerts_1.$ref)(void 0);
      if (!UE.KuroStaticLibrary.LoadFileToString(h, n))
        return (
          LauncherLog_1.LauncherLog.Warn("index文件不存在", ["file", n]),
          [!1, o]
        );
      var c = (0, puerts_1.$ref)(void 0);
      if (!UE.KuroLauncherLibrary.Decrypt((0, puerts_1.$unref)(h), c))
        return (
          LauncherLog_1.LauncherLog.Warn("index文件内容无法解析", ["file", n]),
          [!1, o]
        );
      h = (0, puerts_1.$unref)(c).trim();
      if (h && !(h.length <= 0)) {
        c = JSON.parse(h);
        if (!(Object.keys(c).length <= 0)) {
          var u,
            l,
            d,
            _,
            h = c[a];
          if (!h)
            return (
              LauncherLog_1.LauncherLog.Warn(
                "index文件内容取不到版本信息",
                ["file", n],
                ["version", a],
              ),
              [!1, o]
            );
          for (const L of h)
            L &&
              0 !== L.length &&
              ((u = L.split(",")).length < 12 ||
                (((l = new PatchFileInfo()).Name = u[0].substring(
                  0,
                  u[0].length - 4,
                )),
                (l.NeedRestart = "1" === u[1]),
                (l.MountType = Number(u[2])),
                (d = s.GetPackageVersion()),
                (_ = BaseConfigController_1.BaseConfigController.GetResUri()),
                (l.FileUrl = `${_}/${r.GetPlatform()}/` + l.Name),
                (l.SavePath =
                  "" +
                  r.GetPatchSaveDir() +
                  d +
                  `/${s.GetResType()}/` +
                  l.Name),
                (l.PakSize = BigInt(u[4])),
                (l.PakSha1 = u[5]),
                (l.MountOrder = Number(u[3])),
                (l.UtocSize = BigInt(u[6])),
                (l.UtocSha1 = u[7]),
                (l.UcasSize = BigInt(u[8])),
                (l.UcasSha1 = u[9]),
                (l.SigSize = BigInt(u[10])),
                (l.SigSha1 = u[11]),
                o.push(l)));
        }
      }
    }
    return [!0, o];
  }
  wIr() {
    var t = new Map(),
      e = this.PIr.GetMountFilePath();
    if (UE.BlueprintPathsLibrary.FileExists(e)) {
      var i = UE.KuroStaticLibrary.LoadFileToStringArray(e),
        s = i.Num();
      for (let e = 0; e < s; e++) {
        var r,
          o = i.Get(e).split(",");
        o.length < 9 ||
          (((r = new PatchFileInfo()).Name =
            o[1] === this.PIr.GetResType() ? o[0] : o[0] + "_" + o[1]),
          (r.PakSha1 = o[4]),
          (r.SigSha1 = o[5]),
          (r.UtocSha1 = o[6]),
          (r.UcasSha1 = o[7]),
          (r.MountOrder = Number(o[8])),
          t.set(r.Name, r));
      }
    }
    return t;
  }
  BIr() {
    let e = "";
    for (const t of this.IIr)
      e += `${t.Name},${this.PIr.GetResType()},${t.NeedRestart ? "1" : "0"},${t.MountType},${t.PakSha1},${t.SigSha1},${t.UtocSha1},${t.UcasSha1},${t.MountOrder}\n`;
    UE.KuroStaticLibrary.SaveStringToFile(e, this.PIr.GetMountFilePath());
  }
  bIr(e, t) {
    switch (t) {
      case ".pak":
        return [e.PakSize, e.PakSha1];
      case ".utoc":
        return [e.UtocSize, e.UtocSha1];
      case ".ucas":
        return [e.UcasSize, e.UcasSha1];
      case ".sig":
        return [e.SigSize, e.SigSha1];
    }
    return [0n, ""];
  }
  qIr(e, t, i, s) {
    var [r, o] = this.bIr(e, s);
    if (r <= 0n) return 0n;
    let n = 0n;
    var a = "" + e.SavePath + s,
      h = "" + e.SavePath + s + UrlPrefixDownload_1.DOWNLOAD_SUFFIX,
      c = new HotPatchLogReport_1.HotPatchLog(),
      u =
        ((c.s_step_id = "HotPatchCheckResHash"),
        { FileName: a, Infos: new Array() }),
      l = { success: !1, info: u };
    let d = !0,
      _ = !1,
      L =
        (UE.KuroLauncherLibrary.GetFileSize(a) === r &&
          ((_ = !0)
            ? (d = !1)
            : u.Infos.push("file size equal and sha1 different.")),
        UE.KuroLauncherLibrary.GetFileSize(h));
    return (
      d &&
        (UE.BlueprintPathsLibrary.FileExists(a) &&
          UE.KuroLauncherLibrary.DeleteFile(a),
        L > r
          ? (UE.KuroLauncherLibrary.DeleteFile(h), (L = 0n))
          : L === r &&
            ((_ = UE.KuroLauncherLibrary.CheckFileSha1(h, o))
              ? UE.KuroLauncherLibrary.MoveFile(a, h) && (d = !1)
              : (UE.KuroLauncherLibrary.DeleteFile(h), (L = 0n)))),
      d &&
        ((L = 0n <= L ? L : 0n),
        (this.$Sr += r - L),
        ((h = new UrlPrefixDownload_1.RequestFileInfo()).FileName =
          "" + e.Name + s),
        (h.Url = "" + e.FileUrl + s),
        (h.SavePath = a),
        (h.HashString = o),
        (h.Size = r),
        (h.bUseDownloadCache = !0),
        (n += r),
        t.push(h),
        ((e = new DownloadViewInfo()).Name = h.FileName),
        (e.Size = h.Size),
        (e.SavedSize = 0n),
        i.set(e.Name, e)),
      0 < u.Infos.length &&
        ((c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(l)),
        HotPatchLogReport_1.HotPatchLogReport.Report(c)),
      n
    );
  }
  GIr(e, t, i) {
    var s = 0n,
      s =
        (s =
          (s = (s += this.qIr(e, t, i, ".pak")) + this.qIr(e, t, i, ".utoc")) +
          this.qIr(e, t, i, ".ucas")) + this.qIr(e, t, i, ".sig");
    return !this.yIr && 0n < s && (this.yIr = e.NeedRestart), s;
  }
  CheckResourceVersion() {
    var e = this.PIr.HasNewResourceVersionBaseOnPackage(),
      t = this.PIr.IsBasePackageSplited(),
      i = new HotPatchLogReport_1.HotPatchLog();
    if (
      ((i.s_step_id = "check_resource_version"),
      (i.s_update_type = this.SIr),
      !e && !t)
    ) {
      this.PIr.HasUpdated() || this.PIr.UpdateVersion(this.RSr),
        this.PIr.IsFirstUpdateResources() &&
          this.PIr.UpdateSavedVersion(this.RSr),
        LauncherLog_1.LauncherLog.Info(
          "原始包版本，直接可进入游戏",
          ["Type", this.SIr],
          ["PackageVersion", this.PIr.GetPackageVersion()],
          ["LatestVersion", this.PIr.GetLatestVersion()],
        );
      const s = {
        PackageVersion: this.PIr.GetPackageVersion(),
        LatestVersion: this.PIr.GetLatestVersion(),
        NeedUpdate: !1,
        BasePackageSplited: t,
      };
      (i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(s)),
        HotPatchLogReport_1.HotPatchLogReport.Report(i);
    }
    const s = {
      PackageVersion: this.PIr.GetPackageVersion(),
      LatestVersion: this.PIr.GetLatestVersion(),
      NeedUpdate: !0,
      BasePackageSplited: t,
    };
    return (
      (i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(s)),
      HotPatchLogReport_1.HotPatchLogReport.Report(i),
      e || t
    );
  }
  async DownloadIndexFile() {
    var t = this.PIr.GetIndexSha1s(),
      i = this.PIr.GetIndexSavePaths(this.KSr),
      s = this.PIr.GetIndexFileNames();
    let r = !1;
    var e,
      o,
      n,
      a = new Array(),
      h = new Array();
    for (let e = 0; e < i.length; e++) {
      var c,
        u,
        l = i[e],
        d = t[e],
        _ = s[e];
      UE.KuroLauncherLibrary.CheckFileSha1(l, d)
        ? LauncherLog_1.LauncherLog.Info("已下载过index文件", ["file", l])
        : ((r = !0),
          UE.BlueprintPathsLibrary.FileExists(l) &&
            UE.KuroLauncherLibrary.DeleteFile(l),
          LauncherLog_1.LauncherLog.Info("开始下载index文件", ["file", l]),
          (c =
            `${BaseConfigController_1.BaseConfigController.GetResUri()}/${this.KSr.GetPlatform()}/` +
            _),
          ((u = new UrlPrefixDownload_1.RequestFileInfo()).HashString = d),
          (u.Size = 0n),
          (u.bUseDownloadCache = !1),
          (u.Url = c),
          (u.SavePath = l),
          h.push(u),
          a.push(_));
    }
    return r
      ? (((e = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
          "start_download_index"),
        (e.s_update_type = this.SIr),
        (e.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(a)),
        HotPatchLogReport_1.HotPatchLogReport.Report(e),
        (e = await this.AIr.RequestFiles(h, !0, 3)),
        ((o = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
          "end_download_index"),
        (o.s_update_type = this.SIr),
        e.Success
          ? (LauncherLog_1.LauncherLog.Info("下载indexes文件成功"),
            this.PIr.UpdateVersion(this.RSr))
          : LauncherLog_1.LauncherLog.Error("下载index文件失败!", [
              "resType",
              this.SIr,
            ]),
        (n = { success: e.Success, info: a }),
        (o.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(n)),
        HotPatchLogReport_1.HotPatchLogReport.Report(o),
        e)
      : (LauncherLog_1.LauncherLog.Info("已下载过所有indexes文件"),
        {
          Success: !0,
          DownloadState: DownloadDefine_1.EDownloadState.Success,
          HttpCode: 0,
        });
  }
  ResolveIndexFile() {
    var e, t, i;
    return (
      !!this.xIr ||
      ((i = this.PIr.GetIndexSavePaths(this.KSr)),
      (e = this.PIr.GetUpdatePreVersions()),
      (t = !1),
      ([t, this.IIr] = ResourceUpdate.ReadPatchInfoList(
        i,
        e,
        this.PIr,
        this.KSr,
      )),
      ((i = new HotPatchLogReport_1.HotPatchLog()).s_step_id = "resolve_index"),
      (i.s_update_type = this.SIr),
      (i.s_step_result = t ? "success" : "failed"),
      HotPatchLogReport_1.HotPatchLogReport.Report(i),
      t)
    );
  }
  async CheckResourceFiles(s) {
    if (!this.xIr) {
      var r = this.wIr();
      let e = !(this.IIr.length === r.size);
      (this.DIr = new Array()), (this.RIr = new Map()), (this.UIr = 0n);
      var o = this.IIr ? this.IIr.length : 0;
      let t = 0,
        i = ((this.$Sr = 0n), void 0);
      BaseConfigController_1.BaseConfigController.IsUseThreadCheck() &&
        ((i = new UE.KuroCheckFiles()).TmpSuffix =
          UrlPrefixDownload_1.DOWNLOAD_SUFFIX);
      var n,
        a,
        h = (e, t) => {
          var i,
            [s, r] = this.bIr(e, t);
          if (!(s <= 0n))
            return (
              ((i = new UE.KuroCheckInfoEntry()).FileName = "" + e.Name + t),
              (i.FilePath = "" + e.SavePath + t),
              (i.Url = "" + e.FileUrl + t),
              (i.Hash = r),
              (i.Size = s),
              (i.Result = -1),
              i
            );
        };
      for (const L of this.IIr)
        BaseConfigController_1.BaseConfigController.IsUseThreadCheck()
          ? (void 0 !== (n = h(L, ".pak")) && i.CheckList.Add(n),
            void 0 !== (n = h(L, ".sig")) && i.CheckList.Add(n),
            void 0 !== (n = h(L, ".ucas")) && i.CheckList.Add(n),
            void 0 !== (n = h(L, ".utoc")) && i.CheckList.Add(n))
          : ((this.UIr += this.GIr(L, this.DIr, this.RIr)),
            (n = (t * HUNDRED_PERCENT) / o),
            t++,
            s && (await s(n))),
          e ||
            ((a = r.get(L.Name)),
            (e =
              !a ||
              a.PakSha1 !== L.PakSha1 ||
              a.SigSha1 !== L.SigSha1 ||
              a.UtocSha1 !== L.UtocSha1 ||
              a.UcasSha1 !== L.UcasSha1 ||
              a.MountOrder !== L.MountOrder));
      if (BaseConfigController_1.BaseConfigController.IsUseThreadCheck()) {
        await new Promise((e) => {
          i.ProgressDelegate.Add((e, t) => {
            s && ((e = (e * HUNDRED_PERCENT) / t), s(e));
          }),
            i.CompleteDelegate.Add(() => {
              s && s(HUNDRED_PERCENT), e();
            }),
            i.Check();
        });
        var c = i.CheckList.Num();
        for (let e = 0; e < c; e++) {
          var u = i.CheckList.Get(e);
          if (u.Result === EKuroCheckResult.None)
            throw (
              (LauncherLog_1.LauncherLog.Error(
                "检测文件哈希值出错，结果未知",
                ["file", u.FilePath],
                ["hash", u.Hash],
                ["size", u.Size],
              ),
              new Error("检测文件哈希值出错"))
            );
          if (
            u.Result !== EKuroCheckResult.Success &&
            u.Result !== EKuroCheckResult.Rename
          ) {
            let e = 0n;
            u.Result === EKuroCheckResult.Continue &&
              (e =
                0n <=
                (e = UE.KuroLauncherLibrary.GetFileSize(
                  "" + u.FilePath + UrlPrefixDownload_1.DOWNLOAD_SUFFIX,
                ))
                  ? e
                  : 0n),
              (this.$Sr += u.Size - e),
              (this.UIr += u.Size),
              this.yIr || (this.yIr = u.NeedRestart);
            var l = new UrlPrefixDownload_1.RequestFileInfo(),
              u =
                ((l.FileName = u.FileName),
                (l.Url = u.Url),
                (l.SavePath = u.FilePath),
                (l.HashString = u.Hash),
                (l.Size = u.Size),
                (l.bUseDownloadCache = !0),
                this.DIr.push(l),
                new DownloadViewInfo());
            (u.Name = l.FileName),
              (u.Size = l.Size),
              (u.SavedSize = 0n),
              this.RIr.set(u.Name, u);
          }
        }
        i.Clear();
      } else s && (await s(HUNDRED_PERCENT));
      e &&
        ((this.TIr = !0),
        this.BIr(),
        this.PIr.IsFirstUpdateResources() ||
          UE.KuroLauncherLibrary.SetRestartApp(2)),
        LauncherLog_1.LauncherLog.Info("需要更新文件大小", ["size", this.UIr]);
      var d = new HotPatchLogReport_1.HotPatchLog(),
        _ =
          ((d.s_step_id = "check_resource_files"),
          (d.s_update_type = this.SIr),
          {
            NeedDownloadSize: this.UIr.toString(),
            NeedFilesCount: this.DIr?.length,
          });
      (d.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(_)),
        HotPatchLogReport_1.HotPatchLogReport.Report(d);
    }
    return !0;
  }
  async DownloadResourceFiles(h, c = void 0) {
    let u = 0,
      l = 0,
      d = 0n,
      _ = -1,
      L = 0n;
    var e = new HotPatchLogReport_1.HotPatchLog(),
      e =
        ((e.s_step_id = "start_download_paks"),
        (e.s_update_type = this.SIr),
        HotPatchLogReport_1.HotPatchLogReport.Report(e),
        LauncherLog_1.LauncherLog.Info("开始下载补丁文件"),
        new Date()),
      e =
        ((u = e.getTime()),
        (l = u),
        await this.AIr.RequestFiles(
          this.DIr,
          !1,
          3,
          (e, t, i, s, r) => {
            var o,
              n,
              e = this.RIr.get(e);
            e && (e.SavedSize = r);
            let a = 0n;
            for ([o, n] of this.RIr) a += n.SavedSize;
            L += i;
            (e = new Date().getTime()), (r = e - l);
            (_ -= r) < 0 &&
              e !== u &&
              ((_ = 500),
              (d = (1000n * L) / (BigInt(e) - BigInt(u))),
              (L = 0n),
              (u = e)),
              (l = e),
              c && c(i, a, this.UIr, d),
              h && h(t, d, a, this.UIr);
          },
          !0,
        )),
      t = new HotPatchLogReport_1.HotPatchLog();
    return (
      (t.s_step_id = "end_download_paks"),
      (t.s_update_type = this.SIr),
      e.Success
        ? (LauncherLog_1.LauncherLog.Info("补丁下载完成，并校验成功"),
          (t.s_step_result = "success"),
          HotPatchLogReport_1.HotPatchLogReport.Report(t))
        : (LauncherLog_1.LauncherLog.Error("下载补丁失败!", [
            "resType",
            this.SIr,
          ]),
          (t.s_step_result = "failed"),
          HotPatchLogReport_1.HotPatchLogReport.Report(t)),
      e
    );
  }
  CheckNeedRestartApp() {
    (this.TIr = 0 < this.DIr.length),
      (this.LIr = 0),
      this.PIr.IsFirstUpdateResources()
        ? (this.PIr.UpdateSavedVersion(this.RSr), (this.LIr = 1))
        : (this.LIr = 2),
      LauncherLog_1.LauncherLog.Info("检测是否需要重启");
    var e =
      0 < UE.KuroLauncherLibrary.NeedRestartApp() ||
      this.yIr ||
      !UE.KuroLauncherLibrary.IsFirstIntoLauncher();
    return (
      LauncherLog_1.LauncherLog.Info(
        "开始检测下载的pak是否需要重启",
        ["LastSetNeedRestart", UE.KuroLauncherLibrary.NeedRestartApp()],
        ["bNeedRestart", this.yIr],
        ["firstIntoLauncher", UE.KuroLauncherLibrary.IsFirstIntoLauncher()],
      ),
      e &&
        (LauncherLog_1.LauncherLog.Info("检测到下载的资源需要重启！"),
        UE.KuroLauncherLibrary.SetRestartApp(this.LIr)),
      LauncherLog_1.LauncherLog.Info("完成检测是否需要重启"),
      !0
    );
  }
  GetRevertInfo() {
    var e = this.PIr.NeedRevert(),
      t = this.PIr.GetRevertVersions(),
      i = new Set(),
      s = new Set(),
      r = { NeedRevert: e, Paks: i, Files: s };
    if (e) {
      var o =
          "" +
          this.KSr.GetPatchSaveDir() +
          this.PIr.GetPackageVersion() +
          `/${this.PIr.GetResType()}/`,
        n = UE.KuroStaticLibrary.GetFiles(o, "*"),
        a = n.Num();
      for (let e = 0; e < a; e++) {
        var h,
          c,
          u = n.Get(e),
          l = u.toLowerCase(),
          l = l.endsWith(".download") ? l.substring(0, l.lastIndexOf(".")) : l;
        l.endsWith(".txt")
          ? ((h = l.substring(l.lastIndexOf("_") + 1, l.lastIndexOf("."))),
            t.has(h) && s.add(o + u))
          : (l.endsWith(".pak") ||
              l.endsWith(".sig") ||
              l.endsWith(".utoc") ||
              l.endsWith(".ucas")) &&
            ((h = l.lastIndexOf("-")),
            (c = l.substring(l.lastIndexOf("-", h - 1) + 1, h)),
            t.has(c)) &&
            (s.add((c = o + u)), l.endsWith(".pak")) &&
            i.add(c);
      }
    }
    return r;
  }
  GetUpdateSize() {
    return this.UIr;
  }
  GetPakList() {
    return this.IIr;
  }
  GetViewInfoList() {
    return this.RIr;
  }
  GetRequestList() {
    return this.DIr;
  }
  GetNeedRemount() {
    return this.TIr;
  }
  GetNeedRestart() {
    return 0 < UE.KuroLauncherLibrary.NeedRestartApp();
  }
  GetResType() {
    return this.SIr;
  }
  GetNeedSpace() {
    return this.$Sr;
  }
}
exports.ResourceUpdate = ResourceUpdate;
//# sourceMappingURL=ResourceUpdate.js.map
