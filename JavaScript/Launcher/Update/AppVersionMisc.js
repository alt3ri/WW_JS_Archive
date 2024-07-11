"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LanguageVersionMisc =
    exports.ResourceVersionMisc =
    exports.LauncherVersionMisc =
    exports.AppVersionMisc =
      void 0);
const UE = require("ue"),
  UrlPrefixDownload_1 = require("../Download/UrlPrefixDownload"),
  RemoteConfig_1 = require("../RemoteConfig"),
  LauncherLanguageLib_1 = require("../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherStorageLib_1 = require("../Util/LauncherStorageLib"),
  AppPathMisc_1 = require("./AppPathMisc"),
  ResourceUpdate_1 = require("./ResourceUpdate"),
  BaseDefine_1 = require("../BaseConfig/BaseDefine");
class AppVersionMisc {
  constructor() {
    (this.PackageVersion = ""),
      (this.LocalResourceVersion = ""),
      (this.LocalResourceVersions = void 0),
      (this.LocalSaveResourceVersion = ""),
      (this.LocalSaveResourceVersions = void 0),
      (this.LatestVersion = ""),
      (this.HasUpdatedResource = !1),
      (this.IndexSha1s = void 0),
      (this.UpdateVersionNodes = void 0),
      (this.UpdatePreVersionNodes = void 0),
      (this.hIr = !1),
      (this.lIr = !1),
      (this._Ir = new Set());
  }
  Init(e) {
    (this.PackageVersion = UE.KuroLauncherLibrary.GetAppVersion()),
      this.SetVersions(
        LauncherStorageLib_1.LauncherStorageLib.GetGlobalString(
          this.GetUpdateVersionKey(),
          this.PackageVersion,
        ),
        LauncherStorageLib_1.LauncherStorageLib.GetGlobalString(
          this.GetSaveUpdateVersionKey(),
          this.PackageVersion,
        ),
        this.GetRemoteVersion(),
        this.GetRemoteSha1Map(),
      ),
      (this.UpdateVersionNodes = new Array());
    for (const s of this.LocalSaveResourceVersions)
      (s === this.PackageVersion && !this.hIr) ||
        this.UpdateVersionNodes.push(s);
    this.LocalSaveResourceVersion !== this.LatestVersion &&
      this.LatestVersion !== this.PackageVersion &&
      this.UpdateVersionNodes.push(this.LatestVersion),
      (this.UpdatePreVersionNodes = new Array()),
      this.LatestVersion === this.PackageVersion &&
        this.hIr &&
        this.UpdatePreVersionNodes.push(this.PackageVersion),
      this.LatestVersion !== this.PackageVersion &&
        this.UpdatePreVersionNodes.push(this.PackageVersion);
    for (let e = 0; e < this.UpdateVersionNodes.length - 1; e++) {
      var t = this.UpdateVersionNodes[e];
      this.UpdatePreVersionNodes.push(t);
    }
  }
  SetVersions(s, i, r, h) {
    let n = s.split(","),
      o = n[n.length - 1],
      a = i.split(","),
      u = a[a.length - 1];
    if (r) {
      this.LatestVersion = r;
      var [s, c] = BaseDefine_1.VersionInfo.TryParse(r),
        [i, d] = BaseDefine_1.VersionInfo.TryParse(o),
        [L, p] = BaseDefine_1.VersionInfo.TryParse(u);
      if (!s || !i || !L)
        throw (
          (LauncherLog_1.LauncherLog.Error(
            "转版本号失败",
            ["Type", this.GetResType()],
            ["latestVer", r],
            ["localVer", o],
            ["localSaveVer", u],
          ),
          new Error("转版本号失败"))
        );
      let e = !1,
        t = !1;
      if (((this.lIr = !1), BaseDefine_1.VersionInfo.PackageEquals(c, d))) {
        if (c.Patch < d.Patch) {
          this.lIr = !0;
          for (let e = c.Patch + 1; e <= d.Patch; e++)
            this._Ir.add(`${c.Major}.${c.Minor}.` + e);
        }
      } else (o = this.PackageVersion), (n = [o]), (e = !0);
      if (BaseDefine_1.VersionInfo.PackageEquals(c, d)) {
        if (c.Patch < p.Patch) {
          this.lIr = !0;
          for (let e = c.Patch + 1; e <= p.Patch; e++)
            this._Ir.add(`${c.Major}.${c.Minor}.` + e);
        }
      } else (u = this.PackageVersion), (a = [u]), (t = !0);
      if (this.lIr) {
        this.LocalResourceVersions = new Array();
        for (const l of n)
          this._Ir.has(l) || this.LocalResourceVersions.push(l);
        (this.LocalResourceVersion =
          this.LocalResourceVersions[this.LocalResourceVersions.length - 1]),
          (this.LocalSaveResourceVersions = new Array());
        for (const f of a)
          this._Ir.has(f) || this.LocalSaveResourceVersions.push(f);
        (this.LocalSaveResourceVersion =
          this.LocalSaveResourceVersions[
            this.LocalSaveResourceVersions.length - 1
          ]),
          this.LocalResourceVersion === r && (e = !0),
          this.LocalSaveResourceVersion === r && (t = !0);
      } else
        (this.LocalResourceVersions = n),
          (this.LocalResourceVersion = o),
          (this.LocalSaveResourceVersions = a),
          (this.LocalSaveResourceVersion = u);
      e && this.UpdateVersion(void 0, !0),
        t && this.UpdateSavedVersion(void 0, !0),
        (this.hIr = h.has(this.PackageVersion)),
        (this.IndexSha1s = new Array());
      for (const _ of this.LocalSaveResourceVersions)
        (_ === this.PackageVersion && !this.hIr) ||
          this.IndexSha1s.push(h.get(_));
      this.LocalSaveResourceVersion !== this.LatestVersion &&
        this.IndexSha1s.push(h.get(this.LatestVersion)),
        (this.HasUpdatedResource =
          this.LatestVersion === this.PackageVersion
            ? !this.hIr
            : this.LocalResourceVersion === this.LatestVersion);
    } else
      LauncherLog_1.LauncherLog.Warn(
        "远程版本号为空，使用包体版本号做为线上最新版本号",
      ),
        (this.LocalResourceVersions = n),
        (this.LocalResourceVersion = o),
        (this.LocalSaveResourceVersions = a),
        (this.LocalSaveResourceVersion = u),
        (this.LatestVersion = this.PackageVersion),
        (this.HasUpdatedResource = !0);
  }
  NeedRevert() {
    return this.lIr;
  }
  GetRevertVersions() {
    return this._Ir;
  }
  HasNewResourceVersionBaseOnPackage() {
    return this.PackageVersion !== this.LatestVersion;
  }
  IsBasePackageSplited() {
    return this.hIr;
  }
  IsFirstUpdateResources() {
    return this.LatestVersion === this.PackageVersion
      ? this.hIr
      : this.LatestVersion !== this.LocalSaveResourceVersion;
  }
  NeedCheckAppRestart() {
    return !0;
  }
  HasUpdated() {
    return this.HasUpdatedResource;
  }
  GetLatestVersion() {
    return this.LatestVersion;
  }
  UpdateVersion(e, t = !1) {
    if (t) {
      const s = this.LocalResourceVersions.join(",");
      LauncherStorageLib_1.LauncherStorageLib.SetGlobalString(
        this.GetUpdateVersionKey(),
        s,
      ),
        void (
          0 < UE.KuroLauncherLibrary.NeedRestartApp() &&
          UE.KuroLauncherLibrary.SetRestartApp(1)
        );
    } else {
      (this.LocalResourceVersion = this.LatestVersion),
        (this.LocalResourceVersions.length <= 0 ||
          this.LocalResourceVersions[this.LocalResourceVersions.length - 1] !==
            this.LatestVersion) &&
          this.LocalResourceVersions.push(this.LatestVersion);
      const s = this.LocalResourceVersions.join(",");
      LauncherStorageLib_1.LauncherStorageLib.SetGlobalString(
        this.GetUpdateVersionKey(),
        s,
      );
    }
  }
  UpdateSavedVersion(e, t = !1) {
    if (t) {
      const s = this.LocalSaveResourceVersions.join(",");
      LauncherLog_1.LauncherLog.Info(
        "UpdateSavedVersion",
        ["Type", this.GetResType()],
        ["Versions", s],
      ),
        LauncherStorageLib_1.LauncherStorageLib.SetGlobalString(
          this.GetSaveUpdateVersionKey(),
          s,
        ),
        void (
          0 < UE.KuroLauncherLibrary.NeedRestartApp() &&
          UE.KuroLauncherLibrary.SetRestartApp(1)
        );
    } else {
      (this.LocalSaveResourceVersion = this.LatestVersion),
        (this.LocalSaveResourceVersions.length <= 0 ||
          this.LocalSaveResourceVersions[
            this.LocalSaveResourceVersions.length - 1
          ] !== this.LatestVersion) &&
          this.LocalSaveResourceVersions.push(this.LatestVersion);
      const s = this.LocalSaveResourceVersions.join(",");
      LauncherLog_1.LauncherLog.Info(
        "UpdateSavedVersion",
        ["Type", this.GetResType()],
        ["Versions", s],
      ),
        LauncherStorageLib_1.LauncherStorageLib.SetGlobalString(
          this.GetSaveUpdateVersionKey(),
          s,
        );
    }
  }
  ClearAllPatchVersion(e) {
    LauncherStorageLib_1.LauncherStorageLib.DeleteGlobalString(
      this.GetUpdateVersionKey(),
    ),
      LauncherStorageLib_1.LauncherStorageLib.DeleteGlobalString(
        this.GetSaveUpdateVersionKey(),
      );
  }
  ReadPatchFileInfoList() {
    var e = new AppPathMisc_1.AppPathMisc(),
      t = this.GetIndexSavePaths(e),
      [, t] = ResourceUpdate_1.ResourceUpdate.ReadPatchInfoList(
        t,
        this.UpdatePreVersionNodes,
        this,
        e,
      );
    return t;
  }
  GetPackageVersion() {
    return this.PackageVersion;
  }
  GetIndexSha1s() {
    return this.IndexSha1s;
  }
  GetIndexSavePaths(e) {
    var t = new Array();
    for (const s of this.GetIndexFileNames())
      t.push(
        "" +
          e.GetPatchSaveDir() +
          this.GetPackageVersion() +
          `/${this.GetResType()}/` +
          s,
      );
    return t;
  }
  GetUpdatePreVersions() {
    return this.UpdatePreVersionNodes;
  }
  GetIndexFileNames() {
    var e = new Array();
    for (const t of this.UpdateVersionNodes)
      e.push("" + this.GetIndexFilePrefix() + t + ".txt");
    return e;
  }
  GetMountFilePath() {
    return (
      `${UE.BlueprintPathsLibrary.ProjectSavedDir()}Resources/${this.GetPackageVersion()}/` +
      this.GetMountFileName()
    );
  }
}
class LauncherVersionMisc extends (exports.AppVersionMisc = AppVersionMisc) {
  GetUpdateVersionKey() {
    return "LauncherVersion";
  }
  GetSaveUpdateVersionKey() {
    return "SavedLauncherVersion";
  }
  GetIndexFilePrefix() {
    return "UpdaterPatchList_";
  }
  GetMountFileName() {
    return "LauncherMount.txt";
  }
  GetResType() {
    return "Launcher";
  }
  GetRemoteVersion() {
    return RemoteConfig_1.RemoteInfo.Config.LauncherVersion;
  }
  GetRemoteSha1Map() {
    return RemoteConfig_1.RemoteInfo.Config.LauncherIndexSha1;
  }
}
exports.LauncherVersionMisc = LauncherVersionMisc;
class ResourceVersionMisc extends AppVersionMisc {
  GetUpdateVersionKey() {
    return "ResourceVersion";
  }
  GetSaveUpdateVersionKey() {
    return "SavedResourceVersion";
  }
  GetIndexFilePrefix() {
    return "PatchList_";
  }
  GetMountFileName() {
    return "ResourceMount.txt";
  }
  GetResType() {
    return "Resource";
  }
  GetRemoteVersion() {
    return RemoteConfig_1.RemoteInfo.Config.ResourceVersion;
  }
  GetRemoteSha1Map() {
    return RemoteConfig_1.RemoteInfo.Config.ResourceIndexSha1;
  }
}
exports.ResourceVersionMisc = ResourceVersionMisc;
class LanguageVersionMisc extends AppVersionMisc {
  constructor(e) {
    super(),
      (this.LanguageCode = ""),
      (this.uIr = void 0),
      (this.cIr = !1),
      (this.LanguageCode = e);
  }
  GetUpdateVersionKey() {
    return "LanguageVersion_" + this.LanguageCode;
  }
  GetSaveUpdateVersionKey() {
    return "SavedLanguageVersion_" + this.LanguageCode;
  }
  GetIndexFilePrefix() {
    return `PatchList_${this.LanguageCode}_`;
  }
  GetMountFileName() {
    return `Resource_${this.LanguageCode}_Mount.txt`;
  }
  GetResType() {
    return "Resource_" + this.LanguageCode;
  }
  GetRemoteVersion() {
    return (
      this.cIr ||
        ((this.uIr = RemoteConfig_1.RemoteInfo.Config?.Versions?.find(
          (e) => e.Name === this.LanguageCode,
        )),
        (this.cIr = !0)),
      this.uIr?.Version
    );
  }
  GetRemoteSha1Map() {
    return (
      this.cIr ||
        ((this.uIr = RemoteConfig_1.RemoteInfo.Config?.Versions?.find(
          (e) => e.Name === this.LanguageCode,
        )),
        (this.cIr = !0)),
      this.uIr?.IndexSha1
    );
  }
  HasMountFile() {
    var e = this.GetMountFilePath();
    return UE.BlueprintPathsLibrary.FileExists(e);
  }
  CalculateLocalSize() {
    var e,
      t,
      s = this.ReadPatchFileInfoList();
    let i = BigInt(0),
      r = BigInt(0);
    for (const h of s)
      (r = (r = (r = (r += h.PakSize) + h.SigSize) + h.UtocSize) + h.UcasSize),
        UE.BlueprintPathsLibrary.FileExists(h.SavePath + ".pak")
          ? (i += h.PakSize)
          : ((e = h.SavePath + ".pak" + UrlPrefixDownload_1.DOWNLOAD_SUFFIX),
            UE.BlueprintPathsLibrary.FileExists(e) &&
              (i += UE.KuroLauncherLibrary.GetFileSize(e))),
        UE.BlueprintPathsLibrary.FileExists(h.SavePath + ".sig")
          ? (i += h.SigSize)
          : ((e = h.SavePath + ".sig" + UrlPrefixDownload_1.DOWNLOAD_SUFFIX),
            UE.BlueprintPathsLibrary.FileExists(e) &&
              (i += UE.KuroLauncherLibrary.GetFileSize(e))),
        UE.BlueprintPathsLibrary.FileExists(h.SavePath + ".utoc")
          ? (i += h.UtocSize)
          : ((t = h.SavePath + ".utoc" + UrlPrefixDownload_1.DOWNLOAD_SUFFIX),
            UE.BlueprintPathsLibrary.FileExists(t) &&
              (i += UE.KuroLauncherLibrary.GetFileSize(t))),
        UE.BlueprintPathsLibrary.FileExists(h.SavePath + ".ucas")
          ? (i += h.UcasSize)
          : ((t = h.SavePath + ".ucas" + UrlPrefixDownload_1.DOWNLOAD_SUFFIX),
            UE.BlueprintPathsLibrary.FileExists(t) &&
              (i += UE.KuroLauncherLibrary.GetFileSize(t)));
    return [i, r];
  }
  NeedUpdate() {
    return (
      this.LanguageCode ===
        LauncherLanguageLib_1.LauncherLanguageLib.GetPackageAudioLanguage() ||
      (this.HasNewResourceVersionBaseOnPackage() &&
        !this.IsFirstUpdateResources())
    );
  }
  NeedCheckAppRestart() {
    return !1;
  }
  DeleteSavedVersion(e) {
    LauncherStorageLib_1.LauncherStorageLib.SetGlobalString(
      this.GetSaveUpdateVersionKey(),
      this.PackageVersion,
    );
  }
}
exports.LanguageVersionMisc = LanguageVersionMisc;
//# sourceMappingURL=AppVersionMisc.js.map
