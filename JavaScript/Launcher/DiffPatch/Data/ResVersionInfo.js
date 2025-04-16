"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LanguageVersionInfo =
    exports.ResourceVersionInfo =
    exports.LauncherVersionInfo =
    exports.ResVersionInfo =
      void 0);
const BaseDefine_1 = require("../../BaseConfig/BaseDefine"),
  Platform_1 = require("../../Platform/Platform"),
  LauncherLanguageLib_1 = require("../../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherStorageLib_1 = require("../../Util/LauncherStorageLib");
class ResVersionInfo {
  constructor(e, r, t) {
    (this.PackageVersion = e),
      (this.RemoteVersion = r),
      (this.RemoteManifestHashMap = t),
      (this.VersionRecord = ""),
      (this.PackageVersionRecord = ""),
      (this.LocalCurrentVersion = ""),
      (this.NeedRevert = !1),
      (this.TIc = 4);
  }
  Init() {
    this.VersionRecord =
      LauncherStorageLib_1.LauncherStorageLib.GetDeviceSavedString(
        this.GetVersionRecordKey(),
        "",
      );
    var [, e] = BaseDefine_1.VersionInfo.TryParse(this.PackageVersion),
      [, r] = BaseDefine_1.VersionInfo.TryParse(
        this.VersionRecord || this.PackageVersion,
      ),
      [, t] = BaseDefine_1.VersionInfo.TryParse(this.RemoteVersion);
    (this.TIc = t.Patch + 4),
      (this.NeedRevert = !BaseDefine_1.VersionInfo.LessThanOrEqual(r, t)),
      (this.PackageVersionRecord = r.ToString(2) + ".0"),
      (this.LocalCurrentVersion =
        (BaseDefine_1.VersionInfo.PackageEquals(e, r) && this.VersionRecord) ||
        this.PackageVersion),
      LauncherLog_1.LauncherLog.Info(
        "inited res version.",
        ["record", this.VersionRecord],
        ["remote", this.RemoteVersion],
        ["recordPackage", this.PackageVersionRecord],
        ["package", this.PackageVersion],
        ["localCurPackage", this.LocalCurrentVersion],
        ["needRevert", this.NeedRevert],
        ["res", this.GetResType()],
      );
  }
  get NeedRevertVersion() {
    return this.NeedRevert;
  }
  GetPackageVersion() {
    return this.PackageVersion;
  }
  get LatestVersion() {
    return this.RemoteVersion;
  }
  get CurrentVersion() {
    return this.LocalCurrentVersion;
  }
  get RecordVersion() {
    return this.VersionRecord;
  }
  get RecordPackageVersion() {
    return this.PackageVersionRecord;
  }
  SetPackageVersionRecord(e) {
    this.PackageVersionRecord = e;
  }
  get ManifestHash() {
    var e = this.RemoteManifestHashMap.get(this.RemoteVersion);
    return e || "";
  }
  get RevertManifestHash() {
    var e = this.RemoteManifestHashMap.get(this.RecordVersion);
    return e || "";
  }
  GetMountFileName() {
    return `Mount${this.GetResType()}.txt`;
  }
  GetManifestFileName() {
    return "Manifest" + this.GetResType();
  }
  GetVersionRecordKey() {
    return "Version_" + this.GetResType();
  }
  HasContentOnRemote() {
    return (
      this.PackageVersion !== this.RemoteVersion || 0 < this.ManifestHash.length
    );
  }
  UpdateVersionRecord() {
    return (
      LauncherLog_1.LauncherLog.Info(
        "update res version.",
        ["res", this.GetResType()],
        ["ver", this.RemoteVersion],
      ),
      !!LauncherStorageLib_1.LauncherStorageLib.SetDeviceSavedString(
        this.GetVersionRecordKey(),
        this.RemoteVersion,
      ) &&
        ((this.VersionRecord = this.RemoteVersion), !!this.RecordUse(!0)) &&
        (this.Init(), !0)
    );
  }
  RecordUse(e) {
    return !0;
  }
  GetMountOrder() {
    return this.TIc;
  }
  ClearVersionRecord() {
    return (
      LauncherLog_1.LauncherLog.Info("clear res version.", [
        "res",
        this.GetResType(),
      ]),
      !!LauncherStorageLib_1.LauncherStorageLib.DeleteDeviceSavedString(
        this.GetVersionRecordKey(),
      ) &&
        !(
          ("Launcher" === this.GetResType() &&
            !LauncherStorageLib_1.LauncherStorageLib.DeleteDeviceSavedString(
              "__kr_blvr__",
            )) ||
          !this.ClearUseRecord() ||
          (this.Init(), 0)
        )
    );
  }
  ClearUseRecord() {
    return !0;
  }
  IsLangRes() {
    return !1;
  }
  SkipUpdate() {
    return !1;
  }
}
class LauncherVersionInfo extends (exports.ResVersionInfo = ResVersionInfo) {
  GetResType() {
    return "Launcher";
  }
}
exports.LauncherVersionInfo = LauncherVersionInfo;
class ResourceVersionInfo extends ResVersionInfo {
  GetResType() {
    return "Resource";
  }
}
exports.ResourceVersionInfo = ResourceVersionInfo;
class LanguageVersionInfo extends ResVersionInfo {
  constructor(e, r, t, s) {
    super(e, r, t), (this.IRn = ""), (this.IRn = s);
  }
  GetResType() {
    return "Lang_" + this.IRn;
  }
  IsLangRes() {
    return !0;
  }
  SkipUpdate() {
    var e;
    return (
      !Platform_1.Platform.IsCloudGame() &&
      this.IRn !==
        LauncherLanguageLib_1.LauncherLanguageLib.GetPackageAudioLanguage() &&
      (void 0 ===
        (e = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSavedString(
          this.Lnh(),
          "",
        ).trim()) ||
        e.length <= 0)
    );
  }
  RecordUse(e) {
    e = e ? "1" : "";
    return LauncherStorageLib_1.LauncherStorageLib.SetDeviceSavedString(
      this.Lnh(),
      e,
    );
  }
  ClearUseRecord() {
    return LauncherStorageLib_1.LauncherStorageLib.DeleteDeviceSavedString(
      this.Lnh(),
    );
  }
  Lnh() {
    return "UseLanguage_" + this.IRn;
  }
}
exports.LanguageVersionInfo = LanguageVersionInfo;
//# sourceMappingURL=ResVersionInfo.js.map
