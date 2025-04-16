"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResPackageInfo = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  LauncherEnum_1 = require("../../Define/LauncherEnum"),
  RemoteConfig_1 = require("../../RemoteConfig"),
  LauncherLanguageLib_1 = require("../../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherSerialize_1 = require("../../Util/LauncherSerialize"),
  RequireFileInfo_1 = require("./RequireFileInfo"),
  ResVersionInfo_1 = require("./ResVersionInfo"),
  TsPatchApi_1 = require("./TsPatchApi");
function extractChunkNumber(e) {
  e = [...e.matchAll(/pakchunk(\d+)/g)].map((e) => e[1]);
  return e.length <= 0 ? "" : e[0];
}
function isChunk0or1(e) {
  e = extractChunkNumber(e);
  return "0" === e || "1" === e;
}
class ResPackageInfo {
  constructor(e, t, i = !1) {
    (this.tIc = e),
      (this.iIc = t),
      (this.rIc = i),
      (this.oIc = ""),
      (this.nIc = ""),
      (this.sIc = ""),
      (this.aIc = void 0),
      (this.hIc = void 0),
      (this.lIc = []),
      (this._Ic = []),
      (this.cIc = void 0),
      (this.uIc = void 0),
      (this.dIc = []),
      (this.mIc = new Map()),
      (this.fIc = []),
      (this.gIc = new Map()),
      (this.CIc = []),
      (this.pIc = []),
      (this.vIc = !1),
      (this.yIc = !1),
      (this.Pwc = new Array()),
      (this.xwc = new Array()),
      (this.Dwc = new Set()),
      this.iIc.Init(),
      (this.oIc = this.iIc.LatestVersion),
      (this.yIc = this.oIc !== this.iIc.RecordVersion);
  }
  static Init(e) {
    LauncherLog_1.LauncherLog.Info("init all res versions."),
      (ResPackageInfo.KSr = e);
    var t = UE.KuroLauncherLibrary.GetAppVersion(),
      e = RemoteConfig_1.RemoteInfo.NewConfig.ResVersions.get("launcher");
    if (!e) throw new Error("远程版本配置中，没有launcher的信息");
    var i = BaseConfigController_1.BaseConfigController.GetResUri(),
      e =
        ((ResPackageInfo.SIc = new ResPackageInfo(
          i,
          new ResVersionInfo_1.LauncherVersionInfo(t, e.Version, e.IndexSha1),
        )),
        RemoteConfig_1.RemoteInfo.NewConfig.ResVersions.get("resource"));
    if (!e) throw new Error("远程版本配置中，没有resource的信息");
    ResPackageInfo.MIc = new ResPackageInfo(
      i,
      new ResVersionInfo_1.ResourceVersionInfo(t, e.Version, e.IndexSha1),
    );
    for (const r of LauncherLanguageLib_1.LauncherLanguageLib.GetAllLanguageDefines())
      if (!ResPackageInfo.EIc.has(r.AudioCode)) {
        var s = RemoteConfig_1.RemoteInfo.NewConfig.ResVersions.get(
          r.AudioCode,
        );
        if (!s)
          throw new Error(`远程版本配置中，没有多语言${r.AudioCode}的信息`);
        s = new ResPackageInfo(
          i,
          new ResVersionInfo_1.LanguageVersionInfo(
            t,
            s.Version,
            s.IndexSha1,
            r.AudioCode,
          ),
        );
        ResPackageInfo.EIc.set(r.AudioCode, s);
      }
  }
  static get LauncherInfo() {
    return ResPackageInfo.SIc;
  }
  static get ResourceInfo() {
    return ResPackageInfo.MIc;
  }
  SetPathMisc(e) {
    void 0 === ResPackageInfo.KSr && (ResPackageInfo.KSr = e);
  }
  static GetLanguageInfo(e) {
    return ResPackageInfo.EIc.get(e);
  }
  static GetLanguageInfos(e) {
    var t = new Array();
    for (const s of e) {
      var i = ResPackageInfo.EIc.get(s);
      i && t.push(i);
    }
    return t;
  }
  static GetAllLanguageInfos() {
    var e,
      t = new Array();
    for ([, e] of ResPackageInfo.EIc) t.push(e);
    return t;
  }
  static GetResSaveDir() {
    return ResPackageInfo.KSr.GetPatchSaveDir();
  }
  static GetTotalAndFreeSpace(e) {
    return ResPackageInfo.KSr.GetTotalAndFreeSpace(e);
  }
  NeedProcessUpdate(e) {
    return e
      ? (this.iIc.RecordUse(!0), this.iIc.HasContentOnRemote())
      : this.iIc.HasContentOnRemote() && !this.iIc.SkipUpdate();
  }
  MustRevertVersion() {
    return this.iIc.NeedRevertVersion;
  }
  NeedRebootModuleOrApp() {
    return this.vIc;
  }
  SetBasePatchOperate(e) {
    this.cIc = e;
  }
  IsHotFixOrNot() {
    return this.yIc;
  }
  GetRemoteManifestRoute() {
    return (
      this.oIc !== this.iIc.LatestVersion && this.xk(),
      this.nIc ||
        (this.nIc = ResPackageInfo.KSr.GetManifestRoute(
          this.tIc,
          this.iIc.LatestVersion,
          this.iIc.GetManifestFileName(),
        )),
      this.nIc
    );
  }
  SetRemoteManifestRoute(e) {
    this.nIc = e;
  }
  GetRemoteRevertManifestRoute() {
    return ResPackageInfo.KSr.GetManifestRoute(
      this.tIc,
      this.iIc.RecordVersion,
      this.iIc.GetManifestFileName(),
    );
  }
  GetManifestSavePath() {
    return (
      this.oIc !== this.iIc.LatestVersion && this.xk(),
      this.sIc ||
        (this.sIc = ResPackageInfo.KSr.GetManifestPath(
          this.iIc.GetPackageVersion(),
          this.iIc.LatestVersion,
          this.iIc.GetManifestFileName(),
        )),
      this.sIc
    );
  }
  SetManifestSavePath(e) {
    this.sIc = e;
  }
  GetRevertManifestPath() {
    return ResPackageInfo.KSr.GetManifestPath(
      this.iIc.GetPackageVersion(),
      this.iIc.RecordVersion,
      this.iIc.GetManifestFileName(),
    );
  }
  GetManifestHash() {
    return this.iIc.ManifestHash;
  }
  GetRevertManifestHash() {
    return this.iIc.RevertManifestHash;
  }
  SetManifest(e, t) {
    (this.aIc = e), (this.hIc = t);
  }
  UpdateRecord() {
    LauncherLog_1.LauncherLog.Info(
      "update manifest and record.",
      ["res", this.iIc.GetResType()],
      ["preDownload", this.rIc],
    );
    var e,
      t = new Map();
    let i = "::Mount::\n";
    for ([, e] of this.gIc)
      (i += `${e.Name},${e.MountOrder},${e.PakSha1},${e.SigSha1},${e.UtocSha1},${e.UcasSha1}\n`),
        isChunk0or1(e.Name) &&
          t.set(
            e.Name,
            `${e.PakSha1},${e.SigSha1},${e.UtocSha1},` + e.UcasSha1,
          );
    i += "::Del::\n";
    for (const L of this.pIc)
      i +=
        L +
        `
`;
    var s = ResPackageInfo.KSr.GetMountManifestPath(
      this.iIc.GetPackageVersion(),
      this.iIc.GetMountFileName(),
    );
    if (0 < t.size)
      if (UE.BlueprintPathsLibrary.FileExists(s)) {
        var r,
          o,
          n = new Map(),
          a = UE.KuroStaticLibrary.LoadFileToStringArray(s),
          h = a.Num();
        for (let e = 0; e < h; e++) {
          var f = a.Get(e),
            u = f.split(",");
          n.set(u[0].trim(), f);
        }
        for ([r, o] of t) {
          var c = n.get(r);
          if (void 0 === c || "string" != typeof c || !c.includes(o)) {
            (this.vIc = !0),
              LauncherLog_1.LauncherLog.Info(
                "need reboot because mount manifest need update.",
                ["res", this.iIc.GetResType()],
                ["preDownload", this.rIc],
              );
            break;
          }
        }
      } else
        (this.vIc = !0),
          LauncherLog_1.LauncherLog.Info(
            "need reboot because mount manifest is not exist.",
            ["res", this.iIc.GetResType()],
            ["preDownload", this.rIc],
          );
    UE.KuroStaticLibrary.SaveStringToFile(i, s), this.iIc.UpdateVersionRecord();
    var l = `${UE.KuroLauncherLibrary.GameSavedDir()}Resources/${this.iIc.GetPackageVersion()}/${this.iIc.GetResType()}/`,
      g = UE.KuroStaticLibrary.GetDirectories(l),
      d = g.Num();
    for (let e = 0; e < d; e++) {
      var v = g.Get(e);
      v !== LauncherEnum_1.BASE_RES_DIR &&
        v !== this.iIc.LatestVersion &&
        UE.KuroLauncherLibrary.DeleteDirectory(l + v);
    }
    s =
      `${UE.KuroLauncherLibrary.GameSavedDir()}Resources/${this.iIc.GetPackageVersion()}/Diff/` +
      this.iIc.GetResType();
    UE.BlueprintPathsLibrary.DirectoryExists(s) &&
      UE.KuroLauncherLibrary.DeleteDirectory(s);
  }
  SkipLangUpdateButMountFileModify() {
    if (this.iIc.SkipUpdate()) {
      var e = ResPackageInfo.KSr.GetMountManifestPath(
        this.iIc.GetPackageVersion(),
        this.iIc.GetMountFileName(),
      );
      if (UE.BlueprintPathsLibrary.FileExists(e))
        return UE.KuroLauncherLibrary.DeleteFile(e), !0;
    }
    return !1;
  }
  ClearRecord() {
    this.iIc.ClearVersionRecord();
  }
  AnalyzeRequireFiles(e = !1) {
    LauncherLog_1.LauncherLog.Info(
      "analyze res files.",
      ["forceDownload", e],
      ["preDownload", this.rIc],
    );
    var t,
      i,
      s,
      r,
      o,
      n,
      a,
      h,
      f,
      u,
      c = void 0,
      l = void 0,
      g = void 0,
      d = void 0,
      v = void 0,
      L = void 0,
      _ = void 0,
      R = void 0,
      p = void 0,
      E = void 0,
      w = void 0,
      I = void 0,
      k = void 0,
      U = void 0,
      P = void 0,
      m = void 0;
    ([c, g, this.cIc, v, _, p, w, k, P] = this.IIc(
      this.aIc.DiffPatch.BaseDiffMap,
      this.aIc.DiffPatch.BaseFiles,
      this.iIc.RecordPackageVersion,
      this.iIc.GetPackageVersion(),
      !0,
      e,
    )),
      ([l, d, this.uIc, L, R, E, I, U, m] = this.IIc(
        this.MustRevertVersion()
          ? this.hIc.DiffPatch.RevertMap
          : this.aIc.DiffPatch.CurDiffMap,
        this.aIc.DiffPatch.PatchFiles,
        this.iIc.RecordVersion,
        this.iIc.LatestVersion,
        !1,
        e,
        this.MustRevertVersion(),
      )),
      (this.lIc.length = 0),
      (this.lIc = c.concat(l)),
      (this._Ic.length = 0),
      (this._Ic = g.concat(d)),
      (this.dIc.length = 0);
    for ([, t] of _) this.dIc.push(t);
    for ([, i] of R) this.dIc.push(i);
    this.mIc.clear();
    for ([s, r] of v) this.mIc.set(s, r);
    for ([o, n] of L) this.mIc.set(o, n);
    (this.fIc.length = 0), (this.fIc = p.concat(E)), this.gIc.clear();
    for ([a, h] of w) this.gIc.set(a, h);
    for ([f, u] of I) this.gIc.set(f, u);
    return (
      (this.CIc.length = 0),
      (this.CIc = k.concat(U)),
      (this.pIc.length = 0),
      (this.pIc = P.concat(m)),
      [this.lIc, this._Ic]
    );
  }
  NeedPatch() {
    return void 0 !== this.cIc || void 0 !== this.uIc;
  }
  PatchTotalSize() {
    let e = 0n;
    var t;
    return (
      this.cIc &&
        (e += this.aIc.DiffPatch.BaseDiffMap.get(
          this.iIc.RecordPackageVersion,
        ).NewRefSize),
      this.uIc &&
        ((t = this.MustRevertVersion()
          ? this.hIc.DiffPatch.RevertMap
          : this.aIc.DiffPatch.CurDiffMap),
        (e += t.get(this.iIc.RecordVersion).NewRefSize)),
      e
    );
  }
  async ExecutePatch(e) {
    if (
      (LauncherLog_1.LauncherLog.Info("try to execute patch.", [
        "preDownload",
        this.rIc,
      ]),
      void 0 === this.cIc && void 0 === this.uIc)
    )
      return (
        LauncherLog_1.LauncherLog.Info("need not execute patch.", [
          "preDownload",
          this.rIc,
        ]),
        [!0, TsPatchApi_1.EKuroPatchResult.HPATCH_SUCCESS, []]
      );
    var t,
      i = new TsPatchApi_1.TsPatchApi(),
      s = [];
    let r = 0,
      o = new Set();
    if (this.cIc && !this.cIc.OpSuccess) {
      ([r, o] = await i.Patch(
        this.cIc.DiffFile,
        this.cIc.OldDir,
        this.cIc.NewDir,
        e,
      )),
        r !== TsPatchApi_1.EKuroPatchResult.HPATCH_SUCCESS &&
          LauncherLog_1.LauncherLog.Error("patch base res 出错", ["ret", r]),
        (this.cIc.OpSuccess = !0);
      for (const n of o) this.mIc.delete(n);
    }
    if (this.uIc && !this.uIc.OpSuccess) {
      ([r, o] = await i.Patch(
        this.uIc.DiffFile,
        this.uIc.OldDir,
        this.uIc.NewDir,
        e,
      )),
        r !== TsPatchApi_1.EKuroPatchResult.HPATCH_SUCCESS &&
          LauncherLog_1.LauncherLog.Error("patch game res 出错", ["ret", r]),
        (this.uIc.OpSuccess = !0);
      for (const a of o) this.mIc.delete(a);
    }
    for ([, t] of this.mIc)
      s.push(t),
        UE.BlueprintPathsLibrary.FileExists(t.LocalPath) &&
          UE.KuroLauncherLibrary.DeleteFile(t.LocalPath);
    return [!0, TsPatchApi_1.EKuroPatchResult.HPATCH_SUCCESS, s];
  }
  MoveFiles() {
    LauncherLog_1.LauncherLog.Info("move file after patch.", [
      "preDownload",
      this.rIc,
    ]);
    for (const e of this.dIc)
      UE.BlueprintPathsLibrary.FileExists(e.OldPath) &&
        e.MoveOrCopy &&
        e.OldPath.endsWith(".pak") &&
        UE.KuroPakMountStatic.UnmountPak(e.OldPath);
    for (const t of this.dIc)
      if (UE.BlueprintPathsLibrary.FileExists(t.OldPath))
        if (t.MoveOrCopy) {
          if (!UE.KuroLauncherLibrary.MoveFile(t.NewPath, t.OldPath)) return !1;
        } else if (!UE.KuroLauncherLibrary.CopyFile(t.NewPath, t.OldPath))
          return !1;
    return !0;
  }
  GetMountInfos() {
    return [this.CIc, this.fIc, this.iIc.GetMountOrder()];
  }
  DeleteLocalFiles() {
    LauncherLog_1.LauncherLog.Info(
      "delete lang res.",
      ["res", this.iIc.GetResType()],
      ["preDownload", this.rIc],
    );
    var e = ResPackageInfo.KSr.GetMountManifestPath(
      this.iIc.GetPackageVersion(),
      this.iIc.GetMountFileName(),
    );
    UE.BlueprintPathsLibrary.FileExists(e) &&
      UE.KuroLauncherLibrary.DeleteFile(e);
    for (const s of this.Dwc) UE.KuroPakMountStatic.UnmountPak(s);
    for (const r of this.Pwc) {
      var t =
        ResPackageInfo.KSr.GetResFileDir(
          this.iIc.GetPackageVersion(),
          LauncherEnum_1.BASE_RES_DIR,
          this.iIc.GetResType(),
        ) + r.Name;
      UE.BlueprintPathsLibrary.FileExists(t)
        ? UE.KuroLauncherLibrary.DeleteFile(t)
        : ((t = "" + t + LauncherEnum_1.TEMP_DOWNLOAD_SUFFIX),
          UE.BlueprintPathsLibrary.FileExists(t) &&
            UE.KuroLauncherLibrary.DeleteFile(t));
    }
    for (const o of this.xwc) {
      var i =
        ResPackageInfo.KSr.GetResFileDir(
          this.iIc.GetPackageVersion(),
          this.iIc.LatestVersion,
          this.iIc.GetResType(),
        ) + o.Name;
      UE.BlueprintPathsLibrary.FileExists(i)
        ? UE.KuroLauncherLibrary.DeleteFile(i)
        : ((i = "" + i + LauncherEnum_1.TEMP_DOWNLOAD_SUFFIX),
          UE.BlueprintPathsLibrary.FileExists(i) &&
            UE.KuroLauncherLibrary.DeleteFile(i));
    }
    this.ClearRecord();
  }
  CalculateSavedSizeAndTotalSize() {
    if (
      (LauncherLog_1.LauncherLog.Info(
        "calculate all size of lang res.",
        ["res", this.iIc.GetResType()],
        ["preDownload", this.rIc],
      ),
      this.Pwc.length <= 0 && this.xwc.length <= 0)
    ) {
      LauncherLog_1.LauncherLog.Info(
        "first time to calculate all size of lang res.",
        ["preDownload", this.rIc],
      );
      var e = this.GetManifestSavePath(),
        t = (0, puerts_1.$ref)(void 0);
      if (!UE.KuroStaticLibrary.LoadFileToString(t, e))
        return (
          LauncherLog_1.LauncherLog.Warn("清单文件不存在", ["file", e]),
          [0n, 1n]
        );
      var i = (0, puerts_1.$ref)(void 0);
      if (!UE.KuroLauncherLibrary.Decrypt((0, puerts_1.$unref)(t), i))
        return (
          LauncherLog_1.LauncherLog.Warn("清单文件内容无法解析", ["file", e]),
          [0n, 1n]
        );
      t = (0, puerts_1.$unref)(i).trim();
      if (!t)
        return (
          LauncherLog_1.LauncherLog.Warn("清单文件内容为空", ["file", e]),
          [0n, 1n]
        );
      i = LauncherSerialize_1.LauncherJson.Parse(t);
      (this.Pwc = this.Pwc.concat(i.DiffPatch.BaseFiles)),
        (this.xwc = this.xwc.concat(i.DiffPatch.PatchFiles));
    }
    let s = 0n,
      r = 0n;
    for (const a of this.Pwc) {
      var o =
        ResPackageInfo.KSr.GetResFileDir(
          this.iIc.GetPackageVersion(),
          LauncherEnum_1.BASE_RES_DIR,
          this.iIc.GetResType(),
        ) + a.Name;
      o.endsWith(".pak") && this.Dwc.add(o),
        (r += a.Size),
        UE.BlueprintPathsLibrary.FileExists(o)
          ? (s += a.Size)
          : ((o = "" + o + LauncherEnum_1.TEMP_DOWNLOAD_SUFFIX),
            UE.BlueprintPathsLibrary.FileExists(o) &&
              (s += UE.KuroLauncherLibrary.GetFileSize(o)));
    }
    for (const h of this.xwc) {
      var n =
        ResPackageInfo.KSr.GetResFileDir(
          this.iIc.GetPackageVersion(),
          this.iIc.LatestVersion,
          this.iIc.GetResType(),
        ) + h.Name;
      n.endsWith(".pak") && this.Dwc.add(n),
        (r += h.Size),
        UE.BlueprintPathsLibrary.FileExists(n)
          ? (s += h.Size)
          : ((n = "" + n + LauncherEnum_1.TEMP_DOWNLOAD_SUFFIX),
            UE.BlueprintPathsLibrary.FileExists(n) &&
              (s += UE.KuroLauncherLibrary.GetFileSize(n)));
    }
    return [s, r];
  }
  IsCompleteUpdate() {
    return this.iIc.LatestVersion === this.iIc.RecordVersion;
  }
  IIc(t, e, i, s, r, o = !1, $ = !1) {
    var n = new Array(),
      a = new Array(),
      h = new Map(),
      f = new Map(),
      u = new Array(),
      c = new Map(),
      l = new Array(),
      g = new Array();
    let d = void 0;
    LauncherLog_1.LauncherLog.Info(
      "begin analyze and print the info",
      ["bIsBase", r],
      ["oldVersion", i],
      ["latestVersion", s],
      ["bForceDownload", o],
      ["bIsPreDownload", this.rIc],
      ["map", t],
      ["files", e],
    );
    var v = ResPackageInfo.KSr.GetResFileDir(
        r ? i : this.iIc.GetPackageVersion(),
        r ? LauncherEnum_1.BASE_RES_DIR : i,
        this.iIc.GetResType(),
      ),
      L = ResPackageInfo.KSr.GetResFileDir(
        this.iIc.GetPackageVersion(),
        r ? LauncherEnum_1.BASE_RES_DIR : s,
        this.iIc.GetResType(),
      ),
      _ = t.get(i),
      t = _
        ? ResPackageInfo.KSr.GetDiffFilePath(
            this.iIc.GetPackageVersion(),
            r ? LauncherEnum_1.BASE_RES_DIR : s,
            this.iIc.GetResType(),
            _.DiffFile.Name,
          )
        : "",
      R = i === s;
    let p = !o && void 0 !== _ && !R;
    if (
      (LauncherLog_1.LauncherLog.Info(
        "1st make sure diff info",
        ["useDiff", p],
        ["res", this.iIc.GetResType()],
        ["preDownload", this.rIc],
      ),
      p)
    ) {
      var E = new RequireFileInfo_1.FileSpace(t, _.DiffFile.Size, !0);
      let e = 0;
      if (UE.BlueprintPathsLibrary.DirectoryExists(v))
        for (const M of _.ModFiles) {
          var z = "" + v + M;
          0n < UE.KuroLauncherLibrary.GetFileSize(z) && e++;
        }
      (p = 0 < e) &&
        ((d = new RequireFileInfo_1.PatchOperate(t, v, L)),
        n.push(E),
        E.NeedDownload()) &&
        ((E = new RequireFileInfo_1.RequireFileInfo(
          ResPackageInfo.KSr.GetResFileRoute(
            this.tIc,
            $ ? i : s,
            _.DiffFile.Name,
          ),
          t,
          _.DiffFile.Size,
          _.DiffFile.Hash,
        )),
        a.push(E)),
        LauncherLog_1.LauncherLog.Info(
          "2nd make sure diff info",
          ["useDiff", p],
          ["res", this.iIc.GetResType()],
          ["preDownload", this.rIc],
        );
    }
    if (
      !p &&
      !R &&
      (LauncherLog_1.LauncherLog.Info(
        "clean the old version dir",
        ["res", this.iIc.GetResType()],
        ["preDownload", this.rIc],
      ),
      t &&
        UE.BlueprintPathsLibrary.FileExists(t) &&
        UE.KuroLauncherLibrary.DeleteFile(t),
      t &&
        UE.BlueprintPathsLibrary.FileExists(
          t + LauncherEnum_1.TEMP_DOWNLOAD_SUFFIX,
        ) &&
        UE.KuroLauncherLibrary.DeleteFile(
          t + LauncherEnum_1.TEMP_DOWNLOAD_SUFFIX,
        ),
      !this.rIc)
    )
      if (r)
        if (_) {
          for (const A of _.ModFiles) {
            var w = "" + v + A;
            UE.BlueprintPathsLibrary.FileExists(w) &&
              UE.KuroLauncherLibrary.DeleteFile(w);
          }
          for (const F of _.DelFiles) {
            var I = "" + v + F;
            UE.BlueprintPathsLibrary.FileExists(I) &&
              UE.KuroLauncherLibrary.DeleteFile(I);
          }
        } else
          UE.BlueprintPathsLibrary.DirectoryExists(v) &&
            UE.KuroLauncherLibrary.DeleteDirectory(v);
      else if (_) {
        for (const b of _.ModFiles) {
          var k = "" + v + b;
          isChunk0or1(k) || (k.endsWith(".pak") && l.push(k), g.push(k));
        }
        for (const x of _.DelFiles) {
          var U = "" + v + x;
          U.endsWith(".pak") && l.push(U), g.push(U);
        }
      } else {
        var P = UE.KuroStaticLibrary.GetFiles(v, ""),
          G = P.Num();
        for (let e = 0; e < G; e++) {
          var m = "" + v + P.Get(e);
          isChunk0or1(m) || (m.endsWith(".pak") && l.push(m), g.push(m));
        }
      }
    LauncherLog_1.LauncherLog.Info(
      "collect all files info",
      ["res", this.iIc.GetResType()],
      ["preDownload", this.rIc],
    );
    for (const S of e) {
      var D = "" + L + S.Name;
      D.endsWith(".pak") && u.push(D);
      {
        var q =
          `${this.iIc.GetResType()}/${r ? LauncherEnum_1.BASE_RES_DIR : s}/` +
          S.Name.substring(0, S.Name.lastIndexOf("."));
        let e = c.get(q);
        void 0 === e &&
          (((e = new RequireFileInfo_1.LocalMountInfo()).Name = q),
          (e.MountOrder = this.iIc.GetMountOrder()),
          c.set(q, e)),
          S.Name.endsWith(".pak") && (e.PakSha1 = S.Hash),
          S.Name.endsWith(".sig") && (e.SigSha1 = S.Hash),
          S.Name.endsWith(".utoc") && (e.UtocSha1 = S.Hash),
          S.Name.endsWith(".ucas") && (e.UcasSha1 = S.Hash);
      }
      if (_) {
        if (_.SameFiles.has(S.Name)) {
          var C,
            q = "" + v + S.Name;
          new RequireFileInfo_1.FileSpace(q, S.Size, !1).NeedDownload()
            ? ((C = new RequireFileInfo_1.FileSpace(
                D,
                S.Size,
                !0,
              )).NeedDownload() &&
                (n.push(C),
                a.push(
                  new RequireFileInfo_1.RequireFileInfo(
                    ResPackageInfo.KSr.GetResFileRoute(
                      this.tIc,
                      S.Version || s,
                      S.Name,
                    ),
                    D,
                    S.Size,
                    S.Hash,
                  ),
                ),
                isChunk0or1(D)) &&
                (LauncherLog_1.LauncherLog.Info(
                  "must restart because of the same file will re-download",
                  ["old", q],
                  ["res", this.iIc.GetResType()],
                  ["preDownload", this.rIc],
                ),
                (this.vIc = !0)),
              q.endsWith(".pak") && l.push(q),
              g.push(q))
            : ((C = new RequireFileInfo_1.MoveInfo(q, D, r || !isChunk0or1(q))),
              f.set(S.Name, C));
          continue;
        }
        if (!this.rIc && _.DelFiles.has(S.Name)) {
          var q = "" + v + S.Name;
          r
            ? UE.BlueprintPathsLibrary.FileExists(q) &&
              UE.KuroLauncherLibrary.DeleteFile(q)
            : (q.endsWith(".pak") && l.push(q), g.push(q));
          continue;
        }
      }
      p
        ? ((q = new RequireFileInfo_1.FileSpace(D, S.Size, !1)),
          n.push(q),
          h.set(
            S.Name,
            new RequireFileInfo_1.RequireFileInfo(
              ResPackageInfo.KSr.GetResFileRoute(
                this.tIc,
                S.Version || s,
                S.Name,
              ),
              D,
              S.Size,
              S.Hash,
            ),
          ),
          isChunk0or1(D) &&
            (LauncherLog_1.LauncherLog.Info(
              "must restart because of file created use patch",
              ["new", D],
              ["res", this.iIc.GetResType()],
              ["preDownload", this.rIc],
            ),
            (this.vIc = !0)))
        : (q = new RequireFileInfo_1.FileSpace(D, S.Size, !0)).NeedDownload() &&
          (n.push(q),
          a.push(
            new RequireFileInfo_1.RequireFileInfo(
              ResPackageInfo.KSr.GetResFileRoute(
                this.tIc,
                S.Version || s,
                S.Name,
              ),
              D,
              S.Size,
              S.Hash,
            ),
          ),
          isChunk0or1(D)) &&
          (LauncherLog_1.LauncherLog.Info(
            "must restart because of file need download",
            ["new", D],
            ["res", this.iIc.GetResType()],
            ["preDownload", this.rIc],
          ),
          (this.vIc = !0));
    }
    if (!this.rIc && o) {
      LauncherLog_1.LauncherLog.Info(
        "force clean space",
        ["res", this.iIc.GetResType()],
        ["preDownload", this.rIc],
      );
      for (const T of l) UE.KuroPakMountStatic.UnmountPak(T);
      for (const y of g)
        UE.BlueprintPathsLibrary.FileExists(y) &&
          UE.KuroLauncherLibrary.DeleteFile(y);
      (l.length = 0), (g.length = 0);
    }
    return [n, a, d, h, f, u, c, l, g];
  }
  xk() {
    (this.oIc = this.iIc.LatestVersion), (this.nIc = ""), (this.sIc = "");
  }
}
((exports.ResPackageInfo = ResPackageInfo).KSr = void 0),
  (ResPackageInfo.SIc = void 0),
  (ResPackageInfo.MIc = void 0),
  (ResPackageInfo.EIc = new Map());
//# sourceMappingURL=ResPackageInfo.js.map
