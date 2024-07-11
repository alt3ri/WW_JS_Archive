"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RemoteInfo = exports.RemoteConfig = exports.VersionItem = void 0);
class VersionItem {
  constructor(t) {
    (this.Name = ""),
      (this.Version = ""),
      (this.IndexSha1 = void 0),
      (this.Name = t.Name),
      (this.Version = t.Version),
      (this.IndexSha1 = new Map()),
      Object.entries(t.IndexSha1).forEach((t) => {
        const s = t[0];
        var t = t[1];
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
      (this.LauncherIndexSha1 = void 0),
      (this.ResourceIndexSha1 = void 0),
      (this.Versions = void 0),
      (this.PackageVersion = t.PackageVersion),
      (this.LauncherVersion = t.LauncherVersion),
      (this.ResourceVersion = t.ResourceVersion),
      (this.ChangeList = t.ChangeList),
      (this.LauncherIndexSha1 = new Map()),
      Object.entries(t.LauncherIndexSha1).forEach((t) => {
        const s = t[0];
        var t = t[1];
        this.LauncherIndexSha1.set(s, t);
      }),
      (this.ResourceIndexSha1 = new Map()),
      Object.entries(t.ResourceIndexSha1).forEach((t) => {
        const s = t[0];
        var t = t[1];
        this.ResourceIndexSha1.set(s, t);
      }),
      (this.Versions = new Array());
    for (const s of t.Versions) this.Versions.push(new VersionItem(s));
  }
}
exports.RemoteConfig = RemoteConfig;
class RemoteInfo {}
exports.RemoteInfo = RemoteInfo;
// # sourceMappingURL=RemoteConfig.js.map
