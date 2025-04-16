"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VersionInfo =
    exports.BaseDefine =
    exports.TESTNOTICEURL =
    exports.TESTCDNON =
    exports.PACK =
    exports.EDITOR =
    exports.SDKOFF =
    exports.SDKON =
    exports.USESDK =
    exports.TRYLIMIT =
      void 0);
const UE = require("ue");
(exports.TRYLIMIT = 10),
  (exports.USESDK = "1"),
  (exports.SDKON = "sdkon"),
  (exports.SDKOFF = "sdkoff"),
  (exports.EDITOR = "editor"),
  (exports.PACK = "pack"),
  (exports.TESTCDNON = !1),
  (exports.TESTNOTICEURL = "");
class BaseDefine {
  static GetPublicConfigPath() {
    return (
      UE.BlueprintPathsLibrary.ProjectConfigDir() + "/Kuro/KuroPublicConfig.ini"
    );
  }
  static GetLocalGameDataPath() {
    return (
      UE.BlueprintPathsLibrary.ProjectConfigDir() +
      "../Saved/SaveGames/AkiSaveGame.conf"
    );
  }
}
exports.BaseDefine = BaseDefine;
class VersionInfo {
  constructor(t, e, s) {
    (this.rSr = 0),
      (this.nSr = 0),
      (this.sSr = 0),
      (this.rSr = t),
      (this.nSr = e),
      (this.sSr = s);
  }
  get Major() {
    return this.rSr;
  }
  get Minor() {
    return this.nSr;
  }
  get Patch() {
    return this.sSr;
  }
  ToString(t = 3) {
    return 1 === t
      ? "" + this.rSr
      : 2 === t
        ? this.rSr + "." + this.nSr
        : `${this.rSr}.${this.nSr}.` + this.sSr;
  }
  static TryParse(t) {
    var e, s;
    return !t ||
      t.length <= 0 ||
      (t = t.split(".")).length < 3 ||
      ((e = Number(t[0])), (s = Number(t[1])), (t = Number(t[2])), isNaN(e)) ||
      isNaN(s) ||
      isNaN(t)
      ? [!1, void 0]
      : [!0, new VersionInfo(e, s, t)];
  }
  static PackageEquals(t, e) {
    return t && e && t.rSr === e.rSr && t.nSr === e.nSr;
  }
  static Equals(t, e) {
    return t && e && t.rSr === e.rSr && t.nSr === e.nSr && t.sSr === e.sSr;
  }
  static LessThanOrEqual(t, e) {
    return (
      t.rSr < e.rSr ||
      (!(t.rSr > e.rSr) &&
        (t.nSr < e.nSr || (!(t.nSr > e.nSr) && t.sSr <= e.sSr)))
    );
  }
}
exports.VersionInfo = VersionInfo;
//# sourceMappingURL=BaseDefine.js.map
