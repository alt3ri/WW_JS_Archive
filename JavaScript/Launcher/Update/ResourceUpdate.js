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
exports.DownloadViewInfo = DownloadViewInfo;
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
    (this.Tyr = ""),
      (this.Lyr = !1),
      (this.Dyr = void 0),
      (this.Ryr = !1),
      (this.Uyr = void 0),
      (this.Ayr = void 0),
      (this.Pyr = void 0),
      (this.xyr = 0n),
      (this.zSr = 0n),
      (this.PSr = e),
      (this.wyr = t),
      (this.Byr = i),
      (this.$Sr = s),
      (this.byr = r),
      (this.Tyr = i.GetResType());
  }
  ResetWorldContext(e) {
    this.PSr = e;
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
        h = i[e],
        a = (0, puerts_1.$ref)(void 0);
      if (!UE.KuroStaticLibrary.LoadFileToString(a, n))
        return (
          LauncherLog_1.LauncherLog.Warn("index文件不存在", ["file", n]),
          [!1, o]
        );
      var c = (0, puerts_1.$ref)(void 0);
      if (!UE.KuroLauncherLibrary.Decrypt((0, puerts_1.$unref)(a), c))
        return (
          LauncherLog_1.LauncherLog.Warn("index文件内容无法解析", ["file", n]),
          [!1, o]
        );
      a = (0, puerts_1.$unref)(c).trim();
      if (a && !(a.length <= 0)) {
        c = JSON.parse(a);
        if (!(Object.keys(c).length <= 0)) {
          var u,
            d,
            l,
            _,
            a = c[h];
          if (!a)
            return (
              LauncherLog_1.LauncherLog.Warn(
                "index文件内容取不到版本信息",
                ["file", n],
                ["version", h],
              ),
              [!1, o]
            );
          for (const L of a)
            L &&
              0 !== L.length &&
              ((u = L.split(",")).length < 12 ||
                (((d = new PatchFileInfo()).Name = u[0].substring(
                  0,
                  u[0].length - 4,
                )),
                (d.NeedRestart = "1" === u[1]),
                (d.MountType = Number(u[2])),
                (l = s.GetPackageVersion()),
                (_ = BaseConfigController_1.BaseConfigController.GetResUri()),
                (d.FileUrl = `${_}/${r.GetPlatform()}/` + d.Name),
                (d.SavePath =
                  "" +
                  r.GetPatchSaveDir() +
                  l +
                  `/${s.GetResType()}/` +
                  d.Name),
                (d.PakSize = BigInt(u[4])),
                (d.PakSha1 = u[5]),
                (d.MountOrder = Number(u[3])),
                (d.UtocSize = BigInt(u[6])),
                (d.UtocSha1 = u[7]),
                (d.UcasSize = BigInt(u[8])),
                (d.UcasSha1 = u[9]),
                (d.SigSize = BigInt(u[10])),
                (d.SigSha1 = u[11]),
                o.push(d)));
        }
      }
    }
    return [!0, o];
  }
  qyr() {
    var t = new Map(),
      e = this.Byr.GetMountFilePath();
    if (UE.BlueprintPathsLibrary.FileExists(e)) {
      var i = UE.KuroStaticLibrary.LoadFileToStringArray(e),
        s = i.Num();
      for (let e = 0; e < s; e++) {
        var r,
          o = i.Get(e).split(",");
        o.length < 9 ||
          (((r = new PatchFileInfo()).Name =
            o[1] === this.Byr.GetResType() ? o[0] : o[0] + "_" + o[1]),
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
  Gyr() {
    let e = "";
    for (const t of this.Dyr)
      e += `${t.Name},${this.Byr.GetResType()},${t.NeedRestart ? "1" : "0"},${t.MountType},${t.PakSha1},${t.SigSha1},${t.UtocSha1},${t.UcasSha1},${t.MountOrder}\n`;
    UE.KuroStaticLibrary.SaveStringToFile(e, this.Byr.GetMountFilePath());
  }
  Nyr(e, t) {
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
  Oyr(t, i, s, r) {
    var [o, n] = this.Nyr(t, r);
    if (o <= 0n) return 0n;
    let h = 0n;
    var a = "" + t.SavePath + r,
      c = "" + t.SavePath + r + UrlPrefixDownload_1.DOWNLOAD_SUFFIX;
    let e = !0;
    var u = UE.KuroLauncherLibrary.CheckFileSha1(a, n);
    if (
      (e =
        (e = u ? !1 : e) &&
        (UE.BlueprintPathsLibrary.FileExists(a) &&
          UE.KuroLauncherLibrary.DeleteFile(a),
        UE.KuroLauncherLibrary.CheckFileSha1(c, n)) &&
        UE.KuroLauncherLibrary.MoveFile(a, c)
          ? !1
          : e)
    ) {
      let e = UE.KuroLauncherLibrary.GetFileSize(c);
      e >= o && (UE.KuroLauncherLibrary.DeleteFile(c), (e = 0n)),
        (e = 0n <= e ? e : 0n),
        (this.zSr += o - e);
      (u = new UrlPrefixDownload_1.RequestFileInfo()),
        (c =
          ((u.FileName = "" + t.Name + r),
          (u.Url = "" + t.FileUrl + r),
          (u.SavePath = a),
          (u.HashString = n),
          (u.Size = o),
          (u.bUseDownloadCache = !0),
          (h += o),
          i.push(u),
          new DownloadViewInfo()));
      (c.Name = u.FileName),
        (c.Size = u.Size),
        (c.SavedSize = 0n),
        s.set(c.Name, c);
    }
    return h;
  }
  kyr(e, t, i) {
    var s = 0n,
      s =
        (s =
          (s = (s += this.Oyr(e, t, i, ".pak")) + this.Oyr(e, t, i, ".utoc")) +
          this.Oyr(e, t, i, ".ucas")) + this.Oyr(e, t, i, ".sig");
    return !this.Lyr && 0n < s && (this.Lyr = e.NeedRestart), s;
  }
  CheckResourceVersion() {
    var e = this.Byr.HasNewResourceVersionBaseOnPackage(),
      t = this.Byr.IsBasePackageSplited(),
      i = new HotPatchLogReport_1.HotPatchLog();
    if (
      ((i.s_step_id = "check_resource_version"),
      (i.s_update_type = this.Tyr),
      !e && !t)
    ) {
      this.Byr.HasUpdated() || this.Byr.UpdateVersion(this.PSr),
        this.Byr.IsFirstUpdateResources() &&
          this.Byr.UpdateSavedVersion(this.PSr),
        LauncherLog_1.LauncherLog.Info(
          "原始包版本，直接可进入游戏",
          ["Type", this.Tyr],
          ["PackageVersion", this.Byr.GetPackageVersion()],
          ["LatestVersion", this.Byr.GetLatestVersion()],
        );
      const s = {
        PackageVersion: this.Byr.GetPackageVersion(),
        LatestVersion: this.Byr.GetLatestVersion(),
        NeedUpdate: !1,
        BasePackageSplited: t,
      };
      (i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(s)),
        HotPatchLogReport_1.HotPatchLogReport.Report(i);
    }
    const s = {
      PackageVersion: this.Byr.GetPackageVersion(),
      LatestVersion: this.Byr.GetLatestVersion(),
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
    var t = this.Byr.GetIndexSha1s(),
      i = this.Byr.GetIndexSavePaths(this.$Sr),
      s = this.Byr.GetIndexFileNames();
    let r = !1;
    var e,
      o,
      n,
      h = new Array(),
      a = new Array();
    for (let e = 0; e < i.length; e++) {
      var c,
        u,
        d = i[e],
        l = t[e],
        _ = s[e];
      UE.KuroLauncherLibrary.CheckFileSha1(d, l)
        ? LauncherLog_1.LauncherLog.Info("已下载过index文件", ["file", d])
        : ((r = !0),
          UE.BlueprintPathsLibrary.FileExists(d) &&
            UE.KuroLauncherLibrary.DeleteFile(d),
          LauncherLog_1.LauncherLog.Info("开始下载index文件", ["file", d]),
          (c =
            `${BaseConfigController_1.BaseConfigController.GetResUri()}/${this.$Sr.GetPlatform()}/` +
            _),
          ((u = new UrlPrefixDownload_1.RequestFileInfo()).HashString = l),
          (u.Size = 0n),
          (u.bUseDownloadCache = !1),
          (u.Url = c),
          (u.SavePath = d),
          a.push(u),
          h.push(_));
    }
    return r
      ? (((e = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
          "start_download_index"),
        (e.s_update_type = this.Tyr),
        (e.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(h)),
        HotPatchLogReport_1.HotPatchLogReport.Report(e),
        (e = await this.wyr.RequestFiles(a, !0, 3)),
        ((o = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
          "end_download_index"),
        (o.s_update_type = this.Tyr),
        e.Success
          ? (LauncherLog_1.LauncherLog.Info("下载indexes文件成功"),
            this.Byr.UpdateVersion(this.PSr))
          : LauncherLog_1.LauncherLog.Error("下载index文件失败!", [
              "resType",
              this.Tyr,
            ]),
        (n = { success: e.Success, info: h }),
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
      !!this.byr ||
      ((i = this.Byr.GetIndexSavePaths(this.$Sr)),
      (e = this.Byr.GetUpdatePreVersions()),
      (t = !1),
      ([t, this.Dyr] = ResourceUpdate.ReadPatchInfoList(
        i,
        e,
        this.Byr,
        this.$Sr,
      )),
      ((i = new HotPatchLogReport_1.HotPatchLog()).s_step_id = "resolve_index"),
      (i.s_update_type = this.Tyr),
      (i.s_step_result = t ? "success" : "failed"),
      HotPatchLogReport_1.HotPatchLogReport.Report(i),
      t)
    );
  }
  async CheckResourceFiles(i) {
    if (!this.byr) {
      var s = this.qyr(),
        r = this.Dyr.length === s.size;
      let e = !r;
      (this.Ayr = new Array()), (this.Pyr = new Map()), (this.xyr = 0n);
      var o = this.Dyr ? this.Dyr.length : 0;
      let t = 0;
      this.zSr = 0n;
      for (const c of this.Dyr) {
        if (((this.xyr += this.kyr(c, this.Ayr, this.Pyr)), r && !e)) {
          var n = s.get(c.Name);
          if (!n) {
            e = !0;
            break;
          }
          e =
            n.PakSha1 !== c.PakSha1 ||
            n.SigSha1 !== c.SigSha1 ||
            n.UtocSha1 !== c.UtocSha1 ||
            n.UcasSha1 !== c.UcasSha1 ||
            n.MountOrder !== c.MountOrder;
        }
        n = (t * HUNDRED_PERCENT) / o;
        t++, i && (await i(n));
      }
      i && (await i(HUNDRED_PERCENT)),
        e &&
          ((this.Ryr = !0),
          this.Gyr(),
          this.Byr.IsFirstUpdateResources() ||
            UE.KuroLauncherLibrary.SetRestartApp(2)),
        LauncherLog_1.LauncherLog.Info("需要更新文件大小", ["size", this.xyr]);
      var h = new HotPatchLogReport_1.HotPatchLog(),
        a =
          ((h.s_step_id = "check_resource_files"),
          (h.s_update_type = this.Tyr),
          {
            NeedDownloadSize: this.xyr.toString(),
            NeedFilesCount: this.Ayr?.length,
          });
      (h.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(a)),
        HotPatchLogReport_1.HotPatchLogReport.Report(h);
    }
    return !0;
  }
  async DownloadResourceFiles(a, c = void 0) {
    let u = 0,
      d = 0,
      l = 0n,
      _ = -1,
      L = 0n;
    var e = new HotPatchLogReport_1.HotPatchLog(),
      e =
        ((e.s_step_id = "start_download_paks"),
        (e.s_update_type = this.Tyr),
        HotPatchLogReport_1.HotPatchLogReport.Report(e),
        LauncherLog_1.LauncherLog.Info("开始下载补丁文件"),
        new Date()),
      e =
        ((u = e.getTime()),
        (d = u),
        await this.wyr.RequestFiles(
          this.Ayr,
          !1,
          3,
          (e, t, i, s, r) => {
            var o,
              n,
              e = this.Pyr.get(e);
            e && (e.SavedSize = r);
            let h = 0n;
            for ([o, n] of this.Pyr) h += n.SavedSize;
            L += i;
            (e = new Date().getTime()), (r = e - d);
            (_ -= r) < 0 &&
              e !== u &&
              ((_ = 500),
              (l = (1000n * L) / (BigInt(e) - BigInt(u))),
              (L = 0n),
              (u = e)),
              (d = e),
              c && c(i, h, this.xyr, l),
              a && a(t, l, h, this.xyr);
          },
          !0,
        )),
      t = new HotPatchLogReport_1.HotPatchLog();
    return (
      (t.s_step_id = "end_download_paks"),
      (t.s_update_type = this.Tyr),
      e.Success
        ? (LauncherLog_1.LauncherLog.Info("补丁下载完成，并校验成功"),
          (t.s_step_result = "success"),
          HotPatchLogReport_1.HotPatchLogReport.Report(t))
        : (LauncherLog_1.LauncherLog.Error("下载补丁失败!", [
            "resType",
            this.Tyr,
          ]),
          (t.s_step_result = "failed"),
          HotPatchLogReport_1.HotPatchLogReport.Report(t)),
      e
    );
  }
  CheckNeedRestartApp() {
    (this.Ryr = 0 < this.Ayr.length),
      (this.Uyr = 0),
      this.Byr.IsFirstUpdateResources()
        ? (this.Byr.UpdateSavedVersion(this.PSr), (this.Uyr = 1))
        : (this.Uyr = 2),
      LauncherLog_1.LauncherLog.Info("检测是否需要重启");
    var e =
      0 < UE.KuroLauncherLibrary.NeedRestartApp() ||
      this.Lyr ||
      !UE.KuroLauncherLibrary.IsFirstIntoLauncher();
    return (
      LauncherLog_1.LauncherLog.Info(
        "开始检测下载的pak是否需要重启",
        ["LastSetNeedRestart", UE.KuroLauncherLibrary.NeedRestartApp()],
        ["bNeedRestart", this.Lyr],
        ["firstIntoLauncher", UE.KuroLauncherLibrary.IsFirstIntoLauncher()],
      ),
      e &&
        (LauncherLog_1.LauncherLog.Info("检测到下载的资源需要重启！"),
        UE.KuroLauncherLibrary.SetRestartApp(this.Uyr)),
      LauncherLog_1.LauncherLog.Info("完成检测是否需要重启"),
      !0
    );
  }
  GetRevertInfo() {
    var e = this.Byr.NeedRevert(),
      t = this.Byr.GetRevertVersions(),
      i = new Set(),
      s = new Set(),
      r = { NeedRevert: e, Paks: i, Files: s };
    if (e) {
      var o =
          "" +
          this.$Sr.GetPatchSaveDir() +
          this.Byr.GetPackageVersion() +
          `/${this.Byr.GetResType()}/`,
        n = UE.KuroStaticLibrary.GetFiles(o, "*"),
        h = n.Num();
      for (let e = 0; e < h; e++) {
        var a,
          c,
          u = n.Get(e),
          d = u.toLowerCase(),
          d = d.endsWith(".download") ? d.substring(0, d.lastIndexOf(".")) : d;
        d.endsWith(".txt")
          ? ((a = d.substring(d.lastIndexOf("_") + 1, d.lastIndexOf("."))),
            t.has(a) && s.add(o + u))
          : (d.endsWith(".pak") ||
              d.endsWith(".sig") ||
              d.endsWith(".utoc") ||
              d.endsWith(".ucas")) &&
            ((a = d.lastIndexOf("-")),
            (c = d.substring(d.lastIndexOf("-", a - 1) + 1, a)),
            t.has(c)) &&
            (s.add((c = o + u)), d.endsWith(".pak")) &&
            i.add(c);
      }
    }
    return r;
  }
  GetUpdateSize() {
    return this.xyr;
  }
  GetPakList() {
    return this.Dyr;
  }
  GetViewInfoList() {
    return this.Pyr;
  }
  GetRequestList() {
    return this.Ayr;
  }
  GetNeedRemount() {
    return this.Ryr;
  }
  GetNeedRestart() {
    return 0 < UE.KuroLauncherLibrary.NeedRestartApp();
  }
  GetResType() {
    return this.Tyr;
  }
  GetNeedSpace() {
    return this.zSr;
  }
}
exports.ResourceUpdate = ResourceUpdate;
//# sourceMappingURL=ResourceUpdate.js.map
