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
function isNan(t) {
  return t != t;
}
exports.BaseDefine = BaseDefine;
class VersionInfo {
  constructor(t, e, s) {
    (this.aSr = 0),
      (this.hSr = 0),
      (this.lSr = 0),
      (this.aSr = t),
      (this.hSr = e),
      (this.lSr = s);
  }
  get Major() {
    return this.aSr;
  }
  get Minor() {
    return this.hSr;
  }
  get Patch() {
    return this.lSr;
  }
  ToString() {
    return `${this.aSr}.${this.hSr}.` + this.lSr;
  }
  static TryParse(t) {
    var e, s;
    return !t ||
      t.length <= 0 ||
      (t = t.split(".")).length < 3 ||
      ((e = Number(t[0])), (s = Number(t[1])), (t = Number(t[2])), isNan(e)) ||
      isNan(s) ||
      isNan(t)
      ? [!1, void 0]
      : [!0, new VersionInfo(e, s, t)];
  }
  static PackageEquals(t, e) {
    return t && e && t.aSr === e.aSr && t.hSr === e.hSr;
  }
  static Equals(t, e) {
    return t && e && t.aSr === e.aSr && t.hSr === e.hSr && t.lSr === e.lSr;
  }
}
exports.VersionInfo = VersionInfo;
//# sourceMappingURL=BaseDefine.js.map
