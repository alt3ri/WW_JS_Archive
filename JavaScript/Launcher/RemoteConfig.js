"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RemoteInfo =
    exports.RemoteVersionConfig =
    exports.ResVersion =
    exports.RemoteConfig =
    exports.VersionItem =
      void 0);
class VersionItem {
  constructor(t) {
    (this.Name = ""),
      (this.Version = ""),
      (this.IndexSha1 = void 0),
      (this.Name = t.Name),
      (this.Version = t.Version),
      (this.IndexSha1 = new Map()),
      Object.entries(t.IndexSha1).forEach((t) => {
        var s = t[0],
          t = t[1];
        this.IndexSha1.set(s, t);
      });
  }
}
exports.VersionItem = VersionItem;
class RemoteConfig {
  constructor(t) {
    (this.PackageVersion = ""),
      (this.LauncherVersion = ""),
      (this.ResourceVersion = ""),
      (this.ChangeList = ""),
      (this.UpdateTime = 0),
      (this.LauncherIndexSha1 = void 0),
      (this.ResourceIndexSha1 = void 0),
      (this.Versions = void 0),
      (this.PackageVersion = t.PackageVersion),
      (this.LauncherVersion = t.LauncherVersion),
      (this.ResourceVersion = t.ResourceVersion),
      (this.UpdateTime = t.UpdateTime),
      (this.ChangeList = t.ChangeList),
      (this.LauncherIndexSha1 = new Map()),
      Object.entries(t.LauncherIndexSha1).forEach((t) => {
        var s = t[0],
          t = t[1];
        this.LauncherIndexSha1.set(s, t);
      }),
      (this.ResourceIndexSha1 = new Map()),
      Object.entries(t.ResourceIndexSha1).forEach((t) => {
        var s = t[0],
          t = t[1];
        this.ResourceIndexSha1.set(s, t);
      }),
      (this.Versions = new Array());
    for (const s of t.Versions) this.Versions.push(new VersionItem(s));
  }
}
exports.RemoteConfig = RemoteConfig;
class ResVersion {
  constructor() {
    (this.Name = ""), (this.Version = ""), (this.IndexSha1 = "");
  }
}
exports.ResVersion = ResVersion;
class RemoteVersionConfig {
  constructor(t) {
    (this.PackageVersion = ""),
      (this.ChangeList = ""),
      (this.UpdateTime = 0),
      (this.ResVersions = void 0),
      (this.PackageVersion = t.PackageVersion),
      (this.UpdateTime = t.UpdateTime),
      (this.ChangeList = t.ChangeList),
      (this.ResVersions = new Map()),
      t.ResVersions &&
        Object.entries(t.ResVersions).forEach((t) => {
          var s = t[0];
          this.ResVersions.set(s, new VersionItem(t[1]));
        });
  }
}
exports.RemoteVersionConfig = RemoteVersionConfig;
class RemoteInfo {
  static get NewConfig() {
    return RemoteInfo.XIc;
  }
  static set NewConfig(t) {
    RemoteInfo.XIc = t;
  }
}
((exports.RemoteInfo = RemoteInfo).XIc = void 0),
  (RemoteInfo.Config = void 0),
  (RemoteInfo.PreVerConfig = void 0);
//# sourceMappingURL=RemoteConfig.js.map
