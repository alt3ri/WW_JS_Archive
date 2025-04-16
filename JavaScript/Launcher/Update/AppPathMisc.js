"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AppPathMisc = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue");
class AppPathMisc {
  constructor() {
    (this.sIr = ""), (this.rwi = ""), (this.aIr = "");
  }
  GetPatchSaveDir() {
    return (
      this.sIr ||
        (this.sIr = UE.KuroLauncherLibrary.GameSavedDir() + "Resources/"),
      this.sIr
    );
  }
  GetPlatform() {
    return (
      this.rwi ||
        (this.rwi = cpp_1.KuroApplication.IniPlatformNameIncludeEditor()),
      this.rwi
    );
  }
  GetInternalUseType() {
    return (
      this.aIr || (this.aIr = UE.KuroLauncherLibrary.GetAppInternalUseType()),
      this.aIr
    );
  }
  GetManifestRoute(t, e, s) {
    return `${t}/${this.GetPlatform()}/${e}/${s}.txt`;
  }
  GetResFileRoute(t, e, s) {
    return `${t}/${this.GetPlatform()}/${e}/` + s;
  }
  GetManifestPath(t, e, s) {
    return "" + this.GetPatchSaveDir() + t + `/ResManifest/${s}_${e}.txt`;
  }
  GetResFilePath(t, e, s, r) {
    return "" + this.GetResFileDir(t, e, s) + r;
  }
  GetResFileDir(t, e, s) {
    return "" + this.GetPatchSaveDir() + t + `/${s}/${e}/`;
  }
  GetMountManifestPath(t, e) {
    return "" + this.GetPatchSaveDir() + t + "/Mount/" + e;
  }
  GetDiffFilePath(t, e, s, r) {
    return "" + this.GetPatchSaveDir() + t + `/Diff/${s}/${e}/` + r;
  }
  GetTotalAndFreeSpace(t) {
    var e = (0, puerts_1.$ref)(0n);
    return [
      UE.KuroLauncherLibrary.GetTotalAndFreeSpace(t, e),
      (0, puerts_1.$unref)(e),
    ];
  }
}
exports.AppPathMisc = AppPathMisc;
//# sourceMappingURL=AppPathMisc.js.map
